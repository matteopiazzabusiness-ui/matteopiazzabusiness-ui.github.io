"use client";

import { useEffect, useState } from "react";
import { ProductImage } from "./ProductImage";
import { track } from "@/lib/analytics";

export function ProductGallery({ images, alt, slug }: { images: string[]; alt: string; slug: string }) {
  const [active, setActive] = useState(0);
  useEffect(() => { track("product_view", { slug }); }, [slug]);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface-3">
        <ProductImage src={images[active]} alt={alt} sizes="(max-width: 1024px) 100vw, 50vw" priority />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              aria-label={`Immagine ${i + 1}`}
              aria-pressed={i === active}
              className={`relative h-16 w-20 overflow-hidden rounded-md border-2 ${i === active ? "border-brand" : "border-line"}`}
            >
              <ProductImage src={img} alt={`${alt} ${i + 1}`} sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
