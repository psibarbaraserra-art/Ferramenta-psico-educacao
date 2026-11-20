# Passagem para o MindApp · Psique Ferramentas

Leia este documento no início da nova conversa. Ele resume a marca, a identidade visual e a infraestrutura que já existem no Psique Rastreios, para o MindApp seguir o mesmo padrão e se integrar a ele.

---

## 1. A marca

- **Marca-mãe:** Psique Ferramentas, ferramentas digitais para psicólogas(os).
- **Produtos:**
  - **Psique Rastreios:** biblioteca de 74 instrumentos de rastreio. Já está no ar e à venda.
  - **MindApp** (novo): agenda clínica com agendamento, financeiro, envio de atividades e rastreios e confirmação de sessão pelo paciente.
- **Assinatura visual sugerida:** "MindApp · by Psique Ferramentas", com o símbolo Ψ.
- **Responsável técnica:** Ana Bárbara Serra Oliveira · CRP 20/13.134 · Manaus/AM.
- **Contato do produto:** psiqueferramentas@gmail.com · WhatsApp +55 (92) 98115-5631.
- **Instagram:** Psique Ferramentas (comercial, para todos os produtos).

**Antes de lançar:** verificar no INPI (busca.inpi.gov.br) e nas lojas de apps se o nome "MindApp" já está em uso na área de software e saúde. É um nome comum e pode haver conflito.

---

## 2. Identidade visual

### Estilo
Suave e minimalista, com fundo creme, verde-oliva como cor principal e dourado nos detalhes. A tipografia é elegante e serifada nos títulos e limpa no texto. Os cartões têm cantos arredondados e bordas finas, e há muito espaço em branco. Nada de gradientes fortes nem de cores vibrantes.

### Cores (tema claro)
| Nome | Hex | Uso |
|---|---|---|
| bg (creme) | `#F6F2E9` | Fundo das páginas |
| surface | `#FFFDF8` | Cartões |
| line | `#E4DCCB` | Bordas e divisórias |
| ink | `#2F3326` | Texto principal |
| muted | `#73766A` | Texto secundário |
| olive | `#6B7A4B` | Cor principal, botões |
| olive-deep | `#4F5B36` | Títulos e botão ao passar o mouse |
| olive-soft | `#E7EADB` | Fundos de ícones, selos e itens selecionados |
| gold | `#B08D4F` | Detalhes, rótulos e o símbolo Ψ |
| gold-soft | `#F1E6CF` | Avisos suaves e selos dourados |

### Cores de estado (faixas de resultado)
| Tom | Hex | Significado |
|---|---|---|
| t0 | `#7F9461` | Bom, mínimo |
| t1 | `#C3A257` | Atenção leve |
| t2 | `#C2875A` | Moderado |
| t3 | `#A85E57` | Alto, risco e alertas |

### Tema escuro
| Nome | Hex |
|---|---|
| bg | `#1B1D16` |
| surface | `#24271E` |
| line | `#363A2C` |
| ink | `#ECE7D8` |
| muted | `#A6A797` |
| olive | `#A4B27C` |
| olive-deep | `#C3CF9C` |
| olive-soft | `#2F3427` |
| gold | `#D3B57A` |
| gold-soft | `#3A3324` |

### Tipografia (Google Fonts)
- **Títulos:** Cormorant Garamond, peso 600. O itálico em dourado é usado para destacar palavras.
- **Texto e botões:** Manrope, pesos 400 a 800.
- **Rótulos pequenos ("eyebrow"):** Manrope 700, em maiúsculas, com espaçamento entre letras de 0,14 a 0,22em, na cor dourada.

### Símbolo Ψ (SVG)
```html
<svg width="38" height="38" viewBox="0 0 48 48" fill="none">
  <circle cx="24" cy="24" r="22.5" stroke="#6B7A4B" stroke-opacity=".35"/>
  <g stroke="#B08D4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24 11v26"/>
    <path d="M14.5 15.5v4.5a9.5 9.5 0 0 0 19 0v-4.5"/>
    <path d="M19 37h10"/>
  </g>
</svg>
```

