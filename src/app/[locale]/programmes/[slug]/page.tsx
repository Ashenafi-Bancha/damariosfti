import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { getProgramme } from "@/content/programmes";
import { isTodo, PROGRAMME_SLUGS, type Programme } from "@/content/types";
import { GrainArrow } from "@/components/atelier/GrainArrow";
import { SeamDivider } from "@/components/atelier/SeamDivider";
import { CtaLink } from "@/components/ui/CtaLink";
import { TodoTag, type TodoKind } from "@/components/ui/TodoTag";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return PROGRAMME_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!getProgramme(slug)) return {};
  const t = await getTranslations({ locale, namespace: "programmes.items" });
  return pageMetadata(locale, "programmeDetail", `/programmes/${slug}`, {
    name: t(`${slug}.name`),
    summary: t(`${slug}.summary`),
  });
}

export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const programme = getProgramme(slug);
  if (!programme) notFound();
  return <ProgrammeDetail programme={programme} />;
}

function ProgrammeDetail({ programme }: { programme: Programme }) {
  const t = useTranslations("programmes");
  const { slug } = programme;
  const item = (key: string) => `items.${slug}.${key}`;
  const has = (key: string) => t.has(item(key));

  const curriculum = has("curriculum")
    ? (t.raw(item("curriculum")) as string[])
    : null;
  const outcomes =
    programme.careerOutcomes === "known"
      ? (t.raw(item("outcomes")) as string[])
      : null;

  return (
    <>
      <header className="container-x pt-12 sm:pt-16">
        <Link
          href="/programmes"
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-brand"
        >
          ← {t("labels.allProgrammes")}
        </Link>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-brand">
          {t("labels.piece")} {programme.piece}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-display-xl text-brand-deep">
          {t(item("name"))}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{t(item("summary"))}</p>
      </header>

      <SeamDivider className="container-x mt-10" />

      <section className="container-x grid gap-12 py-10 sm:py-14 lg:grid-cols-[1fr_340px]">
        <div>
          <h2 className="font-display text-display-md text-brand-deep">
            {t("labels.curriculum")}
          </h2>
          {curriculum ? (
            <ol className="mt-6 max-w-xl">
              {curriculum.map((line, i) => (
                <li
                  key={line}
                  className="flex items-baseline gap-4 border-b border-dashed border-line py-3"
                >
                  <span className="font-mono text-xs text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-graphite">{line}</span>
                </li>
              ))}
            </ol>
          ) : (
            <div className="mt-6">
              <TodoTag kind="curriculum" />
            </div>
          )}

          {has("audience") && (
            <div className="mt-10">
              <h2 className="font-display text-display-sm text-brand-deep">
                {t("labels.audience")}
              </h2>
              <p className="mt-3 max-w-xl text-muted">{t(item("audience"))}</p>
            </div>
          )}

          {has("delivery") && (
            <div className="mt-10">
              <h2 className="font-display text-display-sm text-brand-deep">
                {t("labels.delivery")}
              </h2>
              <p className="mt-3 max-w-xl text-muted">{t(item("delivery"))}</p>
            </div>
          )}

          {programme.careerOutcomes && (
            <div className="mt-10">
              <h2 className="font-display text-display-sm text-brand-deep">
                {t("labels.outcomes")}
              </h2>
              {outcomes ? (
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex items-center gap-2.5 rounded-sm border border-line bg-brand-wash px-3.5 py-2 text-sm text-brand-deep"
                    >
                      <GrainArrow className="w-5 text-brand" />
                      {o}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4">
                  <TodoTag kind="outcomes" />
                </div>
              )}
            </div>
          )}

          <CtaLink href="/apply" className="mt-12">
            {t("labels.apply")}
          </CtaLink>
        </div>

        <MetaPanel programme={programme} />
      </section>
    </>
  );
}

/** The pattern-piece spec sheet: mono metadata incl. visible TODOs. */
function MetaPanel({ programme }: { programme: Programme }) {
  const t = useTranslations("programmes");
  const { slug } = programme;

  const rows: { label: string; value: string | null; todo: TodoKind }[] = [
    {
      label: t("labels.level"),
      value: isTodo(programme.levels) ? null : t(`items.${slug}.levels`),
      todo: "level",
    },
    {
      label: t("labels.duration"),
      value: isTodo(programme.duration) ? null : t(`items.${slug}.duration`),
      todo: "duration",
    },
    {
      label: t("labels.intake"),
      value: isTodo(programme.intake) ? null : t(`items.${slug}.intake`),
      todo: "intake",
    },
    { label: t("labels.tuition"), value: null, todo: "tuition" },
  ];

  return (
    <aside className="pattern-card relative h-fit border border-line bg-paper-tint p-6">
      <svg className="stitch" aria-hidden="true">
        <rect style={{ strokeDashoffset: 0, opacity: 0.3 }} />
      </svg>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand">
        {t("labels.piece")} {programme.piece}
      </p>
      <dl className="mt-4 space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="border-b border-dashed border-line pb-3">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {row.label}
            </dt>
            <dd className="mt-1.5">
              {row.value ? (
                <span className="font-mono text-sm text-graphite">
                  {row.value}
                </span>
              ) : (
                <TodoTag kind={row.todo} />
              )}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
