import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
    User, Package, Heart, Settings, LogOut, Star,
    ShieldCheck, ChevronRight, Clock, Tag
} from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/actions/auth'
import { MOCK_FLASH_DEALS } from '@/lib/types/products'
import Image from 'next/image'

export const metadata: Metadata = {
    title: 'My Account',
    description: 'Manage your LAAT Student Shop account — orders, wishlist, and settings.',
}

// ── Mock order history (swappable with Supabase query) ────────────────────
const MOCK_ORDERS = [
    {
        id: 'LS-10042',
        date: '2026-03-05',
        status: 'Delivered',
        statusColor: 'text-[var(--price-green)]',
        total: 329.99,
        items: [MOCK_FLASH_DEALS[0]],
    },
    {
        id: 'LS-10039',
        date: '2026-02-28',
        status: 'In transit',
        statusColor: 'text-[var(--brand-blue)]',
        total: 74.95,
        items: [MOCK_FLASH_DEALS[2]],
    },
    {
        id: 'LS-10031',
        date: '2026-02-14',
        status: 'Delivered',
        statusColor: 'text-[var(--price-green)]',
        total: 42.00,
        items: [MOCK_FLASH_DEALS[3]],
    },
]

const NAV_ITEMS = [
    { icon: Package, label: 'Orders', href: '#orders', active: true },
    { icon: Heart, label: 'Wishlist', href: '#wishlist' },
    { icon: Settings, label: 'Account Settings', href: '#settings' },
    { icon: Star, label: 'LAAT+', href: '/plus' },
]

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Server-side route protection — if no session, redirect to login
    if (!user) redirect('/login')

    const displayName = user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Student'
    const initials = displayName.slice(0, 2).toUpperCase()
    const joinDate = new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-8">

            {/* ── Page header ──────────────────────────────────────── */}
            <h1 className="text-2xl font-black text-[var(--text-primary)] mb-6">My Account</h1>

            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 items-start">

                {/* ── Sidebar ────────────────────────────────────────── */}
                <aside className="space-y-3">
                    {/* Profile card */}
                    <div className="bg-white border border-[var(--border-subtle)] rounded-xl p-5 flex flex-col items-center text-center gap-3">
                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-full bg-[var(--brand-blue)] flex items-center justify-center text-white text-xl font-black select-none">
                            {initials}
                        </div>
                        <div>
                            <p className="font-bold text-[var(--text-primary)] text-base">{displayName}</p>
                            <p className="text-xs text-[var(--text-secondary)] mt-0.5 break-all">{user.email}</p>
                            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Member since {joinDate}</p>
                        </div>
                        {/* LAAT+ badge */}
                        <span className="inline-flex items-center gap-1 bg-[var(--brand-yellow)] text-[var(--brand-blue-dark)] text-xs font-black px-3 py-1 rounded-full">
                            <Star size={11} fill="currentColor" /> LAAT+ Member
                        </span>
                    </div>

                    {/* Sidebar nav */}
                    <nav aria-label="Account navigation" className="bg-white border border-[var(--border-subtle)] rounded-xl overflow-hidden">
                        {NAV_ITEMS.map(({ icon: Icon, label, href, active }) => (
                            <Link
                                key={label}
                                href={href}
                                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-b border-[var(--border-subtle)] last:border-0 ${active
                                        ? 'bg-blue-50 text-[var(--brand-blue)] font-bold'
                                        : 'text-[var(--text-primary)] hover:bg-zinc-50'
                                    }`}
                            >
                                <Icon size={16} className={active ? 'text-[var(--brand-blue)]' : 'text-[var(--text-secondary)]'} />
                                {label}
                                <ChevronRight size={14} className="ml-auto text-[var(--text-secondary)]" />
                            </Link>
                        ))}

                        {/* Sign out */}
                        <form action={logout}>
                            <button
                                type="submit"
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut size={16} />
                                Sign out
                            </button>
                        </form>
                    </nav>

                    {/* Trust signals */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-blue)]">
                            <ShieldCheck size={14} /> LAAT Buyer Protection
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                            All purchases are covered. Free returns within 30 days. Verified student sellers only.
                        </p>
                    </div>
                </aside>

                {/* ── Main content ───────────────────────────────────── */}
                <div className="space-y-6">

                    {/* ── Quick stats ─────────────────────────────────── */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: 'Orders', value: MOCK_ORDERS.length, icon: Package, color: 'text-[var(--brand-blue)]', bg: 'bg-blue-50' },
                            { label: 'Saved items', value: 4, icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
                            { label: 'You saved', value: '$389', icon: Tag, color: 'text-[var(--price-green)]', bg: 'bg-green-50' },
                            { label: 'Reviews', value: 2, icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
                        ].map(({ label, value, icon: Icon, color, bg }) => (
                            <div key={label} className="bg-white border border-[var(--border-subtle)] rounded-xl p-4 flex flex-col gap-2">
                                <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                                    <Icon size={16} className={color} />
                                </div>
                                <p className="text-2xl font-black text-[var(--text-primary)]">{value}</p>
                                <p className="text-xs text-[var(--text-secondary)]">{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* ── Order history ────────────────────────────────── */}
                    <section id="orders" aria-labelledby="orders-heading">
                        <div className="flex items-center justify-between mb-3">
                            <h2 id="orders-heading" className="text-base font-black text-[var(--text-primary)]">Recent orders</h2>
                            <Link href="/orders" className="text-sm text-[var(--text-link)] hover:underline">View all</Link>
                        </div>

                        <div className="space-y-3">
                            {MOCK_ORDERS.map((order) => (
                                <div key={order.id} className="bg-white border border-[var(--border-subtle)] rounded-xl p-4">
                                    {/* Order header */}
                                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3 pb-3 border-b border-[var(--border-subtle)]">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="text-xs font-bold text-[var(--text-secondary)]">Order {order.id}</span>
                                            <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                                                <Clock size={11} />
                                                {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <span className={`text-xs font-bold ${order.statusColor}`}>{order.status}</span>
                                        </div>
                                        <span className="text-sm font-black text-[var(--text-primary)]">${order.total.toFixed(2)}</span>
                                    </div>

                                    {/* Order items */}
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <div className="w-14 h-14 bg-zinc-50 rounded-lg border border-[var(--border-subtle)] overflow-hidden shrink-0">
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    width={56}
                                                    height={56}
                                                    className="object-contain w-full h-full p-1"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-1">{item.title}</p>
                                                <p className="text-xs text-[var(--price-green)] font-semibold">${item.price.toFixed(2)}</p>
                                            </div>
                                            <Link
                                                href={`/product/${item.id}`}
                                                className="shrink-0 text-xs font-bold text-[var(--brand-blue)] hover:underline"
                                            >
                                                Buy again
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Saved items (wishlist preview) ───────────────── */}
                    <section id="wishlist" aria-labelledby="wishlist-heading">
                        <div className="flex items-center justify-between mb-3">
                            <h2 id="wishlist-heading" className="text-base font-black text-[var(--text-primary)]">Saved items</h2>
                            <Link href="/wishlist" className="text-sm text-[var(--text-link)] hover:underline">View all</Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {MOCK_FLASH_DEALS.slice(2, 6).map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    className="bg-white border border-[var(--border-subtle)] rounded-xl p-3 hover:shadow-md hover:border-[var(--brand-blue)] transition-all group"
                                >
                                    <div className="aspect-square bg-zinc-50 rounded-lg overflow-hidden mb-2">
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.title}
                                            width={120}
                                            height={120}
                                            className="object-contain w-full h-full p-2 group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <p className="text-xs font-medium text-[var(--text-primary)] line-clamp-2 leading-snug">{product.title}</p>
                                    <p className="text-sm font-black text-[var(--price-green)] mt-1">${product.price.toFixed(2)}</p>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* ── Account settings preview ─────────────────────── */}
                    <section id="settings" aria-labelledby="settings-heading" className="bg-white border border-[var(--border-subtle)] rounded-xl overflow-hidden">
                        <h2 id="settings-heading" className="text-sm font-black text-[var(--text-primary)] px-5 py-4 border-b border-[var(--border-subtle)] flex items-center gap-2">
                            <Settings size={15} /> Account Settings
                        </h2>
                        {[
                            { label: 'Email address', value: user.email ?? '—' },
                            { label: 'Password', value: '••••••••••' },
                            { label: 'Campus', value: 'Your campus' },
                            { label: 'Notifications', value: 'Email & Push enabled' },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-subtle)] last:border-0 hover:bg-zinc-50 cursor-pointer group">
                                <div>
                                    <p className="text-xs text-[var(--text-secondary)]">{label}</p>
                                    <p className="text-sm font-medium text-[var(--text-primary)]">{value}</p>
                                </div>
                                <span className="text-xs font-bold text-[var(--brand-blue)] group-hover:underline">Edit</span>
                            </div>
                        ))}
                    </section>

                </div>
            </div>
        </div>
    )
}
