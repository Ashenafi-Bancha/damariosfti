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
  | "details"
  | "photo";

/**
 * The single way unsupplied content appears on this site: a visible,
 * deliberately unfinished chip. Never replace one of these with an
 * invented value.
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
      ? "bg-paper/10 text-brand-bright"
      : "bg-brand-wash text-brand";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5 text-[11px] ${palette} ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-pill bg-current opacity-70"
      />
      <span className="font-medium uppercase tracking-[0.1em]">
        {t("common.todoLabel")}
      </span>
      <span className="opacity-90">{t(`todo.${kind}`)}</span>
    </span>
  );
}
