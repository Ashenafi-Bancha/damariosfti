import Image from "next/image";
import { useTranslations } from "next-intl";
import { TodoTag } from "@/components/ui/TodoTag";
import { heroMedia } from "@/content/heroMedia";

/**
 * The hero visual slot.
 *
 * Currently an empty light panel awaiting artwork from the client — either
 * a rendered 3D design or a photograph of the institute. To fill it, set
 * `heroMedia` in src/content/heroMedia.ts to the image path; nothing else
 * needs to change and the layout will not shift, because the slot keeps
 * its aspect ratio either way.
 *
 * The live WebGL fabric is still in the repo (ClothStage / ClothCanvas)
 * and can be restored by rendering <ClothStage /> here instead.
 */
export function HeroMedia() {
  const t = useTranslations("hero");

  if (typeof heroMedia === "string") {
    return (
      <Image
        src={heroMedia}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 34rem, 92vw"
        className="rounded-[inherit] object-cover"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-[inherit] bg-paper">
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <svg
          viewBox="0 0 48 40"
          className="w-11 text-brand/25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="4" width="44" height="32" rx="5" />
          <circle cx="15" cy="15" r="4" />
          <path d="m6 32 12-11 8 7 6-5 10 9" />
        </svg>
        <TodoTag kind="heroMedia" />
        <p className="max-w-[22ch] text-xs text-muted">{t("mediaHint")}</p>
      </div>
    </div>
  );
}
