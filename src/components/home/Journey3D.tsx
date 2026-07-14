"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/useScrollGsap";

/**
 * VIAGGIO 3D — apertura Homepage.
 * Mezzo procedurale (escavatore) costruito in Three.js.
 * Scroll → progress 0..1 pilota: rotazione 360°, camera che sale/inclina,
 * esplosione in pezzi analizzabili, comparsa testi, transizione colore/categorie.
 * NB: modello procedurale — sostituibile con un .glb reale caricando GLTFLoader
 * e mappando i gruppi mesh sugli stessi nomi (tracks, body, cabin, boom, stick, bucket).
 */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export function Journey3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const p0 = useRef<HTMLDivElement>(null); // intro
  const p1 = useRef<HTMLDivElement>(null); // analisi pezzi
  const p2 = useRef<HTMLDivElement>(null); // categorie

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = wrap.current;
    if (!canvas || !section) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0e11, 0.03);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 1.4, 10);

    // Luci — industriale + rim brand
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(5, 8, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xf5b301, 2.2);
    rim.position.set(-6, 3, -4);
    scene.add(rim);

    // Materiali
    const yellow = new THREE.MeshStandardMaterial({ color: 0xf5b301, metalness: 0.4, roughness: 0.45 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x1b2129, metalness: 0.6, roughness: 0.5 });
    const steel = new THREE.MeshStandardMaterial({ color: 0x3a4552, metalness: 0.8, roughness: 0.35 });
    const glass = new THREE.MeshStandardMaterial({ color: 0x9fd0ff, metalness: 0.2, roughness: 0.1, transparent: true, opacity: 0.55 });

    // ---- Costruzione escavatore ----
    const root = new THREE.Group();
    scene.add(root);
    type Part = THREE.Object3D & { userData: { home: THREE.Vector3; dir: THREE.Vector3 } };
    const parts: Part[] = [];
    const addPart = (obj: THREE.Object3D, dir: [number, number, number]) => {
      obj.userData.home = obj.position.clone();
      obj.userData.dir = new THREE.Vector3(...dir);
      parts.push(obj as Part);
      root.add(obj);
    };
    const box = (w: number, h: number, d: number, m: THREE.Material) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);

    // Cingoli
    const tracks = new THREE.Group();
    for (const x of [-1.15, 1.15]) {
      const t = box(0.7, 0.7, 4.2, dark);
      t.position.set(x, -1.4, 0);
      tracks.add(t);
      for (let i = -1; i <= 1; i++) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.72, 16), steel);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, -1.55, i * 1.3);
        tracks.add(wheel);
      }
    }
    addPart(tracks, [0, -1, 0]);

    // Corpo rotante
    const body = box(2.6, 1.1, 3.2, yellow);
    body.position.set(0, -0.5, -0.3);
    addPart(body, [0, 0, -1]);

    // Contrappeso
    const cw = box(2.4, 1.2, 0.8, dark);
    cw.position.set(0, -0.5, -1.9);
    addPart(cw, [0, 0.2, -1]);

    // Cabina
    const cabin = box(1.15, 1.25, 1.3, steel);
    cabin.position.set(-0.75, 0.55, 0.6);
    const win = box(1.02, 0.8, 1.32, glass);
    win.position.set(0, 0.15, 0);
    cabin.add(win);
    addPart(cabin, [-1, 0.4, 0.2]);

    // Braccio (boom)
    const boom = box(0.5, 2.6, 0.6, yellow);
    boom.geometry.translate(0, 1.3, 0);
    boom.position.set(0.7, -0.1, 1.1);
    boom.rotation.x = -0.5;
    addPart(boom, [0.6, 0.8, 0.6]);

    // Avambraccio (stick)
    const stick = box(0.4, 2.0, 0.45, yellow);
    stick.geometry.translate(0, 1.0, 0);
    stick.position.set(0.7, 1.9, 2.4);
    stick.rotation.x = -1.9;
    addPart(stick, [0.4, 1.0, 1.0]);

    // Benna (bucket)
    const bucket = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.7, 0.8), steel);
    bucket.position.set(0.7, 0.5, 3.3);
    addPart(bucket, [0.3, -0.4, 1.2]);

    root.position.y = 0.4;

    // ---- Resize ----
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // ---- Mouse parallax ----
    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5);
      mouse.y = (e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);

    // ---- Progress da scroll (pin) ----
    const prog = { v: 0 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=500%",
      pin: true,
      scrub: reduce ? true : 0.8,
      onUpdate: (self) => { prog.v = self.progress; },
    });

    const bgA = new THREE.Color(0x0b0e11);
    const bgB = new THREE.Color(0x1a1205);
    const setOpacity = (el: HTMLElement | null, o: number) => { if (el) el.style.opacity = String(clamp01(o)); };

    // ---- Render loop (pausa fuori viewport) ----
    let raf = 0, visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) render();
    }, { threshold: 0 });
    io.observe(section);
    const render = () => {
      if (!visible) return;
      const p = prog.v;
      // fasi
      const a = smooth(clamp01(p / 0.34));         // 360 spin
      const b = smooth(clamp01((p - 0.34) / 0.34)); // explode + camera sale
      const c = smooth(clamp01((p - 0.68) / 0.32)); // categorie/colore

      root.rotation.y = a * Math.PI * 2 + b * 0.8 + (reduce ? 0 : mouse.x * 0.3);
      root.rotation.x = b * 0.12;

      // esplosione pezzi
      for (const part of parts) {
        const d = part.userData.dir, home = part.userData.home;
        const f = b * 2.4 * (1 - c * 0.6);
        part.position.set(home.x + d.x * f, home.y + d.y * f, home.z + d.z * f);
      }

      // camera sale e si inclina
      const camY = lerp(1.4, 4.6, b) + (reduce ? 0 : -mouse.y * 0.6);
      const camZ = lerp(10, 13.5, b);
      camera.position.set((reduce ? 0 : mouse.x * 1.2), camY, camZ);
      camera.lookAt(0, lerp(0.2, 1.4, b), 0);

      // colore sfondo transizione
      const bg = bgA.clone().lerp(bgB, c);
      renderer.setClearColor(bg, 1);
      scene.fog!.color = bg;
      rim.intensity = 2.2 + c * 1.5;

      // dissolvenza mezzo verso le categorie
      root.visible = c < 0.98;
      const fade = 1 - c;
      [yellow, dark, steel].forEach((m) => { m.opacity = fade; m.transparent = c > 0; });

      // overlay testi per fase
      setOpacity(p0.current, 1 - a * 1.2);
      setOpacity(p1.current, b > 0.15 && b < 0.95 ? (b - 0.15) / 0.4 : b >= 0.95 ? 1 - (b - 0.95) * 6 : 0);
      setOpacity(p2.current, c);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      st.kill();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
    };
  }, []);

  return (
    <section ref={wrap} className="relative h-screen overflow-hidden bg-graphite-950 text-white">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* FASE 0 — intro */}
      <div ref={p0} className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity">
        <span className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-brand">DLF Macchine · Sicilia</span>
        <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[0.95] sm:text-7xl lg:text-8xl">
          Guarda dentro <span className="text-brand">la macchina</span>
        </h1>
        <p className="mt-6 max-w-md text-white/60">Scorri per esplorarla — ruota, si apre, si racconta.</p>
        <span className="mt-10 animate-bounce text-2xl text-brand">↓</span>
      </div>

      {/* FASE 1 — analisi pezzi */}
      <div ref={p1} className="pointer-events-none absolute inset-0 flex items-center opacity-0 transition-opacity">
        <div className="mx-auto w-full max-w-6xl px-6">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand">Vista esplosa</span>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold sm:text-6xl">Ogni componente, sotto controllo</h2>
          <ul className="mt-6 grid max-w-md gap-2 text-white/70">
            {["Cingoli e sottocarro", "Corpo rotante e cabina", "Braccio, avambraccio e benna", "Motore e idraulica"].map((t) => (
              <li key={t} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand" />{t}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* FASE 2 — categorie */}
      <div ref={p2} className="pointer-events-none absolute inset-0 flex items-center opacity-0 transition-opacity">
        <div className="mx-auto w-full max-w-6xl px-6">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand">La gamma DLF</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-6xl">Dal 3D al tuo cantiere</h2>
          <div className="pointer-events-auto mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Escavatori", "/mezzi"], ["Mini escavatori", "/mezzi"],
              ["Telescopici", "/mezzi"], ["Minipale", "/mezzi"],
            ].map(([t, href]) => (
              <a key={t} href={href} className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur transition-colors hover:border-brand">
                <span className="font-display text-xl font-bold text-white">{t}</span>
                <span className="mt-2 block text-sm text-brand">Esplora →</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
