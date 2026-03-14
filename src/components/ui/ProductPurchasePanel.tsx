'use client'

import { useState } from 'react'
import { Heart, Share2, Truck, Store, ShieldCheck } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import { toast } from 'sonner'
import type { Product } from '@/lib/types/products'

interface Props {
    price: number
    originalPrice?: number
    badge?: string
    fulfillment?: string
}

function formatPrice(p: number) {
    const [dollars, cents] = p.toFixed(2).split('.')
    return { dollars, cents }
}

/**
 * Product purchase block — sticky CTA panel matching Walmart's PDP right column.
 * Contains: price, badge, fulfillment, add to cart, wishlist.
 */
export function ProductPurchasePanel({ product }: { product: Product }) {
    const { price, originalPrice, badge, fulfillment } = product
    const [qty, setQty] = useState(1)
    const [inWishlist, setInWishlist] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)

    const { dollars, cents } = formatPrice(price)
    const savings = originalPrice ? originalPrice - price : 0

    const addItem = useCartStore((state) => state.addItem)

    const handleAddToCart = () => {
        addItem(product, qty)
        setAddedToCart(true)
        toast.success(`Added ${qty} to cart`, {
            description: product.title
        })
        setTimeout(() => setAddedToCart(false), 2000)
    }

    return (
        <div className="bg-white border border-[var(--border-subtle)] rounded-xl p-5 space-y-5 lg:sticky lg:top-[88px] self-start">

            {/* Badge */}
            {badge && (
                <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide ${badge === 'Rollback' ? 'bg-[var(--badge-rollback)] text-white' :
                    badge === 'Clearance' ? 'bg-[var(--badge-clearance)] text-white' :
                        badge === 'Best Seller' ? 'bg-[var(--badge-best-seller)] text-white' :
                            badge === 'New' ? 'bg-[var(--badge-new)] text-white' :
                                'bg-zinc-200 text-zinc-700'
                    }`}>
                    {badge}
                </span>
            )}

            {/* Price */}
            <div className="space-y-1">
                <div className="flex items-start gap-1 leading-none">
                    <span className="text-xl font-bold text-[var(--text-primary)] mt-1">$</span>
                    <span className="text-5xl font-black text-[var(--text-primary)] leading-none">{dollars}</span>
                    <span className="text-xl font-bold text-[var(--text-primary)] mt-1">{cents}</span>
                </div>
                {originalPrice && (
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-[var(--text-secondary)] line-through">
                            Was ${originalPrice.toFixed(2)}
                        </span>
                        <span className="text-sm font-semibold text-[var(--price-green)]">
                            You save ${savings.toFixed(2)}
                        </span>
                    </div>
                )}
            </div>

            {/* Fulfillment options */}
            <div className="space-y-2 border border-[var(--border-subtle)] rounded-lg overflow-hidden">
                <label className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-zinc-50 border-b border-[var(--border-subtle)]">
                    <input type="radio" name="fulfillment" defaultChecked className="accent-[var(--brand-blue)]" />
                    <Truck size={18} className="text-[var(--price-green)] shrink-0" />
                    <div>
                        <div className="text-sm font-bold text-[var(--text-primary)]">Free delivery</div>
                        <div className="text-xs text-[var(--text-secondary)]">Arrives by tomorrow</div>
                    </div>
                </label>
                <label className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-zinc-50">
                    <input type="radio" name="fulfillment" className="accent-[var(--brand-blue)]" />
                    <Store size={18} className="text-[var(--brand-blue)] shrink-0" />
                    <div>
                        <div className="text-sm font-bold text-[var(--text-primary)]">Free campus pickup</div>
                        <div className="text-xs text-[var(--text-secondary)]">Today at Your Campus</div>
                    </div>
                </label>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[var(--text-primary)]">Qty:</span>
                <div className="flex items-center border border-[var(--border-input)] rounded-full overflow-hidden">
                    <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        aria-label="Decrease quantity"
                        className="w-9 h-9 flex items-center justify-center text-xl font-bold hover:bg-zinc-100 transition-colors leading-none"
                    >
                        −
                    </button>
                    <span className="w-10 text-center text-sm font-bold select-none">{qty}</span>
                    <button
                        onClick={() => setQty((q) => Math.min(99, q + 1))}
                        aria-label="Increase quantity"
                        className="w-9 h-9 flex items-center justify-center text-xl font-bold hover:bg-zinc-100 transition-colors leading-none"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Add to cart CTA */}
            <button
                onClick={handleAddToCart}
                className={`w-full h-12 rounded-full text-white text-base font-bold transition-all duration-200 ${addedToCart
                    ? 'bg-[var(--price-green)] scale-95'
                    : 'bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-dark)]'
                    }`}
            >
                {addedToCart ? '✓ Added to cart!' : 'Add to cart'}
            </button>

            {/* Secondary actions */}
            <div className="flex gap-3">
                <button
                    onClick={() => setInWishlist((v) => !v)}
                    className="flex-1 h-10 rounded-full border border-[var(--border-input)] flex items-center justify-center gap-2 text-sm font-semibold hover:bg-zinc-50 transition-colors"
                >
                    <Heart
                        size={16}
                        className={inWishlist ? 'fill-red-500 text-red-500' : 'text-[var(--text-primary)]'}
                    />
                    {inWishlist ? 'Saved' : 'Save'}
                </button>
                <button className="flex-1 h-10 rounded-full border border-[var(--border-input)] flex items-center justify-center gap-2 text-sm font-semibold hover:bg-zinc-50 transition-colors">
                    <Share2 size={16} />
                    Share
                </button>
            </div>

            {/* Trust signals */}
            <div className="flex items-start gap-2 text-xs text-[var(--text-secondary)] pt-1 border-t border-[var(--border-subtle)]">
                <ShieldCheck size={14} className="text-[var(--price-green)] mt-0.5 shrink-0" />
                <span>Free returns within 30 days. All sellers are verified LAAT members.</span>
            </div>
        </div>
    )
}
