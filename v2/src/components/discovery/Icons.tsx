import type { CSSProperties } from "react";

export function Icon({ name = "arrow", size = 22, style }: { name?: string; size?: number; style?: CSSProperties }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <><path d="M5 12h14M12 5l7 7-7 7" /></>,
    diagonal: <><path d="M6 18 18 6M6 6h12v12" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
    compare: <><path d="M5 4v16M12 4v16M19 4v16M3 8h4M10 15h4M17 10h4" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    tool: <path d="M14 5a5 5 0 0 0-6 6L3 16a3 3 0 0 0 4 4l5-5a5 5 0 0 0 7-6l-4 3-3-3 2-4Z" />,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></>,
    truck: <><path d="M2 5h12v12H2zM14 9h4l4 5v3h-8" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    file: <><path d="M14 2H5v20h14V7zM14 2v6h5M8 12h8M8 16h6" /></>,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m9 11 6-4M9 13l6 4" /></>,
    phone: <path d="M21 16v4c-9 1-18-8-17-17h4l2 5-3 2c2 3 4 5 7 7l2-3z" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 6 9 7 9-7" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>{paths[name] || paths.arrow}</svg>;
}
