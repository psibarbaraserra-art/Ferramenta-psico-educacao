/* Psique Rastreios — aplicação (telas, pontuação e links). */
(function(){
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store = {
  get(k, d){ try { const v = localStorage.getItem('psique:'+k); return v ? JSON.parse(v) : d; } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem('psique:'+k, JSON.stringify(v)); } catch(e){} },
  del(k){ try { localStorage.removeItem('psique:'+k); } catch(e){} }
};
const enc = o => { const b = new TextEncoder().encode(JSON.stringify(o)); let s=''; b.forEach(x => s += String.fromCharCode(x)); return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); };
const dec = t => { try { const s = atob(t.replace(/-/g,'+').replace(/_/g,'/')); return JSON.parse(new TextDecoder().decode(Uint8Array.from(s, c => c.charCodeAt(0)))); } catch(e){ return null; } };
const digits = s => { let d = String(s||'').replace(/\D/g,''); if (d && d.length <= 11) d = '55' + d; return d; };
const fmtDate = t => new Date(t).toLocaleDateString('pt-BR', {day:'2-digit', month:'short', year:'numeric'});
const baseUrl = () => location.origin + location.pathname;
const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
function toast(msg){ const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(() => t.hidden = true, 2200); }
function copy(text, inputSel, okMsg){
  const fallback = () => { const i = inputSel && $(inputSel); if (i){ i.focus(); i.select(); } toast('Selecione o texto e copie'); };
  try { navigator.clipboard.writeText(text).then(() => toast(okMsg || 'Link copiado'), fallback); } catch(e){ fallback(); }
}

/* ---------- Ícones ---------- */
const ICONS = {
  rain:'<path d="M7 15a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 8a3.5 3.5 0 0 1 0 7H7Z"/><path d="M9 18l-1 2M13 18l-1 2M17 18l-1 2"/>',
  wave:'<path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
  flame:'<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3-1-3 0-6 1-8.5Z"/>',
  focus:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".6" fill="currentColor"/>',
  puzzle:'<path d="M5 8h3a2 2 0 1 1 4 0h3v3a2 2 0 1 1 0 4v3h-3a2 2 0 1 0-4 0H5v-3a2 2 0 1 0 0-4V8Z"/>',
  moon:'<path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5Z"/>',
  heart:'<path d="M12 19s-7-4.4-7-9.5A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 2.5C19 14.6 12 19 12 19Z"/>',
  baby:'<circle cx="12" cy="9" r="4"/><path d="M10.6 8.6h.01M13.4 8.6h.01"/><path d="M6 20c1-3.5 3.3-5 6-5s5 1.5 6 5"/>',
  shield:'<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"/>',
  leaf:'<path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z"/><path d="M5 19l7-7"/>',
  cup:'<path d="M7 4h10l-1 8a4 4 0 0 1-8 0L7 4Z"/><path d="M12 16v4M9 20h6"/>',
  search:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
  back:'<path d="M15 6l-6 6 6 6"/>',
  wa:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Z"/>'
};
const icon = (n, size) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${size?`width="${size}" height="${size}"`:''} aria-hidden="true">${ICONS[n] || ICONS.leaf}</svg>`;
const LOGO = `<svg width="38" height="38" viewBox="0 0 48 48" fill="none" aria-hidden="true">
  <circle cx="24" cy="24" r="22.5" stroke="var(--olive)" stroke-opacity=".35"/>
  <g stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 11v26"/><path d="M14.5 15.5v4.5a9.5 9.5 0 0 0 19 0v-4.5"/><path d="M19 37h10"/></g>
