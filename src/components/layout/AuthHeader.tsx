import Link from 'next/link'

/**
 * Minimal header shown exclusively on auth pages (login, signup).
 * Matches Walmart's distraction-free auth pattern: centered logo only, no navigation.
 */
export function AuthHeader() {
    return (
        <header className="w-full bg-white py-6 flex justify-center border-b border-[var(--border-subtle)]">
            <Link href="/" aria-label="LAAT Student Shop — Home">
                {/* Walmart-style Spark "burst" logo — using our yellow + blue brand */}
                <div className="flex items-center gap-2">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        {/* Spark burst shape */}
                        <circle cx="24" cy="24" r="20" fill="#0071ce" />
                        {/* Simple shopping cart symbol inside */}
                        <path d="M14 16h2l3 10h10l2-7H17" stroke="#ffc220" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <circle cx="20" cy="29" r="1.5" fill="#ffc220" />
                        <circle cx="27" cy="29" r="1.5" fill="#ffc220" />
                    </svg>
                    <span className="text-[var(--brand-blue)] font-bold text-xl tracking-tight">LAAT Shop</span>
                </div>
            </Link>
        </header>
    )
}
