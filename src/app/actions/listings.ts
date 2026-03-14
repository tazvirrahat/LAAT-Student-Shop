'use server'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// ── Schema ────────────────────────────────────────────────────────────────
const ListingSchema = z.object({
    title: z.string().min(10, 'Title must be at least 10 characters').max(150),
    description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
    price: z.coerce.number().positive('Price must be greater than 0').max(9999.99, 'Price too high'),
    original_price: z.coerce.number().positive().max(9999.99).optional(),
    condition: z.enum(['new', 'like_new', 'good', 'fair', 'for_parts']),
    category_slug: z.string().min(1, 'Please choose a category'),
    campus: z.string().optional(),
})

export type ListingFormState =
    | { type: 'idle' }
    | { type: 'success'; productId: string }
    | { type: 'error'; message: string; fieldErrors?: Record<string, string[]> }

// ── Server Action: Create product listing ─────────────────────────────────
export async function createListing(
    _prevState: ListingFormState,
    formData: FormData
): Promise<ListingFormState> {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { type: 'error', message: 'You must be signed in to post a listing.' }
    }

    const raw = {
        title: formData.get('title'),
        description: formData.get('description'),
        price: formData.get('price'),
        original_price: formData.get('original_price') || undefined,
        condition: formData.get('condition'),
        category_slug: formData.get('category_slug'),
        campus: formData.get('campus') || undefined,
    }

    const parsed = ListingSchema.safeParse(raw)
    if (!parsed.success) {
        return {
            type: 'error',
            message: 'Please fix the errors below.',
            fieldErrors: parsed.error.flatten().fieldErrors,
        }
    }

    const { data, error } = await supabase
        .from('products')
        .insert({
            seller_id: user.id,
            status: 'pending_review',
            ...parsed.data,
        })
        .select('id')
        .single()

    if (error || !data) {
        console.error('[createListing]', error)
        return { type: 'error', message: 'Failed to create listing. Please try again.' }
    }

    revalidatePath('/')
    revalidatePath(`/${parsed.data.category_slug}`)
    return { type: 'success', productId: data.id }
}

// ── Server Action: Update listing ─────────────────────────────────────────
export async function updateListing(
    _prevState: ListingFormState,
    formData: FormData
): Promise<ListingFormState> {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const productId = formData.get('product_id')?.toString()

    if (!user || !productId) {
        return { type: 'error', message: 'Unauthorized.' }
    }

    const raw = {
        title: formData.get('title'),
        description: formData.get('description'),
        price: formData.get('price'),
        original_price: formData.get('original_price') || undefined,
        condition: formData.get('condition'),
        category_slug: formData.get('category_slug'),
        campus: formData.get('campus') || undefined,
    }

    const parsed = ListingSchema.safeParse(raw)
    if (!parsed.success) {
        return { type: 'error', message: 'Please fix the errors below.', fieldErrors: parsed.error.flatten().fieldErrors }
    }

    // Verify ownership before updating
    const { error } = await supabase
        .from('products')
        .update({ ...parsed.data, status: 'pending_review', updated_at: new Date().toISOString() })
        .eq('id', productId)
        .eq('seller_id', user.id) // RLS + application-level check

    if (error) return { type: 'error', message: 'Failed to update listing.' }

    revalidatePath(`/product/${productId}`)
    revalidatePath(`/${parsed.data.category_slug}`)
    return { type: 'success', productId }
}

// ── Server Action: Mark as sold ───────────────────────────────────────────
export async function markAsSold(_prevState: unknown, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const productId = formData.get('product_id')?.toString()

    if (!user || !productId) return { type: 'error', message: 'Unauthorized.' }

    const { error: soldError } = await supabase
        .from('products')
        .update({ status: 'sold', updated_at: new Date().toISOString() })
        .eq('id', productId)
        .eq('seller_id', user.id)

    if (soldError) {
        console.error('[markAsSold]', soldError)
        return { type: 'error', message: 'Failed to update listing status.' }
    }

    revalidatePath('/seller')
    return { type: 'success', productId }
}

// ── Server Action: Delete listing (archive) ───────────────────────────────
export async function deleteListing(_prevState: unknown, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const productId = formData.get('product_id')?.toString()

    if (!user || !productId) return { type: 'error', message: 'Unauthorized.' }

    const { error: deleteError } = await supabase
        .from('products')
        .update({ status: 'archived', updated_at: new Date().toISOString() })
        .eq('id', productId)
        .eq('seller_id', user.id)

    if (deleteError) {
        console.error('[deleteListing]', deleteError)
        return { type: 'error', message: 'Failed to archive listing.' }
    }

    revalidatePath('/seller')
    return { type: 'success', productId }
}
