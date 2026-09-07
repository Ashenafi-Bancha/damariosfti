import { type Todo } from "./types";

/**
 * The image shown in the homepage hero.
 *
 * The institute's own reception signage, cropped from the photograph in
 * public/gallery/institute-desk.jpg. Chosen over stock: the hero is the
 * one place a visitor asks "is this a real place?", and the institute's
 * own sign answers that in a way a bought photograph cannot.
 *
 * It is limited by its source, a phone snapshot, so a proper photograph
 * of the premises should replace it before launch. Drop a file in
 * public/hero/ and point this at it; nothing else needs to change.
 */
export const heroMedia: string | Todo = "/hero/institute-sign.jpg";
