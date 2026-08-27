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
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
            {t("subtitle")}
          </p>
          <h1 className="mt-4 font-display text-display-xl text-brand-deep">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{t("intro")}</p>
        </div>
        {/* Portrait placeholder — client to supply imagery */}
        <div className="pattern-paper flex aspect-[3/4] w-full max-w-[300px] flex-col items-center justify-center gap-4 rounded-sm border border-dashed border-brand/40 bg-paper-tint">
          <svg
            viewBox="0 0 60 80"
            className="w-16 text-brand/40"
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
        <h2 className="font-display text-display-md text-brand-deep">
          {t("timelineTitle")}
        </h2>
        <ol className="mt-10">
          {founder.timeline.map((stage, i) => (
            <li key={stage}>
              {i > 0 && <SeamDivider className="my-10" />}
              <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:gap-10">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {t(`timeline.${stage}.period`)}
                  </p>
                  <p className="mt-2 font-display text-display-sm text-brand">
                    {t(`timeline.${stage}.place`)}
                  </p>
                </div>
                <p className="max-w-xl self-center text-muted">
                  {t(`timeline.${stage}.body`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="on-deep pattern-paper-strong bg-brand-deep">
        <div className="container-x grid gap-12 py-14 sm:py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-display-md text-paper">
              {t("recognitionTitle")}
            </h2>
            <ul className="mt-6 space-y-4">
              {founder.recognition.map((r) => (
                <li key={r.key} className="flex items-baseline gap-5">
                  <span className="font-mono text-sm tracking-wider text-brand-bright">
                    {r.year}
                  </span>
                  <span className="text-on-deep">
                    {t(`recognition.${r.key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-display-md text-paper">
              {t("showsTitle")}
            </h2>
            <p className="mt-6 text-on-deep">{t("showsBody")}</p>
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
