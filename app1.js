// Application state
let currentStep = 1;
let formData = {};
let selectedFormat = 'ai_decide';
let selectedExtras = [];

// Format data with AI Decide option
const formats = {
  'ai_decide': {
    name: 'Deixar IA Decidir',
    description: 'A IA analisará seu tema e recomendará o melhor formato',
    details: 'A IA analisará seu tema e recomendará o melhor formato de vídeo baseado em princípios de storytelling e engajamento da audiência.',
    icon: '🤖',
    bestFor: ['Qualquer tema', 'Decisão automática', 'Recomendação inteligente'],
    hookType: 'Sugerido pela IA'
  },
  'mini-doc': {
    name: 'Mini Documentário',
    description: 'Histórias reais com personagens e impacto emocional. Ideal para narrativas autênticas que conectam emocionalmente.',
    bestFor: ['Histórias pessoais', 'Impacto social', 'Transformação'],
    hookType: 'Cold Opener'
  },
  'video-essay': {
    name: 'Video Essay',
    description: 'Análise estruturada e profunda',
    details: 'Perfeito para educação, crítica, filosofia e reflexão profunda. Gancho: Pergunta intrigante que gera curiosidade.',
    icon: '📝',
    bestFor: ['Educação', 'Análise crítica', 'Filosofia'],
    hookType: 'Pergunta Intrigante que gera curiosidade'
  },
  'tutorial': {
    name: 'Tutorial/How-To',
    description: 'Ensino prático passo a passo',
    details: 'Melhor para skills, técnicas e guias acionáveis. Gancho: Apresentar o problema que o público enfrenta.',
    icon: '🎓',
    bestFor: ['Skill-building', 'Guias', 'Técnicas'],
    hookType: 'Apresentar o problema que o público enfrenta'
  },
  'story-driven': {
    name: 'Story-Driven',
    description: 'Narrativa com arco de transformação',
    details: 'Para conteúdo inspiracional e motivacional com jornada emocional. Gancho: Open Loop - anunciar revelação que vem depois.',
    icon: '📖',
    bestFor: ['Motivação', 'Superação', 'Jornada pessoal'],
    hookType: 'Open Loop - anunciar revelação que vem depois'
  },
  'explicativo': {
    name: 'Explicativo',
    description: 'Conceitos complexos simplificados',
    details: 'Ideal para ciência, história e conceitos abstratos. Gancho: Fato surpreendente ou estatística impactante.',
    icon: '💡',
    bestFor: ['Ciência', 'História', 'Educação'],
    hookType: 'Fato surpreendente ou estatística impactante'
  },
  'commentary': {
    name: 'Commentary/Análise',
    description: 'Perspectiva crítica sobre tendências',
    details: 'Para vídeos de opinião e análise de tópicos atuais. Gancho: Provocação ou perspectiva inesperada.',
    icon: '🎙️',
    bestFor: ['Crítica', 'Opinião', 'Análise'],
    hookType: 'Provocação ou perspectiva inesperada'
  },
  'inspiracional': {
    name: 'Inspiracional',
    description: 'Conteúdo motivacional e transformador',
    details: 'Para temas de mindset, superação e autoajuda. Gancho: Estatística de impacto ou história de superação.',
    icon: '⭐',
    bestFor: ['Mindset', 'Autoajuda', 'Motivação'],
    hookType: 'Estatística de impacto ou história de superação'
  }
};

