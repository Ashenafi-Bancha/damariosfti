import { useTranslations } from "next-intl";
import { CtaLink } from "@/components/ui/CtaLink";
import { ClothStage } from "./ClothStage";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="aura relative overflow-hidden">
      <div className="container-x grid items-center gap-14 pb-20 pt-14 sm:pb-28 sm:pt-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:pb-32">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2.5 rounded-pill bg-brand-wash px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-brand">
            <span className="h-1.5 w-1.5 rounded-pill bg-brand" aria-hidden="true" />
            {t("kicker")}
          </p>

          <h1 className="mt-7 max-w-[15ch] font-display text-display-xl text-brand-deep">
            {t("headline")}
          </h1>

          <p className="mt-7 max-w-lg text-lg text-muted">{t("sub")}</p>

          <div className="mt-10 flex flex-wrap gap-3.5">
            <CtaLink href="/programmes">{t("ctaProgrammes")}</CtaLink>
            <CtaLink href="/admissions" variant="ghost">
              {t("ctaAdmissions")}
            </CtaLink>
          </div>
        </div>

        {/* The fabric: real 3D where the device can afford it, a silk
            gradient everywhere else. Decorative — the headline carries
            the meaning, so it stays out of the accessibility tree. */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] rounded-xl shadow-deep sm:aspect-[5/4] lg:aspect-[4/5]">
          <ClothStage />
        </div>
      </div>
    </section>
  );
}
