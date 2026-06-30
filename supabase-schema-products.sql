-- Supabase product table for admin-managed shop catalog

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  price text not null,
  description text not null,
  image text not null,
  sizes text[] not null,
  details text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_products_category on products(category);
create index if not exists idx_products_slug on products(slug);
