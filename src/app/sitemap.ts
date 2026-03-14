import type { MetadataRoute } from 'next'

/**
 * Dynamic sitemap — Next.js will serve this at /sitemap.xml.
 * Add Supabase product/category queries here to include all dynamic routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://laat-student-shop.com'
    const now = new Date()

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
        { url: `${baseUrl}/deals`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/textbooks`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/tech`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/dorm`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/fashion`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/food`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/sports`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/campus-pickup`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
        { url: `${baseUrl}/new`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    ]

    // TODO: Add dynamic product pages from Supabase:
    // const products = await supabase.from('products').select('id, updated_at')
    // const productRoutes = products.data?.map(p => ({
    //   url: `${baseUrl}/product/${p.id}`,
    //   lastModified: new Date(p.updated_at),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.6,
    // })) ?? []
    // return [...staticRoutes, ...productRoutes]

    return staticRoutes
}
