import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { institute } from "@/content/institute";
import { programmes } from "@/content/programmes";
import { Hero } from "@/components/hero/Hero";
import { SeamDivider } from "@/components/atelier/SeamDivider";
import { PatternCard } from "@/components/atelier/PatternCard";
import { GrainArrow } from "@/components/atelier/GrainArrow";
import { CtaLink } from "@/components/ui/CtaLink";
import { TodoTag } from "@/components/ui/TodoTag";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "home", "");
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <IntroSection />
      <SeamDivider className="container-x" />
      <ProgrammesSection />
      <SeamDivider className="container-x" />
      <FounderTeaser />
      <InstitutionalSection />
      <SeamDivider className="container-x" />
      <VisitSection />
    </>
  );
}

function IntroSection() {
  const t = useTranslations("home.intro");
  return (
    <section className="container-x grid gap-10 py-16 sm:py-20 lg:grid-cols-2">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
          {t("kicker")}
        </p>
        <h2 className="mt-4 font-display text-display-lg text-brand-deep">
          {t("title")}
        </h2>
        <p className="mt-5 max-w-prose text-muted">{t("body")}</p>
      </div>
      <figure className="self-center rounded-sm border-l-2 border-brand bg-brand-wash p-6 sm:p-8">
        <figcaption className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
          {t("visionLabel")}
        </figcaption>
        <blockquote className="mt-3 text-lg leading-relaxed text-brand-deep">
          “{t("vision")}”
        </blockquote>
      </figure>
    </section>
  );
}

function ProgrammesSection() {
  const t = useTranslations("home.programmes");
  const tp = useTranslations("programmes.index");
  return (
    <section className="container-x py-16 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
        {t("kicker")}
      </p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-xl font-display text-display-lg text-brand-deep">
          {t("title")}
        </h2>
        <p className="max-w-sm text-sm text-muted">{t("lead")}</p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {programmes.map((p) => (
          <PatternCard key={p.slug} programme={p} />
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-md text-xs text-muted">{tp("tuitionNote")}</p>
        <CtaLink href="/programmes" variant="outline">
          {t("cta")}
        </CtaLink>
      </div>
    </section>
  );
}

function FounderTeaser() {
  const t = useTranslations("home.founder");
  return (
    <section className="container-x py-16 sm:py-20">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
          {t("kicker")}
        </p>
        <h2 className="mt-4 font-display text-display-lg text-brand-deep">
          {t("title")}
        </h2>
        <p className="mt-5 max-w-prose text-muted">{t("body")}</p>
        <CtaLink href="/about/founder" variant="outline" className="mt-8">
          {t("cta")}
        </CtaLink>
      </div>
    </section>
  );
}

function InstitutionalSection() {
  const t = useTranslations("home.institutional");
  const sectors = t.raw("sectors") as string[];
  return (
    <section className="on-deep pattern-paper-strong bg-brand-deep">
      <div className="container-x py-16 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-bright">
          {t("kicker")}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-display-lg text-paper">
          {t("title")}
        </h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="rounded-sm border border-paper/15 bg-paper/5 p-6">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-bright">
              {t("accreditationTitle")}
            </h3>
            <p className="mt-3 text-sm text-on-deep">{t("accreditationBody")}</p>
            <dl className="mt-5 space-y-3 font-mono text-xs">
              <div>
                <dt className="text-on-deep">{t("certificateLabel")}</dt>
                <dd className="mt-1 text-base tracking-wider text-paper">
                  {institute.accreditation.certificateNo}
                </dd>
              </div>
              <div>
                <dt className="text-on-deep">{t("licenceLabel")}</dt>
                <dd className="mt-1 tracking-wider text-paper">
                  {institute.accreditation.tradeLicenceNo}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-sm border border-paper/15 bg-paper/5 p-6">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-bright">
              {t("capacityTitle")}
            </h3>
            <p className="mt-3 text-sm text-on-deep">{t("capacityBody")}</p>
            <ul className="mt-5 space-y-2.5">
              {sectors.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm text-paper">
                  <GrainArrow className="w-6 shrink-0 text-brand-bright" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sm border border-paper/15 bg-paper/5 p-6">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-bright">
              {t("partnershipsTitle")}
            </h3>
            <p className="mt-3 text-sm text-on-deep">{t("partnershipsBody")}</p>
            <CtaLink
              href="/about/partnerships"
              variant="on-deep"
              size="sm"
              className="mt-5"
            >
              {t("partnershipsCta")}
            </CtaLink>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          {/* CTA wired to a TODO PDF placeholder — becomes a real link when
              the client supplies the capability statement. A real disabled
              button so assistive tech announces the unavailable state. */}
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed items-center gap-3 rounded-sm bg-paper/25 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-paper"
          >
            {t("downloadCta")}
            <GrainArrow className="w-7 shrink-0" />
          </button>
          <TodoTag kind="pdf" on="deep" />
        </div>
      </div>
    </section>
  );
}

function VisitSection() {
  const t = useTranslations("home.visit");
  return (
    <section className="container-x py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
            {t("kicker")}
          </p>
          <h2 className="mt-4 font-display text-display-lg text-brand-deep">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-md text-graphite">{t("address")}</p>
          <p className="mt-2 max-w-md text-sm text-muted">{t("landmark")}</p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-muted">
            {t("hoursShort")}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            {institute.phones.map((p) => (
              <li key={p.tel}>
                <a
                  href={`tel:${p.tel}`}
                  className="font-medium text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
                >
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <CtaLink href="/contact" variant="outline">
          {t("cta")}
        </CtaLink>
      </div>
    </section>
  );
}
