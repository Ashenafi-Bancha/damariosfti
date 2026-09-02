import { useTranslations } from "next-intl";
import { CtaLink } from "@/components/ui/CtaLink";
import { HeroMedia } from "./HeroMedia";

export function Hero() {
  const t = useTranslations("hero");
  const tn = useTranslations("nav");

  return (
    <section className="aura relative overflow-hidden">
      <div className="hero-grid container-x grid items-center gap-10 pb-20 pt-10 sm:gap-14 sm:pb-28 sm:pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:pb-32">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2.5 rounded-pill bg-brand-wash px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-brand">
            <span className="h-1.5 w-1.5 rounded-pill bg-brand" aria-hidden="true" />
            {t("kicker")}
          </p>

          <h1 className="mt-7 max-w-[15ch] font-display text-display-xl text-brand-deep">
            {t("headline")}
          </h1>

          <p className="mt-7 max-w-lg text-lg text-muted">{t("sub")}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3.5">
            <CtaLink href="/apply" block glow>
              {tn("apply")}
            </CtaLink>
            <CtaLink href="/programmes" variant="ghost" block>
              {t("ctaProgrammes")}
            </CtaLink>
          </div>
        </div>

        {/* Decorative — the headline carries the meaning, so this slot
            stays out of the accessibility tree. */}
        <div className="hero-media card relative mx-auto aspect-[5/4] w-full max-w-[34rem] overflow-hidden rounded-xl lg:aspect-[4/5]">
          <HeroMedia />
        </div>
      </div>
    </section>
  );
}
