'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createListing, type ListingFormState } from '@/app/actions/listings'
import { CheckCircle, ChevronRight, Upload, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const CATEGORIES = [
    { slug: 'textbooks', label: 'Textbooks', emoji: '📚' },
    { slug: 'tech', label: 'Tech & Electronics', emoji: '💻' },
    { slug: 'dorm', label: 'Dorm Essentials', emoji: '🛏️' },
    { slug: 'fashion', label: 'Fashion & Bags', emoji: '👕' },
    { slug: 'sports', label: 'Sports & Fitness', emoji: '⚽' },
    { slug: 'stationery', label: 'Stationery', emoji: '✏️' },
    { slug: 'food', label: 'Food & Snacks', emoji: '🍿' },
    { slug: 'other', label: 'Other', emoji: '📦' },
]

const CONDITIONS = [
    { value: 'new', label: 'New', desc: 'Never used, with tags' },
    { value: 'like_new', label: 'Like New', desc: 'Used once or twice, perfect condition' },
    { value: 'good', label: 'Good', desc: 'Minor signs of use, fully functional' },
    { value: 'fair', label: 'Fair', desc: 'Visible wear, works perfectly' },
    { value: 'for_parts', label: 'For Parts', desc: 'Not fully functional — sold as-is' },
]

// ── Submit button ─────────────────────────────────────────────────────────
function SubmitButton({ step }: { step: number }) {
    const { pending } = useFormStatus()
    const isLast = step === 3
    return (
        <button
            type={isLast ? 'submit' : 'button'}
            disabled={pending}
            className="h-11 w-full rounded-full bg-[var(--brand-blue)] text-white text-sm font-bold hover:bg-[var(--brand-blue-dark)] disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
        >
            {pending ? (
                <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Posting...</>
            ) : isLast ? (
                <>Post listing <CheckCircle size={16} /></>
            ) : (
                <>Continue <ChevronRight size={16} /></>
            )}
        </button>
    )
}

// ── Image preview strip ───────────────────────────────────────────────────
function ImageUploader({ images, onChange }: { images: File[]; onChange: (f: File[]) => void }) {
    function handleAdd(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files ?? []).slice(0, 6 - images.length)
        onChange([...images, ...files])
        e.target.value = ''
    }
    function handleRemove(i: number) {
        onChange(images.filter((_, idx) => idx !== i))
    }

    return (
        <div className="flex flex-wrap gap-3">
            {images.map((file, i) => (
                <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-zinc-100">
                    <img src={URL.createObjectURL(file)} alt="" className="object-cover w-full h-full" />
                    <button
                        type="button"
                        onClick={() => handleRemove(i)}
                        aria-label="Remove image"
                        className="absolute top-0.5 right-0.5 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black"
                    >
                        <X size={10} />
                    </button>
                </div>
            ))}
            {images.length < 6 && (
                <label className="w-20 h-20 rounded-xl border-2 border-dashed border-[var(--border-input)] flex flex-col items-center justify-center cursor-pointer hover:border-[var(--brand-blue)] hover:bg-blue-50 transition-colors group">
                    <Upload size={18} className="text-[var(--text-secondary)] group-hover:text-[var(--brand-blue)]" />
                    <span className="text-[10px] text-[var(--text-secondary)] mt-1 group-hover:text-[var(--brand-blue)]">Add photo</span>
                    <input type="file" accept="image/*" multiple className="sr-only" onChange={handleAdd} />
                </label>
            )}
        </div>
    )
}

// ── Field error helper ────────────────────────────────────────────────────
function FieldError({ errors }: { errors?: string[] }) {
    if (!errors?.length) return null
    return <p className="text-xs text-[var(--error)] mt-1">{errors[0]}</p>
}

// ── Input style shorthand ─────────────────────────────────────────────────
const inputCls = 'w-full px-4 py-2.5 text-sm border border-[var(--border-input)] rounded-xl outline-none focus:ring-2 focus:ring-[var(--brand-blue)]/20 focus:border-[var(--brand-blue)] transition-colors bg-white'

