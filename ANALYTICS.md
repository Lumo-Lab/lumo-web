# Lumo Lab — Analytics & Conversion Tracking

All events go through the central helper in `src/analytics.ts` (GA4 via the
existing `gtag`). The helper is safe if `gtag` is missing/blocked, never sends
PII, logs to the console in development (`NODE_ENV=development`), and de-dupes
the initial page view.

Consent is handled by the existing CookieYes banner / Google Consent Mode — we
do not add a second consent mechanism.

## Page views (SPA)

`index.html` runs `gtag('config', 'G-K1DVFYHRLX')` once on load, which sends the
**first** `page_view` automatically. `trackPageView()` therefore **suppresses
its own first call** and only sends `page_view` on subsequent client-side route
changes (fired from the route effect in `App`).

Params sent: `page_location`, `page_path`, `page_title`.

### ⚠️ Required GA4 setting (outside the repo)

In GA4 → Admin → Data streams → the web stream → **Enhanced measurement**,
turn **OFF “Page changes based on browser history events.”** Otherwise GA4 will
*also* auto-send a page view on every `pushState`, duplicating the manual
`page_view` events this code sends. Leave the rest of Enhanced measurement on.

## Events

| Event | Fires where | Key params |
|---|---|---|
| `page_view` | Every SPA route change (not the initial load) | `page_location`, `page_path`, `page_title` |
| `cta_click` | Homepage hero, homepage self-select cards, nav (desktop + mobile) | `cta_name`, `cta_location`, `destination`, `selected_need?` |
| `contact_option_selected` | Contact page, when a visitor picks “Book a call” or “Send a project brief” | `option` (`call`\|`brief`), `source?`, `selected_need?` |
| `contact_form_start` | First interaction with the project brief form | `source?`, `selected_need?` |
| `contact_form_submit` | **After** the EmailJS send resolves successfully | `source?`, `selected_need?` |
| `contact_form_error` | Validation failure or provider failure | `error_type` (`validation`\|`network`\|`provider`\|`unknown`), `source?` |
| `calendly_view` | Calendly `profile_page_viewed` / `event_type_viewed` postMessage | `source?`, `selected_need?` |
| `calendly_date_selected` | Calendly `date_and_time_selected` postMessage | `source?`, `selected_need?` |
| `calendly_booking_completed` | **Only** on Calendly `event_scheduled` (confirmed booking) | `source?`, `selected_need?` |
| `calculator_started` | Cost calculator mount (once) | – |
| `calculator_completed` | Once the visitor has configured a real project (or picked Discovery) | `project_type`, `stage`, `industry?`, `platform_count`, `timeline?`, `estimate_band` |
| `calculator_lead` | After the calculator lead email sends successfully | same as above |
| `calculator_pdf_download` | “Download 1-page PDF” | `project_type`, `stage`, `estimate_band` |
| `calculator_share_link` | “Copy shareable link” | `project_type`, `stage` |
| `case_study_view` | Opening a `/work/<slug>` case study | `case_study` (slug) |
| `article_contextual_cta_click` | In-body article CTA (mid + end) | `article` (slug), `cta_name`, `destination` |

`estimate_band` is a non-sensitive bucket: `discovery` \| `under_15k` \|
`15k_40k` \| `40k_80k` \| `80k_plus`. The calculator’s free-text “custom
capability” field is **never** sent.

## PII policy

No event ever includes names, emails, phone numbers, company names, project
descriptions, the calculator’s free-text field, or Calendly invitee data. Only
categorical/derived values are sent.

## Verifying in GA4 DebugView

1. Add `?debug_mode=1` to any page URL (or install the GA Debugger extension).
2. GA4 → Admin → **DebugView**.
3. In development (`npm start`) every event is also `console.log`ged as
   `[analytics] <event> {params}` — use this to confirm an event fires **once**.
4. Checks to run:
   - Navigate between pages → exactly one `page_view` per navigation, and **no**
     duplicate on first load (only the config page_view).
   - Click a homepage self-select card → `cta_click` (with `selected_need`) then
     a `page_view` for `/contact`.
   - On contact, pick each option → one `contact_option_selected`.
   - Submit the brief with a bad email → `contact_form_error` (`validation`),
     no `contact_form_submit`. Submit valid → `contact_form_submit` once.
   - Complete a Calendly booking → `calendly_booking_completed` fires only at
     the confirmation screen.
   - Configure the calculator + email it → `calculator_completed` then
     `calculator_lead`.

## Recommended primary conversions

Mark these as **key events / conversions** in GA4 (Admin → Events):

- `contact_form_submit`
- `calendly_booking_completed`
- `calculator_lead`
