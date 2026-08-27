"use client";

import { useEffect, useRef } from "react";

/**
 * A real 3D fabric surface: a subdivided plane displaced by layered
 * travelling waves, lit per-pixel with a silk-like anisotropic sheen
 * and a fresnel rim. Hand-written WebGL2 — no three.js — so the whole
 * scene costs a few kilobytes instead of ~150, which is what let us
 * put genuine 3D on a page that has to open on metered mobile data.
 *
 * The loop is driven by requestAnimationFrame but suspends entirely
 * when the canvas leaves the viewport or the tab is hidden.
 */

const VERT = `#version 300 es
in vec2 aGrid;
uniform mat4 uProj;
uniform mat4 uView;
uniform float uTime;
uniform float uAmp;
out vec3 vNormal;
out vec3 vView;
out vec2 vUv;

float drape(vec2 p, float t) {
  float z = 0.0;
  z += 0.150 * sin(p.x * 2.10 + t * 0.62);
  z += 0.105 * sin(p.y * 1.75 - t * 0.48 + 1.30);
  z += 0.062 * sin((p.x + p.y) * 3.05 + t * 0.85);
  z += 0.034 * sin((p.x - p.y) * 4.70 - t * 1.05);
  z += 0.018 * sin(p.x * 7.30 + t * 1.45);
  /* the fabric is pinned along the top edge and falls away below */
  return z * mix(0.35, 1.25, smoothstep(1.0, -1.0, p.y));
}

void main() {
  vec2 p = aGrid;
  float e = 0.015;
  float z  = drape(p, uTime) * uAmp;
  float zx = drape(p + vec2(e, 0.0), uTime) * uAmp;
  float zy = drape(p + vec2(0.0, e), uTime) * uAmp;

  vec3 tx = vec3(e * 1.45, 0.0, zx - z);
  vec3 ty = vec3(0.0, e, zy - z);
  vNormal = normalize(cross(tx, ty));

  vUv = p * 0.5 + 0.5;
  vec4 eye = uView * vec4(p.x * 1.45, p.y, z, 1.0);
  vView = -eye.xyz;
  gl_Position = uProj * eye;
}`;

const FRAG = `#version 300 es
precision mediump float;
in vec3 vNormal;
in vec3 vView;
in vec2 vUv;
uniform vec3 uDeep;
uniform vec3 uBrand;
uniform vec3 uBright;
out vec4 outColor;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vView);
  vec3 L = normalize(vec3(-0.32, 0.72, 0.86));
  vec3 H = normalize(L + V);

  /* wrapped diffuse keeps the shadowed folds luminous rather than black */
  float diff = clamp(dot(N, L) * 0.5 + 0.5, 0.0, 1.0);
  /* two lobes: a tight glint over a broad satin sheen */
  float glint = pow(max(dot(N, H), 0.0), 68.0);
  float sheen = pow(max(dot(N, H), 0.0), 9.0);
  float fres  = pow(1.0 - max(dot(N, V), 0.0), 3.4);

  vec3 base = mix(uDeep, uBrand, smoothstep(0.0, 1.0, vUv.y * 0.72 + vUv.x * 0.28));
  base = mix(base, uBright, smoothstep(0.55, 1.0, vUv.y) * 0.42);

  vec3 col = base * (0.42 + 0.78 * diff);
  col += uBright * sheen * 0.20;
  col += vec3(1.0) * glint * 0.42;
  col += uBright * fres * 0.34;

  /* the lighting above runs in linear space; encode back to sRGB or
     the fabric reads as near-black instead of brand blue */
  col = pow(clamp(col, 0.0, 1.0), vec3(0.4545));

  /* soft elliptical falloff so the sheet melts into the page */
  vec2 d = vUv * 2.0 - 1.0;
  float edge = smoothstep(1.28, 0.35, length(d * vec2(0.82, 1.0)));
  outColor = vec4(col, edge);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/** Column-major perspective projection. */
function perspective(fovY: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fovY / 2);
  const nf = 1 / (near - far);
  // prettier-ignore
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ]);
}

/** Rotation about X, then a push down the view axis. */
function view(rx: number, dist: number) {
  const c = Math.cos(rx);
  const s = Math.sin(rx);
  // prettier-ignore
  return new Float32Array([
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, -dist, 1,
  ]);
}

function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  /* sRGB → linear, so the lighting maths behaves */
  const to = (v: number) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return [to((n >> 16) & 255), to((n >> 8) & 255), to(n & 255)];
}

export default function ClothCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    /* Grid density scales with the display so phones do less work. */
    const N = window.innerWidth < 768 ? 46 : 76;
    const verts = new Float32Array(N * N * 2);
    let k = 0;
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        verts[k++] = (i / (N - 1)) * 2 - 1;
        verts[k++] = (j / (N - 1)) * 2 - 1;
      }
    }
    const idx = new Uint16Array((N - 1) * (N - 1) * 6);
    let m = 0;
    for (let j = 0; j < N - 1; j++) {
      for (let i = 0; i < N - 1; i++) {
        const a = j * N + i;
        idx[m++] = a;
        idx[m++] = a + 1;
        idx[m++] = a + N;
        idx[m++] = a + 1;
        idx[m++] = a + N + 1;
        idx[m++] = a + N;
      }
    }

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aGrid");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);

    const uProj = gl.getUniformLocation(prog, "uProj");
    const uView = gl.getUniformLocation(prog, "uView");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uAmp = gl.getUniformLocation(prog, "uAmp");

    const css = getComputedStyle(document.documentElement);
    const token = (name: string, fallback: string) =>
      rgb(css.getPropertyValue(name).trim() || fallback);
    gl.uniform3fv(gl.getUniformLocation(prog, "uDeep"), token("--color-brand-deep", "#0b3868"));
    gl.uniform3fv(gl.getUniformLocation(prog, "uBrand"), token("--color-brand", "#15589c"));
    gl.uniform3fv(gl.getUniformLocation(prog, "uBright"), token("--color-brand-bright", "#6ba8e4"));

    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(
      gl.SRC_ALPHA,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA
    );
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (w === width && h === height) return;
      width = canvas.width = w;
      height = canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniformMatrix4fv(
        uProj,
        false,
        perspective(0.92, w / Math.max(h, 1), 0.1, 24)
      );
    };
    resize();
    /* shallow tilt keeps the drape filling the frame rather than
       receding off the top edge */
    gl.uniformMatrix4fv(uView, false, view(-0.4, 2.9));

    let raf = 0;
    let running = false;
    let start = 0;
    let ready = false;

    const frame = (now: number) => {
      if (!running) return;
      if (!start) start = now;
      resize();
      const t = (now - start) / 1000;
      gl.uniform1f(uTime, t);
      /* ease the drape open on first paint instead of snapping in */
      gl.uniform1f(uAmp, Math.min(1, t / 2.4) ** 0.75);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
      if (!ready) {
        ready = true;
        canvas.dataset.ready = "true";
      }
      raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (running || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? play() : pause()),
      { threshold: 0.01 }
    );
    io.observe(canvas);
    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      pause();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteBuffer(vbo);
      gl.deleteBuffer(ibo);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={ref} className="cloth-canvas" aria-hidden="true" />;
}
