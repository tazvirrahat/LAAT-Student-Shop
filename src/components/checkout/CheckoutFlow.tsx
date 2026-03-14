'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MOCK_FLASH_DEALS } from '@/lib/types/products'
import { Check, ChevronRight, ShieldCheck, CreditCard, Truck, MapPin, Lock } from 'lucide-react'

type Step = 'delivery' | 'payment' | 'review'

const STEPS: { id: Step; label: string }[] = [
    { id: 'delivery', label: 'Delivery' },
    { id: 'payment', label: 'Payment' },
    { id: 'review', label: 'Review' },
]

const MOCK_CART = [
    { ...MOCK_FLASH_DEALS[0], qty: 1 },
    { ...MOCK_FLASH_DEALS[1], qty: 2 },
]

const inputCls = 'w-full h-11 px-4 text-sm border border-[var(--border-input)] rounded-xl outline-none focus:ring-2 focus:ring-[var(--brand-blue)]/20 focus:border-[var(--brand-blue)] transition-colors bg-white'
const labelCls = 'block text-xs font-bold text-[var(--text-primary)] mb-1.5'

// ── Stepper ────────────────────────────────────────────────────────────────
function Stepper({ current }: { current: Step }) {
    const currentIdx = STEPS.findIndex(s => s.id === current)
    return (
        <div className="flex items-center mb-8">
            {STEPS.map(({ id, label }, i) => (
                <div key={id} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i < currentIdx ? 'bg-[var(--price-green)] text-white'
                                : i === currentIdx ? 'bg-[var(--brand-blue)] text-white'
                                    : 'bg-zinc-200 text-[var(--text-secondary)]'
                            }`}>
                            {i < currentIdx ? <Check size={14} /> : i + 1}
                        </div>
                        <span className={`text-[11px] hidden sm:block whitespace-nowrap ${i === currentIdx ? 'text-[var(--brand-blue)] font-bold' : 'text-[var(--text-secondary)]'}`}>{label}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-2 transition-colors ${i < currentIdx ? 'bg-[var(--price-green)]' : 'bg-zinc-200'}`} />
                    )}
                </div>
            ))}
        </div>
    )
}

