"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

/**
 * The scroll scrub. This component's only job is to write the scroll
 * progress into a single --p custom property; every piece movement is
 * pure CSS calc() against it (see the hero styles in globals.css).
 * That keeps the JS cost to useScroll alone — no motion components, no
 * feature bundles — and the server-rendered default (--p: 1) is the
 * composed garment, so no-JS and reduced-motion users get the finished
 * end-state, never a frozen animation.
 */
export function HeroStage({
  hint,
  children,
}: {
  hint: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (reduced) {
      ref.current?.style.removeProperty("--p");
    } else {
      ref.current?.style.setProperty("--p", scrollYProgress.get().toFixed(4));
    }
  }, [reduced, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduced) ref.current?.style.setProperty("--p", v.toFixed(4));
  });

  return (
    <div ref={ref} className="hero-stage hero-scrub">
      <div className="hero-sticky relative">
        {children}
        <p
          aria-hidden="true"
          className="hero-hint absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
        >
          {hint} ↓
        </p>
      </div>
    </div>
  );
}
