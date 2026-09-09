import Image from "next/image";
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

  if (typeof heroMedia === "string") {
    return (
      <Image
        src={heroMedia}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 34rem, (min-width: 640px) 92vw, 100vw"
        className="rounded-[inherit] object-cover"
      />
    );
  }

  /* Nothing to show: a plain tinted panel rather than a placeholder. */
  return <div className="absolute inset-0 rounded-[inherit] bg-brand-wash" />;
}
