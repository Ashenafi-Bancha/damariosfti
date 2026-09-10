import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { institute } from "./src/content/institute";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  /**
   * The institute used to host a page retelling the founder's story.
   * Her own site tells it properly, so that page is gone — but it was
   * live and in the sitemap, so anything already pointing at it (a
   * bookmark, a search result, a shared link) is sent on rather than
   * dropped on a 404. Permanent, so search engines transfer the URL.
   */
  async redirects() {
    return [
      {
        source: "/:locale(en)?/about/founder",
        destination: institute.founderSite,
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
