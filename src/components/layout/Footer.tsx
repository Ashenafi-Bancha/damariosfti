import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { programmes } from "@/content/programmes";
import { institute } from "@/content/institute";
import { SocialLinks } from "./SocialLinks";
import { Wordmark } from "@/components/brand/Logo";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  /* The founder's line points at her own site — the institute keeps no
     retelling of her story. Everything else is a route here. */
  const instituteLinks = [
    { href: "/gallery", label: t("nav.gallery"), external: false },
    { href: "/about", label: t("nav.about"), external: false },
    {
      href: institute.founderSite,
      label: t("nav.founder"),
      external: true,
      note: t("nav.founderNewTab"),
    },
    { href: "/about/partnerships", label: t("nav.partnerships"), external: false },
    { href: "/admissions", label: t("nav.admissions"), external: false },
    { href: "/apply", label: t("nav.apply"), external: false },
    { href: "/contact", label: t("nav.contact"), external: false },
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

          {/* Desktop only: sits in the space under the lockup. */}
          <div className="mt-9 hidden lg:block">
            <SocialLinks label={t("footer.followUs")} align="start" />
          </div>
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
            {instituteLinks.map((l) => {
              const cls =
                "text-sm text-on-deep transition-colors duration-500 hover:text-paper";
              return (
                <li key={l.href}>
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cls}
                    >
                      {l.label}
                      <span className="sr-only">{l.note}</span>
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  ) : (
                    <Link href={l.href} className={cls}>
                      {l.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Below lg it keeps its own centred row instead. */}
      <div className="container-x relative flex justify-center pb-12 lg:hidden">
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
