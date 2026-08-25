import { Link } from "@/i18n/navigation";
import { GrainArrow } from "@/components/atelier/GrainArrow";

type Variant = "primary" | "outline" | "outline-ink";

const variants: Record<Variant, string> = {
  primary: "bg-saffron text-ink hover:bg-chalk",
  outline:
    "border border-chalk-dim/40 text-chalk hover:border-saffron hover:text-saffron",
  "outline-ink": "border border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-chalk",
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
      className={`group/cta inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${pad} ${variants[variant]} ${className}`}
    >
      {children}
      <GrainArrow className="w-7 shrink-0 transition-transform group-hover/cta:translate-x-1" />
    </Link>
  );
}
