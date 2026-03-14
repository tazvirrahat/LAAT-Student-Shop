/**
 * Analytics event helpers — thin wrapper around Vercel Analytics.
 *
 * Usage:
 *   import { track } from '@/lib/analytics'
 *   track('product_viewed', { product_id, category })
 *
 * These events power the e-commerce KPI dashboard:
 * - Conversion funnel: view → add_to_cart → purchase
 * - Listing quality metrics
 * - Search performance
 *
 * To enable: npm install @vercel/analytics
 * Then add <Analytics /> to root layout.tsx.
 */

type EventName =
    | 'product_viewed'
    | 'product_added_to_cart'
    | 'product_wishlisted'
    | 'listing_created'
    | 'listing_sold'
    | 'search_performed'
    | 'category_viewed'
    | 'checkout_started'
    | 'checkout_completed'
    | 'signup_completed'

type EventProperties = Record<string, string | number | boolean | undefined>

export function track(event: EventName, properties?: EventProperties): void {
    // Only runs client-side
    if (typeof window === 'undefined') return

    try {
        // Vercel Analytics (install: npm install @vercel/analytics)
        // import { track as vaTrack } from '@vercel/analytics'
        // vaTrack(event, properties)

        // Fallback: log in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics] ${event}`, properties)
        }
    } catch {
        // Never crash the app because of analytics
    }
}

/**
 * Convenience wrappers for critical e-commerce events
 */
export const analytics = {
    productViewed: (productId: string, category: string, price: number) =>
        track('product_viewed', { product_id: productId, category, price }),

    addedToCart: (productId: string, price: number) =>
        track('product_added_to_cart', { product_id: productId, price }),

    wishlisted: (productId: string) =>
        track('product_wishlisted', { product_id: productId }),

    listingCreated: (category: string, price: number) =>
        track('listing_created', { category, price }),

    searchPerformed: (query: string, resultsCount: number) =>
        track('search_performed', { query, results_count: resultsCount }),

    categoryViewed: (slug: string) =>
        track('category_viewed', { category: slug }),

    checkoutStarted: (cartTotal: number, itemCount: number) =>
        track('checkout_started', { cart_total: cartTotal, item_count: itemCount }),

    signupCompleted: () => track('signup_completed'),
}
