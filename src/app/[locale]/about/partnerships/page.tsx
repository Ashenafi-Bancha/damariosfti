import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { TodoTag } from "@/components/ui/TodoTag";
import { Reveal } from "@/components/ui/Reveal";

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

      <section className="container-x grid gap-6 py-16 sm:py-20 lg:grid-cols-2">
        <Reveal className="flex">
          <article className="card w-full p-9 sm:p-11">
            <h2 className="font-display text-display-md text-brand-deep">
              {t("rbs.name")}
            </h2>
            <p className="mt-6 text-muted">{t("rbs.facts")}</p>
            <p className="mt-4 text-muted">{t("rbs.framing")}</p>
          </article>
        </Reveal>

        <Reveal delay={110} className="flex">
          <article className="card card-tint w-full p-9 sm:p-11">
            <h2 className="font-display text-display-md text-brand-deep">
              {t("marioMakeup.name")}
            </h2>
            <p className="mt-6 text-muted">{t("marioMakeup.body")}</p>
            <div className="mt-7">
              <TodoTag kind="details" />
            </div>
          </article>
        </Reveal>
      </section>
    </>
  );
}
