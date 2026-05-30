'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import type { Image as ProductImage } from '@/lib/shopify/types';
import { ZoomIcon, CloseIcon } from '@/components/icons';

export function Gallery({ images, title }: { images: ProductImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const frameRef = useRef<HTMLDivElement>(null);

  const current = images[active] ?? images[0];

  function onMove(e: React.MouseEvent) {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  if (!current) return null;

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse lg:gap-4">
      {/* Main image */}
      <div
        ref={frameRef}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        onClick={() => setLightbox(true)}
        className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-card bg-sand-50 lg:flex-1"
      >
        <Image
          src={current.url}
          alt={current.altText}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={clsx(
            'object-cover transition-transform duration-200',
            zoom ? 'scale-[1.7]' : 'scale-100',
          )}
          style={{ transformOrigin: origin }}
        />
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink shadow-sm">
          <ZoomIcon className="h-3.5 w-3.5" /> Zoom
        </span>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar lg:flex-col lg:overflow-visible lg:pb-0">
          {images.map((img, i) => (
            <button
              key={`${img.url}-${i}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={clsx(
                'relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-sand-50 transition-colors lg:h-20 lg:w-20',
                i === active ? 'border-fairway-600' : 'border-transparent hover:border-ink/20',
              )}
            >
              <Image
                src={img.url}
                alt={img.altText}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
          <div className="relative h-[80vh] w-full max-w-3xl">
            <Image
              src={current.url}
              alt={current.altText}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