// Sample scripts templates
const scriptTemplates = {
  'mini-doc': {
    opening: "Era 2019. Maria tinha apenas 23 anos quando sua vida mudou completamente. Ninguém esperava o que aconteceria a seguir...\n\n[PAUSA]\n\nEsta é a história real de como uma única decisão pode transformar não apenas uma vida, mas uma comunidade inteira. E tudo começou com algo que você provavelmente faz todos os dias sem pensar.",
    body: "Maria cresceu em uma pequena cidade do interior. Como muitos de nós, ela seguia a rotina: acordar, trabalhar, dormir, repetir. Mas algo dentro dela estava incomodando. Aquela sensação de que a vida deveria ser... mais.\n\nFoi então que ela tomou a decisão. Não foi fácil. Na verdade, todos ao seu redor disseram que era loucura. Mas Maria sabia que precisava tentar.\n\nNos primeiros três meses, nada aconteceu. Zero resultados. Ela começou a duvidar. Mas então, no quarto mês, algo mudou. Uma pequena vitória. Depois outra. E outra.\n\nO que começou como um projeto pessoal se transformou em um movimento. Hoje, Maria impacta mais de 500 famílias diretamente. E tudo porque ela decidiu agir.",
    closing: "A história de Maria nos ensina algo fundamental: a transformação começa com uma decisão, mas se sustenta com consistência. Não é sobre ter recursos extraordinários. É sobre usar o que você tem, onde você está.\n\nE você? Qual é aquela decisão que você está adiando? Aquele primeiro passo que você sabe que precisa dar?\n\nPorque a verdade é: daqui a um ano, você vai desejar ter começado hoje."
  },
  'video-essay': {
    opening: "Você já parou pra pensar por que algumas ideias se espalham como vírus e outras morrem no esquecimento?\n\nNão é sorte. Não é timing. É algo muito mais profundo - e muito mais interessante.\n\nHoje vamos explorar os mecanismos psicológicos por trás das ideias contagiantes. E no final, você vai entender exatamente por que este vídeo foi estruturado da maneira que foi.",
    body: "Vamos começar com um exemplo. Em 1996, um professor de psicologia fez um experimento simples: ele espalhou duas versões da mesma história em dois grupos diferentes. A única diferença? Uma tinha um elemento emocional específico.\n\nA versão emocional se espalhou 3 vezes mais rápido. Mas aqui está o interessante: não era qualquer emoção. Era uma emoção específica que os pesquisadores chamam de 'high-arousal emotions'.\n\nRaiva, ansiedade, admiração - estas emoções nos fazem querer agir, compartilhar, reagir. Já tristeza e contentamento? Emoções 'low-arousal' que nos fazem parar e refletir, mas não necessariamente compartilhar.\n\nAgora pense em todos os conteúdos virais que você já viu. Quantos deles provocaram uma dessas emoções de alta intensidade? Provavelmente todos.\n\nMas há mais. Ideias também precisam de 'social currency' - elas precisam fazer quem compartilha parecer bem. Ninguém compartilha algo que os faz parecer mal informados ou desinteressantes.\n\nE finalmente: simplicidade. Uma ideia complexa pode ser profunda, mas uma ideia contagiante precisa ser simples o suficiente para ser repassada sem perder sua essência.",
    closing: "Então, recapitulando: ideias contagiantes combinam emoções de alta intensidade, valor social para quem compartilha, e simplicidade na transmissão.\n\nE agora você entende por que este vídeo começou com uma pergunta intrigante, usou exemplos concretos com dados, e está terminando com um insight claro e acionável.\n\nNão foi por acaso. Foi por design.\n\nA próxima vez que você criar conteúdo, pergunte-se: estou provocando emoção? Estou dando valor social? Estou sendo simples o suficiente?\n\nSe a resposta for sim para as três, você não está apenas criando conteúdo. Você está criando contágio."
  },
  'tutorial': {
    opening: "Você quer aprender meditação mas não sabe por onde começar?\n\nA verdade é que 90% das pessoas desistem porque começam errado. Cometem os mesmos 3 erros clássicos que vou te mostrar como evitar.\n\nNos próximos minutos, você vai aprender o método exato que uso com meus alunos - e que tem 95% de taxa de continuidade após 30 dias.",
    body: "Passo 1: Esqueça a posição de lótus. Sério. Sente-se em uma cadeira confortável. Pés no chão, costas retas mas não tensas. Se você está desconfortável fisicamente, sua mente não vai relaxar. É simples assim.\n\nPasso 2: Comece com 2 minutos. Não 10, não 20. Apenas 2 minutos. A maioria das pessoas falha porque tenta demais no começo. Seu cérebro precisa criar o hábito antes de estender a duração.\n\nConfigure um timer. Feche os olhos. Respire naturalmente - não force nada.\n\nPasso 3: Aqui está o segredo que ninguém te conta - você VAI se distrair. E está tudo bem. Meditação não é sobre não pensar. É sobre perceber quando você se distraiu e gentilmente voltar a atenção para a respiração.\n\nCada vez que você percebe e volta, você está meditando corretamente. É como flexão no cérebro - cada repetição fortalece.\n\nPasso 4: Faça isso no mesmo horário todos os dias. De manhã funciona melhor para 80% das pessoas porque sua mente ainda não está cheia de tarefas e preocupações.\n\nPasso 5: Depois de uma semana de 2 minutos diários, aumente para 3 minutos. Depois de mais uma semana, 5 minutos. Aumente gradualmente.",
    closing: "E é isso. Não é complicado. Não requer equipamento especial. Não precisa de música ambiente ou aplicativos caros.\n\nVocê só precisa de:\n- 2 minutos\n- Uma cadeira\n- Compromisso de fazer todos os dias\n\nA meditação transformou minha vida, mas só porque eu aprendi a começar simples e construir gradualmente.\n\nComece amanhã de manhã. 2 minutos. Você consegue.\n\nE me conte nos comentários como foi sua primeira semana. Vou responder todos."
  },
  'story-driven': {
    opening: "Aos 35 anos, eu tinha tudo que a sociedade diz que devemos ter para ser felizes. Casa própria, carro novo, emprego estável com salário de seis dígitos.\n\nE eu estava absolutamente miserável.\n\nEsta é a história de como eu perdi tudo... e ganhei minha vida de volta.",
    body: "O despertador tocava às 5h45. Sempre tocava às 5h45. Eu me arrastava pra fora da cama, tomava banho no automático, colocava a roupa que já tinha separado na noite anterior.\n\n6h30: no carro, trânsito, podcast sobre produtividade. Porque eu precisava ser mais produtivo, certo? Fazer mais, ganhar mais.\n\n7h30: escritório. Reuniões. E-mails. Mais reuniões. Aquela sensação constante de estar apagando incêndios mas nunca realmente construindo nada.\n\n19h: finalmente em casa. Cansado demais pra fazer qualquer coisa significativa. Netflix. Dormir. Repetir.\n\nFoi assim por 8 anos.\n\nAté aquele domingo. Eu estava no supermercado - lembro claramente que estava na seção de produtos de limpeza - quando simplesmente parei. Meio do corredor, carrinho pela metade.\n\nE pensei: 'É isso? É isso que eu vou fazer pelos próximos 30 anos até me aposentar?'\n\nMeu peito apertou. Não era ansiedade. Era clareza. Aquela clareza brutal que dói porque você não pode mais fingir que não vê.\n\nSegunda-feira, pedi demissão. Sem plano B. Sem rede de segurança. Todo mundo achou que eu tinha enlouquecido. Minha mãe chorou. Minha esposa... bem, essa é outra história.\n\nOs primeiros seis meses foram os mais difíceis da minha vida. Não financeiramente - eu tinha guardado o suficiente pra um ano. Mas psicologicamente. Sem a estrutura do trabalho, sem a validação externa, tive que confrontar quem eu realmente era sem os títulos e o salário.\n\nSpoiler: eu não gostei muito do que encontrei.\n\nMas foi necessário. Porque só depois de desmontar tudo é que eu consegui começar a reconstruir. Não a vida que achavam que eu deveria ter. A vida que EU queria ter.",
    closing: "Hoje, três anos depois, minha vida é irreconhecível. Ganho menos dinheiro. Tenho menos 'status'. Minha casa é menor.\n\nE eu acordo todos os dias com propósito. Faço trabalho que importa. Tenho tempo para as pessoas que amo.\n\nNão estou dizendo que você precisa largar tudo como eu fiz. Seria irresponsável sugerir isso. Mas estou dizendo que se você sente aquele aperto no peito, aquela voz que sussurra 'tem que ter mais que isso'...\n\nEssa voz está certa.\n\nE você tem uma escolha. Pode continuar apertando o botão de soneca nela. Ou pode acordar.\n\nO relógio está tocando. Que horas são pra você?"
  },
  'explicativo': {
    opening: "Você sabia que existe uma técnica simples que pode melhorar sua memória em até 60%?\n\nNão é medicamento. Não é suplemento. É algo que os campeões de memória usam há séculos - e a ciência finalmente entendeu por quê funciona.\n\nVou te explicar exatamente como seu cérebro armazena informação e como você pode hackear esse sistema.",
    body: "Seu cérebro não funciona como um computador. Computadores armazenam informação em endereços específicos. Seu cérebro armazena através de associações.\n\nPensa assim: quando você lembra do cheiro de café, provavelmente vêm junto memórias de manhãs, conversas, lugares específicos. Tudo está conectado.\n\nOs campeões de memória usam isso. A técnica se chama 'Palácio da Memória' ou 'Método de Loci'. E é absurdamente eficaz.\n\nFunciona assim: você imagina um lugar que conhece muito bem - sua casa, por exemplo. Agora, você 'coloca' as informações que quer lembrar em locais específicos dessa casa.\n\nQuer memorizar uma lista de compras? Imagine ovos gigantes na sua porta de entrada. Leite derramando pela escada. Pão flutuando na sala.\n\nParece bobo? É exatamente por isso que funciona. Quanto mais bizarra e visual a imagem, mais fácil seu cérebro lembra.\n\nEstudos de neuroimagem mostram que quando você usa o Palácio da Memória, seu cérebro ativa tanto a região de memória quanto a região de navegação espacial. Você está basicamente usando mais poder de processamento.\n\nMas tem mais. Seu cérebro evoluiu para lembrar de histórias, não de fatos isolados. Por quê? Porque por 99% da história humana, a informação era passada através de narrativas orais.\n\nEntão quando você transforma informação em história - com começo, meio e fim, com emoção e imagens - você está usando o sistema operacional original do cérebro.",
    closing: "Recapitulando: seu cérebro é uma máquina de fazer conexões, não um arquivo de dados.\n\nUse o Palácio da Memória para informação que precisa estar em ordem. Use histórias para conceitos complexos. E sempre, sempre adicione elementos visuais e emocionais.\n\nA memória não é sobre ter um cérebro 'melhor'. É sobre usar as ferramentas certas para como seu cérebro já funciona.\n\nExperimente hoje: pegue 10 itens aleatórios e coloque-os mentalmente pela sua casa. Amanhã, tente lembrar. Você vai se surpreender."
  },
  'commentary': {
    opening: "Todo mundo está falando sobre produtividade. Mas ninguém está falando sobre o problema real.\n\nNão é que você não seja produtivo o suficiente. É que estamos medindo a coisa errada.\n\nE isso está nos deixando simultaneamente mais ocupados e menos realizados. Deixa eu te mostrar o que quero dizer.",
    body: "Olha, eu entendo o apelo. Acordar às 5h da manhã. Otimizar cada minuto. Aquela sensação de estar fazendo mais que os outros.\n\nMas vamos ser honestos sobre o que está realmente acontecendo aqui.\n\nNós substituímos 'fazer coisas importantes' por 'estar ocupado'. E chamamos isso de produtividade.\n\nVocê vê isso em todo lugar. Pessoas se gabando de quantos e-mails respondem. Quantas reuniões aguentam. Quantas horas trabalham.\n\nSabe o que ninguém está perguntando? O que você realmente produziu? Que diferença você fez?\n\nBusyness virou badge of honor. E é exatamente isso que o sistema quer. Porque pessoas ocupadas não param pra questionar se o que estão fazendo importa.\n\nAqui está a parte controversa: a maioria das técnicas de produtividade são apenas formas mais eficientes de fazer coisas que não deveriam ser feitas.\n\nÉ como otimizar a rota para um destino errado. Você chega mais rápido... no lugar errado.\n\nO que ninguém quer ouvir: às vezes ser menos produtivo é a coisa mais inteligente que você pode fazer.\n\nPorque produtividade sem direção é só movimento. E movimento sem propósito é exaustão.",
    closing: "Então antes de baixar o próximo app de produtividade ou acordar uma hora mais cedo, pergunte-se:\n\nProdutivo para quê? Para quem? Por quê?\n\nSe você não consegue responder essas perguntas claramente, nenhuma técnica de produtividade vai te ajudar. Você só vai ficar cansado mais rápido.\n\nA verdadeira produtividade não é sobre fazer mais. É sobre fazer o que importa.\n\nE isso, meus amigos, nenhum app pode fazer por você."
  },
  'inspiracional': {
    opening: "23% das pessoas que assistem este vídeo vão desistir de um sonho este ano.\n\nNão porque não são capazes. Não porque não têm talento. Mas porque vão acreditar na mentira mais perigosa que existe.\n\nE eu vou te contar qual é essa mentira. Porque se você entender isso agora, os próximos 12 meses da sua vida vão ser completamente diferentes.",
    body: "A mentira é esta: você precisa estar pronto antes de começar.\n\nPrecisa ter todas as respostas. Todos os recursos. Todas as habilidades. E só então pode dar o primeiro passo.\n\nBullshit.\n\nSabe quem estava 'pronto'? Ninguém. Literalmente ninguém que fez algo significativo estava completamente pronto quando começou.\n\nJK Rowling não estava pronta financeiramente quando escreveu Harry Potter em guardanapos de café.\n\nSteve Jobs não estava pronto tecnicamente quando começou a Apple na garagem.\n\nMalala não estava pronta quando decidiu falar contra o Taliban aos 11 anos.\n\nVocê acha que eles se sentiam prontos? Que eles sabiam o que estava fazendo?\n\nÓbvio que não.\n\nMas eles fizeram algo que a maioria das pessoas nunca faz: começaram antes de estar prontos.\n\nE aqui está o segredo que ninguém te conta: você nunca vai estar pronto. Nunca. Porque 'estar pronto' é uma ilusão. É uma desculpa sofisticada que seu cérebro criou pra te manter na zona de conforto.\n\nO único jeito de estar pronto é começar. Porque você aprende fazendo, não pensando em fazer.\n\nCada dia que você adia é um dia de aprendizado perdido. Um dia de crescimento perdido. Um dia da sua vida perdido.\n\nE eu sei, você tem medo. Todo mundo tem medo. Medo de falhar, medo de parecer ridículo, medo de não ser bom o suficiente.\n\nMas deixa eu te fazer uma pergunta: que idade você vai ter daqui a 5 anos se não começar agora?\n\nVocê vai ter 5 anos mais velho. E vai estar no exato mesmo lugar. Ainda esperando estar 'pronto'.",
    closing: "Então aqui está o que você vai fazer: você vai escolher uma coisa. Apenas uma. Aquele projeto, aquela ideia, aquele sonho que você vem adiando.\n\nE você vai dar um passo. Um único passo. Hoje.\n\nNão precisa ser perfeito. Não precisa ser grande. Só precisa ser real.\n\nPorque a distância entre onde você está e onde quer estar não é medida em talento. É medida em coragem.\n\nA coragem de começar antes de estar pronto.\n\nA coragem de ser ruim antes de ser bom.\n\nA coragem de fazer mesmo com medo.\n\nDaqui a um ano, você vai olhar pra trás. E pode ter dois sentimentos: orgulho de ter começado, ou arrependimento de não ter tentado.\n\nA escolha é sua. Sempre foi.\n\nAgora vai. O mundo está esperando o que só você pode criar."
  }
};

