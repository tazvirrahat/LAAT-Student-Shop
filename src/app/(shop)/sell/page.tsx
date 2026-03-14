import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { CreateListingForm } from '@/components/listings/CreateListingForm'
import { ShieldCheck, Zap, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Sell an Item',
    description: 'List your item for free on LAAT Student Shop — reach thousands of verified students on your campus.',
}

const SELL_PERKS = [
    { icon: Zap, label: 'Live in under 2 hours', desc: 'Our team reviews listings quickly' },
    { icon: TrendingUp, label: 'Reach your whole campus', desc: 'Thousands of verified student buyers' },
    { icon: ShieldCheck, label: 'LAAT Buyer Protection', desc: 'Secure payments, easy dispute resolution' },
]

export default async function SellPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login?next=/sell')

    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-8">

            {/* Page header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-black text-[var(--text-primary)] mb-2">List your item</h1>
                <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                    Reach thousands of verified students at your campus. Free to list — we only take a cut when you sell.
                </p>
            </div>

            {/* Perks row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {SELL_PERKS.map(({ icon: Icon, label, desc }) => (
                    <div key={label} className="flex items-start gap-3 bg-blue-50 rounded-xl px-4 py-3">
                        <Icon size={18} className="text-[var(--brand-blue)] mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-[var(--text-primary)]">{label}</p>
                            <p className="text-xs text-[var(--text-secondary)]">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Listing form */}
            <CreateListingForm />
        </div>
    )
}
