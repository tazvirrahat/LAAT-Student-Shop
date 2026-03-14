import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

/**
 * Validates that a redirect path is a safe relative path on this origin.
 * Prevents open-redirect attacks where an attacker crafts a magic-link URL
 * with &next=https://phishing.site to hijack the post-auth redirect.
 */
function isSafeRelativePath(path: string): boolean {
    return path.startsWith('/') && !path.startsWith('//')
}

/**
 * Validates the x-forwarded-host header to prevent host header injection.
 * Only trusts the forwarded host if it matches our known site URL.
 */
function isTrustedHost(host: string): boolean {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    if (!siteUrl) return false
    try {
        const allowedHost = new URL(siteUrl).hostname
        return host === allowedHost
    } catch {
        return false
    }
}

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    // Validate `next` — only allow safe relative paths on our own origin
    const rawNext = searchParams.get('next') ?? '/'
    const next = isSafeRelativePath(rawNext) ? rawNext : '/'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost && isTrustedHost(forwardedHost)) {
                // Only trust x-forwarded-host if it matches our known domain
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        }

        // Log auth failures server-side for monitoring
        console.error('[auth/callback] exchangeCodeForSession failed:', error.message)
    }

    return NextResponse.redirect(`${origin}/login?error=Invalid+or+expired+magic+link`)
}

