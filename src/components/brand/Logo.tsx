import Image from "next/image";

/**
 * The institute's real logo.
 *
 * Source artwork: public/brand/logo-original.png, supplied by the client.
 * The variants beside it are derived from that file — background removed
 * by flood-filling inward from the edges, so the white inside the gear hub
 * and between the fabric lines is preserved rather than punched out.
 *
 * The mark is used with live text rather than the baked-in lockup so the
 * tagline still translates on /am and stays selectable. The full lockup is
 * used where text needs no translation: the favicon and the share card.
 */

const MARK = {
  brand: "/brand/logo-mark.png",
  paper: "/brand/logo-mark-white.png",
} as const;

/** Intrinsic size of the trimmed mark, for correct aspect ratio. */
const MARK_W = 154;
const MARK_H = 183;

export function Logo({
  tone = "brand",
  height = 44,
  priority = false,
  alt = "",
}: {
  /** "brand" on light surfaces, "paper" on the navy footer. */
  tone?: "brand" | "paper";
  height?: number;
  priority?: boolean;
  /** Leave empty when adjacent text already names the institute. */
  alt?: string;
}) {
  return (
    <Image
      src={MARK[tone]}
      alt={alt}
      width={Math.round((MARK_W / MARK_H) * height)}
      height={height}
      priority={priority}
      aria-hidden={alt ? undefined : true}
    />
  );
}

/** Mark plus the two-line wordmark, as the logo is locked up. */
export function Wordmark({
  tone = "brand",
  name,
  tagline,
  priority = false,
}: {
  tone?: "brand" | "paper";
  name: string;
  tagline: string;
  priority?: boolean;
}) {
  const text = tone === "paper" ? "text-paper" : "text-brand";
  const sub = tone === "paper" ? "text-on-deep" : "text-muted";

  return (
    <span className="flex items-center gap-3">
      <Logo tone={tone} height={44} priority={priority} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-body text-[1.3rem] font-extrabold uppercase tracking-[0.055em] ${text}`}
        >
          {name}
        </span>
        <span
          className={`mt-1 text-[0.62rem] uppercase tracking-[0.12em] ${sub}`}
        >
          {tagline}
        </span>
      </span>
    </span>
  );
}
