import { Link } from "@/i18n/navigation";
import { GrainArrow } from "@/components/atelier/GrainArrow";

type Variant = "primary" | "outline" | "on-deep";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-paper hover:bg-brand-deep",
  outline: "border border-brand/40 text-brand hover:bg-brand-wash hover:border-brand",
  "on-deep": "border border-paper/40 text-paper hover:bg-paper hover:text-brand-deep",
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
  const pad = size === "sm" ? "px-4 py-2" : "px-6 py-3.5";
  return (
    <Link
      href={href}
      className={`group/cta inline-flex items-center gap-3 rounded-sm font-mono text-xs uppercase tracking-[0.14em] transition-colors ${pad} ${variants[variant]} ${className}`}
    >
      {children}
      <GrainArrow className="w-7 shrink-0 transition-transform group-hover/cta:translate-x-1" />
    </Link>
  );
}
