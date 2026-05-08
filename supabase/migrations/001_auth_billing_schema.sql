-- MINEKA AI auth + billing schema.
-- Safe to run on a new Supabase project. It only creates tables/policies if missing.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id text not null unique,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text not null unique,
  plan_id text not null,
  status text not null,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  plan_id text,
  stripe_checkout_session_id text unique,
  stripe_invoice_id text unique,
  stripe_subscription_id text,
  amount_total integer,
  currency text,
  status text,
  created_at timestamptz not null default now()
);

create table if not exists public.onboarding (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_name text,
  industry text,
  team_size text,
  main_process text,
  tools text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.plan_entitlements (
  id uuid primary key default gen_random_uuid(),
  plan_id text not null,
  entitlement_key text not null,
  entitlement_value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (plan_id, entitlement_key)
);

alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;
alter table public.onboarding enable row level security;
alter table public.plan_entitlements enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles_select_own') then
    create policy profiles_select_own on public.profiles for select using (auth.uid() = id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles_update_own') then
    create policy profiles_update_own on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles_insert_own') then
    create policy profiles_insert_own on public.profiles for insert with check (auth.uid() = id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'customers' and policyname = 'customers_select_own') then
    create policy customers_select_own on public.customers for select using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'subscriptions' and policyname = 'subscriptions_select_own') then
    create policy subscriptions_select_own on public.subscriptions for select using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'payments' and policyname = 'payments_select_own') then
    create policy payments_select_own on public.payments for select using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'onboarding' and policyname = 'onboarding_select_own') then
    create policy onboarding_select_own on public.onboarding for select using (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'onboarding' and policyname = 'onboarding_insert_own') then
    create policy onboarding_insert_own on public.onboarding for insert with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'onboarding' and policyname = 'onboarding_update_own') then
    create policy onboarding_update_own on public.onboarding for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'plan_entitlements' and policyname = 'plan_entitlements_read_all') then
    create policy plan_entitlements_read_all on public.plan_entitlements for select using (true);
  end if;
end $$;
