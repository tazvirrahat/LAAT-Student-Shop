'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from './ProductCard'
import type { Product } from '@/lib/types/products'

interface ProductCarouselProps {
    title: string
    subtitle?: string
    viewAllHref?: string
    products: Product[]
}

export function ProductCarousel({ title, subtitle, viewAllHref, products }: ProductCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (dir: 1 | -1) => {
        if (!scrollRef.current) return
        const card = scrollRef.current.querySelector('article')
        const cardWidth = card ? card.offsetWidth + 16 : 280 // 16 = gap
        scrollRef.current.scrollBy({ left: dir * cardWidth * 2, behavior: 'smooth' })
    }

    return (
        <section aria-labelledby={`carousel-${title}`} className="w-full">
            {/* Section header */}
            <div className="flex items-baseline justify-between mb-4 px-4 md:px-0">
                <div>
                    <h2 id={`carousel-${title}`} className="text-xl font-black text-[var(--text-primary)]">{title}</h2>
                    {subtitle && <p className="text-sm text-[var(--text-secondary)] mt-0.5">{subtitle}</p>}
                </div>
                {viewAllHref && (
                    <Link href={viewAllHref} className="text-sm text-[var(--text-link)] hover:underline whitespace-nowrap ml-4">
                        View all
                    </Link>
                )}
            </div>

            {/* Carousel with prev/next arrows */}
            <div className="relative group">
                {/* Prev */}
                <button
                    onClick={() => scroll(-1)}
                    aria-label="Scroll left"
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-opacity hover:shadow-lg"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Cards */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 px-4 md:px-0 scroll-smooth"
                >
                    {products.map(product => (
                        <div key={product.id} className="shrink-0 w-[200px] sm:w-[220px] lg:w-[240px]">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Next */}
                <button
                    onClick={() => scroll(1)}
                    aria-label="Scroll right"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-opacity hover:shadow-lg"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </section>
    )
}
