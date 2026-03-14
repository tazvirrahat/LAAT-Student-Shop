import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Terms of Use',
    description: 'The rules and guidelines for using LAAT Student Shop.',
}

const LAST_UPDATED = '8 March 2026'

const SECTIONS = [
    { heading: '1. Acceptance', body: 'By creating an account or placing an order, you agree to these Terms. If you do not agree, do not use the platform.' },
    { heading: '2. Eligibility', body: 'You must be at least 18 years old and currently enrolled at a recognised Australian university to use LAAT Student Shop.' },
    { heading: '3. Seller conduct', body: 'Sellers must list items honestly, only sell items they own or have the right to sell, and respond to buyer enquiries within 48 hours. Counterfeit goods, dangerous items, and regulated goods (alcohol, tobacco, pharmaceuticals) are strictly prohibited.' },
    { heading: '4. Buyer conduct', body: 'Buyers must not make offers in bad faith or attempt to circumvent the platform by dealing off-platform. Chargeback abuse is grounds for permanent account termination.' },
    { heading: '5. Platform fees', body: 'LAAT charges an 8% commission on all completed sales for standard accounts. LAAT+ members pay 0% commission. Fees are deducted automatically from the sale amount before payout.' },
    { heading: '6. Prohibited content', body: 'Users may not list: stolen goods; counterfeit or replica items; items that infringe intellectual property rights; adult content; weapons; controlled substances; or any items illegal under Australian law.' },
    { heading: '7. Dispute resolution', body: 'Disputes are handled through our in-app Resolution Centre. LAAT\'s decision is final on all platform disputes. For legal disputes, you agree to jurisdiction in New South Wales, Australia.' },
    { heading: '8. Limitation of liability', body: 'LAAT is a marketplace, not a party to transactions. To the maximum extent permitted by law, our liability is limited to fees paid to us in the 3 months preceding a claim.' },
    { heading: '9. Termination', body: 'We reserve the right to suspend or terminate accounts that violate these Terms, with or without notice. You may delete your account at any time from settings.' },
    { heading: '10. Changes', body: 'We may update these Terms with 14 days notice. Continued use after the notice period constitutes acceptance.' },
]

export default function TermsPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
            <div className="mb-8">
                <nav className="text-xs text-[var(--text-secondary)] mb-4">
                    <Link href="/" className="hover:underline">Home</Link> → <Link href="/legal" className="hover:underline">Legal</Link> → Terms of Use
                </nav>
                <h1 className="text-3xl font-black text-[var(--text-primary)] mb-1">Terms of Use</h1>
                <p className="text-sm text-[var(--text-secondary)]">Last updated: {LAST_UPDATED}</p>
            </div>

            <div className="space-y-7">
                {SECTIONS.map(({ heading, body }) => (
                    <section key={heading}>
                        <h2 className="text-base font-black text-[var(--text-primary)] mb-2">{heading}</h2>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{body}</p>
                    </section>
                ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[var(--border-subtle)] flex flex-wrap gap-4 text-xs text-[var(--text-secondary)]">
                <Link href="/legal/privacy" className="hover:underline hover:text-[var(--brand-blue)]">Privacy Policy</Link>
                <Link href="/legal/ca-privacy" className="hover:underline hover:text-[var(--brand-blue)]">CA Privacy Rights</Link>
            </div>
        </div>
    )
}
