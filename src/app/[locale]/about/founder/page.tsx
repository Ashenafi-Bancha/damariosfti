import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { founder } from "@/content/founder";
import { SeamDivider } from "@/components/atelier/SeamDivider";
import { TodoTag } from "@/components/ui/TodoTag";
import { CtaLink } from "@/components/ui/CtaLink";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "founder", "/about/founder");
}

export default async function FounderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Founder />;
}

function Founder() {
  const t = useTranslations("founder");
  const tn = useTranslations("nav");

  return (
    <>
      <header className="container-x grid gap-10 pt-14 sm:pt-20 lg:grid-cols-[1fr_300px]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-saffron">
            {t("subtitle")}
          </p>
          <h1 className="mt-4 font-display text-display-xl text-chalk">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-chalk-dim">{t("intro")}</p>
        </div>
        {/* Portrait placeholder — client to supply imagery */}
        <div className="flex aspect-[3/4] w-full max-w-[300px] flex-col items-center justify-center gap-4 border border-dashed border-chalk-dim/40 pattern-paper-strong">
          <svg
            viewBox="0 0 60 80"
            className="w-16 text-chalk-dim/50"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="30" cy="24" r="12" />
            <path d="M8 76c2-20 12-28 22-28s20 8 22 28" />
          </svg>
          <TodoTag kind="portrait" />
        </div>
      </header>

      <section className="container-x py-14 sm:py-20">
        <h2 className="font-display text-display-md text-chalk">
          {t("timelineTitle")}
        </h2>
        <ol className="mt-10">
          {founder.timeline.map((stage, i) => (
            <li key={stage}>
              {i > 0 && <SeamDivider className="my-10" />}
              <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:gap-10">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">
                    {t(`timeline.${stage}.period`)}
                  </p>
                  <p className="mt-2 font-display text-display-sm text-saffron">
                    {t(`timeline.${stage}.place`)}
                  </p>
                </div>
                <p className="max-w-xl self-center text-chalk-dim">
                  {t(`timeline.${stage}.body`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="pattern-paper-strong border-y border-chalk/10 bg-ink-raised">
        <div className="container-x grid gap-12 py-14 sm:py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-display-md text-chalk">
              {t("recognitionTitle")}
            </h2>
            <ul className="mt-6 space-y-4">
              {founder.recognition.map((r) => (
                <li key={r.key} className="flex items-baseline gap-5">
                  <span className="font-mono text-sm tracking-wider text-saffron">
                    {r.year}
                  </span>
                  <span className="text-chalk-dim">
                    {t(`recognition.${r.key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-display-md text-chalk">
              {t("showsTitle")}
            </h2>
            <p className="mt-6 text-chalk-dim">{t("showsBody")}</p>
          </div>
        </div>
      </section>

      <div className="container-x py-14">
        <CtaLink href="/about" variant="outline">
          ← {tn("about")}
        </CtaLink>
      </div>
    </>
  );
}
