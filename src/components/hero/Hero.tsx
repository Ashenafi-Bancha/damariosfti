import { useTranslations } from "next-intl";
import { CtaLink } from "@/components/ui/CtaLink";
import { HeroVisual } from "./HeroVisual";
import { HeroStage } from "./HeroStage";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="pattern-paper border-b border-line bg-paper-tint">
      <HeroStage hint={t("scrollHint")}>
        <div className="container-x grid w-full items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="inline-flex rounded-sm bg-brand-wash px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-brand">
              {t("kicker")}
            </p>
            <h1 className="hero-headline mt-6 max-w-[16ch] font-display text-display-xl text-brand-deep">
              {t("headline")}
            </h1>
            <p className="mt-6 max-w-md text-base text-muted sm:text-lg">
              {t("sub")}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <CtaLink href="/programmes">{t("ctaProgrammes")}</CtaLink>
              <CtaLink href="/admissions" variant="outline">
                {t("ctaAdmissions")}
              </CtaLink>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[420px]">
            <HeroVisual
              labels={{
                piece01: t("piece01"),
                piece02: t("piece02"),
                piece03: t("piece03"),
                grain: t("grain"),
              }}
            />
          </div>
        </div>
      </HeroStage>
    </section>
  );
}
