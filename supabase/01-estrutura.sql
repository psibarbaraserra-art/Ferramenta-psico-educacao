-- Psique Rastreios · estrutura do banco
-- Cole tudo no Supabase em: SQL Editor → New query → Run

-- Assinaturas (alimentada pela Kiwify)
create table if not exists public.assinaturas (
  email          text primary key,
  status         text not null default 'ativa',   -- ativa | atrasada | cancelada | reembolsada
  expira_em      timestamptz,                      -- vazio = sem data de término (cortesia)
  origem         text not null default 'kiwify',   -- kiwify | cortesia
  pedido         text,
  atualizado_em  timestamptz not null default now()
);
alter table public.assinaturas enable row level security;
drop policy if exists "ver a propria assinatura" on public.assinaturas;
create policy "ver a propria assinatura" on public.assinaturas
  for select to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));

-- Perfil do profissional
create table if not exists public.perfis (
  id             uuid primary key references auth.users(id) on delete cascade,
  nome           text,
  crp            text,
  whatsapp       text,
  atualizado_em  timestamptz not null default now()
);
alter table public.perfis enable row level security;
drop policy if exists "ler o proprio perfil" on public.perfis;
drop policy if exists "criar o proprio perfil" on public.perfis;
drop policy if exists "editar o proprio perfil" on public.perfis;
create policy "ler o proprio perfil" on public.perfis for select to authenticated using (id = auth.uid());
create policy "criar o proprio perfil" on public.perfis for insert to authenticated with check (id = auth.uid());
create policy "editar o proprio perfil" on public.perfis for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Registro dos avisos recebidos da Kiwify (ajuda a conferir problemas)
create table if not exists public.eventos_kiwify (
  id          bigserial primary key,
  recebido_em timestamptz not null default now(),
  tipo        text,
  email       text,
  payload     jsonb
);
alter table public.eventos_kiwify enable row level security;
-- sem políticas: só o próprio Supabase (função do webhook) lê e grava aqui
