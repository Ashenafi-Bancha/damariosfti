import { TODO, type Programme } from "./types";

/**
 * Structural programme data. Names, summaries, curricula and known
 * metadata display strings live in messages/{locale}.json under
 * `programmes.items.{slug}`. A `TODO(...)` here renders as a visible
 * placeholder — the client has not supplied that fact.
 */
export const programmes: Programme[] = [
  {
    slug: "fashion-design",
    piece: "01",
    levels: "known", // Levels 2–4
    duration: "known", // 3 or 5 months
    intake: TODO("Client to confirm intake dates"),
    tuition: TODO("Client to confirm tuition"),
    careerOutcomes: TODO("Client to supply the full career outcomes list"),
  },
  {
    slug: "modeling",
    piece: "02",
    levels: TODO("Client to confirm TVET level"),
    duration: TODO("Client to confirm duration"),
    intake: TODO("Client to confirm intake dates"),
    tuition: TODO("Client to confirm tuition"),
  },
  {
    slug: "cosmetology",
    piece: "03",
    levels: TODO("Client to confirm TVET level"),
    duration: TODO("Client to confirm duration"),
    intake: TODO("Client to confirm intake dates"),
    tuition: TODO("Client to confirm tuition"),
  },
  {
    slug: "nail-technology",
    piece: "04",
    levels: TODO("Client to confirm TVET level"),
    duration: TODO("Client to confirm duration"),
    intake: TODO("Client to confirm intake dates"),
    tuition: TODO("Client to confirm tuition"),
  },
  {
    slug: "information-technology",
    piece: "05",
    levels: TODO("Client to confirm TVET level"),
    duration: TODO("Client to confirm duration"),
    intake: TODO("Client to confirm intake dates"),
    tuition: TODO("Client to confirm tuition"),
    careerOutcomes: "known", // Web Developer, IT Technician, Mobile Repair Specialist, Freelance Professional
  },
  {
    slug: "security-training",
    piece: "06",
    levels: TODO("Client to confirm TVET level"),
    duration: TODO("Client to confirm duration"),
    intake: TODO("Client to confirm intake dates"),
    tuition: TODO("Client to confirm tuition"),
  },
];

export const getProgramme = (slug: string) =>
  programmes.find((p) => p.slug === slug);
