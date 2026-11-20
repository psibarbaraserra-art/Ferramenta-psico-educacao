/* Psique Rastreios — rastreios de triagem autorais.
   Escritos para este app, a partir de critérios descritivos (DSM-5-TR / CID-11).
   Não são instrumentos validados: servem para psicoeducação e para orientar a entrevista clínica. */
(function(){
const P = window.PSI = window.PSI || {scales:{}};
const FREQ = ['Nunca','Raramente','Às vezes','Frequentemente','Sempre'];
const AGREE = ['Discordo totalmente','Discordo','Nem concordo nem discordo','Concordo','Concordo totalmente'];
const YN = ['Não','Sim'];
const NOTE = ' Rastreio de triagem construído a partir dos critérios do DSM-5-TR e da CID-11, para levantar hipóteses e orientar encaminhamentos.';
const REF = 'Rastreio de triagem Psique, construído a partir dos critérios descritivos do DSM-5-TR e da CID-11. Instrumento de apoio à formulação de hipóteses; ainda não passou por estudo de validação psicométrica.';
const SUP = {
  suicide:'Se você estiver pensando em se machucar ou em tirar a própria vida, procure ajuda agora: CVV 188 (gratuito, 24h) ou SAMU 192.',
  violence:'Se você estiver em situação de violência: Ligue 180 (Central de Atendimento à Mulher), Disque 100 (Direitos Humanos) ou 190 em caso de emergência.'
};
P.support = SUP;

function A(id, d){
  const opts = d.scale === 'agree' ? AGREE : d.scale === 'yesno' ? YN : FREQ;
  const max = d.items.length * (opts.length - 1), q = max / 4;
  const w = d.scale === 'agree' ? 'traços' : 'sinais';
  const W = w[0].toUpperCase() + w.slice(1);
  const th = d.theme;
  const levels = d.levels || [
    {max:Math.floor(q), label:`Poucos ${w}`, tone:0, text:`As respostas mostram poucos ${w} ${th} neste momento.`, care:['Seguir observando como você se sente e manter o que já tem funcionado.'].concat(d.tips.slice(0,1))},
    {max:Math.floor(2*q), label:`${W} leves`, tone:1, text:`Aparecem alguns ${w} ${th}. Vale observar em que situações eles surgem e conversar sobre isso nas sessões.`, care:d.tips},
    {max:Math.floor(3*q), label:`${W} moderados`, tone:2, text:`Os ${w} ${th} aparecem com frequência e podem estar interferindo na rotina, nas relações ou no bem-estar. Vale aprofundar a avaliação com o(a) profissional.`, care:d.tips.concat(['Aprofundar este tema nas sessões com o(a) profissional.'])},
    {max:max, label:d.scale === 'agree' ? 'Traços marcantes' : 'Sinais elevados', tone:3, text:`Os ${w} ${th} aparecem de forma intensa. É importante dar prioridade a esse cuidado, com acompanhamento profissional próximo.`, care:d.tips.concat(['Dar prioridade a esse cuidado, com acompanhamento profissional próximo.'])}
  ];
  P.scales[id] = {
    title:d.t, code:'Rastreio Psique', cats:d.cats, icon:d.icon, kind:'autoral', topics:d.topics || [],
    minutes:Math.max(2, Math.round(d.items.length * 0.3)),
    about:d.edu + NOTE, edu:d.edu,
    period:d.period || (d.scale === 'agree' ? 'Quanto cada frase descreve você, na maior parte da sua vida?' : 'Pensando nas últimas semanas, com que frequência isto acontece com você?'),
    options:opts, items:d.items, levels, resp:d.resp, noFeedback:d.noFeedback, safety:d.safety, safetyMin:d.safetyMin ?? 2,
    flags:d.flag ? (v => d.flag.filter(f => v[f.i] >= f.min).map(f => ({risk:!!f.risk, pro:f.pro}))) : null,
    ref:REF
  };
}

/* ========== 1. Ansiedade e transtornos relacionados ========== */
A('a_social', {t:'Rastreio de Ansiedade Social', cats:['ans','out'], topics:['Ansiedade social','Fobia social'], theme:'de ansiedade social',
  edu:'A ansiedade social é um medo intenso de ser observado(a), avaliado(a) ou julgado(a) pelos outros. Ela pode levar a evitar conversas, apresentações e encontros, mesmo quando a pessoa deseja participar.',
  items:['Sinto muito medo de ser julgado(a) ou criticado(a) pelas pessoas.','Evito falar em público, em reuniões ou em sala de aula.','Fico muito ansioso(a) ao conhecer pessoas novas.','Tenho medo de passar vergonha ou parecer ridículo(a) na frente dos outros.','Evito comer, escrever ou trabalhar quando alguém está me observando.','Sinto sintomas físicos (rubor, tremor, suor, coração acelerado) em situações sociais.','Depois de um encontro social, fico repassando o que disse ou fiz de errado.','Deixo de ir a eventos ou compromissos por causa da ansiedade.'],
  tips:['Exposição gradual: começar por situações sociais pouco desafiadoras e ir aumentando aos poucos.','Observar e questionar pensamentos como "todos vão perceber meu nervosismo".','Treinar respiração lenta antes de situações sociais.']});

A('a_fobia', {t:'Rastreio de Fobias Específicas', cats:['ans'], topics:['Fobias específicas'], theme:'de medo fóbico',
  edu:'A fobia específica é um medo intenso e desproporcional de um objeto ou situação, como animais, altura, sangue, agulhas, avião ou lugares fechados. A pessoa costuma reconhecer o exagero, mas não consegue controlá-lo e passa a evitar.',
  period:'Pense em algo que você teme muito (animais, altura, sangue, agulhas, avião, lugares fechados etc.). Com que frequência isto acontece?',
  items:['Sinto um medo intenso e imediato quando estou diante do que temo.','Só de pensar no que temo, já fico ansioso(a).','Faço grandes esforços para evitar a situação ou o objeto que temo.','Reconheço que meu medo é maior do que o perigo real.','Meu medo me impede de fazer coisas que eu gostaria ou precisaria fazer.','Tenho reações físicas fortes (tremor, falta de ar, tontura) diante do que temo.','Mudo minha rotina ou meus planos para não ter contato com o que temo.','Sinto esse medo há seis meses ou mais.'],
  tips:['Montar uma escada de exposição, do menos ao mais temido.','Evitar a evitação: cada fuga reforça o medo.','A exposição gradual com acompanhamento profissional é uma das abordagens mais eficazes para fobias.']});

A('a_separacao', {t:'Rastreio de Ansiedade de Separação', cats:['ans'], topics:['Ansiedade de separação'], theme:'de ansiedade de separação',
  edu:'A ansiedade de separação é um medo excessivo de se afastar de pessoas importantes ou de que algo ruim aconteça com elas. Pode aparecer na infância e também na vida adulta.',
  items:['Fico muito angustiado(a) quando preciso me separar de pessoas importantes para mim.','Tenho medo constante de que algo ruim aconteça com quem eu amo quando não estamos juntos.','Preciso saber o tempo todo onde estão as pessoas próximas a mim.','Evito viajar, dormir fora ou ficar sozinho(a) por medo da separação.','Tenho pesadelos ou pensamentos sobre perder pessoas queridas.','Sinto sintomas físicos (dor de cabeça, dor de estômago, enjoo) quando uma separação se aproxima.','Mando mensagens ou ligo várias vezes para ter certeza de que a pessoa está bem.','Essa preocupação atrapalha meu trabalho, estudos ou relações.'],
  tips:['Praticar separações curtas e previsíveis, aumentando aos poucos o tempo.','Combinar formas de contato com limites claros, sem checagens repetidas.','Trabalhar na terapia os medos de perda que estão por trás da ansiedade.']});

A('a_saude', {t:'Rastreio de Ansiedade com a Saúde (Hipocondria)', cats:['ans','out'], topics:['Ansiedade relacionada à saúde','Hipocondria'], theme:'de ansiedade com a saúde',
  edu:'A ansiedade relacionada à saúde é a preocupação persistente de ter ou desenvolver uma doença grave, mesmo depois de exames normais ou de orientação médica. Sensações comuns do corpo passam a ser vistas como sinais de perigo.',
  items:['Tenho medo de estar com uma doença grave.','Fico atento(a) às sensações do meu corpo, procurando sinais de doença.','Pesquiso sintomas na internet e fico mais preocupado(a) depois.','Mesmo com exames normais, continuo preocupado(a) com minha saúde.','Procuro médicos ou faço exames com frequência para me tranquilizar.','Evito notícias, hospitais ou conversas sobre doenças.','Peço que outras pessoas me tranquilizem sobre minha saúde.','A preocupação com a saúde ocupa boa parte do meu dia.'],
  tips:['Combinar limites para pesquisas na internet e checagens do corpo.','Observar o ciclo: sensação, interpretação catastrófica, ansiedade e checagem.','Manter acompanhamento com um(a) médico(a) de referência.']});

A('a_desempenho', {t:'Rastreio de Ansiedade de Desempenho', cats:['ans'], topics:['Ansiedade de desempenho'], theme:'de ansiedade de desempenho',
  edu:'A ansiedade de desempenho surge diante de provas, apresentações, competições, entrevistas ou da vida sexual. Um pouco de ativação ajuda, mas em excesso ela bloqueia e prejudica justamente o resultado que a pessoa deseja.',
  items:['Fico muito nervoso(a) antes de provas, apresentações ou avaliações.','Tenho "brancos" ou esqueço o que sei quando estou sendo avaliado(a).','Tenho medo de falhar e decepcionar as pessoas.','Sinto sintomas físicos intensos antes de situações de desempenho (insônia, náusea, tremor).','Adio ou evito situações em que serei avaliado(a).','Penso que, se não for perfeito, será um fracasso.','Depois de uma avaliação, fico remoendo os erros que cometi.','A ansiedade já me fez ter um desempenho abaixo da minha capacidade.'],
  tips:['Ensaiar em condições parecidas com as reais.','Trocar a meta de perfeição por metas realistas.','Usar respiração e ancoragem antes do momento de desempenho.']});

/* ========== 2. Depressão e alterações de humor ========== */
A('h_distimia', {t:'Rastreio de Depressão Persistente (Distimia)', cats:['hum'], topics:['Depressão persistente (distimia)'], theme:'de humor deprimido persistente',
  edu:'A depressão persistente, antes chamada de distimia, é um humor deprimido presente na maior parte do dia, na maioria dos dias, por pelo menos dois anos. Por ser duradoura, muitas vezes é confundida com o jeito de ser da pessoa.',
  period:'Pensando nos últimos dois anos, com que frequência isto acontece com você?',
  items:['Me sinto triste, desanimado(a) ou para baixo na maior parte do tempo.','Sinto que sou assim há tanto tempo que isso já faz parte de quem eu sou.','Tenho pouca energia ou me canso com facilidade.','Tenho baixa autoestima e me critico muito.','Tenho dificuldade para tomar decisões ou me concentrar.','Sinto falta de esperança em relação ao futuro.','Tenho alterações de apetite ou de sono.','Raramente passo mais de dois meses seguidos me sentindo bem.'],
  tips:['Reconhecer que o humor persistente não é "seu jeito", e sim algo que pode ser tratado.','Psicoterapia regular e, se indicado, avaliação psiquiátrica.','Incluir aos poucos atividades que tragam prazer e sensação de conquista.']});

A('h_sazonal', {t:'Rastreio de Depressão Sazonal', cats:['hum'], topics:['Depressão sazonal'], theme:'de alterações sazonais do humor',
  edu:'Na depressão sazonal, os sintomas aparecem e desaparecem em determinadas épocas do ano, geralmente no outono e no inverno, quando há menos luz solar. No Brasil, é mais comum nas regiões Sul e Sudeste.',
  period:'Pensando nos últimos anos, com que frequência isto acontece com você?',
  items:['Meu humor piora sempre em uma mesma época do ano.','Nessa época, durmo muito mais do que o normal.','Nessa época, tenho mais vontade de comer doces e carboidratos.','Nos meses com menos sol, sinto falta de energia.','Nessa época, perco o interesse pelas atividades e me isolo.','Ganho peso em determinadas estações do ano.','Meu humor melhora quando os dias ficam mais longos e ensolarados.','Essa mudança se repete há pelo menos dois anos.'],
  tips:['Buscar exposição à luz natural pela manhã.','Manter atividade física regular, especialmente nas estações mais difíceis.','Planejar com antecedência estratégias para o período de risco.']});

A('h_desesperanca', {t:'Rastreio de Sintomas de Desesperança', cats:['hum'], topics:['Sintomas de desesperança'], theme:'de desesperança', safety:'suicide',
  edu:'A desesperança é a sensação de que o futuro não trará melhoras e de que nada do que se faça vai mudar a situação. É um sinal importante, porque costuma estar ligada a maior sofrimento e a risco emocional.',
  items:['Sinto que o futuro não reserva nada de bom para mim.','Acho que as coisas nunca vão melhorar.','Não vejo sentido em fazer planos.','Sinto que, por mais que eu tente, nada dá certo.','Tenho dificuldade de imaginar minha vida daqui a alguns anos.','Sinto que perdi a vontade de lutar pelas coisas.','Acho que meus problemas não têm solução.','Sinto que não tenho motivos para seguir em frente.'],
  flag:[{i:7, min:2, risk:true, pro:'Item 8 ("não tenho motivos para seguir em frente") marcado como "às vezes" ou mais. Investigar ideação suicida (por exemplo, com o ASQ).'}],
  tips:['Conversar abertamente com o(a) psicólogo(a) sobre esses sentimentos.','Retomar pequenas metas possíveis para hoje.','Identificar pessoas de confiança para pedir apoio.']});

A('h_oscilacoes', {t:'Rastreio de Oscilações de Humor', cats:['hum'], topics:['Oscilações de humor'], theme:'de oscilações de humor',
  edu:'Todos temos variações de humor, mas algumas pessoas sentem mudanças intensas e rápidas, que afetam relações, trabalho e decisões. Entender o padrão dessas oscilações ajuda a diferenciar reações ao ambiente de quadros que precisam de avaliação especializada.',
  items:['Meu humor muda de forma rápida e intensa ao longo do dia.','Passo de muito bem a muito mal sem um motivo claro.','Pequenas situações provocam reações emocionais fortes em mim.','As pessoas comentam que meu humor é imprevisível.','Tenho fases de muita irritação que depois passam.','Minhas mudanças de humor atrapalham minhas relações.','Tomo decisões impulsivas quando estou com o humor alterado.','Tenho dificuldade de voltar ao equilíbrio depois de uma emoção forte.'],
  tips:['Registrar o humor diariamente por algumas semanas para identificar padrões.','Cuidar do sono, que influencia muito a estabilidade emocional.','Avaliar com o(a) profissional se é indicada uma avaliação psiquiátrica.']});

A('h_bipolar', {t:'Rastreio de Sinais do Espectro Bipolar', cats:['hum'], topics:['Transtorno bipolar'], theme:'de hipomania ou mania', scale:'yesno', noFeedback:true,
  edu:'O transtorno bipolar envolve, além de fases de depressão, períodos de euforia ou irritação intensa, com muita energia, pouca necessidade de sono e comportamentos impulsivos (hipomania ou mania). Identificar esses períodos é essencial, pois muda o tratamento.',
  period:'Já houve algum período da sua vida, diferente do seu jeito habitual, em que:',
  items:['Você se sentiu eufórico(a) ou acelerado(a) a ponto de as pessoas estranharem seu comportamento?','Você ficou tão irritado(a) que se envolveu em brigas ou discussões fora do comum?','Você se sentiu muito mais autoconfiante, com ideias de grandeza?','Você dormiu muito menos do que o normal e mesmo assim não sentiu cansaço?','Você falou muito mais, ou muito mais rápido, do que o normal?','Seus pensamentos ficaram tão acelerados que era difícil acompanhá-los?','Você se distraiu com tanta facilidade que não conseguia manter o foco?','Você teve muito mais energia e começou muitos projetos ao mesmo tempo?','Você gastou dinheiro de forma exagerada ou se envolveu em situações arriscadas?','Vários desses sinais aconteceram no mesmo período, por alguns dias seguidos?','Esses períodos causaram problemas no trabalho, na família, nas finanças ou com a justiça?'],
  levels:[
    {max:3, label:'Poucos sinais', tone:0, text:'Foram relatados poucos sinais de períodos de euforia ou aceleração.', care:['Se houver episódios de depressão, seguir atento(a) a mudanças de energia e sono.']},
    {max:6, label:'Alguns sinais', tone:1, text:'Foram relatados alguns sinais de períodos de aceleração. Vale investigar quando aconteceram, quanto tempo duraram e se ocorreram juntos.', care:['Registrar humor, sono e energia diariamente.','Conversar sobre esses períodos com o(a) profissional.']},
    {max:11, label:'Vários sinais', tone:3, text:'Foram relatados vários sinais compatíveis com períodos de hipomania ou mania. É indicada avaliação psiquiátrica para investigar o espectro bipolar.', care:['Avaliação psiquiátrica.','Rotina regular de sono, que é um fator de proteção importante.','Envolver a família na observação de sinais de alerta.']}
  ],
  tips:[]});

/* ========== 3. Saúde mental materna e puerpério ========== */
A('m_ansiedade', {t:'Rastreio de Ansiedade no Pós-parto', cats:['mat'], topics:['Ansiedade pós-parto'], theme:'de ansiedade no pós-parto', icon:'baby', resp:'A mãe',
  edu:'A ansiedade no pós-parto é tão comum quanto a depressão, mas é menos falada. Aparece como preocupação constante com o bebê, medo de que algo ruim aconteça e dificuldade de descansar mesmo quando há oportunidade.',
  period:'Desde o nascimento do bebê, com que frequência isto acontece com você?',
  items:['Me preocupo o tempo todo com a saúde e a segurança do bebê.','Tenho pensamentos assustadores de que algo ruim pode acontecer com o bebê.','Não consigo descansar ou dormir mesmo quando o bebê está dormindo.','Verifico o bebê várias vezes para ter certeza de que está bem.','Sinto o coração acelerado, falta de ar ou tensão no corpo.','Tenho dificuldade de deixar o bebê com outras pessoas.','Sinto que estou sempre em alerta, esperando algo dar errado.','A preocupação atrapalha minha capacidade de aproveitar a maternidade.'],
  tips:['Lembrar que pensamentos assustadores são comuns no pós-parto e não significam que você fará algo ruim.','Aceitar ajuda para ter períodos reais de descanso.','Conversar com o(a) obstetra ou pediatra sobre as preocupações recorrentes.']});

A('m_blues', {t:'Rastreio de Tristeza Puerperal (Baby Blues)', cats:['mat'], topics:['Baby blues (tristeza puerperal)'], theme:'de tristeza puerperal', icon:'baby', resp:'A mãe',
  edu:'O baby blues atinge a maioria das mulheres nos primeiros dias após o parto. Envolve choro fácil, sensibilidade e oscilações de humor, e costuma passar sozinho em até duas semanas. Se os sintomas durarem mais ou ficarem intensos, pode ser depressão pós-parto.',
  period:'Desde o nascimento do bebê, com que frequência isto acontece com você?',
  items:['Choro com facilidade, às vezes sem saber o motivo.','Me sinto mais sensível e emotiva do que o normal.','Meu humor oscila bastante ao longo do dia.','Me sinto irritada ou impaciente.','Me sinto sobrecarregada com os cuidados do bebê.','Tenho dificuldade de dormir, mesmo quando posso.','Sinto que não estou dando conta de ser mãe.','Esses sentimentos já duram mais de duas semanas.'],
  flag:[{i:7, min:2, pro:'Sintomas com duração superior a duas semanas: aplicar a EPDS para rastreio de depressão pós-parto.'}],
  tips:['Descansar sempre que possível e aceitar ajuda nas tarefas da casa.','Falar sobre o que sente com pessoas de confiança.','Se os sintomas passarem de duas semanas, procurar avaliação.']});

A('m_sobrecarga', {t:'Rastreio de Estresse e Sobrecarga Materna', cats:['mat'], topics:['Estresse materno','Sobrecarga materna'], theme:'de estresse e sobrecarga materna', icon:'baby', resp:'A mãe',
  edu:'A sobrecarga materna acontece quando as demandas de cuidar dos filhos, da casa e de outras responsabilidades superam os recursos e o apoio disponíveis. Ela resulta de uma distribuição desigual de tarefas, e não de uma falha pessoal.',
  items:['Sinto que todas as responsabilidades com os filhos ficam comigo.','Não tenho tempo para mim nem para descansar.','Me sinto irritada ou sem paciência com meus filhos.','Sinto que preciso dar conta de tudo sozinha.','Sinto falta de apoio do(a) parceiro(a), da família ou de outras pessoas próximas.','Termino o dia exausta física e emocionalmente.','Abri mão de atividades e projetos pessoais por causa da maternidade.','Sinto que estou no meu limite.'],
  tips:['Listar as tarefas da casa e dos filhos e renegociar a divisão.','Reservar ao menos um momento curto na semana só para você.','Identificar pessoas ou serviços que possam formar sua rede de apoio.']});

A('m_burnout', {t:'Rastreio de Burnout Parental', cats:['mat','bur'], topics:['Esgotamento parental (Burnout parental)','Burnout parental'], theme:'de esgotamento parental', icon:'flame', resp:'Mãe, pai ou cuidador(a)',
  edu:'O burnout parental é um esgotamento ligado ao papel de mãe ou pai. Envolve exaustão intensa, distanciamento emocional dos filhos, perda do prazer em cuidar e a sensação de não ser mais o pai ou a mãe que se gostaria de ser.',
  items:['Me sinto completamente esgotado(a) pelo meu papel de mãe ou pai.','Acordo cansado(a) só de pensar em mais um dia cuidando dos filhos.','Sinto que estou no "piloto automático" com meus filhos.','Tenho menos paciência e carinho com meus filhos do que gostaria.','Não sinto mais prazer em estar com meus filhos.','Sinto que não sou mais o pai ou a mãe que eu era.','Tenho vontade de fugir das responsabilidades com os filhos.','Me sinto culpado(a) por me sentir assim.'],
  tips:['Reconhecer que o burnout parental resulta de excesso de demandas e falta de recursos.','Buscar momentos de pausa real, dividindo os cuidados quando possível.','Reduzir as exigências de perfeição na criação dos filhos.']});

A('m_adaptacao', {t:'Rastreio de Adaptação à Maternidade', cats:['mat'], topics:['Dificuldades de adaptação à maternidade'], theme:'de dificuldade de adaptação à maternidade', icon:'baby', resp:'A mãe',
  edu:'Tornar-se mãe muda a identidade, a rotina, o corpo e as relações. É esperado que essa adaptação tenha momentos difíceis. Quando o estranhamento persiste, ele merece acolhimento e cuidado.',
  items:['Sinto que perdi minha identidade depois de me tornar mãe.','Tenho dificuldade de me adaptar à nova rotina.','Sinto falta da vida que eu tinha antes.','Sinto que a maternidade é muito diferente do que eu imaginava.','Tenho dificuldade de me reconhecer no meu corpo atual.','Meu relacionamento com o(a) parceiro(a) mudou de forma difícil.','Me sinto insegura nos cuidados com o bebê.','Sinto que não me encaixo no papel de mãe.'],
  tips:['Validar que sentimentos ambivalentes fazem parte da maternidade real.','Conversar com outras mães sobre a experiência, sem comparações.','Retomar aos poucos atividades que conectam você com quem você é.']});

A('m_culpa', {t:'Rastreio de Culpa Materna', cats:['mat'], topics:['Sentimentos de culpa materna'], theme:'de culpa materna', icon:'baby', resp:'A mãe',
  edu:'A culpa materna é alimentada por expectativas irreais sobre a "mãe perfeita". Ela aparece ao trabalhar, descansar, impor limites ou simplesmente ter necessidades próprias, e pode gerar muita autocobrança e sofrimento.',
  items:['Me sinto culpada quando faço algo para mim.','Sinto que nunca estou fazendo o suficiente pelos meus filhos.','Me comparo com outras mães e me sinto inferior.','Me culpo quando meu filho fica doente, triste ou se comporta mal.','Sinto culpa por trabalhar ou estudar longe dos meus filhos.','Fico remoendo situações em que perdi a paciência.','Acho que outras pessoas me julgam como mãe.','Tenho dificuldade de me perdoar pelos meus erros como mãe.'],
  tips:['Trocar a ideia de "mãe perfeita" pela de "mãe suficientemente boa".','Observar a voz da autocrítica e responder a ela com mais gentileza.','Reduzir a exposição a conteúdos que alimentam comparações.']});

A('m_vinculo', {t:'Rastreio de Vínculo Mãe-Bebê', cats:['mat'], topics:['Vínculo mãe-bebê'], theme:'de dificuldade no vínculo com o bebê', icon:'baby', resp:'A mãe', noFeedback:true,
  edu:'O vínculo entre mãe e bebê se constrói aos poucos e nem sempre acontece de imediato. Dificuldades nesse processo são mais comuns do que se imagina, especialmente com depressão, ansiedade ou um parto difícil, e podem ser trabalhadas.',
  items:['Me sinto distante ou desconectada do meu bebê.','Sinto que cuido do bebê por obrigação, sem afeto.','Fico muito irritada com o choro do bebê.','Tenho dificuldade de entender o que o bebê precisa.','Sinto que o bebê não gosta de mim.','Prefiro que outras pessoas cuidem do bebê.','Tenho pouco prazer em brincar ou interagir com o bebê.','Às vezes sinto que o bebê não é meu.'],
  tips:['Momentos de contato pele a pele, olhar e conversa ajudam a fortalecer o vínculo.','Tratar a depressão ou a ansiedade, quando presentes, costuma melhorar o vínculo.','Buscar acompanhamento especializado em saúde mental perinatal.']});

A('m_gestacao', {t:'Rastreio de Sofrimento Emocional na Gestação', cats:['mat'], topics:['Sofrimento emocional durante a gestação'], theme:'de sofrimento emocional na gestação', icon:'baby', resp:'A gestante',
  edu:'A gestação traz mudanças hormonais, físicas e de vida. Sentir medo ou insegurança é esperado, mas tristeza persistente, ansiedade intensa ou isolamento merecem atenção, pois também aumentam o risco no pós-parto.',
  period:'Durante esta gestação, com que frequência isto acontece com você?',
  items:['Me sinto triste ou desanimada.','Tenho medo intenso do parto.','Me preocupo excessivamente com a saúde do bebê.','Me sinto sozinha ou sem apoio nesta gestação.','Tenho dificuldade de aceitar as mudanças no meu corpo.','Sinto insegurança sobre ser mãe.','Tenho dificuldade para dormir por causa das preocupações.','Choro com frequência ou me sinto muito sensível.'],
  tips:['Conversar sobre os medos do parto com a equipe de pré-natal.','Participar de grupos ou cursos de gestantes.','Organizar desde já a rede de apoio para o pós-parto.']});

A('m_puerperio', {t:'Check-up Emocional do Puerpério', cats:['mat'], topics:['Saúde mental durante o puerpério'], theme:'de sofrimento emocional no puerpério', icon:'baby', resp:'A mãe', safety:'suicide',
  edu:'O puerpério é o período após o parto, com intensas mudanças físicas e emocionais. Este check-up reúne sinais de humor, ansiedade, sono, apoio e autocuidado, ajudando a identificar onde o cuidado precisa ser reforçado.',
  period:'Desde o nascimento do bebê, com que frequência isto acontece com você?',
  items:['Me sinto triste, vazia ou sem esperança.','Me sinto ansiosa ou preocupada a maior parte do tempo.','Durmo mal mesmo quando tenho oportunidade de descansar.','Me sinto sozinha nos cuidados com o bebê.','Perdi o interesse por coisas de que eu gostava.','Esqueço de comer, beber água ou cuidar de mim.','Me sinto incapaz como mãe.','Tenho pensamentos de me machucar ou de que seria melhor desaparecer.'],
  flag:[{i:7, min:1, risk:true, pro:'Item 8 (pensamentos de se machucar ou desaparecer) com resposta diferente de "nunca". Avaliação de risco o quanto antes.'}],
  tips:['Priorizar descanso e alimentação com ajuda da rede.','Combinar com a família turnos de cuidado do bebê.','Manter as consultas de puerpério e falar abertamente sobre como se sente.']});

/* ========== 4. Traumas e experiências adversas ========== */
const VIOL_LEVELS = (th) => [
  {max:0, label:'Nenhum sinal relatado', tone:0, text:`Não foram relatados sinais ${th} nas situações investigadas.`, care:['Se algo mudar, você pode retomar esse assunto a qualquer momento nas sessões.']},
  {max:6, label:'Sinais presentes', tone:2, text:`Foram relatados sinais ${th}. Mesmo situações que parecem pequenas merecem atenção, porque a violência costuma aumentar com o tempo.`, care:['Você não tem culpa pela violência que sofre.','Conversar com pessoas de confiança sobre o que está vivendo.','Construir com o(a) profissional um plano de segurança.']},
  {max:32, label:'Sinais importantes', tone:3, text:`Foram relatados sinais importantes ${th}. Sua segurança vem em primeiro lugar.`, care:['Construir com o(a) profissional um plano de segurança.','Ligue 180 para orientação ou 190 em caso de emergência.','Procurar a Delegacia da Mulher ou o CREAS da sua cidade.']}
];
A('t_violencia', {t:'Rastreio de Violência Doméstica', cats:['tra'], topics:['Violência doméstica'], theme:'de violência doméstica', icon:'shield', safety:'violence', safetyMin:1, noFeedback:true,
  edu:'A violência doméstica pode ser física, psicológica, sexual, patrimonial ou moral, como descreve a Lei Maria da Penha. Muitas vezes começa de forma sutil, com controle e humilhações, e vai se intensificando com o tempo.',
  period:'Pensando no seu relacionamento atual ou mais recente, com que frequência isto acontece?',
  items:['A pessoa com quem me relaciono me humilha, xinga ou ridiculariza.','Tenho medo da reação dessa pessoa.','Fui empurrado(a), agredido(a) ou machucado(a) fisicamente por ela.','Ela controla meu dinheiro, meu celular ou com quem eu falo.','Fui ameaçado(a) por essa pessoa.','Fui pressionado(a) ou forçado(a) a ter relações sexuais.','Ela quebra objetos, destrói minhas coisas ou machuca animais.','Me afastei de amigos e familiares por causa dessa relação.'],
  levels:VIOL_LEVELS('de violência doméstica'),
  flag:[{i:2, min:1, risk:true, pro:'Relato de agressão física. Avaliar segurança e plano de proteção.'},{i:4, min:1, risk:true, pro:'Relato de ameaças. Avaliar risco e plano de proteção.'},{i:5, min:1, risk:true, pro:'Relato de violência sexual. Avaliar segurança e orientar sobre a rede de proteção.'}],
  tips:[]});

A('t_abuso', {t:'Rastreio de Abuso Psicológico e Emocional', cats:['tra'], topics:['Abuso psicológico e emocional'], theme:'de abuso psicológico e emocional', icon:'shield', safety:'violence', noFeedback:true,
  edu:'O abuso psicológico envolve críticas constantes, manipulação, desvalorização, culpabilização e isolamento. Por não deixar marcas visíveis, costuma ser minimizado, mas causa danos profundos à autoestima e à saúde mental.',
  period:'Pensando em uma relação importante (parceiro(a), familiar, chefe), com que frequência isto acontece?',
  items:['Essa pessoa me critica ou me desvaloriza com frequência.','Ela distorce o que aconteceu e me faz duvidar da minha memória.','Sinto que preciso "pisar em ovos" para não provocar a reação dela.','Ela me culpa pelos problemas da relação.','Ela me ignora ou me dá "gelo" como forma de punição.','Ela tenta me afastar das pessoas de quem eu gosto.','Ela usa meus pontos fracos contra mim.','Depois de conversar com ela, me sinto confuso(a), culpado(a) ou pequeno(a).'],
  tips:['Nomear o que acontece já é um passo importante de proteção.','Registrar as situações ajuda a confiar na própria percepção.','Fortalecer vínculos com pessoas de confiança fora da relação.']});

A('t_luto', {t:'Rastreio de Luto Traumático', cats:['tra'], topics:['Luto traumático'], theme:'de luto traumático', icon:'shield',
  edu:'O luto traumático acontece quando a morte ocorre de forma súbita, violenta ou chocante, como em acidentes, suicídio, homicídio ou desastres. Além da dor da saudade, aparecem sintomas de trauma, como imagens intrusivas e evitação.',
  period:'Pensando na perda de alguém importante que aconteceu de forma repentina, violenta ou inesperada, com que frequência isto acontece?',
  items:['Imagens de como a pessoa morreu invadem minha mente.','Tenho pesadelos relacionados à perda.','Evito lugares, pessoas ou assuntos que lembram o que aconteceu.','Ainda não consigo acreditar que a pessoa morreu.','Sinto raiva intensa ou culpa pelo que aconteceu.','Fico em alerta, com medo de que algo parecido aconteça.','Sinto que uma parte de mim morreu junto.','A dor da perda me impede de seguir com minha vida.'],
  tips:['Buscar acompanhamento especializado em luto e trauma.','Respeitar o próprio ritmo, sem pressão para "superar".','Grupos de apoio a enlutados podem diminuir a sensação de isolamento.']});

A('t_dissociacao', {t:'Rastreio de Sintomas Dissociativos', cats:['tra'], topics:['Dissociação'], theme:'de experiências dissociativas', icon:'shield',
  edu:'A dissociação é uma desconexão entre pensamentos, memórias, sensações e identidade. Experiências leves, como "viajar" no pensamento, são comuns. Quando são frequentes e intensas, costumam estar ligadas a estresse extremo ou a traumas.',
  items:['Sinto que estou fora do meu corpo, me observando de longe.','Sinto que o mundo ao meu redor é irreal, como em um sonho.','Tenho lapsos de memória sobre coisas que fiz ou que aconteceram.','Me pego em algum lugar sem saber como cheguei lá.','Me desligo completamente e perco a noção do tempo.','Me sinto desconectado(a) das minhas emoções, como se estivesse anestesiado(a).','Às vezes não me reconheço no espelho.','Sinto que há partes de mim que agem de formas muito diferentes.'],
  tips:['Técnicas de ancoragem: nomear 5 coisas que vê, 4 que ouve e 3 que pode tocar.','Observar quais situações ou lembranças antecedem os episódios.','Buscar profissional com formação em trauma e dissociação.']});

/* ========== 5. Estresse, esgotamento e burnout ========== */
A('b_cronico', {t:'Rastreio de Estresse Crônico', cats:['bur'], topics:['Estresse crônico'], theme:'de estresse crônico', icon:'flame',
  edu:'O estresse crônico acontece quando o organismo fica em estado de alerta por muito tempo, sem recuperação adequada. Com o tempo, afeta o sono, a imunidade, a digestão, a memória e o humor.',
  period:'Nos últimos meses, com que frequência isto acontece com você?',
  items:['Sinto que estou sob pressão o tempo todo.','Tenho dificuldade para relaxar, mesmo nos momentos livres.','Tenho dores de cabeça, tensão muscular ou problemas digestivos.','Fico doente com mais frequência do que antes.','Me irrito com facilidade com coisas pequenas.','Tenho dificuldade de memória e concentração.','Meu sono não é reparador.','Sinto que essa situação já dura muitos meses.'],
  tips:['Incluir pausas curtas ao longo do dia.','Atividade física regular ajuda a reduzir os hormônios do estresse.','Identificar quais fontes de estresse podem ser reduzidas ou renegociadas.']});

A('b_sobrecarga', {t:'Rastreio de Sobrecarga Emocional', cats:['bur'], topics:['Sobrecarga emocional'], theme:'de sobrecarga emocional', icon:'flame',
  edu:'A sobrecarga emocional surge quando acumulamos preocupações, responsabilidades e sentimentos sem espaço para processá-los. A pessoa sente que está "transbordando" e pode reagir com choro, irritação ou desligamento.',
  items:['Sinto que estou carregando mais do que consigo.','Choro ou me irrito por motivos que antes não me afetariam.','Sinto que todos precisam de mim e não sobra nada para mim.','Guardo meus sentimentos para não preocupar os outros.','Tenho dificuldade de dizer não aos pedidos.','Sinto que vou "explodir" a qualquer momento.','Me desligo ou fico anestesiado(a) para aguentar o dia.','Não tenho com quem dividir o que sinto.'],
  tips:['Nomear e escrever o que está sentindo, para organizar as emoções.','Escolher uma pessoa de confiança para dividir o peso.','Revisar compromissos e abrir mão do que não é essencial.']});

A('b_compaixao', {t:'Rastreio de Fadiga por Compaixão', cats:['bur'], topics:['Fadiga por compaixão'], theme:'de fadiga por compaixão', icon:'flame', resp:'Profissionais de cuidado e cuidadores',
  edu:'A fadiga por compaixão atinge pessoas que cuidam do sofrimento de outros, como profissionais de saúde, psicólogos, professores e cuidadores. É um desgaste emocional causado pela exposição contínua à dor alheia.',
  items:['Me sinto emocionalmente esgotado(a) por cuidar das pessoas que atendo.','Penso nos casos que atendo mesmo fora do horário de trabalho.','Tenho menos empatia do que antes com as pessoas que atendo.','Sinto que absorvo o sofrimento das pessoas que atendo.','Tenho pensamentos ou imagens intrusivas das histórias que escuto.','Evito certos atendimentos ou assuntos por me afetarem demais.','Sinto que meu trabalho de cuidado perdeu o sentido.','Tenho dificuldade de me desligar e descansar.'],
  tips:['Supervisão e terapia pessoal são fatores de proteção para quem cuida.','Criar rituais de transição entre o trabalho e a vida pessoal.','Equilibrar a agenda com casos de diferentes níveis de complexidade.']});

A('b_exaustao', {t:'Rastreio de Exaustão Mental', cats:['bur'], topics:['Exaustão mental'], theme:'de exaustão mental', icon:'flame',
  edu:'A exaustão mental é um cansaço da mente que não melhora com uma noite de sono. Aparece como dificuldade de pensar, lentidão, esquecimentos e falta de motivação, geralmente após longos períodos de sobrecarga.',
  items:['Sinto minha mente cansada, mesmo depois de descansar.','Tenho dificuldade de pensar com clareza.','Esqueço compromissos e informações com frequência.','Tarefas simples parecem exigir muito esforço.','Tenho dificuldade de tomar decisões, até as pequenas.','Sinto falta de motivação para começar as atividades.','Fico sobrecarregado(a) com muitas informações ou estímulos.','Sinto que estou funcionando no limite.'],
  tips:['Reduzir a multitarefa e trabalhar em blocos de foco com pausas.','Diminuir o uso de telas antes de dormir.','Avaliar a necessidade de uma pausa maior, como férias ou redução de carga.']});

A('b_trabalho', {t:'Rastreio de Estresse no Trabalho', cats:['bur'], topics:['Estresse relacionado ao trabalho'], theme:'de estresse no trabalho', icon:'flame',
  edu:'O estresse no trabalho surge quando as exigências são maiores que o controle e o apoio disponíveis. Prazos apertados, conflitos, insegurança e falta de reconhecimento estão entre as fontes mais comuns. É um fator de risco reconhecido para o burnout.',
  items:['Tenho mais trabalho do que consigo fazer no tempo disponível.','Sinto que tenho pouco controle sobre como faço meu trabalho.','Sinto falta de apoio de colegas ou da liderança.','Tenho conflitos frequentes no ambiente de trabalho.','Sinto que meu esforço não é reconhecido.','Tenho medo de perder meu emprego.','Sinto ansiedade ou mal-estar antes do início do expediente.','O trabalho tem prejudicado minha saúde.'],
  tips:['Mapear quais fontes de estresse podem ser negociadas com a liderança.','Definir horários claros de desconexão do trabalho.','Se houver assédio, registrar as situações e buscar orientação.']});

A('b_equilibrio', {t:'Rastreio de Equilíbrio entre Vida Pessoal e Profissional', cats:['bur'], topics:['Dificuldades de equilíbrio entre vida pessoal e profissional'], theme:'de desequilíbrio entre vida pessoal e profissional', icon:'flame',
  edu:'Equilíbrio entre trabalho e vida pessoal não é dividir o tempo igualmente, e sim ter espaço suficiente para descanso, relações, saúde e lazer. Quando o trabalho invade tudo, aumenta o risco de estresse e esgotamento.',
  items:['Trabalho além do meu horário com frequência.','Respondo mensagens de trabalho em horários de descanso.','Não tenho tempo para atividades de lazer.','Meu trabalho atrapalha minha convivência com família e amigos.','Sinto culpa quando não estou trabalhando.','Deixo de cuidar da saúde (consultas, exercícios, alimentação) por falta de tempo.','Tiro poucos dias de folga ou férias.','Sinto que minha vida se resume ao trabalho.'],
  tips:['Definir limites concretos: horário para encerrar o expediente e silenciar notificações.','Agendar o lazer com a mesma prioridade dos compromissos de trabalho.','Revisar o que é realmente urgente e o que pode esperar.']});

/* ========== 6. Transtornos de personalidade (traços) ========== */
const PER = {cats:['per'], scale:'agree', icon:'puzzle', noFeedback:true};
A('p_borderline', {...PER, t:'Rastreio de Traços de Personalidade Borderline', topics:['Transtorno de personalidade borderline (TPB)'], theme:'de personalidade borderline',
  edu:'A personalidade borderline se caracteriza por instabilidade nas emoções, nos relacionamentos e na autoimagem, além de impulsividade e intenso medo de abandono. Tratamentos como a Terapia Comportamental Dialética (DBT) têm boa eficácia.',
  items:['Faço grandes esforços para evitar ser abandonado(a).','Meus relacionamentos costumam ser intensos e instáveis, entre idealizar e desvalorizar as pessoas.','Minha imagem de quem eu sou muda muito.','Ajo por impulso de formas que me prejudicam (gastos, comida, sexo, substâncias, direção).','Já me machuquei de propósito ou ameacei fazer isso em momentos de crise.','Minhas emoções mudam de forma muito rápida e intensa.','Sinto um vazio por dentro com frequência.','Tenho raiva intensa e dificuldade de controlá-la.','Em momentos de estresse, fico desconfiado(a) ou me sinto desconectado(a) da realidade.'],
  flag:[{i:4, min:3, risk:true, pro:'Concordância com o item 5 (autolesão ou ameaças em crises). Investigar comportamento autolesivo e risco de suicídio.'}],
  tips:['A DBT ensina habilidades de regulação emocional, tolerância ao mal-estar e efetividade nas relações.','Observar os gatilhos das crises emocionais.','Construir com o(a) profissional um plano para momentos de crise.']});

A('p_narcisista', {...PER, t:'Rastreio de Traços de Personalidade Narcisista', topics:['Transtorno de personalidade narcisista'], theme:'de personalidade narcisista',
  edu:'Traços narcisistas envolvem necessidade intensa de admiração, sensação de ser especial e dificuldade de empatia. Por trás da aparência de confiança, muitas vezes existe uma autoestima frágil e muito sensível a críticas.',
  items:['Sinto que sou mais especial ou talentoso(a) do que a maioria das pessoas.','Preciso muito de admiração e reconhecimento.','Fico muito irritado(a) ou magoado(a) quando sou criticado(a).','Acho que mereço tratamento diferenciado.','Tenho dificuldade de me colocar no lugar dos outros.','Às vezes uso as pessoas para alcançar meus objetivos.','Sinto inveja dos outros ou acho que os outros me invejam.','Fantasio com sucesso, poder ou reconhecimento ilimitados.'],
  tips:['Explorar na terapia a relação entre autoestima e necessidade de validação.','Praticar a escuta ativa nas relações.','Observar as reações emocionais diante de críticas.']});

A('p_dependente', {...PER, t:'Rastreio de Traços de Personalidade Dependente', topics:['Transtorno de personalidade dependente'], theme:'de personalidade dependente',
  edu:'Traços de personalidade dependente envolvem uma necessidade excessiva de ser cuidado(a), dificuldade de tomar decisões sozinho(a) e medo de discordar para não perder o apoio das pessoas.',
  items:['Tenho dificuldade de tomar decisões do dia a dia sem conselhos de outras pessoas.','Preciso que outras pessoas assumam responsabilidades importantes da minha vida.','Evito discordar das pessoas por medo de perder seu apoio.','Tenho dificuldade de começar projetos por conta própria.','Faço coisas desagradáveis para receber cuidado e apoio.','Me sinto desconfortável ou desamparado(a) quando estou sozinho(a).','Quando um relacionamento termina, procuro logo outro para me apoiar.','Tenho medo de ter que cuidar de mim mesmo(a).'],
  tips:['Praticar pequenas decisões de forma autônoma.','Fortalecer a confiança nas próprias capacidades.','Treinar a expressão de opiniões e discordâncias de forma assertiva.']});

A('p_evitativa', {...PER, t:'Rastreio de Traços de Personalidade Evitativa', topics:['Transtorno de personalidade evitativa'], theme:'de personalidade evitativa',
  edu:'Traços evitativos envolvem inibição social, sentimento de inadequação e grande sensibilidade a críticas. A pessoa deseja se relacionar, mas evita por medo de rejeição.',
  items:['Evito atividades que envolvam contato com pessoas por medo de críticas ou rejeição.','Só me envolvo com pessoas quando tenho certeza de que vou ser aceito(a).','Me contenho nas relações íntimas por medo de ser ridicularizado(a).','Fico preocupado(a) em ser criticado(a) ou rejeitado(a) em situações sociais.','Me sinto inferior ou inadequado(a) perto dos outros.','Evito novas experiências por medo de passar vergonha.','Me vejo como socialmente desajeitado(a) ou pouco interessante.','Desejo me aproximar das pessoas, mas o medo me impede.'],
  tips:['Exposição gradual a situações sociais significativas.','Trabalhar crenças de inadequação e de rejeição.','Valorizar pequenas conquistas sociais.']});

A('p_antissocial', {...PER, t:'Rastreio de Traços de Personalidade Antissocial', topics:['Transtorno de personalidade antissocial'], theme:'de personalidade antissocial',
  edu:'Traços antissociais envolvem desrespeito a regras e aos direitos dos outros, impulsividade, irresponsabilidade e pouca culpa. Este rastreio é mais útil como apoio à entrevista clínica do que como autoavaliação isolada.',
  items:['Já me envolvi em situações em que desrespeitei leis ou regras importantes.','Já menti ou enganei pessoas para obter vantagens.','Costumo agir por impulso, sem planejar.','Me envolvo em brigas ou agressões com frequência.','Coloco em risco a minha segurança ou a dos outros.','Tenho dificuldade de manter compromissos de trabalho ou financeiros.','Sinto pouca culpa quando prejudico alguém.','Esses comportamentos começaram antes dos 15 anos.'],
  tips:['Explorar na terapia as consequências dos comportamentos impulsivos.','Desenvolver estratégias de pausa antes de agir.','Identificar valores pessoais e metas de vida.']});

A('p_obsessiva', {...PER, t:'Rastreio de Traços de Personalidade Obsessivo-Compulsiva', topics:['Traços de personalidade obsessivo-compulsiva'], theme:'de personalidade obsessivo-compulsiva',
  edu:'Traços de personalidade obsessivo-compulsiva envolvem perfeccionismo, rigidez, necessidade de controle e excesso de dedicação ao trabalho. São diferentes do TOC: aqui não há obsessões e rituais, e sim um estilo de funcionamento rígido.',
  items:['Me preocupo tanto com detalhes, regras e listas que perco o objetivo principal.','Meu perfeccionismo atrapalha a conclusão das tarefas.','Dedico tanto tempo ao trabalho que deixo de lado o lazer e as amizades.','Sou muito rígido(a) com questões de moral, ética ou valores.','Tenho dificuldade de descartar objetos, mesmo sem valor.','Tenho dificuldade de delegar tarefas, a menos que façam exatamente do meu jeito.','Sou muito controlado(a) com gastos, mesmo sem necessidade.','As pessoas dizem que sou teimoso(a) ou inflexível.'],
  tips:['Praticar o "bom o suficiente" em tarefas de baixo risco.','Agendar o lazer como um compromisso.','Treinar a flexibilidade, aceitando outras formas de fazer.']});

A('p_instabilidade', {t:'Rastreio de Instabilidade Emocional', cats:['per'], icon:'puzzle', topics:['Instabilidade emocional'], theme:'de instabilidade emocional',
  edu:'A instabilidade emocional é a tendência a sentir emoções muito intensas, que mudam rapidamente e demoram a se acalmar. Não é um diagnóstico em si, mas aparece em diferentes quadros e pode ser trabalhada com estratégias de regulação.',
  items:['Sinto emoções com muito mais intensidade do que as outras pessoas.','Minhas emoções mudam de uma hora para outra.','Demoro muito para me acalmar depois de ficar chateado(a).','Reajo de forma exagerada a pequenas frustrações.','Tenho crises de choro ou de raiva difíceis de controlar.','Me arrependo de coisas que fiz ou disse no calor da emoção.','Sinto que minhas emoções me dominam.','Minhas emoções intensas afetam minhas relações.'],
  tips:['Praticar identificar e nomear as emoções no momento em que surgem.','Usar técnicas de tolerância ao mal-estar, como água fria no rosto e respiração lenta.','Cuidar do sono, da alimentação e da atividade física, que estabilizam as emoções.']});

A('p_abandono', {t:'Rastreio de Medo de Abandono', cats:['per','rel'], icon:'heart', topics:['Medo de abandono'], theme:'de medo de abandono',
  edu:'O medo de abandono é uma preocupação intensa de ser deixado(a) pelas pessoas importantes. Costuma ter raízes em experiências precoces de perda ou instabilidade e pode levar a ciúme, controle ou dificuldade de se vincular.',
  items:['Tenho medo constante de que as pessoas que amo me deixem.','Fico muito ansioso(a) quando alguém demora a responder minhas mensagens.','Interpreto pequenas atitudes como sinais de que serei abandonado(a).','Faço de tudo para agradar e não ser deixado(a).','Tenho dificuldade de ficar sozinho(a).','Me afasto antes que a outra pessoa possa me abandonar.','Preciso de confirmações frequentes de que sou amado(a).','O fim de uma relação me desestrutura profundamente.'],
  tips:['Identificar a história por trás do medo de abandono.','Diferenciar fatos de interpretações em momentos de insegurança.','Desenvolver fontes de segurança interna e de autocuidado.']});

/* ========== 7. Neurodesenvolvimento ========== */
A('n_tdah_adulto', {t:'Rastreio de TDAH em Adultos', cats:['neu'], icon:'focus', topics:['TDAH em adultos'], theme:'de TDAH no adulto',
  edu:'O TDAH é uma condição do neurodesenvolvimento que começa na infância e pode seguir na vida adulta. No adulto, costuma aparecer como desatenção, desorganização, esquecimentos, procrastinação, inquietação interna e impulsividade, com prejuízo no trabalho, nos estudos e nas relações. Para a hipótese, os sinais precisam estar presentes desde antes dos 12 anos.',
  period:'Pensando nos últimos 6 meses, com que frequência isto acontece com você?',
  items:['Cometo erros por falta de atenção a detalhes no trabalho, nos estudos ou nas tarefas do dia a dia.','Tenho dificuldade de manter a atenção em leituras longas, reuniões ou conversas.','Parece que não estou escutando quando falam diretamente comigo.','Começo tarefas e perco o foco antes de terminar.','Tenho dificuldade de organizar tarefas, prazos e materiais.','Evito ou adio tarefas que exigem esforço mental prolongado.','Perco objetos importantes, como chaves, carteira, celular ou documentos.','Me distraio facilmente com estímulos ou pensamentos sem relação com o que estou fazendo.','Esqueço compromissos, contas ou obrigações do dia a dia.','Sinto inquietação ou dificuldade de ficar parado(a) por muito tempo.','Falo demais, interrompo as pessoas ou respondo antes de terminarem a pergunta.','Tenho dificuldade de esperar minha vez, em filas ou em conversas.'],
  tips:['Investigar com o paciente se as dificuldades já existiam antes dos 12 anos, um critério essencial para a hipótese.','Usar apoios externos: agenda, alarmes, listas e divisão de tarefas em etapas pequenas.','Avaliar sono, ansiedade e humor, que também afetam a atenção.']});
P.scales.n_tdah_adulto.dims = [{name:'Desatenção', items:[0,1,2,3,4,5,6,7,8]},{name:'Hiperatividade e impulsividade', items:[9,10,11]}];

A('n_tea_adulto', {t:'Rastreio de Traços do Espectro Autista (Adultos)', cats:['neu'], icon:'focus', scale:'agree', topics:['Autismo (TEA)'], theme:'do espectro autista',
  edu:'O Transtorno do Espectro Autista (TEA) envolve diferenças na comunicação e na interação social e padrões restritos ou repetitivos de comportamento e interesses, incluindo sensibilidade sensorial. Muitos adultos, especialmente mulheres, recebem o diagnóstico tardiamente.',
  items:['Tenho dificuldade de entender o que as pessoas querem dizer quando não falam diretamente.','Prefiro rotinas e fico muito incomodado(a) com mudanças inesperadas.','Tenho interesses muito intensos e específicos.','Sons, luzes, cheiros ou texturas me incomodam mais do que às outras pessoas.','Acho cansativo socializar, mesmo com pessoas de quem gosto.','Tenho dificuldade de saber o que dizer ou quando falar em uma conversa.','Costumo imitar ou ensaiar comportamentos sociais para me encaixar.','Faço movimentos repetitivos (balançar, mexer as mãos) para me acalmar.','Tenho dificuldade de perceber o que os outros sentem pela expressão do rosto.','Prefiro atividades solitárias a atividades em grupo.'],
  tips:['Uma avaliação especializada considera a história desde a infância.','Mapear necessidades sensoriais e adaptações possíveis no dia a dia.','Valorizar as próprias formas de funcionar, reduzindo a camuflagem quando possível.']});

A('n_tea_infantil', {t:'Rastreio de Sinais do Espectro Autista (Crianças)', cats:['neu'], icon:'focus', topics:['Autismo (TEA)'], theme:'do espectro autista', resp:'Pais ou responsáveis pela criança',
  edu:'Na infância, sinais do espectro autista podem aparecer como pouco contato visual, atraso ou diferenças na fala, pouco interesse em brincar com outras crianças e comportamentos repetitivos. Quanto mais cedo a avaliação e a estimulação, melhores os resultados.',
  period:'Pensando na criança, com que frequência isto acontece?',
  items:['A criança evita ou faz pouco contato visual.','Ela não responde quando é chamada pelo nome.','Ela não aponta para mostrar coisas que chamam sua atenção.','Ela prefere brincar sozinha a brincar com outras crianças.','Ela tem atraso na fala ou repete frases fora de contexto.','Ela faz movimentos repetitivos, como balançar o corpo, girar ou bater as mãos.','Ela fica muito agitada com mudanças na rotina.','Ela tem reações intensas a sons, texturas ou alimentos.','Ela se interessa por partes de objetos (como rodinhas) mais do que pelo brinquedo todo.','Ela tem dificuldade de brincar de faz de conta.'],
  tips:['Procurar avaliação com pediatra, neuropediatra ou equipe multiprofissional.','A estimulação precoce faz diferença no desenvolvimento.','Observar e registrar os comportamentos para levar à consulta.']});

A('n_atencao', {t:'Rastreio de Dificuldades de Atenção e Concentração', cats:['neu'], icon:'focus', topics:['Dificuldades de atenção e concentração'], theme:'de dificuldade de atenção',
  edu:'Dificuldades de atenção podem ter muitas causas: TDAH, ansiedade, depressão, privação de sono, estresse e excesso de estímulos digitais. Entender o padrão ajuda a encontrar a causa e as estratégias mais adequadas.',
  items:['Me distraio facilmente com barulhos ou movimentos ao redor.','Tenho dificuldade de manter o foco em leituras ou conversas longas.','Começo várias tarefas e não termino.','Perco objetos como chaves, celular ou documentos.','Esqueço o que ia fazer no meio da tarefa.','Cometo erros por descuido em tarefas simples.','Minha mente "viaja" mesmo quando preciso prestar atenção.','Tenho dificuldade de seguir instruções com várias etapas.'],
  tips:['Trabalhar em blocos curtos de foco (como 25 minutos) com pausas.','Reduzir notificações e distrações do ambiente.','Investigar sono, ansiedade e humor, que afetam a atenção.']});

A('n_impulsividade', {t:'Rastreio de Impulsividade', cats:['neu'], icon:'focus', topics:['Impulsividade'], theme:'de impulsividade',
  edu:'Impulsividade é agir antes de pensar nas consequências. Pode aparecer na fala, nas compras, na alimentação, no trânsito ou nas relações. Está presente no TDAH, em alguns transtornos de personalidade e em quadros de humor.',
  items:['Faço ou digo coisas sem pensar e depois me arrependo.','Interrompo as pessoas ou respondo antes de terminarem a pergunta.','Tenho dificuldade de esperar minha vez.','Faço compras por impulso.','Tomo decisões importantes de forma precipitada.','Tenho dificuldade de resistir a tentações, mesmo sabendo que vão me prejudicar.','Mudo de planos de repente.','Me envolvo em situações de risco pela emoção do momento.'],
  tips:['Criar uma pausa entre o impulso e a ação (por exemplo, esperar 24 horas antes de compras).','Identificar as situações de maior risco.','Treinar estratégias de autocontrole na terapia.']});

A('n_hiperatividade', {t:'Rastreio de Hiperatividade e Inquietação', cats:['neu'], icon:'focus', topics:['Hiperatividade'], theme:'de hiperatividade e inquietação',
  edu:'Na vida adulta, a hiperatividade costuma aparecer mais como inquietação interna do que como correr ou pular. A pessoa sente dificuldade de relaxar, fala muito e está sempre ocupada.',
  items:['Sinto uma inquietação interna, como se não conseguisse parar.','Tenho dificuldade de ficar sentado(a) por muito tempo.','Mexo as mãos ou os pés constantemente.','Falo mais do que as outras pessoas.','Tenho dificuldade de fazer atividades tranquilas ou de lazer calmo.','Preciso estar sempre ocupado(a) com alguma coisa.','Me sinto acelerado(a) por dentro.','Tenho dificuldade de relaxar, mesmo quando tenho tempo livre.'],
  tips:['Atividade física regular ajuda a canalizar a energia.','Incluir pausas de movimento durante o trabalho.','Práticas de atenção plena em períodos curtos.']});

A('n_executivas', {t:'Rastreio de Funções Executivas', cats:['neu'], icon:'focus', topics:['Funções executivas'], theme:'de dificuldade nas funções executivas',
  edu:'Funções executivas são as habilidades que nos permitem planejar, organizar, iniciar tarefas, administrar o tempo, controlar impulsos e mudar de estratégia. Dificuldades nessa área aparecem no TDAH, mas também no estresse, na depressão e em outras condições.',
  items:['Tenho dificuldade de planejar as etapas de uma tarefa.','Adio tarefas importantes até o último minuto.','Subestimo quanto tempo as coisas vão levar.','Tenho dificuldade de organizar meus papéis, arquivos ou ambientes.','Tenho dificuldade de começar tarefas, mesmo sabendo que são importantes.','Esqueço prazos e compromissos.','Tenho dificuldade de mudar de estratégia quando algo não funciona.','Me perco quando preciso fazer várias coisas ao mesmo tempo.'],
  tips:['Usar apoios externos: agenda, alarmes, listas e quadros visuais.','Dividir tarefas grandes em passos pequenos e concretos.','Definir horários fixos para tarefas recorrentes.']});

A('n_social', {t:'Rastreio de Dificuldades de Interação Social', cats:['neu'], icon:'focus', topics:['Dificuldades de interação social'], theme:'de dificuldade de interação social',
  edu:'Dificuldades de interação social podem estar ligadas a timidez, ansiedade social, traços do espectro autista ou falta de oportunidades de convivência. Entender a origem ajuda a escolher o melhor caminho de cuidado.',
  items:['Tenho dificuldade de iniciar conversas.','Não sei como manter uma conversa por muito tempo.','Tenho dificuldade de fazer e manter amizades.','Fico em dúvida sobre como agir em situações sociais.','As pessoas me acham distante ou frio(a), mesmo sem eu querer.','Tenho dificuldade de entender piadas, ironias ou indiretas.','Me sinto deslocado(a) em grupos.','Socializar me deixa muito cansado(a).'],
  tips:['Treinar habilidades sociais em situações seguras.','Buscar grupos com interesses em comum.','Investigar se ansiedade ou traços do espectro autista estão envolvidos.']});

/* ========== 8. Relacionamentos e funcionamento emocional ========== */
const REL = {cats:['rel'], icon:'heart'};
A('r_dependencia', {...REL, t:'Rastreio de Dependência Emocional', topics:['Dependência emocional'], theme:'de dependência emocional',
  edu:'Na dependência emocional, a pessoa coloca o outro no centro da vida e sente que não consegue ficar bem sem ele. Isso leva a abrir mão das próprias necessidades e a permanecer em relações que causam sofrimento.',
  items:['Sinto que não consigo viver sem a pessoa com quem me relaciono.','Abro mão das minhas vontades para agradar o(a) parceiro(a).','Meu humor depende de como a outra pessoa me trata.','Tenho muito medo de terminar o relacionamento, mesmo quando ele me faz mal.','Me afastei de amigos e de atividades por causa do relacionamento.','Preciso de contato frequente com a pessoa para me sentir bem.','Aceito situações que me magoam para não perder a pessoa.','Sinto um vazio enorme quando estou longe dela.'],
  tips:['Fortalecer a própria identidade: interesses, amizades e projetos próprios.','Observar padrões que se repetem em diferentes relacionamentos.','Trabalhar autoestima e autonomia emocional na terapia.']});

A('r_ciume', {...REL, t:'Rastreio de Ciúme Excessivo', topics:['Ciúme excessivo'], theme:'de ciúme excessivo',
  edu:'O ciúme se torna excessivo quando é frequente, intenso e desproporcional, levando a controle, desconfiança e brigas. Costuma refletir insegurança e medo de perda, e pode tornar a relação abusiva.',
  items:['Sinto ciúme mesmo sem motivos concretos.','Verifico o celular ou as redes sociais do(a) parceiro(a).','Fico imaginando que ele(a) está me traindo.','Fico incomodado(a) quando ele(a) sai sem mim.','Peço explicações detalhadas sobre onde e com quem ele(a) estava.','Brigamos com frequência por causa do meu ciúme.','Tento controlar com quem ele(a) conversa ou como se veste.','O ciúme me causa muito sofrimento.'],
  tips:['Diferenciar fatos de suposições quando o ciúme aparecer.','Adiar a checagem e perceber que a ansiedade diminui sozinha.','Trabalhar a insegurança de base na terapia.']});

A('r_rejeicao', {...REL, t:'Rastreio de Medo de Rejeição', topics:['Medo de rejeição'], theme:'de medo de rejeição',
  edu:'O medo de rejeição faz a pessoa evitar exposição, esconder opiniões e buscar aprovação constante. Pequenos sinais de desinteresse podem ser vividos como uma dor intensa.',
  items:['Evito expressar minha opinião por medo de não ser aceito(a).','Fico muito magoado(a) com pequenas críticas.','Faço de tudo para agradar as pessoas.','Tenho dificuldade de pedir o que preciso.','Evito me aproximar de pessoas novas por medo de não ser correspondido(a).','Interpreto silêncios ou demoras como rejeição.','Penso muito no que os outros acham de mim.','Desisto de oportunidades por medo de receber um "não".'],
  tips:['Treinar pequenos pedidos e exposições, aceitando a possibilidade de um "não".','Separar o valor pessoal da aprovação dos outros.','Explorar na terapia experiências antigas de rejeição.']});

A('r_autoestima', {...REL, t:'Rastreio de Autoestima', topics:['Baixa autoestima'], theme:'de baixa autoestima',
  edu:'A autoestima é a forma como avaliamos o próprio valor. A baixa autoestima aparece como autocrítica intensa, comparação constante e a sensação de não ser bom(boa) o suficiente, afetando escolhas, relações e saúde emocional.',
  items:['Sinto que não sou bom(boa) o suficiente.','Me critico de forma dura quando erro.','Me comparo com outras pessoas e me sinto inferior.','Tenho dificuldade de reconhecer minhas qualidades.','Acho que os outros são mais capazes do que eu.','Tenho dificuldade de aceitar elogios.','Não gosto da minha aparência.','Sinto que não mereço coisas boas.'],
  tips:['Registrar diariamente três coisas que você fez bem.','Tratar a si mesmo(a) como trataria um(a) amigo(a) querido(a).','Reduzir a exposição a redes sociais que alimentam comparações.']});

A('r_inseguranca', {...REL, t:'Rastreio de Insegurança Emocional', topics:['Insegurança emocional'], theme:'de insegurança emocional',
  edu:'A insegurança emocional é a sensação constante de não estar seguro(a) nas relações e nas próprias decisões. Leva à busca de garantias, a dúvidas frequentes e à dificuldade de confiar em si e nos outros.',
  items:['Duvido das minhas decisões, mesmo depois de tomá-las.','Preciso que os outros confirmem que estou fazendo a coisa certa.','Tenho dificuldade de confiar nas pessoas.','Me sinto ameaçado(a) por pessoas que considero melhores que eu.','Fico ansioso(a) quando não sei o que os outros pensam de mim.','Tenho medo de ser deixado(a) de lado.','Me sinto inseguro(a) sobre meu valor nas relações.','Evito arriscar por medo de errar.'],
  tips:['Praticar pequenas decisões sem buscar aprovação.','Identificar evidências reais de segurança nas relações.','Fortalecer a autoconfiança com metas alcançáveis.']});

A('r_limites', {...REL, t:'Rastreio de Dificuldade de Estabelecer Limites', topics:['Dificuldade de estabelecer limites'], theme:'de dificuldade de estabelecer limites',
  edu:'Limites são a forma de comunicar o que aceitamos ou não nas relações. Quem tem dificuldade de estabelecê-los costuma se sobrecarregar, acumular raiva e ter a sensação de ser usado(a).',
  items:['Tenho dificuldade de dizer "não".','Aceito fazer coisas que não quero para evitar conflitos.','Me sinto culpado(a) quando coloco minhas necessidades em primeiro lugar.','As pessoas costumam abusar da minha boa vontade.','Assumo responsabilidades que não são minhas.','Guardo a irritação em vez de falar o que me incomoda.','Sinto que estou sempre disponível para todos.','Tenho medo de que as pessoas se afastem se eu impuser limites.'],
  tips:['Treinar respostas simples, como "hoje não consigo".','Lembrar que limites protegem as relações, não as destroem.','Começar com limites pequenos, em relações mais seguras.']});

A('r_regulacao', {...REL, t:'Rastreio de Regulação Emocional', topics:['Dificuldade de regulação emocional'], theme:'de dificuldade de regulação emocional',
  edu:'Regulação emocional é a capacidade de reconhecer, aceitar e modular as emoções de forma saudável. Dificuldades nessa área aparecem como explosões, evitação de sentimentos, comportamentos impulsivos ou sensação de estar à mercê das emoções.',
  items:['Tenho dificuldade de identificar o que estou sentindo.','Quando fico chateado(a), demoro muito para me acalmar.','Perco o controle do meu comportamento quando estou com raiva.','Uso comida, álcool, compras ou celular para fugir das emoções.','Sinto vergonha ou culpa por sentir certas emoções.','Quando estou mal, acho que nada vai me fazer sentir melhor.','Evito pensar nos meus sentimentos.','Minhas emoções me impedem de fazer o que preciso.'],
  tips:['Nomear a emoção ("estou com raiva") já reduz sua intensidade.','Ter uma lista de estratégias saudáveis de autorregulação.','Praticar a aceitação das emoções, sem julgá-las.']});

A('r_comunicacao', {...REL, t:'Rastreio de Comunicação nos Relacionamentos', topics:['Comunicação nos relacionamentos'], theme:'de dificuldade de comunicação no relacionamento',
  edu:'A comunicação é a base dos relacionamentos. Padrões como crítica, defensividade, desprezo e silêncio punitivo estão entre os maiores fatores de desgaste nas relações amorosas.',
  items:['Nossas conversas acabam virando discussões.','Sinto que não sou ouvido(a) pelo(a) parceiro(a).','Evito falar sobre o que me incomoda para não brigar.','Usamos críticas ou ironias quando discordamos.','Um de nós se fecha e para de falar durante os conflitos.','Temos dificuldade de resolver problemas juntos.','Sinto que não consigo expressar meus sentimentos.','Os mesmos conflitos se repetem sem solução.'],
  tips:['Falar a partir de si: "Eu me sinto... quando..." em vez de acusações.','Fazer pausas combinadas quando a conversa esquentar.','Reservar momentos para conversar sobre a relação com calma.']});

A('r_abusivo', {...REL, t:'Rastreio de Relacionamento Abusivo', topics:['Relacionamentos abusivos'], theme:'de relacionamento abusivo', safety:'violence', safetyMin:1, noFeedback:true,
  edu:'Um relacionamento abusivo é marcado por controle, manipulação, ciúme possessivo, humilhações e, às vezes, violência. É comum que o abuso alterne com fases de carinho, o que torna mais difícil reconhecê-lo e sair dele.',
  items:['Meu(minha) parceiro(a) controla onde vou e com quem falo.','Ele(a) tem ciúme excessivo e me acusa sem motivo.','Sinto medo ou tensão perto dele(a).','Ele(a) me culpa pelas próprias reações agressivas.','Depois das brigas, ele(a) pede desculpas e promete mudar, mas tudo se repete.','Ele(a) me desvaloriza na frente de outras pessoas.','Deixei de fazer coisas de que gosto para evitar conflitos com ele(a).','Já pensei em terminar, mas tenho medo da reação dele(a).'],
  levels:[
    {max:4, label:'Poucos sinais', tone:0, text:'Foram relatados poucos sinais de relacionamento abusivo nas situações investigadas.', care:['Se algo mudar, você pode retomar esse assunto a qualquer momento nas sessões.']},
    {max:12, label:'Alguns sinais', tone:2, text:'Foram relatados alguns sinais de controle ou abuso no relacionamento. Eles merecem atenção, porque costumam se intensificar com o tempo.', care:['Conversar com pessoas de confiança sobre o que está vivendo.','Observar e registrar as situações.','Construir com o(a) profissional um plano de segurança.']},
    {max:32, label:'Vários sinais', tone:3, text:'Foram relatados vários sinais de relacionamento abusivo. Sua segurança vem em primeiro lugar.', care:['Construir com o(a) profissional um plano de segurança.','Ligue 180 para orientação ou 190 em caso de emergência.']}
  ],
  tips:[]});

A('r_codependencia', {...REL, t:'Rastreio de Codependência Afetiva', topics:['Codependência afetiva'], theme:'de codependência afetiva',
  edu:'A codependência é um padrão em que a pessoa se dedica excessivamente a cuidar, controlar ou "salvar" o outro, muitas vezes alguém com dependência química ou dificuldades emocionais, deixando de lado as próprias necessidades.',
  items:['Sinto que é minha responsabilidade resolver os problemas das pessoas próximas.','Minha vida gira em torno das necessidades de outra pessoa.','Encubro ou justifico comportamentos problemáticos de alguém próximo.','Me sinto útil apenas quando estou cuidando de alguém.','Tento controlar o comportamento da outra pessoa para evitar problemas.','Esqueço das minhas próprias necessidades.','Sinto raiva ou ressentimento por cuidar tanto e receber pouco.','Tenho dificuldade de me afastar mesmo quando a relação me faz mal.'],
  tips:['Diferenciar ajudar de assumir a responsabilidade pelo outro.','Grupos de apoio para familiares, como Al-Anon e Nar-Anon, podem ajudar.','Recuperar espaços e atividades só seus.']});

/* ========== 9. Outros transtornos e condições ========== */
A('o_toc', {t:'Rastreio de Sintomas Obsessivo-Compulsivos (TOC)', cats:['out'], icon:'leaf', topics:['Transtorno obsessivo-compulsivo (TOC)'], theme:'obsessivo-compulsivos',
  edu:'O TOC envolve obsessões (pensamentos, imagens ou impulsos indesejados que causam ansiedade) e compulsões (comportamentos ou atos mentais repetidos para aliviar essa ansiedade). Pode ocupar horas do dia e gerar grande sofrimento.',
  items:['Tenho pensamentos indesejados que invadem minha mente e me causam angústia.','Lavo as mãos ou limpo coisas mais do que o necessário.','Verifico várias vezes portas, fogão, janelas ou aparelhos.','Preciso que as coisas estejam em uma ordem ou simetria exata.','Conto, repito palavras ou rezo mentalmente para afastar pensamentos ruins.','Tenho medo de causar mal a alguém sem querer.','Sinto que, se não fizer certos rituais, algo ruim vai acontecer.','Esses pensamentos ou rituais ocupam mais de uma hora do meu dia.'],
  tips:['A Terapia Cognitivo-Comportamental com Exposição e Prevenção de Resposta é o tratamento de referência.','Entender que pensamentos intrusivos não significam desejo de agir.','Avaliar com o(a) profissional a necessidade de acompanhamento psiquiátrico.']});

A('o_compulsao', {t:'Rastreio de Compulsão Alimentar', cats:['out'], icon:'leaf', topics:['Compulsão alimentar'], theme:'de compulsão alimentar',
  edu:'Na compulsão alimentar, a pessoa come uma grande quantidade de comida em pouco tempo, com sensação de perda de controle, seguida de culpa ou vergonha. Costuma estar ligada a emoções difíceis e a dietas muito restritivas.',
  items:['Como grandes quantidades de comida em pouco tempo.','Sinto que perco o controle quando começo a comer.','Como mesmo sem fome.','Como até me sentir desconfortavelmente cheio(a).','Como escondido(a) por vergonha da quantidade.','Me sinto culpado(a) ou com nojo de mim depois de comer.','Uso a comida para lidar com tristeza, ansiedade ou tédio.','Faço dietas restritivas que acabam em episódios de exagero.'],
  tips:['Evitar longos períodos sem comer, que favorecem os episódios.','Observar as emoções que antecedem a compulsão.','Acompanhamento com psicólogo(a) e nutricionista, com abordagem não restritiva.']});

A('o_sono', {t:'Rastreio de Insônia e Qualidade do Sono', cats:['out'], icon:'moon', topics:['Insônia e alterações do sono'], theme:'de alterações do sono',
  edu:'A insônia é a dificuldade de iniciar ou manter o sono, ou de ter um sono reparador, mesmo com oportunidade de dormir. Quando persiste por mais de três meses, é considerada crônica e afeta o humor, a memória e a saúde.',
  period:'No último mês, com que frequência isto acontece com você?',
  items:['Demoro mais de 30 minutos para pegar no sono.','Acordo durante a noite e tenho dificuldade de voltar a dormir.','Acordo muito cedo e não consigo dormir de novo.','Acordo cansado(a), como se não tivesse descansado.','Fico preocupado(a) com o sono ou com medo de não conseguir dormir.','Sinto sonolência durante o dia.','Uso o celular ou a TV na cama antes de dormir.','A falta de sono afeta meu humor, minha memória ou meu trabalho.'],
  tips:['Manter horários regulares para dormir e acordar, inclusive nos fins de semana.','Evitar telas, cafeína e álcool nas horas antes de dormir.','A TCC para insônia (TCC-I) é o tratamento de primeira escolha para a insônia crônica.']});

A('o_alcool', {t:'Rastreio de Uso de Álcool', cats:['out'], icon:'cup', topics:['Uso abusivo de álcool'], theme:'de uso problemático de álcool',
  edu:'O uso de álcool se torna problemático quando a pessoa perde o controle sobre o quanto bebe, quando a bebida traz prejuízos à saúde, ao trabalho ou às relações, ou quando surgem tolerância e sintomas de abstinência. Quanto mais critérios presentes, maior a gravidade. Uma dose equivale a uma lata de cerveja, uma taça de vinho ou uma dose de destilado.',
  period:'Pensando nos últimos 12 meses, com que frequência isto acontece com você?',
  items:['Bebo mais, ou por mais tempo, do que pretendia.','Já tentei diminuir ou parar de beber e não consegui.','Passo muito tempo bebendo ou me recuperando dos efeitos da bebida.','Sinto uma vontade forte de beber.','A bebida já atrapalhou meu trabalho, meus estudos ou minhas responsabilidades em casa.','Continuo bebendo mesmo quando isso causa conflitos com pessoas próximas.','Deixei de lado atividades importantes ou prazerosas por causa da bebida.','Bebo em situações de risco, como antes de dirigir.','Preciso beber mais do que antes para sentir o mesmo efeito.','Sinto tremores, suor, enjoo, ansiedade ou insônia quando fico sem beber.'],
  flag:[{i:9, min:2, pro:'Possíveis sintomas de abstinência (item 10). A interrupção abrupta do uso pesado pode trazer riscos clínicos: indicar avaliação médica antes de qualquer redução brusca.'},{i:7, min:2, pro:'Uso de álcool em situações de risco, como ao dirigir (item 8). Abordar segurança com o paciente.'}],
  tips:['Registrar quantas doses bebe por semana e em quais situações.','Definir dias sem álcool e um limite de doses por ocasião.','Conhecer o CAPS AD da cidade e grupos de apoio, como os Alcoólicos Anônimos.']});

A('o_alimentar', {t:'Rastreio de Anorexia e Bulimia', cats:['out'], icon:'leaf', topics:['Transtornos alimentares','Anorexia e bulimia'], theme:'de transtorno alimentar',
  edu:'A anorexia envolve restrição alimentar intensa, medo de ganhar peso e distorção da imagem corporal. A bulimia envolve episódios de comer em excesso seguidos de comportamentos para compensar, como vômitos, laxantes ou exercício excessivo. Os dois quadros trazem riscos sérios à saúde física e precisam de cuidado multiprofissional.',
  period:'Pensando nos últimos 3 meses, com que frequência isto acontece com você?',
  items:['Tenho muito medo de ganhar peso, mesmo estando com o peso adequado ou abaixo.','Restrinjo muito a comida ou fico longos períodos sem comer para controlar o peso.','A forma como me vejo depende muito do meu peso ou da forma do meu corpo.','Me vejo acima do peso, mesmo quando outras pessoas dizem que estou magro(a).','Provoco vômito depois de comer.','Uso laxantes, diuréticos ou remédios para emagrecer.','Faço exercícios em excesso para compensar o que comi.','Tenho episódios em que como muito e depois tento compensar de alguma forma.','Evito comer na frente de outras pessoas.','Perdi muito peso em pouco tempo, ou minha menstruação parou.'],
  flag:[{i:4, min:1, pro:'Vômito autoinduzido relatado (item 5). Risco clínico, como alterações de eletrólitos: indicar avaliação médica.'},{i:5, min:1, pro:'Uso de laxantes, diuréticos ou remédios para emagrecer (item 6). Indicar avaliação médica.'},{i:9, min:2, pro:'Perda de peso importante ou interrupção da menstruação (item 10). Indicar avaliação médica com prioridade.'}],
  tips:['Evitar dietas restritivas e longos períodos sem comer.','Não se pesar várias vezes ao dia nem checar o corpo no espelho com frequência.','O tratamento envolve equipe multiprofissional: psicologia, psiquiatria, nutrição e clínica médica.']});

A('o_luto', {t:'Rastreio de Luto e Luto Prolongado', cats:['out','tra'], icon:'leaf', topics:['Luto e luto prolongado'], theme:'de luto prolongado',
  edu:'O luto é a resposta natural à perda e não tem um tempo certo. O luto prolongado acontece quando, após 12 meses ou mais, a saudade e a dor continuam tão intensas que impedem a pessoa de retomar a vida.',
  period:'Pensando na perda de alguém importante, com que frequência isto acontece com você?',
  items:['Sinto uma saudade intensa e dolorosa da pessoa.','Penso na pessoa ou na perda durante grande parte do dia.','Tenho dificuldade de aceitar que a perda aconteceu.','Sinto que perdi uma parte de mim.','Evito coisas que me lembrem que a pessoa morreu.','Sinto amargura ou raiva pela perda.','Tenho dificuldade de retomar atividades, amizades ou planos.','Sinto que a vida não tem sentido sem a pessoa.'],
  tips:['Permitir-se viver a saudade, sem pressão para "superar".','Rituais de homenagem e memória podem ajudar no processo.','Buscar apoio especializado em luto quando a dor impede de seguir a vida.']});

A('o_substancias', {t:'Rastreio de Uso de Substâncias', cats:['out'], icon:'cup', topics:['Uso problemático de outras substâncias'], theme:'de uso problemático de substâncias',
  edu:'O uso de substâncias se torna problemático quando traz prejuízos à saúde, às relações, ao trabalho ou às finanças, ou quando a pessoa sente dificuldade de controlar o consumo. Existem diferentes caminhos de cuidado, inclusive a redução de danos.',
  period:'Pensando no uso de substâncias como maconha, cocaína, remédios sem prescrição ou outras drogas nos últimos 12 meses, com que frequência isto acontece?',
  items:['Uso mais quantidade, ou por mais tempo, do que pretendia.','Tentei diminuir ou parar e não consegui.','Passo muito tempo buscando, usando ou me recuperando do uso.','Sinto uma vontade forte ou fissura de usar.','O uso já prejudicou meu trabalho, meus estudos ou minha família.','Deixei de fazer atividades importantes por causa do uso.','Uso em situações de risco (dirigindo, por exemplo).','Sinto mal-estar quando fico sem usar.'],
  tips:['Conversar abertamente sobre o uso, sem julgamento.','Conhecer os serviços do CAPS AD da sua cidade.','Estratégias de redução de danos podem ser um primeiro passo.']});
})();
