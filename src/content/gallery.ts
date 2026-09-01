import { TODO, type Todo } from "./types";

export const GALLERY_CATEGORIES = [
  "institute",
  "design",
  "illustration",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryItem {
  slug: string;
  /** Intrinsic size, so next/image reserves space and never shifts layout. */
  width: number;
  height: number;
  category: GalleryCategory;
  /**
   * true  — verified as the institute's own (the premises, its signage).
   * false — supplied by the client as the founder's design work, but not
   *         independently verifiable here. Captions stay descriptive and
   *         claim no more than that. See README → "Gallery provenance".
   */
  verified: boolean;
}

const item = (
  slug: string,
  width: number,
  height: number,
  category: GalleryCategory,
  verified = false
): GalleryItem => ({ slug, width, height, category, verified });

/** Source files live in public/gallery/{slug}.jpg */
export const gallery: GalleryItem[] = [
  item("institute-reception", 607, 329, "institute", true),
  item("institute-desk", 526, 701, "institute", true),
  item("illustration-1", 526, 701, "illustration"),
  item("design-4", 678, 960, "design"),
  item("design-7", 540, 960, "design"),
  item("design-5", 799, 1063, "design"),
  item("design-2", 526, 789, "design"),
  item("design-11", 638, 960, "design"),
  item("design-3", 526, 789, "design"),
  item("design-8", 526, 700, "design"),
  item("design-9", 526, 701, "design"),
  item("design-6", 590, 590, "design"),
  item("design-10", 364, 549, "design"),
];

/**
 * The institute has not supplied teaching photography for these
 * programmes, so their cards and detail pages show a marked placeholder
 * rather than a borrowed or stock image.
 */
export const programmeImages: Record<string, string | Todo> = {
  "fashion-design": "design-4",
  modeling: TODO("Client to supply a photo from a modelling class"),
  cosmetology: TODO("Client to supply a photo from the salon training room"),
  "nail-technology": TODO("Client to supply a photo from nail technology training"),
  "information-technology": TODO("Client to supply a photo of the IT lab"),
  "security-training": TODO("Client to supply a photo from security officer training"),
};
