import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Zap, ShieldCheck, TrendingUp, Star, Package } from 'lucide-react'

export const metadata: Metadata = {
    title: 'LAAT+ Membership',
    description: 'Join LAAT+ for 0% selling fees, priority listings, and exclusive student benefits.',
}

const FEATURES = [
    { icon: Zap, title: '0% selling fees', desc: 'Standard members pay 8% — LAAT+ members keep every dollar.' },
    { icon: TrendingUp, title: 'Priority listing', desc: 'Your items appear at the top of search results and category pages.' },
    { icon: ShieldCheck, title: 'Verified seller badge', desc: 'A blue checkmark on your listings builds buyer trust instantly.' },
    { icon: Star, title: 'Early access to deals', desc: 'See flash sales and new listings 2 hours before everyone else.' },
    { icon: Package, title: 'Free extended returns', desc: 'As a buyer, enjoy 60-day returns (vs 30 days for standard).' },
    { icon: Check, title: 'Priority support', desc: 'Skip the queue — LAAT+ members get same-day support.' },
]

const PLANS = [
    {
        name: 'Standard',
        price: 'Free',
        sub: 'forever',
        cta: 'Current plan',
        ctaStyle: 'border border-[var(--border-input)] text-[var(--text-secondary)] cursor-default',
        highlight: false,
        perks: ['8% commission per sale', '30-day returns as buyer', 'Standard listing placement', 'Community support'],
    },
    {
        name: 'LAAT+',
        price: '$4.99',
        sub: '/ month',
        cta: 'Get LAAT+',
        ctaStyle: 'bg-[var(--brand-yellow)] text-[var(--brand-blue-dark)] hover:bg-amber-400',
        highlight: true,
        perks: ['0% commission — keep it all', '60-day returns as buyer', 'Priority listing placement', 'Verified seller badge', 'Early deal access', 'Same-day support'],
    },
]

export default function PlusPage() {
    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-8">

            {/* Hero */}
            <div className="text-center py-12 max-w-2xl mx-auto">
                <div className="inline-block bg-[var(--brand-yellow)] text-[var(--brand-blue-dark)] text-xs font-black px-4 py-1.5 rounded-full mb-4">
                    LAAT+ Membership
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] leading-tight mb-4">
                    Sell more. Keep more.
                </h1>
                <p className="text-base text-[var(--text-secondary)] max-w-lg mx-auto">
                    LAAT+ gives campus sellers the edge — 0% fees, priority placement, and verified status for just $4.99/month.
                </p>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
                {PLANS.map(plan => (
                    <div key={plan.name} className={`rounded-2xl border-2 p-6 flex flex-col ${plan.highlight ? 'border-[var(--brand-blue)] shadow-lg shadow-blue-100' : 'border-[var(--border-subtle)]'}`}>
                        {plan.highlight && (
                            <span className="inline-block self-start text-xs font-black text-[var(--brand-blue)] bg-blue-50 px-3 py-0.5 rounded-full mb-3">Most popular</span>
                        )}
                        <h2 className="text-xl font-black text-[var(--text-primary)]">{plan.name}</h2>
                        <div className="flex items-baseline gap-1 mt-1 mb-4">
                            <span className="text-3xl font-black text-[var(--text-primary)]">{plan.price}</span>
                            <span className="text-sm text-[var(--text-secondary)]">{plan.sub}</span>
                        </div>
                        <ul className="space-y-2.5 flex-1 mb-6">
                            {plan.perks.map(perk => (
                                <li key={perk} className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                                    <Check size={14} className="text-[var(--price-green)] shrink-0" />
                                    {perk}
                                </li>
                            ))}
                        </ul>
                        <Link href={plan.highlight ? '/login?next=/plus/subscribe' : '#'} className={`block text-center h-11 rounded-full text-sm font-black transition-colors flex items-center justify-center ${plan.ctaStyle}`}>
                            {plan.cta}
                        </Link>
                    </div>
                ))}
            </div>

            {/* Feature grid */}
            <div className="mb-16">
                <h2 className="text-2xl font-black text-[var(--text-primary)] text-center mb-8">Everything in LAAT+</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {FEATURES.map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="flex gap-4 p-5 bg-white border border-[var(--border-subtle)] rounded-xl hover:shadow-sm transition-shadow">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                <Icon size={18} className="text-[var(--brand-blue)]" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-0.5">{title}</h3>
                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-black text-[var(--text-primary)] text-center mb-6">FAQ</h2>
                <div className="space-y-4">
                    {[
                        ['Can I cancel anytime?', 'Yes — cancel with one click in your account settings. No lock-in, no penalty.'],
                        ['What happens if I cancel mid-month?', 'You keep LAAT+ benefits until the end of your billing period.'],
                        ['Is there a student discount?', "LAAT+ is already priced for students. Use your .edu email at signup for an extra 20% off."],
                        ['Does LAAT+ apply to my purchases too?', 'Yes — the 60-day return window and early deal access apply whether you\'re buying or selling.'],
                    ].map(([q, a]) => (
                        <div key={q} className="bg-white border border-[var(--border-subtle)] rounded-xl p-5">
                            <p className="text-sm font-bold text-[var(--text-primary)] mb-1.5">{q}</p>
                            <p className="text-sm text-[var(--text-secondary)]">{a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
