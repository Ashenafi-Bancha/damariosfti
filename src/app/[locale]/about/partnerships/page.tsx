import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { SeamDivider } from "@/components/atelier/SeamDivider";
import { TodoTag } from "@/components/ui/TodoTag";

/*
 * NOTE (required, do not remove): the precise entitlements of this
 * partnership must be confirmed with the client before launch —
 * study-abroad claims are legally sensitive for an accredited institute.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "partnerships", "/about/partnerships");
}

export default async function PartnershipsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Partnerships />;
}

function Partnerships() {
  const t = useTranslations("partnerships");

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <SeamDivider className="container-x mt-10" />

      <section className="container-x grid gap-5 py-10 sm:py-14 lg:grid-cols-2">
        <article className="border border-chalk/15 bg-ink-raised p-7 sm:p-9">
          <h2 className="font-display text-display-md text-chalk">
            {t("rbs.name")}
          </h2>
          <p className="mt-4 text-chalk-dim">{t("rbs.facts")}</p>
          <p className="mt-4 text-chalk-dim">{t("rbs.framing")}</p>
        </article>

        <article className="border border-chalk/15 bg-ink-raised p-7 sm:p-9">
          <h2 className="font-display text-display-md text-chalk">
            {t("marioMakeup.name")}
          </h2>
          <p className="mt-4 text-chalk-dim">{t("marioMakeup.body")}</p>
          <div className="mt-6">
            <TodoTag kind="details" />
          </div>
        </article>
      </section>
    </>
  );
}
