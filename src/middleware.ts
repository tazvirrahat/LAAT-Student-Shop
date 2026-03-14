import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { rateLimit } from '@/lib/rate-limit'

/**
 * Routes that require an authenticated session.
 * Defense-in-depth: pages also check server-side, but this is the first gate.
 */
const PROTECTED_PREFIXES = ['/dashboard', '/wishlist', '/orders', '/seller']

/**
 * Auth routes that are rate-limited to prevent brute force / enumeration.
 * Limit: 10 attempts per minute per IP.
 */
const RATE_LIMITED_PATHS = ['/login', '/auth/callback']

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // ── Rate limiting on auth endpoints ──────────────────────────────────────
    const isRateLimited = RATE_LIMITED_PATHS.some((p) => pathname.startsWith(p))
    if (isRateLimited) {
        // Get IP — respects Vercel/Cloudflare forwarding
        const ip =
            request.headers.get('x-real-ip') ??
            request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
            '127.0.0.1'

        const result = rateLimit(ip, { limit: 10, windowMs: 60_000 })

        if (!result.allowed) {
            return new NextResponse(
                JSON.stringify({ error: 'Too many requests. Please wait before trying again.' }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'Retry-After': String(Math.ceil((result.resetAt - Date.now()) / 1000)),
                    },
                }
            )
        }
    }

    // ── Supabase session refresh ──────────────────────────────────────────────
    const response = await updateSession(request)

    // ── Inject pathname header for Server Components ──────────────────────────
    // x-internal-pathname is clearly named as internal — must not be used for
    // security decisions (it's informational only for UI rendering).
    if (response instanceof NextResponse) {
        response.headers.set('x-internal-pathname', pathname)
        return response
    }

    const next = NextResponse.next()
    next.headers.set('x-internal-pathname', pathname)
    return next
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