// ── Main multi-step form ──────────────────────────────────────────────────
export function CreateListingForm() {
    const router = useRouter()
    const [state, action] = useActionState<ListingFormState, FormData>(
        createListing,
        { type: 'idle' }
    )
    const [step, setStep] = useState(1)
    const [images, setImages] = useState<File[]>([])
    const [category, setCategory] = useState('')
    const [condition, setCondition] = useState('')

    // Redirect to PDP on success
    useEffect(() => {
        if (state.type === 'success') {
            router.push(`/product/${state.productId}?new=true`)
        }
    }, [state, router])

    const stepErrors = state.type === 'error' ? state.fieldErrors : undefined

    const STEPS = [
        { n: 1, label: 'Category' },
        { n: 2, label: 'Details' },
        { n: 3, label: 'Price & Review' },
    ]

    return (
        <div className="max-w-xl mx-auto">
            {/* Progress stepper */}
            <div className="flex items-center mb-8">
                {STEPS.map(({ n, label }, i) => (
                    <div key={n} className="flex items-center flex-1 last:flex-none">
                        <div className={`flex flex-col items-center gap-1 cursor-pointer group`} onClick={() => n < step && setStep(n)}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${n < step ? 'bg-[var(--price-green)] text-white'
                                    : n === step ? 'bg-[var(--brand-blue)] text-white'
                                        : 'bg-zinc-200 text-[var(--text-secondary)]'
                                }`}>
                                {n < step ? '✓' : n}
                            </div>
                            <span className={`text-[11px] whitespace-nowrap hidden sm:block ${n === step ? 'text-[var(--brand-blue)] font-bold' : 'text-[var(--text-secondary)]'}`}>{label}</span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-2 transition-colors ${n < step ? 'bg-[var(--price-green)]' : 'bg-zinc-200'}`} />
                        )}
                    </div>
                ))}
            </div>

            <form action={action}>
                {/* ── Step 1: Category ────────────────────────────────── */}
                {step === 1 && (
                    <div className="space-y-5">
                        <h2 className="text-lg font-black text-[var(--text-primary)]">What are you selling?</h2>
                        <input type="hidden" name="category_slug" value={category} />
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {CATEGORIES.map(({ slug, label, emoji }) => (
                                <button
                                    key={slug}
                                    type="button"
                                    onClick={() => { setCategory(slug); setStep(2) }}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-medium transition-all hover:border-[var(--brand-blue)] hover:bg-blue-50 ${category === slug
                                            ? 'border-[var(--brand-blue)] bg-blue-50 text-[var(--brand-blue)] font-bold'
                                            : 'border-[var(--border-subtle)] text-[var(--text-primary)]'
                                        }`}
                                >
                                    <span className="text-2xl">{emoji}</span>
                                    <span className="text-xs text-center leading-tight">{label}</span>
                                </button>
                            ))}
                        </div>
                        <FieldError errors={stepErrors?.category_slug} />
                    </div>
                )}

                {/* ── Step 2: Details ──────────────────────────────────── */}
                {step === 2 && (
                    <div className="space-y-5">
                        <h2 className="text-lg font-black text-[var(--text-primary)]">Tell buyers about it</h2>

                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Title *</label>
                            <input name="title" type="text" placeholder="e.g. MacBook Air M2 2023, 8GB/256GB, Space Grey" className={inputCls} required maxLength={150} />
                            <FieldError errors={stepErrors?.title} />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Description *</label>
                            <textarea
                                name="description"
                                rows={4}
                                placeholder="Describe the item — include edition, specs, what's included, reason for selling..."
                                className={inputCls + ' resize-none'}
                                required
                                maxLength={2000}
                            />
                            <FieldError errors={stepErrors?.description} />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Condition *</label>
                            <input type="hidden" name="condition" value={condition} />
                            <div className="space-y-2">
                                {CONDITIONS.map(({ value, label, desc }) => (
                                    <label key={value} className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${condition === value ? 'border-[var(--brand-blue)] bg-blue-50' : 'border-[var(--border-subtle)] hover:border-zinc-400'
                                        }`}>
                                        <input type="radio" name="_condition" value={value} checked={condition === value} onChange={() => setCondition(value)} className="mt-0.5 accent-[var(--brand-blue)]" />
                                        <div>
                                            <p className="text-sm font-bold text-[var(--text-primary)]">{label}</p>
                                            <p className="text-xs text-[var(--text-secondary)]">{desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <FieldError errors={stepErrors?.condition} />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Photos (up to 6)</label>
                            <ImageUploader images={images} onChange={setImages} />
                            <p className="text-xs text-[var(--text-secondary)] mt-2">First photo is your cover image. Good photos get 5× more views.</p>
                        </div>

                        <button
                            type="button"
                            disabled={!condition}
                            onClick={() => setStep(3)}
                            className="h-11 w-full rounded-full bg-[var(--brand-blue)] text-white text-sm font-bold hover:bg-[var(--brand-blue-dark)] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                        >
                            Continue <ChevronRight size={16} />
                        </button>
                    </div>
                )}

                {/* ── Step 3: Price & Review ───────────────────────────── */}
                {step === 3 && (
                    <div className="space-y-5">
                        <h2 className="text-lg font-black text-[var(--text-primary)]">Set your price</h2>

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Your price *</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] font-bold">$</span>
                                    <input name="price" type="number" step="0.01" min="0.01" max="9999.99" placeholder="0.00" className={inputCls + ' pl-8'} required />
                                </div>
                                <FieldError errors={stepErrors?.price} />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">
                                    Original price <span className="text-xs font-normal text-[var(--text-secondary)]">(optional)</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] font-bold">$</span>
                                    <input name="original_price" type="number" step="0.01" min="0.01" max="9999.99" placeholder="0.00" className={inputCls + ' pl-8'} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">
                                Campus <span className="text-xs font-normal text-[var(--text-secondary)]">(optional)</span>
                            </label>
                            <input name="campus" type="text" placeholder="e.g. University of Melbourne" className={inputCls} maxLength={100} />
                        </div>

                        {/* Platform fee explainer */}
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-[var(--text-secondary)] space-y-1">
                            <p className="font-bold text-[var(--text-primary)]">Pricing breakdown</p>
                            <p>Platform fee: <span className="font-semibold text-[var(--text-primary)]">8%</span> per sale</p>
                            <p>LAAT+ members: <span className="font-semibold text-[var(--price-green)]">0% fee</span> on all sales</p>
                            <p className="text-xs mt-2">Your listing goes live after a quick review by our team (usually under 2 hours).</p>
                        </div>

                        {state.type === 'error' && (
                            <p className="text-sm text-[var(--error)] bg-red-50 border border-red-100 rounded-xl px-4 py-3">{state.message}</p>
                        )}

                        <SubmitButton step={3} />
                    </div>
                )}
            </form>
        </div>
    )
}
