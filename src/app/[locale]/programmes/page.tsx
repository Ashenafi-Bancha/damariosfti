import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { programmes } from "@/content/programmes";
import { PageHeader } from "@/components/ui/PageHeader";
import { PatternCard } from "@/components/atelier/PatternCard";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "programmes", "/programmes");
}

export default async function ProgrammesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProgrammesIndex />;
}

function ProgrammesIndex() {
  const t = useTranslations("programmes.index");
  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <section className="container-x py-16 sm:py-20">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 70} className="flex">
              <PatternCard programme={p} headingLevel="h2" />
            </Reveal>
          ))}
        </ul>
        <p className="mt-12 max-w-md text-xs text-muted">{t("tuitionNote")}</p>
      </section>
    </>
  );
}
