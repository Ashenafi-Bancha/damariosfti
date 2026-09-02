import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { getProgramme } from "@/content/programmes";
import { programmeImages } from "@/content/gallery";
import { isTodo, PROGRAMME_SLUGS, type Programme } from "@/content/types";
import { CtaLink } from "@/components/ui/CtaLink";
import { TodoTag, type TodoKind } from "@/components/ui/TodoTag";
import { Reveal } from "@/components/ui/Reveal";
import { BackLink } from "@/components/ui/BackLink";

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
      <header className="aura aura-soft relative pb-4 pt-10 sm:pt-14">
        <div className="container-x">
          <BackLink
            fallback="/programmes"
            label={t("labels.allProgrammes")}
          />
          <p className="mt-7 inline-flex rounded-pill bg-brand-wash px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-brand">
            {t("labels.piece")} {programme.piece}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-display-xl text-brand-deep">
            {t(item("name"))}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            {t(item("summary"))}
          </p>
          <ProgrammePhoto slug={slug} />
        </div>
      </header>

      <section className="container-x grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_350px] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="font-display text-display-md text-brand-deep">
              {t("labels.curriculum")}
            </h2>
            {curriculum ? (
              <ol className="mt-8 max-w-xl space-y-1">
                {curriculum.map((line, i) => (
                  <li
                    key={line}
                    className="flex items-baseline gap-5 rounded-md px-4 py-3.5 transition-colors duration-500 hover:bg-paper-tint"
                  >
                    <span className="font-mono text-xs text-brand/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-graphite">{line}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="mt-8">
                <TodoTag kind="curriculum" />
              </div>
            )}
          </Reveal>

          {has("audience") && (
            <Reveal delay={80}>
              <div className="mt-14">
                <h2 className="font-display text-display-sm text-brand-deep">
                  {t("labels.audience")}
                </h2>
                <p className="mt-4 max-w-xl text-muted">{t(item("audience"))}</p>
              </div>
            </Reveal>
          )}

          {has("delivery") && (
            <Reveal delay={80}>
              <div className="mt-14">
                <h2 className="font-display text-display-sm text-brand-deep">
                  {t("labels.delivery")}
                </h2>
                <p className="mt-4 max-w-xl text-muted">{t(item("delivery"))}</p>
              </div>
            </Reveal>
          )}

          {programme.careerOutcomes && (
            <Reveal delay={80}>
              <div className="mt-14">
                <h2 className="font-display text-display-sm text-brand-deep">
                  {t("labels.outcomes")}
                </h2>
                {outcomes ? (
                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {outcomes.map((o) => (
                      <li
                        key={o}
                        className="rounded-pill bg-brand-wash px-5 py-2.5 text-sm text-brand-deep"
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-6">
                    <TodoTag kind="outcomes" />
                  </div>
                )}
              </div>
            </Reveal>
          )}

          <CtaLink href="/apply" className="mt-14">
            {t("labels.apply")}
          </CtaLink>
        </div>

        <MetaPanel programme={programme} />
      </section>
    </>
  );
}

/** A photograph of the programme, or a visible gap where the institute
    has not supplied one. Never a stock stand-in. */
function ProgrammePhoto({ slug }: { slug: string }) {
  const photo = programmeImages[slug];
  if (typeof photo !== "string") {
    return (
      <div className="mt-10 flex aspect-[21/9] w-full items-center justify-center rounded-lg bg-brand-wash">
        <TodoTag kind="photo" />
      </div>
    );
  }
  return (
    <div className="relative mt-10 aspect-[21/9] w-full overflow-hidden rounded-lg shadow-soft">
      <Image
        src={`/gallery/${photo}.jpg`}
        alt=""
        fill
        priority
        sizes="(min-width: 1280px) 74rem, 100vw"
        className="object-cover"
      />
    </div>
  );
}

/** The spec sheet: the facts, and honest gaps where facts are missing. */
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
    <aside className="card card-tint h-fit p-8 lg:sticky lg:top-28">
      <dl className="space-y-7">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              {row.label}
            </dt>
            <dd className="mt-2">
              {row.value ? (
                <span className="text-lg text-brand-deep">{row.value}</span>
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
