import type { Metadata } from 'next'
import Link from 'next/link'
import { ProductCarousel } from '@/components/ui/ProductCarousel'
import { ProductCard } from '@/components/ui/ProductCard'
import { MOCK_FLASH_DEALS } from '@/lib/types/products'
import { Zap } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Deals & Rollbacks',
    description: 'Discover the best student deals — rollbacks, clearance, and flash sales on LAAT Student Shop.',
}

const DEAL_CATEGORIES = [
    { label: 'All deals', active: true },
    { label: 'Rollbacks' },
    { label: 'Clearance' },
    { label: 'Flash sales' },
    { label: 'Textbooks' },
    { label: 'Tech' },
    { label: 'Dorm' },
]

export default function DealsPage() {
    const dealProducts = MOCK_FLASH_DEALS.map((p, i) => ({
        ...p,
        badge: (['Rollback', 'Clearance', 'Rollback', 'Best Seller', 'Rollback', 'Clearance'] as const)[i] ?? 'Rollback',
    }))

    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-6">

            {/* Hero banner */}
            <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-blue-dark)] text-white p-8 md:p-12">
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-[var(--brand-yellow)] text-[var(--brand-blue-dark)] text-xs font-black px-3 py-1 rounded-full mb-3">
                        <Zap size={12} /> Flash sale — ends tonight
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black leading-tight mb-2">Rollbacks &amp; Deals</h1>
                    <p className="text-white/80 text-sm max-w-md">
                        The best prices on campus — updated daily. Verified student sellers only.
                    </p>
                </div>
                {/* Decorative circles */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="absolute right-16 bottom-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
            </div>

            {/* Category filter pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 hide-scrollbar">
                {DEAL_CATEGORIES.map(({ label, active }) => (
                    <button
                        key={label}
                        className={`h-9 px-5 rounded-full text-sm font-bold whitespace-nowrap transition-colors shrink-0 ${active
                            ? 'bg-[var(--brand-blue)] text-white'
                            : 'border border-[var(--border-input)] text-[var(--text-secondary)] hover:bg-zinc-50'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Stats bar */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-[var(--text-secondary)]">
                    <span className="font-bold text-[var(--text-primary)]">{dealProducts.length * 4}+</span> deals available
                </p>
                <select aria-label="Sort" className="h-9 px-3 text-sm border border-[var(--border-input)] rounded-xl outline-none focus:border-[var(--brand-blue)] bg-white">
                    <option>Best match</option>
                    <option>Price: low to high</option>
                    <option>Price: high to low</option>
                    <option>Biggest savings</option>
                </select>
            </div>

            {/* Flash deals carousel */}
            <ProductCarousel
                title="🔥 Flash sales — Today only"
                subtitle="Up to 70% off — limited time"
                viewAllHref="/deals"
                products={dealProducts}
            />

            {/* All deals grid */}
            <section className="mt-10">
                <h2 className="text-xl font-black text-[var(--text-primary)] mb-4">All deals</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
                    {dealProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Sell CTA */}
            <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
                <h2 className="text-xl font-black text-[var(--text-primary)] mb-2">Have something to sell?</h2>
                <p className="text-sm text-[var(--text-secondary)] mb-4 max-w-md mx-auto">List it in minutes and reach thousands of students on your campus.</p>
                <Link href="/sell" className="inline-block h-11 px-8 rounded-full bg-[var(--brand-blue)] text-white text-sm font-bold hover:bg-[var(--brand-blue-dark)] transition-colors">
                    List an item free
                </Link>
            </div>
        </div>
    )
}
