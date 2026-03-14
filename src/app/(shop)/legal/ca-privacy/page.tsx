import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'California Privacy Rights',
    description: 'Your CCPA rights as a California resident using LAAT Student Shop.',
}

export default function CaPrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
            <nav className="text-xs text-[var(--text-secondary)] mb-4">
                <Link href="/" className="hover:underline">Home</Link> → <Link href="/legal" className="hover:underline">Legal</Link> → CA Privacy Rights
            </nav>
            <h1 className="text-3xl font-black text-[var(--text-primary)] mb-1">California Privacy Rights</h1>
            <p className="text-sm text-[var(--text-secondary)] mb-8">Last updated: 8 March 2026</p>

            <div className="space-y-7 text-sm">
                <section>
                    <h2 className="text-base font-black text-[var(--text-primary)] mb-2">Your rights under CCPA</h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed">California residents have additional rights under the California Consumer Privacy Act (CCPA). These rights include:</p>
                    <ul className="mt-3 space-y-2 list-disc pl-4 text-[var(--text-secondary)]">
                        <li><strong className="text-[var(--text-primary)]">Right to Know.</strong> You may request a full disclosure of the personal data we have collected about you in the past 12 months.</li>
                        <li><strong className="text-[var(--text-primary)]">Right to Delete.</strong> You may request deletion of your personal data, subject to certain exceptions.</li>
                        <li><strong className="text-[var(--text-primary)]">Right to Opt-Out.</strong> LAAT does not sell personal data. If this changes, you'll have the right to opt out.</li>
                        <li><strong className="text-[var(--text-primary)]">Right to Non-Discrimination.</strong> We will not discriminate against you for exercising your CCPA rights.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-base font-black text-[var(--text-primary)] mb-2">How to submit a request</h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed">Submit CCPA requests via email at <a href="mailto:privacy@laatstudenthop.com.au" className="text-[var(--brand-blue)] hover:underline">privacy@laatstudenthop.com.au</a>. We will verify your identity and respond within 45 days.</p>
                </section>

                <section>
                    <h2 className="text-base font-black text-[var(--text-primary)] mb-2">Categories of information collected</h2>
                    <p className="text-[var(--text-secondary)] mb-2 leading-relaxed">In the preceding 12 months we have collected: identifiers (email, name); commercial information (purchases, listings); internet activity (page views, searches); and geolocation data (campus).</p>
                </section>
            </div>

            <div className="mt-10 pt-8 border-t border-[var(--border-subtle)] flex flex-wrap gap-4 text-xs text-[var(--text-secondary)]">
                <Link href="/legal/privacy" className="hover:underline hover:text-[var(--brand-blue)]">Privacy Policy</Link>
                <Link href="/legal/terms" className="hover:underline hover:text-[var(--brand-blue)]">Terms of Use</Link>
                <Link href="/legal/privacy-choices" className="hover:underline hover:text-[var(--brand-blue)]">Your Privacy Choices</Link>
            </div>
        </div>
    )
}