// Tooltip system removed - using inline help text instead

// Initialize
document.addEventListener('DOMContentLoaded', function() {


  // Custom duration handler
  document.getElementById('customDuration').addEventListener('input', function() {
    if (this.value) {
      document.getElementById('duration').value = '';
    }
  });
  
  document.getElementById('duration').addEventListener('change', function() {
    if (this.value) {
      document.getElementById('customDuration').value = '';
    }
  });
  
  // Theme-based format suggestion
  document.getElementById('theme').addEventListener('input', function() {
    // Store for later use in step 2
    formData.theme = this.value;
  });
  
  // Video format change handler
  document.getElementById('videoFormat').addEventListener('change', function() {
    selectedFormat = this.value;
    
    // Show AI suggestion if AI Decide is selected and theme exists
    if (this.value === 'ai_decide' && formData.theme) {
      showAISuggestion();
    } else {
      document.getElementById('suggestionBox').classList.add('hidden');
    }
  });

  // Inspiration type handler
  document.querySelectorAll('input[name="inspirationType"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const inputDiv = document.getElementById('inspirationInput');
      if (this.value !== 'none') {
        inputDiv.classList.remove('hidden');
      } else {
        inputDiv.classList.add('hidden');
      }
    });
  });
});

function initializeFormatCards() {
  // No longer needed - using dropdown instead
}

