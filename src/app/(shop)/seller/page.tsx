import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'
import { MOCK_FLASH_DEALS } from '@/lib/types/products'
import { Plus, TrendingUp, Eye, Package, DollarSign, Star, MoreVertical, Edit, Archive, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Seller Dashboard',
    description: 'Manage your LAAT Student Shop listings and track your sales performance.',
}

type ListingStatus = 'active' | 'pending_review' | 'sold' | 'archived'

const MOCK_LISTINGS = [
    { ...MOCK_FLASH_DEALS[0], status: 'active' as ListingStatus, views: 142, saves: 23 },
    { ...MOCK_FLASH_DEALS[1], status: 'pending_review' as ListingStatus, views: 0, saves: 0 },
    { ...MOCK_FLASH_DEALS[2], status: 'sold' as ListingStatus, views: 88, saves: 11 },
    { ...MOCK_FLASH_DEALS[3], status: 'active' as ListingStatus, views: 54, saves: 6 },
]

const STATUS_STYLE: Record<ListingStatus, string> = {
    active: 'bg-green-100 text-[var(--price-green)]',
    pending_review: 'bg-yellow-100 text-yellow-700',
    sold: 'bg-zinc-100 text-zinc-600',
    archived: 'bg-zinc-100 text-zinc-400',
}
const STATUS_LABEL: Record<ListingStatus, string> = {
    active: 'Active',
    pending_review: 'Pending review',
    sold: 'Sold',
    archived: 'Archived',
}

const STATS = [
    { icon: DollarSign, label: 'Earnings (30d)', value: '$412.94', delta: '+12%', positive: true },
    { icon: Eye, label: 'Listing views', value: '284', delta: '+8%', positive: true },
    { icon: Package, label: 'Items sold', value: '3', delta: undefined },
    { icon: Star, label: 'Seller rating', value: '4.9', delta: '12 reviews' },
]

export default async function SellerDashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login?next=/seller')

    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-black text-[var(--text-primary)]">Seller Dashboard</h1>
                    <p className="text-sm text-[var(--text-secondary)] mt-0.5">Manage your listings and track performance</p>
                </div>
                <Link href="/sell" className="h-10 px-5 rounded-full bg-[var(--brand-blue)] text-white text-sm font-bold hover:bg-[var(--brand-blue-dark)] transition-colors flex items-center gap-2">
                    <Plus size={15} /> New listing
                </Link>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {STATS.map(({ icon: Icon, label, value, delta, positive }) => (
                    <div key={label} className="bg-white border border-[var(--border-subtle)] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-medium text-[var(--text-secondary)]">{label}</p>
                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                                <Icon size={15} className="text-[var(--brand-blue)]" />
                            </div>
                        </div>
                        <p className="text-2xl font-black text-[var(--text-primary)]">{value}</p>
                        {delta && (
                            <p className={`text-xs font-semibold mt-0.5 ${positive ? 'text-[var(--price-green)]' : 'text-[var(--text-secondary)]'}`}>
                                {positive && '↑ '}{delta}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Listings table */}
            <div className="bg-white border border-[var(--border-subtle)] rounded-xl overflow-hidden mb-8">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-subtle)]">
                    <h2 className="text-base font-black text-[var(--text-primary)]">My listings</h2>
                    <div className="flex gap-2">
                        {(['All', 'Active', 'Sold'] as const).map((tab, i) => (
                            <button key={tab} className={`h-7 px-3 text-xs font-bold rounded-full transition-colors ${i === 0
                                ? 'bg-[var(--brand-blue)] text-white'
                                : 'border border-[var(--border-input)] text-[var(--text-secondary)] hover:bg-zinc-50'
                                }`}>{tab}</button>
                        ))}
                    </div>
                </div>

                {/* Mobile: cards */}
                <div className="divide-y divide-[var(--border-subtle)] md:hidden">
                    {MOCK_LISTINGS.map(item => (
                        <div key={item.id} className="flex gap-3 p-4">
                            <Image src={item.imageUrl} alt={item.title} width={52} height={52} className="w-13 h-13 object-contain bg-zinc-50 rounded-lg border border-[var(--border-subtle)] p-1 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-[var(--text-primary)] line-clamp-2 mb-1">{item.title}</p>
                                <p className="text-sm font-black text-[var(--text-primary)]">${item.price.toFixed(2)}</p>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[item.status]}`}>{STATUS_LABEL[item.status]}</span>
                                    <span className="text-[10px] text-[var(--text-secondary)]"><Eye size={9} className="inline mr-0.5" />{item.views}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop: table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-xs font-bold text-[var(--text-secondary)] text-left border-b border-[var(--border-subtle)]">
                                <th className="px-5 py-3 font-medium">Item</th>
                                <th className="px-5 py-3 font-medium">Price</th>
                                <th className="px-5 py-3 font-medium">Status</th>
                                <th className="px-5 py-3 font-medium text-center">Views</th>
                                <th className="px-5 py-3 font-medium text-center">Saves</th>
                                <th className="px-5 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-subtle)]">
                            {MOCK_LISTINGS.map(item => (
                                <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <Image src={item.imageUrl} alt={item.title} width={40} height={40} className="w-10 h-10 object-contain bg-zinc-50 rounded-lg border border-[var(--border-subtle)] p-0.5 shrink-0" />
                                            <p className="text-xs font-medium text-[var(--text-primary)] line-clamp-2 max-w-xs">{item.title}</p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 font-black whitespace-nowrap">${item.price.toFixed(2)}</td>
                                    <td className="px-5 py-4">
                                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap ${STATUS_STYLE[item.status]}`}>
                                            {STATUS_LABEL[item.status]}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-center text-[var(--text-secondary)]">{item.views}</td>
                                    <td className="px-5 py-4 text-center text-[var(--text-secondary)]">{item.saves}</td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {item.status === 'active' && (
                                                <>
                                                    <button aria-label="Edit" className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-zinc-100 hover:text-[var(--brand-blue)] transition-colors">
                                                        <Edit size={13} />
                                                    </button>
                                                    <button aria-label="Mark as sold" className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-green-50 hover:text-[var(--price-green)] transition-colors">
                                                        <CheckCircle size={13} />
                                                    </button>
                                                    <button aria-label="Archive" className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-zinc-100 transition-colors">
                                                        <Archive size={13} />
                                                    </button>
                                                </>
                                            )}
                                            <button aria-label="More options" className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-zinc-100 transition-colors">
                                                <MoreVertical size={13} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Performance tip */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-start gap-3">
                <TrendingUp size={18} className="text-[var(--brand-blue)] mt-0.5 shrink-0" />
                <div>
                    <p className="text-sm font-bold text-[var(--text-primary)] mb-0.5">Boost your listings with LAAT+</p>
                    <p className="text-xs text-[var(--text-secondary)]">Priority placement gets your items seen first. 0% commission means you keep every dollar. <Link href="/plus" className="text-[var(--brand-blue)] hover:underline font-semibold">Learn more →</Link></p>
                </div>
            </div>
        </div>
    )
}
