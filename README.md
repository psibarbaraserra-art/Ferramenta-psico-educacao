# Psique Rastreios · Ferramentas de Psicoeducação

Aplicativo web independente para psicólogos(as) aplicarem rastreios, enviarem por link ao paciente e receberem um relatório pronto, com faixa de resultado, psicoeducação e PDF.

## Como funciona
1. O(a) profissional escolhe um rastreio e gera um link com o nome do paciente.
2. O paciente responde pelo celular, uma pergunta por tela.
3. Ao final, o paciente envia as respostas pelo WhatsApp (link com os dados codificados).
4. O(a) profissional abre o link e vê o relatório, que pode salvar em PDF ou enviar como devolutiva.

Não há servidor nesta versão: os dados ficam no link e no aparelho de quem abre.

## Rastreios incluídos
- PHQ-9 (sintomas depressivos) — uso livre
- GAD-7 (ansiedade) — uso livre
- ASRS-18 Parte A (TDAH adulto, OMS) — uso livre
- Sinais de Burnout — questionário autoral, não validado

## Rodar
Abra `index.html` no navegador, ou publique a pasta em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel).

## Próximas etapas
- Login real e liberação automática de acesso pela plataforma de vendas (Hotmart/Kiwify)
- Respostas chegando direto no painel, sem depender do WhatsApp (requer backend com LGPD)
- Instalar como app no celular (PWA)
- Novos rastreios: personalidade, sono, autoestima
