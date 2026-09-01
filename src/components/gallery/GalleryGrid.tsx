import Image from "next/image";
import { useTranslations } from "next-intl";
import { gallery, type GalleryCategory } from "@/content/gallery";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A column-flow (masonry) grid. The photographs vary in aspect ratio, so
 * columns let each keep its natural shape instead of being cropped into a
 * uniform box — and it costs no JS.
 *
 * Only the first few load eagerly; the rest are lazy, which keeps the page
 * within budget on a metered connection even with 13 photographs.
 */
export function GalleryGrid({ filter }: { filter?: GalleryCategory }) {
  const t = useTranslations("gallery");
  const items = filter ? gallery.filter((g) => g.category === filter) : gallery;

  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
      {items.map((g, i) => (
        <Reveal key={g.slug} delay={Math.min(i, 5) * 60}>
          <figure className="card group relative overflow-hidden break-inside-avoid">
            <Image
              src={`/gallery/${g.slug}.jpg`}
              alt={t(`items.${g.slug}`)}
              width={g.width}
              height={g.height}
              sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw"
              loading={i < 3 ? "eager" : "lazy"}
              priority={i === 0}
              className="w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-brand-deep/85 to-transparent px-5 pb-4 pt-10 text-sm text-paper opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
              {t(`items.${g.slug}`)}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
