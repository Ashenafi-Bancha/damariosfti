import { useTranslations } from "next-intl";
import { CtaLink } from "@/components/ui/CtaLink";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="container-x py-24 sm:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
        404
      </p>
      <h1 className="mt-4 font-display text-display-xl text-brand-deep">
        {t("title")}
      </h1>
      <p className="mt-5 max-w-md text-muted">{t("body")}</p>
      <CtaLink href="/" variant="outline" className="mt-9">
        {t("cta")}
      </CtaLink>
    </section>
  );
}
