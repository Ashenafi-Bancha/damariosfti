import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PROGRAMME_SLUGS } from "@/content/types";

const paths = [
  "",
  "/programmes",
  ...PROGRAMME_SLUGS.map((slug) => `/programmes/${slug}`),
  "/gallery",
  "/about",
  "/about/founder",
  "/about/partnerships",
  "/admissions",
  "/apply",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified,
  }));
}
