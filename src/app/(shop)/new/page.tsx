import type { Metadata } from 'next'
import { Sparkles } from 'lucide-react'
import { ProductCard } from '@/components/ui/ProductCard'
import { MOCK_FLASH_DEALS } from '@/lib/types/products'

export const metadata: Metadata = {
    title: 'New Arrivals',
    description: 'The latest listings from student sellers — fresh items added daily.',
}

const SORT_OPTIONS = ['Newest first', 'Price: low to high', 'Price: high to low', 'Most popular']
const FILTERS = ['All', 'Textbooks', 'Tech', 'Dorm', 'Fashion', 'Sports', 'Food']

export default function NewArrivalsPage() {
    const newProducts = MOCK_FLASH_DEALS.map((p, i) => ({
        ...p,
        id: `new-${p.id}`,
        badge: i % 3 === 0 ? 'New' as const : undefined,
    }))

    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-8">

            {/* Header */}
            <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles size={18} className="text-[var(--brand-yellow)]" />
                        <span className="text-xs font-black text-[var(--brand-blue)] uppercase tracking-wider">Fresh drops</span>
                    </div>
                    <h1 className="text-2xl font-black text-[var(--text-primary)]">New Arrivals</h1>
                    <p className="text-sm text-[var(--text-secondary)] mt-0.5">Latest listings from students — updated every hour</p>
                </div>
                <select aria-label="Sort" className="h-9 px-3 text-sm border border-[var(--border-input)] rounded-xl outline-none focus:border-[var(--brand-blue)] bg-white self-center">
                    {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
            </div>

            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 hide-scrollbar">
                {FILTERS.map((f, i) => (
                    <button key={f} className={`h-8 px-4 rounded-full text-sm font-bold whitespace-nowrap shrink-0 transition-colors ${i === 0
                        ? 'bg-[var(--brand-blue)] text-white'
                        : 'border border-[var(--border-input)] text-[var(--text-secondary)] hover:bg-zinc-50'
                        }`}>{f}</button>
                ))}
            </div>

            {/* Results count */}
            <p className="text-xs text-[var(--text-secondary)] mb-4">
                <span className="font-bold text-[var(--text-primary)]">{newProducts.length * 4}</span> new listings in the last 24 hours
            </p>

            {/* Product grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
                {[...newProducts, ...newProducts].map((product, i) => (
                    <ProductCard key={`${product.id}-${i}`} product={product} />
                ))}
            </div>

            {/* Load more */}
            <div className="flex justify-center mt-10">
                <button className="h-11 px-8 rounded-full border-2 border-[var(--brand-blue)] text-[var(--brand-blue)] text-sm font-bold hover:bg-blue-50 transition-colors">
                    Load more
                </button>
            </div>
        </div>
    )
}
