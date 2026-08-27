import { useTranslations } from "next-intl";

export type TodoKind =
  | "generic"
  | "tuition"
  | "duration"
  | "level"
  | "intake"
  | "email"
  | "telegram"
  | "pdf"
  | "portrait"
  | "outcomes"
  | "curriculum"
  | "requirements"
  | "timeframe"
  | "details";

/**
 * The single way unsupplied content appears on this site: a visible,
 * deliberately unfinished dashed chip. Never replace one of these with
 * an invented value.
 */
export function TodoTag({
  kind = "generic",
  on = "paper",
  className = "",
}: {
  kind?: TodoKind;
  /** Surface it sits on. */
  on?: "paper" | "deep";
  className?: string;
}) {
  const t = useTranslations();
  const palette =
    on === "deep"
      ? "border-brand-bright/60 text-brand-bright"
      : "border-brand/45 text-brand";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-sm border border-dashed px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] ${palette} ${className}`}
    >
      <span className="font-medium">{t("common.todoLabel")}</span>
      <span className="normal-case tracking-normal">{t(`todo.${kind}`)}</span>
    </span>
  );
}
