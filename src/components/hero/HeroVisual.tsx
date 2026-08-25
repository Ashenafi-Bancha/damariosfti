export interface HeroLabels {
  piece01: string;
  piece02: string;
  piece03: string;
  grain: string;
}

/**
 * The drafting table: a garment composed on a dress form, with the chalk
 * ghost-outlines of the flat pattern pieces still visible where they lay.
 * Pure inline SVG — this IS the hero image, so the LCP element stays
 * server-rendered text + vector at almost zero transfer cost.
 *
 * Each garment piece is a transform-ready <g class="hero-piece …"> so the
 * motion pass can scrub them from scattered to composed without touching
 * the geometry. Decorative: annotations are drafting-table notes, so the
 * whole SVG is aria-hidden and the headline carries the meaning.
 */
export function HeroVisual({ labels }: { labels: HeroLabels }) {
  return (
    <svg
      viewBox="0 0 420 560"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      {/* ghost outlines — where the flat pieces lay before assembly */}
      <g
        fill="none"
        stroke="var(--color-chalk-dim)"
        strokeDasharray="5 5"
        opacity="0.16"
      >
        <path d="M34 64l74 -12 16 62 -50 36 -42 -24Z" />
        <ellipse cx="352" cy="92" rx="36" ry="16" transform="rotate(18 352 92)" />
        <path d="M28 296l54 -8 18 92 -76 10Z" />
        <path d="M336 300l56 6 -10 96 -62 -8Z" />
      </g>

      {/* tailor's chalk crosses */}
      <g stroke="var(--color-chalk-dim)" opacity="0.3" strokeWidth="1">
        <path d="M96 232v8M92 236h8" />
        <path d="M330 210v8M326 214h8" />
        <path d="M64 470v8M60 474h8" />
      </g>

      {/* dress form */}
      <g
        fill="var(--color-ink-raised)"
        stroke="var(--color-chalk-dim)"
        strokeOpacity="0.5"
      >
        <rect x="206" y="468" width="8" height="34" />
        <ellipse cx="210" cy="512" rx="64" ry="12" />
        <rect x="202" y="98" width="16" height="22" rx="6" />
        <circle cx="210" cy="92" r="7" />
      </g>

      {/* garment — sleeves behind bodice */}
      <g className="hero-piece hero-sleeve-l">
        <path
          d="M152 150C136 146 124 154 122 168c10 12 26 14 36 8-3-9-5-18-6-26Z"
          fill="var(--color-chalk-dim)"
          stroke="var(--color-ink)"
          strokeOpacity="0.25"
        />
      </g>
      <g className="hero-piece hero-sleeve-r">
        <path
          d="M268 150c16-4 28 4 30 18-10 12-26 14-36 8 3-9 5-18 6-26Z"
          fill="var(--color-chalk-dim)"
          stroke="var(--color-ink)"
          strokeOpacity="0.25"
        />
      </g>

      <g className="hero-piece hero-skirt">
        <path
          d="M164 294L196 294C190 352 184 412 180 472L120 468C126 410 142 350 164 294Z"
          fill="var(--color-chalk)"
          stroke="var(--color-ink)"
          strokeOpacity="0.2"
        />
        <path
          d="M196 294L224 294C230 352 236 412 240 472L180 472C184 412 190 352 196 294Z"
          fill="var(--color-saffron)"
          stroke="var(--color-ink)"
          strokeOpacity="0.2"
        />
        <path
          d="M224 294L256 294C278 350 294 410 300 468L240 472C236 412 230 352 224 294Z"
          fill="var(--color-chalk)"
          stroke="var(--color-ink)"
          strokeOpacity="0.2"
        />
        {/* hem stitch */}
        <path
          d="M126 462Q210 480 294 462"
          fill="none"
          stroke="var(--color-thread)"
          strokeDasharray="3 3"
          opacity="0.65"
        />
        {/* grain line on the right panel */}
        <g stroke="var(--color-ink)" strokeOpacity="0.35" fill="none">
          <path d="M266 356v70" />
          <path d="M262 362l4-6 4 6M262 420l4 6 4-6" />
        </g>
        <text
          x="274"
          y="380"
          fontSize="8"
          letterSpacing="0.14em"
          fill="var(--color-ink)"
          fillOpacity="0.45"
          className="font-mono"
          transform="rotate(90 274 380)"
        >
          {labels.grain}
        </text>
      </g>

      <g className="hero-piece hero-bodice">
        <path
          d="M150 152c22-6 40-7 47-9q13 25 26 0c7 2 25 3 47 9 4 44-4 96-14 142h-92c-10-46-18-98-14-142Z"
          fill="var(--color-chalk)"
          stroke="var(--color-ink)"
          strokeOpacity="0.2"
        />
        {/* darts */}
        <path
          d="M185 294l6-50 6 50M223 294l6-50 6 50"
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity="0.18"
        />
        {/* neckline stitch */}
        <path
          d="M197 146q13 24 26 0"
          fill="none"
          stroke="var(--color-thread)"
          strokeDasharray="3 3"
          opacity="0.6"
        />
      </g>

      {/* waistband over bodice + skirt joint */}
      <g className="hero-piece hero-waist">
        <path d="M162 290h96l2 10H160Z" fill="var(--color-malachite)" />
      </g>

      {/* drafting annotations with leader lines */}
      <g
        fontSize="9"
        letterSpacing="0.1em"
        fill="var(--color-slate)"
        className="font-mono"
      >
        <text x="8" y="140">{labels.piece01}</text>
        <text x="412" y="52" textAnchor="end">{labels.piece02}</text>
        <text x="8" y="446">{labels.piece03}</text>
      </g>
      <g stroke="var(--color-slate)" strokeOpacity="0.4" fill="none">
        <path d="M8 146h80l58 12" />
        <path d="M340 58l-48 86" />
        <path d="M8 452h80l28 10" />
      </g>
    </svg>
  );
}
