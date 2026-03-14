import Link from 'next/link'
import { ShoppingCart, User, Heart } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { MobileMenu } from './MobileMenu'
import { DepartmentsMegaMenu } from './DepartmentsMegaMenu'
import { CartIcon } from './CartIcon'

const NAV_LINKS = [
    { href: '/deals', label: 'Rollbacks & More' },
    { href: '/new', label: 'New Arrivals' },
    { href: '/textbooks', label: 'Textbooks' },
    { href: '/tech', label: 'Tech & Electronics' },
    { href: '/dorm', label: 'Dorm Essentials' },
    { href: '/campus-pickup', label: 'Campus Pickup' },
    { href: '/fashion', label: 'Fashion' },
    { href: '/food', label: 'Food & Groceries' },
    { href: '/plus', label: 'LAAT+' },
]

/**
 * Full retail navigation header — Walmart.com pixel-perfect recreation.
 *
 * Mobile-first responsive breakpoints:
 *  - xs/sm: Hamburger + logo + search bar + cart
 *  - md:    + fulfillment picker
 *  - lg:    Full layout with text labels on all icon-buttons
 */
export async function FullHeader() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <header className="sticky top-0 z-50 w-full shadow-sm">

            {/* ── TOP BLUE BAR ────────────────────────────────────────────────── */}
            <div className="bg-[var(--brand-blue)] text-white">
                <div className="max-w-[1536px] mx-auto px-3 sm:px-4 h-14 flex items-center gap-2 sm:gap-3">

                    {/* Mobile hamburger */}
                    <MobileMenu />

                    {/* Logo */}
                    <Link
                        href="/"
                        aria-label="LAAT Student Shop — Home"
                        className="shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <circle cx="24" cy="24" r="22" fill="#ffc220" />
                            <path d="M14 16h2l3 10h10l2-7H17" stroke="#0071ce" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            <circle cx="20" cy="29" r="1.8" fill="#0071ce" />
                            <circle cx="27" cy="29" r="1.8" fill="#0071ce" />
                        </svg>
                        <span className="hidden md:block text-base font-bold tracking-tight text-white leading-none">
                            LAAT<br />
                            <span className="text-[var(--brand-yellow)] text-xs font-normal">Student Shop</span>
                        </span>
                    </Link>

                    {/* Fulfillment Picker */}
                    <button
                        aria-label="Change delivery or pickup location"
                        className="hidden md:flex shrink-0 items-center gap-1.5 bg-[var(--brand-blue-dark)] hover:bg-black/30 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors min-w-[130px] max-w-[180px]"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        <div className="text-left overflow-hidden min-w-0">
                            <div className="text-[10px] font-normal opacity-75 whitespace-nowrap">Pickup or delivery?</div>
                            <div className="truncate font-bold text-xs">Your campus</div>
                        </div>
                    </button>

                    {/* Search bar — a form that submits to /search?q= */}
                    <form action="/search" method="GET" role="search" className="flex-1 min-w-0">
                        <div className="relative flex items-center">
                            <input
                                type="search"
                                name="q"
                                placeholder="Search everything for students..."
                                aria-label="Search products"
                                className="w-full h-10 pl-4 pr-12 rounded-full text-[var(--text-primary)] text-sm border-0 outline-none focus:ring-2 focus:ring-[var(--brand-yellow)] bg-white placeholder:text-[var(--text-secondary)]"
                            />
                            <button
                                type="submit"
                                aria-label="Search"
                                className="absolute right-1 w-8 h-8 flex items-center justify-center bg-[var(--brand-blue-dark)] hover:bg-black text-white rounded-full transition-colors"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Right utility icons */}
                    <nav className="flex items-center shrink-0 gap-1" aria-label="Utility navigation">

                        {/* Sell CTA — primary seller acquisition button */}
                        <Link
                            href="/sell"
                            aria-label="Sell an item"
                            className="hidden sm:flex items-center gap-1.5 h-8 px-4 rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-dark)] text-xs font-black hover:bg-amber-400 transition-colors shrink-0"
                        >
                            + Sell
                        </Link>

                        {/* Wishlist */}
                        <Link

                            href="/wishlist"
                            aria-label="My Items wishlist"
                            className="hidden sm:flex flex-col items-center px-2 lg:px-3 py-1 rounded hover:bg-[var(--brand-blue-dark)] transition-colors"
                        >
                            <Heart size={22} />
                            <span className="text-[10px] hidden lg:block mt-0.5 leading-none opacity-90">Reorder</span>
                            <span className="text-[11px] font-bold hidden lg:block leading-none">My Items</span>
                        </Link>

                        {/* Account */}
                        <Link
                            href={user ? '/dashboard' : '/login'}
                            aria-label={user ? 'Account dashboard' : 'Sign in'}
                            className="flex flex-col items-center px-2 lg:px-3 py-1 rounded hover:bg-[var(--brand-blue-dark)] transition-colors"
                        >
                            <User size={22} />
                            <span className="text-[10px] hidden lg:block mt-0.5 leading-none opacity-90">
                                {user ? 'Hi, there' : 'Sign In'}
                            </span>
                            <span className="text-[11px] font-bold hidden lg:block leading-none">Account</span>
                        </Link>

                        <CartIcon />
                    </nav>
                </div>
            </div>

            {/* ── SECONDARY WHITE NAV BAR — hidden on mobile (hamburger handles it) ── */}
            <div className="hidden sm:block bg-white border-b border-[var(--border-subtle)]">
                <div className="max-w-[1536px] mx-auto px-3 sm:px-4 h-10 flex items-center">

                    {/* Departments mega-menu button */}
                    <DepartmentsMegaMenu />

                    {/* Scrollable category pills */}
                    <nav
                        aria-label="Category navigation"
                        className="flex items-center gap-0.5 overflow-x-auto hide-scrollbar h-full flex-1 min-w-0"
                    >
                        {NAV_LINKS.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className="shrink-0 text-[13px] font-medium text-[var(--text-primary)] px-2.5 py-1 rounded-full hover:bg-zinc-100 active:bg-zinc-200 transition-colors whitespace-nowrap"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

        </header>
    )
}
