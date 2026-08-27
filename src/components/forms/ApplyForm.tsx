"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  makeApplySchema,
  type ApplyData,
  type ApplyErrorMessages,
  type ApplyInput,
} from "@/lib/applySchema";
import { GrainArrow } from "@/components/atelier/GrainArrow";

export interface Option {
  value: string;
  label: string;
}

export interface ApplyFormStrings {
  form: {
    fullName: string;
    phone: string;
    phoneHelp: string;
    email: string;
    programme: string;
    programmePlaceholder: string;
    level: string;
    levelHelp: string;
    intake: string;
    education: string;
    educationPlaceholder: string;
    heard: string;
    heardPlaceholder: string;
    submit: string;
    submitting: string;
  };
  errors: ApplyErrorMessages;
  success: { title: string; body: string; again: string };
  failure: { generic: string; rateLimited: string; notConfigured: string };
}

type Status = "idle" | "success" | "error" | "rate_limited" | "not_configured";

const inputClass =
  "w-full rounded-sm border border-line-control bg-paper px-3.5 py-2.5 text-graphite placeholder:text-muted focus:border-brand aria-[invalid=true]:border-alert";
const labelClass = "mb-1.5 block text-sm font-medium text-graphite";
const helpClass = "mt-1.5 text-xs text-muted";
const errorClass = "mt-1.5 text-xs text-alert";

export function ApplyForm({
  strings,
  programmeOptions,
  levelOptions,
  intakeOptions,
  educationOptions,
  heardOptions,
}: {
  strings: ApplyFormStrings;
  programmeOptions: Option[];
  levelOptions: Option[];
  intakeOptions: Option[];
  educationOptions: Option[];
  heardOptions: Option[];
}) {
  const schema = useMemo(
    () => makeApplySchema(strings.errors),
    [strings.errors]
  );
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplyInput, unknown, ApplyData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      level: "not-sure",
      intake: "asap",
      hp: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
        return;
      }
      const payload = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (res.status === 429) setStatus("rate_limited");
      else if (payload?.error === "not_configured") setStatus("not_configured");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-sm border border-line border-l-2 border-l-brand bg-brand-wash p-7 sm:p-9"
      >
        <h2 className="font-display text-display-md text-brand-deep">
          {strings.success.title}
        </h2>
        <p className="mt-4 max-w-prose text-muted">{strings.success.body}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 inline-flex items-center gap-3 rounded-sm border border-brand/40 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-brand transition-colors hover:bg-paper"
        >
          {strings.success.again}
        </button>
      </div>
    );
  }

  const failureMessage =
    status === "rate_limited"
      ? strings.failure.rateLimited
      : status === "not_configured"
        ? strings.failure.notConfigured
        : status === "error"
          ? strings.failure.generic
          : null;

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xl">
      <div className="space-y-6">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            {strings.form.fullName}
          </label>
          <input
            id="fullName"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={inputClass}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p id="fullName-error" className={errorClass}>
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            {strings.form.phone}
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="09… / +2519…"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : "phone-help"}
            className={inputClass}
            {...register("phone")}
          />
          {errors.phone ? (
            <p id="phone-error" className={errorClass}>
              {errors.phone.message}
            </p>
          ) : (
            <p id="phone-help" className={helpClass}>
              {strings.form.phoneHelp}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            {strings.form.email}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className={errorClass}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="programme" className={labelClass}>
            {strings.form.programme}
          </label>
          <select
            id="programme"
            defaultValue=""
            aria-invalid={!!errors.programme}
            aria-describedby={errors.programme ? "programme-error" : undefined}
            className={inputClass}
            {...register("programme")}
          >
            <option value="" disabled>
              {strings.form.programmePlaceholder}
            </option>
            {programmeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.programme && (
            <p id="programme-error" className={errorClass}>
              {errors.programme.message}
            </p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="level" className={labelClass}>
              {strings.form.level}
            </label>
            <select id="level" className={inputClass} {...register("level")}>
              {levelOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <p className={helpClass}>{strings.form.levelHelp}</p>
          </div>
          <div>
            <label htmlFor="intake" className={labelClass}>
              {strings.form.intake}
            </label>
            <select id="intake" className={inputClass} {...register("intake")}>
              {intakeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="education" className={labelClass}>
            {strings.form.education}
          </label>
          <select
            id="education"
            defaultValue=""
            aria-invalid={!!errors.education}
            aria-describedby={errors.education ? "education-error" : undefined}
            className={inputClass}
            {...register("education")}
          >
            <option value="" disabled>
              {strings.form.educationPlaceholder}
            </option>
            {educationOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.education && (
            <p id="education-error" className={errorClass}>
              {errors.education.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="heard" className={labelClass}>
            {strings.form.heard}
          </label>
          <select
            id="heard"
            defaultValue=""
            aria-invalid={!!errors.heard}
            aria-describedby={errors.heard ? "heard-error" : undefined}
            className={inputClass}
            {...register("heard")}
          >
            <option value="" disabled>
              {strings.form.heardPlaceholder}
            </option>
            {heardOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.heard && (
            <p id="heard-error" className={errorClass}>
              {errors.heard.message}
            </p>
          )}
        </div>

        {/* Honeypot — hidden from humans, tempting for bots. The opaque
            name keeps browser autofill from ever targeting it. */}
        <div aria-hidden="true" className="sr-only">
          <label htmlFor="hp">Leave this field empty</label>
          <input id="hp" tabIndex={-1} autoComplete="off" {...register("hp")} />
        </div>

        {failureMessage && (
          <p
            role="alert"
            className="rounded-sm border-l-2 border-alert bg-alert/5 px-4 py-3 text-sm text-graphite"
          >
            {failureMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-3 rounded-sm bg-brand px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:bg-brand-deep disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? strings.form.submitting : strings.form.submit}
          <GrainArrow className="w-7 shrink-0" />
        </button>
      </div>
    </form>
  );
}
