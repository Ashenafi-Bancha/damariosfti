import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { isTodo, type Programme } from "@/content/types";
import { GrainArrow } from "./GrainArrow";

/**
 * A programme card labelled like a real pattern piece: piece number,
 * programme name, then a monospace metadata row. On hover a stitch line
 * is pulled through along the border (animated stroke-dashoffset, see
 * .pattern-card styles in globals.css).
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
    {
      label: t("labels.intake"),
      value: isTodo(programme.intake) ? null : t(`items.${slug}.intake`),
    },
  ];

  return (
    <Link
      href={`/programmes/${slug}`}
      className="pattern-card group relative block border border-line bg-paper p-6 shadow-[0_1px_2px_rgb(11_56_104/0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_10px_28px_rgb(11_56_104/0.10)]"
    >
      <svg className="stitch" aria-hidden="true">
        <rect />
      </svg>

      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-brand">
        <span>
          {t("labels.piece")} {programme.piece}
        </span>
        <GrainArrow className="w-8 text-brand/50 transition-transform group-hover:translate-x-1" />
      </div>

      <Heading className="mt-5 font-display text-display-sm text-brand-deep">
        {t(`items.${slug}.name`)}
      </Heading>
      <p className="mt-2 text-sm text-muted">{t(`items.${slug}.tagline`)}</p>

      <dl className="mt-6 space-y-1 border-t border-dashed border-line pt-3 font-mono text-[11px] uppercase tracking-[0.08em]">
        {metaCells.map((c) => (
          <div key={c.label} className="flex justify-between gap-3">
            <dt className="text-muted">{c.label}</dt>
            <dd className={c.value ? "text-graphite" : "text-brand"}>
              {c.value ?? tc("todoLabel")}
            </dd>
          </div>
        ))}
      </dl>
    </Link>
  );
}
