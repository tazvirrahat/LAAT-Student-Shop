import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { CheckoutFlow } from '@/components/checkout/CheckoutFlow'
import { ShieldCheck, Lock } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Checkout',
    description: 'Complete your LAAT Student Shop order securely.',
}

export default async function CheckoutPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login?next=/checkout')

    return (
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-8">

            {/* Page header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <Link href="/" className="block mb-2">
                        <span className="text-xl font-black text-[var(--brand-blue)]">LAAT</span>
                        <span className="text-xs font-bold text-[var(--text-secondary)] ml-1">Student Shop</span>
                    </Link>
                    <h1 className="text-2xl font-black text-[var(--text-primary)]">Checkout</h1>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                    <Lock size={13} className="text-[var(--price-green)]" />
                    <span className="font-medium">Secure checkout</span>
                </div>
            </div>

            <CheckoutFlow />

            {/* Bottom trust bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--text-secondary)] pb-4">
                <div className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-[var(--price-green)]" />
                    <span>LAAT Buyer Protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Lock size={13} className="text-[var(--price-green)]" />
                    <span>256-bit SSL encryption</span>
                </div>
                <Link href="/legal/privacy" className="hover:underline">Privacy Policy</Link>
                <Link href="/legal/terms" className="hover:underline">Terms of Use</Link>
            </div>
        </div>
    )
}
