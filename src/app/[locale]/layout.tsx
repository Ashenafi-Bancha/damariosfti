import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { bodoni, hanken, plexMono } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import { educationalOrgJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

/* Daily regeneration so build-time values (footer year) don't go stale. */
export const revalidate = 86400;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("common");

  const fontClasses = [bodoni.variable, hanken.variable, plexMono.variable].join(
    " "
  );

  return (
    <html lang={locale} dir="ltr" className={fontClasses}>
      <body>
        {/* messages={null}: client components receive their strings via
            props from server parents, so the full catalog never ships to
            the browser. The provider itself is still required — next-intl's
            navigation <Link> reads the active locale from this context. */}
        <NextIntlClientProvider messages={null}>
          <SkipLink label={t("skipToContent")} />
          <Header />
          <main id="content">{children}</main>
          <Footer />
          <JsonLd data={educationalOrgJsonLd()} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
