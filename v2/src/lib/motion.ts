"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Divide un testo in <span> per carattere — alternativa gratuita a SplitText. */
export function splitChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text);
  el.textContent = "";
  const spans: HTMLSpanElement[] = [];
  for (const word of text.split(" ")) {
    const w = document.createElement("span");
    w.style.display = "inline-block";
    w.style.whiteSpace = "nowrap";
    w.setAttribute("aria-hidden", "true");
    for (const ch of word) {
      const s = document.createElement("span");
      s.style.display = "inline-block";
      s.textContent = ch;
      w.appendChild(s);
      spans.push(s);
    }
    el.appendChild(w);
    el.appendChild(document.createTextNode(" "));
  }
  return spans;
}
