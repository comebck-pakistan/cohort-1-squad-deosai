-- Add whatsapp_connected column to public.sellers table
alter table public.sellers add column if not exists whatsapp_connected boolean not null default false;
