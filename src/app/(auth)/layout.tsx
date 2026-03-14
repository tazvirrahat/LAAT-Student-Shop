import { AuthHeader } from '@/components/layout/AuthHeader'

/**
 * Route group layout for all auth pages (/login, /signup, etc.)
 * This layout does NOT include the global navigation header — instead showing
 * only the minimal centered logo, matching Walmart's distraction-free auth flow.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthHeader />
            {children}
        </>
    )
}
