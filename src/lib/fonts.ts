import {
  Bodoni_Moda,
  Hanken_Grotesk,
  IBM_Plex_Mono,
  Noto_Sans_Ethiopic,
} from "next/font/google";

/* All faces are self-hosted and subset by next/font at build time —
   no runtime requests to Google. Italics are omitted deliberately:
   every axis costs kilobytes on metered mobile data. */

export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: "normal",
  variable: "--font-bodoni",
  display: "swap",
});

export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  style: "normal",
  variable: "--font-hanken",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: "normal",
  variable: "--font-plex-mono",
  display: "swap",
});

/* preload: false — the @font-face is emitted on every locale, but
   browsers only fetch the file when rendered text uses the family,
   which only happens on /am routes. Keeps Ethiopic off /en entirely. */
export const notoEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-ethiopic",
  display: "swap",
  preload: false,
});
