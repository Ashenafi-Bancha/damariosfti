import { defineRouting } from "next-intl/routing";

/**
 * English only, by client instruction.
 *
 * next-intl is kept in place rather than torn out: every string still
 * goes through the message catalogue, so adding Amharic back is a matter
 * of restoring "am" to this list. The drafted translation is preserved
 * at messages/am.json and is not loaded while it sits outside `locales`.
 *
 * localePrefix "as-needed" serves the default locale unprefixed, so URLs
 * are /programmes rather than /en/programmes, and any existing /en/... link
 * redirects to its clean equivalent.
 */
export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
