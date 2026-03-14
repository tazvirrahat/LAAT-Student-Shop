import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Heart, Trash2, ShoppingCart } from 'lucide-react'
import { MOCK_FLASH_DEALS } from '@/lib/types/products'
import { ProductCarousel } from '@/components/ui/ProductCarousel'

export const metadata: Metadata = {
    title: 'Wishlist',
    description: 'Your saved items on LAAT Student Shop.',
}

// Mock wishlist — will be replaced with Supabase wishlist query
const MOCK_WISHLIST = MOCK_FLASH_DEALS.slice(0, 4)

function WishlistItem({ item }: { item: typeof MOCK_WISHLIST[0] }) {
    const savings = item.originalPrice ? item.originalPrice - item.price : 0

    return (
        <div className="flex gap-4 bg-white border border-[var(--border-subtle)] rounded-xl p-4 hover:shadow-sm transition-shadow">
            {/* Image */}
            <Link href={`/product/${item.id}`} className="shrink-0 w-28 h-28 bg-zinc-50 rounded-lg overflow-hidden border border-[var(--border-subtle)]">
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={112}
                    height={112}
                    className="object-contain w-full h-full p-2 hover:scale-105 transition-transform duration-300"
                />
            </Link>

            {/* Details */}
            <div className="flex-1 min-w-0 space-y-1.5">
                <Link href={`/product/${item.id}`} className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--brand-blue)] line-clamp-2 leading-snug hover:underline">
                    {item.title}
                </Link>
                {item.badge && (
                    <span className="inline-block text-xs font-bold text-[var(--brand-blue)]">{item.badge}</span>
                )}

                {/* Price row */}
                <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-lg font-black text-[var(--text-primary)]">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                        <>
                            <span className="text-xs text-[var(--text-secondary)] line-through">${item.originalPrice.toFixed(2)}</span>
                            <span className="text-xs font-semibold text-[var(--price-green)]">Save ${savings.toFixed(2)}</span>
                        </>
                    )}
                </div>

                <p className="text-xs text-[var(--price-green)] font-medium">{item.fulfillment}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-end justify-between shrink-0 gap-2">
                <button
                    aria-label="Remove from wishlist"
                    className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                    <Trash2 size={15} />
                </button>
                <button className="h-9 px-4 rounded-full bg-[var(--brand-blue)] text-white text-xs font-bold hover:bg-[var(--brand-blue-dark)] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                    <ShoppingCart size={13} /> Add to cart
                </button>
            </div>
        </div>
    )
}

export default async function WishlistPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login?next=/wishlist')

    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-[var(--text-primary)]">Wishlist</h1>
                    <p className="text-sm text-[var(--text-secondary)] mt-0.5">{MOCK_WISHLIST.length} saved items</p>
                </div>
                <div className="flex items-center gap-2">
                    <Heart size={18} className="text-[var(--sale-red)] fill-[var(--sale-red)]" />
                    <span className="text-sm font-semibold text-[var(--text-secondary)]">My Wishlist</span>
                </div>
            </div>

            {MOCK_WISHLIST.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <Heart size={48} className="text-zinc-300 mb-4" />
                    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">Your wishlist is empty</h2>
                    <p className="text-sm text-[var(--text-secondary)] max-w-xs mb-6">
                        Tap the heart on any item to save it here for later.
                    </p>
                    <Link href="/" className="h-11 px-6 rounded-full bg-[var(--brand-blue)] text-white text-sm font-bold hover:bg-[var(--brand-blue-dark)] transition-colors">
                        Start shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {MOCK_WISHLIST.map((item) => (
                        <WishlistItem key={item.id} item={item} />
                    ))}
                </div>
            )}

            {/* You might also like */}
            <div className="mt-14">
                <ProductCarousel
                    title="You might also like"
                    subtitle="Based on your saved items"
                    viewAllHref="/deals"
                    products={[...MOCK_FLASH_DEALS].reverse()}
                />
            </div>
        </div>
    )
}
