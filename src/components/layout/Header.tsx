import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CtaLink } from "@/components/ui/CtaLink";
import { Wordmark } from "@/components/brand/Logo";

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");

  const links = [
    { href: "/", label: t("home") },
    { href: "/programmes", label: t("programmes") },
    { href: "/gallery", label: t("gallery") },
    { href: "/about", label: t("about") },
    { href: "/admissions", label: t("admissions") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper/80 backdrop-blur-xl">
      <div className="container-x flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
        <Link href="/" aria-label={tc("instituteName")} className="rounded-md">
          <Wordmark
            name={tc("wordmarkTop")}
            tagline={tc("wordmarkSub")}
            priority
          />
        </Link>

        {/* Single nav element: full-width scrollable row on mobile,
            inline on md+ — no duplicated landmarks, zero JS. */}
        <nav
          aria-label={t("menuLabel")}
          className="order-3 -mx-5 basis-full overflow-x-auto px-5 md:order-2 md:mx-0 md:basis-auto md:overflow-visible md:px-0"
        >
          <ul className="flex items-center gap-1 whitespace-nowrap">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex rounded-pill px-4 py-2 text-sm text-graphite transition-colors duration-500 hover:bg-brand-wash hover:text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="order-2 md:order-3">
          <CtaLink href="/apply" size="sm" className="hidden sm:inline-flex">
            {t("apply")}
          </CtaLink>
        </div>
      </div>
    </header>
  );
}