</svg>`;
const BIGLOGO = LOGO.replace('width="38" height="38"','width="52" height="52"');

/* ---------- Catálogo ---------- */
const CATS = [
  {id:'ans', name:'Ansiedade e transtornos relacionados', short:'Ansiedade', icon:'wave'},
  {id:'hum', name:'Depressão e alterações de humor', short:'Humor', icon:'rain'},
  {id:'mat', name:'Saúde mental materna e puerpério', short:'Materna', icon:'baby'},
  {id:'tra', name:'Traumas e experiências adversas', short:'Trauma', icon:'shield'},
  {id:'bur', name:'Estresse, esgotamento e burnout', short:'Estresse', icon:'flame'},
  {id:'per', name:'Transtornos de personalidade', short:'Personalidade', icon:'puzzle'},
  {id:'neu', name:'Neurodesenvolvimento', short:'Neurodesenvolvimento', icon:'focus'},
  {id:'rel', name:'Relacionamentos e funcionamento emocional', short:'Relacionamentos', icon:'heart'},
  {id:'out', name:'Outros transtornos e condições', short:'Outros', icon:'leaf'}
];
const SCALES = (window.PSI && window.PSI.scales) || {};
const SUP = (window.PSI && window.PSI.support) || {
  suicide:'Se você estiver pensando em se machucar ou em tirar a própria vida, procure ajuda agora: CVV 188 (gratuito, 24h) ou SAMU 192.',
  violence:'Se você estiver em situação de violência: Ligue 180, Disque 100 ou 190 em caso de emergência.'
};
const ORDER = Object.keys(SCALES).filter(id => !SCALES[id].hidden);
const catIcon = s => s.icon || (CATS.find(c => c.id === s.cats[0]) || {}).icon;
const EMOJI = {
  phq9:'🌧️', gad7:'🌀', phqpanic:'💓', dass21:'⚖️', asq:'🛟', epds:'🤱', pcl5:'🛡️', pcptsd5:'🔔', itq:'🧱', ace:'🧷', audit:'🍷', scoff:'🍽️', phq15:'🩺', asrs:'🎯', snap:'🧒', burnout:'🔥',
  a_social:'👥', a_fobia:'🕷️', a_separacao:'🫂', a_saude:'🌡️', a_desempenho:'🎤',
  h_distimia:'🌫️', h_sazonal:'🍂', h_desesperanca:'🕯️', h_oscilacoes:'🎢', h_bipolar:'🌗',
  m_ansiedade:'🍼', m_blues:'💧', m_sobrecarga:'🧺', m_burnout:'🪫', m_adaptacao:'🌱', m_culpa:'💭', m_vinculo:'🤍', m_gestacao:'🤰', m_puerperio:'🌙',
  t_violencia:'🏠', t_abuso:'💔', t_luto:'🥀', t_dissociacao:'🪞',
  b_cronico:'⏳', b_sobrecarga:'🎒', b_compaixao:'🤲', b_exaustao:'🧠', b_trabalho:'💼', b_equilibrio:'🪴',
  p_borderline:'🌊', p_narcisista:'👑', p_dependente:'🔗', p_evitativa:'🐚', p_antissocial:'🚧', p_obsessiva:'📐', p_instabilidade:'🌪️', p_abandono:'🚪',
  n_tea_adulto:'🧩', n_tea_infantil:'🪀', n_atencao:'🔍', n_impulsividade:'⚡', n_hiperatividade:'🏃', n_executivas:'🗂️', n_social:'💬',
  r_dependencia:'🪢', r_ciume:'👀', r_rejeicao:'🥺', r_autoestima:'🌻', r_inseguranca:'🫥', r_limites:'✋', r_regulacao:'🎚️', r_comunicacao:'🗣️', r_abusivo:'⚠️', r_codependencia:'🤝',
  o_toc:'🔁', o_compulsao:'🍫', o_sono:'😴', o_luto:'🕊️', o_substancias:'💊'
};
const icoHTML = id => EMOJI[id] ? `<span class="emo" aria-hidden="true">${EMOJI[id]}</span>` : icon(catIcon(SCALES[id]));
const REFER = {
  ans:'Psiquiatria, para avaliar a indicação de tratamento medicamentoso, e psicoterapia (TCC)',
  hum:'Psiquiatria',
  mat:'Psiquiatria (de preferência perinatal), com comunicação à equipe de obstetrícia ou pediatria',
  tra:'Psicoterapia especializada em trauma (TCC focada no trauma ou EMDR) e psiquiatria',
  bur:'Psiquiatria e medicina do trabalho',
  per:'Psiquiatria e psicoterapia especializada (por exemplo, DBT)',
  neu:'Avaliação neuropsicológica e psiquiatria ou neurologia',
  rel:'Psicoterapia individual ou de casal',
  out:'Psiquiatria'
};
const REFER_ID = {
  audit:'CAPS AD ou psiquiatria com experiência em dependência química', o_substancias:'CAPS AD ou psiquiatria com experiência em dependência química',
  scoff:'Equipe multiprofissional em transtornos alimentares (psiquiatria e nutrição)', o_compulsao:'Equipe multiprofissional em transtornos alimentares (psiquiatria e nutrição)',
  o_sono:'Medicina do sono ou psiquiatria', phq15:'Clínica médica, para investigar causas físicas, e psiquiatria', a_saude:'Clínica médica de referência e psiquiatria',
  snap:'Neuropediatria ou psiquiatria infantil, com avaliação neuropsicológica', n_tea_infantil:'Neuropediatria ou psiquiatria infantil, com equipe multiprofissional',
  n_tea_adulto:'Psiquiatria e avaliação neuropsicológica com experiência em TEA no adulto',
  t_violencia:'Rede de proteção (CRAM, CREAS ou Delegacia da Mulher) e psicoterapia especializada em trauma', r_abusivo:'Rede de proteção (CRAM ou CREAS) e psicoterapia',
  asq:'Avaliação psiquiátrica com prioridade; em risco agudo, serviço de emergência (SAMU 192 ou pronto-socorro)',
  h_bipolar:'Psiquiatria, para investigação do espectro bipolar', o_toc:'Psiquiatria e psicoterapia com exposição e prevenção de resposta',
  m_vinculo:'Psiquiatria perinatal e intervenção na relação mãe-bebê', b_compaixao:'Supervisão clínica e psicoterapia pessoal'
};
const referFor = id => REFER_ID[id] || REFER[SCALES[id].cats[0]] || 'Psiquiatria';
const hypothesis = s => (s.topics && s.topics.length ? s.topics.join('; ') : s.title.replace(/^Rastreio (de |do |da )?/,''));

/* ---------- Pontuação ---------- */
const itemQ = it => typeof it === 'string' ? it : it.q;
const itemOpts = (s, it) => (typeof it === 'object' && it.o) || s.options;
const itemVal = (s, it, k) => (typeof it === 'object' && it.v) ? it.v[k] : k;
const itemMax = (s, it) => (typeof it === 'object' && it.v) ? Math.max(...it.v) : itemOpts(s, it).length - 1;

function compute(id, a){
  const s = SCALES[id];
  const v = s.items.map((it, i) => itemVal(s, it, a[i] ?? 0));
  let r = {total:v.reduce((x,y) => x+y, 0), max:s.items.reduce((x,it) => x + itemMax(s, it), 0), unit:'pontos'};
  if (s.compute) r = {...r, ...s.compute(v)};
  if (!r.level) r.level = s.levels.find(l => r.total <= l.max) || s.levels[s.levels.length-1];
  if (!r.dims && s.dims) r.dims = s.dims.map(d => {
    const val = d.items.reduce((x,i) => x + v[i], 0), m = d.items.reduce((x,i) => x + itemMax(s, s.items[i]), 0);
    const p = m ? val/m : 0; return {name:d.name, v:val, m, tone:p < .25 ? 0 : p < .5 ? 1 : p < .75 ? 2 : 3};
  });
  r.flags = s.flags ? s.flags(v) : [];
  const risk = r.flags.some(f => f.risk);
  r.support = [];
  if (s.alwaysSupport || (s.safety === 'suicide' && (risk || r.level.tone >= s.safetyMin)) || (risk && s.safety !== 'violence')) r.support.push(SUP.suicide);
  if (s.safety === 'violence' && r.level.tone >= (s.safetyMin ?? 2)) r.support.push(SUP.violence);
  if (s.safety === 'violence' && risk && !r.support.includes(SUP.violence)) r.support.push(SUP.violence);
  return r;
}
const toneVar = t => `var(--t${t})`;

/* ---------- Estado ---------- */
const DEMO_PRO = {name:'Psicóloga Exemplo', crp:'CRP 00/00000', wa:'', email:'', demo:true};
const EXAMPLES = [
  {id:'ex1', s:'gad7', p:'Paciente exemplo A', a:[2,2,3,2,1,2,1], t:Date.now()-86400000*2, ex:true},
  {id:'ex2', s:'burnout', p:'Paciente exemplo B', a:[3,3,2,3,2,3,2,2,3,2,1,2], t:Date.now()-86400000*6, ex:true}
];
const CFG = window.PSIQUE_CONFIG || {};
const LIVE = !!(window.supabase && CFG.supabaseUrl && CFG.supabaseKey && location.protocol !== 'file:' && !/claude/.test(location.hostname));
const RECOVERY = /type=recovery/.test(location.hash || '');
const sb = LIVE ? window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseKey) : null;
let user = null, sub = null;
const ativa = a => !!a && a.status !== 'reembolsada' && (!a.expira_em || new Date(a.expira_em) > new Date());
let pro = LIVE ? {name:'', crp:'', wa:''} : (store.get('pro', null) || DEMO_PRO);
let results = (store.get('results', null) || EXAMPLES).filter(r => SCALES[r.s]);
let S = {view:'home'};
let lib = {cat:'all', q:''};
let patient = null;

function go(view, extra){ S = {view, ...(extra||{})}; render(); window.scrollTo({top:0}); }
const saveResults = () => store.set('results', results);

/* ---------- Telas do profissional ---------- */
function topbar(active){
  const tabs = [['home','Rastreios'],['results','Resultados'],['profile','Perfil']];
  return `<header class="topbar no-print">
    <button class="brand" data-go="home" aria-label="Início">${LOGO}<span><span class="brand-name">Psique</span><span class="brand-sub">Rastreios</span></span></button>
    <nav class="nav" aria-label="Seções">${tabs.map(([v,l]) => `<button data-go="${v}" aria-current="${active===v}">${l}</button>`).join('')}</nav>
  </header>`;
}

function card(id){
  const s = SCALES[id];
  return `<article class="tool" role="button" tabindex="0" data-tool="${id}">
    <div class="badge-slot">${s.kind === 'validado' ? '<span class="pill">Escala validada</span>' : '<span class="pill gold">Rastreio</span>'}</div>
    <div class="ico">${icoHTML(id)}</div>
    <div class="name">${s.title.replace(/^Rastreio (de |do |da )?/,'')}</div>
    <div class="meta">${s.kind === 'validado' ? s.code + ' · ' : ''}${s.items.length} perguntas</div>
  </article>`;
}

function libraryBody(){
  const q = norm(lib.q.trim());
  if (q) {
    const hits = ORDER.filter(id => { const s = SCALES[id]; return norm([s.title, s.code, ...(s.topics||[])].join(' ')).includes(q); });
    return hits.length ? `<p class="count">${hits.length} resultado${hits.length>1?'s':''}</p><div class="grid">${hits.map(card).join('')}</div>`
      : `<div class="card center stack"><p class="muted">Nenhum rastreio encontrado para "${esc(lib.q)}".</p></div>`;
  }
  const cats = lib.cat === 'all' ? CATS : CATS.filter(c => c.id === lib.cat);
  return cats.map(c => {
    const ids = ORDER.filter(id => lib.cat === 'all' ? SCALES[id].cats[0] === c.id : SCALES[id].cats.includes(c.id))
      .sort((x,y) => (SCALES[x].kind === 'validado' ? 0 : 1) - (SCALES[y].kind === 'validado' ? 0 : 1));
    return `<section class="stack"><div class="cat-head"><h3>${c.name}</h3><span class="count">${ids.length}</span></div><div class="grid">${ids.map(card).join('')}</div></section>`;
  }).join('');
}

function viewHome(){
  const nVal = ORDER.filter(id => SCALES[id].kind === 'validado').length;
  const recent = results.slice().sort((a,b) => b.t-a.t).slice(0,3);
  return `${topbar('home')}
  ${pro.demo ? `<div class="banner no-print"><span>Você está no modo de demonstração.</span><button class="btn primary" data-go="profile">Configurar meu perfil</button></div>`
    : !pro.name ? `<div class="banner no-print"><span>Complete seu perfil para personalizar convites e relatórios.</span><button class="btn primary" data-go="profile">Completar perfil</button></div>` : ''}
  <section class="access">
    <div style="display:flex;justify-content:center;margin-bottom:6px">${BIGLOGO}</div>
    <h1>Ferramentas de Psicoeducação</h1>
    <p class="tag">rastreios que acolhem e orientam</p>
    <div class="rule"></div>
    <div class="who">
      <p><span class="muted">Profissional:</span> <strong>${esc(pro.name || (user && user.email) || '')}</strong></p>
      <p class="muted small">${esc(pro.crp)}</p>
      <p style="margin-top:8px">${planPill()}</p>
    </div>
  </section>
  <section class="stack">
    <div class="section-head"><h2>Biblioteca de rastreios</h2>
      <div class="stats"><span class="pill line">${ORDER.length} instrumentos</span><span class="pill">${nVal} escalas validadas</span><span class="pill gold">${ORDER.length - nVal} rastreios Psique</span></div>
    </div>
    <label class="search" for="q">${icon('search',18)}<input class="input" id="q" type="search" placeholder="Buscar tema, sintoma ou escala" value="${esc(lib.q)}" autocomplete="off"></label>
    <div class="chips" role="group" aria-label="Categorias">
      <button class="chip" data-cat="all" aria-pressed="${lib.cat==='all'}">Todos</button>
      ${CATS.map(c => `<button class="chip" data-cat="${c.id}" aria-pressed="${lib.cat===c.id}">${c.short}</button>`).join('')}
    </div>
    <div id="libbody" class="stack" style="gap:26px">${libraryBody()}</div>
  </section>
  <section class="stack">
    <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px"><h3>Resultados recentes</h3><button class="back" data-go="results">Ver todos</button></div>
    ${resultList(recent)}
  </section>
  <p class="foot">Psique Rastreios · ferramenta de apoio ao trabalho clínico. Não realiza diagnóstico.</p>`;
}

function resultList(list){
  if (!list.length) return `<div class="card center stack"><p class="muted">Os resultados aparecem aqui quando um paciente responder e você abrir o link recebido.</p></div>`;
  return `<div class="list">${list.map(r => { const s = SCALES[r.s]; if (!s) return ''; const c = compute(r.s, r.a); return `
    <button class="row" data-result="${r.id}">
      <span class="dot" style="background:${toneVar(c.level.tone)}"></span>
      <span class="grow"><span class="t" style="display:block">${esc(r.p)}${r.ex ? ' <span class="pill line" style="margin-left:4px">Exemplo</span>' : ''}</span><span class="small muted">${esc(s.kind === 'validado' ? s.code : s.title.replace(/^Rastreio (de |do |da )?/,''))} · ${fmtDate(r.t)}</span></span>
      <span class="small" style="font-weight:600;color:${toneVar(c.level.tone)};text-align:right;max-width:40%">${c.level.label}</span>
    </button>`; }).join('')}</div>`;
}

function viewResults(){
  return `${topbar('results')}
  <div class="stack"><h2>Resultados recebidos</h2><p class="muted small">Ficam salvos apenas neste aparelho.</p></div>
  ${resultList(results.slice().sort((a,b) => b.t-a.t))}`;
}

function viewTool(){
  const id = S.id, s = SCALES[id];
  const cat = CATS.find(c => c.id === s.cats[0]);
  return `${topbar('home')}
  <button class="back" data-go="home">${icon('back',16)} Voltar</button>
  <section class="card stack">
    <div style="display:flex;gap:14px;align-items:center"><div class="ico" style="flex:none">${icoHTML(id)}</div><div style="min-width:0"><p class="eyebrow">${cat ? cat.short : ''}${s.kind === 'validado' ? ' · ' + s.code : ''}</p><h2>${s.title}</h2></div></div>
    <p>${s.about}</p>
    ${s.topics && s.topics.length ? `<div class="topics">${s.topics.map(t => `<span class="pill line">${esc(t)}</span>`).join('')}</div>` : ''}
    <div class="btn-row" style="font-size:.85rem"><span class="pill line">${s.items.length} perguntas</span><span class="pill line">${s.minutes} minutos</span><span class="pill ${s.kind==='validado'?'':'gold'}">${s.kind==='validado'?'Escala validada':'Rastreio de triagem'}</span></div>
    ${s.resp ? `<p class="small"><strong>Quem responde:</strong> ${esc(s.resp)}</p>` : ''}
  </section>
  <section class="card stack">
    <h3>Enviar para o paciente responder</h3>
    <label class="f" for="pname">${s.resp && /criança/i.test(s.resp) ? 'Nome da criança' : 'Nome do paciente'}<input class="input" id="pname" placeholder="Ex.: Maria Souza" autocomplete="off"></label>
    ${s.noFeedback ? `<p class="small muted">Por cuidado clínico, este rastreio não mostra devolutiva automática ao paciente. O resultado chega só para você.</p>`
      : `<label class="check" for="showres"><input type="checkbox" id="showres"> Mostrar uma devolutiva ao paciente ao final (sem pontuação)</label>`}
    <button class="btn primary block" id="mklink">Gerar link</button>
    <div id="linkout"></div>
  </section>
  <button class="btn ghost block" id="applynow">Aplicar agora, neste aparelho</button>
  <p class="small muted">${s.ref}</p>`;
}

function linkOut(ctx){
  const url = baseUrl() + '?a=' + enc(ctx);
  const msg = `Olá! Aqui é ${pro.name}. Separei um questionário rápido para conhecermos melhor como ${ctx.p ? ctx.p.split(' ')[0] + ' tem' : 'você tem'} se sentido. Leva cerca de ${SCALES[ctx.s].minutes} minutos:\n${url}`;
  return `<div class="stack">
    <div class="linkbox"><input class="input" id="lnk" readonly value="${esc(url)}"><button class="btn soft" data-copy="${esc(url)}">Copiar</button></div>
    <a class="btn primary" href="https://wa.me/?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">${icon('wa',18)} Enviar pelo WhatsApp</a>
    <button class="btn ghost" id="simulate">Ver como o paciente vai ver</button>
  </div>`;
}

function viewProfile(){
  return `${topbar('profile')}
  <section class="card stack">
    <h2>Meu perfil</h2>
    <p class="muted small">Esses dados aparecem no convite enviado ao paciente e no relatório.</p>
    <form id="pf" class="stack">
      <label class="f" for="f-name">Nome profissional<input class="input" id="f-name" required value="${esc(pro.demo?'':pro.name)}" placeholder="Ex.: Psicóloga Ana Lima"></label>
      <label class="f" for="f-crp">Registro<input class="input" id="f-crp" value="${esc(pro.demo?'':pro.crp)}" placeholder="CRP 00/00000"></label>
      <label class="f" for="f-wa">WhatsApp para receber as respostas<input class="input" id="f-wa" inputmode="tel" value="${esc(pro.wa)}" placeholder="(11) 90000-0000"></label>
      ${LIVE ? '' : `<label class="f" for="f-email">E-mail<input class="input" id="f-email" type="email" value="${esc(pro.email)}" placeholder="voce@email.com"></label>`}
      <button class="btn primary" type="submit">Salvar perfil</button>
    </form>
  </section>
  <section class="card stack">
    <h3>Plano</h3>
    <p>${planPill()} <span class="muted small">Inclui todas as atualizações da biblioteca.</span></p>
    ${user ? `<p class="small muted">Conta: ${esc(user.email)}</p>` : ''}
    <button class="btn ghost" id="logout">${LIVE ? 'Sair da conta' : 'Sair e apagar dados deste aparelho'}</button>
  </section>`;
}

/* ---------- Relatório ---------- */
function viewReport(){
  const r = S.r, s = SCALES[r.s], c = compute(r.s, r.a);
  const who = r.pro || pro;
  let bar = '';
  if (!c.noBar && s.levels) {
    const spans = []; let prev = -1;
    s.levels.forEach(l => { spans.push({w:l.max - prev, tone:l.tone, label:l.label, range:(prev+1) === l.max ? String(l.max) : `${prev+1}–${l.max}`}); prev = l.max; });
    const top = s.levels[s.levels.length-1].max;
    const pos = Math.min(100, Math.max(0, ((c.total + .5) / (top + 1)) * 100));
    bar = `<div class="scale-bar" role="img" aria-label="Posição do resultado na escala">
      <span class="mk" style="left:${pos}%"></span>
      <div class="seg">${spans.map(x => `<span style="flex:${x.w};background:${toneVar(x.tone)};opacity:.8"></span>`).join('')}</div>
      <div class="lbls">${spans.map(x => `<span style="flex:${x.w}" title="${esc(x.label)}">${x.range}</span>`).join('')}</div>
    </div>`;
  }
  const answers = s.items.map((it,i) => `<tr><td>${i+1}</td><td>${esc(itemQ(it))}</td><td>${esc(itemOpts(s,it)[r.a[i]] ?? '—')}</td></tr>`).join('');
  const shareMsg = `Olá! Segue um resumo do rastreio "${s.title}" de ${r.p}:\n\nResultado: ${c.level.label}\n${c.level.text}\n\nSugestões:\n• ${c.level.care.join('\n• ')}\n\nConversaremos sobre isso na próxima sessão.\n${who.name}`;
  return `${topbar('results')}
  <button class="back no-print" data-go="results">${icon('back',16)} Voltar</button>
  <article class="report">
    <div class="rep-head">
      <div style="display:flex;gap:10px;align-items:center;min-width:0">${LOGO}<div style="min-width:0"><p class="eyebrow">Relatório de rastreio</p><h2 style="font-size:1.4rem">${s.title}</h2></div></div>
      ${r.ex ? '<span class="pill line">Exemplo</span>' : ''}
    </div>
    <dl class="kv">
      <dt>Paciente</dt><dd>${esc(r.p)}</dd>
      <dt>Data</dt><dd>${fmtDate(r.t)}</dd>
      <dt>Instrumento</dt><dd>${esc(s.kind === 'validado' ? s.code : 'Rastreio de triagem Psique')}</dd>
      <dt>Profissional</dt><dd>${esc(who.name)}${who.crp ? ' · ' + esc(who.crp) : ''}</dd>
    </dl>
    ${c.flags.map(f => `<div class="alert"><strong>Atenção:</strong> ${f.pro}</div>`).join('')}
    <section class="stack">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap">
        <div class="score"><b>${c.total}</b><span class="muted">${c.unit === 'pontos' ? 'de ' + c.max + ' pontos' : esc(c.unit)}</span></div>
        <div class="level" style="color:${toneVar(c.level.tone)}">${c.level.label}</div>
      </div>
      ${bar}
    </section>
    ${c.dims ? `<section class="stack"><h3>Por dimensão</h3>${c.dims.map(d => `<div class="dim"><div class="top"><span>${d.name}</span><span class="muted" style="font-variant-numeric:tabular-nums">${d.label ? `<span style="color:${toneVar(d.tone)}">${d.label}</span> · ` : ''}${d.v}/${d.m}</span></div><div class="bar"><i style="width:${d.m ? d.v/d.m*100 : 0}%;background:${toneVar(d.tone)}"></i></div></div>`).join('')}</section>` : ''}
    <section class="edu">
      <h3>O que isso significa</h3>
      <p>${c.level.text}</p>
      ${c.level.care && c.level.care.length ? `<h3 style="margin-top:8px">Sugestões de cuidado</h3><ul>${c.level.care.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}
      ${s.edu ? `<h3 style="margin-top:8px">Sobre o tema</h3><p>${s.edu}</p>` : ''}
    </section>
    ${c.support.length ? `<div class="support">${c.support.join('<br>')}</div>` : ''}
    ${(c.level.tone >= 2 || c.flags.some(f => f.risk)) ? `<section class="refer stack no-print-break">
      <h3>Hipótese e encaminhamento</h3>
      <dl class="kv">
        <dt>Hipótese a investigar</dt><dd>${esc(hypothesis(s))}</dd>
        <dt>Encaminhamento sugerido</dt><dd>${esc(referFor(r.s))}</dd>
      </dl>
      <label class="f no-print" for="reftxt">Texto de encaminhamento (pode editar antes de copiar)
        <textarea class="input" id="reftxt" rows="7">${esc(referralText(r, s, c, who))}</textarea>
      </label>
      <button class="btn soft no-print" id="refcopy">Copiar texto de encaminhamento</button>
    </section>` : ''}
    <details><summary>Respostas item a item</summary><table class="answers" style="margin-top:10px"><tbody>${answers}</tbody></table></details>
    <p class="disclaimer">Este rastreio é uma ferramenta de triagem e psicoeducação. O resultado não é um diagnóstico e deve ser interpretado por profissional habilitado(a), junto com a entrevista clínica e a história do paciente. ${s.ref}</p>
    <div class="sign"><strong>${esc(who.name)}</strong><span class="muted">${esc(who.crp||'')}</span></div>
  </article>
  <div class="btn-row no-print">
    <button class="btn primary" id="pdf">Baixar PDF</button>
    <a class="btn soft" href="https://wa.me/?text=${encodeURIComponent(shareMsg)}" target="_blank" rel="noopener">${icon('wa',18)} Enviar devolutiva</a>
  </div>
  <p class="small muted no-print">A devolutiva traz apenas a faixa e as orientações, sem a pontuação.</p>`;
}

