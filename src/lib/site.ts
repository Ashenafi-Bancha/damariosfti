/* Only used server-side (metadata, sitemap, robots, JSON-LD). On Vercel
   the project's production domain is picked up automatically; set
   NEXT_PUBLIC_SITE_URL to override (e.g. once a custom domain exists). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
