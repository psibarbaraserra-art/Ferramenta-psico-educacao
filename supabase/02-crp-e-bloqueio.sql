-- Psique Rastreios · CRP obrigatório e bloqueio de cadastros
-- Cole no Supabase em: SQL Editor → New query → Run

-- 1. Coluna para bloquear cadastros cujo CRP não foi confirmado
alter table public.perfis add column if not exists bloqueado boolean not null default false;

-- 2. O profissional só pode editar nome, CRP e WhatsApp (não pode se desbloquear)
revoke insert, update on public.perfis from authenticated;
grant insert (id, nome, crp, whatsapp, atualizado_em) on public.perfis to authenticated;
grant update (nome, crp, whatsapp, atualizado_em) on public.perfis to authenticated;

-- 3. Cadastro bloqueado não enxerga a assinatura, então o acesso é negado também no servidor
drop policy if exists "ver a propria assinatura" on public.assinaturas;
create policy "ver a propria assinatura" on public.assinaturas
  for select to authenticated
  using (
    lower(email) = lower(auth.jwt() ->> 'email')
    and not exists (select 1 from public.perfis p where p.id = auth.uid() and p.bloqueado)
  );
