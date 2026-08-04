/**
 * PROJETOS — sistema completo de cases.
 *
 * Cada item vira automaticamente:
 *   • um card na grade (index.html#projetos)
 *   • uma página completa em projects/projeto.html?slug=SLUG
 *
 * ─────────────────────────────────────────────────────────────
 * COMO ADICIONAR UM NOVO PROJETO
 * ─────────────────────────────────────────────────────────────
 * 1. Copie o bloco MODELO no final deste arquivo.
 * 2. Cole no início do array (projetos mais recentes primeiro).
 * 3. Troque o `slug` — ele é o endereço da página e precisa ser único.
 * 4. Coloque as imagens em assets/images/projetos/SLUG/ e os vídeos
 *    em assets/videos/projetos/SLUG/.
 * 5. Pronto. Card, página, galeria e SEO são gerados sozinhos.
 *
 * `status`: 'publicado' (aparece normal) | 'em-breve' (aparece com selo)
 * `destaque: true` faz o card ocupar o bloco grande da grade.
 */
window.PM = window.PM || {};

window.PM.projectCategories = [
  { id: 'todos', label: 'Todos' },
  { id: 'trafego', label: 'Tráfego Pago' },
  { id: 'social', label: 'Social Media' },
  { id: 'audiovisual', label: 'Audiovisual' },
  { id: 'ia', label: 'Inteligência Artificial' },
  { id: 'web', label: 'Web & Landing Pages' }
];

