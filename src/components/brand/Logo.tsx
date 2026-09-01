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

/**
 * Mark plus the two-line wordmark, following the proportions of the
 * printed logo: a heavy "DAMARIOS" with the tagline tucked beneath it at
 * roughly the same measure. The tagline is deliberately small and tightly
 * tracked — set any larger it runs far wider than the name above it and
 * the lockup stops reading as one unit.
 */
export function Wordmark({
  tone = "brand",
  name,
  tagline,
  priority = false,
  size = "md",
}: {
  tone?: "brand" | "paper";
  name: string;
  tagline: string;
  priority?: boolean;
  /** "lg" gives the footer, which has room, a larger lockup. */
  size?: "md" | "lg";
}) {
  const text = tone === "paper" ? "text-paper" : "text-brand";
  const sub = tone === "paper" ? "text-on-deep" : "text-muted";

  /* Sizes chosen by measuring the rendered text: the tagline is set so it
     runs to roughly the same width as "DAMARIOS" above it, as it does in
     the printed logo. It must never wrap — a second line breaks the
     lockup — hence whitespace-nowrap below. */
  const s =
    size === "lg"
      ? { mark: 62, name: "text-[2rem]", tag: "0.56rem", gap: "gap-4" }
      : { mark: 46, name: "text-[1.7rem]", tag: "0.47rem", gap: "gap-3" };

  return (
    <span className={`flex items-center ${s.gap}`}>
      <Logo tone={tone} height={s.mark} priority={priority} />
      <span className="flex flex-col">
        <span
          className={`font-body ${s.name} font-extrabold uppercase leading-none tracking-[0.005em] ${text}`}
        >
          {name}
        </span>
        <span
          className={`wordmark-tag mt-[0.4em] whitespace-nowrap uppercase leading-none tracking-[0.05em] ${sub}`}
          style={{ "--wm-tag": s.tag } as React.CSSProperties}
        >
          {tagline}
        </span>
      </span>
    </span>
  );
}