### Componentes
- **Botão principal:** fundo olive, texto creme, cantos de 14px, peso 600.
- **Botão suave:** fundo olive-soft, texto olive-deep.
- **Cartão:** fundo surface, borda de 1px na cor line, cantos de 18 a 24px, sombra muito leve.
- **Selos ("pill"):** cantos totalmente redondos, texto em maiúsculas pequenas, fundo olive-soft ou gold-soft.
- **Ícones:** traço fino (1.6), cantos arredondados, dentro de um quadrado olive-soft com cantos de 16px. No Rastreios, cada instrumento usa um emoji próprio.
- **Layout:** uma coluna central (máximo de 680px no app e 1040px nas páginas de vendas), pensada primeiro para o celular.

### Arquivos de referência no repositório do Psique Rastreios
- `index.html`: todos os estilos (variáveis de cor em `:root`).
- `vendas.html`: modelo de página de vendas.
- `termos.html`, `privacidade.html` e `legal.css`: modelo dos documentos legais.
- `marketing/`: capas, kit de Instagram e fotos de perfil.
- `marketing/instagram/fonte/`: modelos em HTML do Reels e do carrossel, reaproveitáveis.

---

## 3. Infraestrutura compartilhada

| Peça | Detalhe |
|---|---|
| **Supabase** | Projeto `apdmcrstwrgfoyglmjwu` (https://apdmcrstwrgfoyglmjwu.supabase.co). Chave pública: `sb_publishable_88sPv20T9csLi-8biKBpwQ_RnmvOqP1` |
| **Tabelas** | `assinaturas` (por e-mail), `perfis` (nome, CRP, WhatsApp, bloqueado), `eventos_kiwify` (dados mínimos) |
| **Login** | E-mail e senha, com nome completo e CRP obrigatórios. Saída automática após 30 minutos sem uso |
| **E-mails** | Brevo, via SMTP no Supabase. Remetente: "Psique Rastreios" <psiqueferramentas@gmail.com> |
| **Vendas** | Kiwify. A função `kiwify-webhook` no Supabase libera e bloqueia o acesso conforme os avisos |
| **Hospedagem** | GitHub Pages |

### Decisões para integrar o MindApp
- **Usar o mesmo projeto Supabase**, para o profissional ter **uma única conta** nos dois apps.
- **Separar o acesso por produto:** adicionar uma coluna `produto` à tabela `assinaturas` (ou criar uma tabela `assinaturas_produtos`). A função `kiwify-webhook` deve usar o `product_id` da Kiwify para saber qual produto liberar. **Hoje a tabela é só por e-mail e serve ao Rastreios:** a mudança precisa manter o Rastreios funcionando.
- **Envio de rastreios dentro do MindApp:** reaproveitar o formato de link do Rastreios (`?a=` com os dados codificados). O ideal é o MindApp abrir o link do Rastreios para quem assina os dois.
- **A senha do banco, a chave SMTP e a chave do webhook nunca vão para o código nem para o chat.**

---

## 4. Cuidados específicos do MindApp

- **Dados de pacientes ficam no servidor** (nomes, telefones, sessões, pagamentos). Isso exige segurança no banco por profissional (RLS), cópias de segurança, uma política de privacidade própria, o MindApp atuando como operador e o profissional como controlador, além de sigilo conforme o Código de Ética.
- **Anotações clínicas e prontuário,** se forem incluídos, seguem a Resolução CFP nº 01/2009 sobre registro documental. Avaliar com cuidado.
- **Lembretes:** e-mail via Brevo, sem custo. O WhatsApp automático exige a API oficial do WhatsApp Business, que é paga. Começar com e-mail e um botão de WhatsApp manual.
- **Plano do Supabase:** com dados de pacientes guardados, considerar o plano pago (backups diários, sem pausa).
- **Ética na divulgação:** nome e CRP da responsável técnica, sem promessas de resultado e sem depoimentos de pacientes.

---

## 5. Funções desejadas (ponto de partida para o escopo)
- Agendamento flexível (recorrências, encaixes, bloqueios de horário)
- Financeiro (valores por sessão, pagamentos, pendências, relatórios)
- Envio de atividades ao paciente
- Envio de rastreios, integrado ao Psique Rastreios
- Lembrete ao paciente com confirmação de presença

Definir na nova conversa o que entra na primeira versão (o mínimo para vender) e o que fica para depois.