// Tooltips removed in favor of inline help text

function showAISuggestion() {
  const theme = formData.theme.toLowerCase();
  const suggestionBox = document.getElementById('suggestionBox');
  const suggestionText = document.getElementById('suggestionText');
  
  let suggestedFormat = null;
  let reason = '';
  
  if (theme.includes('história') || theme.includes('transformação') || theme.includes('jornada') || theme.includes('biografia')) {
    suggestedFormat = 'mini-doc';
    reason = 'Temas narrativos ganham com storytelling cinematográfico e personagens reais.';
  } else if (theme.includes('como') || theme.includes('tutorial') || theme.includes('passo') || theme.includes('guia') || theme.includes('aprender')) {
    suggestedFormat = 'tutorial';
    reason = 'Conteúdo educacional prático funciona melhor no formato how-to.';
  } else if (theme.includes('motivação') || theme.includes('inspiração') || theme.includes('mindset') || theme.includes('superação')) {
    suggestedFormat = 'inspiracional';
    reason = 'Temas motivacionais precisam de tom emocional e poderoso.';
  } else if (theme.includes('produtividade') || theme.includes('trabalho') || theme.includes('eficiência') || theme.includes('gestão')) {
    suggestedFormat = 'video-essay';
    reason = 'Este tema se beneficia de análise estruturada e explicação clara.';
  } else if (theme.includes('análise') || theme.includes('crítica') || theme.includes('opinião')) {
    suggestedFormat = 'commentary';
    reason = 'Conteúdo de opinião funciona melhor com perspectiva crítica.';
  } else if (theme.includes('explicar') || theme.includes('entender') || theme.includes('ciência') || theme.includes('conceito')) {
    suggestedFormat = 'explicativo';
    reason = 'Conceitos complexos precisam de explicação clara e estruturada.';
  } else {
    suggestedFormat = 'video-essay';
    reason = 'Video essay é versátil e funciona bem para a maioria dos temas.';
  }
  
  if (suggestedFormat) {
    const format = formats[suggestedFormat];
    suggestionText.textContent = `Baseado no tema "${formData.theme}", recomendamos: ${format.name}. ${reason}`;
    suggestionBox.classList.remove('hidden');
    formData.suggestedFormat = suggestedFormat;
    formData.suggestionReason = reason;
  }
}

