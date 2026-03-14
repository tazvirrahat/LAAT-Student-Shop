'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/**
 * Global error boundary — catches unhandled errors in the (shop) layout tree.
 * Displayed when a component throws unexpectedly (NOT for 404s — use not-found.tsx).
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log to your error monitoring service here (e.g. Sentry)
        console.error('[GlobalError]', error)
    }, [error])

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c7001e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            </div>
            <h1 className="text-xl font-black text-[var(--text-primary)] mb-2">
                Something went wrong
            </h1>
            <p className="text-sm text-[var(--text-secondary)] max-w-xs mb-6">
                We&apos;re sorry — an unexpected error occurred. Our team has been notified.
            </p>
            {process.env.NODE_ENV === 'development' && (
                <pre className="text-xs text-left bg-zinc-100 border border-zinc-200 rounded-lg p-4 mb-6 max-w-lg overflow-auto">
                    {error.message}{error.digest ? `\n\nDigest: ${error.digest}` : ''}
                </pre>
            )}
            <div className="flex gap-3 flex-wrap justify-center">
                <button
                    onClick={reset}
                    className="h-10 px-5 rounded-full bg-[var(--brand-blue)] text-white text-sm font-bold hover:bg-[var(--brand-blue-dark)] transition-colors"
                >
                    Try again
                </button>
                <Link
                    href="/"
                    className="h-10 px-5 rounded-full border border-[var(--border-input)] text-sm font-bold text-[var(--text-primary)] hover:bg-zinc-50 transition-colors"
                >
                    Go home
                </Link>
            </div>
        </div>
    )
}
