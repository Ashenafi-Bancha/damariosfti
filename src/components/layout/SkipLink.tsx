export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-50 focus:rounded-pill focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper"
    >
      {label}
    </a>
  );
}
