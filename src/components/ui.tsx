import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Section({
  className = "",
  children,
  as: Tag = "section",
}: {
  className?: string;
  children: ReactNode;
  as?: "section" | "div";
}) {
  return <Tag className={`py-14 sm:py-20 ${className}`}>{children}</Tag>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
      <span className="h-px w-6 bg-brand" aria-hidden />
      {children}
    </span>
  );
}

type BtnProps = {
  variant?: "primary" | "outline" | "ghost" | "dark";
  size?: "md" | "lg";
  children: ReactNode;
};

const btnBase =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-colors duration-200 min-h-[44px] focus-visible:outline-none";
const btnSizes = { md: "px-4 text-sm", lg: "px-6 text-base min-h-[52px]" };
const btnVariants = {
  primary: "bg-brand text-brand-ink hover:bg-brand-600",
  outline: "border-2 border-graphite-800 text-ink hover:bg-graphite-800 hover:text-white",
  ghost: "text-ink hover:bg-surface-3",
  dark: "bg-graphite-900 text-white hover:bg-graphite-800",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: BtnProps & ComponentProps<"button"> & { className?: string }) {
  return (
    <button className={`${btnBase} ${btnSizes[size]} ${btnVariants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  ...rest
}: BtnProps & ComponentProps<typeof Link> & { className?: string; href: string }) {
  return (
    <Link href={href} className={`${btnBase} ${btnSizes[size]} ${btnVariants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "warn" | "brand" }) {
  const tones = {
    neutral: "bg-surface-3 text-slate-strong",
    warn: "bg-brand-50 text-warning border border-brand-300",
    brand: "bg-brand text-brand-ink",
  };
  return (
    <span className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
