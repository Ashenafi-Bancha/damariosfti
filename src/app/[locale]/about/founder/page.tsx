import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { founder } from "@/content/founder";
import { TodoTag } from "@/components/ui/TodoTag";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";

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
      <header className="aura relative pt-16 sm:pt-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="inline-flex rounded-pill bg-brand-wash px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-brand">
              {t("subtitle")}
            </p>
            <h1 className="mt-5 font-display text-display-xl text-brand-deep">
              {t("title")}
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-muted">{t("intro")}</p>
          </div>
          {/* Portrait placeholder — client to supply imagery */}
          <div className="card card-tint mx-auto flex aspect-[4/5] w-full max-w-[320px] flex-col items-center justify-center gap-5 overflow-hidden">
            <svg
              viewBox="0 0 60 80"
              className="w-16 text-brand/30"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="30" cy="24" r="12" />
              <path d="M8 76c2-20 12-28 22-28s20 8 22 28" />
            </svg>
            <TodoTag kind="portrait" />
          </div>
        </div>
      </header>

      <section className="container-x py-20 sm:py-28">
        <Reveal>
          <h2 className="font-display text-display-md text-brand-deep">
            {t("timelineTitle")}
          </h2>
        </Reveal>

        {/* A continuous thread down the page rather than boxed stages */}
        <ol className="relative mt-14 space-y-14 before:absolute before:bottom-6 before:left-[7px] before:top-3 before:w-px before:bg-gradient-to-b before:from-brand before:via-brand-bright before:to-transparent sm:space-y-16">
          {founder.timeline.map((stage, i) => (
            <Reveal as="li" key={stage} delay={i * 80} className="relative pl-10">
              <span
                aria-hidden="true"
                className="absolute left-0 top-2.5 h-[15px] w-[15px] rounded-pill border-[3px] border-paper bg-brand shadow-soft"
              />
              <div className="grid gap-3 sm:grid-cols-[190px_1fr] sm:gap-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">
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
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x py-8 sm:py-12">
        <Reveal>
          <div className="on-deep relative overflow-hidden rounded-xl bg-brand-deep px-8 py-16 shadow-deep sm:px-14 sm:py-20">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-pill bg-brand-bright/20 blur-3xl"
            />
            <div className="relative grid gap-14 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-display-md text-paper">
                  {t("recognitionTitle")}
                </h2>
                <ul className="mt-8 space-y-6">
                  {founder.recognition.map((r) => (
                    <li key={r.key} className="flex items-baseline gap-6">
                      <span className="font-mono text-sm tracking-wide text-brand-bright">
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
                <p className="mt-8 text-on-deep">{t("showsBody")}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="container-x py-16">
        <CtaLink href="/about" variant="ghost">
          {tn("about")}
        </CtaLink>
      </div>
    </>
  );
}
