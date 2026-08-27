import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { institute } from "@/content/institute";
import { PageHeader } from "@/components/ui/PageHeader";
import { SeamDivider } from "@/components/atelier/SeamDivider";
import { TodoTag } from "@/components/ui/TodoTag";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Contact />;
}

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Kkare%20Building%2C%20Bole%2C%20Addis%20Ababa%2C%20Ethiopia&output=embed";

function Contact() {
  const t = useTranslations("contact");

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <SeamDivider className="container-x mt-10" />

      <section className="container-x grid gap-5 py-10 sm:py-14 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-sm border border-line bg-paper-tint p-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
            {t("callTitle")}
          </h2>
          <ul className="mt-4 space-y-3">
            {institute.phones.map((p) => (
              <li key={p.tel}>
                <a
                  href={`tel:${p.tel}`}
                  className="font-mono text-xl tracking-wide text-brand-deep underline decoration-brand/40 underline-offset-8 hover:decoration-brand"
                >
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col items-start gap-2">
            <TodoTag kind="email" />
            <TodoTag kind="telegram" />
          </div>
        </div>

        <div className="rounded-sm border border-line bg-paper-tint p-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
            {t("hoursTitle")}
          </h2>
          <dl className="mt-4 space-y-2 font-mono text-sm text-muted">
            <div className="flex justify-between gap-4 border-b border-dashed border-line pb-2">
              <dt>{t("hours.weekdays")}</dt>
              <dd className="text-graphite">{t("hours.weekdaysTime")}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-dashed border-line pb-2">
              <dt>{t("hours.saturday")}</dt>
              <dd className="text-graphite">{t("hours.saturdayTime")}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>{t("hours.sunday")}</dt>
              <dd className="text-graphite">{t("hours.sundayClosed")}</dd>
            </div>
          </dl>
          <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
            {t("accessibilityTitle")}
          </h3>
          <p className="mt-2 text-sm text-muted">{t("accessibility")}</p>
        </div>

        <div className="rounded-sm border border-line bg-paper-tint p-6 md:col-span-2 lg:col-span-1">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
            {t("addressTitle")}
          </h2>
          <p className="mt-4 text-graphite">{t("address")}</p>
          <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
            {t("directionsTitle")}
          </h3>
          <p className="mt-2 text-sm text-muted">{t("directions")}</p>
        </div>
      </section>

      <section className="container-x pb-16">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
          {t("mapTitle")}
        </h2>
        {/* Keyless embed, lazy-loaded below the fold — costs nothing until
            scrolled near. Landmark directions above are the primary aid. */}
        <div className="mt-4 aspect-[4/3] w-full overflow-hidden rounded-sm border border-line sm:aspect-[21/9]">
          <iframe
            src={MAP_EMBED_SRC}
            title={t("mapIframeTitle")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
            style={{ border: 0 }}
          />
        </div>
      </section>
    </>
  );
}
