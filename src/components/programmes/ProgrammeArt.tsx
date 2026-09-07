/**
 * Original brand artwork, one per programme.
 *
 * These are drawn here rather than sourced as stock photography. A stock
 * photo of a salon or a classroom on an institute's programme card reads
 * as a picture of *this* institute's salon or classroom, which would be a
 * claim the site cannot support. These are plainly graphic, carry no such
 * implication, cost about a kilobyte each, and are replaced the moment
 * real teaching photography arrives (see content/gallery.ts).
 */

const wash = "var(--color-brand-wash)";
const brand = "var(--color-brand)";
const deep = "var(--color-brand-deep)";
const bright = "var(--color-brand-bright)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 320 200"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="320" height="200" fill={wash} />
      <circle cx="268" cy="34" r="66" fill={bright} opacity="0.18" />
      <circle cx="42" cy="180" r="54" fill={brand} opacity="0.10" />
      {children}
    </svg>
  );
}

const ART: Record<string, React.ReactNode> = {
  /* dress form with a pattern piece pinned to it */
  "fashion-design": (
    <g fill="none" stroke={brand} strokeWidth="2.4" strokeLinejoin="round">
      <path d="M160 58c-14 4-22 10-24 20-3 15 2 34-6 52h60c-8-18-3-37-6-52-2-10-10-16-24-20Z" fill={deep} stroke="none" opacity="0.9" />
      <path d="M152 56a8 8 0 0 1 16 0" />
      <path d="M160 130v26M140 156h40" />
      <path d="M206 74l40-8 10 34-32 20-20-14Z" strokeDasharray="6 5" />
      <path d="M64 92h44M64 108h30" strokeDasharray="5 5" opacity="0.55" />
    </g>
  ),
  /* runway receding under a spotlight */
  modeling: (
    <g fill="none" stroke={brand} strokeWidth="2.4" strokeLinecap="round">
      <path d="M96 168L142 66h36l46 102" stroke={deep} />
      <path d="M118 122h84M108 146h104" opacity="0.5" />
      <circle cx="160" cy="44" r="13" fill={deep} stroke="none" />
      <path d="M138 30a24 24 0 0 1 44 0" opacity="0.55" strokeDasharray="5 5" />
      <path d="M160 57v9" />
    </g>
  ),
  /* shears and a comb: the salon crafts */
  cosmetology: (
    <g fill="none" stroke={brand} strokeWidth="2.4" strokeLinecap="round">
      <circle cx="118" cy="150" r="14" />
      <circle cx="156" cy="150" r="14" />
      <path d="M126 138 196 58M148 138 78 58" stroke={deep} />
      <path d="M212 92h56v14h-56z" />
      <path d="M218 106v16M230 106v16M242 106v16M254 106v16" opacity="0.6" />
    </g>
  ),
  /* a hand, with a polish bottle beside it */
  "nail-technology": (
    <g fill="none" stroke={brand} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M92 168V104c0-7 10-7 10 0v-18c0-7 11-7 11 0v-8c0-7 11-7 11 0v10c0-7 11-7 11 0v40c0 24-12 40-30 40Z" stroke={deep} />
      <path d="M92 104c-8 2-12 8-10 16l6 20" />
      <ellipse cx="102" cy="99" rx="5" ry="4" fill={deep} stroke="none" />
      <rect x="206" y="104" width="34" height="46" rx="6" />
      <path d="M216 104V92h14v12" />
      <path d="M206 122h34" opacity="0.6" />
    </g>
  ),
  /* a screen with circuitry running out of it */
  "information-technology": (
    <g fill="none" stroke={brand} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="88" y="58" width="144" height="90" rx="8" stroke={deep} />
      <path d="M144 148v14h32v-14M128 162h64" />
      <path d="M112 92l-12 11 12 11M148 92l12 11-12 11" opacity="0.85" />
      <path d="M176 86h34M176 104h24M176 122h34" opacity="0.5" />
      <circle cx="216" cy="86" r="4" fill={brand} stroke="none" />
      <circle cx="206" cy="122" r="4" fill={brand} stroke="none" />
    </g>
  ),
  /* a shield, with a lens watching from beside it */
  "security-training": (
    <g fill="none" stroke={brand} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M132 54l44-14 44 14v44c0 30-20 50-44 60-24-10-44-30-44-60Z" stroke={deep} />
      <path d="M158 96l14 14 26-28" />
      <circle cx="80" cy="132" r="17" />
      <circle cx="80" cy="132" r="6" fill={brand} stroke="none" />
      <path d="M62 108a26 26 0 0 1 36 0" opacity="0.55" strokeDasharray="5 4" />
    </g>
  ),
};

export function ProgrammeArt({ slug }: { slug: string }) {
  const art = ART[slug];
  if (!art) return null;
  return <Frame>{art}</Frame>;
}

export const hasProgrammeArt = (slug: string) => slug in ART;