window.PM.projects = [
  {
    slug: 'crescimento-perfil-medico',
    titulo: 'De 53 a 2.500+ seguidores em 5 meses',
    subtitulo: 'Construção de autoridade digital na área da saúde',
    categoria: 'social',
    categoriaLabel: 'Social Media',
    cliente: 'Dr. João Peranovich',
    ano: '2025',
    papel: 'Estratégia, conteúdo, tráfego e audiovisual',
    status: 'publicado',
    destaque: true,
    resumo: 'Um perfil parado transformado em canal de autoridade e captação, com estratégia de conteúdo, produção de vídeo e mídia paga operando juntos.',
    metricaCard: { valor: '2.500+', label: 'seguidores em ~5 meses' },
    descricao: [
      'O ponto de partida era um perfil com cerca de 53 seguidores, sem linha editorial e sem qualquer investimento em mídia. O objetivo não era vaidade de número: era transformar a conta em um ativo de autoridade capaz de sustentar captação.',
      'A operação foi montada de ponta a ponta — posicionamento, pautas, captação de vídeo, edição, publicação e campanhas de tráfego — com leitura semanal de métricas para decidir o que produzir na semana seguinte.'
    ],
    objetivos: [
      'Construir autoridade digital em um nicho de alta confiança',
      'Criar uma linha editorial recorrente e sustentável',
      'Transformar audiência em contato qualificado',
      'Estabelecer um padrão visual reconhecível para o perfil'
    ],
    desafios: [
      'Base praticamente zerada, sem histórico de engajamento',
      'Nicho de saúde exige linguagem responsável e cuidadosa',
      'Necessidade de volume de conteúdo sem perder qualidade',
      'Agenda restrita do cliente para captação de vídeo'
    ],
    solucoes: [
      'Definição de posicionamento e pilares de conteúdo claros',
      'Gravação em blocos: uma diária rendendo semanas de material',
      'Formatos curtos e verticais priorizando retenção nos primeiros segundos',
      'Campanhas de tráfego reforçando os conteúdos com melhor desempenho orgânico',
      'Uso de IA para acelerar roteiro, variação de copy e organização de pauta'
    ],
    resultados: [
      { valor: '53 → 2.500+', label: 'Seguidores', detalhe: 'Crescimento em aproximadamente 5 meses' },
      { valor: '↑', label: 'Alcance e engajamento', detalhe: 'Consolidação do perfil como referência' },
      { valor: '100%', label: 'Operação própria', detalhe: 'Estratégia, produção e mídia sob a mesma direção' }
    ],
    tecnologias: ['Meta Ads', 'CapCut', 'Canva', 'ChatGPT', 'Claude'],
    galeria: [],
    videos: [],
    // Ao ter o link do perfil, descomente a linha abaixo:
    // links: [{ label: 'Ver perfil no Instagram', href: 'https://instagram.com/...', principal: true }]
    links: []
  },
  {
    slug: 'captacao-educacional-meta-ads',
    titulo: 'Máquina de captação para instituição de ensino',
    subtitulo: 'Meta Ads, CRM e otimização de conversão',
    categoria: 'trafego',
    categoriaLabel: 'Tráfego Pago',
    cliente: 'UniFECAF',
    ano: '2022 — 2025',
    papel: 'Gestão de tráfego e estratégia de conversão',
    status: 'em-breve',
    destaque: true,
    resumo: 'Estruturação da jornada completa do lead — do criativo no Meta Ads ao acompanhamento no CRM — com foco em custo por matrícula, não em custo por clique.',
    metricaCard: { valor: 'Funil', label: 'do anúncio à matrícula' },
    descricao: [
      'Case em preparação. O espaço abaixo já está estruturado para receber prints de campanha, painéis de resultado, criativos e números da operação.'
    ],
    objetivos: [
      'Reduzir o custo por lead qualificado',
      'Conectar a mídia paga ao processo comercial',
      'Padronizar o acompanhamento no CRM',
      'Aumentar a taxa de conversão do funil'
    ],
    desafios: [
      'Sazonalidade forte do calendário educacional',
      'Alinhamento entre marketing e time comercial',
      'Volume de leads sem perda de qualidade'
    ],
    solucoes: [
      'Segmentação e estrutura de campanha por etapa de funil',
      'Testes contínuos de criativo e copy',
      'Rotina de leitura de métricas com o time comercial',
      'Otimização das páginas e formulários de captação'
    ],
    resultados: [
      { valor: '—', label: 'Leads gerados', detalhe: 'Inserir número da operação' },
      { valor: '—', label: 'Custo por lead', detalhe: 'Inserir número da operação' },
      { valor: '—', label: 'Taxa de conversão', detalhe: 'Inserir número da operação' }
    ],
    tecnologias: ['Meta Ads', 'CRM', 'Canva', 'CapCut'],
    galeria: [],
    videos: [],
    links: []
  },
  {
    slug: 'producao-audiovisual',
    titulo: 'Produção audiovisual para performance',
    subtitulo: 'Roteiro, captação e edição pensados para conversão',
    categoria: 'audiovisual',
    categoriaLabel: 'Audiovisual',
    cliente: 'Múltiplos clientes',
    ano: '2022 — atual',
    papel: 'Direção, captação, roteiro e edição',
    status: 'em-breve',
    destaque: false,
    resumo: 'Biblioteca de vídeos institucionais, criativos de campanha e conteúdo social — produzidos com a métrica de retenção como critério de edição.',
    metricaCard: { valor: 'Vídeo', label: 'como ativo de mídia' },
    descricao: [
      'Case em preparação. Esta página já suporta vídeos em MP4, YouTube e Vimeo, com pôster personalizado e reprodução silenciosa automática.'
    ],
    objetivos: [
      'Produzir criativos com alta retenção',
      'Manter identidade visual consistente entre peças',
      'Escalar volume de produção sem perder padrão'
    ],
    desafios: [
      'Prazos curtos entre captação e veiculação',
      'Adaptação do mesmo conteúdo para múltiplos formatos'
    ],
    solucoes: [
      'Roteiros estruturados por gancho, desenvolvimento e chamada',
      'Captação em bloco e biblioteca de cortes reaproveitáveis',
      'Presets de edição para consistência visual'
    ],
    resultados: [
      { valor: '—', label: 'Vídeos produzidos', detalhe: 'Inserir número' },
      { valor: '—', label: 'Retenção média', detalhe: 'Inserir número' }
    ],
    tecnologias: ['CapCut', 'Canva', 'VEO'],
    galeria: [],
    videos: [],
    links: []
  },
  {
    slug: 'automacoes-com-ia',
    titulo: 'Automações e conteúdo com Inteligência Artificial',
    subtitulo: 'IA como multiplicador de velocidade da operação',
    categoria: 'ia',
    categoriaLabel: 'Inteligência Artificial',
    cliente: 'Projetos internos e clientes',
    ano: '2024 — atual',
    papel: 'Prompt engineering e desenho de automações',
    status: 'em-breve',
    destaque: false,
    resumo: 'Fluxos com Claude, ChatGPT, Gemini e VEO para acelerar pauta, copy, roteiro e análise — mantendo o padrão de qualidade sob controle humano.',
    metricaCard: { valor: 'IA', label: 'aplicada à operação' },
    descricao: [
      'Case em preparação. Espaço reservado para documentar fluxos, prompts, ganhos de tempo e exemplos de saída.'
    ],
    objetivos: [
      'Reduzir o tempo entre ideia e publicação',
      'Aumentar o volume de variações testáveis',
      'Padronizar qualidade com bibliotecas de prompt'
    ],
    desafios: [
      'Manter a voz da marca em conteúdo assistido por IA',
      'Evitar automação que gera volume sem relevância'
    ],
    solucoes: [
      'Bibliotecas de prompt versionadas por cliente',
      'Revisão humana obrigatória antes da publicação',
      'IA aplicada ao trabalho repetitivo, não à decisão estratégica'
    ],
    resultados: [
      { valor: '—', label: 'Tempo economizado', detalhe: 'Inserir estimativa' },
      { valor: '—', label: 'Fluxos ativos', detalhe: 'Inserir número' }
    ],
    tecnologias: ['Claude', 'ChatGPT', 'Gemini', 'VEO'],
    galeria: [],
    videos: [],
    links: []
  },
  {
    slug: 'landing-pages-conversao',
    titulo: 'Landing pages orientadas a conversão',
    subtitulo: 'Estrutura, copy e otimização contínua',
    categoria: 'web',
    categoriaLabel: 'Web & Landing Pages',
    cliente: 'Múltiplos clientes',
    ano: '2023 — atual',
    papel: 'Estratégia, copy e estrutura de página',
    status: 'em-breve',
    destaque: false,
    resumo: 'Páginas construídas a partir da objeção do público, não do gosto do cliente — com teste contínuo de headline, prova e chamada.',
    metricaCard: { valor: 'CRO', label: 'página como parte da mídia' },
    descricao: [
      'Case em preparação. Espaço reservado para prints, links ao vivo e números de conversão.'
    ],
    objetivos: [
      'Aumentar a taxa de conversão do tráfego pago',
      'Reduzir atrito entre anúncio e formulário',
      'Padronizar a mensagem entre criativo e página'
    ],
    desafios: [
      'Manter consistência entre a promessa do anúncio e a página',
      'Velocidade de carregamento em conexões móveis'
    ],
    solucoes: [
      'Estrutura de página baseada em objeções mapeadas',
      'Prova social posicionada antes da decisão',
      'Testes de headline e chamada com leitura semanal'
    ],
    resultados: [
      { valor: '—', label: 'Taxa de conversão', detalhe: 'Inserir número' },
      { valor: '—', label: 'Páginas publicadas', detalhe: 'Inserir número' }
    ],
    tecnologias: ['Meta Ads', 'Canva', 'Claude'],
    galeria: [],
    videos: [],
    links: []
  }

  /* ─────────────────────────────────────────────────────────
   * MODELO — copie a partir daqui para criar um novo projeto
   * ─────────────────────────────────────────────────────────
  ,{
    slug: 'nome-unico-do-projeto',
    titulo: 'Título do projeto',
    subtitulo: 'Uma linha explicando o que é',
    categoria: 'trafego',              // trafego | social | audiovisual | ia | web
    categoriaLabel: 'Tráfego Pago',
    cliente: 'Nome do cliente',
    ano: '2026',
    papel: 'O que você fez',
    status: 'publicado',               // publicado | em-breve
    destaque: false,                   // true = card grande na grade
    resumo: 'Resumo curto que aparece no card.',
    metricaCard: { valor: '000', label: 'descrição da métrica' },
    descricao: ['Primeiro parágrafo.', 'Segundo parágrafo.'],
    objetivos: ['Objetivo 1', 'Objetivo 2'],
    desafios: ['Desafio 1', 'Desafio 2'],
    solucoes: ['Solução 1', 'Solução 2'],
    resultados: [
      { valor: '000', label: 'Métrica', detalhe: 'Contexto do número' }
    ],
    tecnologias: ['Meta Ads', 'Canva'],
    galeria: [
      { src: 'assets/images/projetos/SLUG/01.jpg', alt: 'Descrição', mockup: 'desktop' }
      // mockup: 'desktop' | 'notebook' | 'celular' | ausente (imagem pura)
    ],
    videos: [
      { tipo: 'mp4',     src: 'assets/videos/projetos/SLUG/video.mp4', poster: 'assets/images/projetos/SLUG/poster.jpg', titulo: 'Título' },
      { tipo: 'youtube', id: 'ID_DO_VIDEO', titulo: 'Título' },
      { tipo: 'vimeo',   id: 'ID_DO_VIDEO', titulo: 'Título' }
    ],
    links: [
      { label: 'Visitar projeto', href: 'https://exemplo.com', tipo: 'externo', principal: true }
    ]
  }
  */
];
