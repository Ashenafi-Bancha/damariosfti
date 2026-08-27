import { Link } from "@/i18n/navigation";

type Variant = "primary" | "ghost" | "on-deep";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-paper shadow-soft hover:bg-brand-deep hover:shadow-lift",
  ghost: "bg-brand-wash text-brand hover:bg-brand hover:text-paper",
  "on-deep": "bg-paper/12 text-paper backdrop-blur-sm hover:bg-paper hover:text-brand-deep",
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
}) {
  const pad = size === "sm" ? "px-5 py-2.5 text-xs" : "px-7 py-3.5 text-sm";
  return (
    <Link
      href={href}
      className={`group/cta inline-flex items-center gap-2.5 rounded-pill font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${pad} ${variants[variant]} ${className}`}
    >
      {children}
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-1"
      >
        <path d="M4 10h11M11 5.5 15.5 10 11 14.5" />
      </svg>
    </Link>
  );
}
