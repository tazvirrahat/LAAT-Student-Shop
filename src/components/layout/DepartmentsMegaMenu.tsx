'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Grid2X2, ChevronDown, ChevronRight } from 'lucide-react'

const DEPARTMENTS = [
    {
        heading: 'Campus Essentials',
        links: [
            { label: 'Textbooks', href: '/textbooks', emoji: '📚' },
            { label: 'Stationery & Supplies', href: '/stationery', emoji: '✏️' },
            { label: 'Campus Pickup', href: '/campus-pickup', emoji: '🏫' },
            { label: 'Student ID Deals', href: '/id-deals', emoji: '🪪' },
        ],
    },
    {
        heading: 'Tech & Electronics',
        links: [
            { label: 'Laptops', href: '/tech/laptops', emoji: '💻' },
            { label: 'Headphones & Audio', href: '/tech/headphones', emoji: '🎧' },
            { label: 'Tablets', href: '/tech/tablets', emoji: '📱' },
            { label: 'Monitors', href: '/tech/monitors', emoji: '🖥️' },
            { label: 'Accessories', href: '/tech/accessories', emoji: '🔌' },
        ],
    },
    {
        heading: 'Dorm & Living',
        links: [
            { label: 'Furniture', href: '/dorm/furniture', emoji: '🛏️' },
            { label: 'Desk Setups', href: '/dorm/desk', emoji: '🪑' },
            { label: 'Bedding', href: '/dorm/bedding', emoji: '🛋️' },
            { label: 'Kitchen', href: '/dorm/kitchen', emoji: '🍳' },
            { label: 'Storage', href: '/dorm/storage', emoji: '📦' },
        ],
    },
    {
        heading: 'Fashion & Lifestyle',
        links: [
            { label: 'Backpacks & Bags', href: '/fashion/bags', emoji: '🎒' },
            { label: 'Clothing', href: '/fashion/clothing', emoji: '👕' },
            { label: 'Shoes', href: '/fashion/shoes', emoji: '👟' },
            { label: 'Accessories', href: '/fashion/accessories', emoji: '⌚' },
        ],
    },
    {
        heading: 'Health & Sports',
        links: [
            { label: 'Sports Equipment', href: '/sports', emoji: '⚽' },
            { label: 'Fitness', href: '/sports/fitness', emoji: '🏋️' },
            { label: 'Health & Wellness', href: '/health', emoji: '💊' },
        ],
    },
    {
        heading: 'Food & Grocery',
        links: [
            { label: 'Snacks & Drinks', href: '/food/snacks', emoji: '🍿' },
            { label: 'Study Fuel', href: '/food/study', emoji: '☕' },
        ],
    },
]

/**
 * Departments mega-menu dropdown.
 * Opens on hover (desktop) and on click (all screens).
 * Uses focus-trap-like click-outside to close.
 */
export function DepartmentsMegaMenu() {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // Close on click outside
    useEffect(() => {
        if (!open) return
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [open])

    // Close on Escape key
    useEffect(() => {
        if (!open) return
        function handleKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpen(false)
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [open])

    return (
        <div ref={ref} className="relative">
            <button
                aria-haspopup="true"
                aria-expanded={open}
                aria-label="Browse all departments"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1.5 text-[13px] font-bold text-[var(--text-primary)] px-3 h-10 hover:bg-zinc-100 transition-colors shrink-0 border-r border-[var(--border-subtle)] mr-2"
            >
                <Grid2X2 size={15} />
                <span className="hidden md:inline">Departments</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega-menu panel */}
            {open && (
                <div
                    role="dialog"
                    aria-label="All departments"
                    className="absolute top-full left-0 z-50 mt-1 w-[720px] max-w-[90vw] bg-white border border-[var(--border-subtle)] rounded-xl shadow-2xl p-6 grid grid-cols-2 md:grid-cols-3 gap-6"
                >
                    {DEPARTMENTS.map(({ heading, links }) => (
                        <div key={heading}>
                            <h3 className="text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-2 border-b border-[var(--border-subtle)] pb-1.5">
                                {heading}
                            </h3>
                            <ul className="space-y-1.5">
                                {links.map(({ label, href, emoji }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            onClick={() => setOpen(false)}
                                            className="flex items-center gap-2 text-sm text-[var(--text-primary)] hover:text-[var(--brand-blue)] group transition-colors py-0.5"
                                        >
                                            <span className="text-base">{emoji}</span>
                                            <span className="group-hover:underline leading-snug">{label}</span>
                                            <ChevronRight size={11} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[var(--brand-blue)]" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Footer */}
                    <div className="col-span-full border-t border-[var(--border-subtle)] pt-3 flex justify-between items-center">
                        <Link
                            href="/departments"
                            onClick={() => setOpen(false)}
                            className="text-sm font-bold text-[var(--brand-blue)] hover:underline"
                        >
                            View all departments →
                        </Link>
                        <Link
                            href="/plus"
                            onClick={() => setOpen(false)}
                            className="text-sm font-bold bg-[var(--brand-yellow)] text-[var(--brand-blue-dark)] px-4 py-1.5 rounded-full hover:bg-amber-400 transition-colors"
                        >
                            ⭐ LAAT+
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
