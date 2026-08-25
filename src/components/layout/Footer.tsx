import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { institute } from "@/content/institute";
import { programmes } from "@/content/programmes";
import { TodoTag } from "@/components/ui/TodoTag";

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
    <footer className="pattern-paper mt-24 border-t border-chalk/10 bg-ink-raised">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl text-chalk">
            {t("common.wordmarkTop")}
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-slate">
            {t("common.wordmarkSub")}
          </p>
          <p className="mt-4 max-w-xs text-sm text-chalk-dim">
            {t("footer.tagline")}
          </p>
          <p className="mt-4 max-w-xs text-xs text-slate">
            {t("footer.accreditedBy")}
          </p>
        </div>

        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
            {t("footer.visitTitle")}
          </h2>
          <p className="mt-4 text-sm text-chalk-dim">{t("home.visit.address")}</p>
          <p className="mt-2 text-sm text-chalk-dim">
            {t("home.visit.hoursShort")}
          </p>
          <ul className="mt-4 space-y-1">
            {institute.phones.map((p) => (
              <li key={p.tel}>
                <a
                  href={`tel:${p.tel}`}
                  className="text-sm text-chalk underline decoration-saffron/50 underline-offset-4 hover:decoration-saffron"
                >
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col items-start gap-2">
            <TodoTag kind="email" />
            <TodoTag kind="telegram" />
          </div>
        </div>

        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
            {t("footer.programmesTitle")}
          </h2>
          <ul className="mt-4 space-y-2">
            {programmes.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/programmes/${p.slug}`}
                  className="text-sm text-chalk-dim transition-colors hover:text-chalk"
                >
                  {t(`programmes.items.${p.slug}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
            {t("footer.instituteTitle")}
          </h2>
          <ul className="mt-4 space-y-2">
            {instituteLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-chalk-dim transition-colors hover:text-chalk"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-chalk/10">
        <div className="container-x flex flex-col gap-2 py-6 font-mono text-[11px] text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>
            {t("footer.certificateLabel")}{" "}
            <span className="text-chalk-dim">
              {institute.accreditation.certificateNo}
            </span>
            <span aria-hidden="true"> · </span>
            {t("footer.licenceLabel")}{" "}
            <span className="text-chalk-dim">
              {institute.accreditation.tradeLicenceNo}
            </span>
          </p>
          <p>{t("footer.rights", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
