"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hairline dashed rule with notch marks that draws in left-to-right when
 * scrolled into view. Reduced-motion users get the finished seam
 * immediately — an end-state, not a frozen animation.
 */
export function SeamDivider({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`seam ${drawn ? "seam-in" : ""} ${className}`}
    >
      <span className="seam-line" />
      {[8, 26, 44, 62, 80, 96].map((x) => (
        <span key={x} className="seam-notch" style={{ left: `${x}%` }} />
      ))}
    </div>
  );
}