// ── Step 1: Delivery ─────────────────────────────────────────────────────
function DeliveryStep({ onNext }: { onNext: () => void }) {
    return (
        <div className="space-y-5">
            <h2 className="text-lg font-black text-[var(--text-primary)] flex items-center gap-2">
                <Truck size={18} className="text-[var(--brand-blue)]" /> Delivery information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>First name *</label><input type="text" name="first_name" className={inputCls} required autoComplete="given-name" /></div>
                <div><label className={labelCls}>Last name *</label><input type="text" name="last_name" className={inputCls} required autoComplete="family-name" /></div>
                <div className="sm:col-span-2"><label className={labelCls}>Address *</label><input type="text" name="address" className={inputCls} required autoComplete="street-address" placeholder="Street address" /></div>
                <div><label className={labelCls}>City *</label><input type="text" name="city" className={inputCls} required autoComplete="address-level2" /></div>
                <div><label className={labelCls}>Postcode *</label><input type="text" name="postcode" className={inputCls} required autoComplete="postal-code" /></div>
                <div className="sm:col-span-2"><label className={labelCls}>State *</label>
                    <select className={inputCls}>
                        {['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'].map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
                <div className="sm:col-span-2"><label className={labelCls}>Phone number</label><input type="tel" name="phone" className={inputCls} autoComplete="tel" /></div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-[var(--text-secondary)] flex gap-2">
                <MapPin size={14} className="text-[var(--brand-blue)] shrink-0 mt-0.5" />
                <span>Campus pickup available — select at payment step for zero delivery fee.</span>
            </div>

            <button onClick={onNext} className="w-full h-12 rounded-full bg-[var(--brand-blue)] text-white font-bold hover:bg-[var(--brand-blue-dark)] transition-colors flex items-center justify-center gap-2">
                Continue to payment <ChevronRight size={16} />
            </button>
        </div>
    )
}

// ── Step 2: Payment ──────────────────────────────────────────────────────
function PaymentStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const [method, setMethod] = useState<'card' | 'campus_pickup'>('card')
    return (
        <div className="space-y-5">
            <h2 className="text-lg font-black text-[var(--text-primary)] flex items-center gap-2">
                <CreditCard size={18} className="text-[var(--brand-blue)]" /> Payment method
            </h2>

            {/* Method selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {([
                    { id: 'card', label: 'Credit / Debit card', sub: 'Visa, Mastercard, Amex', icon: CreditCard },
                    { id: 'campus_pickup', label: 'Pay on campus pickup', sub: 'Cash or card at handover', icon: MapPin },
                ] as const).map(({ id, label, sub, icon: Icon }) => (
                    <label key={id} className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${method === id ? 'border-[var(--brand-blue)] bg-blue-50' : 'border-[var(--border-subtle)] hover:border-zinc-400'}`}>
                        <input type="radio" name="payment_method" value={id} checked={method === id} onChange={() => setMethod(id)} className="mt-0.5 accent-[var(--brand-blue)]" />
                        <div>
                            <div className="flex items-center gap-1.5">
                                <Icon size={14} className="text-[var(--brand-blue)]" />
                                <p className="text-sm font-bold text-[var(--text-primary)]">{label}</p>
                            </div>
                            <p className="text-xs text-[var(--text-secondary)]">{sub}</p>
                        </div>
                    </label>
                ))}
            </div>

            {method === 'card' && (
                <div className="space-y-4 p-4 border border-[var(--border-subtle)] rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                        <Lock size={13} className="text-[var(--price-green)]" />
                        <span className="text-xs text-[var(--text-secondary)]">Secured by Stripe — LAAT never stores card details.</span>
                    </div>
                    <div><label className={labelCls}>Card number *</label><input type="text" placeholder="1234 5678 9012 3456" className={inputCls} maxLength={19} /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className={labelCls}>Expiry *</label><input type="text" placeholder="MM / YY" className={inputCls} /></div>
                        <div><label className={labelCls}>CVV *</label><input type="text" placeholder="123" className={inputCls} maxLength={4} /></div>
                    </div>
                    <div><label className={labelCls}>Name on card *</label><input type="text" className={inputCls} autoComplete="cc-name" /></div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-3">
                <button onClick={onBack} className="h-11 rounded-full border border-[var(--border-input)] text-sm font-bold text-[var(--text-primary)] hover:bg-zinc-50 transition-colors">
                    Back
                </button>
                <button onClick={onNext} className="h-11 rounded-full bg-[var(--brand-blue)] text-white text-sm font-bold hover:bg-[var(--brand-blue-dark)] transition-colors flex items-center justify-center gap-2">
                    Review order <ChevronRight size={15} />
                </button>
            </div>
        </div>
    )
}

// ── Step 3: Review & Place Order ────────────────────────────────────────
function ReviewStep({ onBack, onPlace }: { onBack: () => void; onPlace: () => void }) {
    const subtotal = MOCK_CART.reduce((s, i) => s + i.price * i.qty, 0)
    const savings = MOCK_CART.reduce((s, i) => s + ((i.originalPrice ?? i.price) - i.price) * i.qty, 0)

    return (
        <div className="space-y-5">
            <h2 className="text-lg font-black text-[var(--text-primary)]">Review your order</h2>

            {/* Items */}
            <div className="border border-[var(--border-subtle)] rounded-xl overflow-hidden divide-y divide-[var(--border-subtle)]">
                {MOCK_CART.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3">
                        <Image src={item.imageUrl} alt={item.title} width={48} height={48} className="object-contain w-12 h-12 rounded-lg bg-zinc-50 p-1 border border-[var(--border-subtle)] shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-[var(--text-primary)] line-clamp-1">{item.title}</p>
                            <p className="text-xs text-[var(--text-secondary)]">Qty: {item.qty}</p>
                        </div>
                        <p className="text-sm font-black text-[var(--text-primary)] shrink-0">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                ))}
            </div>

            {/* Price summary */}
            <div className="border border-[var(--border-subtle)] rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                {savings > 0 && <div className="flex justify-between text-[var(--price-green)]"><span>You save</span><span>-${savings.toFixed(2)}</span></div>}
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Delivery</span><span className="text-[var(--price-green)] font-semibold">Free</span></div>
                <div className="flex justify-between text-base font-black border-t border-[var(--border-subtle)] pt-2">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <ShieldCheck size={13} className="text-[var(--price-green)] shrink-0 mt-0.5" />
                <span>By placing this order you agree to our <Link href="/legal/terms" className="underline hover:text-[var(--brand-blue)]">Terms</Link> and <Link href="/legal/privacy" className="underline hover:text-[var(--brand-blue)]">Privacy Policy</Link>.</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button onClick={onBack} className="h-12 rounded-full border border-[var(--border-input)] text-sm font-bold text-[var(--text-primary)] hover:bg-zinc-50 transition-colors">
                    Back
                </button>
                <button onClick={onPlace} className="h-12 rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-dark)] text-base font-black hover:bg-amber-400 transition-colors">
                    Place order
                </button>
            </div>
        </div>
    )
}

