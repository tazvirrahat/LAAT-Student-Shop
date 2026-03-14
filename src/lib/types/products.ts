/**
 * LAAT Student Shop — Product data types
 * These interfaces model the shape of product data coming from Supabase.
 * The mock data below allows the homepage to render without a live database.
 */

export interface Product {
    id: string
    title: string
    price: number          // in decimal (e.g. 12.99)
    originalPrice?: number // for strike-through
    imageUrl: string
    rating: number         // 0-5
    reviewCount: number
    badge?: 'Clearance' | 'Rollback' | 'Best Seller' | 'New'
    fulfillment?: 'Free delivery' | 'Pickup today' | 'Free pickup'
    hasOptions?: boolean   // shows "Options" pill instead of "Add to cart"
}

export interface HeroBanner {
    id: string
    headline: string
    subheadline?: string
    ctaLabel: string
    ctaHref: string
    bgColor: string
    imageUrl: string
}

// ── Mock Products ──────────────────────────────────────────────────────────────

export const MOCK_FLASH_DEALS: Product[] = [
    {
        id: '1',
        title: 'Lenovo IdeaPad 3 Laptop 15.6" FHD, Intel Core i5, 8GB RAM, 256GB SSD',
        price: 329.99,
        originalPrice: 549.99,
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
        rating: 4.3,
        reviewCount: 1842,
        badge: 'Rollback',
        fulfillment: 'Free delivery',
        hasOptions: false,
    },
    {
        id: '2',
        title: 'Apple AirPods Pro (2nd Generation) Wireless Earbuds with USB-C',
        price: 189.00,
        originalPrice: 249.00,
        imageUrl: 'https://images.unsplash.com/photo-1606741965509-717c6a4e4e94?w=400&h=400&fit=crop',
        rating: 4.8,
        reviewCount: 6230,
        badge: 'Clearance',
        fulfillment: 'Free delivery',
        hasOptions: false,
    },
    {
        id: '3',
        title: 'Fjällräven Kånken Classic Backpack — Perfect for Lectures & Campus',
        price: 74.95,
        originalPrice: 110.00,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
        rating: 4.6,
        reviewCount: 3109,
        fulfillment: 'Pickup today',
        hasOptions: true,
    },
    {
        id: '4',
        title: 'Organic Chemistry 12th Edition by McMurry — Top Condition',
        price: 42.00,
        originalPrice: 189.95,
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
        rating: 4.1,
        reviewCount: 580,
        badge: 'Best Seller',
        fulfillment: 'Pickup today',
        hasOptions: false,
    },
    {
        id: '5',
        title: 'Philips Hue White & Color Ambiance Smart Bulb Starter Kit',
        price: 59.99,
        originalPrice: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        rating: 4.5,
        reviewCount: 924,
        badge: 'Rollback',
        fulfillment: 'Free delivery',
        hasOptions: true,
    },
    {
        id: '6',
        title: 'HP LaserJet Tank MFP 2604sdw Wireless All-in-One Printer',
        price: 199.00,
        originalPrice: 279.00,
        imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop',
        rating: 4.2,
        reviewCount: 311,
        badge: 'Clearance',
        fulfillment: 'Free delivery',
        hasOptions: false,
    },
]

export const MOCK_HERO_BANNERS: HeroBanner[] = [
    {
        id: '1',
        headline: 'Up to 70% off textbooks',
        subheadline: 'Buy & sell used books directly with students on campus.',
        ctaLabel: 'Shop Textbooks',
        ctaHref: '/textbooks',
        bgColor: '#e8f4fd',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop',
    },
    {
        id: '2',
        headline: 'Dorm room ready — from $12',
        subheadline: 'Everything you need for move-in day.',
        ctaLabel: 'Shop Dorm Essentials',
        ctaHref: '/dorm',
        bgColor: '#fff8e8',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop',
    },
    {
        id: '3',
        headline: 'Student tech deals — MacBooks to monitors',
        subheadline: 'Top condition, verified student sellers.',
        ctaLabel: 'Shop Tech',
        ctaHref: '/tech',
        bgColor: '#f0f0f8',
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=400&fit=crop',
    },
]
