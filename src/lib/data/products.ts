import { createClient } from '@/utils/supabase/server'
import type { Product } from '@/lib/types/products'
import { MOCK_FLASH_DEALS } from '@/lib/types/products'

// ── Database row type (matches Supabase schema) ────────────────────────────
interface DBProduct {
    id: string
    title: string
    description: string
    price: number
    original_price: number | null
    condition: string
    category_slug: string
    status: string
    is_featured: boolean
    view_count: number
    created_at: string
    seller_id: string
    product_images: { url: string; sort_order: number }[]
    profiles: { display_name: string | null; campus: string | null } | null
}

function dbToProduct(row: DBProduct): Product {
    const images = (row.product_images ?? []).sort((a, b) => a.sort_order - b.sort_order)
    return {
        id: row.id,
        title: row.title,
        price: row.price,
        originalPrice: row.original_price ?? undefined,
        imageUrl: images[0]?.url ?? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        rating: 4.3, // Will be computed from reviews table
        reviewCount: 0,
        badge: row.is_featured ? 'Best Seller' : undefined,
        fulfillment: 'Free delivery',
        hasOptions: false,
    }
}

// ── Query: Fetch active products for homepage ──────────────────────────────
export async function getHomepageProducts(limit = 12): Promise<Product[]> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('products')
            .select(`
        *,
        product_images(url, sort_order),
        profiles(display_name, campus)
      `)
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(limit)

        if (error || !data) return MOCK_FLASH_DEALS
        return data.map(dbToProduct)
    } catch {
        // Graceful fallback to mock data during development
        return MOCK_FLASH_DEALS
    }
}

// ── Query: Fetch products by category ─────────────────────────────────────
export async function getProductsByCategory(
    categorySlug: string,
    options?: { orderBy?: 'price_asc' | 'price_desc' | 'newest'; limit?: number }
): Promise<Product[]> {
    try {
        const supabase = await createClient()

        let query = supabase
            .from('products')
            .select('*, product_images(url, sort_order)')
            .eq('status', 'active')
            .eq('category_slug', categorySlug)

        if (options?.orderBy === 'price_asc') query = query.order('price', { ascending: true })
        else if (options?.orderBy === 'price_desc') query = query.order('price', { ascending: false })
        else query = query.order('created_at', { ascending: false })

        query = query.limit(options?.limit ?? 24)

        const { data, error } = await query
        if (error || !data) return MOCK_FLASH_DEALS
        return data.map(dbToProduct)
    } catch {
        return MOCK_FLASH_DEALS
    }
}

// ── Query: Full-text search ────────────────────────────────────────────────
export async function searchProducts(q: string, limit = 24): Promise<Product[]> {
    if (!q.trim()) return getHomepageProducts(limit)

    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('products')
            .select('*, product_images(url, sort_order)')
            .eq('status', 'active')
            .textSearch('title', q, { type: 'websearch' })
            .limit(limit)

        if (error || !data) {
            // Fallback: simple title-match on mock data
            return MOCK_FLASH_DEALS.filter((p) =>
                p.title.toLowerCase().includes(q.toLowerCase())
            )
        }
        return data.map(dbToProduct)
    } catch {
        return MOCK_FLASH_DEALS.filter((p) =>
            p.title.toLowerCase().includes(q.toLowerCase())
        )
    }
}

// ── Query: Single product ──────────────────────────────────────────────────
export async function getProduct(id: string): Promise<Product | null> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('products')
            .select('*, product_images(url, sort_order), profiles(display_name, campus)')
            .eq('id', id)
            .eq('status', 'active')
            .single()

        if (error || !data) {
            return MOCK_FLASH_DEALS.find((p) => p.id === id) ?? null
        }

        // Increment view count (fire-and-forget — no await needed)
        void supabase.rpc('increment_view_count', { product_id: id })

        return dbToProduct(data as DBProduct)
    } catch {
        return MOCK_FLASH_DEALS.find((p) => p.id === id) ?? null
    }
}

// ── Query: Hero banners (CMS-managed) ─────────────────────────────────────
export interface HeroBannerRow {
    headline: string
    subheadline?: string
    cta_label: string
    cta_href: string
    image_url: string
    bg_color: string
}

export async function getHeroBanners(): Promise<HeroBannerRow[]> {
    try {
        const supabase = await createClient()
        const now = new Date().toISOString()
        const { data, error } = await supabase
            .from('hero_banners')
            .select('*')
            .eq('is_active', true)
            .or(`starts_at.is.null,starts_at.lte.${now}`)
            .or(`ends_at.is.null,ends_at.gte.${now}`)
            .order('sort_order')

        if (error || !data?.length) return []
        return data
    } catch {
        return []
    }
}