function referralText(r, s, c, who){
  const res = c.unit === 'pontos' ? `${c.total} de ${c.max} pontos` : `${c.total} ${c.unit}`;
  return `Encaminho ${r.p} para avaliação em ${referFor(r.s).charAt(0).toLowerCase() + referFor(r.s).slice(1)}.

Em ${fmtDate(r.t)}, foi aplicado o instrumento "${s.title}"${s.kind === 'validado' ? ` (${s.code})` : ''}, com resultado na faixa "${c.level.label}" (${res}).
Hipótese a investigar: ${hypothesis(s)}.

O rastreio é um instrumento de triagem e não constitui diagnóstico. Solicito avaliação especializada para confirmação ou descarte da hipótese. Coloco-me à disposição para troca de informações.

${who.name || ''}${who.crp ? '\n' + who.crp : ''}`;
}

/* ---------- Telas do paciente ---------- */
function viewPatientIntro(){
  const s = SCALES[patient.s];
  const child = s.resp && /criança/i.test(s.resp);
  return `<section class="access">
    <div style="display:flex;justify-content:center;margin-bottom:6px">${BIGLOGO}</div>
    <p class="eyebrow">Convite de ${esc(patient.n || 'seu(sua) psicólogo(a)')}</p>
    <h1 style="margin-top:6px">Olá${patient.p && !child ? ', ' + esc(patient.p.split(' ')[0]) : ''}</h1>
    <div class="rule"></div>
    <div class="stack" style="text-align:left;position:relative">
      <p>Você recebeu o questionário <strong>${s.title}</strong>. São ${s.items.length} perguntas rápidas, cerca de ${s.minutes} minutos.</p>
      ${s.resp ? `<p class="small"><strong>Quem deve responder:</strong> ${esc(s.resp)}${child && patient.p ? `, pensando em ${esc(patient.p.split(' ')[0])}` : ''}.</p>` : ''}
      <p class="muted small">Não existem respostas certas ou erradas. Responda com sinceridade. As respostas serão vistas apenas por ${esc(patient.n || 'seu(sua) profissional')}.</p>
      <button class="btn primary block" id="start">Começar</button>
    </div>
  </section>
  <p class="foot">Se você estiver em sofrimento intenso agora, ligue para o CVV no 188 (gratuito, 24h) ou para o SAMU no 192.</p>`;
}