function nextStep() {
  // Validate current step
  if (currentStep === 1) {
    const theme = document.getElementById('theme').value;
    const duration = document.getElementById('duration').value;
    const customDuration = document.getElementById('customDuration').value;
    
    if (!theme || (!duration && !customDuration)) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    formData.theme = theme;
    formData.duration = customDuration || duration;
    
    // Show AI suggestion in step 2 if applicable
    if (selectedFormat === 'ai_decide') {
      setTimeout(() => showAISuggestion(), 100);
    }
  }
  
  // Collect selected extras in step 3
  if (currentStep === 3) {
    selectedExtras = [];
    document.querySelectorAll('input[name="extras"]:checked').forEach(checkbox => {
      selectedExtras.push(checkbox.value);
    });
    formData.extras = selectedExtras;
  }
  
  if (currentStep < 4) {
    // Hide current step
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    // Update progress
    document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`[data-step="${currentStep}"]`).classList.add('completed');
    
    // Show next step
    currentStep++;
    document.getElementById(`step${currentStep}`).classList.add('active');
    document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
    
    // If step 4, populate review
    if (currentStep === 4) {
      populateReview();
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }
}

function prevStep() {
  if (currentStep > 1) {
    // Hide current step
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
    
    // Show previous step
    currentStep--;
    document.getElementById(`step${currentStep}`).classList.add('active');
    document.querySelector(`[data-step="${currentStep}"]`).classList.remove('completed');
    document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
  }
}

