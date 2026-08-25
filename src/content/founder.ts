import { TODO, type Todo } from "./types";

/**
 * Dr. Senait Mario — structural data for the editorial timeline.
 * All display copy lives in messages/{locale}.json under `founder`.
 */
export const founder = {
  name: "Dr. Senait Mario",
  portrait: TODO("Client to supply portrait imagery") satisfies Todo,

  /** Timeline stage keys, in order. Copy under founder.timeline.{key}. */
  timeline: [
    "wolaita-sodo",
    "nairobi-kampala",
    "rome",
    "runways",
    "addis",
  ] as const,

  recognition: [
    { year: 2016, key: "top40" }, // Top 40 Women of Africa, MICE award, Ghana
    { year: 2017, key: "un-peace" }, // UN Peace Ambassador
    { year: 2019, key: "doctorate" }, // honorary doctorate, Nigeria
  ],
} as const;
