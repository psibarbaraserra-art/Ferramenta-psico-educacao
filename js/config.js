/* Configuração pública do app. A chave "publishable" foi feita para ficar no navegador:
   a proteção dos dados é feita pelas regras de segurança (RLS) no Supabase. */
window.PSIQUE_CONFIG = {
  supabaseUrl: 'https://apdmcrstwrgfoyglmjwu.supabase.co',
  supabaseKey: 'sb_publishable_88sPv20T9csLi-8biKBpwQ_RnmvOqP1',
  checkoutUrl: 'https://pay.kiwify.com.br/mdAL7hc',
  preco: 'R$ 39,90 por mês',
  responsavel: 'Ana Bárbara Serra Oliveira',   // nome da responsável técnica (Termos, Política e página de vendas)
  crp: 'CRP 20/13.134',                  // registro profissional, ex.: CRP 06/123456
  contato: 'psiqueferramentas@gmail.com',       // e-mail de suporte e de pedidos de privacidade
  telefone: '+55 (92) 98115-5631',           // WhatsApp de suporte
  foro: 'Manaus/AM',                          // foro dos Termos de Uso
  termosVersao: '2026-11-20',
  versao: '2026.11.20-7'   // ao publicar mudanças, atualize aqui e nos ?v= do index.html e do vendas.html
};
