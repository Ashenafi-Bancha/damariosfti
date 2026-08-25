import { notFound } from "next/navigation";

/** Catch-all inside the locale segment so unknown paths get the
    localized 404 rather than a bare one. */
export default function CatchAllPage() {
  notFound();
}