function populateReview() {
  // Basic info
  document.getElementById('reviewTheme').textContent = formData.theme;
  
  const customDuration = document.getElementById('customDuration').value;
  if (customDuration) {
    document.getElementById('reviewDuration').textContent = customDuration;
  } else {
    const duration = document.getElementById('duration').value;
    document.getElementById('reviewDuration').textContent = document.getElementById('duration').options[document.getElementById('duration').selectedIndex].text;
  }
  
  const formatSelect = document.getElementById('videoFormat');
  const formatKey = formatSelect.value;
  let formatText = formatSelect.options[formatSelect.selectedIndex].text;
  if (formatKey === 'ai_decide' && formData.suggestedFormat) {
    formatText += ` (IA sugere: ${formats[formData.suggestedFormat].name})`;
  }
  document.getElementById('reviewFormat').textContent = formatText;
  
  // Optional details
  const inspirationType = document.querySelector('input[name="inspirationType"]:checked').value;
  const inspirationLabels = {
    'none': 'Nenhuma (criação do zero)',
    'blog': 'URL de blog/artigo',
    'video': 'URL de vídeo YouTube',
    'transcript': 'Transcrição de vídeo',
    'trends': 'Pesquisa de tendências'
  };
  document.getElementById('reviewInspiration').textContent = inspirationLabels[inspirationType];
  
  const audience = document.getElementById('audience').value;
  document.getElementById('reviewAudience').textContent = audience ? 
    document.getElementById('audience').options[document.getElementById('audience').selectedIndex].text : 
    'IA irá decidir';
  
  const tone = document.getElementById('tone').value;
  document.getElementById('reviewTone').textContent = tone ? 
    document.getElementById('tone').options[document.getElementById('tone').selectedIndex].text : 
    'IA irá sugerir';
}

function generateScript() {
  // Collect form data
  const customDuration = document.getElementById('customDuration').value;
  const selectedFormatKey = document.getElementById('videoFormat').value;
  
  formData.theme = document.getElementById('theme').value;
  formData.duration = customDuration || document.getElementById('duration').value;
  formData.format = selectedFormatKey === 'ai_decide' && formData.suggestedFormat ? formData.suggestedFormat : selectedFormatKey;
  formData.inspirationType = document.querySelector('input[name="inspirationType"]:checked').value;
  formData.inspirationSource = document.getElementById('inspirationSource').value;
  formData.audience = document.getElementById('audience').value;
  formData.tone = document.getElementById('tone').value;
  
  // Hide form
  document.getElementById('scriptForm').style.display = 'none';
  document.querySelector('.progress-bar').style.display = 'none';
  
  // Show loading
  const loadingOverlay = document.getElementById('loadingOverlay');
  loadingOverlay.classList.add('active');
  
  // Simulate generation process
  const steps = [
    { status: 'Analisando tema...', detail: 'Identificando elementos-chave e abordagem ideal', duration: 1000 },
    { status: 'Selecionando estrutura...', detail: 'Aplicando princípios de storytelling', duration: 1500 },
    { status: 'Construindo gancho inicial...', detail: 'Criando abertura impactante nos primeiros 15 segundos', duration: 1200 },
    { status: 'Desenvolvendo narrativa...', detail: 'Estruturando corpo do roteiro com ritmo adequado', duration: 2000 },
    { status: 'Finalizando roteiro...', detail: 'Adicionando call-to-action e fechamento', duration: 1300 }
  ];
  
  let currentStepIndex = 0;
  
  function updateLoadingStep() {
    if (currentStepIndex < steps.length) {
      const step = steps[currentStepIndex];
      document.getElementById('loadingStatus').textContent = step.status;
      document.getElementById('loadingDetail').textContent = step.detail;
      
      setTimeout(() => {
        currentStepIndex++;
        updateLoadingStep();
      }, step.duration);
    } else {
      // Generation complete
      loadingOverlay.classList.remove('active');
      displayScript();
    }
  }
  
  updateLoadingStep();
}

