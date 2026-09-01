import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
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

  const facts = [
    { title: t("locationTitle"), body: t("locationBody") },
    { title: t("accessibilityTitle"), body: t("accessibilityBody") },
  ];

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />

      <section className="container-x grid gap-6 py-16 sm:py-20 lg:grid-cols-2">
        <Reveal className="flex">
          <figure className="card card-tint w-full p-9 sm:p-11">
            <figcaption className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
              {t("visionTitle")}
            </figcaption>
            <blockquote className="mt-5 font-display text-display-sm leading-snug text-brand-deep">
              “{t("vision")}”
            </blockquote>
          </figure>
        </Reveal>

        <Reveal delay={100} className="flex">
          <div className="card w-full p-9 sm:p-11">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
              {t("accreditationTitle")}
            </h2>
            <p className="mt-4 text-sm text-muted">{t("accreditationBody")}</p>
          </div>
        </Reveal>
      </section>

      <section className="container-x grid gap-10 pb-16 sm:pb-20 lg:grid-cols-3">
        {facts.map((f, i) => (
          <Reveal key={f.title} delay={i * 90}>
            <h2 className="font-display text-display-sm text-brand-deep">
              {f.title}
            </h2>
            <p className="mt-4 text-sm text-muted">{f.body}</p>
          </Reveal>
        ))}
        <Reveal delay={180}>
          <h2 className="font-display text-display-sm text-brand-deep">
            {t("hoursTitle")}
          </h2>
          <dl className="mt-4 space-y-2.5 text-sm">
            {[
              [tc("weekdays"), tc("weekdaysTime")],
              [tc("saturday"), tc("saturdayTime")],
              [tc("sunday"), tc("sundayClosed")],
            ].map(([day, time]) => (
              <div key={day} className="flex justify-between gap-4">
                <dt className="text-muted">{day}</dt>
                <dd className="text-graphite">{time}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="container-x grid gap-6 pb-16 sm:grid-cols-2 sm:pb-20">
        {[
          {
            href: "/about/founder",
            title: t("founderCard.title"),
            body: t("founderCard.body"),
            cta: t("founderCard.cta"),
          },
          {
            href: "/about/partnerships",
            title: t("partnershipsCard.title"),
            body: t("partnershipsCard.body"),
            cta: t("partnershipsCard.cta"),
          },
        ].map((c, i) => (
          <Reveal key={c.href} delay={i * 100} className="flex">
            <Link
              href={c.href}
              className="card card-interactive group w-full p-9 sm:p-10"
            >
              <h2 className="font-display text-display-sm text-brand-deep">
                {c.title}
              </h2>
              <p className="mt-3 text-sm text-muted">{c.body}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-brand">
                {c.cta}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </section>

      <div className="container-x pb-8">
        <CtaLink href="/admissions" variant="ghost">
          {tn("admissions")}
        </CtaLink>
      </div>
    </>
  );
}
