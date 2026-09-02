"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";

export interface NavLink {
  href: string;
  label: string;
}

/**
 * Mobile navigation: a menu button in the header that opens a panel
 * beneath it. Below md only — the desktop header keeps its inline links.
 *
 * The panel stays mounted so it can animate open and shut, and carries
 * `inert` while closed, which takes it out of both the tab order and the
 * accessibility tree without the jump that `display: none` would cause.
 */
export function MobileMenu({
  links,
  openLabel,
  closeLabel,
  menuLabel,
}: {
  links: NavLink[];
  openLabel: string;
  closeLabel: string;
  menuLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* Escape closes, and focus returns to the button that opened it. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* Stop the page scrolling behind the open panel. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Move focus into the panel when it opens. */
  useEffect(() => {
    if (open) panelRef.current?.querySelector("a")?.focus();
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? closeLabel : openLabel}
        className="flex h-11 w-11 items-center justify-center rounded-pill text-brand-deep transition-colors duration-500 hover:bg-brand-wash md:hidden"
      >
        {/* three bars that fold into a cross */}
        <span aria-hidden="true" className="relative block h-4 w-5">
          {[
            open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
            open ? "opacity-0" : "top-1/2 -translate-y-1/2",
            open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
          ].map((state, i) => (
            <span
              key={i}
              className={`absolute left-0 h-[2px] w-full rounded-pill bg-current transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${state}`}
            />
          ))}
        </span>
      </button>

      <div
        id="mobile-nav"
        ref={panelRef}
        inert={!open}
        data-open={open}
        className="mobile-panel absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-paper shadow-lift md:hidden"
      >
        <nav aria-label={menuLabel}>
          <ul className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-4 py-3.5 text-base text-graphite transition-colors duration-300 hover:bg-brand-wash hover:text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
