import { TODO, type Maybe, type Known } from "./types";

export interface Partnership {
  key: string;
  details: Maybe<Known>;
}

/**
 * NOTE (legal, do not remove): the precise entitlements of the Rome
 * Business School partnership must be confirmed with the client before
 * launch — study-abroad claims are legally sensitive for an accredited
 * institute. The copy in messages/ frames the partnership around
 * international academic and cultural exchange only, exactly as briefed.
 */
export const partnerships: Partnership[] = [
  {
    key: "rome-business-school",
    details: "known",
    // Facts in messages: founded 2011, part of the Planeta Formación y
    // Universidades network, students from over 140 countries.
  },
  {
    key: "mario-makeup",
    details: TODO("Client to supply Mario Makeup Company partnership details"),
  },
];
