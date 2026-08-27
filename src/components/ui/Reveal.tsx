"use client";

import { useEffect, useRef } from "react";

/**
 * Smooth entrance for a block of content.
 *
 * The server renders children plainly visible. Only once the client
 * confirms it can animate does it add the hidden pre-state, then
 * release it on intersection — so no-JS, crawlers and reduced-motion
 * visitors never see content that failed to appear.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: React.ReactNode;
  /** Stagger, in ms, for items in a sequence. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.dataset.reveal = "hidden";
    el.style.transitionDelay = `${delay}ms`;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "shown";
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
