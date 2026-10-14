"use client";

import { useSyncExternalStore } from "react";

const KEY = "dlf-selection-v1";
const EVENT = "dlf-selection-change";
function snapshot() {
  try { return localStorage.getItem(KEY) || "[]"; } catch { return "[]"; }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(EVENT, callback); };
}
function decode(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? [...new Set(parsed.filter((item): item is string => typeof item === "string"))].slice(0, 4) : [];
  } catch { return []; }
}
export function useSelection() {
  const saved = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const selected = decode(saved);
  function save(slugs: string[]) {
    try {
      localStorage.setItem(KEY, JSON.stringify([...new Set(slugs)].slice(0, 4)));
      window.dispatchEvent(new Event(EVENT));
      return true;
    } catch { return false; }
  }
  function toggle(slug: string) {
    const current = decode(snapshot());
    if (current.includes(slug)) return save(current.filter((s) => s !== slug)) ? "removed" : "unavailable";
    if (current.length >= 4) return "full";
    return save([...current, slug]) ? "added" : "unavailable";
  }
  return { selected, toggle, save };
}
