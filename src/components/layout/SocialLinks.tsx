import { institute } from "@/content/institute";
import { isTodo } from "@/content/types";

/**
 * Social icons in each platform's own colours. They sit on white discs
 * because the brand blues, black and gradients would all disappear
 * against the navy footer.
 *
 * A profile with no URL yet renders as a non-interactive disc with a
 * tooltip — the icon is right, the link simply isn't guessed at.
 */
const ICONS: Record<string, { label: string; glyph: React.ReactNode }> = {
  facebook: {
    label: "Facebook",
    glyph: (
      <path
        fill="#1877F2"
        d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.9h-2.33v7.03C18.34 21.24 22 17.08 22 12.06Z"
      />
    ),
  },
  instagram: {
    label: "Instagram",
    glyph: (
      <>
        <defs>
          <radialGradient id="ig-grad" cx="0.3" cy="1.05" r="1.25">
            <stop offset="0%" stopColor="#FFDD55" />
            <stop offset="25%" stopColor="#FF543E" />
            <stop offset="55%" stopColor="#C837AB" />
            <stop offset="100%" stopColor="#3771C8" />
          </radialGradient>
        </defs>
        <rect
          x="3.4"
          y="3.4"
          width="17.2"
          height="17.2"
          rx="5.2"
          fill="none"
          stroke="url(#ig-grad)"
          strokeWidth="2.1"
        />
        <circle
          cx="12"
          cy="12"
          r="4.1"
          fill="none"
          stroke="url(#ig-grad)"
          strokeWidth="2.1"
        />
        <circle cx="17.1" cy="6.9" r="1.25" fill="url(#ig-grad)" />
      </>
    ),
  },
  tiktok: {
    label: "TikTok",
    glyph: (
      <>
        {/* the offset cyan / magenta plates that make the mark read */}
        <path
          fill="#25F4EE"
          d="M13.1 3h2.3c.05.5.17.98.35 1.42a4.9 4.9 0 0 0 2.9 2.6v2.2a6.5 6.5 0 0 1-3-1v5.2a5.05 5.05 0 1 1-5.05-5.05c.2 0 .4.01.6.04v2.3a2.78 2.78 0 1 0 1.9 2.64V3Z"
          transform="translate(-1.1 .55)"
        />
        <path
          fill="#FE2C55"
          d="M13.1 3h2.3c.05.5.17.98.35 1.42a4.9 4.9 0 0 0 2.9 2.6v2.2a6.5 6.5 0 0 1-3-1v5.2a5.05 5.05 0 1 1-5.05-5.05c.2 0 .4.01.6.04v2.3a2.78 2.78 0 1 0 1.9 2.64V3Z"
          transform="translate(.55 -.35)"
        />
        <path
          fill="#161823"
          d="M13.1 3h2.3c.05.5.17.98.35 1.42a4.9 4.9 0 0 0 2.9 2.6v2.2a6.5 6.5 0 0 1-3-1v5.2a5.05 5.05 0 1 1-5.05-5.05c.2 0 .4.01.6.04v2.3a2.78 2.78 0 1 0 1.9 2.64V3Z"
        />
      </>
    ),
  },
  telegram: {
    label: "Telegram",
    glyph: (
      <>
        <circle cx="12" cy="12" r="10" fill="#26A5E4" />
        <path
          fill="#fff"
          d="M17.6 7.4 15.5 17c-.15.68-.56.84-1.14.52l-3.15-2.32-1.52 1.46c-.17.17-.31.31-.63.31l.22-3.2 5.83-5.27c.25-.22-.06-.35-.4-.13L6.5 12.9l-3.1-.97c-.67-.21-.69-.67.14-1l12.1-4.66c.56-.2 1.05.13.96 1.13Z"
        />
      </>
    ),
  },
};

export function SocialLinks({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3.5 sm:flex-row sm:gap-5">
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-bright">
        {label}
      </span>
      <ul className="flex items-center gap-3">
        {Object.entries(institute.social).map(([key, value]) => {
          const icon = ICONS[key];
          if (!icon) return null;
          const glyph = (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              {icon.glyph}
            </svg>
          );
          const disc =
            "flex h-11 w-11 items-center justify-center rounded-pill bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";
          return (
            <li key={key}>
              {isTodo(value) ? (
                <span
                  title={`${icon.label} — link to be supplied`}
                  aria-label={`${icon.label} link not yet available`}
                  className={`${disc} cursor-not-allowed opacity-70`}
                >
                  {glyph}
                </span>
              ) : (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={icon.label}
                  className={`${disc} hover:-translate-y-1`}
                >
                  {glyph}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
