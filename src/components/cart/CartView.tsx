'use client'

import { useCartStore } from '@/lib/store/cart'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Tag, ShieldCheck } from 'lucide-react'

export function CartView() {
    const { items, updateQuantity, removeItem, getCartTotal, getCartCount, getSavingsTotal } = useCartStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="py-16 text-center text-[var(--text-secondary)]">Loading cart...</div>
    }

    const subtotal = getCartTotal()
    const savings = getSavingsTotal()
    const count = getCartCount()
    const shipping = 0
    const total = subtotal + shipping

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
            {/* ── Cart items ─────────────────────────────────────── */}
            <div className="bg-white border border-[var(--border-subtle)] rounded-xl px-6">
                {items.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-lg font-semibold text-[var(--text-primary)]">Your cart is empty</p>
                        <Link href="/" className="mt-4 inline-block text-sm text-[var(--brand-blue)] hover:underline">Continue shopping</Link>
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-[var(--text-secondary)] pt-4 pb-2">
                            {count} item{count !== 1 ? 's' : ''} in your cart
                        </p>
                        <ul>
                            {items.map((item) => {
                                const { dollars, cents } = (() => {
                                    const [d, c] = item.price.toFixed(2).split('.')
                                    return { dollars: d, cents: c }
                                })()
                                return (
                                    <li key={item.id} className="flex gap-4 py-5 border-b border-[var(--border-subtle)] last:border-0">
                                        <div className="shrink-0 w-24 h-24 bg-white border border-[var(--border-subtle)] rounded-lg overflow-hidden">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title}
                                                width={96}
                                                height={96}
                                                className="object-contain w-full h-full p-2"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-1.5">
                                            <Link href={`/product/${item.id}`} className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--brand-blue)] line-clamp-2 hover:underline">
                                                {item.title}
                                            </Link>
                                            {item.badge && (
                                                <span className="inline-block text-xs font-bold text-[var(--brand-blue)]">{item.badge}</span>
                                            )}
                                            <p className="text-xs text-[var(--price-green)] font-medium">{item.fulfillment}</p>
                                            <div className="flex items-center gap-3 pt-1 flex-wrap">
                                                <div className="flex items-center border border-[var(--border-input)] rounded-full overflow-hidden text-sm">
                                                    <button onClick={() => updateQuantity(item.id, item.qty - 1)} aria-label="Decrease" className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 font-bold">−</button>
                                                    <span className="w-8 text-center font-bold select-none">{item.qty}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.qty + 1)} aria-label="Increase" className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 font-bold">+</button>
                                                </div>
                                                <button onClick={() => removeItem(item.id)} className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-red-500 transition-colors">
                                                    <Trash2 size={13} /> Remove
                                                </button>
                                                <button className="text-xs text-[var(--text-link)] hover:underline">Save for later</button>
                                            </div>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <div className="flex items-start justify-end leading-none gap-0.5">
                                                <span className="text-sm font-bold text-[var(--text-primary)] mt-0.5">$</span>
                                                <span className="text-xl font-black text-[var(--text-primary)]">{dollars}</span>
                                                <span className="text-sm font-bold text-[var(--text-primary)] mt-0.5">{cents}</span>
                                            </div>
                                            {item.originalPrice && (
                                                <span className="text-xs text-[var(--text-secondary)] line-through">${item.originalPrice.toFixed(2)}</span>
                                            )}
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                )}
            </div>

            {/* ── Order summary sidebar ──────────────────────────── */}
            <div className="space-y-4 lg:sticky lg:top-[88px]">
                {/* Promo code */}
                <div className="bg-white border border-[var(--border-subtle)] rounded-xl p-4">
                    <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                        <Tag size={14} /> Promo code
                    </h2>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter code"
                            aria-label="Promo code"
                            className="flex-1 h-9 px-3 text-sm border border-[var(--border-input)] rounded-full outline-none focus:ring-2 focus:ring-[var(--brand-blue)]/20 focus:border-[var(--brand-blue)]"
                        />
                        <button className="h-9 px-4 text-sm font-bold rounded-full bg-[var(--brand-blue)] text-white hover:bg-[var(--brand-blue-dark)] transition-colors">
                            Apply
                        </button>
                    </div>
                </div>

                {/* Summary */}
                <div className="bg-white border border-[var(--border-subtle)] rounded-xl p-5 space-y-3">
                    <h2 className="text-base font-black text-[var(--text-primary)]">Order summary</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-[var(--text-secondary)]">Subtotal ({count} items)</span>
                            <span className="font-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        {savings > 0 && (
                            <div className="flex justify-between text-[var(--price-green)]">
                                <span>You save</span>
                                <span className="font-semibold">-${savings.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-[var(--text-secondary)]">Delivery</span>
                            <span className="font-semibold text-[var(--price-green)]">Free</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-base font-black text-[var(--text-primary)] border-t border-[var(--border-subtle)] pt-3">
                        <span>Estimated total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <Link href="/checkout" className="w-full h-12 flex items-center justify-center rounded-full bg-[var(--brand-yellow)] hover:bg-amber-400 text-[var(--brand-blue-dark)] text-base font-black transition-colors disabled:opacity-50" style={{ pointerEvents: count === 0 ? 'none' : 'auto', opacity: count === 0 ? 0.5 : 1 }}>
                        Continue to checkout
                    </Link>
                    <p className="text-xs text-[var(--text-secondary)] text-center">
                        Taxes calculated at checkout
                    </p>
                </div>

                {/* Trust signal */}
                <div className="flex items-start gap-2 text-xs text-[var(--text-secondary)] px-1">
                    <ShieldCheck size={14} className="text-[var(--price-green)] mt-0.5 shrink-0" />
                    <span>Secured by LAAT Buyer Protection. Free returns within 30 days.</span>
                </div>
            </div>
        </div>
    )
}
