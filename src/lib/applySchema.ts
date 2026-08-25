import { z } from "zod";
import { PROGRAMME_SLUGS } from "@/content/types";

/* Only Fashion Design has confirmed levels (2–4); the form offers those
   plus "not sure" — placement is confirmed with the institute. */
export const LEVEL_OPTIONS = ["not-sure", "2", "3", "4"] as const;
export const INTAKE_OPTIONS = ["asap", "soon", "later"] as const;
export const EDUCATION_OPTIONS = [
  "primary",
  "grade10",
  "grade12",
  "tvet",
  "diploma",
  "degree",
  "other",
] as const;
export const HEARD_OPTIONS = [
  "telegram",
  "facebook",
  "tiktok",
  "friend",
  "visited",
  "other",
] as const;

/** Ethiopian handsets: 09/07 local or +2519/+2517 international. */
const ET_PHONE = /^(\+251[79]\d{8}|0[79]\d{8})$/;

export interface ApplyErrorMessages {
  fullNameRequired: string;
  phoneRequired: string;
  phoneInvalid: string;
  emailInvalid: string;
  programmeRequired: string;
  educationRequired: string;
  heardRequired: string;
}

/**
 * One schema, both sides: the client builds it with localized messages
 * for inline errors; the server re-parses with the default messages
 * (only pass/fail matters there).
 */
export function makeApplySchema(msg: ApplyErrorMessages) {
  return z.object({
    fullName: z.string().trim().min(2, msg.fullNameRequired).max(120),
    phone: z
      .string()
      .trim()
      .min(1, msg.phoneRequired)
      .transform((v) => v.replace(/[\s-]/g, ""))
      .pipe(z.string().regex(ET_PHONE, msg.phoneInvalid)),
    email: z.union([z.literal(""), z.email(msg.emailInvalid).max(254)]),
    programme: z.enum(PROGRAMME_SLUGS, { error: msg.programmeRequired }),
    level: z.enum(LEVEL_OPTIONS),
    intake: z.enum(INTAKE_OPTIONS),
    education: z.enum(EDUCATION_OPTIONS, { error: msg.educationRequired }),
    heard: z.enum(HEARD_OPTIONS, { error: msg.heardRequired }),
    /** Honeypot — humans never see it; the API pretends success if filled.
        Named "hp" so browser autofill has no category to match it to. */
    hp: z.string().optional(),
  });
}

const defaultMessages: ApplyErrorMessages = {
  fullNameRequired: "Full name is required",
  phoneRequired: "Phone is required",
  phoneInvalid: "Invalid phone number",
  emailInvalid: "Invalid email",
  programmeRequired: "Programme is required",
  educationRequired: "Education is required",
  heardRequired: "Referral source is required",
};

export const applyServerSchema = makeApplySchema(defaultMessages);

export type ApplySchema = ReturnType<typeof makeApplySchema>;
export type ApplyInput = z.input<ApplySchema>;
export type ApplyData = z.output<ApplySchema>;
