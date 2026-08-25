import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "./site";

type MetaPage =
  | "home"
  | "programmes"
  | "programmeDetail"
  | "about"
  | "founder"
  | "partnerships"
  | "admissions"
  | "apply"
  | "contact";

/** Locale-aware metadata with canonical + hreflang alternates and OpenGraph. */
export async function pageMetadata(
  locale: string,
  page: MetaPage,
  path: string,
  values?: Record<string, string>
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t(`${page}.title`, values);
  const description = t(`${page}.description`, values);
  const url = `${SITE_URL}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en${path}`,
        am: `${SITE_URL}/am${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Da Mario's Fashion and Technology Institute",
      locale: locale === "am" ? "am_ET" : "en_US",
      type: "website",
    },
  };
}
