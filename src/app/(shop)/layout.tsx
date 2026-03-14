import { FullHeader } from '@/components/layout/FullHeader'
import { Footer } from '@/components/layout/Footer'

/**
 * Layout for all main shop pages (homepage, product listing, cart, etc.)
 * Provides the global FullHeader and Footer.
 */
export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <FullHeader />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}
