#!/usr/bin/env node
/**
 * Build-time SEO shells.
 *
 * Problem: this is a client-rendered React app. Link scrapers (LinkedIn, Slack,
 * WhatsApp, X, Google) do not run JavaScript, so every URL that falls back to the
 * root index.html is shared with the homepage title/description.
 *
 * Fix: after `react-scripts build`, write build/<route>/index.html for every known
 * route, with that route's <title>, meta description, canonical and Open Graph /
 * Twitter tags injected. Apache serves the directory index before falling back to
 * the SPA rewrite (see public/.htaccess), so scrapers get the right metadata.
 *
 * react-snap (full pre-render) still runs afterwards and overwrites these shells
 * when it succeeds; if it fails, the shells remain as a safe fallback.
 */
import { build } from "esbuild";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = join(root, "build");
const indexPath = join(buildDir, "index.html");
if (!existsSync(indexPath)) { console.error("[seo-shells] build/index.html not found — run react-scripts build first."); process.exit(1); }

// 1) Bundle App.tsx for Node so we can call getSeo()/seoRoutes() with the real data.
const outfile = join(buildDir, ".seo-bundle.mjs");
await build({
  entryPoints: [join(root, "src/App.tsx")],
  bundle: true, platform: "node", format: "esm", outfile, logLevel: "silent",
  jsx: "automatic", target: "node18",
  define: {
    "process.env.NODE_ENV": '"production"',
    "process.env.PUBLIC_URL": '""',
    "process.env.REACT_APP_EMAILJS_SERVICE_ID": '""',
    "process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID": '""',
    "process.env.REACT_APP_EMAILJS_PUBLIC_KEY": '""',
  },
});
const mod = await import(pathToFileURL(outfile).href);
const routes = mod.seoRoutes();

// 2) Patch the built index.html per route.
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const html = readFileSync(indexPath, "utf8");
const setTag = (doc, re, tag) => (re.test(doc) ? doc.replace(re, tag) : doc.replace("</head>", `${tag}</head>`));
const metaName = (doc, name, content) => setTag(doc, new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*/?>`, "i"), `<meta name="${name}" content="${esc(content)}"/>`);
const metaProp = (doc, prop, content) => setTag(doc, new RegExp(`<meta\\s+property="${prop}"\\s+content="[^"]*"\\s*/?>`, "i"), `<meta property="${prop}" content="${esc(content)}"/>`);
const removeProp = (doc, prop) => doc.replace(new RegExp(`\\s*<meta\\s+property="${prop}"\\s+content="[^"]*"\\s*/?>`, "ig"), "");

let written = 0;
for (const r of routes) {
  const seo = mod.getSeo(r.page, r.subId);
  let doc = html;
  doc = doc.replace(/<title>[^<]*<\/title>/i, `<title>${esc(seo.title)}</title>`);
  doc = metaName(doc, "description", seo.description);
  doc = setTag(doc, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${esc(seo.url)}"/>`);
  doc = metaProp(doc, "og:type", seo.type);
  doc = metaProp(doc, "og:title", seo.title);
  doc = metaProp(doc, "og:description", seo.description);
  doc = metaProp(doc, "og:url", seo.url);
  doc = metaProp(doc, "og:image", seo.image);
  doc = seo.imageAlt ? metaProp(doc, "og:image:alt", seo.imageAlt) : removeProp(doc, "og:image:alt");
  doc = metaName(doc, "twitter:title", seo.title);
  doc = metaName(doc, "twitter:description", seo.description);
  doc = metaName(doc, "twitter:image", seo.image);
  if (seo.keywords) doc = metaName(doc, "keywords", seo.keywords);
  if (seo.type === "article") {
    if (seo.publishedTime) doc = metaProp(doc, "article:published_time", seo.publishedTime);
    if (seo.author) doc = metaProp(doc, "article:author", seo.author);
    if (seo.section) doc = metaProp(doc, "article:section", seo.section);
  }
  const dir = r.path === "/" ? buildDir : join(buildDir, r.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), doc);
  written++;
}
try { (await import("node:fs")).unlinkSync(outfile); } catch {}
console.log(`[seo-shells] wrote ${written} route shells with per-page title/meta.`);
