# Da Mario's Fashion and Technology Institute — website prototype

First prototype of the public website for **Da Mario's Fashion and Technology Institute (Damarios FTI)**, Bole, Addis Ababa. Built for users arriving on Android phones over metered mobile data: every budget decision below follows from that.

## Stack

- **Next.js 15** (App Router, TypeScript strict) — *note: Next 15 security support ends 2026-10-21; plan the Next 16 migration (rename `middleware.ts` → `proxy.ts`, replace `setRequestLocale` with root params) shortly after launch*
- **Tailwind CSS v4** — design tokens as CSS custom properties in [src/app/globals.css](src/app/globals.css) (`@theme`), default palette removed
- **next-intl v4** — English only; the catalogue and routing stay in place so a second language can be added without touching components
- **CSS-driven motion** — scroll reveals and transitions are plain CSS on a quintic curve, released by a small IntersectionObserver; no animation library ships to the browser
- **Zod v4 + React Hook Form** — application form, validated client- and server-side
- **Resend + Telegram Bot API** — application notifications (Telegram is the channel the staff actually read)
- Deploy target: **Vercel**

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in — see below
npm run dev
```

Production build + bundle report: `npm run build`.

## Environment variables (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public origin for canonical URLs, sitemap, OpenGraph, JSON-LD. Optional on Vercel — the production domain is picked up automatically; set it to override (e.g. custom domain) |
| `RESEND_API_KEY` | Resend API key for application notification email |
| `RESEND_FROM` | Verified sender, e.g. `Damarios FTI <noreply@domain>` |
| `APPLY_TO_EMAIL` | Institute inbox receiving applications (**TODO: client to confirm**) |
| `TELEGRAM_BOT_TOKEN` | Bot token from @BotFather |
| `TELEGRAM_CHAT_ID` | Chat/channel id the bot posts applications into |

With no channel configured, the apply endpoint fails loudly rather than faking success: the server logs exactly which variable is missing, and the applicant is shown the institute's phone number and opening hours so the application is not simply lost. Applicant data is **never stored**; it is relayed to Telegram/email only. Rate limiting is an in-memory sliding window (best-effort on serverless — swap in Upstash Redis for production) plus a honeypot field.

## Architecture notes

- **Brand** — the design system is derived from the institute's logo: a clear corporate blue (`--color-brand: #15589C`) on white, anchored by a deep navy (`--color-brand-deep`) for the footer and feature bands. Tokens live in the `@theme` block of [src/app/globals.css](src/app/globals.css) and the default Tailwind palette is removed entirely, so nothing off-brand can creep in. The pattern-drafting metaphor is drawn in its true colours — real drafting paper is white with blue rule.
- **Logo** — the institute's real artwork. `public/brand/logo-original.png` is the file as supplied; the variants beside it are derived from it by flood-filling the background inward from the edges, which removes the white surround while preserving the white *inside* the gear hub and between the fabric lines. `logo-mark*.png` is used in the header and footer, paired with live text rather than the baked-in lockup so the tagline stays selectable and translatable; the full lockup drives the favicon, apple icon and share card. Regenerate with the script in the commit history if the source is ever replaced.
- **Content layer** — all institutional facts live in typed modules under [src/content/](src/content/); all human-readable copy in [messages/](messages/). Components consume only the exported types, so a headless CMS can replace these modules without touching the UI.
- **Unpublished facts are omitted, never invented** — anything the institute has not supplied is a `Todo` in the content layer, and nothing renders a Todo: the chip, row or whole section is simply left out. A programme with no published level shows no level; a page whose every fact is missing loses that block entirely. The visible `TODO` chips were removed once the site went out for client review, but the rule is unchanged — **never replace a Todo with an invented value.** The inventory below still tracks what is outstanding.
- **Hero media slot** — the hero currently shows the institute's own signage (`public/hero/institute-sign.jpg`). Swap it by pointing `heroMedia` in [src/content/heroMedia.ts](src/content/heroMedia.ts) at another path under `public/`; set it to a `TODO` and the slot falls back to a plain tinted panel, with no layout shift either way. To restore the live 3D fabric instead, render `<ClothStage />` in [HeroMedia.tsx](src/components/hero/HeroMedia.tsx).
- **The 3D fabric (retained, not currently mounted)** — in [ClothCanvas.tsx](src/components/hero/ClothCanvas.tsx): a 76×76 sheet displaced by five wave harmonics, pinned along its top edge so it drapes and falls away below, lit per-pixel with a two-lobe silk sheen and a fresnel rim. It is hand-written WebGL2 — **no three.js** — which is why it is **2.7 KB gzipped** rather than the ~135 KB a three.js scene would cost, and so comes in far under the 60 KB budget that made 3D look impossible at the start. Note the shader encodes back to sRGB on output; without that the lighting maths (done in linear space) renders the fabric near-black.
- **Hero gating** — the fabric is a lazy chunk fetched on idle, and only when `prefers-reduced-motion` is off, `saveData` is off, `effectiveType` is 4g/5g, `deviceMemory` ≥ 4 and WebGL2 exists. Everyone else keeps a pure-CSS silk gradient poster that stands on its own, and the 3D bundle is never requested.
- **Fonts** — Bodoni Moda (display), Hanken Grotesk (body), IBM Plex Mono (utility), self-hosted and subset at build time by `next/font`. No italics — every axis costs kilobytes on metered data. Noto Sans Ethiopic was dropped with the Amharic locale; restore it in `src/lib/fonts.ts` alongside the locale.
- **Accreditation — deliberately absent** — by client instruction the site makes **no mention of accreditation at all**: not the certificate or trade licence numbers, not the accrediting authority, not the word itself. The supplied facts are still held in [src/content/institute.ts](src/content/institute.ts) (`accreditation`), unrendered, so they can be restored or used in tender paperwork. Worth revisiting before launch: the original brief asked for accreditation credentials to be displayed prominently for the donor and government-tender audience, and it is the strongest trust signal a prospective student's parent looks for.
- **Social links** — [src/content/institute.ts](src/content/institute.ts) `social`. **Facebook is live and verified**: the page's own metadata reads "Damarios Fashion and Technology Institute ... established in the year 2024 located in Addis Abeba /Ethiopia at Bole sub city", which matches the institute on name, founding year and location. **Instagram, TikTok and Telegram are still inactive** — no profile for the institute could be found on any of them, and a guessed handle would send prospective students to a stranger's account. Ask the institute for the exact URLs. Icons are drawn in each platform's own colours on white discs, since the brand blues, black and gradients all vanish against the navy footer. A URL makes an icon appear; a `TODO` means no icon is drawn at all, since a dead icon tells a visitor nothing. Never guess a handle — the wrong link sends visitors to a stranger's account.
- **The founder's story lives on her own site** — [senaitmario.vercel.app](https://senaitmario.vercel.app), held as `founderSite` in [src/content/institute.ts](src/content/institute.ts). The institute used to host its own retelling at `/about/founder`; by client instruction that page is gone and every route to her story — the homepage CTA, the About page card, the footer link — opens her site in a new tab instead. `next.config.ts` keeps a permanent redirect from the old URL so bookmarks and search results are handed on rather than dropped on a 404. Verified before linking: her site names her, describes her as founder of this institute, and links back here. Note that her recognitions (UN Peace Ambassador, honorary doctorate, Top 40 Women of Africa) left the institute's site with that page — they are trust signals for the donor and tender audience, and worth deciding about deliberately before launch.
- **Mobile navigation** — below `md` the header carries the logo, the Apply button and a menu button; the links live in a panel that drops from the header ([MobileMenu.tsx](src/components/layout/MobileMenu.tsx)). The panel stays mounted and is driven by a `data-open` attribute with the transition in `globals.css`, alongside the site's other stateful transitions. It carries `inert` while closed, which removes it from both the tab order and the accessibility tree without the jump `display: none` would cause. Escape closes it and returns focus to the button, body scroll is locked while open, and the wordmark drops its tagline below `sm` so the header fits a 320px screen.
- **i18n** — all strings through next-intl. Client components receive strings as props from server parents, so the message catalog never ships to the browser (`NextIntlClientProvider messages={null}` — the provider exists only because next-intl's navigation `Link` reads the locale from context).

## Gallery provenance — CONFIRM BEFORE LAUNCH

Photographs live in `public/gallery/`, catalogued in [src/content/gallery.ts](src/content/gallery.ts) where each carries a `verified` flag.

- `verified: true` — the institute's own premises and signage. Safe as-is.
- `verified: false` — supplied as the founder's design work but not independently verifiable here. Captions are deliberately descriptive ("A piece from the founder's collections") and claim no more than that. **Confirm with the client that the institute owns or is licensed to publish each of these before launch.**

Three images in the source folder were deliberately **excluded**: a private social photograph, an image that appears to be a stock product listing, and personal/scenic shots. None belong on an accredited institute's public site, and publishing a stock image as the institute's own work would be a misrepresentation.

Programme photography lives in `public/programmes/`, one landscape image per programme, catalogued with its source in [public/programmes/SOURCES.md](public/programmes/SOURCES.md). These are stock photographs under the Pexels License, which permits commercial use with no attribution required; the table is kept so any image can be traced or replaced.

Each was reviewed before use. The runway photograph was cropped to remove another fashion label's name from the backdrop, which would have implied an association the institute does not have, and a computer-lab image was rejected for showing uniformed schoolchildren rather than the adult trainees these programmes are for.

**To use the institute's own photography, drop the file into `public/programmes/` under the same name.** Nothing else changes. Setting an entry in `programmeImages` ([src/content/gallery.ts](src/content/gallery.ts)) to a `Todo` instead falls back to the brand artwork in [ProgrammeArt.tsx](src/components/programmes/ProgrammeArt.tsx).

## Amharic — currently disabled

The site is **English only** by client instruction. next-intl is still in place and every string still goes through the catalogue, so restoring Amharic means adding `"am"` back to `locales` in [src/i18n/routing.ts](src/i18n/routing.ts) and re-attaching the Noto Sans Ethiopic font in `src/lib/fonts.ts`. The drafted translation is preserved at [messages/am.json](messages/am.json) and is not loaded while it sits outside `locales`. **It remains machine-drafted — a native speaker must review it before it is ever shown** — and it has since fallen behind the English: it still carries the accreditation strings, the TODO labels and the old hero copy, and is missing the mobile-menu and back-link strings. Treat it as a starting point for a fresh translation, not a catalogue to patch.

## TODO inventory — what the client must supply

| # | Item | Where it appears |
| --- | --- | --- |
| 1 | Public **email address** | Not shown anywhere until supplied |
| 2 | **Telegram handle** | Not shown anywhere until supplied |
| 3 | **Tuition** for every programme | Programme cards, detail pages, admissions |
| 4 | **Durations** for Modeling, Cosmetology, Nail Technology, Information Technology, Security Training | Programme cards + detail pages |
| 5 | **TVET levels** for all programmes except Fashion Design (Levels 2–4 confirmed) | Programme cards + detail pages |
| 6 | **Intake dates** for all programmes | Programme cards, detail pages, admissions |
| 7 | **Entry requirements** | Admissions page |
| 8 | Fashion Design **career outcomes** list | Fashion Design detail page |
| 9 | Information Technology **curriculum** | IT detail page |
| 10 | **Mario Makeup Company** partnership details | Partnerships page, homepage institutional section |
| 11 | **Rome Business School entitlements** — confirm study-abroad claims before launch (legally sensitive; see the code comment in [src/app/[locale]/about/partnerships/page.tsx](src/app/[locale]/about/partnerships/page.tsx)) | Partnerships page |
| 12 | **Capability statement PDF** | No download offered until supplied |
| 18 | **The institute's own teaching photography** — every programme currently carries a licensed stock photograph (see `public/programmes/SOURCES.md`). Real classroom and workshop photographs would replace them | Programme cards + detail pages |
| 19 | **Confirm gallery provenance** — the institute owns or is licensed to publish each `verified: false` image in `src/content/gallery.ts` | Gallery page |
| 20 | **Student work and classroom photography** to grow the gallery beyond the founder's collections | Gallery page |
| 21 | **Social profile URLs** — Instagram, TikTok and Telegram. Facebook is live and verified; the other three are not drawn at all until a URL is supplied | Footer |
| 14 | **Response timeframe** after an application (currently phrased without a number) | Apply success state |
| 15 | Native-speaker **review of all Amharic copy** | Entire `/am` locale |
| 16 | Confirmation of the exact **map pin** for Kkare Building (embed currently searches by name; landmark directions are the primary aid) | Contact page |
| 17 | **Original logo vector** (.svg/.ai/.eps). The supplied raster (449×445) is now used site-wide and is sharp at the sizes it appears, but a vector would stay crisp at any scale and for print | Header, footer, favicon, share card |

## Quality floor implemented

Responsive from 320px; visible `:focus-visible` on every interactive element; `prefers-reduced-motion` gets designed end-states (reveals never hide content, the fabric is never fetched); WCAG AA colour pairs verified by computation (brand on paper 7.2:1, graphite on paper 16.5:1, muted on paper 5.9:1, paper on navy 11.8:1, brand-bright on navy 4.7:1); semantic landmarks + one `h1` per page; per-page metadata + OpenGraph + hreflang alternates; `sitemap.ts`, `robots.ts`; `EducationalOrganization` JSON-LD with the real address, phones and opening hours; `tel:` links in E.164 for Ethiopian handsets; keyless lazy-loaded Google Maps embed with plain-text landmark directions.