function viewQuestion(){
  const s = SCALES[patient.s], i = S.i, a = patient.a, it = s.items[i];
  return `<div class="stack">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <button class="back" id="qback">${icon('back',16)} ${i === 0 ? 'Início' : 'Anterior'}</button>
      <span class="small muted" style="font-variant-numeric:tabular-nums">${i+1} de ${s.items.length}</span>
    </div>
    <div class="progress"><i style="width:${(i/s.items.length)*100}%"></i></div>
  </div>
  <section class="stack" style="gap:20px">
    <p class="small muted">${(typeof it === 'object' && it.p) || s.period}</p>
    <p class="q">${itemQ(it)}</p>
    <div class="opts" role="group" aria-label="Opções de resposta">
      ${itemOpts(s, it).map((o,k) => `<button class="opt" data-opt="${k}" aria-pressed="${a[i]===k}"><span class="r"></span>${o}</button>`).join('')}
    </div>
  </section>`;
}

function viewPatientDone(){
  const s = SCALES[patient.s];
  const c = compute(patient.s, patient.a);
  const res = {s:patient.s, p:patient.p || 'Paciente', a:patient.a, t:patient.t, pro:{name:patient.n, crp:patient.c}};
  const url = baseUrl() + '?r=' + enc(res);
  const msg = `Olá! Respondi o questionário "${s.title}". Minhas respostas:\n${url}`;
  const feedback = patient.v && !s.noFeedback;
  return `<section class="access">
    <div style="display:flex;justify-content:center;margin-bottom:6px">${BIGLOGO}</div>
    <h1>Respostas concluídas</h1>
    <div class="rule"></div>
    <div class="stack" style="text-align:left;position:relative">
      <p>Falta só um passo: toque no botão abaixo para enviar as respostas para ${esc(patient.n || 'seu(sua) profissional')}.</p>
      <a class="btn primary block" href="https://wa.me/${digits(patient.w)}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">${icon('wa',18)} Enviar minhas respostas</a>
      <div class="linkbox"><input class="input" id="rlnk" readonly value="${esc(url)}"><button class="btn soft" data-copy="${esc(url)}">Copiar</button></div>
      <p class="small muted">Se o WhatsApp não abrir, copie o link acima e envie para seu(sua) profissional.</p>
    </div>
  </section>
  ${c.support.length ? `<div class="support">Obrigado por compartilhar. Você não precisa passar por isso sozinho(a): converse com ${esc(patient.n || 'seu(sua) profissional')} assim que puder.<br>${c.support.join('<br>')}</div>` : ''}
  ${feedback ? `<section class="card stack"><p class="eyebrow">Uma primeira devolutiva</p><h3 style="color:${toneVar(c.level.tone)}">${c.level.label}</h3><p>${c.level.text}</p><ul style="margin:0;padding-left:20px">${c.level.care.map(x => `<li>${x}</li>`).join('')}</ul><p class="small muted">Esta é uma orientação inicial. A interpretação completa será feita com seu(sua) profissional.</p></section>` : ''}
  ${patient.sim ? `<button class="btn ghost block no-print" id="seeAsPro">Demonstração: abrir o relatório como profissional</button>` : ''}`;
}

