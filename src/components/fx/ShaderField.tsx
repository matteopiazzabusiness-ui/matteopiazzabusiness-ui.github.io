"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Sfondo WebGL: terreno liquido metallico con creste luminose brand.
// Domain-warped fbm, reagisce a mouse (ripple) e scroll. Nessun asset.
const frag = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v=0., a=0.5;
  for(int i=0;i<6;i++){ v+=a*noise(p); p*=2.02; a*=0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy/uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5*uRes.xy)/uRes.y;
  float t = uTime*0.06;

  // domain warp
  vec2 q = vec2(fbm(p*1.5 + t), fbm(p*1.5 - t + 5.0));
  vec2 r = vec2(fbm(p*1.5 + q*1.8 + vec2(1.7,9.2) + uScroll*0.5),
                fbm(p*1.5 + q*1.8 + vec2(8.3,2.8) - uScroll*0.4));
  float f = fbm(p*1.8 + r*2.0);

  // ripple dal mouse
  float md = distance(uv, uMouse);
  f += 0.15*sin(md*24.0 - uTime*2.0)*exp(-md*4.0);

  // creste
  float ridge = smoothstep(0.55,0.75,f) - smoothstep(0.75,0.95,f);

  vec3 base = mix(vec3(0.035,0.05,0.07), vec3(0.08,0.11,0.15), f);
  vec3 brand = vec3(0.96,0.70,0.0);
  vec3 col = base + brand*ridge*1.2;
  col += brand*0.10*pow(1.0-abs(f-0.7),3.0);
  // vignetta
  col *= 1.0 - 0.5*dot(p,p);
  gl_FragColor = vec4(col,1.0);
}
`;

const vert = `void main(){ gl_Position = vec4(position,1.0); }`;

export function ShaderField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL → resta il fallback CSS sotto
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const uniforms = {
      uRes: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
    };
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms }),
    );
    scene.add(mesh);

    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      uniforms.uMouse.value.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
    };
    const onScroll = () => {
      const r = canvas.getBoundingClientRect();
      uniforms.uScroll.value = -r.top / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0, running = true;
    const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) loop(); }, { threshold: 0 });
    io.observe(canvas);
    const clock = new THREE.Clock();
    const loop = () => {
      if (!running) return;
      uniforms.uTime.value += clock.getDelta();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      running = false; cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
