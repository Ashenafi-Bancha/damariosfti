import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleToggle } from "./LocaleToggle";
import { CtaLink } from "@/components/ui/CtaLink";

export function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const tl = useTranslations("localeToggle");

  const links = [
    { href: "/programmes", label: t("programmes") },
    { href: "/about", label: t("about") },
    { href: "/admissions", label: t("admissions") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="border-b border-chalk/10">
      <div className="container-x flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl text-chalk">
            {tc("wordmarkTop")}
          </span>
          <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-slate">
            {tc("wordmarkSub")}
          </span>
        </Link>

        {/* Single nav element: full-width scrollable row on mobile,
            inline on md+ — no duplicated landmarks, zero JS. */}
        <nav
          aria-label={t("menuLabel")}
          className="order-3 -mx-4 basis-full overflow-x-auto px-4 md:order-2 md:mx-0 md:basis-auto md:overflow-visible md:px-0"
        >
          <ul className="flex items-center gap-5 whitespace-nowrap text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-chalk-dim transition-colors hover:text-chalk"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="order-2 flex items-center gap-3 md:order-3">
          <LocaleToggle
            locale={locale}
            labels={{ label: tl("label"), en: tl("en"), am: tl("am") }}
          />
          <CtaLink href="/apply" size="sm" className="hidden sm:inline-flex">
            {t("apply")}
          </CtaLink>
        </div>
      </div>
    </header>
  );
}
