"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ClothCanvas = dynamic(() => import("./ClothCanvas"), { ssr: false });

/**
 * Decides whether this visitor gets the live fabric. The poster is the
 * default and is beautiful on its own, so failing any check costs the
 * page nothing — the 3D bundle is simply never requested.
 */
function canRunFabric() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && !/^(4g|5g)$/.test(conn.effectiveType)) return false;

  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (typeof mem === "number" && mem < 4) return false;

  /* No WebGL2, no upgrade — the poster stands in. */
  try {
    const probe = document.createElement("canvas");
    if (!probe.getContext("webgl2")) return false;
  } catch {
    return false;
  }
  return true;
}

export function ClothStage() {
  const [live, setLive] = useState(false);

  useEffect(() => {
    /* Wait for idle so the fabric never competes with first paint. */
    const start = () => setLive(canRunFabric());
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 2200 });
      return () => (
        window as Window & { cancelIdleCallback?: (h: number) => void }
      ).cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(start, 1200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
      <div className="cloth-poster" />
      {live && <ClothCanvas />}
    </div>
  );
}
