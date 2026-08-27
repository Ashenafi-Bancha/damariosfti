import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { institute } from "@/content/institute";
import { programmes } from "@/content/programmes";
import { TodoTag } from "@/components/ui/TodoTag";
import { Wordmark } from "@/components/brand/Logo";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const instituteLinks = [
    { href: "/about", label: t("nav.about") },
    { href: "/about/founder", label: t("nav.founder") },
    { href: "/about/partnerships", label: t("nav.partnerships") },
    { href: "/admissions", label: t("nav.admissions") },
    { href: "/apply", label: t("nav.apply") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="on-deep pattern-paper-strong mt-24 bg-brand-deep">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Wordmark
            tone="paper"
            name={t("common.wordmarkTop")}
            tagline={t("common.wordmarkSub")}
          />
          <p className="mt-5 max-w-xs text-sm text-on-deep">
            {t("footer.tagline")}
          </p>
          <p className="mt-4 max-w-xs text-xs text-on-deep/80">
            {t("footer.accreditedBy")}
          </p>
        </div>

        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-bright">
            {t("footer.visitTitle")}
          </h2>
          <p className="mt-4 text-sm text-on-deep">{t("home.visit.address")}</p>
          <p className="mt-2 text-sm text-on-deep">
            {t("home.visit.hoursShort")}
          </p>
          <ul className="mt-4 space-y-1">
            {institute.phones.map((p) => (
              <li key={p.tel}>
                <a
                  href={`tel:${p.tel}`}
                  className="text-sm text-paper underline decoration-brand-bright/60 underline-offset-4 hover:decoration-brand-bright"
                >
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col items-start gap-2">
            <TodoTag kind="email" on="deep" />
            <TodoTag kind="telegram" on="deep" />
          </div>
        </div>

        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-bright">
            {t("footer.programmesTitle")}
          </h2>
          <ul className="mt-4 space-y-2">
            {programmes.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/programmes/${p.slug}`}
                  className="text-sm text-on-deep transition-colors hover:text-paper"
                >
                  {t(`programmes.items.${p.slug}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-bright">
            {t("footer.instituteTitle")}
          </h2>
          <ul className="mt-4 space-y-2">
            {instituteLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-on-deep transition-colors hover:text-paper"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="container-x flex flex-col gap-2 py-6 font-mono text-[11px] text-on-deep sm:flex-row sm:items-center sm:justify-between">
          <p>
            {t("footer.certificateLabel")}{" "}
            <span className="text-paper">
              {institute.accreditation.certificateNo}
            </span>
            <span aria-hidden="true"> · </span>
            {t("footer.licenceLabel")}{" "}
            <span className="text-paper">
              {institute.accreditation.tradeLicenceNo}
            </span>
          </p>
          <p>{t("footer.rights", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
