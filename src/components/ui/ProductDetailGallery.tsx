'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
    images: string[]
    title: string
}

/**
 * Product image gallery — main image + thumbnail strip.
 * Matches Walmart's PDP gallery: large image left, thumbnails below/left,
 * arrow controls, and a zoom-on-hover feel.
 */
export function ProductDetailGallery({ images, title }: Props) {
    const [active, setActive] = useState(0)

    const prev = () => setActive((i) => (i === 0 ? images.length - 1 : i - 1))
    const next = () => setActive((i) => (i === images.length - 1 ? 0 : i + 1))

    return (
        <div className="flex flex-col gap-3 lg:sticky lg:top-[88px] self-start">
            {/* Main image */}
            <div className="relative bg-white border border-[var(--border-subtle)] rounded-xl overflow-hidden aspect-square w-full group">
                <Image
                    src={images[active]}
                    alt={`${title} — image ${active + 1}`}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />

                {/* Arrow controls — only show when multiple images */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            aria-label="Previous image"
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-[var(--border-subtle)] rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-50"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={next}
                            aria-label="Next image"
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-[var(--border-subtle)] rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-50"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            aria-label={`View image ${i + 1}`}
                            className={`shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden bg-white transition-all duration-150 ${active === i
                                    ? 'border-[var(--brand-blue)] shadow-sm'
                                    : 'border-[var(--border-subtle)] hover:border-zinc-300'
                                }`}
                        >
                            <Image
                                src={src}
                                alt={`Thumbnail ${i + 1}`}
                                width={64}
                                height={64}
                                className="object-contain w-full h-full p-1"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
