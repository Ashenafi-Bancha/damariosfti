import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "./site";

/** Generated from the institute logo — see src/app/opengraph-image.png. */
const OG_IMAGE = "/opengraph-image.png";

type MetaPage =
  | "home"
  | "programmes"
  | "gallery"
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
      /* Declared explicitly: defining `openGraph` here opts the route out
         of Next's file-based opengraph-image convention, so without this
         shared links (Telegram especially) would preview with no image. */
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Da Mario's Fashion and Technology Institute",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
