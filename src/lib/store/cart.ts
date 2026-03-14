import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/lib/types/products'

export interface CartItem extends Product {
    qty: number
}

interface CartState {
    items: CartItem[]
    addItem: (product: Product, quantity?: number) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    getCartTotal: () => number
    getCartCount: () => number
    getSavingsTotal: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === product.id)
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id
                                    ? { ...item, qty: item.qty + quantity }
                                    : item
                            ),
                        }
                    }
                    return { items: [...state.items, { ...product, qty: quantity }] }
                })
            },

            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                }))
            },

            updateQuantity: (productId, quantity) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === productId ? { ...item, qty: Math.max(1, quantity) } : item
                    ),
                }))
            },

            clearCart: () => set({ items: [] }),

            getCartTotal: () => {
                const { items } = get()
                return items.reduce((total, item) => total + item.price * item.qty, 0)
            },

            getSavingsTotal: () => {
                const { items } = get()
                return items.reduce((total, item) => total + ((item.originalPrice ?? item.price) - item.price) * item.qty, 0)
            },

            getCartCount: () => {
                const { items } = get()
                return items.reduce((count, item) => count + item.qty, 0)
            },
        }),
        {
            name: 'laat-cart-storage',
        }
    )
)
