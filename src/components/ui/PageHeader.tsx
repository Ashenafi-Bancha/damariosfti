export function PageHeader({
  kicker,
  title,
  lead,
}: {
  kicker?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="aura aura-soft relative pb-4 pt-16 sm:pt-24">
      <div className="container-x">
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
