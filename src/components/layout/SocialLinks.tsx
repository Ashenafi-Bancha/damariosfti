import { institute } from "@/content/institute";
import { isTodo } from "@/content/types";

/** Simple, evenly-weighted glyphs — no brand-logo assets to license. */
const ICONS: Record<string, React.ReactNode> = {
  facebook: (
    <path d="M13.5 9H15V6.5h-1.8C11.4 6.5 10.5 7.7 10.5 9.4V11H9v2.5h1.5V19h2.6v-5.5H15L15.3 11h-2.2V9.7c0-.5.1-.7.4-.7Z" />
  ),
  instagram: (
    <>
      <rect x="5.2" y="5.2" width="13.6" height="13.6" rx="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.2" cy="7.9" r="1.05" />
    </>
  ),
  tiktok: (
    <path d="M14.1 5h2.1c.2 1.6 1.1 2.8 2.7 3v2.1a5.6 5.6 0 0 1-2.7-.8v4.4a4.2 4.2 0 1 1-4.2-4.2c.2 0 .4 0 .6.05v2.2a2.05 2.05 0 1 0 1.5 2v-8.8Z" />
  ),
  telegram: (
    <path d="M19.3 6.2 5.6 11.4c-.7.3-.7.8 0 1l3.4 1 1.3 4c.2.5.4.6.8.2l1.9-1.8 3.6 2.7c.5.3.9.1 1-.5l2.2-10.5c.1-.6-.2-.9-.5-.7Zm-3.2 2.4-5.6 5.1-.2 2.3-1.2-3.7 7-3.7Z" />
  ),
};

export function SocialLinks({ tone = "deep" }: { tone?: "deep" | "paper" }) {
  const entries = Object.entries(institute.social);
  const base =
    tone === "deep"
      ? "bg-paper/10 text-paper hover:bg-paper hover:text-brand-deep"
      : "bg-brand-wash text-brand hover:bg-brand hover:text-paper";
  const off =
    tone === "deep" ? "bg-paper/5 text-on-deep/50" : "bg-paper-tint text-muted";

  return (
    <ul className="flex items-center gap-2.5">
      {entries.map(([key, value]) => {
        const label = key[0].toUpperCase() + key.slice(1);
        const glyph = (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
            {ICONS[key]}
          </svg>
        );
        return (
          <li key={key}>
            {isTodo(value) ? (
              /* No URL supplied yet — shown inactive rather than guessed at. */
              <span
                title={`${label} — link to be supplied`}
                aria-label={`${label} link not yet available`}
                className={`flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-pill ${off}`}
              >
                {glyph}
              </span>
            ) : (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex h-10 w-10 items-center justify-center rounded-pill transition-colors duration-500 ${base}`}
              >
                {glyph}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
