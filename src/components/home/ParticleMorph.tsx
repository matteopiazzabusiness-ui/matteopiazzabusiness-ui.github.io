"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ScrollTrigger } from "@/lib/useScrollGsap";

/**
 * Nuvola di particelle che muta forma con lo scroll (sfera → vortice → onda-terreno)
 * con bloom e transizione colore giallo brand → blueprint blue. Ispirato ai reference
 * particle-morph (wearebrand). Overlay testi per fase = "nuove categorie".
 */
const N = 4200;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export function ParticleMorph() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const t0 = useRef<HTMLDivElement>(null);
  const t1 = useRef<HTMLDivElement>(null);
  const t2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current, section = wrap.current;
    if (!canvas || !section) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    // ---- 3 forme target ----
    const shapeSphere = new Float32Array(N * 3);
    const shapeVortex = new Float32Array(N * 3);
    const shapeWave = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      // sfera (fibonacci)
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * 2.399963;
      shapeSphere[i3] = Math.cos(phi) * r * 3.2;
      shapeSphere[i3 + 1] = y * 3.2;
      shapeSphere[i3 + 2] = Math.sin(phi) * r * 3.2;
      // vortice / galassia
      const a = i * 0.03;
      const rad = Math.pow(i / N, 0.6) * 5.2;
      shapeVortex[i3] = Math.cos(a) * rad;
      shapeVortex[i3 + 1] = (Math.random() - 0.5) * 1.2 + Math.sin(a * 0.5) * 0.6;
      shapeVortex[i3 + 2] = Math.sin(a) * rad;
      // onda / terreno
      const gx = (i % 100) / 100 - 0.5;
      const gz = Math.floor(i / 100) / 70 - 0.5;
      shapeWave[i3] = gx * 11;
      shapeWave[i3 + 1] = Math.sin(gx * 10) * Math.cos(gz * 10) * 1.1 - 1;
      shapeWave[i3 + 2] = gz * 8;
    }

    const positions = new Float32Array(shapeSphere);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const colYellow = new THREE.Color(0xf5b301);
    const colBlue = new THREE.Color(0x5b9bd5);
    const colors = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const c = colYellow.clone().lerp(colBlue, i / N);
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.05, vertexColors: true, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.1, 0.6, 0.0);
    composer.addPass(bloom);

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
    const st = ScrollTrigger.create({
      trigger: section, start: "top top", end: "+=300%", pin: true, scrub: 0.8,
      onUpdate: (s) => { prog.v = s.progress; },
    });

    const setO = (el: HTMLElement | null, o: number) => { if (el) el.style.opacity = String(clamp01(o)); };
    const pos = geo.attributes.position.array as Float32Array;

    let raf = 0, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); }, { threshold: 0 });
    io.observe(section);

    const loop = () => {
      if (!visible) return;
      const p = prog.v;
      // due segmenti: sfera→vortice→onda
      let from: Float32Array, to: Float32Array, seg: number;
      if (p < 0.5) { from = shapeSphere; to = shapeVortex; seg = smooth(p / 0.5); }
      else { from = shapeVortex; to = shapeWave; seg = smooth((p - 0.5) / 0.5); }
      for (let i = 0; i < N * 3; i++) pos[i] = lerp(from[i], to[i], seg);
      geo.attributes.position.needsUpdate = true;

      points.rotation.y += 0.0015;
      points.rotation.y += mouse.x * 0.0006;
      camera.position.x = mouse.x * 1.5;
      camera.position.y = -mouse.y * 1.0;
      camera.lookAt(0, 0, 0);

      // colore sfondo transizione
      const hue = new THREE.Color(0x0b0e11).lerp(new THREE.Color(0x0a1f33), p);
      renderer.setClearColor(hue, 1);

      setO(t0.current, 1 - smooth(clamp01(p / 0.33)) * 1.3);
      setO(t1.current, p > 0.3 && p < 0.72 ? clamp01((p - 0.3) / 0.15) - clamp01((p - 0.62) / 0.1) : 0);
      setO(t2.current, clamp01((p - 0.72) / 0.15));

      composer.render();
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); st.kill();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      geo.dispose(); mat.dispose(); renderer.dispose();
    };
  }, []);

  return (
    <section ref={wrap} className="relative h-screen overflow-hidden bg-graphite-950 text-white">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div ref={t0} className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity">
        <span className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-brand">Una rete che lavora per te</span>
        <h2 className="max-w-3xl font-display text-5xl font-extrabold sm:text-7xl">Migliaia di parti,<br />un solo sistema</h2>
      </div>
      <div ref={t1} className="pointer-events-none absolute inset-0 flex items-center opacity-0 transition-opacity">
        <div className="mx-auto w-full max-w-6xl px-6">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand">Energia in movimento</span>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold sm:text-6xl">Dalla richiesta al cantiere, senza attriti</h2>
        </div>
      </div>
      <div ref={t2} className="pointer-events-none absolute inset-0 flex items-end pb-24 opacity-0 transition-opacity">
        <div className="mx-auto w-full max-w-6xl px-6">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-blueprint-400">Radicati in Sicilia</span>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold sm:text-6xl">Il terreno è il nostro mestiere</h2>
        </div>
      </div>
    </section>
  );
}
