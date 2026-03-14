import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Star, StarHalf } from 'lucide-react'
import { ProductDetailGallery } from '@/components/ui/ProductDetailGallery'
import { ProductPurchasePanel } from '@/components/ui/ProductPurchasePanel'
import { ProductCarousel } from '@/components/ui/ProductCarousel'
import { MOCK_FLASH_DEALS } from '@/lib/types/products'

// ── Resolve product from mock data (swap for Supabase query later) ─────────
function getProduct(id: string) {
    return MOCK_FLASH_DEALS.find((p) => p.id === id) ?? null
}

// ── Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const product = getProduct(id)
    if (!product) return { title: 'Product not found' }
    return {
        title: product.title,
        description: `Buy ${product.title} at the best student price — $${product.price.toFixed(2)}`,
    }
}

// ── Static params for pre-rendering mock products ──────────────────────────
export function generateStaticParams() {
    return MOCK_FLASH_DEALS.map((p) => ({ id: p.id }))
}

// ── Star rating helper ─────────────────────────────────────────────────────
function StarRating({ rating, count }: { rating: number; count: number }) {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    const empty = 5 - full - (half ? 1 : 0)

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center text-[var(--brand-yellow)]" aria-label={`${rating} out of 5 stars`}>
                {Array.from({ length: full }).map((_, i) => (
                    <Star key={`f${i}`} size={16} fill="currentColor" stroke="none" />
                ))}
                {half && <StarHalf size={16} fill="currentColor" stroke="none" />}
                {Array.from({ length: empty }).map((_, i) => (
                    <Star key={`e${i}`} size={16} className="text-zinc-300" fill="currentColor" stroke="none" />
                ))}
            </div>
            <span className="text-sm text-[var(--text-link)] hover:underline cursor-pointer">
                {rating.toFixed(1)} ({count.toLocaleString()} reviews)
            </span>
        </div>
    )
}

// ── Rating breakdown bar ───────────────────────────────────────────────────
function RatingBreakdown({ rating }: { rating: number }) {
    // Generate plausible distribution from the average
    const bars = [
        { label: '5 stars', pct: Math.round(rating * 15) },
        { label: '4 stars', pct: Math.round((5 - rating) * 8 + 20) },
        { label: '3 stars', pct: 8 },
        { label: '2 stars', pct: 4 },
        { label: '1 star', pct: 3 },
    ]

    return (
        <div className="space-y-1.5">
            {bars.map(({ label, pct }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                    <span className="text-[var(--text-link)] hover:underline cursor-pointer whitespace-nowrap w-12 shrink-0 text-xs">{label}</span>
                    <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[var(--brand-yellow)] rounded-full"
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                    <span className="text-xs text-[var(--text-secondary)] w-8 shrink-0">{pct}%</span>
                </div>
            ))}
        </div>
    )
}

// ── Product specs (mock — will come from DB) ───────────────────────────────
const MOCK_SPECS = [
    { label: 'Condition', value: 'Like New' },
    { label: 'Seller', value: 'Verified Student — LAAT Member' },
    { label: 'Category', value: 'Electronics' },
    { label: 'Availability', value: 'In stock' },
    { label: 'Pickup', value: 'Available at Your Campus' },
    { label: 'Return policy', value: '30-day free returns' },
]

// ── PDP Page ───────────────────────────────────────────────────────────────
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = getProduct(id)
    if (!product) notFound()

    // Multiple gallery images (same base, would be different angles in production)
    const galleryImages = [
        product.imageUrl,
        product.imageUrl.replace('w=400', 'w=401'),
        product.imageUrl.replace('w=400', 'w=402'),
    ]

    const relatedProducts = MOCK_FLASH_DEALS.filter((p) => p.id !== product.id)

    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-10">

            {/* ── Breadcrumb ─────────────────────────────────────────── */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-[var(--text-secondary)] flex-wrap">
                <Link href="/" className="hover:text-[var(--brand-blue)] hover:underline">Home</Link>
                <ChevronRight size={12} />
                <Link href="/tech" className="hover:text-[var(--brand-blue)] hover:underline">Tech & Electronics</Link>
                <ChevronRight size={12} />
                <span className="text-[var(--text-primary)] line-clamp-1">{product.title}</span>
            </nav>

            {/* ── Main product grid: Gallery | Details | Purchase panel ── */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] lg:grid-cols-[1fr_1.8fr_1fr] gap-6 lg:gap-8 items-start">

                {/* Gallery */}
                <ProductDetailGallery images={galleryImages} title={product.title} />

                {/* Product info */}
                <div className="space-y-5">
                    {/* Title */}
                    <h1 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] leading-snug">
                        {product.title}
                    </h1>

                    {/* Rating */}
                    <StarRating rating={product.rating} count={product.reviewCount} />

                    {/* Key highlights */}
                    <ul className="space-y-1.5 text-sm text-[var(--text-primary)]">
                        {['Student-verified seller', 'Covered by LAAT Buyer Protection', '30-day free returns', 'Fast campus pickup available'].map((h) => (
                            <li key={h} className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-[var(--price-green)] flex items-center justify-center shrink-0">
                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                                        <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                {h}
                            </li>
                        ))}
                    </ul>

                    {/* Purchase panel on mobile/tablet (inside details column on < lg screens) */}
                    <div className="lg:hidden">
                        <ProductPurchasePanel product={product} />
                    </div>

                    {/* Description */}
                    <div className="pt-2 border-t border-[var(--border-subtle)]">
                        <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">About this item</h2>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            This item is in excellent condition, listed by a verified LAAT Student member. All listings go through
                            our quality check process to ensure authenticity and accurate condition grading. Secure your order
                            today and pick it up on campus or have it delivered to your door.
                        </p>
                    </div>

                    {/* Specs table */}
                    <div className="border border-[var(--border-subtle)] rounded-xl overflow-hidden">
                        <h2 className="text-sm font-bold text-[var(--text-primary)] px-4 py-3 bg-zinc-50 border-b border-[var(--border-subtle)]">
                            Specifications
                        </h2>
                        <table className="w-full text-sm">
                            <tbody>
                                {MOCK_SPECS.map(({ label, value }, i) => (
                                    <tr key={label} className={i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}>
                                        <td className="px-4 py-2.5 font-medium text-[var(--text-secondary)] w-2/5">{label}</td>
                                        <td className="px-4 py-2.5 text-[var(--text-primary)]">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Rating breakdown */}
                    <div className="space-y-4 pt-2">
                        <h2 className="text-base font-bold text-[var(--text-primary)]">
                            Customer reviews ({product.reviewCount.toLocaleString()})
                        </h2>
                        <div className="flex items-center gap-6 flex-wrap">
                            <div className="text-center">
                                <div className="text-5xl font-black text-[var(--text-primary)]">{product.rating.toFixed(1)}</div>
                                <StarRating rating={product.rating} count={product.reviewCount} />
                                <p className="text-xs text-[var(--text-secondary)] mt-1">Based on {product.reviewCount.toLocaleString()} reviews</p>
                            </div>
                            <div className="flex-1 min-w-[200px]">
                                <RatingBreakdown rating={product.rating} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Purchase panel — desktop sidebar only */}
                <div className="hidden lg:block">
                    <ProductPurchasePanel product={product} />
                </div>
            </div>

            {/* ── Similar products ─────────────────────────────────────── */}
            <ProductCarousel
                title="You might also like"
                subtitle="Based on this product"
                viewAllHref="/deals"
                products={relatedProducts}
            />
        </div>
    )
}
