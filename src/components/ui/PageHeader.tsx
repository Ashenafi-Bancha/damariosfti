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
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-saffron">
          {kicker}
        </p>
      )}
      <h1 className="mt-4 max-w-3xl font-display text-display-xl text-chalk">
        {title}
      </h1>
      {lead && (
        <p className="mt-6 max-w-2xl text-lg text-chalk-dim">{lead}</p>
      )}
    </header>
  );
}
