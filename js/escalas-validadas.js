/* Psique Rastreios — instrumentos validados de uso livre.
   Cada item pode ser um texto (usa s.options) ou {q, o:[rótulos], v:[valores]}. */
(function(){
const P = window.PSI = window.PSI || {scales:{}};
const FREQ4 = ['Nenhuma vez','Vários dias','Mais da metade dos dias','Quase todos os dias'];
const FREQ5 = ['Nunca','Raramente','Algumas vezes','Frequentemente','Muito frequentemente'];
const INT5 = ['Nem um pouco','Um pouco','Moderadamente','Bastante','Extremamente'];
const YN = ['Não','Sim'];
const S = P.scales;
const lvl = (label, tone, text, care) => ({label, tone, text, care});

S.phq9 = {
  title:'Rastreio de Sintomas Depressivos', code:'PHQ-9', cats:['hum'], icon:'rain', minutes:3, kind:'validado',
  topics:['Depressão maior','Sintomas depressivos leves e moderados'],
  about:'Nove perguntas sobre humor, interesse, sono, energia e autoavaliação nas últimas duas semanas. Útil para triagem inicial e para acompanhar a evolução ao longo do tratamento.',
  edu:'A depressão vai além da tristeza: envolve perda de interesse e de prazer, alterações de sono, apetite e energia, dificuldade de concentração e autocrítica intensa, presentes na maior parte dos dias. É uma condição tratável.',
  period:'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por:', options:FREQ4,
  items:[
    'Pouco interesse ou pouco prazer em fazer as coisas',
    'Se sentir para baixo, deprimido(a) ou sem perspectiva',
    'Dificuldade para pegar no sono ou permanecer dormindo, ou dormir mais do que de costume',
    'Se sentir cansado(a) ou com pouca energia',
    'Falta de apetite ou comer demais',
    'Se sentir mal consigo mesmo(a), achar que é um fracasso ou que decepcionou sua família ou a si mesmo(a)',
    'Dificuldade para se concentrar nas coisas, como ler ou assistir televisão',
    'Lentidão para se movimentar ou falar, a ponto de outras pessoas perceberem; ou o oposto: estar tão agitado(a) que fica andando de um lado para o outro mais do que de costume',
    'Pensar em se ferir de alguma maneira ou que seria melhor estar morto(a)'
  ],
  levels:[
    {max:4, ...lvl('Sintomas mínimos',0,'As respostas indicam poucos sinais de humor deprimido neste período. Oscilações de ânimo fazem parte da vida e não significam, por si só, um problema.',['Manter rotinas que já fazem bem: sono regular, movimento e contato com pessoas queridas.','Observar se algo muda nas próximas semanas.'])},
    {max:9, ...lvl('Sintomas leves',1,'Há alguns sinais de desânimo, cansaço ou perda de interesse. É um bom momento para olhar com cuidado para o que tem pesado na rotina.',['Reservar pequenos momentos de prazer no dia, mesmo que curtos.','Conversar sobre esses sinais na psicoterapia.','Cuidar do sono e da alimentação.'])},
    {max:14, ...lvl('Sintomas moderados',2,'Os sinais aparecem com frequência e podem estar afetando o trabalho, as relações ou o autocuidado. Vale aprofundar a avaliação com o(a) profissional.',['Acompanhamento psicológico regular.','Avaliar junto ao(à) profissional a necessidade de avaliação médica.','Evitar se isolar: manter ao menos um contato de confiança por perto.'])},
    {max:19, ...lvl('Sintomas moderadamente graves',3,'Os sinais estão presentes na maior parte dos dias e merecem atenção próxima. Você não precisa lidar com isso sozinho(a).',['Acompanhamento psicológico próximo e avaliação psiquiátrica.','Combinar com o(a) profissional um plano de cuidado e de contatos de apoio.'])},
    {max:27, ...lvl('Sintomas graves',3,'Os sinais estão intensos e frequentes. É importante buscar cuidado especializado o quanto antes.',['Avaliação psiquiátrica e psicológica com prioridade.','Rede de apoio próxima e plano de segurança construído com o(a) profissional.'])}
  ],
  flags:v => v[8] > 0 ? [{risk:true, pro:'Resposta positiva ao item 9 (pensamentos de morte ou de autolesão). Recomenda-se avaliação de risco o quanto antes.'}] : [],
  ref:'Kroenke, Spitzer & Williams (2001). Versão brasileira validada por Santos et al. (2013). Segundo phqscreeners.com, não é necessária permissão para reproduzir, traduzir, exibir ou distribuir.'
};

S.gad7 = {
  title:'Rastreio de Ansiedade Generalizada', code:'GAD-7', cats:['ans'], icon:'wave', minutes:2, kind:'validado',
  topics:['Ansiedade generalizada'],
  about:'Sete perguntas sobre preocupação, tensão e inquietação nas últimas duas semanas. Rastreia sintomas de ansiedade generalizada.',
  edu:'A ansiedade generalizada é uma preocupação excessiva e difícil de controlar com vários assuntos do dia a dia, acompanhada de tensão, irritabilidade, cansaço e alterações do sono.',
  period:'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por:', options:FREQ4,
  items:[
    'Sentir-se nervoso(a), ansioso(a) ou muito tenso(a)',
    'Não ser capaz de impedir ou de controlar as preocupações',
    'Preocupar-se muito com diversas coisas',
    'Dificuldade para relaxar',
    'Ficar tão agitado(a) que se torna difícil permanecer sentado(a)',
    'Ficar facilmente aborrecido(a) ou irritado(a)',
    'Sentir medo, como se algo horrível fosse acontecer'
  ],
  levels:[
    {max:4, ...lvl('Ansiedade mínima',0,'As respostas mostram poucos sinais de ansiedade neste período. Alguma preocupação no dia a dia é natural e até útil.',['Manter práticas que ajudam a desacelerar, como pausas e respiração lenta.'])},
    {max:9, ...lvl('Ansiedade leve',1,'Há sinais de preocupação e tensão que aparecem em alguns dias. Reconhecer esses momentos é o primeiro passo para lidar melhor com eles.',['Experimentar a respiração diafragmática (inspirar em 4, soltar em 6) por 3 minutos.','Anotar as preocupações e separar o que está e o que não está sob seu controle.','Reduzir café e telas antes de dormir.'])},
    {max:14, ...lvl('Ansiedade moderada',2,'A ansiedade aparece com frequência e pode estar atrapalhando o sono, a concentração ou as relações. Vale aprofundar a avaliação.',['Trabalhar estratégias de regulação na psicoterapia.','Observar gatilhos e sinais do corpo (coração acelerado, tensão muscular).','Avaliar com o(a) profissional a necessidade de avaliação médica.'])},
    {max:21, ...lvl('Ansiedade grave',3,'Os sinais de ansiedade estão intensos e presentes na maior parte dos dias. É importante receber cuidado especializado.',['Acompanhamento psicológico regular e avaliação psiquiátrica.','Construir com o(a) profissional um plano para momentos de crise.'])}
  ],
  ref:'Spitzer, Kroenke, Williams & Löwe (2006). Segundo phqscreeners.com, não é necessária permissão para reproduzir, traduzir, exibir ou distribuir.'
};

S.phqpanic = {
  title:'Rastreio de Síndrome do Pânico', code:'PHQ · Módulo de Pânico', cats:['ans'], icon:'wave', minutes:3, kind:'validado',
  topics:['Síndrome do pânico'],
  about:'Módulo de pânico do Patient Health Questionnaire: quatro perguntas sobre crises de ansiedade nas últimas quatro semanas e onze sobre os sintomas da pior crise.',
  edu:'Uma crise de pânico é uma onda súbita de medo intenso, com coração acelerado, falta de ar, tremores, tontura e sensação de morte ou de perder o controle. No transtorno de pânico, as crises se repetem e surge o medo constante de ter novas crises.',
  period:'Nas últimas 4 semanas:', options:YN,
  items:[
    'Você teve uma crise de ansiedade, sentindo medo ou pânico de repente?',
    'Isso já tinha acontecido antes?',
    'Algumas dessas crises surgiram de repente, em situações em que você não esperava ficar nervoso(a) ou desconfortável?',
    'Essas crises incomodam muito você, ou você se preocupa em ter uma nova crise?',
    {q:'Você sentiu falta de ar?', p:'Pense na sua última crise forte de ansiedade. Durante essa crise:'},
    {q:'Seu coração disparou, bateu forte ou falhou?', p:'Pense na sua última crise forte de ansiedade. Durante essa crise:'},
    {q:'Você sentiu dor ou aperto no peito?', p:'Pense na sua última crise forte de ansiedade. Durante essa crise:'},
    {q:'Você suou?', p:'Pense na sua última crise forte de ansiedade. Durante essa crise:'},
    {q:'Você sentiu como se estivesse sufocando?', p:'Pense na sua última crise forte de ansiedade. Durante essa crise:'},
    {q:'Você teve ondas de calor ou calafrios?', p:'Pense na sua última crise forte de ansiedade. Durante essa crise:'},
    {q:'Você teve náusea, mal-estar no estômago ou sensação de que teria diarreia?', p:'Pense na sua última crise forte de ansiedade. Durante essa crise:'},
    {q:'Você se sentiu tonto(a), instável ou prestes a desmaiar?', p:'Pense na sua última crise forte de ansiedade. Durante essa crise:'},
    {q:'Você sentiu formigamento ou dormência em partes do corpo?', p:'Pense na sua última crise forte de ansiedade. Durante essa crise:'},
    {q:'Você tremeu ou se sacudiu?', p:'Pense na sua última crise forte de ansiedade. Durante essa crise:'},
    {q:'Você teve medo de estar morrendo?', p:'Pense na sua última crise forte de ansiedade. Durante essa crise:'}
  ],
  compute(v){
    const core = v.slice(0,4).every(x => x === 1);
    const sint = v.slice(4).filter(x => x === 1).length;
    const dims = [{name:'Perguntas centrais sobre crises', v:v.slice(0,4).filter(x => x === 1).length, m:4, label:core ? 'Todas positivas' : 'Nem todas positivas', tone:core ? 2 : 0},
                  {name:'Sintomas na pior crise', v:sint, m:11, label:sint >= 4 ? '4 ou mais' : 'Menos de 4', tone:sint >= 4 ? 2 : 0}];
    return {total:sint, max:11, unit:'sintomas na pior crise', noBar:true, dims, level: core && sint >= 4
      ? lvl('Sugestivo de transtorno de pânico',2,'As respostas atendem ao critério do PHQ para síndrome do pânico: as quatro perguntas centrais positivas e quatro ou mais sintomas na pior crise. É importante uma avaliação completa, inclusive para descartar causas físicas.',['Aprender a reconhecer a crise: ela é muito desconfortável, mas não é perigosa e passa.','Respiração lenta e ancoragem no presente durante a crise.','A Terapia Cognitivo-Comportamental é muito eficaz para o pânico.'])
      : v.slice(0,4).some(x => x === 1) ? lvl('Abaixo do critério',1,'Houve relato de crises de ansiedade, mas sem o padrão completo de síndrome do pânico do PHQ.',['Observar quando as crises acontecem e o que as antecede.','Conversar sobre esses episódios nas sessões.'])
      : lvl('Nenhum sinal de pânico',0,'Não houve relato de crises de pânico nas últimas quatro semanas.',['Seguir observando como você se sente.'])};
  },
  ref:'Spitzer, Kroenke & Williams (1999). Patient Health Questionnaire (PHQ), módulo de pânico. Critério: quatro perguntas centrais positivas e quatro ou mais sintomas. Segundo phqscreeners.com, não é necessária permissão para reproduzir, traduzir, exibir ou distribuir.'
};

S.dass21 = {
  title:'Rastreio de Depressão, Ansiedade e Estresse', code:'DASS-21', cats:['ans','bur'], icon:'wave', minutes:5, kind:'validado',
  topics:['Estresse e tensão emocional','Estresse','Ansiedade','Depressão'],
  about:'Vinte e uma frases que avaliam separadamente três dimensões na última semana: depressão, ansiedade e estresse.',
  edu:'Depressão, ansiedade e estresse costumam aparecer juntos, mas são experiências diferentes. A depressão envolve desânimo e falta de prazer; a ansiedade, sintomas físicos e medo; o estresse, tensão, irritabilidade e dificuldade de relaxar.',
  period:'Indique o quanto cada frase se aplicou a você durante a última semana:',
  options:['Não se aplicou de maneira alguma','Aplicou-se em algum grau, ou por pouco tempo','Aplicou-se em grau considerável, ou por boa parte do tempo','Aplicou-se muito, ou na maior parte do tempo'],
  items:[
    'Achei difícil me acalmar.',
    'Senti minha boca seca.',
    'Não consegui sentir nenhum sentimento positivo.',
    'Tive dificuldade para respirar em alguns momentos, sem ter feito esforço físico.',
    'Achei difícil ter iniciativa para fazer as coisas.',
    'Tive a tendência de reagir de forma exagerada às situações.',
    'Senti tremores (por exemplo, nas mãos).',
    'Senti que estava sempre nervoso(a).',
    'Me preocupei com situações em que eu pudesse entrar em pânico e parecer ridículo(a).',
    'Senti que não tinha nada a desejar.',
    'Me senti agitado(a).',
    'Achei difícil relaxar.',
    'Me senti deprimido(a) e sem ânimo.',
    'Fui intolerante com as coisas que me impediam de continuar o que eu estava fazendo.',
    'Senti que ia entrar em pânico.',
    'Não consegui me entusiasmar com nada.',
    'Senti que não tinha valor como pessoa.',
    'Senti que estava sensível demais.',
    'Percebi meu coração alterado sem ter feito esforço físico.',
    'Senti medo sem motivo.',
    'Senti que a vida não tinha sentido.'
  ],
  compute(v){
    const SEV = ['Normal','Leve','Moderado','Grave','Extremamente grave'], TONE = [0,1,2,3,3];
    const defs = [
      {name:'Depressão', items:[2,4,9,12,15,16,20], cut:[9,13,20,27]},
      {name:'Ansiedade', items:[1,3,6,8,14,18,19], cut:[7,9,14,19]},
      {name:'Estresse', items:[0,5,7,10,11,13,17], cut:[14,18,25,33]}
    ];
    const dims = defs.map(d => {
      const sc = d.items.reduce((a,i) => a + v[i], 0) * 2;
      let k = d.cut.findIndex(c => sc <= c); if (k < 0) k = 4;
      return {name:d.name, v:sc, m:42, label:SEV[k], tone:TONE[k], k};
    });
    const worst = dims.reduce((a,b) => b.k > a.k ? b : a, dims[0]);
    const total = dims.reduce((a,d) => a + d.v, 0);
    const care = worst.k === 0 ? ['Manter hábitos que protegem a saúde emocional: sono, pausas e convívio.']
      : ['Conversar nas sessões sobre a dimensão mais elevada.','Cuidar de sono, alimentação e pausas ao longo do dia.'].concat(worst.k >= 3 ? ['Considerar avaliação psiquiátrica complementar.'] : []);
    return {total, max:126, unit:'pontos (soma das três dimensões)', noBar:true, dims,
      level: worst.k === 0 ? lvl('Dentro da faixa normal',0,'As três dimensões avaliadas (depressão, ansiedade e estresse) estão dentro da faixa normal na última semana.',care)
        : lvl(`${worst.name}: ${worst.label.toLowerCase()}`, worst.tone, `O DASS-21 avalia separadamente depressão, ansiedade e estresse. A dimensão mais elevada foi ${worst.name.toLowerCase()}, na faixa ${worst.label.toLowerCase()}. Veja abaixo o resultado de cada dimensão.`, care)};
  },
  ref:'Lovibond & Lovibond (1995). DASS-21, de domínio público. Versão brasileira de Vignola & Tucci (2014).'
};

S.asq = {
  title:'Rastreio de Risco de Suicídio', code:'ASQ (NIMH)', cats:['hum'], icon:'shield', minutes:1, kind:'validado', noFeedback:true,
  topics:['Ideação suicida e risco de suicídio'],
  about:'Cinco perguntas diretas do Ask Suicide-Screening Questions, do Instituto Nacional de Saúde Mental dos EUA. Um resultado positivo exige avaliação de risco pelo(a) profissional.',
  edu:'Perguntar diretamente sobre pensamentos de suicídio não aumenta o risco; ao contrário, abre espaço para cuidado. Pensamentos de morte são sinais de sofrimento intenso e merecem acolhimento imediato.',
  period:'Responda com sinceridade. Suas respostas serão vistas apenas pelo(a) seu(sua) profissional.', options:YN,
  items:[
    'Nas últimas semanas, você desejou estar morto(a)?',
    'Nas últimas semanas, você sentiu que você ou sua família estariam melhor se você estivesse morto(a)?',
    'Na última semana, você pensou em se matar?',
    'Você já tentou se matar alguma vez?',
    'Você está pensando em se matar agora?'
  ],
  compute(v){
    const pos = v.slice(0,4).some(x => x === 1), acute = v[4] === 1;
    return {total:v.reduce((a,b) => a+b, 0), max:5, unit:'respostas "sim"', noBar:true, level:
      acute ? lvl('Positivo com risco agudo',3,'Houve resposta positiva à pergunta sobre pensamentos de suicídio neste momento. É necessária avaliação de segurança imediata.',['Não deixar a pessoa sozinha e acionar a rede de apoio.','Encaminhar para avaliação de emergência (SAMU 192 ou pronto-socorro).'])
      : pos ? lvl('Rastreio positivo',3,'Houve resposta positiva a pelo menos uma pergunta de rastreio. É necessária uma avaliação breve de risco de suicídio pelo(a) profissional antes de encerrar o contato.',['Realizar avaliação de risco completa.','Construir um plano de segurança com contatos de apoio.','CVV 188 disponível 24 horas.'])
      : lvl('Rastreio negativo',0,'Não houve respostas positivas às perguntas de rastreio. Isso não dispensa o acompanhamento clínico habitual.',['Manter o acolhimento e retomar o tema se o sofrimento aumentar.'])};
  },
  flags:v => v[4] === 1 ? [{risk:true, pro:'Risco agudo: resposta positiva a "Você está pensando em se matar agora?". Avaliação de segurança imediata.'}]
    : v.slice(0,4).some(x => x === 1) ? [{risk:true, pro:'Rastreio positivo para risco de suicídio. Realizar avaliação breve de risco.'}] : [],
  alwaysSupport:true,
  ref:'Horowitz et al. (2012). Ask Suicide-Screening Questions (ASQ), National Institute of Mental Health (NIMH). O NIMH informa que o ASQ é gratuito. Validado a partir de 10 anos de idade. Tradução de trabalho.'
};

S.epds = {
  title:'Rastreio de Depressão Pós-parto', code:'EPDS (Edimburgo)', cats:['mat'], icon:'baby', minutes:3, kind:'validado',
  topics:['Depressão pós-parto','Sofrimento emocional durante a gestação'],
  about:'Escala de Depressão Pós-parto de Edimburgo, com dez perguntas sobre os últimos sete dias. Também pode ser usada durante a gestação.',
  edu:'A depressão pós-parto atinge cerca de uma em cada quatro mulheres no Brasil. Diferente do baby blues, ela dura mais de duas semanas e envolve tristeza profunda, culpa, ansiedade e dificuldade de cuidar de si e do bebê. Tem tratamento.',
  resp:'A mãe ou gestante',
  period:'Marque a resposta que mais se aproxima de como você tem se sentido nos últimos 7 dias, não apenas hoje.',
  options:['','','',''],
  items:[
    {q:'Eu tenho sido capaz de rir e achar graça das coisas.', o:['Como eu sempre fiz','Não tanto quanto antes','Sem dúvida, menos que antes','De jeito nenhum'], v:[0,1,2,3]},
    {q:'Eu tenho pensado no futuro com alegria.', o:['Sim, como de costume','Um pouco menos que de costume','Muito menos que de costume','Praticamente não'], v:[0,1,2,3]},
    {q:'Eu tenho me culpado sem razão quando as coisas dão errado.', o:['Sim, na maioria das vezes','Sim, algumas vezes','Não muitas vezes','Não, nenhuma vez'], v:[3,2,1,0]},
    {q:'Eu tenho ficado ansiosa ou preocupada sem uma boa razão.', o:['Não, de maneira alguma','Pouquíssimas vezes','Sim, algumas vezes','Sim, muitas vezes'], v:[0,1,2,3]},
    {q:'Eu tenho me sentido assustada ou em pânico sem um bom motivo.', o:['Sim, muitas vezes','Sim, algumas vezes','Não muitas vezes','Não, nenhuma vez'], v:[3,2,1,0]},
    {q:'Eu tenho me sentido sobrecarregada pelas tarefas e acontecimentos do meu dia a dia.', o:['Sim, na maioria das vezes não consigo lidar bem com eles','Sim, algumas vezes não consigo lidar bem como antes','Não, na maioria das vezes consigo lidar bem com eles','Não, consigo lidar com eles tão bem quanto antes'], v:[3,2,1,0]},
    {q:'Eu tenho me sentido tão infeliz que tenho tido dificuldade para dormir.', o:['Sim, na maioria das vezes','Sim, algumas vezes','Não muitas vezes','Não, nenhuma vez'], v:[3,2,1,0]},
    {q:'Eu tenho me sentido triste ou arrasada.', o:['Sim, na maioria das vezes','Sim, muitas vezes','Não muitas vezes','Não, de jeito nenhum'], v:[3,2,1,0]},
    {q:'Eu tenho me sentido tão infeliz que tenho chorado.', o:['Sim, quase todo o tempo','Sim, muitas vezes','De vez em quando','Não, nenhuma vez'], v:[3,2,1,0]},
    {q:'A ideia de fazer mal a mim mesma passou pela minha cabeça.', o:['Sim, muitas vezes, ultimamente','Algumas vezes nos últimos dias','Pouquíssimas vezes, ultimamente','Nenhuma vez'], v:[3,2,1,0]}
  ],
  levels:[
    {max:9, ...lvl('Abaixo do ponto de corte',0,'As respostas não indicam sinais importantes de depressão perinatal nesta semana. Cansaço e oscilações de humor são comuns nesse período.',['Seguir cuidando do descanso e aceitar ajuda da rede.','Repetir o rastreio se o humor mudar.'])},
    {max:12, ...lvl('Possível depressão perinatal',2,'As respostas mostram sinais que merecem atenção. Vale aprofundar a avaliação e reforçar a rede de cuidado.',['Acompanhamento psicológico.','Conversar com a equipe de saúde (obstetra, pediatra ou unidade básica).','Dividir os cuidados do bebê para garantir períodos de descanso.'])},
    {max:30, ...lvl('Provável depressão perinatal',3,'As respostas indicam sinais importantes de depressão perinatal. É importante buscar avaliação especializada o quanto antes.',['Avaliação psicológica e psiquiátrica com prioridade.','Rede de apoio ativa no dia a dia.','Você não está sozinha: depressão pós-parto tem tratamento.'])}
  ],
  flags:v => v[9] > 0 ? [{risk:true, pro:'Resposta positiva ao item 10 (pensamentos de autolesão). Recomenda-se avaliação de risco o quanto antes.'}] : [],
  ref:'Cox, J.L., Holden, J.M. & Sagovsky, R. (1987). Detection of postnatal depression: development of the 10-item Edinburgh Postnatal Depression Scale. British Journal of Psychiatry, 150, 782-786. © Royal College of Psychiatrists. Reprodução permitida citando autores, título e fonte. Para uso comercial, confirme a permissão junto ao Royal College of Psychiatrists.'
};

S.pcl5 = {
  title:'Rastreio de Estresse Pós-traumático (TEPT)', code:'PCL-5', cats:['tra'], icon:'shield', minutes:6, kind:'validado',
  topics:['Transtorno de estresse pós-traumático (TEPT)'],
  about:'Lista de 20 sintomas de estresse pós-traumático do DSM-5 no último mês, relacionados à experiência mais estressante vivida pela pessoa.',
  edu:'O TEPT pode surgir depois de experiências como violência, acidentes, abuso ou perdas súbitas. Envolve lembranças intrusivas, evitação, mudanças negativas no humor e nos pensamentos e um estado constante de alerta. É tratável com terapias focadas no trauma.',
  period:'Pense na experiência mais estressante que você viveu. No último mês, o quanto você foi incomodado(a) por:', options:INT5,
  items:[
    'Lembranças indesejadas, perturbadoras e repetitivas da experiência estressante.',
    'Sonhos perturbadores e repetitivos com a experiência estressante.',
    'De repente, sentir ou agir como se a experiência estivesse acontecendo de novo.',
    'Sentir-se muito chateado(a) quando algo lembra a experiência estressante.',
    'Ter reações físicas intensas quando algo lembra a experiência (coração acelerado, falta de ar, suor).',
    'Evitar lembranças, pensamentos ou sentimentos relacionados à experiência.',
    'Evitar lembretes externos da experiência (pessoas, lugares, conversas, atividades, objetos ou situações).',
    'Dificuldade para lembrar partes importantes da experiência.',
    'Ter crenças negativas intensas sobre si, os outros ou o mundo (por exemplo: "sou ruim", "ninguém é confiável", "o mundo é perigoso").',
    'Culpar a si mesmo(a) ou a outras pessoas pela experiência ou pelo que aconteceu depois.',
    'Ter sentimentos negativos intensos, como medo, horror, raiva, culpa ou vergonha.',
    'Perder o interesse em atividades de que você costumava gostar.',
    'Sentir-se distante ou isolado(a) das outras pessoas.',
    'Dificuldade para ter sentimentos positivos (como felicidade ou amor por pessoas próximas).',
    'Irritação, explosões de raiva ou comportamento agressivo.',
    'Correr muitos riscos ou fazer coisas que podem prejudicar você.',
    'Ficar em "superalerta", vigilante ou de sobreaviso.',
    'Sentir-se sobressaltado(a) ou assustar-se facilmente.',
    'Dificuldade para se concentrar.',
    'Problemas para pegar no sono ou permanecer dormindo.'
  ],
  dims:[{name:'Revivência', items:[0,1,2,3,4]},{name:'Evitação', items:[5,6]},{name:'Humor e pensamentos', items:[7,8,9,10,11,12,13]},{name:'Alerta e reatividade', items:[14,15,16,17,18,19]}],
  levels:[
    {max:19, ...lvl('Poucos sintomas',0,'As respostas mostram poucos sintomas de estresse pós-traumático no último mês.',['Seguir atento(a) a lembranças ou reações que surgirem.'])},
    {max:32, ...lvl('Sintomas presentes, abaixo do ponto de corte',1,'Há sintomas relacionados à experiência estressante, mas abaixo do ponto de corte sugestivo de TEPT. Eles merecem cuidado e acompanhamento.',['Técnicas de ancoragem quando as lembranças surgirem.','Conversar sobre a experiência no ritmo que for possível.'])},
    {max:80, ...lvl('Sugestivo de TEPT',3,'A pontuação está acima do ponto de corte (33) sugestivo de estresse pós-traumático. É indicada uma avaliação clínica completa.',['Terapias focadas no trauma, como TCC focada no trauma ou EMDR.','Cuidar do sono e de um ambiente de segurança.','Avaliar com o(a) profissional a necessidade de avaliação psiquiátrica.'])}
  ],
  flags:v => { const n = ix => ix.filter(i => v[i] >= 2).length;
    return n([0,1,2,3,4]) >= 1 && n([5,6]) >= 1 && n([7,8,9,10,11,12,13]) >= 2 && n([14,15,16,17,18,19]) >= 2
      ? [{pro:'Padrão de sintomas compatível com a regra diagnóstica provisória do DSM-5 (1 item B, 1 C, 2 D e 2 E marcados como "moderadamente" ou mais). Confirmar com entrevista clínica.'}] : []; },
  ref:'Weathers, Litz, Keane, Palmieri, Marx & Schnurr (2013). PTSD Checklist for DSM-5 (PCL-5), National Center for PTSD. Domínio público, sem direitos autorais. Ponto de corte sugerido: 31 a 33. Tradução de trabalho; para uso formal, consulte a versão brasileira validada.'
};

S.pcptsd5 = {
  title:'Rastreio Rápido de Trauma Psicológico', code:'PC-PTSD-5', cats:['tra'], icon:'shield', minutes:1, kind:'validado',
  topics:['Trauma psicológico'],
  about:'Cinco perguntas de triagem rápida para sintomas de trauma após experiências assustadoras, horríveis ou traumáticas.',
  edu:'Um trauma psicológico é a marca deixada por uma experiência que ultrapassa a capacidade de a pessoa lidar com ela naquele momento. Reações como pesadelos, evitação e alerta constante são formas de o organismo tentar se proteger.',
  period:'Às vezes acontecem coisas assustadoras, horríveis ou traumáticas, como um acidente grave, uma agressão física ou sexual, ver alguém ser ferido ou perder alguém de forma violenta. Se você viveu algo assim, responda pensando no último mês:', options:YN,
  items:[
    'Teve pesadelos com o evento ou pensou nele quando não queria?',
    'Tentou muito não pensar no evento ou fez de tudo para evitar situações que o lembrassem?',
    'Ficou constantemente em alerta, vigilante ou se assustando com facilidade?',
    'Sentiu-se entorpecido(a) ou distante das pessoas, das atividades ou do ambiente?',
    'Sentiu-se culpado(a) ou incapaz de parar de culpar a si mesmo(a) ou aos outros pelo evento ou pelos problemas que ele causou?'
  ],
  levels:[
    {max:2, ...lvl('Rastreio negativo',0,'As respostas não atingem o ponto de corte para sintomas de trauma. Se houver sofrimento ligado a alguma experiência, ele também merece atenção.',['Conversar sobre a experiência quando se sentir pronto(a).'])},
    {max:3, ...lvl('Limítrofe',1,'Três respostas positivas ficam logo abaixo do ponto de corte recomendado (4). Em mulheres, o corte 4 deixa passar muitos casos, por isso vale considerar aprofundar a avaliação.',['Considerar aplicar o PCL-5 para avaliação mais detalhada.','Conversar sobre a experiência no ritmo que for possível.'])},
    {max:5, ...lvl('Rastreio positivo',2,'As respostas atingem o ponto de corte recomendado (4 ou mais) e sugerem sintomas de trauma. Recomenda-se aprofundar a avaliação, por exemplo com o PCL-5.',['Aplicar o PCL-5 para avaliação mais detalhada.','Terapias focadas no trauma têm boa eficácia.'])}
  ],
  ref:'Prins et al. (2016). Primary Care PTSD Screen for DSM-5 (PC-PTSD-5), National Center for PTSD. Domínio público, sem direitos autorais. Ponto de corte recomendado: 4 (considerar 3 em mulheres). Tradução de trabalho.'
};

S.itq = {
  title:'Rastreio de Estresse Pós-traumático Complexo', code:'ITQ', cats:['tra'], icon:'shield', minutes:5, kind:'validado',
  topics:['Estresse pós-traumático complexo'],
  about:'International Trauma Questionnaire, baseado na CID-11. Diferencia o TEPT do TEPT complexo, que inclui dificuldades de regulação emocional, autoconceito negativo e problemas nos relacionamentos.',
  edu:'O TEPT complexo costuma surgir após traumas prolongados ou repetidos, como abuso na infância ou violência doméstica. Além dos sintomas do TEPT, a pessoa tem dificuldade de regular emoções, sente-se sem valor e tem dificuldade de manter vínculos próximos.',
  period:'Pense na experiência que mais incomoda você. No último mês, o quanto você foi incomodado(a) por:', options:INT5,
  items:[
    'Sonhos perturbadores que repetem parte da experiência ou estão ligados a ela?',
    'Imagens ou lembranças fortes que vêm à mente como se a experiência estivesse acontecendo de novo?',
    'Evitar coisas internas que lembram a experiência (pensamentos, sentimentos, sensações físicas)?',
    'Evitar coisas externas que lembram a experiência (pessoas, lugares, conversas, objetos)?',
    'Estar em "superalerta", vigilante ou de sobreaviso?',
    'Sentir-se sobressaltado(a) ou assustar-se facilmente?',
    'No último mês, esses problemas afetaram seus relacionamentos ou sua vida social?',
    'No último mês, esses problemas afetaram seu trabalho ou sua capacidade de trabalhar?',
    'No último mês, esses problemas afetaram outra parte importante da sua vida (cuidar dos filhos, estudos, outras atividades)?',
    {q:'Quando estou chateado(a), demoro muito para me acalmar.', p:'Abaixo estão problemas que pessoas que viveram experiências estressantes às vezes têm. As perguntas se referem a como você costuma se sentir e se relacionar. O quanto cada frase é verdadeira para você?'},
    {q:'Me sinto entorpecido(a) ou emocionalmente desligado(a).', p:'Abaixo estão problemas que pessoas que viveram experiências estressantes às vezes têm. As perguntas se referem a como você costuma se sentir e se relacionar. O quanto cada frase é verdadeira para você?'},
    {q:'Me sinto um fracasso.', p:'Abaixo estão problemas que pessoas que viveram experiências estressantes às vezes têm. As perguntas se referem a como você costuma se sentir e se relacionar. O quanto cada frase é verdadeira para você?'},
    {q:'Me sinto sem valor.', p:'Abaixo estão problemas que pessoas que viveram experiências estressantes às vezes têm. As perguntas se referem a como você costuma se sentir e se relacionar. O quanto cada frase é verdadeira para você?'},
    {q:'Me sinto distante ou isolado(a) das pessoas.', p:'Abaixo estão problemas que pessoas que viveram experiências estressantes às vezes têm. As perguntas se referem a como você costuma se sentir e se relacionar. O quanto cada frase é verdadeira para você?'},
    {q:'Acho difícil me manter emocionalmente próximo(a) das pessoas.', p:'Abaixo estão problemas que pessoas que viveram experiências estressantes às vezes têm. As perguntas se referem a como você costuma se sentir e se relacionar. O quanto cada frase é verdadeira para você?'},
    {q:'No último mês, esses problemas emocionais afetaram seus relacionamentos ou sua vida social?', p:'Abaixo estão problemas que pessoas que viveram experiências estressantes às vezes têm. As perguntas se referem a como você costuma se sentir e se relacionar. O quanto cada frase é verdadeira para você?'},
    {q:'No último mês, esses problemas emocionais afetaram seu trabalho ou sua capacidade de trabalhar?', p:'Abaixo estão problemas que pessoas que viveram experiências estressantes às vezes têm. As perguntas se referem a como você costuma se sentir e se relacionar. O quanto cada frase é verdadeira para você?'},
    {q:'No último mês, esses problemas emocionais afetaram outra parte importante da sua vida?', p:'Abaixo estão problemas que pessoas que viveram experiências estressantes às vezes têm. As perguntas se referem a como você costuma se sentir e se relacionar. O quanto cada frase é verdadeira para você?'}
  ],
  compute(v){
    const any = (...ix) => ix.some(i => v[i] >= 2);
    const ptsd = any(0,1) && any(2,3) && any(4,5) && any(6,7,8);
    const dso = any(9,10) && any(11,12) && any(13,14) && any(15,16,17);
    const sum = ix => ix.reduce((a,i) => a + v[i], 0);
    const dims = [{name:'Sintomas de TEPT', v:sum([0,1,2,3,4,5]), m:24},{name:'Perturbações na auto-organização', v:sum([9,10,11,12,13,14]), m:24}];
    const total = dims[0].v + dims[1].v;
    const level = ptsd && dso ? lvl('Sugestivo de TEPT complexo',3,'As respostas atendem aos critérios do ITQ para TEPT complexo: sintomas de estresse pós-traumático somados a dificuldades de regulação emocional, autoconceito e relacionamentos.',['Tratamento especializado em trauma, em fases: estabilização, processamento e reintegração.','Priorizar segurança e regulação emocional no início do cuidado.'])
      : ptsd ? lvl('Sugestivo de TEPT',2,'As respostas atendem aos critérios do ITQ para estresse pós-traumático, sem o padrão completo de TEPT complexo.',['Terapias focadas no trauma, como TCC focada no trauma ou EMDR.','Cuidar do sono e de um ambiente de segurança.'])
      : total > 12 ? lvl('Critérios não atingidos, com sintomas presentes',1,'Há sintomas relacionados ao trauma, mas eles não atendem aos critérios completos de TEPT ou TEPT complexo.',['Acompanhar esses sintomas nas sessões.'])
      : lvl('Critérios não atingidos',0,'As respostas não atendem aos critérios de TEPT ou TEPT complexo.',['Seguir atento(a) a reações ligadas à experiência.']);
    return {total, max:48, unit:'pontos de sintomas', noBar:true, dims, level};
  },
  ref:'Cloitre et al. (2018). International Trauma Questionnaire (ITQ). Disponibilizado gratuitamente pelos autores para uso clínico e em pesquisa. Tradução de trabalho.'
};

S.ace = {
  title:'Rastreio de Experiências Adversas na Infância', code:'ACE', cats:['tra'], icon:'shield', minutes:3, kind:'validado',
  topics:['Experiências adversas na infância','Trauma infantil'],
  about:'Dez perguntas sobre experiências adversas antes dos 18 anos: abuso, negligência e dificuldades no ambiente familiar.',
  edu:'Experiências adversas na infância são situações de abuso, negligência ou instabilidade familiar. Quanto maior o número dessas experiências, maior o risco de problemas de saúde física e mental na vida adulta. Vínculos seguros e cuidado terapêutico ajudam a reduzir esses efeitos.',
  period:'Durante seus primeiros 18 anos de vida:', options:YN,
  items:[
    'Algum adulto da casa frequentemente xingava, insultava, humilhava você ou agia de forma que você tivesse medo de ser machucado(a)?',
    'Algum adulto da casa frequentemente empurrava, agarrava, batia em você ou batia tão forte que deixava marcas?',
    'Algum adulto ou alguém pelo menos 5 anos mais velho tocou você de forma sexual, fez você tocar o corpo dele(a) ou tentou ter relação sexual com você?',
    'Você frequentemente sentia que ninguém na família amava você ou achava você importante, ou que as pessoas da família não se apoiavam?',
    'Você frequentemente não tinha comida suficiente, usava roupas sujas, não tinha ninguém para protegê-lo(a), ou seus pais estavam sob efeito de álcool ou drogas demais para cuidar de você?',
    'Seus pais se separaram ou se divorciaram?',
    'Sua mãe ou madrasta era frequentemente empurrada, agredida, ameaçada ou machucada?',
    'Você morou com alguém que tinha problemas com álcool ou usava drogas?',
    'Alguém da sua casa tinha depressão, doença mental ou tentou suicídio?',
    'Alguém da sua casa foi preso?'
  ],
  levels:[
    {max:0, ...lvl('Nenhuma experiência adversa relatada',0,'Não houve relato de experiências adversas na infância entre as investigadas.',['Outras experiências difíceis também podem ser exploradas nas sessões.'])},
    {max:3, ...lvl('Algumas experiências adversas',1,'Houve relato de experiências adversas na infância. Elas podem ter efeitos na forma como a pessoa se relaciona, regula emoções e cuida de si.',['Explorar na terapia como essas experiências ainda se manifestam hoje.','Fortalecer vínculos seguros e práticas de autocuidado.'])},
    {max:10, ...lvl('Alta exposição a experiências adversas',3,'Quatro ou mais experiências adversas foram relatadas, o que está associado a maior risco para a saúde física e mental. Isso não determina o futuro, mas indica a importância de cuidado especializado.',['Acompanhamento psicológico com abordagem informada pelo trauma.','Acompanhamento regular da saúde física.'])}
  ],
  ref:'Felitti et al. (1998). Adverse Childhood Experiences (ACE) Study, CDC e Kaiser Permanente. Questionário de uso livre. Tradução de trabalho.'
};

S.audit = {
  title:'Rastreio de Uso de Álcool', code:'AUDIT (OMS)', cats:['out'], icon:'cup', minutes:3, kind:'validado',
  topics:['Uso abusivo de álcool'],
  about:'Teste de Identificação de Problemas Relacionados ao Uso de Álcool, da Organização Mundial da Saúde. Dez perguntas sobre consumo, dependência e consequências.',
  edu:'Uma dose equivale a uma lata de cerveja, uma taça de vinho ou uma dose de destilado. O uso de risco aumenta a chance de problemas de saúde, acidentes e conflitos, mesmo sem dependência. Reduzir o consumo já traz benefícios.',
  period:'Pense no seu consumo de bebidas alcoólicas nos últimos 12 meses.', options:['','','','',''],
  items:(() => {
    const F = ['Nunca','Menos que mensalmente','Mensalmente','Semanalmente','Diariamente ou quase'];
    const L = ['Não','Sim, mas não no último ano','Sim, no último ano'];
    return [
      {q:'Com que frequência você toma bebidas alcoólicas?', o:['Nunca','Mensalmente ou menos','2 a 4 vezes por mês','2 a 3 vezes por semana','4 ou mais vezes por semana'], v:[0,1,2,3,4]},
      {q:'Nas ocasiões em que bebe, quantas doses você costuma tomar?', o:['1 ou 2','3 ou 4','5 ou 6','7 a 9','10 ou mais'], v:[0,1,2,3,4]},
      {q:'Com que frequência você toma 6 ou mais doses em uma única ocasião?', o:F, v:[0,1,2,3,4]},
      {q:'Com que frequência você percebeu que não conseguia parar de beber depois de começar?', o:F, v:[0,1,2,3,4]},
      {q:'Com que frequência você deixou de fazer o que era esperado de você por causa da bebida?', o:F, v:[0,1,2,3,4]},
      {q:'Com que frequência você precisou beber pela manhã para se sentir bem depois de ter bebido muito no dia anterior?', o:F, v:[0,1,2,3,4]},
      {q:'Com que frequência você sentiu culpa ou remorso depois de beber?', o:F, v:[0,1,2,3,4]},
      {q:'Com que frequência você não conseguiu lembrar o que aconteceu na noite anterior por causa da bebida?', o:F, v:[0,1,2,3,4]},
      {q:'Você ou outra pessoa já se machucou por causa da sua bebida?', o:L, v:[0,2,4]},
      {q:'Algum parente, amigo, médico ou profissional de saúde já se preocupou com sua bebida ou sugeriu que você diminuísse?', o:L, v:[0,2,4]}
    ];
  })(),
  levels:[
    {max:7, ...lvl('Baixo risco',0,'O padrão de consumo relatado é considerado de baixo risco.',['Manter o consumo moderado ou a abstinência.'])},
    {max:15, ...lvl('Uso de risco',1,'O consumo relatado aumenta o risco de problemas de saúde e de outras consequências. Uma orientação breve costuma ser suficiente para ajudar a reduzir.',['Definir limites de doses por ocasião e dias sem álcool na semana.','Observar em quais situações o consumo aumenta.'])},
    {max:19, ...lvl('Uso nocivo',2,'O consumo já está trazendo consequências. É indicada orientação estruturada e acompanhamento.',['Acompanhamento psicológico com foco no uso de álcool.','Avaliação médica.'])},
    {max:40, ...lvl('Provável dependência',3,'As respostas sugerem possível dependência de álcool. É indicada avaliação especializada.',['Encaminhamento para avaliação especializada (CAPS AD ou serviço de referência).','Não interromper o uso pesado de forma abrupta sem orientação médica.'])}
  ],
  ref:'Babor, Higgins-Biddle, Saunders & Monteiro (2001). AUDIT, Organização Mundial da Saúde. A publicação da OMS é licenciada como CC BY-NC-SA 3.0 IGO (uso não comercial); para uso em produto pago, confirme a permissão com a OMS.'
};

S.scoff = {
  title:'Rastreio de Transtornos Alimentares', code:'SCOFF', cats:['out'], icon:'leaf', minutes:1, kind:'validado',
  topics:['Transtornos alimentares','Anorexia e bulimia'],
  about:'Cinco perguntas rápidas de triagem para anorexia e bulimia nervosa.',
  edu:'Transtornos alimentares como anorexia e bulimia envolvem uma relação de sofrimento com a comida, o peso e a imagem corporal. Têm impacto sério na saúde física e precisam de cuidado multiprofissional.',
  period:'Responda pensando nos últimos meses:', options:YN,
  items:[
    'Você provoca vômito porque se sente desconfortavelmente cheio(a)?',
    'Você se preocupa por ter perdido o controle sobre o quanto come?',
    'Você perdeu recentemente mais de 6 kg em um período de 3 meses?',
    'Você se acha gordo(a) mesmo quando os outros dizem que você está muito magro(a)?',
    'Você diria que a comida domina sua vida?'
  ],
  levels:[
    {max:1, ...lvl('Abaixo do ponto de corte',0,'As respostas não atingem o ponto de corte para transtornos alimentares.',['Se houver sofrimento com comida ou imagem corporal, vale conversar sobre isso.'])},
    {max:5, ...lvl('Sugestivo de transtorno alimentar',2,'Duas ou mais respostas positivas sugerem a necessidade de avaliação para transtorno alimentar.',['Avaliação com equipe multiprofissional (psicologia, nutrição e medicina).','Evitar dietas restritivas sem orientação.'])}
  ],
  ref:'Morgan, Reid & Lacey (1999). The SCOFF questionnaire. British Medical Journal, 319, 1467. Adaptação para o português.'
};

S.phq15 = {
  title:'Rastreio de Sintomas Somáticos (Somatização)', code:'PHQ-15', cats:['out'], icon:'leaf', minutes:3, kind:'validado',
  topics:['Somatização'],
  about:'Quinze sintomas físicos comuns nas últimas quatro semanas. Ajuda a avaliar a carga de sintomas somáticos.',
  edu:'Emoções e estresse se manifestam também no corpo. A somatização acontece quando o sofrimento emocional aparece como dores e sintomas físicos persistentes. É importante investigar causas médicas e, ao mesmo tempo, cuidar da saúde emocional.',
  period:'Nas últimas 4 semanas, o quanto você foi incomodado(a) por:', options:['Não me incomodou','Incomodou um pouco','Incomodou muito'],
  items:['Dor de estômago','Dor nas costas','Dor nos braços, pernas ou articulações','Cólicas ou outros problemas menstruais (se não se aplica, marque "Não me incomodou")','Dores de cabeça','Dor no peito','Tontura','Desmaios','Sentir o coração bater forte ou acelerado','Falta de ar','Dor ou problemas durante a relação sexual','Prisão de ventre, intestino solto ou diarreia','Náusea, gases ou indigestão','Cansaço ou pouca energia','Dificuldade para dormir'],
  levels:[
    {max:4, ...lvl('Sintomas somáticos mínimos',0,'Poucos sintomas físicos relatados nas últimas semanas.',['Manter os cuidados habituais com a saúde.'])},
    {max:9, ...lvl('Sintomas somáticos baixos',1,'Há alguns sintomas físicos que podem ter relação com estresse ou emoções.',['Observar se os sintomas aumentam em períodos de tensão.','Práticas de relaxamento muscular e respiração.'])},
    {max:14, ...lvl('Sintomas somáticos médios',2,'A carga de sintomas físicos é relevante e pode estar ligada a sofrimento emocional.',['Avaliação médica para investigar causas físicas.','Trabalhar na terapia a relação entre emoções e corpo.'])},
    {max:30, ...lvl('Sintomas somáticos altos',3,'A carga de sintomas físicos é alta. É importante um cuidado integrado entre saúde física e emocional.',['Acompanhamento médico e psicológico integrados.','Evitar a busca repetida por exames sem um(a) médico(a) de referência.'])}
  ],
  ref:'Kroenke, Spitzer & Williams (2002). PHQ-15. Segundo phqscreeners.com, não é necessária permissão para reproduzir, traduzir, exibir ou distribuir.'
};

S.asrs = {
  title:'Rastreio de TDAH em Adultos', code:'ASRS-18 · Parte A', cats:['neu'], icon:'focus', minutes:2, kind:'validado',
  topics:['TDAH em adultos'],
  about:'As seis perguntas de triagem da escala de autorrelato da OMS para TDAH em adultos. Um resultado sugestivo indica a necessidade de avaliação completa, e não um diagnóstico.',
  edu:'O TDAH é uma condição do neurodesenvolvimento que começa na infância e pode seguir na vida adulta, com desatenção, desorganização, impulsividade e inquietação. Em adultos, muitas vezes aparece como dificuldade de concluir tarefas e de administrar o tempo.',
  period:'Nos últimos 6 meses, com que frequência:', options:FREQ5,
  items:[
    'Você tem dificuldade para concluir os detalhes finais de um projeto, depois que as partes mais desafiadoras já foram feitas?',
    'Você tem dificuldade para pôr as coisas em ordem quando precisa fazer uma tarefa que exige organização?',
    'Você tem dificuldade para lembrar de compromissos ou obrigações?',
    'Quando tem uma tarefa que exige muita concentração, você evita ou adia o início?',
    'Você fica se mexendo na cadeira ou balançando as mãos ou os pés quando precisa ficar sentado(a) por muito tempo?',
    'Você se sente ativo(a) demais e compelido(a) a fazer coisas, como se estivesse com um motor ligado?'
  ],
  compute(v){ const cut = [2,2,2,3,3,3]; return {total:v.reduce((s,x,i) => s + (x >= cut[i] ? 1 : 0), 0), max:6, unit:'de 6 itens no ponto de corte'}; },
  levels:[
    {max:3, ...lvl('Abaixo do ponto de corte',0,'As respostas não atingem o ponto de corte da triagem. Dificuldades de atenção e organização podem ter muitas causas, como estresse, sono ou ansiedade.',['Se as dificuldades atrapalham o dia a dia, conversar sobre elas com o(a) profissional.','Usar apoios externos simples: agenda, alarmes e listas curtas.'])},
    {max:6, ...lvl('Sugestivo de TDAH',2,'As respostas atingem o ponto de corte da triagem. Vale fazer uma avaliação completa, que considera a história de vida desde a infância e outras explicações possíveis.',['Avaliação neuropsicológica e/ou psiquiátrica.','Até lá, dividir tarefas em etapas pequenas e usar lembretes visuais.'])}
  ],
  ref:'Adult ADHD Self-Report Scale (ASRS-v1.1), Organização Mundial da Saúde. Adaptação brasileira de Mattos et al. (2006). Para uso comercial, confirme as condições de licença junto à OMS/Harvard.'
};

S.snap = {
  title:'Rastreio de TDAH Infantil', code:'SNAP-IV', cats:['neu'], icon:'focus', minutes:5, kind:'validado',
  topics:['TDAH infantil','Hiperatividade','Impulsividade'],
  about:'Questionário de 18 sintomas de TDAH do DSM, respondido por pais ou professores sobre o comportamento da criança.',
  edu:'Na infância, o TDAH aparece como dificuldade de prestar atenção, esquecimentos, agitação e impulsividade em casa e na escola, em grau maior do que o esperado para a idade. A avaliação deve incluir informações de diferentes ambientes.',
  resp:'Pais, responsáveis ou professores da criança',
  period:'Pensando no comportamento da criança nos últimos 6 meses, o quanto cada item a descreve:', options:['Nem um pouco','Só um pouco','Bastante','Demais'],
  items:[
    'Não consegue prestar muita atenção a detalhes ou comete erros por descuido nos trabalhos da escola ou tarefas.',
    'Tem dificuldade de manter a atenção em tarefas ou atividades de lazer.',
    'Parece não estar ouvindo quando se fala diretamente com ela.',
    'Não segue instruções até o fim e não termina deveres de escola, tarefas ou obrigações.',
    'Tem dificuldade para organizar tarefas e atividades.',
    'Evita ou não gosta de tarefas que exigem esforço mental prolongado.',
    'Perde coisas necessárias para atividades (brinquedos, deveres, lápis, livros).',
    'Distrai-se com estímulos externos.',
    'É esquecida em atividades do dia a dia.',
    'Mexe com as mãos ou os pés ou se remexe na cadeira.',
    'Sai do lugar na sala de aula ou em situações em que se espera que fique sentada.',
    'Corre de um lado para o outro ou sobe nas coisas em situações em que isso é inapropriado.',
    'Tem dificuldade de brincar ou fazer atividades de lazer de forma calma.',
    'Não para ou está frequentemente "a mil por hora".',
    'Fala em excesso.',
    'Responde às perguntas de forma precipitada, antes de terminarem.',
    'Tem dificuldade de esperar sua vez.',
    'Interrompe os outros ou se intromete em conversas e jogos.'
  ],
  compute(v){
    const ina = v.slice(0,9).filter(x => x >= 2).length, hyp = v.slice(9).filter(x => x >= 2).length;
    const dims = [{name:'Desatenção', v:ina, m:9, label:ina >= 6 ? 'Significativo' : 'Abaixo do corte', tone:ina >= 6 ? 2 : 0},{name:'Hiperatividade e impulsividade', v:hyp, m:9, label:hyp >= 6 ? 'Significativo' : 'Abaixo do corte', tone:hyp >= 6 ? 2 : 0}];
    const care = ['Avaliação com pediatra, neuropediatra ou psiquiatra infantil, com informações da escola.','Rotina previsível, instruções curtas e reforço positivo.'];
    const level = ina >= 6 && hyp >= 6 ? lvl('Sintomas significativos combinados',3,'Seis ou mais sintomas de desatenção e seis ou mais de hiperatividade e impulsividade foram marcados como "bastante" ou "demais". Indica a necessidade de avaliação completa.',care)
      : ina >= 6 ? lvl('Sintomas significativos de desatenção',2,'Seis ou mais sintomas de desatenção foram marcados como "bastante" ou "demais". Indica a necessidade de avaliação completa.',care)
      : hyp >= 6 ? lvl('Sintomas significativos de hiperatividade',2,'Seis ou mais sintomas de hiperatividade e impulsividade foram marcados como "bastante" ou "demais". Indica a necessidade de avaliação completa.',care)
      : lvl('Abaixo do ponto de corte',0,'Os sintomas marcados não atingem o ponto de corte em nenhuma das dimensões.',['Seguir observando o comportamento em casa e na escola.']);
    return {total:ina + hyp, max:18, unit:'sintomas marcados como "bastante" ou "demais"', noBar:true, dims, level};
  },
  ref:'Swanson, Nolan & Pelham. SNAP-IV, de domínio público. Versão brasileira de Mattos et al. (2006).'
};

S.burnout = {
  title:'Rastreio de Sinais de Burnout', code:'Psicoeducativo', cats:['bur'], icon:'flame', minutes:4, kind:'autoral',
  topics:['Síndrome de Burnout ocupacional'],
  about:'Doze afirmações sobre exaustão, distanciamento e sensação de eficácia no trabalho. É um questionário de psicoeducação criado para este app. Não é um instrumento validado e não substitui a avaliação clínica.',
  edu:'O burnout é um fenômeno ocupacional reconhecido pela OMS (CID-11), resultado de estresse crônico no trabalho que não foi bem administrado. Tem três dimensões: exaustão, distanciamento ou cinismo em relação ao trabalho e sensação de eficácia reduzida.',
  period:'Pensando no último mês, com que frequência isto acontece com você?', options:['Nunca','Raramente','Às vezes','Frequentemente','Sempre'],
  items:[
    'Termino o dia de trabalho me sentindo esgotado(a).',
    'Acordo cansado(a) só de pensar em mais um dia de trabalho.',
    'Mesmo descansando, sinto que minha energia não se recupera.',
    'Meu corpo dá sinais de tensão ligados ao trabalho (dores, insônia, mal-estar).',
    'Tenho me sentido indiferente ou distante das pessoas com quem trabalho.',
    'Fiquei mais irritado(a) ou impaciente no trabalho.',
    'Tenho vontade de me afastar de tudo o que envolve meu trabalho.',
    'Sinto que meu trabalho perdeu o sentido.',
    'Por mais que eu me esforce, sinto que não dou conta.',
    'Tenho dificuldade de concentração e cometo mais erros do que antes.',
    'Duvido da minha capacidade profissional.',
    'Sinto pouca satisfação com o que realizo.'
  ],
  dims:[{name:'Exaustão', items:[0,1,2,3]},{name:'Distanciamento', items:[4,5,6,7]},{name:'Eficácia reduzida', items:[8,9,10,11]}],
  levels:[
    {max:12, ...lvl('Poucos sinais',0,'Neste momento, o trabalho não parece estar drenando sua energia de forma importante. Seguir atento(a) aos limites ajuda a manter assim.',['Preservar pausas, férias e horários de desligamento.'])},
    {max:24, ...lvl('Sinais de atenção',1,'Alguns sinais de desgaste já aparecem. Eles costumam ser o aviso do corpo e da mente de que a demanda está maior que a recuperação.',['Revisar a carga de tarefas e onde é possível negociar prazos.','Criar um ritual de fim de expediente para desligar.','Retomar uma atividade fora do trabalho que traga prazer.'])},
    {max:36, ...lvl('Sinais elevados',2,'O desgaste está frequente e pode estar afetando saúde, relações e desempenho. Vale olhar para isso com prioridade.',['Aprofundar a avaliação com o(a) psicólogo(a).','Considerar avaliação médica, inclusive do sono.','Mapear com apoio o que pode mudar na rotina de trabalho.'])},
    {max:48, ...lvl('Sinais muito elevados',3,'Os sinais de esgotamento estão intensos. Cuidar disso agora é uma necessidade de saúde, não um luxo.',['Avaliação clínica com prioridade (psicológica e médica).','Discutir com o(a) profissional a possibilidade de afastamento ou de ajustes no trabalho.'])}
  ],
  ref:'Questionário psicoeducativo autoral, inspirado nas dimensões descritas na CID-11 (QD85). Não validado psicometricamente.'
};
})();
