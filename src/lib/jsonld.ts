import { institute } from "@/content/institute";
import { SITE_URL } from "./site";

/**
 * EducationalOrganization + LocalBusiness (the latter for valid
 * openingHoursSpecification). Every value comes from content/institute.ts —
 * real address, real phone numbers, nothing invented.
 */
export function educationalOrgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: institute.name,
    alternateName: institute.shortName,
    url: SITE_URL,
    foundingDate: String(institute.founded),
    founder: { "@type": "Person", name: institute.founderName },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${institute.address.line}, ${institute.address.subCity}`,
      addressLocality: institute.address.city,
      addressCountry: institute.address.countryCode,
    },
    telephone: institute.phones[0].tel,
    contactPoint: institute.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.tel,
      contactType: "admissions",
    })),
    openingHoursSpecification: institute.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
  };
}
