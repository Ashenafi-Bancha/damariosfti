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
    <header className="container-x pt-14 sm:pt-20">
      {kicker && (
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
          {kicker}
        </p>
      )}
      <h1 className="mt-4 max-w-3xl font-display text-display-xl text-brand-deep">
        {title}
      </h1>
      {lead && <p className="mt-6 max-w-2xl text-lg text-muted">{lead}</p>}
    </header>
  );
}
