import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { programmes } from "@/content/programmes";
import { PageHeader } from "@/components/ui/PageHeader";
import { PatternCard } from "@/components/atelier/PatternCard";
import { SeamDivider } from "@/components/atelier/SeamDivider";

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
      <SeamDivider className="container-x mt-10" />
      <section className="container-x py-10 sm:py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p) => (
            <PatternCard key={p.slug} programme={p} headingLevel="h2" />
          ))}
        </div>
        <p className="mt-8 max-w-md text-xs text-muted">{t("tuitionNote")}</p>
      </section>
    </>
  );
}
