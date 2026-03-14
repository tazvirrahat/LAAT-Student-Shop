import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://laat-student-shop.com'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // Private routes — do not index
                disallow: [
                    '/dashboard',
                    '/cart',
                    '/wishlist',
                    '/orders',
                    '/seller',
                    '/api/',
                    '/auth/',
                ],
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
    }
}
