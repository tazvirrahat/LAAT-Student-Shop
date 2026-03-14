import Image from 'next/image'
import { HeroBannerCarousel } from '@/components/ui/HeroBannerCarousel'
import { ProductCarousel } from '@/components/ui/ProductCarousel'
import { BentoGrid } from '@/components/ui/BentoGrid'
import { MOCK_FLASH_DEALS, MOCK_HERO_BANNERS } from '@/lib/types/products'
import { getHomepageProducts, getHeroBanners } from '@/lib/data/products'
import Link from 'next/link'

// Product image tiles — matches Walmart's "Get it all right here" section
const CATEGORY_TILES = [
    {
        label: 'Textbooks',
        href: '/textbooks',
        imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=200&fit=crop',
    },
    {
        label: 'Laptops & Tech',
        href: '/tech',
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop',
    },
    {
        label: 'Dorm Furniture',
        href: '/dorm',
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
    },
    {
        label: 'Headphones',
        href: '/tech/headphones',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    },
    {
        label: 'Backpacks',
        href: '/fashion/bags',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
    },
    {
        label: 'Stationery',
        href: '/stationery',
        imageUrl: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=200&h=200&fit=crop',
    },
    {
        label: 'Food & Snacks',
        href: '/food',
        imageUrl: 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=200&h=200&fit=crop',
    },
    {
        label: 'Sports & Fitness',
        href: '/sports',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
    },
    {
        label: 'Desk Accessories',
        href: '/dorm/desk',
        imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&h=200&fit=crop',
    },
    {
        label: 'LAAT+',
        href: '/plus',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop',
    },
]

export default async function HomePage() {
    const [products, heroBanners] = await Promise.all([
        getHomepageProducts(12),
        getHeroBanners(),
    ])

    // Fall back to mock banners if CMS hero_banners table is empty / not yet seeded
    const banners = heroBanners.length > 0
        ? heroBanners.map(b => ({
            id: String(b.headline),
            headline: b.headline,
            subheadline: b.subheadline,
            ctaLabel: b.cta_label,
            ctaHref: b.cta_href,
            bgColor: b.bg_color,
            imageUrl: b.image_url,
        }))
        : MOCK_HERO_BANNERS

    return (
        <>
            <HeroBannerCarousel banners={banners} />
            <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 space-y-12 py-8">
                <ProductCarousel
                    title="Flash Deals"
                    subtitle="Up to 70% off — today only"
                    viewAllHref="/deals"
                    products={products}
                />
                <BentoGrid />

                {/* ── CATEGORY TILE ROW — Walmart "Get it all right here" pattern ── */}
                <section aria-labelledby="categories-heading">
                    <div className="flex items-baseline justify-between mb-4">
                        <h2 id="categories-heading" className="text-xl font-black text-[var(--text-primary)]">
                            Get it all right here
                        </h2>
                        <Link href="/departments" className="text-sm text-[var(--text-link)] hover:underline">
                            View all
                        </Link>
                    </div>

                    {/*
                    CSS Grid with minmax(80px, 1fr):
                    - On desktop: each column grows to fill equal 1fr of the full container — no empty space.
                    - On mobile (< container width / 10 cols): overflows and scrolls horizontally.
                    - This is the exact technique Walmart uses for their category tile row.
                  */}
                    <div className="overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                        <div
                            className="grid gap-2 pb-1"
                            style={{
                                gridTemplateColumns: `repeat(${CATEGORY_TILES.length}, minmax(80px, 1fr))`,
                                minWidth: `${CATEGORY_TILES.length * 88}px`,
                            }}
                        >
                            {CATEGORY_TILES.map(({ label, href, imageUrl }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="flex flex-col items-center gap-2 group"
                                >
                                    {/* White square tile with product image */}
                                    <div className="w-full aspect-square bg-white border border-[var(--border-subtle)] rounded-[var(--radius-card)] overflow-hidden group-hover:border-[var(--brand-blue)] group-hover:shadow-md transition-all duration-200">
                                        <Image
                                            src={imageUrl}
                                            alt={label}
                                            width={120}
                                            height={120}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <span className="text-[12px] sm:text-[13px] font-medium text-[var(--text-primary)] group-hover:text-[var(--brand-blue)] transition-colors text-center leading-tight line-clamp-2 w-full">
                                        {label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <ProductCarousel
                    title="Recommended for you"
                    subtitle="Based on popular student picks"
                    viewAllHref="/recommended"
                    products={[...MOCK_FLASH_DEALS].reverse()}
                />
            </div>
        </>
    )
}
