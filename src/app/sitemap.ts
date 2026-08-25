import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PROGRAMME_SLUGS } from "@/content/types";
import { routing } from "@/i18n/routing";

const paths = [
  "",
  "/programmes",
  ...PROGRAMME_SLUGS.map((slug) => `/programmes/${slug}`),
  "/about",
  "/about/founder",
  "/about/partnerships",
  "/admissions",
  "/apply",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
        ),
      },
    }))
  );
}