// ── Success ──────────────────────────────────────────────────────────────
function OrderSuccess() {
    return (
        <div className="text-center py-16 px-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={28} className="text-[var(--price-green)]" />
            </div>
            <h2 className="text-2xl font-black text-[var(--text-primary)] mb-2">Order placed!</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-xs mx-auto">
                Your order has been confirmed. You'll receive a confirmation email shortly.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/orders" className="h-11 px-6 rounded-full bg-[var(--brand-blue)] text-white text-sm font-bold hover:bg-[var(--brand-blue-dark)] transition-colors">
                    View orders
                </Link>
                <Link href="/" className="h-11 px-6 rounded-full border border-[var(--border-input)] text-sm font-bold text-[var(--text-primary)] hover:bg-zinc-50 transition-colors">
                    Keep shopping
                </Link>
            </div>
        </div>
    )
}

// ── Main Checkout component ──────────────────────────────────────────────
export function CheckoutFlow() {
    const [step, setStep] = useState<Step>('delivery')
    const [placed, setPlaced] = useState(false)

    const subtotal = MOCK_CART.reduce((s, i) => s + i.price * i.qty, 0)

    if (placed) return <OrderSuccess />

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
            {/* Left: steps */}
            <div className="bg-white border border-[var(--border-subtle)] rounded-xl p-6">
                <Stepper current={step} />
                {step === 'delivery' && <DeliveryStep onNext={() => setStep('payment')} />}
                {step === 'payment' && <PaymentStep onNext={() => setStep('review')} onBack={() => setStep('delivery')} />}
                {step === 'review' && <ReviewStep onBack={() => setStep('payment')} onPlace={() => setPlaced(true)} />}
            </div>

            {/* Right: order summary (sticky) */}
            <div className="bg-white border border-[var(--border-subtle)] rounded-xl p-5 space-y-4 lg:sticky lg:top-[88px]">
                <h2 className="text-base font-black text-[var(--text-primary)]">Order summary</h2>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {MOCK_CART.map(item => (
                        <div key={item.id} className="flex gap-3 items-center">
                            <div className="relative shrink-0">
                                <Image src={item.imageUrl} alt={item.title} width={48} height={48} className="w-12 h-12 object-contain bg-zinc-50 rounded-lg border border-[var(--border-subtle)] p-1" />
                                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-zinc-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{item.qty}</span>
                            </div>
                            <div className="flex-1 min-w-0 text-xs">
                                <p className="font-medium text-[var(--text-primary)] line-clamp-2 leading-snug">{item.title}</p>
                            </div>
                            <p className="text-sm font-bold shrink-0">${(item.price * item.qty).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <div className="border-t border-[var(--border-subtle)] pt-3 space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Delivery</span><span className="text-[var(--price-green)] font-semibold">Free</span></div>
                    <div className="flex justify-between text-base font-black">
                        <span>Total</span><span>${subtotal.toFixed(2)}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                    <ShieldCheck size={12} className="text-[var(--price-green)]" />
                    <span>Secured by Stripe</span>
                </div>
            </div>
        </div>
    )
}
