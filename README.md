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
| Escala | Tema | Situação de uso |
|---|---|---|
| PHQ-9, GAD-7, PHQ-15, PHQ módulo de pânico | Depressão, ansiedade, somatização, pânico | Pfizer: sem necessidade de permissão |
| DASS-21 | Depressão, ansiedade e estresse | Domínio público |
| ASQ (NIMH) | Risco de suicídio | Domínio público (governo dos EUA) |
| PCL-5, PC-PTSD-5 | TEPT e trauma | Domínio público (National Center for PTSD) |
| ITQ | TEPT complexo | Disponibilizado gratuitamente pelos autores |
| ACE | Experiências adversas na infância | Uso livre (CDC-Kaiser) |
| AUDIT | Álcool | OMS, uso livre |
| SNAP-IV | TDAH infantil | Domínio público |
| SCOFF | Transtornos alimentares | Publicado no BMJ; confirmar uso comercial |
| ASRS-18 Parte A | TDAH adulto | OMS; **confirmar licença para uso comercial** |
| EPDS | Depressão pós-parto | © Royal College of Psychiatrists; **confirmar licença para uso comercial** |

Traduções marcadas como "tradução de trabalho" devem ser comparadas com as versões brasileiras validadas antes do uso formal.

### Questionários psicoeducativos autorais (60)
Escritos para este app a partir de critérios descritivos do DSM-5-TR e da CID-11. **Não são validados**: servem para psicoeducação e para orientar a entrevista clínica. Precisam de revisão clínica antes da venda.

### Cuidados de segurança embutidos
- Itens de risco (PHQ-9 item 9, EPDS item 10, ASQ, desesperança, puerpério, borderline) geram alerta no relatório e mostram ao paciente o CVV 188 e o SAMU 192.
- Rastreios de violência mostram Ligue 180, Disque 100 e 190.
- Rastreios sensíveis (personalidade, violência, suicídio, bipolar, vínculo) não exibem devolutiva automática ao paciente.

## Estrutura
- `index.html` — página e estilos
- `js/app.js` — telas, pontuação e links
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
