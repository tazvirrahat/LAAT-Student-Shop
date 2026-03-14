import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Clock, Shield, Smartphone, Users, ChevronRight } from 'lucide-react'
import { ProductCarousel } from '@/components/ui/ProductCarousel'
import { MOCK_FLASH_DEALS } from '@/lib/types/products'

export const metadata: Metadata = {
    title: 'Campus Pickup',
    description: 'Buy and sell locally — arrange campus pickup directly with verified student sellers.',
}

const HOW_IT_WORKS = [
    { icon: Smartphone, step: '1', title: 'Find an item', desc: 'Browse listings with "Pickup today" — all from students on your campus.' },
    { icon: Users, step: '2', title: 'Message the seller', desc: 'Agree a time and spot. Our in-app chat keeps everything in one place.' },
    { icon: MapPin, step: '3', title: 'Meet, inspect, pay', desc: 'Inspect before you pay. Use LAAT Pay for buyer protection, or settle in cash.' },
    { icon: Shield, step: '4', title: 'Leave a review', desc: 'Rate your experience — it builds a trusted campus community.' },
]

const POPULAR_SPOTS = [
    'Library entrance', 'Student Union building', 'Cafeteria', 'Campus security desk', 'Admin building reception',
]

export default function CampusPickupPage() {
    const pickupProducts = MOCK_FLASH_DEALS.map(p => ({ ...p, fulfillment: 'Pickup today' as const }))

    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-8">

            {/* Hero */}
            <div className="rounded-2xl bg-gradient-to-br from-[var(--brand-blue-dark)] to-[var(--brand-blue)] text-white p-8 md:p-12 mb-10 relative overflow-hidden">
                <div className="relative z-10 max-w-lg">
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin size={16} className="text-[var(--brand-yellow)]" />
                        <span className="text-xs font-black text-[var(--brand-yellow)] uppercase tracking-wider">Campus Pickup</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black leading-tight mb-3">
                        Buy local.<br />Save on delivery.
                    </h1>
                    <p className="text-white/80 text-sm mb-6 max-w-sm">
                        Meet verified students at safe campus spots. No delivery wait. No courier fees.
                    </p>
                    <Link href="/search?fulfillment=pickup" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-dark)] text-sm font-black hover:bg-amber-400 transition-colors">
                        Browse pickup listings <ChevronRight size={15} />
                    </Link>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 hidden md:block" />
                <Clock size={96} className="absolute right-8 top-1/2 -translate-y-1/2 text-white/10 hidden md:block" />
            </div>

            {/* How it works */}
            <div className="mb-12">
                <h2 className="text-2xl font-black text-[var(--text-primary)] text-center mb-8">How campus pickup works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {HOW_IT_WORKS.map(({ icon: Icon, step, title, desc }) => (
                        <div key={step} className="relative bg-white border border-[var(--border-subtle)] rounded-2xl p-5 hover:shadow-sm transition-shadow text-center">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Icon size={18} className="text-[var(--brand-blue)]" />
                            </div>
                            <div className="absolute top-4 left-4 w-5 h-5 bg-[var(--brand-blue)] text-white text-[10px] font-black rounded-full flex items-center justify-center">{step}</div>
                            <h3 className="text-sm font-black text-[var(--text-primary)] mb-1">{title}</h3>
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Safe spots */}
            <div className="mb-12 bg-zinc-50 rounded-2xl p-6">
                <h2 className="text-lg font-black text-[var(--text-primary)] mb-1">Recommended safe pickup spots</h2>
                <p className="text-xs text-[var(--text-secondary)] mb-4">Always meet in a public, well-lit location. Never share your home address.</p>
                <div className="flex flex-wrap gap-2">
                    {POPULAR_SPOTS.map(spot => (
                        <span key={spot} className="inline-flex items-center gap-1.5 h-8 px-3 bg-white border border-[var(--border-subtle)] rounded-full text-xs font-medium text-[var(--text-primary)]">
                            <MapPin size={11} className="text-[var(--brand-blue)]" /> {spot}
                        </span>
                    ))}
                </div>
            </div>

            {/* Available for pickup */}
            <ProductCarousel
                title="Available for campus pickup"
                subtitle="Items near you — ready today"
                viewAllHref="/search?fulfillment=pickup"
                products={pickupProducts}
            />
        </div>
    )
}
