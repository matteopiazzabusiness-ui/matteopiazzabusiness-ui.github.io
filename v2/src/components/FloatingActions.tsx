"use client";

import { useEffect, useState } from "react";
import { company } from "@/lib/site";

/**
 * Azioni rapide fluttuanti — appaiono dopo lo scroll, priorità mobile.
 * WhatsApp + chiamata alla sede principale, sempre a portata di pollice.
 */
export function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 flex flex-col gap-3 transition-all duration-500 sm:bottom-6 sm:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <a
        href="tel:+390934575176"
        aria-label="Chiama DLF Macchine"
        data-magnetic
        className="flex h-14 w-14 items-center justify-center rounded-full bg-carbon text-paper shadow-lg transition-colors hover:bg-ink"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
      <a
        href={`https://wa.me/${company.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Scrivici su WhatsApp"
        data-magnetic
        className="flex h-14 w-14 items-center justify-center rounded-full bg-giallo text-ink shadow-lg transition-transform hover:scale-105"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.71 10.35c-.26-.13-1.52-.75-1.76-.84-.24-.09-.41-.13-.58.13-.17.26-.67.84-.82 1.01-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.07-1.28-.77-.68-1.28-1.53-1.43-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.92-.21-.5-.42-.43-.58-.44l-.5-.01c-.17 0-.45.06-.68.32-.24.26-.9.88-.9 2.15 0 1.27.92 2.49 1.05 2.66.13.17 1.82 2.78 4.41 3.9.62.27 1.1.43 1.47.55.62.2 1.18.17 1.63.1.5-.07 1.52-.62 1.74-1.22.21-.6.21-1.11.15-1.22-.06-.11-.24-.17-.5-.3z" />
        </svg>
      </a>
    </div>
  );
}
