import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ChevronDown, SlidersHorizontal, Search } from 'lucide-react'
import { ProductCard } from '@/components/ui/ProductCard'
import { MOCK_FLASH_DEALS } from '@/lib/types/products'

export const metadata: Metadata = {
    title: 'Search Results',
}

const SORT_OPTIONS = ['Best match', 'Price: Low to High', 'Price: High to Low', 'Avg. customer review']

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>
}) {
    const { q } = await searchParams
    const query = q?.trim() ?? ''

    // Filter mock products by query (simple title match — swap for Supabase full-text search)
    const results = query
        ? MOCK_FLASH_DEALS.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
        : MOCK_FLASH_DEALS

    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-6">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-[var(--text-secondary)] mb-4">
                <Link href="/" className="hover:text-[var(--brand-blue)] hover:underline">Home</Link>
                <ChevronRight size={12} />
                <span className="text-[var(--text-primary)]">Search results</span>
            </nav>

            {/* Search heading */}
            <div className="mb-6">
                {query ? (
                    <h1 className="text-xl font-black text-[var(--text-primary)]">
                        Results for <span className="text-[var(--brand-blue)]">&ldquo;{query}&rdquo;</span>
                    </h1>
                ) : (
                    <h1 className="text-xl font-black text-[var(--text-primary)]">All products</h1>
                )}
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {results.length} results{query ? ` for "${query}"` : ''}
                </p>
            </div>

            {/* No results */}
            {results.length === 0 && (
                <div className="py-20 flex flex-col items-center text-center gap-4">
                    <Search size={48} className="text-zinc-300" />
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">No results for &ldquo;{query}&rdquo;</h2>
                    <p className="text-sm text-[var(--text-secondary)] max-w-sm">
                        Try different keywords, or browse our departments.
                    </p>
                    <Link href="/" className="text-sm font-semibold text-[var(--brand-blue)] hover:underline">
                        Back to home
                    </Link>
                </div>
            )}

            {/* Results */}
            {results.length > 0 && (
                <div className="flex gap-6 items-start">

                    {/* Filter sidebar */}
                    <aside className="hidden lg:block w-52 shrink-0 space-y-5">
                        <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                            <SlidersHorizontal size={14} /> Filter
                        </h2>
                        {[
                            { label: 'Deal type', opts: ['Rollback', 'Clearance', 'Best Seller', 'New'], type: 'checkbox' },
                            { label: 'Price', opts: ['Under $25', '$25–$50', '$50–$100', 'Over $100'], type: 'radio' },
                        ].map(({ label, opts, type }) => (
                            <div key={label}>
                                <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-2">{label}</h3>
                                <div className="space-y-1.5">
                                    {opts.map((o) => (
                                        <label key={o} className="flex items-center gap-2 text-sm cursor-pointer group">
                                            <input type={type} name={label} className="accent-[var(--brand-blue)]" />
                                            <span className="text-[var(--text-primary)] group-hover:text-[var(--brand-blue)] transition-colors">{o}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </aside>

                    {/* Grid */}
                    <div className="flex-1 min-w-0">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                            <button className="lg:hidden flex items-center gap-1.5 text-sm font-semibold border border-[var(--border-input)] rounded-full px-3 py-1.5 hover:bg-zinc-50">
                                <SlidersHorizontal size={13} /> Filters
                            </button>
                            <div className="relative ml-auto">
                                <select
                                    aria-label="Sort results"
                                    className="appearance-none text-sm font-semibold border border-[var(--border-input)] rounded-full pl-3 pr-8 py-1.5 bg-white hover:bg-zinc-50 outline-none focus:ring-2 focus:ring-[var(--brand-blue)]/20 cursor-pointer"
                                >
                                    {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                                </select>
                                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-secondary)]" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                            {results.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
