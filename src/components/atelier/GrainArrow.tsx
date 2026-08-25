/** Grain-line arrow — the double-headed directional mark on a pattern piece. */
export function GrainArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 6h42" />
      <path d="M9 2 3 6l6 4" />
      <path d="M39 2l6 4-6 4" />
    </svg>
  );
}
