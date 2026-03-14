import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import type { Product } from '@/lib/types/products'
import { AddToCartButton } from './AddToCartButton'

// ── Star Rating ────────────────────────────────────────────────────────────
function StarRating({ id, rating, count }: { id: string; rating: number; count: number }) {
    const full = Math.floor(rating)
    const partial = rating - full
    return (
        <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5, ${count} reviews`}>
            <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                        <defs>
                            <linearGradient id={`star-${id}-${i}-${rating}`}>
                                <stop offset={i < full ? '100%' : i === full ? `${partial * 100}%` : '0%'} stopColor="#ffc220" />
                                <stop offset={i < full ? '100%' : i === full ? `${partial * 100}%` : '0%'} stopColor="#e3e4e6" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M6 1l1.4 2.8 3.1.45-2.25 2.19.53 3.1L6 8.1l-2.78 1.46.53-3.1L1.5 4.25l3.1-.45z"
                            fill={i < full ? '#ffc220' : i === full && partial > 0 ? `url(#star-${id}-${i}-${rating})` : '#e3e4e6'}
                        />
                    </svg>
                ))}
            </div>
            <span className="text-[11px] text-[var(--text-secondary)]">({count.toLocaleString()})</span>
        </div>
    )
}

// ── Price Display ——————————————————————————————————————————————————————————
function PriceDisplay({ price, originalPrice }: { price: number; originalPrice?: number }) {
    const dollars = Math.floor(price)
    const cents = Math.round((price - dollars) * 100).toString().padStart(2, '0')
    const savings = originalPrice ? originalPrice - price : null

    return (
        <div className="flex flex-col gap-0.5">
            <div className="flex items-start leading-none">
                {originalPrice && <span className="price-now text-xs mr-1 mt-0.5">Now</span>}
                <span className="text-[var(--price-green)] text-[11px] font-bold align-super">$</span>
                <span className="text-[var(--price-green)] text-2xl font-bold leading-none">{dollars}</span>
                <span className="text-[var(--price-green)] text-[11px] font-bold align-super">.{cents}</span>
            </div>
            {originalPrice && (
                <div className="flex items-center gap-2">
                    <span className="price-was">${originalPrice.toFixed(2)}</span>
                    {savings && savings > 0 && (
                        <span className="text-[11px] text-[var(--price-green)] font-semibold">
                            Save ${savings.toFixed(2)}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

// ── Badge ─────────────────────────────────────────────────────────────────
const BADGE_STYLES: Record<string, string> = {
    Clearance: 'bg-[var(--brand-yellow)] text-[var(--brand-blue-dark)]',
    Rollback: 'bg-[var(--brand-blue)] text-white',
    'Best Seller': 'bg-orange-500 text-white',
    New: 'bg-green-600 text-white',
}

// ── Product Card ──────────────────────────────────────────────────────────
export function ProductCard({ product }: { product: Product }) {
    const { id, title, price, originalPrice, imageUrl, rating, reviewCount, badge, fulfillment, hasOptions } = product

    return (
        <article className="group relative flex flex-col bg-white border border-[var(--border-subtle)] rounded-[var(--radius-card)] overflow-hidden hover:shadow-md transition-shadow duration-200">

            {/* Badge */}
            {badge && (
                <div className={`absolute top-2 left-2 z-10 text-[11px] font-bold px-2 py-0.5 rounded-sm ${BADGE_STYLES[badge]}`}>
                    {badge}
                </div>
            )}

            {/* Wishlist heart */}
            <button
                aria-label={`Add ${title} to wishlist`}
                className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors"
            >
                <Heart size={16} className="text-[var(--text-secondary)] hover:text-red-500 hover:fill-red-500 transition-colors" />
            </button>

            {/* Product Image */}
            <Link href={`/product/${id}`} className="block aspect-square bg-white p-3 relative overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
            </Link>

            {/* Card Body */}
            <div className="flex flex-col gap-2 p-3 flex-1">

                {/* CTA / Options button */}
                <AddToCartButton product={product} />

                {/* Price */}
                <PriceDisplay price={price} originalPrice={originalPrice} />

                {/* Title */}
                <Link href={`/product/${id}`} className="block">
                    <p className="line-clamp-2 text-[13px] text-[var(--text-primary)] hover:text-[var(--text-link)] leading-snug transition-colors">
                        {title}
                    </p>
                </Link>

                {/* Rating */}
                <StarRating id={id} rating={rating} count={reviewCount} />

                {/* Fulfillment */}
                {fulfillment && (
                    <p className="text-[11px] text-[var(--text-secondary)]">
                        <span className="font-semibold text-[var(--price-green)]">{fulfillment}</span>
                    </p>
                )}
            </div>
        </article>
    )
}
