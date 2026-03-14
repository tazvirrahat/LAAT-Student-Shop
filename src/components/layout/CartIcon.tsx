'use client'

import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export function CartIcon() {
    const getCartCount = useCartStore((state) => state.getCartCount)
    const getCartTotal = useCartStore((state) => state.getCartTotal)
    // Avoid hydration mismatch by only rendering the real data after mount
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const count = mounted ? getCartCount() : 0
    const total = mounted ? getCartTotal() : 0

    return (
        <Link
            href="/cart"
            aria-label="Shopping cart"
            className="flex items-center gap-1.5 px-2 lg:px-3 py-1 rounded hover:bg-[var(--brand-blue-dark)] transition-colors"
        >
            <div className="relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] bg-[var(--brand-yellow)] text-[var(--brand-blue-dark)] text-[11px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                    {count}
                </span>
            </div>
            <span className="text-[11px] font-bold hidden lg:block">${total.toFixed(2)}</span>
        </Link>
    )
}
