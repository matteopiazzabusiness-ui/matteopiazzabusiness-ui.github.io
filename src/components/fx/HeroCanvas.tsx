"use client";

import { useEffect, useRef } from "react";

/**
 * Campo di punti topografico animato — "terreno" industriale vivo.
 * Onde sinusoidali continue + repulsione dal mouse + deriva su scroll.
 * Performance: DPR limitato, spegnimento fuori viewport, off su reduced-motion.
 */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const GAP = window.innerWidth < 768 ? 34 : 26;
    let w = 0, h = 0, cols = 0, rows = 0;
    const mouse = { x: -9999, y: -9999 };
    let scrollY = window.scrollY;
    let running = true;

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * DPR; canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cols = Math.ceil(w / GAP) + 1;
      rows = Math.ceil(h / GAP) + 1;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) loop(); }, { threshold: 0 });
    io.observe(canvas);

    let t = 0;
    const loop = () => {
      if (!running) return;
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      const drift = scrollY * 0.15;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const bx = i * GAP;
          const by = j * GAP;
          // onda continua tipo terreno
          const wave = Math.sin(bx * 0.02 + t) + Math.cos((by + drift) * 0.025 + t * 0.8);
          let px = bx;
          let py = by + wave * 6;

          // repulsione dal mouse
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 14000) {
            const f = (14000 - dist2) / 14000;
            const d = Math.sqrt(dist2) || 1;
            px += (dx / d) * f * 22;
            py += (dy / d) * f * 22;
          }

          const a = 0.12 + (wave + 2) * 0.12;
          const r = 0.9 + (wave + 2) * 0.5;
          // punto vicino al mouse = giallo brand, altrimenti blueprint tenue
          const near = dist2 < 14000;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = near
            ? `rgba(245,179,1,${Math.min(0.9, a + 0.4)})`
            : `rgba(120,160,205,${a})`;
          ctx.fill();
        }
      }
      requestAnimationFrame(loop);
    };
    loop();

    return () => {
      running = false;
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
