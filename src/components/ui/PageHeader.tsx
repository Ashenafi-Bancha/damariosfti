import { BackLink } from "./BackLink";

export function PageHeader({
  kicker,
  title,
  lead,
  back,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  /** Where the back control lands when there is no in-site history. */
  back?: { href: string; label: string };
}) {
  return (
    <header className="aura aura-soft relative pb-4 pt-10 sm:pt-14">
      <div className="container-x">
        {back && <BackLink fallback={back.href} label={back.label} className="mb-6" />}
        {kicker && (
          <p className="inline-flex rounded-pill bg-brand-wash px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-brand">
            {kicker}
          </p>
        )}
        <h1 className="mt-5 max-w-3xl font-display text-display-xl text-brand-deep">
          {title}
        </h1>
        {lead && <p className="mt-6 max-w-2xl text-lg text-muted">{lead}</p>}
      </div>
    </header>
  );
}
