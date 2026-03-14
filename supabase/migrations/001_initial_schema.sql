-- ============================================================
-- LAAT Student Shop — Supabase Database Schema
-- Migration: 001_initial_schema.sql
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- PROFILES
-- Extends auth.users — one row per authenticated user
-- ─────────────────────────────────────────────────────────────
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url  text,
  campus      text,
  bio         text,
  is_plus     boolean not null default false,   -- LAAT+ subscriber
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-create profile on new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- CATEGORIES
-- Managed by admins — drives the "Departments" mega menu
-- ─────────────────────────────────────────────────────────────
create table public.categories (
  id          serial primary key,
  slug        text not null unique,
  name        text not null,
  parent_slug text references public.categories(slug),
  icon_emoji  text,
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Seed core categories
insert into public.categories (slug, name, icon_emoji, sort_order) values
  ('textbooks',  'Textbooks',         '📚', 1),
  ('tech',       'Tech & Electronics','💻', 2),
  ('dorm',       'Dorm Essentials',   '🛏️', 3),
  ('fashion',    'Fashion & Bags',    '👕', 4),
  ('sports',     'Sports & Fitness',  '⚽', 5),
  ('food',       'Food & Snacks',     '🍿', 6),
  ('stationery', 'Stationery',        '✏️', 7),
  ('other',      'Other',             '📦', 8);

-- ─────────────────────────────────────────────────────────────
-- PRODUCTS
-- Core listing table — the heart of the marketplace
-- ─────────────────────────────────────────────────────────────
create type public.product_status as enum (
  'draft',          -- Seller saved but not submitted
  'pending_review', -- Awaiting admin approval
  'active',         -- Live and visible to buyers
  'sold',           -- Transaction completed
  'archived'        -- Removed / expired
);

create type public.product_condition as enum (
  'new',
  'like_new',
  'good',
  'fair',
  'for_parts'
);

create table public.products (
  id              uuid primary key default gen_random_uuid(),
  seller_id       uuid not null references public.profiles(id) on delete cascade,
  category_slug   text not null references public.categories(slug),
  title           text not null check (char_length(title) between 10 and 150),
  description     text not null check (char_length(description) >= 20),
  price           numeric(10,2) not null check (price > 0),
  original_price  numeric(10,2) check (original_price > 0),
  condition       product_condition not null,
  status          product_status not null default 'pending_review',
  campus          text,
  is_featured     boolean not null default false,  -- Admin can pin to top
  view_count      int not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- PRODUCT IMAGES
-- Each product can have 1–6 images (first = primary/cover)
-- ─────────────────────────────────────────────────────────────
create table public.product_images (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references public.products(id) on delete cascade,
  storage_path text not null,  -- Supabase Storage path
  url         text not null,   -- Public URL
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- WISHLISTS
-- Favorite products per user
-- ─────────────────────────────────────────────────────────────
create table public.wishlists (
  user_id    uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

-- ─────────────────────────────────────────────────────────────
-- ORDERS
-- ─────────────────────────────────────────────────────────────
create type public.order_status as enum (
  'pending',    -- Payment initiated
  'paid',       -- Payment confirmed
  'shipped',    -- Seller marked shipped / pickup arranged
  'delivered',  -- Buyer confirmed received
  'cancelled',
  'disputed'
);

create table public.orders (
  id            uuid primary key default gen_random_uuid(),
  buyer_id      uuid not null references public.profiles(id),
  product_id    uuid not null references public.products(id),
  amount        numeric(10,2) not null,
  platform_fee  numeric(10,2) not null,  -- 8% commission
  status        order_status not null default 'pending',
  stripe_pi_id  text,                   -- Stripe payment intent ID
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- REVIEWS
-- Buyer reviews a seller after order is delivered
-- ─────────────────────────────────────────────────────────────
create table public.reviews (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders(id) on delete cascade unique,
  reviewer_id uuid not null references public.profiles(id),
  seller_id   uuid not null references public.profiles(id),
  rating      int not null check (rating between 1 and 5),
  body        text check (char_length(body) <= 500),
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- HERO BANNERS
-- CMS-managed — change homepage banners without code deploys
-- ─────────────────────────────────────────────────────────────
create table public.hero_banners (
  id          serial primary key,
  headline    text not null,
  subheadline text,
  cta_label   text not null,
  cta_href    text not null,
  image_url   text not null,
  bg_color    text not null default '#e8f4fd',
  is_active   boolean not null default true,
  sort_order  int not null default 0,
  starts_at   timestamptz,   -- Scheduled campaigns
  ends_at     timestamptz,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- CRITICAL: Without these policies, the anon key can read everything.
-- ─────────────────────────────────────────────────────────────

alter table public.profiles       enable row level security;
alter table public.products       enable row level security;
alter table public.product_images enable row level security;
alter table public.wishlists      enable row level security;
alter table public.orders         enable row level security;
alter table public.reviews        enable row level security;
alter table public.categories     enable row level security;
alter table public.hero_banners   enable row level security;

-- Categories: public read, admin write
create policy "categories_public_read"  on public.categories  for select using (true);
create policy "hero_banners_public_read" on public.hero_banners for select using (is_active = true);

-- Profiles: public read, owner write
create policy "profiles_public_read"   on public.profiles     for select using (true);
create policy "profiles_owner_update"  on public.profiles     for update using (auth.uid() = id);

-- Products: active listings are public; sellers manage their own
create policy "products_public_read"   on public.products     for select using (status = 'active');
create policy "products_seller_all"    on public.products     for all    using (auth.uid() = seller_id);

-- Product images: same visibility as product
create policy "product_images_public_read" on public.product_images for select
  using (exists (select 1 from public.products p where p.id = product_id and p.status = 'active'));
create policy "product_images_seller_all"  on public.product_images for all
  using (exists (select 1 from public.products p where p.id = product_id and p.seller_id = auth.uid()));

-- Wishlists: private per user
create policy "wishlists_owner_all" on public.wishlists for all using (auth.uid() = user_id);

-- Orders: buyer and seller see their own orders
create policy "orders_buyer_read"  on public.orders for select using (auth.uid() = buyer_id);
create policy "orders_seller_read" on public.orders for select
  using (exists (select 1 from public.products p where p.id = product_id and p.seller_id = auth.uid()));

-- Reviews: public read, reviewer creates once per order
create policy "reviews_public_read"   on public.reviews for select using (true);
create policy "reviews_owner_insert"  on public.reviews for insert with check (auth.uid() = reviewer_id);

-- ─────────────────────────────────────────────────────────────
-- INDEXES (performance)
-- ─────────────────────────────────────────────────────────────
create index idx_products_category  on public.products(category_slug) where status = 'active';
create index idx_products_seller    on public.products(seller_id);
create index idx_products_status    on public.products(status);
create index idx_products_created   on public.products(created_at desc) where status = 'active';
create index idx_products_featured  on public.products(is_featured) where status = 'active';
create index idx_wishlists_user     on public.wishlists(user_id);
create index idx_orders_buyer       on public.orders(buyer_id);
create index idx_product_images_product on public.product_images(product_id, sort_order);

-- Full-text search on product title + description
create index idx_products_fts on public.products
  using gin(to_tsvector('english', title || ' ' || description))
  where status = 'active';
