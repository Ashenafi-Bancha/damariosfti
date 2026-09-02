import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { programmes } from "@/content/programmes";
import { SocialLinks } from "./SocialLinks";
import { Wordmark } from "@/components/brand/Logo";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const instituteLinks = [
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/about", label: t("nav.about") },
    { href: "/about/founder", label: t("nav.founder") },
    { href: "/about/partnerships", label: t("nav.partnerships") },
    { href: "/admissions", label: t("nav.admissions") },
    { href: "/apply", label: t("nav.apply") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="on-deep relative mt-24 overflow-hidden bg-brand-deep">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-pill bg-brand-bright/12 blur-3xl"
      />

      <div className="container-x relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark
            tone="paper"
            size="lg"
            name={t("common.wordmarkTop")}
            tagline={t("common.wordmarkSub")}
          />
          <p className="mt-5 max-w-xs text-sm text-on-deep">
            {t("footer.tagline")}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-brand-bright">
            {t("footer.programmesTitle")}
          </h2>
          <ul className="mt-5 space-y-2.5">
            {programmes.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/programmes/${p.slug}`}
                  className="text-sm text-on-deep transition-colors duration-500 hover:text-paper"
                >
                  {t(`programmes.items.${p.slug}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-brand-bright">
            {t("footer.instituteTitle")}
          </h2>
          <ul className="mt-5 space-y-2.5">
            {instituteLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-on-deep transition-colors duration-500 hover:text-paper"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Follow us: right-aligned on desktop, centred on mobile. */}
      <div className="container-x relative flex justify-center pb-12 md:justify-end">
        <SocialLinks label={t("footer.followUs")} />
      </div>

      <div className="relative border-t border-paper/10">
        <div className="container-x py-7 text-center text-xs text-on-deep">
          {t("footer.rights", { year })}
        </div>
      </div>
    </footer>
  );
}
