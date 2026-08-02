create extension if not exists pgcrypto;

create table if not exists public.sellers (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  business_name text,
  owner_name text,
  phone text,
  plan text not null default 'Early Access',
  role text not null default 'seller',
  industry text,
  website text,
  role_description text,
  company_size text,
  onboarded boolean not null default false,
  whatsapp_requested boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sellers add column if not exists email text;
alter table public.sellers add column if not exists business_name text;
alter table public.sellers add column if not exists owner_name text;
alter table public.sellers add column if not exists phone text;
alter table public.sellers add column if not exists plan text default 'Early Access';
alter table public.sellers add column if not exists role text default 'seller';
alter table public.sellers add column if not exists industry text;
alter table public.sellers add column if not exists website text;
alter table public.sellers add column if not exists role_description text;
alter table public.sellers add column if not exists company_size text;
alter table public.sellers add column if not exists onboarded boolean default false;
alter table public.sellers add column if not exists whatsapp_requested boolean default false;
alter table public.sellers add column if not exists created_at timestamptz default now();
alter table public.sellers add column if not exists updated_at timestamptz default now();

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  name text not null,
  price numeric(12, 2) not null default 0,
  category text not null default '',
  availability_status text not null default 'in_stock',
  description text not null default '',
  image_url text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products add column if not exists seller_id uuid references public.sellers(id) on delete cascade;
alter table public.products add column if not exists name text;
alter table public.products add column if not exists price numeric(12, 2) default 0;
alter table public.products add column if not exists category text default '';
alter table public.products add column if not exists availability_status text default 'in_stock';
alter table public.products add column if not exists description text default '';
alter table public.products add column if not exists image_url text default '';
alter table public.products add column if not exists metadata jsonb default '{}'::jsonb;
alter table public.products add column if not exists created_at timestamptz default now();
alter table public.products add column if not exists updated_at timestamptz default now();

create table if not exists public.agent_configs (
  seller_id uuid primary key references public.sellers(id) on delete cascade,
  agent_prompt text not null default '',
  agent_never_do text not null default '',
  agent_memory text not null default '',
  knowledge_items jsonb not null default '[]'::jsonb,
  tone_guidelines jsonb not null default '[]'::jsonb,
  conciseness text not null default 'concise',
  hinglish_support boolean not null default true,
  shopify_connected boolean not null default false,
  cod_auto_confirm boolean not null default true,
  handoff_message text not null default 'I do not have enough verified information to answer that accurately. I will ask the seller to reply personally.',
  updated_at timestamptz not null default now()
);

alter table public.agent_configs add column if not exists seller_id uuid references public.sellers(id) on delete cascade;
alter table public.agent_configs add column if not exists agent_prompt text default '';
alter table public.agent_configs add column if not exists agent_never_do text default '';
alter table public.agent_configs add column if not exists agent_memory text default '';
alter table public.agent_configs add column if not exists knowledge_items jsonb default '[]'::jsonb;
alter table public.agent_configs add column if not exists tone_guidelines jsonb default '[]'::jsonb;
alter table public.agent_configs add column if not exists conciseness text default 'concise';
alter table public.agent_configs add column if not exists hinglish_support boolean default true;
alter table public.agent_configs add column if not exists shopify_connected boolean default false;
alter table public.agent_configs add column if not exists cod_auto_confirm boolean default true;
alter table public.agent_configs add column if not exists handoff_message text default 'I do not have enough verified information to answer that accurately. I will ask the seller to reply personally.';
alter table public.agent_configs add column if not exists updated_at timestamptz default now();

create table if not exists public.whatsapp_accounts (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  phone_number text,
  phone_number_id text unique,
  business_account_id text,
  provider text not null default 'meta',
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (seller_id, provider)
);

alter table public.whatsapp_accounts add column if not exists seller_id uuid references public.sellers(id) on delete cascade;
alter table public.whatsapp_accounts add column if not exists phone_number text;
alter table public.whatsapp_accounts add column if not exists phone_number_id text;
alter table public.whatsapp_accounts add column if not exists business_account_id text;
alter table public.whatsapp_accounts add column if not exists provider text default 'meta';
alter table public.whatsapp_accounts add column if not exists status text default 'pending';
alter table public.whatsapp_accounts add column if not exists created_at timestamptz default now();
alter table public.whatsapp_accounts add column if not exists updated_at timestamptz default now();

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  channel text not null,
  external_id text not null,
  customer_name text,
  customer_phone text,
  status text not null default 'open',
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.conversations add column if not exists seller_id uuid references public.sellers(id) on delete cascade;
alter table public.conversations add column if not exists channel text;
alter table public.conversations add column if not exists external_id text;
alter table public.conversations add column if not exists customer_name text;
alter table public.conversations add column if not exists customer_phone text;
alter table public.conversations add column if not exists status text default 'open';
alter table public.conversations add column if not exists last_message_at timestamptz default now();
alter table public.conversations add column if not exists created_at timestamptz default now();
alter table public.conversations add column if not exists updated_at timestamptz default now();

create unique index if not exists conversations_seller_channel_external_idx
  on public.conversations (seller_id, channel, external_id);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  external_message_id text,
  direction text not null check (direction in ('inbound', 'outbound')),
  author text not null check (author in ('customer', 'bot', 'seller', 'system')),
  body text not null,
  action text,
  status text not null default 'received',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.messages add column if not exists seller_id uuid references public.sellers(id) on delete cascade;
alter table public.messages add column if not exists conversation_id uuid references public.conversations(id) on delete cascade;
alter table public.messages add column if not exists external_message_id text;
alter table public.messages add column if not exists direction text;
alter table public.messages add column if not exists author text;
alter table public.messages add column if not exists body text;
alter table public.messages add column if not exists action text;
alter table public.messages add column if not exists status text default 'received';
alter table public.messages add column if not exists metadata jsonb default '{}'::jsonb;
alter table public.messages add column if not exists created_at timestamptz default now();

create unique index if not exists messages_external_message_idx
  on public.messages (external_message_id)
  where external_message_id is not null;

create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  external_event_id text not null unique,
  payload jsonb not null,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.webhook_events add column if not exists provider text;
alter table public.webhook_events add column if not exists external_event_id text;
alter table public.webhook_events add column if not exists payload jsonb;
alter table public.webhook_events add column if not exists processed_at timestamptz;
alter table public.webhook_events add column if not exists created_at timestamptz default now();

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  conversation_id uuid references public.conversations(id) on delete set null,
  external_order_id text,
  customer_name text,
  customer_phone text,
  total numeric(12, 2) not null default 0,
  status text not null default 'pending_confirmation',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders add column if not exists seller_id uuid references public.sellers(id) on delete cascade;
alter table public.orders add column if not exists conversation_id uuid references public.conversations(id) on delete set null;
alter table public.orders add column if not exists external_order_id text;
alter table public.orders add column if not exists customer_name text;
alter table public.orders add column if not exists customer_phone text;
alter table public.orders add column if not exists total numeric(12, 2) default 0;
alter table public.orders add column if not exists status text default 'pending_confirmation';
alter table public.orders add column if not exists metadata jsonb default '{}'::jsonb;
alter table public.orders add column if not exists created_at timestamptz default now();
alter table public.orders add column if not exists updated_at timestamptz default now();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists sellers_set_updated_at on public.sellers;
create trigger sellers_set_updated_at before update on public.sellers
for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists agent_configs_set_updated_at on public.agent_configs;
create trigger agent_configs_set_updated_at before update on public.agent_configs
for each row execute function public.set_updated_at();

drop trigger if exists whatsapp_accounts_set_updated_at on public.whatsapp_accounts;
create trigger whatsapp_accounts_set_updated_at before update on public.whatsapp_accounts
for each row execute function public.set_updated_at();

drop trigger if exists conversations_set_updated_at on public.conversations;
create trigger conversations_set_updated_at before update on public.conversations
for each row execute function public.set_updated_at();

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at before update on public.orders
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.sellers (id, email, business_name, phone)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'business_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.sellers enable row level security;
alter table public.products enable row level security;
alter table public.agent_configs enable row level security;
alter table public.whatsapp_accounts enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.webhook_events enable row level security;
alter table public.orders enable row level security;

drop policy if exists sellers_select_own on public.sellers;
create policy sellers_select_own on public.sellers for select to authenticated
using (auth.uid() = id);
drop policy if exists sellers_update_own on public.sellers;
create policy sellers_update_own on public.sellers for update to authenticated
using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists products_manage_own on public.products;
create policy products_manage_own on public.products for all to authenticated
using (auth.uid() = seller_id)
with check (auth.uid() = seller_id);

drop policy if exists agent_configs_manage_own on public.agent_configs;
create policy agent_configs_manage_own on public.agent_configs for all to authenticated
using (auth.uid() = seller_id)
with check (auth.uid() = seller_id);

drop policy if exists whatsapp_accounts_manage_own on public.whatsapp_accounts;
create policy whatsapp_accounts_manage_own on public.whatsapp_accounts for all to authenticated
using (auth.uid() = seller_id)
with check (auth.uid() = seller_id);

drop policy if exists conversations_manage_own on public.conversations;
create policy conversations_manage_own on public.conversations for all to authenticated
using (auth.uid() = seller_id)
with check (auth.uid() = seller_id);

drop policy if exists messages_manage_own on public.messages;
create policy messages_manage_own on public.messages for all to authenticated
using (auth.uid() = seller_id)
with check (auth.uid() = seller_id);

drop policy if exists orders_manage_own on public.orders;
create policy orders_manage_own on public.orders for all to authenticated
using (auth.uid() = seller_id)
with check (auth.uid() = seller_id);

grant select, insert, update on public.sellers to authenticated;
grant select, insert, update, delete on public.products to authenticated;
grant select, insert, update, delete on public.agent_configs to authenticated;
grant select, insert, update, delete on public.whatsapp_accounts to authenticated;
grant select, insert, update, delete on public.conversations to authenticated;
grant select, insert, update, delete on public.messages to authenticated;
grant select, insert, update, delete on public.orders to authenticated;
grant all on public.sellers, public.products, public.agent_configs,
  public.whatsapp_accounts, public.conversations, public.messages,
  public.webhook_events, public.orders to service_role;

create index if not exists products_seller_id_idx on public.products (seller_id);
create index if not exists agent_configs_seller_id_idx on public.agent_configs (seller_id);
create index if not exists conversations_seller_id_idx on public.conversations (seller_id);
create index if not exists messages_seller_id_idx on public.messages (seller_id);
create index if not exists messages_conversation_id_idx on public.messages (conversation_id);
create index if not exists orders_seller_id_idx on public.orders (seller_id);
