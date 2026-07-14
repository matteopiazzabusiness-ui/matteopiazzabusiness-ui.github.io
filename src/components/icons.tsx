// Icone line industriali (stroke) — coerenti, premium, no emoji.
type P = { className?: string };
const base = "none";

export function IconExcavator({ className = "h-8 w-8" }: P) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill={base} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 38h30" />
      <circle cx="12" cy="38" r="4" /><circle cx="20" cy="38" r="4" /><circle cx="28" cy="38" r="4" />
      <path d="M8 33h24v-6H20l-3-6h-6z" />
      <path d="M20 21l10-9 8 3" />
      <path d="M38 15l3 8-6 3" />
    </svg>
  );
}
export function IconCalendar({ className = "h-8 w-8" }: P) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill={base} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="10" width="32" height="30" rx="3" />
      <path d="M8 18h32M16 6v8M32 6v8" />
      <path d="M15 26h4v4h-4zM22 26h4v4h-4zM29 26h4v4h-4z" />
    </svg>
  );
}
export function IconWrench({ className = "h-8 w-8" }: P) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill={base} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M31 8a9 9 0 0 0-9 11l-13 13a3 3 0 0 0 4 4l13-13a9 9 0 0 0 11-9l-6 6-5-1-1-5z" />
    </svg>
  );
}
export function IconWhatsApp({ className = "h-7 w-7" }: P) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
      <path d="M16 3C9 3 3.5 8.5 3.5 15.5c0 2.4.7 4.7 1.9 6.7L3 29l7-1.8c1.9 1 4 1.6 6 1.6 7 0 12.5-5.5 12.5-12.5S23 3 16 3zm0 22.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4a10.2 10.2 0 0 1-1.6-5.6C5.5 9.6 10.2 5 16 5s10.5 4.6 10.5 10.5S21.8 25.8 16 25.8zm5.8-7.7c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.3-.7.1a8.3 8.3 0 0 1-2.5-1.5 9.3 9.3 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4a3.7 3.7 0 0 0-1.1 2.7c0 1.6 1.1 3.1 1.3 3.3s2.3 3.5 5.5 4.9c2 .8 2.7.9 3.7.8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5s-.3-.2-.6-.3z" />
    </svg>
  );
}
export function IconGear({ className = "h-8 w-8" }: P) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill={base} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="6" />
      <path d="M24 6v6M24 36v6M6 24h6M36 24h6M11 11l4 4M33 33l4 4M37 11l-4 4M15 33l-4 4" />
    </svg>
  );
}