function displayScript() {
  const template = scriptTemplates[formData.format];
  // Parse duration - could be "5" or "7 minutos" or "6:30"
  let duration = 5; // default
  const durationStr = formData.duration.toString().toLowerCase();
  const match = durationStr.match(/(\d+)/);
  if (match) {
    duration = parseInt(match[1]);
  }
  
  // CRITICAL: Calculate target word count based on 130 words/minute formula
  const targetWordCount = duration * 130;
  
  // Build complete script - adjust length to match target
  let script = template.opening + '\n\n' + template.body + '\n\n' + template.closing;
  
  // Calculate actual word count
  let wordCount = script.split(/\s+/).length;
  
  // If script is too short or too long, adjust (simulate proper generation)
  // In a real implementation, this would be done by the AI generation
  const tolerance = 0.15; // 15% tolerance
  if (wordCount < targetWordCount * (1 - tolerance)) {
    // Script too short - add development content
    const expansionNeeded = Math.floor((targetWordCount - wordCount) / 50);
    for (let i = 0; i < expansionNeeded; i++) {
      script += '\n\n' + 'Este é um exemplo de expansão do conteúdo para atingir a duração desejada. Em uma implementação real, a IA geraria conteúdo relevante adicional baseado no tema, incluindo mais exemplos, histórias, dados e insights que enriquecem a narrativa.';
    }
    wordCount = script.split(/\s+/).length;
  }
  
  const estimatedMinutes = Math.round(wordCount / 130); // Use 130 words/minute formula
  
  // Display script
  document.getElementById('scriptContent').textContent = script;
  document.getElementById('wordCount').textContent = wordCount;
  document.getElementById('estimatedTime').textContent = `${estimatedMinutes} min`;
  
  // Show result
  document.getElementById('resultContainer').classList.add('active');
  
  // Populate technical details
  populateTechnicalDetails();
  
  // Generate and display extras if selected
  if (formData.extras && formData.extras.length > 0) {
    generateExtras();
  }
  
  // Scroll to result
  document.getElementById('resultContainer').scrollIntoView({ behavior: 'smooth' });
}

function populateTechnicalDetails() {
  const formatKey = formData.format || 'video-essay';
  const format = formats[formatKey];
  
  // Structure
  const structureList = document.getElementById('structureList');
  structureList.innerHTML = `
    <li><strong>Formato:</strong> ${format.name}</li>
    <li><strong>Tipo de gancho:</strong> ${format.hookType}</li>
    <li><strong>Estrutura:</strong> Abertura impactante (15s) → Desenvolvimento (70%) → Fechamento forte (15%)</li>
    <li><strong>Arco narrativo:</strong> 3 atos com ganchos intermediários</li>
  `;
  
  // Techniques
  const techniquesList = document.getElementById('techniquesList');
  techniquesList.innerHTML = `
    <li><strong>Cold Open:</strong> Começar com impacto antes de qualquer introdução</li>
    <li><strong>Open Loops:</strong> Criar curiosidade que só é resolvida no final</li>
    <li><strong>Intermediate Hooks:</strong> Manter atenção a cada 90-120 segundos</li>
    <li><strong>Pattern Interrupt:</strong> Quebrar expectativas para reengajar</li>
    <li><strong>Social Proof:</strong> Usar exemplos relacionáveis e concretos</li>
    <li><strong>Call-to-Action:</strong> Fechamento claro e acionável</li>
  `;
  
  // Timing
  const durationStr = formData.duration.toString().toLowerCase();
  const match = durationStr.match(/(\d+)/);
  const duration = match ? parseInt(match[1]) : 5;
  const timingList = document.getElementById('timingList');
  timingList.innerHTML = `
    <li><strong>Gancho inicial:</strong> 0:00 - 0:15 (crítico para retenção)</li>
    <li><strong>Estabelecimento:</strong> 0:15 - ${Math.round(duration * 0.2)}:00</li>
    <li><strong>Desenvolvimento:</strong> ${Math.round(duration * 0.2)}:00 - ${Math.round(duration * 0.8)}:00</li>
    <li><strong>Clímax/Resolução:</strong> ${Math.round(duration * 0.8)}:00 - ${Math.round(duration * 0.95)}:00</li>
    <li><strong>Call-to-Action:</strong> ${Math.round(duration * 0.95)}:00 - ${duration}:00</li>
  `;
  
}