/* ---------- Conta e assinatura ---------- */
function planPill(){
  if (!LIVE) return '<span class="pill gold">Demonstração</span>';
  if (!sub) return '<span class="pill line">Sem assinatura</span>';
  if (sub.origem === 'cortesia' && !sub.expira_em) return '<span class="pill gold">Acesso vitalício</span>';
  const d = sub.expira_em ? new Date(sub.expira_em).toLocaleDateString('pt-BR') : '';
  if (sub.status === 'cancelada') return `<span class="pill line">Cancelada · acesso até ${d}</span>`;
  if (sub.status === 'atrasada') return `<span class="pill gold">Pagamento pendente</span>`;
  return `<span class="pill gold">Assinatura ativa${d ? ' · renova em ' + d : ''}</span>`;
}
function shell(inner){
  return `<section class="access">
    <div style="display:flex;justify-content:center;margin-bottom:6px">${BIGLOGO}</div>
    <h1>Psique Rastreios</h1>
    <p class="tag">ferramentas de psicoeducação</p>
    <div class="rule"></div>
    <div class="stack" style="text-align:left;position:relative">${inner}</div>
  </section>`;
}
function viewLogin(){
  const signup = S.mode === 'signup', forgot = S.mode === 'forgot';
  const tabs = `<div class="nav" style="align-self:center"><button data-mode="login" aria-current="${!signup && !forgot}">Entrar</button><button data-mode="signup" aria-current="${signup}">Criar conta</button></div>`;
  if (forgot) return shell(`<h3>Recuperar senha</h3>
    <form id="lf" class="stack"><label class="f" for="l-email">E-mail<input class="input" id="l-email" type="email" required autocomplete="email" value="${esc(S.email||'')}"></label>
    <button class="btn primary" type="submit">Enviar link de recuperação</button></form>
    <p id="lmsg" class="small muted">${esc(S.msg||'')}</p>
    <button class="back" data-mode="login">${icon('back',16)} Voltar para o login</button>`);
  return shell(`${tabs}
    <form id="lf" class="stack">
      <label class="f" for="l-email">E-mail<input class="input" id="l-email" type="email" required autocomplete="email" value="${esc(S.email||'')}"></label>
      <label class="f" for="l-pass">Senha<input class="input" id="l-pass" type="password" required minlength="6" autocomplete="${signup ? 'new-password' : 'current-password'}"></label>
      <button class="btn primary" type="submit">${signup ? 'Criar minha conta' : 'Entrar'}</button>
    </form>
    <p id="lmsg" class="small" style="color:var(--t3)">${esc(S.msg||'')}</p>
    <p class="small muted">${signup ? 'Use o mesmo e-mail da sua compra na Kiwify. A senha precisa ter pelo menos 6 caracteres.' : 'Use o e-mail da sua compra na Kiwify.'}</p>
    ${signup ? '' : '<button class="back" data-mode="forgot">Esqueci minha senha</button>'}`) +
    `<p class="foot">Assinatura ${esc(CFG.preco || '')}${CFG.checkoutUrl ? ` · <a href="${esc(CFG.checkoutUrl)}" target="_blank" rel="noopener">Assinar agora</a>` : ''}</p>`;
}
function viewNoAccess(){
  const why = !sub ? `Não encontramos uma assinatura para <strong>${esc(user.email)}</strong>.`
    : sub.status === 'reembolsada' ? 'A compra deste e-mail foi reembolsada ou contestada.'
    : sub.status === 'cancelada' ? 'Sua assinatura foi cancelada e o período pago terminou.'
    : 'Sua assinatura está com o pagamento pendente.';
  return shell(`<h3>Acesso não liberado</h3>
    <p>${why}</p>
    <p class="small muted">Se você acabou de assinar, aguarde alguns minutos e toque em "Verificar de novo". Confira se entrou com o mesmo e-mail usado na Kiwify.</p>
    ${accErr ? `<p class="small" style="color:var(--t3)">Detalhe técnico: ${esc(accErr)}</p>` : ''}
    ${CFG.checkoutUrl ? `<a class="btn primary block" href="${esc(CFG.checkoutUrl)}" target="_blank" rel="noopener">Assinar por ${esc(CFG.preco || '')}</a>` : ''}
    <button class="btn soft block" id="recheck">Verificar de novo</button>
    <button class="btn ghost block" id="logout">Sair e entrar com outro e-mail</button>`);
}
function viewNewPass(){
  return shell(`<h3>Criar nova senha</h3>
    <form id="npf" class="stack"><label class="f" for="np">Nova senha<input class="input" id="np" type="password" required minlength="6" autocomplete="new-password"></label>
    <button class="btn primary" type="submit">Salvar nova senha</button></form>
    <p id="lmsg" class="small" style="color:var(--t3)"></p>`);
}
const ERR = m => /Invalid login/i.test(m) ? 'E-mail ou senha incorretos.'
  : /already registered|already exists/i.test(m) ? 'Este e-mail já tem conta. Use "Entrar".'
  : /at least 6|Password should/i.test(m) ? 'A senha precisa ter pelo menos 6 caracteres.'
  : /not confirmed/i.test(m) ? 'Confirme seu e-mail pelo link que enviamos antes de entrar.'
  : /rate limit|too many/i.test(m) ? 'Muitas tentativas seguidas. Aguarde alguns minutos.'
  : /fetch|network/i.test(m) ? 'Sem conexão com o servidor. Verifique sua internet.'
  : 'Não foi possível concluir: ' + m;

