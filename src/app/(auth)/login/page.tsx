import { LoginRetail } from '@/components/auth/LoginRetail'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign In',
}

export default async function LoginPage() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    if (data?.user) redirect('/dashboard')

    return <LoginRetail />
}
