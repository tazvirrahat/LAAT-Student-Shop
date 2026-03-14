import Image from 'next/image'
import Link from 'next/link'

interface BentoTile {
    id: string
    title: string
    subtitle?: string
    ctaLabel: string
    ctaHref: string
    imageUrl: string
    span?: 'full' | 'half' | 'third' // layout span
    dark?: boolean // dark text or light text
}

const STUDENT_PROMO_TILES: BentoTile[] = [
    {
        id: '1',
        title: 'Tires & oil — sorted before that road trip',
        subtitle: 'Book auto services easily online',
        ctaLabel: 'Shop Textbooks',
        ctaHref: '/textbooks',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=500&fit=crop',
        span: 'half',
        dark: true,
    },
    {
        id: '2',
        title: 'Meds & allergy delivered in 1 hour',
        subtitle: 'For spring symptoms & more',
        ctaLabel: 'Get started',
        ctaHref: '/health',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=500&fit=crop',
        span: 'half',
        dark: true,
    },
    {
        id: '3',
        title: 'New student? Earn 3% cash back',
        ctaLabel: 'Learn more',
        ctaHref: '/plus',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
        span: 'third',
        dark: false,
    },
    {
        id: '4',
        title: 'Start spring with fresh dorm decor',
        ctaLabel: 'Shop now',
        ctaHref: '/dorm',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop',
        span: 'third',
        dark: true,
    },
    {
        id: '5',
        title: 'Final exams prep — study tools from $4',
        ctaLabel: 'Shop study',
        ctaHref: '/study',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop',
        span: 'third',
        dark: true,
    },
]

function BentoTileCard({ tile }: { tile: BentoTile }) {
    return (
        <Link
            href={tile.ctaHref}
            className="group relative overflow-hidden rounded-[var(--radius-card)] block"
            style={{ minHeight: 220 }}
        >
            <Image
                src={tile.imageUrl}
                alt={tile.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            {/* Content */}
            <div className={`absolute bottom-0 left-0 right-0 p-5 ${tile.dark ? 'text-white' : 'text-white'}`}>
                {tile.subtitle && <p className="text-xs font-medium mb-1 opacity-90">{tile.subtitle}</p>}
                <h3 className="text-lg font-black leading-tight mb-3 max-w-xs">{tile.title}</h3>
                <span className="inline-flex items-center text-sm font-bold border border-white/80 text-white px-4 py-1.5 rounded-full group-hover:bg-white group-hover:text-[var(--text-primary)] transition-colors">
                    {tile.ctaLabel}
                </span>
            </div>
        </Link>
    )
}

export function BentoGrid() {
    const [large, ...rest] = STUDENT_PROMO_TILES
    const [m1, m2, ...smalls] = rest

    return (
        <section aria-label="Promotional highlights" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Row 1: Two half tiles */}
                <BentoTileCard tile={large} />
                <BentoTileCard tile={m1} />

                {/* Row 2: Optionally a second medium + small tiles */}
                {m2 && (
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <BentoTileCard tile={m2} />
                        {smalls.map(t => <BentoTileCard key={t.id} tile={t} />)}
                    </div>
                )}
            </div>
        </section>
    )
}
