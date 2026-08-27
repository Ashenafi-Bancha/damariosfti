import { useTranslations } from "next-intl";
import { CtaLink } from "@/components/ui/CtaLink";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="aura aura-soft relative">
      <div className="container-x py-28 sm:py-36">
        <p className="inline-flex rounded-pill bg-brand-wash px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-brand">
          404
        </p>
        <h1 className="mt-5 font-display text-display-xl text-brand-deep">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-md text-muted">{t("body")}</p>
        <CtaLink href="/" className="mt-10">
          {t("cta")}
        </CtaLink>
      </div>
    </section>
  );
}
