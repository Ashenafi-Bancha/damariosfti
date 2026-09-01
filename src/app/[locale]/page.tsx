import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { institute } from "@/content/institute";
import { programmes } from "@/content/programmes";
import { Hero } from "@/components/hero/Hero";
import { PatternCard } from "@/components/atelier/PatternCard";
import { CtaLink } from "@/components/ui/CtaLink";
import { TodoTag } from "@/components/ui/TodoTag";
import { Reveal } from "@/components/ui/Reveal";

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
      <ProgrammesSection />
      <FounderTeaser />
      <InstitutionalSection />
      <VisitSection />
    </>
  );
}

function IntroSection() {
  const t = useTranslations("home.intro");
  return (
    <section className="container-x py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
            {t("kicker")}
          </p>
          <h2 className="mt-5 font-display text-display-lg text-brand-deep">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-prose text-muted">{t("body")}</p>
        </Reveal>

        <Reveal delay={120}>
          <figure className="card card-tint h-full overflow-hidden p-9 sm:p-11">
            <figcaption className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
              {t("visionLabel")}
            </figcaption>
            <blockquote className="mt-5 font-display text-display-sm leading-snug text-brand-deep">
              “{t("vision")}”
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function ProgrammesSection() {
  const t = useTranslations("home.programmes");
  const tp = useTranslations("programmes.index");
  return (
    <section className="aura aura-soft relative py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
                {t("kicker")}
              </p>
              <h2 className="mt-5 max-w-xl font-display text-display-lg text-brand-deep">
                {t("title")}
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted">{t("lead")}</p>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 70} className="flex">
              <PatternCard programme={p} />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={80}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-5">
            <p className="max-w-md text-xs text-muted">{tp("tuitionNote")}</p>
            <CtaLink href="/programmes" variant="ghost">
              {t("cta")}
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FounderTeaser() {
  const t = useTranslations("home.founder");
  return (
    <section className="container-x py-20 sm:py-28">
      <Reveal>
        <div className="card card-tint overflow-hidden px-9 py-14 sm:px-14 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
              {t("kicker")}
            </p>
            <h2 className="mt-5 font-display text-display-lg text-brand-deep">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-prose text-muted">{t("body")}</p>
            <CtaLink href="/about/founder" className="mt-9">
              {t("cta")}
            </CtaLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function InstitutionalSection() {
  const t = useTranslations("home.institutional");
  const sectors = t.raw("sectors") as string[];
  return (
    <section className="container-x py-8 sm:py-12">
      <Reveal>
        <div className="on-deep relative overflow-hidden rounded-xl bg-brand-deep px-8 py-16 shadow-deep sm:px-14 sm:py-20">
          {/* soft light bloom, no edges */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-pill bg-brand-bright/20 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-pill bg-brand/40 blur-3xl"
          />

          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-bright">
              {t("kicker")}
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-display-lg text-paper">
              {t("title")}
            </h2>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              <div className="card-glass p-8">
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-brand-bright">
                  {t("accreditationTitle")}
                </h3>
                <p className="mt-4 text-sm text-on-deep">
                  {t("accreditationBody")}
                </p>
                <p className="mt-5 text-sm text-paper">
                  {t("accreditationAuthority")}
                </p>
              </div>

              <div className="card-glass p-8">
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-brand-bright">
                  {t("capacityTitle")}
                </h3>
                <p className="mt-4 text-sm text-on-deep">{t("capacityBody")}</p>
                <ul className="mt-6 space-y-3">
                  {sectors.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-paper">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-pill bg-brand-bright"
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-glass flex flex-col p-8">
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-brand-bright">
                  {t("partnershipsTitle")}
                </h3>
                <p className="mt-4 flex-1 text-sm text-on-deep">
                  {t("partnershipsBody")}
                </p>
                <CtaLink
                  href="/about/partnerships"
                  variant="on-deep"
                  size="sm"
                  className="mt-7 self-start"
                >
                  {t("partnershipsCta")}
                </CtaLink>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              {/* CTA wired to a TODO PDF placeholder — becomes a real link when
                  the client supplies the capability statement. A real disabled
                  button so assistive tech announces the unavailable state. */}
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2.5 rounded-pill bg-paper/25 px-7 py-3.5 text-sm font-medium text-paper"
              >
                {t("downloadCta")}
              </button>
              <TodoTag kind="pdf" on="deep" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function VisitSection() {
  const t = useTranslations("home.visit");
  return (
    <section className="container-x py-20 sm:py-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
              {t("kicker")}
            </p>
            <h2 className="mt-5 font-display text-display-lg text-brand-deep">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-md text-graphite">{t("address")}</p>
            <p className="mt-2.5 max-w-md text-sm text-muted">{t("landmark")}</p>
            <p className="mt-5 text-sm text-muted">{t("hoursShort")}</p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {institute.phones.map((p) => (
                <li key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className="inline-flex rounded-pill bg-brand-wash px-5 py-2.5 text-sm font-medium text-brand transition-colors duration-500 hover:bg-brand hover:text-paper"
                  >
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <CtaLink href="/contact" variant="ghost">
            {t("cta")}
          </CtaLink>
        </div>
      </Reveal>
    </section>
  );
}
