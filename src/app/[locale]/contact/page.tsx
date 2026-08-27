import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { institute } from "@/content/institute";
import { PageHeader } from "@/components/ui/PageHeader";
import { TodoTag } from "@/components/ui/TodoTag";
import { Reveal } from "@/components/ui/Reveal";

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

      <section className="container-x grid gap-6 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-3">
        <Reveal className="flex">
          <div className="card w-full p-9">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
              {t("callTitle")}
            </h2>
            <ul className="mt-6 space-y-3">
              {institute.phones.map((p) => (
                <li key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className="inline-flex rounded-pill bg-brand-wash px-5 py-3 font-mono text-base tracking-wide text-brand-deep transition-colors duration-500 hover:bg-brand hover:text-paper"
                  >
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col items-start gap-2.5">
              <TodoTag kind="email" />
              <TodoTag kind="telegram" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="flex">
          <div className="card card-tint w-full p-9">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
              {t("hoursTitle")}
            </h2>
            <dl className="mt-6 space-y-3.5 text-sm">
              {[
                [t("hours.weekdays"), t("hours.weekdaysTime")],
                [t("hours.saturday"), t("hours.saturdayTime")],
                [t("hours.sunday"), t("hours.sundayClosed")],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between gap-4">
                  <dt className="text-muted">{day}</dt>
                  <dd className="text-graphite">{time}</dd>
                </div>
              ))}
            </dl>
            <h3 className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-brand">
              {t("accessibilityTitle")}
            </h3>
            <p className="mt-3 text-sm text-muted">{t("accessibility")}</p>
          </div>
        </Reveal>

        <Reveal delay={200} className="flex md:col-span-2 lg:col-span-1">
          <div className="card w-full p-9">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
              {t("addressTitle")}
            </h2>
            <p className="mt-5 text-graphite">{t("address")}</p>
            <h3 className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-brand">
              {t("directionsTitle")}
            </h3>
            <p className="mt-3 text-sm text-muted">{t("directions")}</p>
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-20 sm:pb-28">
        <Reveal>
          <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
            {t("mapTitle")}
          </h2>
          {/* Keyless embed, lazy-loaded below the fold — costs nothing until
              scrolled near. Landmark directions above are the primary aid. */}
          <div className="mt-6 aspect-[4/3] w-full overflow-hidden rounded-lg shadow-soft sm:aspect-[21/9]">
            <iframe
              src={MAP_EMBED_SRC}
              title={t("mapIframeTitle")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
              style={{ border: 0 }}
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
