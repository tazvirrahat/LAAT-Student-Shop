'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HeroBanner } from '@/lib/types/products'

const SLIDE_INTERVAL = 5000

interface HeroBannerCarouselProps {
    banners: HeroBanner[]
}

export function HeroBannerCarousel({ banners }: HeroBannerCarouselProps) {
    const [current, setCurrent] = useState(0)
    const [paused, setPaused] = useState(false)
    const [direction, setDirection] = useState<1 | -1>(1)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const go = useCallback((idx: number, dir: 1 | -1 = 1) => {
        setDirection(dir)
        setCurrent((idx + banners.length) % banners.length)
    }, [banners.length])

    const next = useCallback(() => go(current + 1, 1), [current, go])
    const prev = useCallback(() => go(current - 1, -1), [current, go])

    useEffect(() => {
        if (paused) return
        timerRef.current = setInterval(next, SLIDE_INTERVAL)
        return () => { if (timerRef.current) clearInterval(timerRef.current) }
    }, [paused, next])

    const banner = banners[current]

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
    }

    return (
        <section
            role="region"
            aria-label="Promotional banners"
            aria-roledescription="carousel"
            className="group relative w-full overflow-hidden rounded-none"
            style={{ backgroundColor: banner.bgColor }}
        >
            <div className="relative w-full" style={{ height: 'clamp(220px, 30vw, 380px)' }}>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={banner.id}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
                        className="absolute inset-0 flex items-center"
                        style={{ backgroundColor: banner.bgColor }}
                    >
                        <div className="max-w-[1536px] mx-auto w-full px-8 md:px-16 flex items-center justify-between h-full">
                            {/* Text side */}
                            <div className="flex-1 pr-8">
                                {banner.subheadline && (
                                    <p className="text-sm text-[var(--text-secondary)] mb-1">{banner.subheadline}</p>
                                )}
                                <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] leading-tight mb-4 max-w-md">
                                    {banner.headline}
                                </h2>
                                <Link
                                    href={banner.ctaHref}
                                    className="inline-flex items-center border border-[var(--text-primary)] text-[var(--text-primary)] text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[var(--text-primary)] hover:text-white transition-colors"
                                >
                                    {banner.ctaLabel}
                                </Link>
                            </div>
                            {/* Image side */}
                            <div className="flex-1 relative h-full hidden sm:block">
                                <Image
                                    src={banner.imageUrl}
                                    alt={banner.headline}
                                    fill
                                    className="object-contain object-right"
                                    priority={current === 0 || banners.indexOf(banner) === 0}
                                    sizes="50vw"
                                />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Prev / Next arrows — visible on hover via `group` on the parent <section> */}
                <div className="absolute inset-y-0 left-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <button
                        onClick={prev}
                        aria-label="Previous banner"
                        className="w-9 h-9 rounded-full bg-white/90 shadow hover:shadow-md flex items-center justify-center text-[var(--text-primary)] transition"
                    >
                        <ChevronLeft size={20} />
                    </button>
                </div>
                <div className="absolute inset-y-0 right-12 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <button
                        onClick={next}
                        aria-label="Next banner"
                        className="w-9 h-9 rounded-full bg-white/90 shadow hover:shadow-md flex items-center justify-center text-[var(--text-primary)] transition"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Controls: dots + pause button */}
            <div className="absolute bottom-3 right-4 flex items-center gap-3 z-10">
                <div className="flex gap-1.5">
                    {banners.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => go(i, i > current ? 1 : -1)}
                            aria-label={`Go to slide ${i + 1}`}
                            aria-current={i === current}
                            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-[var(--text-primary)] w-5' : 'bg-[var(--text-secondary)]/40'}`}
                        />
                    ))}
                </div>
                <button
                    onClick={() => setPaused(p => !p)}
                    aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
                    className="w-7 h-7 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center text-[var(--text-primary)] transition"
                >
                    {paused ? <Play size={12} /> : <Pause size={12} />}
                </button>
            </div>

        </section>
    )
}
