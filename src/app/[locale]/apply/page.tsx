import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { programmes } from "@/content/programmes";
import {
  EDUCATION_OPTIONS,
  HEARD_OPTIONS,
  INTAKE_OPTIONS,
} from "@/lib/applySchema";
import { PageHeader } from "@/components/ui/PageHeader";
import { ApplyForm, type ApplyFormStrings } from "@/components/forms/ApplyForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "apply", "/apply");
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("apply");
  const tp = await getTranslations("programmes");
  const tn = await getTranslations("nav");

  /* All strings resolved server-side and passed down as props, so the
     client bundle carries no next-intl runtime at all. */
  const strings: ApplyFormStrings = {
    form: t.raw("form") as ApplyFormStrings["form"],
    errors: t.raw("errors") as ApplyFormStrings["errors"],
    success: t.raw("success") as ApplyFormStrings["success"],
    failure: t.raw("failure") as ApplyFormStrings["failure"],
  };

  const programmeOptions = programmes.map((p) => ({
    value: p.slug,
    label: tp(`items.${p.slug}.name`),
  }));
  const levelOptions = [
    { value: "not-sure", label: t("form.levelNotSure") },
    ...[2, 3, 4].map((n) => ({
      value: String(n),
      label: t("form.levelOption", { n }),
    })),
  ];
  const intakeKey: Record<(typeof INTAKE_OPTIONS)[number], string> = {
    asap: "intakeAsap",
    soon: "intakeSoon",
    later: "intakeLater",
  };
  const intakeOptions = INTAKE_OPTIONS.map((v) => ({
    value: v,
    label: t(`form.${intakeKey[v]}`),
  }));
  const educationOptions = EDUCATION_OPTIONS.map((v) => ({
    value: v,
    label: t(`form.educationOptions.${v}`),
  }));
  const heardOptions = HEARD_OPTIONS.map((v) => ({
    value: v,
    label: t(`form.heardOptions.${v}`),
  }));

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} back={{ href: "/", label: tn("back") }}
      />
      <section className="container-x py-14 sm:py-20">
        <div className="card card-tint max-w-2xl p-8 sm:p-11">
          <ApplyForm
            strings={strings}
            programmeOptions={programmeOptions}
            levelOptions={levelOptions}
            intakeOptions={intakeOptions}
            educationOptions={educationOptions}
            heardOptions={heardOptions}
          />
        </div>
      </section>
    </>
  );
}
