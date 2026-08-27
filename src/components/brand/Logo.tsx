/**
 * The Damarios mark, rebuilt as vector: a gear (technology) whose
 * right side opens into flowing fabric lines (fashion), closed by the
 * stem of a "D", with two circuit nodes tying the two halves together.
 *
 * NOTE FOR THE CLIENT: this is a faithful reconstruction so the logo
 * scales crisply and recolours with the theme at ~2 KB. Before launch,
 * supply the original vector (.svg/.ai/.eps) and swap the paths here so
 * the site carries the exact artwork.
 *
 * The gear path is computed at render time — this is a server
 * component, so it costs the browser nothing.
 */

function gearPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  teeth: number
) {
  const step = (Math.PI * 2) / teeth;
  const at = (angle: number, r: number) =>
    `${(cx + Math.cos(angle) * r).toFixed(2)} ${(cy + Math.sin(angle) * r).toFixed(2)}`;

  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    d += `${i === 0 ? "M" : "L"}${at(a - step * 0.19, rOuter)}`;
    d += `L${at(a + step * 0.19, rOuter)}`;
    d += `L${at(a + step * 0.31, rInner)}`;
    d += `L${at(a + step * 0.69, rInner)}`;
  }
  return `${d}Z`;
}

export function Logo({
  tone = "brand",
  className,
  title,
}: {
  /** "brand" on light surfaces, "paper" on the navy footer. */
  tone?: "brand" | "paper";
  className?: string;
  /** Accessible name; omit when an adjacent text wordmark names it. */
  title?: string;
}) {
  const fill = tone === "paper" ? "var(--color-paper)" : "var(--color-brand)";

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {/* orbit ring — the technology arc around the gear */}
      <path
        d="M96 30A52 52 0 1 0 96 96"
        fill="none"
        stroke={fill}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* gear body, with the hub knocked out */}
      <path
        d={gearPath(52, 63, 39, 32, 12)}
        fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <circle cx="52" cy="63" r="10.5" fill="var(--color-paper)" />

      {/* the D: stem plus a bowl of flowing fabric lines */}
      <rect x="64" y="16" width="20" height="46" fill={fill} />
      <g fill={fill}>
        <path d="M84 16c14 26 14 62-6 88-4 5-9 9-14 12 12-26 14-56 6-84-1-5-3-11-6-16Z" />
        <path d="M72 22c11 25 11 56-5 79-3 4-7 8-11 11 9-24 10-50 3-74-1-5-3-11-5-16Z" />
        <path d="M61 30c9 22 9 49-4 68-2 4-6 7-9 9 7-21 8-44 2-64-1-4-2-9-4-13Z" />
      </g>

      {/* circuit nodes */}
      <g fill="none" stroke={fill} strokeWidth="3">
        <path d="M96 30V22" strokeLinecap="round" />
        <circle cx="96" cy="17" r="4.5" />
        <path d="M36 34l-6-5" strokeLinecap="round" />
        <circle cx="26" cy="26" r="4.5" />
      </g>
    </svg>
  );
}

/** Mark plus the two-line wordmark, as the logo is locked up. */
export function Wordmark({
  tone = "brand",
  name,
  tagline,
}: {
  tone?: "brand" | "paper";
  name: string;
  tagline: string;
}) {
  const text = tone === "paper" ? "text-paper" : "text-brand";
  const sub = tone === "paper" ? "text-on-deep" : "text-muted";

  return (
    <span className="flex items-center gap-3">
      <Logo tone={tone} className="h-11 w-11 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-body text-[1.35rem] font-extrabold uppercase tracking-[0.06em] ${text}`}
        >
          {name}
        </span>
        <span
          className={`mt-1 text-[0.62rem] uppercase tracking-[0.13em] ${sub}`}
        >
          {tagline}
        </span>
      </span>
    </span>
  );
}
