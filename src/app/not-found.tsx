import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Page not found',
}

/**
 * Global 404 page — rendered for any unmatched route.
 */
export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
            <p className="text-8xl font-black text-[var(--brand-blue)] mb-2 leading-none select-none">
                404
            </p>
            <h1 className="text-2xl font-black text-[var(--text-primary)] mb-2">
                Page not found
            </h1>
            <p className="text-sm text-[var(--text-secondary)] max-w-xs mb-8">
                The page you&apos;re looking for doesn&apos;t exist or may have moved.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
                <Link
                    href="/"
                    className="h-11 px-6 rounded-full bg-[var(--brand-blue)] text-white text-sm font-bold hover:bg-[var(--brand-blue-dark)] transition-colors"
                >
                    Back to home
                </Link>
                <Link
                    href="/deals"
                    className="h-11 px-6 rounded-full border border-[var(--border-input)] text-sm font-bold text-[var(--text-primary)] hover:bg-zinc-50 transition-colors"
                >
                    Browse deals
                </Link>
            </div>

            {/* Suggested links */}
            <div className="mt-10 text-sm text-[var(--text-secondary)]">
                <p className="mb-2 font-medium">Popular pages</p>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                    {[
                        ['Textbooks', '/textbooks'],
                        ['Tech & Electronics', '/tech'],
                        ['Dorm Essentials', '/dorm'],
                        ['Cart', '/cart'],
                        ['My Account', '/dashboard'],
                    ].map(([label, href]) => (
                        <Link key={href} href={href} className="text-[var(--text-link)] hover:underline">
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
