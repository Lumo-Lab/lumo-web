/* ------------------------------------------------------------------
   Lumo Lab — central analytics utility (GA4 via gtag).

   Design goals:
   - Never break the UI if analytics is unavailable or blocked.
   - Never send PII (names, emails, phone numbers, free-text project
     descriptions, Calendly invitee data, etc.).
   - One consistent place for event names + parameters.
   - Dev-only console logging for verification.
   - De-duplicate page views (esp. the initial one from gtag "config").

   Consent: gtag itself is gated by the existing CookieYes banner /
   Google Consent Mode. We simply call gtag; if consent is denied,
   Google queues/holds the hits. We do not add a second mechanism.
------------------------------------------------------------------ */

const GA_ID = "G-K1DVFYHRLX";
const isDev =
  typeof process !== "undefined" &&
  process.env &&
  process.env.NODE_ENV === "development";

type Params = Record<string, string | number | boolean | undefined>;

function gtagAvailable(): boolean {
  return typeof window !== "undefined" && typeof (window as any).gtag === "function";
}

/** Strip undefined values so we never send empty params. */
function clean(params: Params): Params {
  const out: Params = {};
  Object.keys(params).forEach((k) => {
    const v = params[k];
    if (v !== undefined && v !== null && v !== "") out[k] = v;
  });
  return out;
}

/** Core event sender. Safe no-op if gtag is missing. */
export function track(event: string, params: Params = {}): void {
  const payload = clean(params);
  try {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.log(`[analytics] ${event}`, payload);
    }
    if (gtagAvailable()) {
      (window as any).gtag("event", event, payload);
    }
  } catch {
    /* analytics must never throw into the UI */
  }
}

/* ---- SPA page views ------------------------------------------------
   index.html calls gtag("config", GA_ID) once on load, which sends the
   FIRST page_view automatically. To avoid a duplicate, we suppress our
   own first call and only send page_view on subsequent route changes.
   (See ANALYTICS.md for the required GA4 setting to disable
   "Enhanced measurement > History changes", which would also duplicate.)
------------------------------------------------------------------ */
let pageViewInitialised = false;

export function trackPageView(path: string, title: string): void {
  if (!pageViewInitialised) {
    // The gtag("config") call already logged the initial page_view.
    pageViewInitialised = true;
    return;
  }
  const location =
    typeof window !== "undefined" ? window.location.origin + path : path;
  try {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.log("[analytics] page_view", { page_path: path, page_title: title });
    }
    if (gtagAvailable()) {
      // Keep config's client state in sync, then send an explicit page_view.
      (window as any).gtag("event", "page_view", {
        page_location: location,
        page_path: path,
        page_title: title,
      });
    }
  } catch {
    /* no-op */
  }
}

/* ---- Semantic helpers (thin wrappers for consistent params) -------- */

export function trackCta(
  ctaName: string,
  ctaLocation: string,
  destination: string,
  selectedNeed?: string
): void {
  track("cta_click", {
    cta_name: ctaName,
    cta_location: ctaLocation,
    destination,
    selected_need: selectedNeed,
  });
}

export function trackContactOption(
  option: "call" | "brief",
  source?: string,
  selectedNeed?: string
): void {
  track("contact_option_selected", {
    option,
    source,
    selected_need: selectedNeed,
  });
}

export type ContactErrorType = "validation" | "network" | "provider" | "unknown";

export function trackContactFormStart(source?: string, selectedNeed?: string): void {
  track("contact_form_start", { source, selected_need: selectedNeed });
}
export function trackContactFormSubmit(source?: string, selectedNeed?: string): void {
  track("contact_form_submit", { source, selected_need: selectedNeed });
}
export function trackContactFormError(
  errorType: ContactErrorType,
  source?: string
): void {
  track("contact_form_error", { error_type: errorType, source });
}

export function trackCaseStudyView(slug: string): void {
  track("case_study_view", { case_study: slug });
}

export function trackArticleCtaClick(
  slug: string,
  ctaName: string,
  destination: string
): void {
  track("article_contextual_cta_click", {
    article: slug,
    cta_name: ctaName,
    destination,
  });
}
