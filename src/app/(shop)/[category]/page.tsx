import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '@/components/ui/ProductCard'
import { MOCK_FLASH_DEALS } from '@/lib/types/products'

// Category metadata map — swap for DB lookup in production
const CATEGORY_META: Record<string, { title: string; description: string; banner?: string }> = {
    textbooks: {
        title: 'Textbooks',
        description: 'Buy and sell used textbooks directly with verified students.',
        banner: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=200&fit=crop',
    },
    tech: {
        title: 'Tech & Electronics',
        description: 'Laptops, earbuds, tablets — top condition at student prices.',
        banner: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=200&fit=crop',
    },
    dorm: {
        title: 'Dorm Essentials',
        description: 'Everything you need for move-in day and beyond.',
        banner: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=200&fit=crop',
    },
    fashion: { title: 'Fashion', description: 'Campus style at student prices.' },
    food: { title: 'Food & Groceries', description: 'Snacks and essentials for busy students.' },
    sports: { title: 'Sports & Fitness', description: 'Gear up for campus life.' },
    deals: { title: 'Rollbacks & More', description: 'The best deals — refreshed daily.' },
    new: { title: 'New Arrivals', description: 'Just listed by students this week.' },
}

const SORT_OPTIONS = ['Best match', 'Price: Low to High', 'Price: High to Low', 'Avg. customer review', 'New arrivals']
const FILTER_BADGES = ['Rollback', 'Clearance', 'Best Seller', 'New']
const PRICE_RANGES = ['Under $25', '$25 – $50', '$50 – $100', '$100 – $200', 'Over $200']

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category } = await params
    const meta = CATEGORY_META[category]
    if (!meta) return { title: 'Category not found' }
    return {
        title: meta.title,
        description: meta.description,
    }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params
    const meta = CATEGORY_META[category] ?? { title: category.charAt(0).toUpperCase() + category.slice(1), description: '' }
    const products = MOCK_FLASH_DEALS // Will be filtered by category from Supabase

    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-6">

            {/* ── Breadcrumb ─────────────────────────────────────────── */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-[var(--text-secondary)] mb-4">
                <Link href="/" className="hover:text-[var(--brand-blue)] hover:underline">Home</Link>
                <ChevronRight size={12} />
                <span className="text-[var(--text-primary)]">{meta.title}</span>
            </nav>

            {/* ── Category banner ───────────────────────────────────── */}
            {meta.banner && (
                <div
                    className="w-full h-32 rounded-xl overflow-hidden bg-cover bg-center mb-6 relative"
                    style={{ backgroundImage: `url(${meta.banner})` }}
                    role="img"
                    aria-label={meta.title}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-8">
                        <h1 className="text-2xl font-black text-white">{meta.title}</h1>
                    </div>
                </div>
            )}

            {!meta.banner && (
                <h1 className="text-2xl font-black text-[var(--text-primary)] mb-4">{meta.title}</h1>
            )}

            <div className="flex gap-6 items-start">

                {/* ── Filter sidebar ──────────────────────────────────── */}
                <aside className="hidden lg:block w-56 shrink-0 space-y-6">
                    <div>
                        <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                            <SlidersHorizontal size={14} /> Filter
                        </h2>

                        {/* Badge filter */}
                        <div className="mb-5">
                            <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-2">Deal type</h3>
                            <div className="space-y-2">
                                {FILTER_BADGES.map((b) => (
                                    <label key={b} className="flex items-center gap-2 text-sm cursor-pointer group">
                                        <input type="checkbox" className="accent-[var(--brand-blue)] rounded" />
                                        <span className="text-[var(--text-primary)] group-hover:text-[var(--brand-blue)] transition-colors">{b}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price filter */}
                        <div className="mb-5">
                            <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-2">Price</h3>
                            <div className="space-y-2">
                                {PRICE_RANGES.map((r) => (
                                    <label key={r} className="flex items-center gap-2 text-sm cursor-pointer group">
                                        <input type="radio" name="price" className="accent-[var(--brand-blue)]" />
                                        <span className="text-[var(--text-primary)] group-hover:text-[var(--brand-blue)] transition-colors">{r}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Rating filter */}
                        <div>
                            <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-2">Rating</h3>
                            <div className="space-y-2">
                                {[4, 3, 2].map((r) => (
                                    <label key={r} className="flex items-center gap-2 text-sm cursor-pointer group">
                                        <input type="radio" name="rating" className="accent-[var(--brand-blue)]" />
                                        <span className="text-[var(--text-primary)]">{'★'.repeat(r)}{'☆'.repeat(5 - r)} &amp; up</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* ── Product grid ────────────────────────────────────── */}
                <div className="flex-1 min-w-0">

                    {/* Toolbar: results count + sort */}
                    <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
                        <p className="text-sm text-[var(--text-secondary)]">
                            <span className="font-semibold text-[var(--text-primary)]">{products.length}</span> results in {meta.title}
                        </p>
                        <div className="flex items-center gap-2">
                            {/* Mobile filter toggle */}
                            <button className="lg:hidden flex items-center gap-1.5 text-sm font-semibold border border-[var(--border-input)] rounded-full px-3 py-1.5 hover:bg-zinc-50 transition-colors">
                                <SlidersHorizontal size={14} /> Filters
                            </button>
                            {/* Sort dropdown */}
                            <div className="relative">
                                <select
                                    aria-label="Sort results"
                                    className="appearance-none text-sm font-semibold border border-[var(--border-input)] rounded-full pl-3 pr-8 py-1.5 bg-white hover:bg-zinc-50 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-[var(--brand-blue)]/20"
                                >
                                    {SORT_OPTIONS.map((o) => (
                                        <option key={o}>{o}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-secondary)]" />
                            </div>
                        </div>
                    </div>

                    {/* Product card grid — responsive: 2 cols mobile → 3 tablet → 4 desktop */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-1 mt-10">
                        {[1, 2, 3, 4, 5].map((p) => (
                            <button
                                key={p}
                                className={`w-9 h-9 rounded-full text-sm font-semibold transition-colors ${p === 1
                                        ? 'bg-[var(--brand-blue)] text-white'
                                        : 'hover:bg-zinc-100 text-[var(--text-primary)]'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button className="w-9 h-9 rounded-full text-sm hover:bg-zinc-100 text-[var(--text-secondary)] flex items-center justify-center">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
