import { Link } from "@/i18n/navigation";

type Variant = "primary" | "ghost" | "on-deep";

/** An absolute http(s) href leaves the site; anything else is a route. */
const isExternal = (href: string) => /^https?:\/\//.test(href);

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-paper shadow-soft hover:bg-brand-deep hover:shadow-lift",
  ghost: "bg-brand-wash text-brand hover:bg-brand hover:text-paper",
  "on-deep":
    "bg-paper/12 text-paper backdrop-blur-sm hover:bg-paper hover:text-brand-deep",
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  size = "md",
  block = false,
  glow = false,
  className = "",
  newTabLabel,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md";
  /** Full width on phones, natural width from sm up. */
  block?: boolean;
  /** Adds the travelling border highlight (see .cta-glow in globals.css). */
  glow?: boolean;
  className?: string;
  /**
   * Announced after the label on an off-site link, e.g. "opens her
   * website in a new tab". Required for those: the arrow that changes
   * shape is no use to a screen reader, and a link that swaps tabs
   * without warning is disorienting.
   */
  newTabLabel?: string;
}) {
  const pad = size === "sm" ? "px-5 py-2.5 text-xs" : "px-7 py-3.5 text-sm";
  const width = block
    ? "flex w-full justify-center sm:inline-flex sm:w-auto"
    : "inline-flex";
  const classes = `group/cta relative items-center gap-2.5 rounded-pill font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${width} ${pad} ${variants[variant]} ${glow ? "cta-glow" : ""} ${className}`;

  const external = isExternal(href);

  /* Off-site links lift out of the frame rather than sliding along it —
     the same nudge, turned to say "away" instead of "onward". */
  const glyph = (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        external
          ? "group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
          : "group-hover/cta:translate-x-1"
      }`}
    >
      {external ? (
        <>
          <path d="M8 4.5H5.2A1.2 1.2 0 0 0 4 5.7v9.1a1.2 1.2 0 0 0 1.2 1.2h9.1a1.2 1.2 0 0 0 1.2-1.2V12" />
          <path d="M11.5 4.5H15.5V8.5M15.2 4.8 9.5 10.5" />
        </>
      ) : (
        <path d="M4 10h11M11 5.5 15.5 10 11 14.5" />
      )}
    </svg>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
        {newTabLabel ? <span className="sr-only">{newTabLabel}</span> : null}
        {glyph}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {glyph}
    </Link>
  );
}