let accErr = '';
async function loadAccount(){
  if (!user) { const {data} = await sb.auth.getSession(); user = data.session ? data.session.user : null; }
  if (!user) { sub = null; accErr = 'sessão expirada'; return; }
  const [{data:a, error:ea}, {data:p}] = await Promise.all([
    sb.from('assinaturas').select('*').maybeSingle(),
    sb.from('perfis').select('*').eq('id', user.id).maybeSingle()
  ]);
  accErr = ea ? ea.message : '';
  sub = a || null;
  pro = p ? {name:p.nome || '', crp:p.crp || '', wa:p.whatsapp || ''} : {name:'', crp:'', wa:''};
}
const PRO_VIEWS = ['home','results','tool','profile','report'];
function gate(){
  if (!LIVE || !PRO_VIEWS.includes(S.view)) return null;
  if (!user) return 'login';
  if (!ativa(sub)) return 'noAccess';
  return null;
}

/* ---------- Render ---------- */
const VIEWS = {login:viewLogin, noAccess:viewNoAccess, newPass:viewNewPass, home:viewHome, results:viewResults, tool:viewTool, profile:viewProfile, report:viewReport, pIntro:viewPatientIntro, pQ:viewQuestion, pDone:viewPatientDone};
function render(){
  const g = gate();
  if (g) S = {view:g, mode:S.mode, email:S.email, msg:S.msg};
  $('#app').innerHTML = (VIEWS[S.view] || viewHome)(); bind();
}
function startPatient(ctx){ patient = {...ctx, a:Array(SCALES[ctx.s].items.length).fill(null), t:Date.now()}; go('pIntro'); }

