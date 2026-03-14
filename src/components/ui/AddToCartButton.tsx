'use client'

import { useCartStore } from '@/lib/store/cart'
import type { Product } from '@/lib/types/products'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem)
    const router = useRouter()

    const handleAction = (e: React.MouseEvent) => {
        e.preventDefault()
        if (product.hasOptions) {
            router.push(`/product/${product.id}`)
        } else {
            addItem(product, 1)
            toast.success('Added to cart', {
                description: product.title,
                action: {
                    label: 'View Cart',
                    onClick: () => router.push('/cart')
                }
            })
        }
    }

    return (
        <button
            onClick={handleAction}
            aria-label={product.hasOptions ? 'View options' : 'Add to cart'}
            className="self-start text-[12px] font-semibold text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-zinc-800 rounded-full px-3 py-1 transition-colors z-20 relative bg-white"
        >
            {product.hasOptions ? 'Options' : 'Add to cart'}
        </button>
    )
}
