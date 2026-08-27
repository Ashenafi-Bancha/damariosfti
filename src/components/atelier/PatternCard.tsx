import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { isTodo, type Programme } from "@/content/types";

/**
 * A programme card. The pattern-piece number survives from the atelier
 * idea, but as a quiet index rather than a technical label — the card
 * itself is a soft, liftable surface.
 */
export function PatternCard({
  programme,
  headingLevel = "h3",
}: {
  programme: Programme;
  /** h2 on /programmes (whose h1 sits directly above the grid), h3 under
      a section h2 elsewhere — keeps heading levels unskipped per page. */
  headingLevel?: "h2" | "h3";
}) {
  const t = useTranslations("programmes");
  const tc = useTranslations("common");
  const { slug } = programme;
  const Heading = headingLevel;

  const metaCells = [
    {
      label: t("labels.level"),
      value: isTodo(programme.levels) ? null : t(`items.${slug}.levels`),
    },
    {
      label: t("labels.duration"),
      value: isTodo(programme.duration) ? null : t(`items.${slug}.duration`),
    },
  ];

  return (
    <Link
      href={`/programmes/${slug}`}
      className="card card-interactive group relative flex h-full flex-col overflow-hidden p-8"
    >
      {/* a wash of light that blooms from the corner on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-pill bg-brand-wash opacity-0 blur-2xl transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
      />

      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.18em] text-brand/70">
          {programme.piece}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-pill bg-brand-wash text-brand transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-brand group-hover:text-paper">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path d="M4 10h11M11 5.5 15.5 10 11 14.5" />
          </svg>
        </span>
      </div>

      <Heading className="relative mt-6 font-display text-display-sm text-brand-deep">
        {t(`items.${slug}.name`)}
      </Heading>
      <p className="relative mt-2.5 flex-1 text-sm leading-relaxed text-muted">
        {t(`items.${slug}.tagline`)}
      </p>

      <dl className="relative mt-7 flex flex-wrap gap-2">
        {metaCells.map((c) => (
          <div
            key={c.label}
            className="rounded-pill bg-paper-tint px-3.5 py-1.5 text-[11px]"
          >
            <dt className="sr-only">{c.label}</dt>
            <dd className={c.value ? "text-graphite" : "text-brand"}>
              {c.value ?? `${c.label}: ${tc("todoLabel")}`}
            </dd>
          </div>
        ))}
      </dl>
    </Link>
  );
}