function bindCards(root){
  root.querySelectorAll('[data-tool]').forEach(b => {
    const open = () => go('tool', {id:b.dataset.tool});
    b.onclick = open; b.onkeydown = e => { if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(); } };
  });
}

function bind(){
  document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  bindCards(document);
  document.querySelectorAll('[data-result]').forEach(b => b.onclick = () => go('report', {r:results.find(r => r.id === b.dataset.result)}));
  document.querySelectorAll('[data-copy]').forEach(b => b.onclick = () => copy(b.dataset.copy, b.previousElementSibling && '#' + b.previousElementSibling.id));

  const q = $('#q');
  if (q) q.oninput = () => { lib.q = q.value; const lb = $('#libbody'); lb.innerHTML = libraryBody(); bindCards(lb); };
  document.querySelectorAll('[data-cat]').forEach(b => b.onclick = () => {
    lib.cat = b.dataset.cat; lib.q = ''; if (q) q.value = '';
    document.querySelectorAll('[data-cat]').forEach(x => x.setAttribute('aria-pressed', x === b));
    const lb = $('#libbody'); lb.innerHTML = libraryBody(); bindCards(lb);
  });

  const mk = $('#mklink');
  if (mk) {
    const ctxNow = () => ({s:S.id, p:($('#pname').value || '').trim(), n:pro.name, c:pro.crp, w:pro.wa, v:!!($('#showres') && $('#showres').checked)});
    mk.onclick = () => {
      const ctx = ctxNow();
      if (!ctx.p) { $('#pname').focus(); toast('Digite o nome do paciente'); return; }
      $('#linkout').innerHTML = linkOut(ctx); bind();
    };
    $('#applynow').onclick = () => { const ctx = ctxNow(); startPatient({...ctx, p:ctx.p || 'Paciente', sim:true}); };
  }
  const sim = $('#simulate'); if (sim) sim.onclick = () => startPatient({s:S.id, p:($('#pname').value||'').trim(), n:pro.name, c:pro.crp, w:pro.wa, v:!!($('#showres') && $('#showres').checked), sim:true});

  const st = $('#start'); if (st) st.onclick = () => go('pQ', {i:0});
  document.querySelectorAll('[data-opt]').forEach(b => b.onclick = () => {
    patient.a[S.i] = +b.dataset.opt;
    document.querySelectorAll('[data-opt]').forEach(x => x.setAttribute('aria-pressed', x === b));
    const i = S.i;
    setTimeout(() => { if (S.view !== 'pQ' || S.i !== i) return; const n = SCALES[patient.s].items.length; if (i < n-1) go('pQ', {i:i+1}); else go('pDone'); }, 220);
  });
  const qb = $('#qback'); if (qb) qb.onclick = () => S.i === 0 ? go('pIntro') : go('pQ', {i:S.i-1});

  const sp = $('#seeAsPro');
  if (sp) sp.onclick = () => {
    const r = {id:'r'+Date.now(), s:patient.s, p:patient.p || 'Paciente', a:patient.a, t:patient.t};
    results.push(r); saveResults(); patient = null; go('report', {r});
  };

  const rcp = $('#refcopy'); if (rcp) rcp.onclick = () => copy($('#reftxt').value, '#reftxt', 'Texto copiado');
  const pdf = $('#pdf'); if (pdf) pdf.onclick = () => { try { window.print(); } catch(e){} };

  const pf = $('#pf');
  if (pf) pf.onsubmit = e => {
    e.preventDefault();
    pro = {name:$('#f-name').value.trim(), crp:$('#f-crp').value.trim(), wa:$('#f-wa').value.trim(), email:($('#f-email') ? $('#f-email').value.trim() : '')};
    if (LIVE) {
      sb.from('perfis').upsert({id:user.id, nome:pro.name, crp:pro.crp, whatsapp:pro.wa, atualizado_em:new Date().toISOString()})
        .then(({error}) => { if (error) toast('Não foi possível salvar o perfil'); else { toast('Perfil salvo'); go('home'); } });
    } else { store.set('pro', pro); toast('Perfil salvo'); go('home'); }
  };
  const lo = $('#logout');
  if (lo) lo.onclick = async () => {
    if (LIVE) { await sb.auth.signOut(); user = null; sub = null; go('login'); return; }
    store.del('pro'); store.del('results'); pro = DEMO_PRO; results = EXAMPLES.slice(); toast('Dados apagados'); go('home');
  };

  document.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => go('login', {mode:b.dataset.mode, email:($('#l-email')||{}).value}));
  const lf = $('#lf');
  if (lf) lf.onsubmit = async e => {
    e.preventDefault();
    const email = $('#l-email').value.trim(), pass = $('#l-pass') ? $('#l-pass').value : '';
    const btn = lf.querySelector('button'); btn.disabled = true; btn.textContent = 'Aguarde...';
    const msg = t => { const m = $('#lmsg'); if (m) m.textContent = t; btn.disabled = false; btn.textContent = S.mode === 'signup' ? 'Criar minha conta' : S.mode === 'forgot' ? 'Enviar link de recuperação' : 'Entrar'; };
    try {
      if (S.mode === 'forgot') {
        const {error} = await sb.auth.resetPasswordForEmail(email, {redirectTo:baseUrl()});
        if (error) return msg(ERR(error.message));
        return msg('Se houver uma conta com este e-mail, você vai receber um link para criar uma nova senha.');
      }
      const {data, error} = S.mode === 'signup' ? await sb.auth.signUp({email, password:pass}) : await sb.auth.signInWithPassword({email, password:pass});
      if (error) return msg(ERR(error.message));
      if (!data.session) return msg('Conta criada. Confirme seu e-mail pelo link que enviamos e depois entre.');
      user = data.session.user; await loadAccount(); afterLogin();
    } catch(err){ msg(ERR(String(err && err.message || err))); }
  };
  const rc = $('#recheck'); if (rc) rc.onclick = async () => { rc.disabled = true; await loadAccount(); if (ativa(sub)) afterLogin(); else { toast(accErr ? 'Erro ao verificar: ' + accErr : 'Ainda não encontramos a assinatura'); rc.disabled = false; } };
  const npf = $('#npf');
  if (npf) npf.onsubmit = async e => {
    e.preventDefault();
    const {error} = await sb.auth.updateUser({password:$('#np').value});
    if (error) { $('#lmsg').textContent = ERR(error.message); return; }
    toast('Senha alterada'); await loadAccount(); afterLogin();
  };
}

