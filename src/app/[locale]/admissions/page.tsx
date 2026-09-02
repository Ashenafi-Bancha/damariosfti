import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaLink } from "@/components/ui/CtaLink";
import { TodoTag } from "@/components/ui/TodoTag";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "admissions", "/admissions");
}

export default async function AdmissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Admissions />;
}

function Admissions() {
  const t = useTranslations("admissions");
  const tn = useTranslations("nav");
  const steps = t.raw("steps") as { title: string; body: string }[];

  const gaps = [
    { title: t("requirementsTitle"), kind: "requirements" as const },
    { title: t("intakesTitle"), kind: "intake" as const },
    { title: t("tuitionTitle"), kind: "tuition" as const },
  ];

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} back={{ href: "/", label: tn("back") }}
      />

      <section className="container-x py-16 sm:py-20">
        <Reveal>
          <h2 className="font-display text-display-md text-brand-deep">
            {t("stepsTitle")}
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="flex">
              <div className="card card-tint w-full p-9">
                <span className="flex h-11 w-11 items-center justify-center rounded-pill bg-brand font-mono text-sm text-paper">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-display-sm text-brand-deep">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x grid gap-10 pb-16 sm:pb-20 md:grid-cols-3">
        {gaps.map((g, i) => (
          <Reveal key={g.title} delay={i * 90}>
            <h2 className="font-display text-display-sm text-brand-deep">
              {g.title}
            </h2>
            <div className="mt-5">
              <TodoTag kind={g.kind} />
            </div>
          </Reveal>
        ))}
      </section>

      <section className="container-x pb-20 sm:pb-28">
        <Reveal>
          <div className="card card-tint flex flex-wrap items-center justify-between gap-8 px-9 py-12 sm:px-12">
            <div>
              <h2 className="font-display text-display-sm text-brand-deep">
                {t("contactTitle")}
              </h2>
              <p className="mt-3 max-w-md text-sm text-muted">
                {t("contactBody")}
              </p>
            </div>
            <CtaLink href="/apply">{t("applyCta")}</CtaLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
