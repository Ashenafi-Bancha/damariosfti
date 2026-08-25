"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Locale switch as plain links: the next-intl middleware persists the
 * choice via the NEXT_LOCALE cookie on navigation, so no client-side
 * next-intl runtime is needed at all.
 */
export function LocaleToggle({
  locale,
  labels,
}: {
  locale: string;
  labels: { label: string; en: string; am: string };
}) {
  const pathname = usePathname() ?? "/";
  const rest = pathname.replace(/^\/(en|am)(?=\/|$)/, "") || "/";
  const hrefFor = (l: "en" | "am") => `/${l}${rest === "/" ? "" : rest}`;

  /* usePathname excludes the query string; carry it over at click time
     (avoids a useSearchParams Suspense bailout of the whole header). */
  const withSearch = (href: string) => (e: React.MouseEvent) => {
    if (window.location.search) {
      e.preventDefault();
      window.location.assign(href + window.location.search);
    }
  };

  return (
    <nav
      aria-label={labels.label}
      className="flex items-stretch border border-chalk-dim/30 font-mono text-[11px] uppercase tracking-wider"
    >
      {(["en", "am"] as const).map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
          hrefLang={l}
          onClick={withSearch(hrefFor(l))}
          aria-current={l === locale ? "true" : undefined}
          className={
            l === locale
              ? "bg-chalk px-2.5 py-1.5 text-ink"
              : "px-2.5 py-1.5 text-chalk-dim transition-colors hover:text-chalk"
          }
        >
          {labels[l]}
        </Link>
      ))}
    </nav>
  );
}
