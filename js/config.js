/* Configuração pública do app. A chave "publishable" foi feita para ficar no navegador:
   a proteção dos dados é feita pelas regras de segurança (RLS) no Supabase. */
window.PSIQUE_CONFIG = {
  supabaseUrl: 'https://apdmcrstwrgfoyglmjwu.supabase.co',
  supabaseKey: 'sb_publishable_88sPv20T9csLi-8biKBpwQ_RnmvOqP1',
  checkoutUrl: 'https://pay.kiwify.com.br/mdAL7hc',
  preco: 'R$ 39,90 por mês',
  responsavel: '',          // nome completo da responsável técnica (aparece nos Termos, na Política e na página de vendas)
  crp: '',                  // registro profissional, ex.: CRP 06/123456
  contato: '',              // e-mail para suporte e para pedidos de privacidade
  foro: '',                 // cidade/UF do foro dos Termos de Uso
  termosVersao: '2026-11-20',
  versao: '2026.11.20-3'   // ao publicar mudanças, atualize aqui e nos ?v= do index.html e do vendas.html
};
