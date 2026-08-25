/**
 * Content layer for the prototype.
 *
 * These shapes are the seam a headless CMS replaces later: components
 * consume only the types exported here, never raw literals, so swapping
 * the data source means reimplementing these modules — not the UI.
 *
 * Two kinds of value live here:
 *  - locale-independent facts (numbers, slugs, phone digits, hours)
 *  - `Known` markers, meaning "the display string exists in
 *    messages/{locale}.json under the conventional key"
 *
 * Anything the client has not supplied is a `Todo` — rendered by
 * <TodoTag/> as a visible placeholder. Never replace a Todo with an
 * invented value: this is an accredited institute's website.
 */

export interface Todo {
  readonly todo: true;
  /** What the client must supply — shown in the TODO inventory. */
  readonly note: string;
}

export const TODO = (note: string): Todo => ({ todo: true, note });

/** The display string lives in messages/{locale}.json. */
export type Known = "known";

export type Maybe<T> = T | Todo;

export function isTodo(value: unknown): value is Todo {
  return (
    typeof value === "object" && value !== null && (value as Todo).todo === true
  );
}

export const PROGRAMME_SLUGS = [
  "fashion-design",
  "modeling",
  "cosmetology",
  "nail-technology",
  "information-technology",
  "security-training",
] as const;

export type ProgrammeSlug = (typeof PROGRAMME_SLUGS)[number];

export interface Programme {
  slug: ProgrammeSlug;
  /** Pattern-piece number — the atelier metaphor's card label. */
  piece: string;
  levels: Maybe<Known>;
  duration: Maybe<Known>;
  intake: Maybe<Known>;
  tuition: Todo;
  /**
   * Present only where the client mentioned outcomes at all:
   * 'known' when the list exists in messages, Todo when promised
   * but unsupplied. Absent = the client never claimed outcomes.
   */
  careerOutcomes?: Maybe<Known>;
}

export interface OpeningHours {
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

export interface Phone {
  /** As printed locally, e.g. "0989 044 444" */
  display: string;
  /** E.164 for tel: links on Ethiopian handsets */
  tel: string;
}
