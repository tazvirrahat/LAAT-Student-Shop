'use server'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { redirect } from 'next/navigation'

// ── Shared types ───────────────────────────────────────────────────────────
export type ActionState =
    | { type: 'success'; message: string }
    | { type: 'error'; message: string }
    | null

// ── Validation schemas ─────────────────────────────────────────────────────
const emailSchema = z.object({
    email: z.string().email('Please enter a valid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
})

// ── Login ──────────────────────────────────────────────────────────────────
export async function loginWithPassword(
    _prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const result = emailSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!result.success) {
        return { type: 'error', message: result.error.issues[0].message }
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
        email: result.data.email,
        password: result.data.password,
    })

    if (error) {
        // Normalize Supabase error messages to be user-friendly
        const message =
            error.message === 'Invalid login credentials'
                ? 'Incorrect email or password. Please try again.'
                : error.message
        return { type: 'error', message }
    }

    redirect('/')
}

// ── Signup ─────────────────────────────────────────────────────────────────
export async function signupWithPassword(
    _prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const result = emailSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!result.success) {
        return { type: 'error', message: result.error.issues[0].message }
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({
        email: result.data.email,
        password: result.data.password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/callback`,
        },
    })

    if (error) {
        return { type: 'error', message: error.message }
    }

    return {
        type: 'success',
        message: 'Account created! Check your email to verify before signing in.',
    }
}

// ── Logout ─────────────────────────────────────────────────────────────────
export async function logout(): Promise<never> {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}
