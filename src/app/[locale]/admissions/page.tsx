import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { SeamDivider } from "@/components/atelier/SeamDivider";
import { CtaLink } from "@/components/ui/CtaLink";
import { TodoTag } from "@/components/ui/TodoTag";

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
  const steps = t.raw("steps") as { title: string; body: string }[];

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <SeamDivider className="container-x mt-10" />

      <section className="container-x py-10 sm:py-14">
        <h2 className="font-display text-display-md text-brand-deep">
          {t("stepsTitle")}
        </h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-sm border border-line bg-paper-tint p-6"
            >
              <span className="font-mono text-2xl text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-display-sm text-brand-deep">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-x grid gap-10 pb-10 sm:pb-14 md:grid-cols-3">
        <div>
          <h2 className="font-display text-display-sm text-brand-deep">
            {t("requirementsTitle")}
          </h2>
          <div className="mt-4">
            <TodoTag kind="requirements" />
          </div>
        </div>
        <div>
          <h2 className="font-display text-display-sm text-brand-deep">
            {t("intakesTitle")}
          </h2>
          <div className="mt-4">
            <TodoTag kind="intake" />
          </div>
        </div>
        <div>
          <h2 className="font-display text-display-sm text-brand-deep">
            {t("tuitionTitle")}
          </h2>
          <div className="mt-4">
            <TodoTag kind="tuition" />
          </div>
        </div>
      </section>

      <SeamDivider className="container-x" />

      <section className="container-x flex flex-wrap items-center justify-between gap-8 py-12">
        <div>
          <h2 className="font-display text-display-sm text-brand-deep">
            {t("contactTitle")}
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted">{t("contactBody")}</p>
        </div>
        <CtaLink href="/apply">{t("applyCta")}</CtaLink>
      </section>
    </>
  );
}
