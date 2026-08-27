export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-brand focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-paper"
    >
      {label}
    </a>
  );
}
