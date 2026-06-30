-- Supabase table definitions for Soltexs Bonda Fashion

-- Profiles table stores user profile metadata and avatars
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  email text unique not null,
  updated_at timestamptz default now()
);

-- Orders table stores completed orders with JSON items
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  items jsonb not null,
  total numeric(10,2) not null,
  shipping_address text not null,
  phone text not null,
  status text default 'pending',
  created_at timestamptz default now()
);

create index if not exists idx_orders_user_id on orders(user_id);
