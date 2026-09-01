import { TODO, type Todo, type OpeningHours, type Phone } from "./types";

/** Locale-independent institutional facts. Display copy lives in messages/. */
export const institute = {
  name: "Da Mario's Fashion and Technology Institute",
  shortName: "Damarios FTI",
  founded: 2024,
  founderName: "Dr. Senait Mario",

  address: {
    line: "1st floor, Kkare Building",
    subCity: "Bole Sub City",
    city: "Addis Ababa",
    country: "Ethiopia",
    countryCode: "ET",
    /** Pin navigation is unreliable in Addis — landmarks matter. */
    landmark: "Bole Brass, near Yod Abyssinia",
    airportDistance: "approximately 2 km from Bole International Airport",
  },

  /**
   * NOT RENDERED ANYWHERE. The client asked for the certificate and trade
   * licence numbers to be kept off the site entirely. They are retained
   * here because they are supplied facts and are the sort of thing a
   * tender submission asks for — but nothing on the site reads them.
   */
  accreditation: {
    authority:
      "Addis Ababa City Administration Education and Training Quality Regulatory Authority, Bole branch office",
    certificateNo: "4/103/0026/17",
    tradeLicenceNo: "BL/AA/14/673/49799519/2016",
  },

  phones: [
    { display: "0989 044 444", tel: "+251989044444" },
    { display: "+251 11 667 2717", tel: "+251116672717" },
  ] satisfies Phone[],

  email: TODO("Client to confirm public email address") satisfies Todo,
  telegram: TODO("Client to confirm Telegram handle") satisfies Todo,

  /**
   * Social profiles. A URL here goes live immediately; a TODO renders the
   * icon inactive with a marker. Never guess at a handle — linking to the
   * wrong account sends the institute's visitors to a stranger.
   */
  social: {
    facebook: TODO("Client to supply the Facebook page URL"),
    instagram: TODO("Client to supply the Instagram profile URL"),
    tiktok: TODO("Client to supply the TikTok profile URL"),
    telegram: TODO("Client to supply the Telegram channel URL"),
  } as Record<string, string | Todo>,

  hours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    { dayOfWeek: ["Saturday"], opens: "08:00", closes: "14:00" },
  ] satisfies OpeningHours[],
  closedOn: ["Sunday"],

  /** Schema.org amenity/accessibility tokens for JSON-LD. */
  accessibility: [
    "Wheelchair-accessible restroom",
    "Wheelchair-accessible seating",
    "Free on-site parking",
  ],

  capabilityStatementPdf: TODO(
    "Client to supply the capability statement PDF"
  ) satisfies Todo,

  /**
   * Sectors in which the institute actively bids for large youth
   * skills-training contracts (per client brief) — the basis of the
   * institutional capacity statement. Copy in messages/, keys here.
   */
  tenderSectors: [
    "textile-garment",
    "cosmetics-detergent",
    "security-services",
    "home-care-food",
  ] as const,
} as const;
