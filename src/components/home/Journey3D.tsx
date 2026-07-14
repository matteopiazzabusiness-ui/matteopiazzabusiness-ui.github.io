"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ScrollTrigger } from "@/lib/useScrollGsap";

/**
 * VIAGGIO 3D — apertura Homepage.
 * Carica il modello reale del mezzo da /public/models/dlf-mezzo.glb.
 * Se il file manca o fallisce → fallback automatico al mezzo procedurale.
 * Scroll → rotazione 360°, camera che sale/inclina, esplosione dei pezzi,
 * wireframe olografico, bloom, transizione colore/categorie.
 */

const GLB_URL = "/models/dlf-mezzo.glb";
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

type Part = THREE.Object3D & { userData: { home: THREE.Vector3; dir: THREE.Vector3 } };
type Machine = { group: THREE.Group; parts: Part[]; mats: THREE.Material[]; line: THREE.LineBasicMaterial };

export function Journey3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const p0 = useRef<HTMLDivElement>(null);
  const p1 = useRef<HTMLDivElement>(null);
  const p2 = useRef<HTMLDivElement>(null);

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x140d05, 0.028);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 1.4, 10);

    scene.add(new THREE.AmbientLight(0xffe6c0, 0.7));
    scene.add(new THREE.HemisphereLight(0xfff1dc, 0x1a1205, 0.9));
    const key = new THREE.DirectionalLight(0xfff1dc, 2.4); key.position.set(6, 9, 7); scene.add(key);
    const rim = new THREE.DirectionalLight(0xf5b301, 3.0); rim.position.set(-7, 3, -5); scene.add(rim);
    const fill = new THREE.DirectionalLight(0xff7a1a, 1.1); fill.position.set(0, -2, -8); scene.add(fill);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.9, 0.5, 0.82);
    composer.addPass(bloom);

    // ---- helper: wireframe olografico su ogni mesh + raccolta materiali ----
    const equipMachine = (group: THREE.Group): Machine => {
      const line = new THREE.LineBasicMaterial({ color: 0xffd54a, transparent: true, opacity: 0.15 });
      const mats = new Set<THREE.Material>();
      group.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh && m.geometry) {
          (Array.isArray(m.material) ? m.material : [m.material]).forEach((mm) => { if (mm) { mm.transparent = true; mats.add(mm); } });
          const edges = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry, 30), line);
          m.add(edges);
        }
      });
      return { group, parts: [], mats: [...mats], line };
    };

    // ---- FALLBACK: mezzo procedurale ----
    const buildProcedural = (): Machine => {
      const yellow = new THREE.MeshStandardMaterial({ color: 0xf5b301, metalness: 0.4, roughness: 0.45 });
      const dark = new THREE.MeshStandardMaterial({ color: 0x1b2129, metalness: 0.6, roughness: 0.5 });
      const steel = new THREE.MeshStandardMaterial({ color: 0x3a4552, metalness: 0.8, roughness: 0.35 });
      const glass = new THREE.MeshStandardMaterial({ color: 0x9fd0ff, metalness: 0.2, roughness: 0.1, transparent: true, opacity: 0.55 });
      const group = new THREE.Group();
      const parts: Part[] = [];
      const addPart = (obj: THREE.Object3D, dir: [number, number, number]) => {
        obj.userData.home = obj.position.clone();
        obj.userData.dir = new THREE.Vector3(...dir);
        parts.push(obj as Part); group.add(obj);
      };
      const box = (w: number, h: number, d: number, m: THREE.Material) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      const tracks = new THREE.Group();
      for (const x of [-1.15, 1.15]) {
        const t = box(0.7, 0.7, 4.2, dark); t.position.set(x, -1.4, 0); tracks.add(t);
        for (let i = -1; i <= 1; i++) {
          const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.72, 16), steel);
          wheel.rotation.z = Math.PI / 2; wheel.position.set(x, -1.55, i * 1.3); tracks.add(wheel);
        }
      }
      addPart(tracks, [0, -1, 0]);
      const body = box(2.6, 1.1, 3.2, yellow); body.position.set(0, -0.5, -0.3); addPart(body, [0, 0, -1]);
      const cw = box(2.4, 1.2, 0.8, dark); cw.position.set(0, -0.5, -1.9); addPart(cw, [0, 0.2, -1]);
      const cabin = box(1.15, 1.25, 1.3, steel); cabin.position.set(-0.75, 0.55, 0.6);
      const win = box(1.02, 0.8, 1.32, glass); win.position.set(0, 0.15, 0); cabin.add(win); addPart(cabin, [-1, 0.4, 0.2]);
      const boom = box(0.5, 2.6, 0.6, yellow); boom.geometry.translate(0, 1.3, 0); boom.position.set(0.7, -0.1, 1.1); boom.rotation.x = -0.5; addPart(boom, [0.6, 0.8, 0.6]);
      const stick = box(0.4, 2.0, 0.45, yellow); stick.geometry.translate(0, 1.0, 0); stick.position.set(0.7, 1.9, 2.4); stick.rotation.x = -1.9; addPart(stick, [0.4, 1.0, 1.0]);
      const bucket = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.7, 0.8), steel); bucket.position.set(0.7, 0.5, 3.3); addPart(bucket, [0.3, -0.4, 1.2]);
      group.position.y = 0.4;
      const eq = equipMachine(group);
      eq.parts = parts; // esplosione con direzioni curate
      return eq;
    };

    // ---- Normalizza + estrai pezzi da un GLB reale ----
    const prepareGlb = (group: THREE.Group): Machine => {
      // centra e scala a ~4.5 unità di altezza
      const bbox = new THREE.Box3().setFromObject(group);
      const size = bbox.getSize(new THREE.Vector3());
      const center = bbox.getCenter(new THREE.Vector3());
      const scale = 4.5 / Math.max(size.x, size.y, size.z);
      group.scale.setScalar(scale);
      group.position.sub(center.multiplyScalar(scale));
      group.position.y += 0.4;

      const eq = equipMachine(group);
      // esplosione: ogni mesh figlia si allontana dal centro
      const parts: Part[] = [];
      group.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          const c = new THREE.Box3().setFromObject(m).getCenter(new THREE.Vector3());
          const dir = c.sub(group.getWorldPosition(new THREE.Vector3())).normalize();
          if (dir.lengthSq() < 0.01) dir.set(0, 1, 0);
          m.userData.home = m.position.clone();
          m.userData.dir = dir;
          parts.push(m as unknown as Part);
        }
      });
      eq.parts = parts;
      return eq;
    };

    // Holder mutabile: parte col procedurale, poi il GLB (se c'è) lo sostituisce.
    let M = buildProcedural();
    scene.add(M.group);

    new GLTFLoader().load(
      GLB_URL,
      (gltf) => {
        scene.remove(M.group);
        const real = prepareGlb(gltf.scene as unknown as THREE.Group);
        M = real;
        scene.add(M.group);
      },
      undefined,
      () => { /* file assente/errore → resta il procedurale */ },
    );

    // ---- Resize ----
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false); composer.setSize(w, h); bloom.setSize(w, h);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener("mousemove", onMove);

    const prog = { v: 0 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const st = ScrollTrigger.create({
      trigger: section, start: "top top", end: "+=500%", pin: true,
      scrub: reduce ? true : 0.8, onUpdate: (self) => { prog.v = self.progress; },
    });

    const bgA = new THREE.Color(0x0b0e11);
    const bgB = new THREE.Color(0x1a1205);
    const setOpacity = (el: HTMLElement | null, o: number) => { if (el) el.style.opacity = String(clamp01(o)); };

    let raf = 0, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) render(); }, { threshold: 0 });
    io.observe(section);

    const render = () => {
      if (!visible) return;
      const p = prog.v;
      const a = smooth(clamp01(p / 0.34));
      const b = smooth(clamp01((p - 0.34) / 0.34));
      const c = smooth(clamp01((p - 0.68) / 0.32));
      const g = M.group;

      g.rotation.y = a * Math.PI * 2 + b * 0.8 + (reduce ? 0 : mouse.x * 0.3);
      g.rotation.x = b * 0.12;

      for (const part of M.parts) {
        const d = part.userData.dir, home = part.userData.home;
        const f = b * 2.4 * (1 - c * 0.6);
        part.position.set(home.x + d.x * f, home.y + d.y * f, home.z + d.z * f);
      }

      const camY = lerp(1.4, 4.6, b) + (reduce ? 0 : -mouse.y * 0.6);
      const camZ = lerp(10, 13.5, b);
      camera.position.set((reduce ? 0 : mouse.x * 1.2), camY, camZ);
      camera.lookAt(0, lerp(0.2, 1.4, b), 0);

      const bg = bgA.clone().lerp(bgB, c);
      renderer.setClearColor(bg, 1);
      scene.fog!.color = bg;
      rim.intensity = 2.2 + c * 1.5;

      // il mezzo resta solido e visibile; sfuma solo nella fase finale (c)
      const fade = 1 - smooth(clamp01((p - 0.82) / 0.16));
      g.visible = fade > 0.02;
      M.mats.forEach((m) => {
        const mm = m as THREE.Material & { opacity: number };
        mm.transparent = fade < 0.99; mm.opacity = fade;
      });
      M.line.opacity = (0.12 + b * 0.5) * fade;

      // overlay testi — range NON sovrapposti (una fase alla volta)
      setOpacity(p0.current, 1 - smooth(clamp01((p - 0.06) / 0.14)));
      const p1o = smooth(clamp01((p - 0.40) / 0.08)) * (1 - smooth(clamp01((p - 0.60) / 0.06)));
      setOpacity(p1.current, p1o);
      setOpacity(p2.current, smooth(clamp01((p - 0.80) / 0.08)));

      bloom.strength = 0.7 + b * 0.9 + c * 0.5;
      composer.render();
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); st.kill();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      renderer.dispose();
      scene.traverse((o) => { const m = o as THREE.Mesh; if (m.geometry) m.geometry.dispose(); });
    };
  }, []);

  return (
    <section ref={wrap} className="relative h-screen overflow-hidden bg-graphite-950 text-white">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* FASE 0 — intro cinematografico (foto reale → 3D) */}
      <div ref={p0} className="absolute inset-0 transition-opacity">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/media/products/dedalus-30-7-main.jpeg)" }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/70 to-graphite-950/40" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f00]/70 via-transparent to-[#1a0f00]/50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-brand">DLF Macchine · Sicilia</span>
          <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[0.95] drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-7xl lg:text-8xl">
            Guarda dentro <span className="text-brand">la macchina</span>
          </h1>
          <p className="mt-6 max-w-md text-white/70">Scorri per esplorarla — ruota, si apre, si racconta.</p>
          <span className="mt-10 animate-bounce text-2xl text-brand">↓</span>
        </div>
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
            {[["Escavatori"], ["Mini escavatori"], ["Telescopici"], ["Minipale"]].map(([t]) => (
              <a key={t} href="/mezzi" className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur transition-colors hover:border-brand">
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
