import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { institute } from "@/content/institute";
import { PageHeader } from "@/components/ui/PageHeader";
import { SeamDivider } from "@/components/atelier/SeamDivider";
import { CtaLink } from "@/components/ui/CtaLink";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "about", "/about");
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <About />;
}

function About() {
  const t = useTranslations("about");
  const tc = useTranslations("contact.hours");
  const tn = useTranslations("nav");

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <SeamDivider className="container-x mt-10" />

      <section className="container-x grid gap-5 py-10 sm:py-14 lg:grid-cols-2">
        <figure className="rounded-sm border-l-2 border-brand bg-brand-wash p-6 sm:p-8">
          <figcaption className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
            {t("visionTitle")}
          </figcaption>
          <blockquote className="mt-3 text-lg leading-relaxed text-brand-deep">
            “{t("vision")}”
          </blockquote>
        </figure>

        <div className="rounded-sm border border-line bg-paper-tint p-6 sm:p-8">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
            {t("accreditationTitle")}
          </h2>
          <p className="mt-3 text-sm text-muted">{t("accreditationBody")}</p>
          <dl className="mt-5 space-y-3 font-mono text-xs">
            <div>
              <dt className="text-muted">{t("certificateLabel")}</dt>
              <dd className="mt-1 text-base tracking-wider text-brand-deep">
                {institute.accreditation.certificateNo}
              </dd>
            </div>
            <div>
              <dt className="text-muted">{t("licenceLabel")}</dt>
              <dd className="mt-1 tracking-wider text-graphite">
                {institute.accreditation.tradeLicenceNo}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="container-x grid gap-10 pb-10 sm:pb-14 lg:grid-cols-3">
        <div>
          <h2 className="font-display text-display-sm text-brand-deep">
            {t("locationTitle")}
          </h2>
          <p className="mt-3 text-sm text-muted">{t("locationBody")}</p>
        </div>
        <div>
          <h2 className="font-display text-display-sm text-brand-deep">
            {t("accessibilityTitle")}
          </h2>
          <p className="mt-3 text-sm text-muted">{t("accessibilityBody")}</p>
        </div>
        <div>
          <h2 className="font-display text-display-sm text-brand-deep">
            {t("hoursTitle")}
          </h2>
          <dl className="mt-3 space-y-1 font-mono text-xs text-muted">
            <div className="flex justify-between gap-4">
              <dt>{tc("weekdays")}</dt>
              <dd className="text-graphite">{tc("weekdaysTime")}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>{tc("saturday")}</dt>
              <dd className="text-graphite">{tc("saturdayTime")}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>{tc("sunday")}</dt>
              <dd className="text-graphite">{tc("sundayClosed")}</dd>
            </div>
          </dl>
        </div>
      </section>

      <SeamDivider className="container-x" />

      <section className="container-x grid gap-5 py-10 sm:py-14 sm:grid-cols-2">
        <Link
          href="/about/founder"
          className="group rounded-sm border border-line p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_10px_28px_rgb(11_56_104/0.08)]"
        >
          <h2 className="font-display text-display-sm text-brand-deep">
            {t("founderCard.title")}
          </h2>
          <p className="mt-2 text-sm text-muted">{t("founderCard.body")}</p>
          <span className="mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-brand">
            {t("founderCard.cta")} →
          </span>
        </Link>
        <Link
          href="/about/partnerships"
          className="group rounded-sm border border-line p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_10px_28px_rgb(11_56_104/0.08)]"
        >
          <h2 className="font-display text-display-sm text-brand-deep">
            {t("partnershipsCard.title")}
          </h2>
          <p className="mt-2 text-sm text-muted">{t("partnershipsCard.body")}</p>
          <span className="mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-brand">
            {t("partnershipsCard.cta")} →
          </span>
        </Link>
      </section>

      <div className="container-x pb-4">
        <CtaLink href="/admissions" variant="outline">
          {tn("admissions")}
        </CtaLink>
      </div>
    </>
  );
}
