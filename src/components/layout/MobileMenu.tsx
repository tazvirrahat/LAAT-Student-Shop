'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ChevronDown, Grid2X2 } from 'lucide-react'

const NAV_LINKS = [
    { href: '/deals', label: 'Rollbacks & More' },
    { href: '/new', label: 'New Arrivals' },
    { href: '/textbooks', label: 'Textbooks' },
    { href: '/tech', label: 'Tech & Electronics' },
    { href: '/dorm', label: 'Dorm Essentials' },
    { href: '/campus-pickup', label: 'Campus Pickup' },
    { href: '/fashion', label: 'Fashion' },
    { href: '/food', label: 'Food & Groceries' },
    { href: '/sports', label: 'Sports' },
    { href: '/plus', label: 'LAAT+' },
]

/**
 * Client component handling:
 * - Hamburger menu toggle (mobile)
 * - Mobile search overlay toggle
 * - Full-screen slide-in sidebar nav
 */
export function MobileMenu() {
    const [open, setOpen] = useState(false)

    return (
        <>
            {/* Hamburger button — only visible on mobile */}
            <button
                onClick={() => setOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={open}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded hover:bg-[var(--brand-blue-dark)] transition-colors text-white shrink-0"
            >
                <Menu size={22} />
            </button>

            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-[60] bg-black/50"
                    onClick={() => setOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Slide-in sidebar */}
            <div
                role="dialog"
                aria-label="Navigation menu"
                aria-modal="true"
                className={`fixed top-0 left-0 z-[70] h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${open ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Sidebar header */}
                <div className="flex items-center justify-between bg-[var(--brand-blue)] text-white px-4 h-14 shrink-0">
                    <span className="font-bold text-base">Hello, Sign In</span>
                    <button
                        onClick={() => setOpen(false)}
                        aria-label="Close navigation menu"
                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-[var(--brand-blue-dark)] transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Search inside drawer */}
                <form action="/search" method="GET" role="search" className="px-4 py-3 border-b border-[var(--border-subtle)]">
                    <div className="relative flex items-center">
                        <input
                            type="search"
                            name="q"
                            placeholder="Search everything for students..."
                            aria-label="Search products"
                            className="w-full h-10 pl-4 pr-12 rounded-full text-sm border border-[var(--border-input)] outline-none focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-[var(--brand-blue)]/20 bg-white"
                        />
                        <button
                            type="submit"
                            aria-label="Search"
                            className="absolute right-1 w-8 h-8 flex items-center justify-center bg-[var(--brand-blue-dark)] text-white rounded-full"
                        >
                            <Search size={14} />
                        </button>
                    </div>
                </form>


                {/* Department heading */}
                <div className="px-4 py-3 border-b border-[var(--border-subtle)] flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                    <Grid2X2 size={16} />
                    Departments
                </div>

                {/* Nav links */}
                <nav className="flex-1 overflow-y-auto" aria-label="Mobile category navigation">
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-between px-4 py-3.5 text-sm font-medium text-[var(--text-primary)] hover:bg-zinc-50 border-b border-[var(--border-subtle)] transition-colors"
                        >
                            {label}
                            <ChevronDown size={14} className="-rotate-90 text-[var(--text-secondary)]" />
                        </Link>
                    ))}
                </nav>

                {/* Sign in CTA */}
                <div className="p-4 border-t border-[var(--border-subtle)] shrink-0">
                    <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                        className="block w-full text-center py-2.5 rounded-full bg-[var(--brand-blue)] text-white text-sm font-bold hover:bg-[var(--brand-blue-dark)] transition-colors"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </>
    )
}
