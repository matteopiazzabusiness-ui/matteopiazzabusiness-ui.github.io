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
export function IconGear({ className = "h-8 w-8" }: P) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill={base} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="6" />
      <path d="M24 6v6M24 36v6M6 24h6M36 24h6M11 11l4 4M33 33l4 4M37 11l-4 4M15 33l-4 4" />
    </svg>
  );
}
