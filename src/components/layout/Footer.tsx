import Link from 'next/link'

const FOOTER_LINKS = {
    'Shop': [
        { label: 'Textbooks & Course Materials', href: '/textbooks' },
        { label: 'Tech & Electronics', href: '/tech' },
        { label: 'Dorm Essentials', href: '/dorm' },
        { label: 'Fashion & Accessories', href: '/fashion' },
        { label: 'Sports & Fitness', href: '/sports' },
        { label: 'Food & Groceries', href: '/food' },
    ],
    'Services': [
        { label: 'Campus Pickup', href: '/campus-pickup' },
        { label: 'Student Deals & Rollbacks', href: '/deals' },
        { label: 'LAAT+ Membership', href: '/plus' },
        { label: 'Gift Cards', href: '/gift-cards' },
        { label: 'Sell on LAAT', href: '/sell' },
    ],
    'Help': [
        { label: 'Help Center', href: '/help' },
        { label: 'Track an Order', href: '/orders' },
        { label: 'Returns & Refunds', href: '/returns' },
        { label: 'Buyer Protection', href: '/buyer-protection' },
        { label: 'Community Guidelines', href: '/guidelines' },
    ],
    'Company': [
        { label: 'About LAAT', href: '/about' },
        { label: 'Become a Verified Seller', href: '/sellers' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
        { label: 'Affiliate Program', href: '/affiliate' },
    ],
}

export function Footer() {
    return (
        <footer className="bg-[var(--text-primary)] text-white/80 mt-16">

            {/* Feedback band */}
            <div className="border-b border-white/10 py-6">
                <div className="max-w-[1536px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-medium">We'd love to hear what you think!</p>
                    <Link
                        href="/feedback"
                        className="text-sm font-bold px-6 py-2 rounded-full border border-white/40 hover:bg-white/10 transition-colors"
                    >
                        Give feedback
                    </Link>
                </div>
            </div>

            {/* Link grid */}
            <div className="max-w-[1536px] mx-auto px-4 py-10">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                    {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="text-white text-sm font-bold mb-4">{category}</h3>
                            <ul className="space-y-2.5">
                                {links.map(({ label, href }) => (
                                    <li key={href}>
                                        <Link href={href} className="text-xs text-white/70 hover:text-white hover:underline transition-colors">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Legal bar */}
            <div className="border-t border-white/10 py-5">
                <div className="max-w-[1536px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
                    <p>© {new Date().getFullYear()} LAAT Student Shop, Inc. All rights reserved.</p>
                    <nav className="flex flex-wrap gap-x-5 gap-y-1 justify-center sm:justify-end">
                        {[
                            ['Privacy Policy', '/legal/privacy'],
                            ['Terms of Use', '/legal/terms'],
                            ['CA Privacy Rights', '/legal/ca-privacy'],
                            ['Your Privacy Choices', '/legal/privacy-choices'],
                            ['Accessibility', '/legal/accessibility'],
                        ].map(([l, href]) => (
                            <Link key={l} href={href} className="hover:text-white/80 hover:underline transition-colors">
                                {l}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

        </footer>
    )
}
