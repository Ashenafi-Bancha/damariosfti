"use client";

import { useEffect, useRef } from "react";

/**
 * A thread of light drawn between sections. It brightens and widens
 * as it scrolls into view; reduced-motion visitors get the finished
 * line immediately.
 */
export function SeamDivider({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLHRElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("seam-in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("seam-in");
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <hr ref={ref} className={`seam ${className}`} aria-hidden="true" />;
}
