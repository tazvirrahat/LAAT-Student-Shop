import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Package, ChevronRight, RotateCcw, MessageSquare } from 'lucide-react'
import { MOCK_FLASH_DEALS } from '@/lib/types/products'

export const metadata: Metadata = {
    title: 'My Orders',
    description: 'Track and manage your LAAT Student Shop orders.',
}

type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

const STATUS_BADGE: Record<OrderStatus, { label: string; className: string }> = {
    pending: { label: 'Processing', className: 'bg-yellow-100 text-yellow-800' },
    paid: { label: 'Confirmed', className: 'bg-blue-100 text-[var(--brand-blue)]' },
    shipped: { label: 'Shipped', className: 'bg-purple-100 text-purple-700' },
    delivered: { label: 'Delivered', className: 'bg-green-100 text-[var(--price-green)]' },
    cancelled: { label: 'Cancelled', className: 'bg-zinc-100 text-zinc-600' },
}

// Mock orders — replaced by Supabase orders query once DB is live
const MOCK_ORDERS = [
    { id: 'ORD-8821', date: '2026-03-05', status: 'delivered' as OrderStatus, total: 329.99, item: MOCK_FLASH_DEALS[0] },
    { id: 'ORD-8740', date: '2026-02-28', status: 'shipped' as OrderStatus, total: 189.00, item: MOCK_FLASH_DEALS[1] },
    { id: 'ORD-8611', date: '2026-02-20', status: 'delivered' as OrderStatus, total: 74.95, item: MOCK_FLASH_DEALS[2] },
    { id: 'ORD-8390', date: '2026-02-10', status: 'cancelled' as OrderStatus, total: 42.00, item: MOCK_FLASH_DEALS[3] },
]

function OrderCard({ order }: { order: typeof MOCK_ORDERS[0] }) {
    const { label, className } = STATUS_BADGE[order.status]
    return (
        <div className="bg-white border border-[var(--border-subtle)] rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
            {/* Order header */}
            <div className="flex items-center justify-between px-5 py-3 bg-zinc-50 border-b border-[var(--border-subtle)] flex-wrap gap-2">
                <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                    <span className="font-bold text-[var(--text-primary)]">{order.id}</span>
                    <span>Ordered {new Date(order.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${className}`}>{label}</span>
            </div>

            {/* Item row */}
            <div className="flex items-center gap-4 p-4">
                <div className="w-16 h-16 bg-zinc-50 rounded-lg overflow-hidden border border-[var(--border-subtle)] shrink-0">
                    <Image src={order.item.imageUrl} alt={order.item.title} width={64} height={64} className="object-contain w-full h-full p-1" />
                </div>
                <div className="flex-1 min-w-0">
                    <Link href={`/product/${order.item.id}`} className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--brand-blue)] hover:underline line-clamp-2 leading-snug">
                        {order.item.title}
                    </Link>
                    <p className="text-sm font-black text-[var(--text-primary)] mt-1">${order.total.toFixed(2)}</p>
                </div>
                <Link
                    href={`/orders/${order.id}`}
                    aria-label="View order details"
                    className="shrink-0 w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors"
                >
                    <ChevronRight size={18} />
                </Link>
            </div>

            {/* Actions */}
            <div className="flex gap-2 px-4 pb-4 flex-wrap">
                {order.status === 'delivered' && (
                    <>
                        <Link
                            href={`/product/${order.item.id}`}
                            className="h-8 px-4 text-xs font-bold rounded-full bg-[var(--brand-blue)] text-white hover:bg-[var(--brand-blue-dark)] transition-colors flex items-center gap-1.5"
                        >
                            <RotateCcw size={12} /> Buy again
                        </Link>
                        <button className="h-8 px-4 text-xs font-bold rounded-full border border-[var(--border-input)] text-[var(--text-primary)] hover:bg-zinc-50 transition-colors flex items-center gap-1.5">
                            <MessageSquare size={12} /> Leave review
                        </button>
                    </>
                )}
                {order.status === 'shipped' && (
                    <button className="h-8 px-4 text-xs font-bold rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-1.5">
                        <Package size={12} /> Track shipment
                    </button>
                )}
                <Link href={`/orders/${order.id}`} className="h-8 px-4 text-xs font-bold rounded-full border border-[var(--border-input)] text-[var(--text-primary)] hover:bg-zinc-50 transition-colors">
                    View details
                </Link>
            </div>
        </div>
    )
}

export default async function OrdersPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login?next=/orders')

    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-8">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-black text-[var(--text-primary)]">My Orders</h1>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">{MOCK_ORDERS.length} orders</p>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
                {['All orders', 'In progress', 'Delivered', 'Cancelled'].map((tab, i) => (
                    <button
                        key={tab}
                        className={`h-8 px-4 text-xs font-bold rounded-full whitespace-nowrap transition-colors ${i === 0
                            ? 'bg-[var(--brand-blue)] text-white'
                            : 'border border-[var(--border-input)] text-[var(--text-secondary)] hover:bg-zinc-50'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {MOCK_ORDERS.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <Package size={48} className="text-zinc-300 mb-4" />
                    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">No orders yet</h2>
                    <p className="text-sm text-[var(--text-secondary)] mb-6">When you place an order, it will appear here.</p>
                    <Link href="/" className="h-11 px-6 rounded-full bg-[var(--brand-blue)] text-white text-sm font-bold hover:bg-[var(--brand-blue-dark)] transition-colors">
                        Start shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {MOCK_ORDERS.map(order => <OrderCard key={order.id} order={order} />)}
                </div>
            )}
        </div>
    )
}