/* ---------- Entrada por link ---------- */
function afterLogin(){
  let r = null; try { r = sessionStorage.getItem('psique:pendingR'); sessionStorage.removeItem('psique:pendingR'); } catch(e){}
  if (r && openResult(r)) return;
  go('home');
}
function openResult(r){
  const res = dec(r);
  if (!(res && SCALES[res.s] && Array.isArray(res.a))) return false;
  const key = res.s + res.t + res.p;
  let saved = results.find(x => x.key === key);
  if (!saved) { saved = {...res, id:'r'+Date.now(), key}; results.push(saved); saveResults(); }
  go('report', {r:saved}); return true;
}
(async function boot(){
  let q; try { q = new URLSearchParams(location.search); } catch(e){ q = new URLSearchParams(''); }
  const a = q.get('a'), r = q.get('r');
  if (a) { const ctx = dec(a); if (ctx && SCALES[ctx.s]) { startPatient(ctx); return; } }
  if (LIVE) {
    if (r) { try { sessionStorage.setItem('psique:pendingR', r); history.replaceState(null, '', location.pathname); } catch(e){} }
    $('#app').innerHTML = '<p class="foot" style="padding-top:40vh">Carregando...</p>';
    sb.auth.onAuthStateChange((ev, session) => {
      if (ev === 'PASSWORD_RECOVERY') { user = session && session.user; S = {view:'newPass'}; $('#app').innerHTML = viewNewPass(); bind(); }
      if (ev === 'SIGNED_OUT') { user = null; sub = null; }
    });
    try {
      const {data} = await sb.auth.getSession();
      user = data.session ? data.session.user : null;
      if (S.view === 'newPass') return;
      if (RECOVERY && user) { try { history.replaceState(null, '', location.pathname); } catch(e){} await loadAccount(); go('newPass'); return; }
      if (user) { await loadAccount(); if (ativa(sub)) return afterLogin(); }
    } catch(e){}
    go(user ? 'noAccess' : 'login'); return;
  }
  if (r) {
    const res = dec(r);
    if (res && SCALES[res.s] && Array.isArray(res.a)) {
      const key = res.s + res.t + res.p;
      let saved = results.find(x => x.key === key);
      if (!saved) { saved = {...res, id:'r'+Date.now(), key}; results.push(saved); saveResults(); }
      try { history.replaceState(null, '', location.pathname); } catch(e){}
      go('report', {r:saved}); return;
    }
  }
  render();
})();
})();
