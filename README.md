# Psique Rastreios · Ferramentas de Psicoeducação

Aplicativo web independente para psicólogos(as) aplicarem rastreios, enviarem por link ao paciente e receberem um relatório pronto, com faixa de resultado, psicoeducação e PDF.

## Como funciona
1. O(a) profissional escolhe um rastreio e gera um link com o nome do paciente.
2. O paciente responde pelo celular, uma pergunta por tela.
3. Ao final, o paciente envia as respostas pelo WhatsApp (link com os dados codificados).
4. O(a) profissional abre o link e vê o relatório, que pode salvar em PDF ou enviar como devolutiva.

Não há servidor nesta versão: os dados ficam no link e no aparelho de quem abre.

## Biblioteca (75 rastreios em 9 categorias)
Ansiedade · Humor · Saúde materna e puerpério · Trauma · Estresse e burnout · Personalidade · Neurodesenvolvimento · Relacionamentos · Outros transtornos.

### Instrumentos validados (15)
Licenças conferidas nas fontes oficiais em 20/11/2026, quando a página estava acessível.

| Escala | Tema | Situação de uso comercial | Conferido na fonte |
|---|---|---|---|
| PHQ-9, GAD-7, PHQ-15, PHQ pânico | Depressão, ansiedade, somatização, pânico | "No permission is required to reproduce, translate, display or distribute" (phqscreeners.com) | ✅ |
| PCL-5, PC-PTSD-5 | TEPT e trauma | "Public domain and not copyrighted" (ptsd.va.gov) | ✅ |
| ASQ (NIMH) | Risco de suicídio | "Free of charge" (nimh.nih.gov) | ✅ |
| AUDIT | Álcool | Publicação da OMS sob CC BY-NC-SA 3.0 IGO (não comercial). **Confirmar com a OMS** | ✅ licença lida, uso comercial pendente |
| DASS-21 | Depressão, ansiedade, estresse | Conhecido como domínio público | ⚠️ página indisponível |
| ITQ | TEPT complexo | Disponibilizado gratuitamente pelos autores | ⚠️ página indisponível |
| ASRS-18 Parte A | TDAH adulto | OMS/Harvard. **Confirmar uso comercial** | ⚠️ página indisponível |
| EPDS | Depressão pós-parto | © Royal College of Psychiatrists. **Confirmar uso comercial** | ⚠️ página indisponível |
| SCOFF | Transtornos alimentares | Publicado no BMJ. **Confirmar uso comercial** | não consultado |
| SNAP-IV | TDAH infantil | Conhecido como domínio público | não consultado |
| ACE | Experiências adversas | CDC-Kaiser, uso livre | não consultado |

Traduções marcadas como "tradução de trabalho" devem ser comparadas com as versões brasileiras validadas antes do uso formal.

### Rastreios de triagem Psique (60)
Construídos para este app a partir dos critérios do DSM-5-TR e da CID-11, para levantar hipóteses e orientar encaminhamentos. Ainda não passaram por estudo de validação psicométrica, e isso aparece na referência de cada um. Precisam de revisão clínica antes da venda.

### Cuidados de segurança embutidos
- Itens de risco (PHQ-9 item 9, EPDS item 10, ASQ, desesperança, puerpério, borderline) geram alerta no relatório e mostram ao paciente o CVV 188 e o SAMU 192.
- Rastreios de violência mostram Ligue 180, Disque 100 e 190.
- Rastreios sensíveis (personalidade, violência, suicídio, bipolar, vínculo) não exibem devolutiva automática ao paciente.

## Login e assinatura (Supabase + Kiwify)
1. **Banco:** cole `supabase/01-estrutura.sql` em SQL Editor → Run.
2. **E-mail:** em Authentication → Sign In / Providers → Email, desligue "Confirm email" enquanto não houver um provedor de e-mail próprio (SMTP).
3. **Acesso cortesia:** `insert into public.assinaturas (email, status, origem) values ('email@exemplo.com', 'ativa', 'cortesia');`
4. **Kiwify:** publique `supabase/functions/kiwify-webhook` como Edge Function (com "Verify JWT" desligado), crie o segredo `KIWIFY_CHAVE` e cadastre na Kiwify o webhook `https://<projeto>.supabase.co/functions/v1/kiwify-webhook?chave=<KIWIFY_CHAVE>`.

O link do paciente continua funcionando sem login.

## Estrutura
- `index.html` — página e estilos
- `js/app.js` — telas, pontuação, links e login
- `js/config.js` — endereço e chave pública do Supabase
- `js/vendor/` — biblioteca supabase-js 2.45.4 (licença MIT)
- `supabase/` — estrutura do banco e função do webhook da Kiwify
- `js/escalas-validadas.js` — instrumentos validados
- `js/escalas-psicoeducativas.js` — questionários autorais

## Publicar (GitHub Pages)
1. No GitHub, abra o repositório e vá em **Settings → Pages**.
2. Em **Source**, escolha **Deploy from a branch**.
3. Em **Branch**, escolha `ccr-5d0f7dd5-4vayoj` e a pasta `/ (root)`, e clique em **Save**.
4. Em 1 ou 2 minutos o app fica no ar em `https://psibarbaraserra-art.github.io/Ferramenta-psico-educacao/`.

No celular, abra o endereço e use "Adicionar à tela inicial" para instalar como aplicativo.

## Próximas etapas
- Login real e liberação automática de acesso pela plataforma de vendas (Hotmart/Kiwify)
- Respostas chegando direto no painel, sem depender do WhatsApp (requer backend com LGPD)
- Instalar como app no celular (PWA)
- Novos rastreios: personalidade, sono, autoestima
