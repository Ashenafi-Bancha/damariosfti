"use client";

import { useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";

/**
 * Back control.
 *
 * Steps back through history when the visitor arrived from somewhere on
 * this site, and otherwise navigates to `fallback` — someone who landed
 * here from a search result or a shared link has no useful history, and
 * pressing back would send them off the site entirely.
 */
export function BackLink({
  fallback,
  label,
  className = "",
}: {
  /** Where to go when there is no in-site history to step back to. */
  fallback: string;
  label: string;
  className?: string;
}) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    /* A same-origin referrer means they came from within the site. */
    setCanGoBack(
      window.history.length > 1 &&
        document.referrer !== "" &&
        new URL(document.referrer).origin === window.location.origin
    );
  }, []);

  return (
    <button
      type="button"
      onClick={() => (canGoBack ? router.back() : router.push(fallback))}
      className={`group/back inline-flex items-center gap-2 rounded-pill py-2 pr-4 text-sm text-muted transition-colors duration-500 hover:text-brand ${className}`}
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/back:-translate-x-1"
      >
        <path d="M16 10H5M9 4.5 4.5 10 9 15.5" />
      </svg>
      {label}
    </button>
  );
}
