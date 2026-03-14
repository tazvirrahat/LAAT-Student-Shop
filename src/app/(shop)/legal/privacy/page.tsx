import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'How LAAT Student Shop collects, uses, and protects your personal information.',
}

const LAST_UPDATED = '8 March 2026'

export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
            <div className="mb-8">
                <nav className="text-xs text-[var(--text-secondary)] mb-4">
                    <Link href="/" className="hover:underline">Home</Link> → <Link href="/legal" className="hover:underline">Legal</Link> → Privacy Policy
                </nav>
                <h1 className="text-3xl font-black text-[var(--text-primary)] mb-1">Privacy Policy</h1>
                <p className="text-sm text-[var(--text-secondary)]">Last updated: {LAST_UPDATED}</p>
            </div>

            <div className="prose prose-sm max-w-none space-y-8 text-[var(--text-primary)]">
                {[
                    {
                        heading: '1. Information we collect',
                        body: `We collect information you provide directly — name, email address, campus affiliation, and payment details. We also collect usage data such as pages viewed, searches performed, and items added to cart. When you list items, we collect product details including images and pricing.`,
                    },
                    {
                        heading: '2. How we use your information',
                        body: `Your data is used to: provide and improve our services; process transactions; send transactional emails (order confirmations, listing updates); personalise your experience; and comply with legal obligations. We never sell your personal data to third parties.`,
                    },
                    {
                        heading: '3. Cookies and tracking',
                        body: `We use essential cookies for authentication (Supabase session), functional cookies for preferences, and analytics cookies (Vercel) to understand usage patterns. You may opt out of analytics cookies via our cookie banner.`,
                    },
                    {
                        heading: '4. Data sharing',
                        body: `We share data with: Supabase (our database and auth provider, hosted in Australia or the EU), Stripe (payment processing — PCI-DSS Level 1 compliant), and Vercel (hosting and analytics). All processors are contractually bound to protect your data.`,
                    },
                    {
                        heading: '5. Data retention',
                        body: `Account data is kept for as long as your account is active plus 7 years (for legal compliance). Deleted listings are archived (not permanently removed) for 90 days, then purged. You may request deletion at any time.`,
                    },
                    {
                        heading: '6. Your rights',
                        body: `Under the Australian Privacy Act 1988 and GDPR, you have the right to: access your data; correct inaccurate data; request deletion; and object to processing. Submit requests to privacy@laatstudenthop.com.au.`,
                    },
                    {
                        heading: '7. Children',
                        body: `LAAT Student Shop is intended for university students aged 18 and above. We do not knowingly collect personal data from anyone under 18.`,
                    },
                    {
                        heading: '8. Changes to this policy',
                        body: `We may update this policy. We will notify you of material changes via email or a banner on the site at least 14 days before changes take effect.`,
                    },
                ].map(({ heading, body }) => (
                    <section key={heading}>
                        <h2 className="text-base font-black text-[var(--text-primary)] mb-2">{heading}</h2>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{body}</p>
                    </section>
                ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[var(--border-subtle)] flex flex-wrap gap-4 text-xs text-[var(--text-secondary)]">
                <Link href="/legal/terms" className="hover:underline hover:text-[var(--brand-blue)]">Terms of Use</Link>
                <Link href="/legal/ca-privacy" className="hover:underline hover:text-[var(--brand-blue)]">CA Privacy Rights</Link>
                <Link href="/legal/privacy-choices" className="hover:underline hover:text-[var(--brand-blue)]">Your Privacy Choices</Link>
            </div>
        </div>
    )
}
