/**
 * Environment variable validation — runs at startup.
 * If any required variable is missing, the app crashes immediately with a
 * clear message rather than failing silently at runtime.
 *
 * Import this in your root layout.tsx to enforce it on every cold start.
 */

const REQUIRED_ENV = {
    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as const

type EnvKey = keyof typeof REQUIRED_ENV

function validateEnv() {
    const missing: EnvKey[] = []

    for (const [key, value] of Object.entries(REQUIRED_ENV) as [EnvKey, string | undefined][]) {
        if (!value || value.trim() === '') {
            missing.push(key)
        }
    }

    if (missing.length > 0) {
        throw new Error(
            `\n\n❌  Missing required environment variables:\n\n` +
            missing.map((k) => `   • ${k}`).join('\n') +
            `\n\nCopy .env.example → .env.local and fill in the values.\n`
        )
    }

    // Basic format validation
    const supabaseUrl = REQUIRED_ENV.NEXT_PUBLIC_SUPABASE_URL!
    if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
        throw new Error(
            `\n\n❌  NEXT_PUBLIC_SUPABASE_URL looks invalid: "${supabaseUrl}"\n   Expected format: https://<ref>.supabase.co\n`
        )
    }
}

// Run validation immediately when this module is imported
validateEnv()

export { }
