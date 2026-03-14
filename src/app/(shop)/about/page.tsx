import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Laptop, Home, ShoppingBag, Users, Heart, Star, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
    title: 'About LAAT Student Shop',
    description: 'LAAT Student Shop is a peer-to-peer campus marketplace connecting students who want to buy and sell second-hand goods.',
}

const STATS = [
    { value: '12,000+', label: 'Student members' },
    { value: '$2.1M', label: 'Total traded value' },
    { value: '4.9★', label: 'Average seller rating' },
    { value: '8+', label: 'Universities' },
]

const VALUES = [
    { icon: Users, title: 'Community first', desc: 'We\'re built by students, for students. Every decision we make starts with what\'s best for our campus community.' },
    { icon: Heart, title: 'Sustainability', desc: 'Every second-hand sale is a win for the planet. Reducing waste, one textbook at a time.' },
    { icon: Star, title: 'Trust & safety', desc: 'Verified student accounts, buyer protection, and safe campus pickup spots — because trust is everything.' },
    { icon: TrendingUp, title: 'Student success', desc: 'We exist to help students save money and make money during their degree.' },
]

const CATEGORIES_ICONS = [
    { icon: BookOpen, name: 'Textbooks' },
    { icon: Laptop, name: 'Tech & Electronics' },
    { icon: Home, name: 'Dorm Essentials' },
    { icon: ShoppingBag, name: 'Fashion' },
]

export default function AboutPage() {
    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-8">

            {/* Hero */}
            <div className="text-center max-w-2xl mx-auto py-12">
                <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] leading-tight mb-4">
                    The campus marketplace<br />built by students.
                </h1>
                <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto">
                    LAAT Student Shop is a peer-to-peer marketplace connecting university students across Australia. Buy, sell, and save — right on campus.
                </p>
                <div className="flex gap-4 justify-center mt-8 flex-wrap">
                    <Link href="/sell" className="h-11 px-6 rounded-full bg-[var(--brand-blue)] text-white text-sm font-bold hover:bg-[var(--brand-blue-dark)] transition-colors">
                        Start selling
                    </Link>
                    <Link href="/" className="h-11 px-6 rounded-full border border-[var(--border-input)] text-sm font-bold text-[var(--text-primary)] hover:bg-zinc-50 transition-colors">
                        Browse deals
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-3xl mx-auto">
                {STATS.map(({ value, label }) => (
                    <div key={label} className="bg-white border border-[var(--border-subtle)] rounded-xl p-6 text-center">
                        <p className="text-3xl font-black text-[var(--brand-blue)] mb-1">{value}</p>
                        <p className="text-xs text-[var(--text-secondary)] font-medium">{label}</p>
                    </div>
                ))}
            </div>

            {/* Our values */}
            <div className="mb-16">
                <h2 className="text-2xl font-black text-[var(--text-primary)] text-center mb-8">What we stand for</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {VALUES.map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="bg-white border border-[var(--border-subtle)] rounded-2xl p-6 hover:shadow-sm transition-shadow">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                                <Icon size={18} className="text-[var(--brand-blue)]" />
                            </div>
                            <h3 className="text-sm font-black text-[var(--text-primary)] mb-2">{title}</h3>
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* What you can buy/sell */}
            <div className="bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-blue-dark)] rounded-2xl p-8 md:p-12 text-white text-center mb-12">
                <h2 className="text-2xl font-black mb-2">Everything students need</h2>
                <p className="text-white/80 text-sm mb-8 max-w-md mx-auto">From textbooks to laptops, dorm gear to fashion — if students need it, you'll find it here.</p>
                <div className="flex justify-center gap-8 flex-wrap">
                    {CATEGORIES_ICONS.map(({ icon: Icon, name }) => (
                        <div key={name} className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                <Icon size={22} className="text-white" />
                            </div>
                            <span className="text-xs font-medium text-white/80">{name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact */}
            <div className="text-center max-w-md mx-auto">
                <h2 className="text-xl font-black text-[var(--text-primary)] mb-2">Get in touch</h2>
                <p className="text-sm text-[var(--text-secondary)] mb-4">Questions, feedback, or press enquiries — we'd love to hear from you.</p>
                <a href="mailto:hello@laatstudenthop.com.au" className="text-sm font-bold text-[var(--brand-blue)] hover:underline">
                    hello@laatstudenthop.com.au
                </a>
            </div>
        </div>
    )
}