function generateExtras() {
  const extrasSection = document.getElementById('extrasSection');
  const extrasContent = document.getElementById('extrasContent');
  let html = '';
  
  if (formData.extras.includes('titulo')) {
    html += `
      <div style="margin-bottom: 24px;">
        <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600;">📝 Sugestões de Título</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);">${formData.theme} | O Que Ninguém Te Conta</li>
          <li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);">Como ${formData.theme} Mudou Minha Vida (Resultados Reais)</li>
          <li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);">${formData.theme}: O Guia Completo [2025]</li>
          <li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);">A Verdade Sobre ${formData.theme} Que Você Precisa Saber</li>
          <li style="padding: 8px 0;">Por Que ${formData.theme} É Mais Importante Do Que Você Pensa</li>
        </ul>
      </div>
    `;
  }
  
  if (formData.extras.includes('thumbnail')) {
    html += `
      <div style="margin-bottom: 24px;">
        <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600;">🎨 Ideias para Thumbnail</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);"><strong>Conceito 1:</strong> Close-up do rosto com expressão impactante + texto grande com palavra-chave principal</li>
          <li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);"><strong>Conceito 2:</strong> Antes/Depois visual ou comparação lado a lado</li>
          <li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);"><strong>Conceito 3:</strong> Elemento visual do tema principal + seta apontando + texto intrigante</li>
          <li style="padding: 8px 0;"><strong>Dica:</strong> Use cores contrastantes (vermelho, amarelo, azul) e texto em bold branco com borda preta</li>
        </ul>
      </div>
    `;
  }
  
  if (formData.extras.includes('timestamps')) {
    const duration = parseInt(formData.duration.toString().match(/(\d+)/)[1]) || 5;
    html += `
      <div style="margin-bottom: 24px;">
        <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600;">⏱️ Timestamps Sugeridos</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-family: var(--font-family-mono); font-size: 13px;">
          <li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);">0:00 - Introdução e Hook</li>
          <li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);">${Math.floor(duration * 0.15)}:${String(Math.floor((duration * 0.15 % 1) * 60)).padStart(2, '0')} - Contexto e Problema</li>
          <li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);">${Math.floor(duration * 0.35)}:${String(Math.floor((duration * 0.35 % 1) * 60)).padStart(2, '0')} - Desenvolvimento Principal</li>
          <li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);">${Math.floor(duration * 0.65)}:${String(Math.floor((duration * 0.65 % 1) * 60)).padStart(2, '0')} - Exemplos e Insights</li>
          <li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);">${Math.floor(duration * 0.85)}:${String(Math.floor((duration * 0.85 % 1) * 60)).padStart(2, '0')} - Conclusão e Recapitulação</li>
          <li style="padding: 8px 0;">${Math.floor(duration * 0.95)}:${String(Math.floor((duration * 0.95 % 1) * 60)).padStart(2, '0')} - Call-to-Action</li>
        </ul>
      </div>
    `;
  }
  
  if (formData.extras.includes('cta')) {
    html += `
      <div style="margin-bottom: 24px;">
        <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600;">📣 Sugestões de CTA</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);"><strong>CTA 1:</strong> "Se este vídeo te ajudou, deixa um like e se inscreve no canal para mais conteúdo sobre ${formData.theme}"</li>
          <li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);"><strong>CTA 2:</strong> "Comenta aqui embaixo: qual foi o maior insight que você teve? Vou responder todos!"</li>
          <li style="padding: 8px 0;"><strong>CTA 3:</strong> "Quer se aprofundar? Baixe o guia gratuito no link da descrição com um checklist completo"</li>
        </ul>
      </div>
    `;
  }
  
  extrasContent.innerHTML = html;
  extrasSection.classList.remove('hidden');
}

function toggleTechnicalDetails() {
  const details = document.getElementById('technicalDetails');
  details.classList.toggle('active');
}

function downloadScript() {
  const script = document.getElementById('scriptContent').textContent;
  const theme = formData.theme;
  const blob = new Blob([script], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `roteiro-${theme.replace(/\s+/g, '-').toLowerCase()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

function copyToClipboard() {
  const script = document.getElementById('scriptContent').textContent;
  navigator.clipboard.writeText(script).then(() => {
    alert('Roteiro copiado para a área de transferência!');
  }).catch(err => {
    console.error('Erro ao copiar:', err);
  });
}

function resetForm() {
  // Reset all
  currentStep = 1;
  formData = {};
  selectedFormat = 'ai_decide';
  selectedExtras = [];
  
  // Reset form
  document.getElementById('scriptForm').reset();
  document.getElementById('scriptForm').style.display = 'block';
  
  // Reset format dropdown to AI Decide
  document.getElementById('videoFormat').value = 'ai_decide';
  
  // Reset steps
  document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
  document.getElementById('step1').classList.add('active');
  
  // Uncheck all extras
  document.querySelectorAll('input[name="extras"]').forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // Reset progress
  document.querySelectorAll('.progress-step').forEach(step => {
    step.classList.remove('active', 'completed');
  });
  document.querySelector('[data-step="1"]').classList.add('active');
  document.querySelector('.progress-bar').style.display = 'flex';
  
  // Hide results
  document.getElementById('resultContainer').classList.remove('active');
  document.getElementById('technicalDetails').classList.remove('active');
  
  // Hide suggestion boxes
  document.getElementById('suggestionBox').classList.add('hidden');
  document.getElementById('inspirationInput').classList.add('hidden');
  
  // Scroll to top
  window.scrollTo(0, 0);
}