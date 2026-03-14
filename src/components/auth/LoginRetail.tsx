'use client'

import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { loginWithPassword, signupWithPassword, type ActionState } from '@/app/actions/auth'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

// Proper RFC-5322 simplified email regex
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ── Submit Button (isolated to access useFormStatus) ───────────────────────
function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full h-12 rounded-full bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-dark)] text-white text-base font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {pending && <Loader2 size={18} className="animate-spin" />}
            {label}
        </button>
    )
}

// ── Underline-style input matching Walmart's auth form ─────────────────────
function UnderlineInput({
    id, type = 'text', label, name, value, onChange, required, autoComplete, minLength
}: {
    id: string, type?: string, label: string, name: string, value: string,
    onChange: (v: string) => void, required?: boolean, autoComplete?: string, minLength?: number
}) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-sm font-bold text-[var(--text-primary)]">
                {label} {required && <span className="text-[var(--sale-red)]">*</span>}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                required={required}
                autoComplete={autoComplete}
                minLength={minLength}
                className="h-12 w-full border border-[var(--border-input)] rounded-md px-3 text-base text-[var(--text-primary)] outline-none focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-[var(--brand-blue)]/20 transition-all bg-white"
            />
        </div>
    )
}

// ── Main Auth Component ─────────────────────────────────────────────────────
type Step = 'email' | 'password' | 'signup'

export function LoginRetail() {
    const [step, setStep] = useState<Step>('email')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')

    const [loginState, loginAction] = useActionState<ActionState, FormData>(loginWithPassword, null)
    const [signupState, signupAction] = useActionState<ActionState, FormData>(signupWithPassword, null)

    // Toast on server action results
    useEffect(() => {
        if (!loginState) return
        if (loginState.type === 'success') toast.success(loginState.message)
        else toast.error(loginState.message)
    }, [loginState])

    useEffect(() => {
        if (!signupState) return
        if (signupState.type === 'success') {
            toast.success(signupState.message)
            // Stay on signup confirmation — do NOT advance to password step
        } else {
            toast.error(signupState.message)
        }
    }, [signupState])

    const handleContinue = () => {
        if (!EMAIL_RE.test(email)) {
            setEmailError('Please enter a valid email address.')
            return
        }
        setEmailError('')
        setStep('password')
    }

    // Step 1: Collect email → determine sign in vs sign up
    const EmailStep = (
        <div className="space-y-5">
            <UnderlineInput
                id="email-step"
                type="email"
                name="email"
                label="Phone number or email"
                value={email}
                onChange={setEmail}
                required
                autoComplete="email"
            />
            <p className="text-xs text-[var(--text-secondary)]">
                Securing your personal information is our priority.{' '}
                <Link href="/legal/privacy" className="underline hover:text-[var(--brand-blue)]">See our privacy measures.</Link>
            </p>
            {emailError && (
                <p role="alert" className="text-sm text-[var(--error)] -mt-2">{emailError}</p>
            )}
            <button
                type="button"
                onClick={handleContinue}
                className="w-full h-12 rounded-full bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-dark)] text-white text-base font-bold transition-colors"
            >
                Continue
            </button>
            <div className="relative flex items-center gap-4 py-1">
                <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                <span className="text-xs text-[var(--text-secondary)]">or</span>
                <div className="flex-1 h-px bg-[var(--border-subtle)]" />
            </div>
            <button
                type="button"
                onClick={() => setStep('signup')}
                className="w-full h-12 rounded-full border border-[var(--border-input)] hover:bg-zinc-50 text-[var(--text-primary)] text-base font-bold transition-colors"
            >
                Create an account
            </button>
        </div>
    )

    // Step 2: Sign-in password form
    const SignInStep = (
        <form action={loginAction} className="space-y-5">
            <input type="hidden" name="email" value={email} />
            <div className="text-sm text-[var(--text-secondary)]">
                Signing in as <button type="button" onClick={() => setStep('email')} className="text-[var(--brand-blue)] underline hover:text-[var(--brand-blue-dark)] font-medium">{email}</button>
            </div>
            <UnderlineInput
                id="password-step"
                type="password"
                name="password"
                label="Password"
                value={password}
                onChange={setPassword}
                required
                autoComplete="current-password"
                minLength={8}
            />
            <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-[var(--brand-blue)] hover:underline">Forgot password?</Link>
            </div>
            {loginState?.type === 'error' && (
                <p className="text-sm text-[var(--error)] bg-red-50 border border-red-200 rounded-md px-3 py-2">{loginState.message}</p>
            )}
            <SubmitButton label="Sign in" />
        </form>
    )

    // Step 3: Sign-up form
    const SignUpStep = (
        <form action={signupAction} className="space-y-5">
            <UnderlineInput id="signup-email" type="email" name="email" label="Email address" value={email} onChange={setEmail} required autoComplete="email" />
            <UnderlineInput id="signup-password" type="password" name="password" label="Create a password" value={password} onChange={setPassword} required autoComplete="new-password" minLength={8} />
            {signupState?.type === 'error' && (
                <p className="text-sm text-[var(--error)] bg-red-50 border border-red-200 rounded-md px-3 py-2">{signupState.message}</p>
            )}
            <SubmitButton label="Create account" />
            <p className="text-xs text-[var(--text-secondary)] text-center">
                Already have an account?{' '}
                <button type="button" onClick={() => setStep('email')} className="text-[var(--brand-blue)] underline">Sign in</button>
            </p>
        </form>
    )

    const stepContent: Record<Step, React.ReactNode> = {
        email: EmailStep,
        password: SignInStep,
        signup: SignUpStep,
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-white flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-[400px]">
                <h1 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-8 leading-tight">
                    {step === 'signup' ? 'Create your account' : 'Sign in or create your account'}
                </h1>

                {stepContent[step]}
            </div>

            {/* Legal footer */}
            <footer className="mt-16 text-center max-w-lg">
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    By continuing, you agree to our{' '}
                    <Link href="/legal/terms" className="underline hover:text-[var(--brand-blue)]">Terms of Use</Link>{' '}
                    and{' '}
                    <Link href="/legal/privacy" className="underline hover:text-[var(--brand-blue)]">Privacy Policy</Link>.
                </p>
                <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
                    {[
                        ['Give feedback', '/feedback'],
                        ['CA Privacy Rights', '/legal/ca-privacy'],
                        ['Your Privacy Choices', '/legal/privacy-choices'],
                        ['Notice at Collection', '/legal/notice-at-collection'],
                    ].map(([l, href]) => (
                        <Link key={l} href={href} className="text-xs text-[var(--text-secondary)] hover:underline">{l}</Link>
                    ))}
                </nav>
                <p className="text-xs text-[var(--text-secondary)] mt-4">© {new Date().getFullYear()} LAAT Student Shop, Inc.</p>
            </footer>
        </div>
    )
}
