import Image from "next/image";

// Placeholder brandizzato per mezzi senza foto reale (audit: molti prodotti
// usano woocommerce-placeholder). Evita l'immagine grigia generica WooCommerce.
export function ProductImage({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center bg-graphite-900 text-white/70 ${className}`}
      role="img"
      aria-label={`${alt} — foto in arrivo`}
    >
      <span className="font-display text-2xl font-bold text-brand">DLF</span>
      <span className="mt-1 text-[11px] uppercase tracking-widest text-white/40">Foto in arrivo</span>
    </div>
  );
}
