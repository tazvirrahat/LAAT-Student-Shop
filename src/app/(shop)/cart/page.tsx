import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { MOCK_FLASH_DEALS } from '@/lib/types/products'
import { ProductCarousel } from '@/components/ui/ProductCarousel'
import { CartView } from '@/components/cart/CartView'

export const metadata: Metadata = {
    title: 'Cart',
    description: 'Review your cart and checkout securely.',
}

export default function CartPage() {

    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-6">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-[var(--text-secondary)] mb-6">
                <Link href="/" className="hover:text-[var(--brand-blue)] hover:underline">Home</Link>
                <ChevronRight size={12} />
                <span className="text-[var(--text-primary)]">Cart</span>
            </nav>

            <h1 className="text-2xl font-black text-[var(--text-primary)] mb-6">Cart</h1>

            <CartView />

            {/* Recently viewed */}
            <div className="mt-12">
                <ProductCarousel
                    title="Recently viewed"
                    subtitle=""
                    viewAllHref="/deals"
                    products={[...MOCK_FLASH_DEALS].reverse()}
                />
            </div>
        </div>
    )
}
