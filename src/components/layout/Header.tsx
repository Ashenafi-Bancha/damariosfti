import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CtaLink } from "@/components/ui/CtaLink";
import { Wordmark } from "@/components/brand/Logo";
import { MobileMenu } from "./MobileMenu";

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
    /* relative so the mobile panel can anchor to the header's lower edge */
    <header className="relative sticky top-0 z-40 bg-paper/85 backdrop-blur-xl">
      <div className="container-x flex items-center justify-between gap-3 py-3">
        <Link href="/" aria-label={tc("instituteName")} className="rounded-md">
          <Wordmark
            name={tc("wordmarkTop")}
            tagline={tc("wordmarkSub")}
            priority
          />
        </Link>

        {/* Desktop: inline links. Mobile gets the menu panel instead. */}
        <nav aria-label={t("menuLabel")} className="hidden md:block">
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

        <div className="flex shrink-0 items-center gap-1.5">
          {/* On phones this moves into the hero, so the header keeps
              just the logo and the menu. */}
          <div className="hidden md:block">
            <CtaLink href="/apply" size="sm">
              {t("apply")}
            </CtaLink>
          </div>
          <MobileMenu
            links={links}
            openLabel={t("openMenu")}
            closeLabel={t("closeMenu")}
            menuLabel={t("menuLabel")}
          />
        </div>
      </div>
    </header>
  );
}
