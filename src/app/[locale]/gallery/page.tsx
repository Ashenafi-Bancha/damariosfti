import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "gallery", "/gallery");
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Gallery />;
}

function Gallery() {
  const t = useTranslations("gallery");
  const tn = useTranslations("nav");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} lead={t("lead")} back={{ href: "/", label: tn("back") }}
      />
      <section className="container-x py-14 sm:py-20">
        <GalleryGrid />
      </section>
      <section className="container-x pb-20 sm:pb-28">
        <Reveal>
          <div className="card card-tint flex flex-wrap items-center justify-between gap-8 px-9 py-12 sm:px-12">
            <div>
              <h2 className="font-display text-display-sm text-brand-deep">
                {t("ctaTitle")}
              </h2>
              <p className="mt-3 max-w-md text-sm text-muted">{t("ctaBody")}</p>
            </div>
            <CtaLink href="/apply">{t("ctaButton")}</CtaLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
