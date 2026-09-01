import { TODO, type Todo } from "./types";

/**
 * The image shown in the homepage hero.
 *
 * Replace with a path under public/ once the client supplies artwork —
 * a rendered 3D design or a photograph of the institute. For example:
 *
 *   export const heroMedia = "/gallery/institute-reception.jpg";
 *
 * While this stays a TODO the hero shows a clean, clearly-marked empty
 * panel rather than a decorative stand-in.
 */
export const heroMedia: string | Todo = TODO(
  "Client to supply the hero image — a 3D design render or a photo of the institute"
);
