import { type Todo } from "./types";

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
 * Programme photography, in public/programmes/. Sourced stock, catalogued
 * in public/programmes/SOURCES.md — swap any file for the institute's own
 * photograph under the same name and nothing else needs to change.
 *
 * A `Todo` here instead of a filename falls back to the brand artwork in
 * components/programmes/ProgrammeArt.tsx.
 */
export const programmeImages: Record<string, string | Todo> = {
  "fashion-design": "fashion-design",
  modeling: "modeling",
  cosmetology: "cosmetology",
  "nail-technology": "nail-technology",
  "information-technology": "information-technology",
  "security-training": "security-training",
};
