-- Lista de profissionais cadastrados, do mais recente para o mais antigo.
-- Confira o nome e o CRP em https://cadastro.cfp.org.br
select u.email, p.nome, p.crp, p.bloqueado, u.created_at as cadastrado_em
from auth.users u
left join public.perfis p on p.id = u.id
order by u.created_at desc;

-- Para BLOQUEAR alguém (troque o e-mail):
-- update public.perfis set bloqueado = true where id = (select id from auth.users where email = 'email@exemplo.com');

-- Para DESBLOQUEAR:
-- update public.perfis set bloqueado = false where id = (select id from auth.users where email = 'email@exemplo.com');
