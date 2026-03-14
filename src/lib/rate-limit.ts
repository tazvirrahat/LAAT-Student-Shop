/**
 * In-memory rate limiter for auth routes.
 *
 * Used in Next.js middleware to prevent:
 * - Brute-force login attempts
 * - Auth code guessing on /auth/callback
 * - Signup flooding
 *
 * PRODUCTION NOTE: This in-memory store resets on every cold start/serverless
 * spawn — for production, replace the `store` Map with a Redis/Upstash store.
 * Example: https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
 */

interface RateLimitEntry {
    count: number
    resetAt: number
}

// Simple sliding window store — keyed by IP
const store = new Map<string, RateLimitEntry>()

interface RateLimitOptions {
    /** Maximum allowed requests per window */
    limit: number
    /** Window size in milliseconds */
    windowMs: number
}

interface RateLimitResult {
    allowed: boolean
    remaining: number
    resetAt: number
}

export function rateLimit(ip: string, opts: RateLimitOptions): RateLimitResult {
    const now = Date.now()
    const entry = store.get(ip)

    // Entry expired — reset
    if (!entry || now > entry.resetAt) {
        const newEntry: RateLimitEntry = { count: 1, resetAt: now + opts.windowMs }
        store.set(ip, newEntry)
        return { allowed: true, remaining: opts.limit - 1, resetAt: newEntry.resetAt }
    }

    // Within window
    entry.count++
    store.set(ip, entry)

    const remaining = Math.max(0, opts.limit - entry.count)
    return {
        allowed: entry.count <= opts.limit,
        remaining,
        resetAt: entry.resetAt,
    }
}

// Prune expired entries every 10 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now()
        for (const [key, entry] of store.entries()) {
            if (now > entry.resetAt) store.delete(key)
        }
    }, 10 * 60 * 1000)
}
