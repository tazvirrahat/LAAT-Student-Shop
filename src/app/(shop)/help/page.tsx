import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, MessageSquare, Package, RotateCcw, CreditCard, ShieldCheck, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Help Center',
    description: 'Get answers to your LAAT Student Shop questions — orders, listings, payments, and more.',
}

const TOPICS = [
    { icon: Package, title: 'Orders & delivery', href: '#orders', items: ['How do I track my order?', 'My order hasn\'t arrived', 'Changing delivery address', 'Campus pickup instructions'] },
    { icon: RotateCcw, title: 'Returns & refunds', href: '#returns', items: ['How to return an item', 'Refund timeline', 'Item not as described', 'LAAT Buyer Protection claim'] },
    { icon: CreditCard, title: 'Payments', href: '#payments', items: ['Accepted payment methods', 'When will I be paid as a seller?', 'Payment failed', 'Promo codes and vouchers'] },
    { icon: ShieldCheck, title: 'Account & security', href: '#account', items: ['Resetting your password', 'Two-factor authentication', 'Reporting a suspicious user', 'Deleting your account'] },
]

const FAQS = [
    { q: 'How do I contact a seller?', a: 'Once you\'ve found an item, click "Message seller" on the product page. All messages go through our in-app chat — never share your personal contact details.' },
    { q: 'What is LAAT Buyer Protection?', a: 'If your item doesn\'t arrive or doesn\'t match the listing description, we\'ll issue a full refund. Claims must be submitted within 5 days of the delivery date.' },
    { q: 'How long does it take to sell an item?', a: 'Textbooks and tech items typically sell within 24–72 hours. Listing quality (photos, price, description) is the biggest factor.' },
    { q: 'Is it free to list?', a: 'Yes — listing an item is free. LAAT charges an 8% commission only when your item sells. LAAT+ members pay 0%.' },
    { q: 'Can I meet the seller in person?', a: 'Yes! Campus pickup is supported. Always meet at a public location on campus — see our recommended safe spots in the Campus Pickup guide.' },
]

export default function HelpPage() {
    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-8">

            {/* Hero search */}
            <div className="text-center py-10 max-w-2xl mx-auto">
                <h1 className="text-3xl font-black text-[var(--text-primary)] mb-3">How can we help?</h1>
                <div className="relative max-w-lg mx-auto">
                    <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                    <input
                        type="search"
                        placeholder="Search for answers..."
                        className="w-full h-12 pl-11 pr-4 rounded-full border-2 border-[var(--border-input)] text-sm outline-none focus:border-[var(--brand-blue)] transition-colors bg-white"
                    />
                </div>
            </div>

            {/* Topic cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {TOPICS.map(({ icon: Icon, title, href, items }) => (
                    <div key={title} className="bg-white border border-[var(--border-subtle)] rounded-2xl p-5 hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                                <Icon size={15} className="text-[var(--brand-blue)]" />
                            </div>
                            <h2 className="text-sm font-black text-[var(--text-primary)]">{title}</h2>
                        </div>
                        <ul className="space-y-2">
                            {items.map(item => (
                                <li key={item}>
                                    <a href={href} className="flex items-center justify-between text-xs text-[var(--text-secondary)] hover:text-[var(--brand-blue)] hover:underline group">
                                        <span>{item}</span>
                                        <ChevronRight size={11} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* FAQ */}
            <div className="max-w-2xl mx-auto mb-12">
                <h2 className="text-xl font-black text-[var(--text-primary)] mb-6 text-center">Frequently asked questions</h2>
                <div className="space-y-4">
                    {FAQS.map(({ q, a }) => (
                        <div key={q} className="bg-white border border-[var(--border-subtle)] rounded-xl p-5">
                            <p className="text-sm font-bold text-[var(--text-primary)] mb-2">{q}</p>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Still need help? */}
            <div className="bg-[var(--brand-blue)] rounded-2xl p-8 text-white text-center max-w-xl mx-auto">
                <MessageSquare size={28} className="mx-auto mb-3 text-white/80" />
                <h2 className="text-lg font-black mb-1">Still need help?</h2>
                <p className="text-sm text-white/80 mb-4 max-w-xs mx-auto">Our support team replies within a few hours on weekdays.</p>
                <a href="mailto:support@laatstudenthop.com.au" className="inline-block h-10 px-6 rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-dark)] text-sm font-black hover:bg-amber-400 transition-colors">
                    Email support
                </a>
            </div>
        </div>
    )
}
