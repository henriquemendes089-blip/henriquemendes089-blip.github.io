/**
 * EXPERIÊNCIAS — alimenta a timeline da home e as páginas individuais.
 *
 * Cada item vira automaticamente:
 *   • um nó na timeline (index.html#experiencia)
 *   • uma página completa em pages/experiencia.html?id=SLUG
 *
 * Para adicionar uma nova experiência: copie um bloco, troque o `id` e
 * posicione no array (ordem = do mais recente para o mais antigo).
 */
window.PM = window.PM || {};
window.PM.experiences = [
  {
    id: 'dr-joao-peranovich',
    empresa: 'Dr. João Peranovich',
    cargo: 'Marketing Estratégico & Social Media',
    tipo: 'Prestador de serviço',
    periodo: 'Atual',
    inicio: '2025',
    fim: 'Atual',
    atual: true,
    local: 'Remoto',
    resumo: 'Construção de presença digital do zero para um profissional da saúde, unindo estratégia de conteúdo, tráfego pago e produção audiovisual.',
    contexto: 'O perfil tinha alcance praticamente nulo e nenhuma estratégia de conteúdo definida. O desafio era transformar uma conta parada em um canal de autoridade e captação de pacientes.',
    destaque: {
      valor: '2.500+',
      label: 'seguidores em ~5 meses',
      detalhe: 'partindo de aproximadamente 53 seguidores'
    },
    responsabilidades: [
      'Marketing Estratégico',
      'Social Media',
      'Gestão de Tráfego',
      'Produção Audiovisual'
    ],
    entregas: [
      'Definição de posicionamento e linha editorial do perfil',
      'Calendário de conteúdo recorrente com foco em autoridade',
      'Captação, roteiro e edição de vídeos curtos',
      'Campanhas de tráfego para alcance e conversão',
      'Acompanhamento de métricas e ajuste contínuo de pauta'
    ],
    resultados: [
      { valor: '53 → 2.500+', label: 'Crescimento de seguidores', detalhe: 'Em aproximadamente 5 meses de operação' },
      { valor: '↑', label: 'Autoridade digital', detalhe: 'Perfil consolidado como referência na área' },
      { valor: '100%', label: 'Operação estruturada do zero', detalhe: 'Estratégia, produção e tráfego' }
    ],
    tags: ['Social Media', 'Tráfego Pago', 'Audiovisual', 'Saúde'],
    galeria: [],
    videos: [],
    links: []
  },
  {
    id: 'unifecaf-ribeirao',
    empresa: 'UniFECAF Ribeirão das Neves',
    cargo: 'Marketing Estratégico & Gestão de Tráfego',
    tipo: 'Prestador de serviço',
    periodo: 'Atual',
    inicio: '2024',
    fim: 'Atual',
    atual: true,
    local: 'Ribeirão das Neves · MG',
    resumo: 'Operação completa de marketing para uma unidade educacional: estratégia, tráfego pago, conteúdo e audiovisual sob a mesma direção.',
    contexto: 'Atuação como prestador de serviço responsável por toda a frente digital da unidade — do planejamento estratégico à execução de campanhas e produção de material.',
    destaque: {
      valor: '360°',
      label: 'operação de marketing',
      detalhe: 'estratégia, mídia, conteúdo e vídeo'
    },
    responsabilidades: [
      'Marketing Estratégico',
      'Gestão de Tráfego',
      'Produção de Conteúdo',
      'Edição de Vídeo',
      'Administração das Redes Sociais'
    ],
    entregas: [
      'Planejamento estratégico de marketing da unidade',
      'Gestão e otimização de campanhas de tráfego pago',
      'Produção de conteúdo para redes sociais',
      'Captação e edição de vídeos institucionais e de captação',
      'Administração diária dos canais sociais'
    ],
    resultados: [
      { valor: '—', label: 'Métricas', detalhe: 'Espaço reservado para inserir números da operação' }
    ],
    tags: ['Educação', 'Meta Ads', 'Conteúdo', 'Vídeo'],
    galeria: [],
    videos: [],
    links: []
  },
  {
    id: 'unifecaf-divinopolis',
    empresa: 'UniFECAF Divinópolis',
    cargo: 'Gerente de Marketing',
    tipo: 'Promovido de Consultor Comercial',
    periodo: '2025 — 2026',
    inicio: '2025',
    fim: '2026',
    atual: false,
    local: 'Divinópolis · MG',
    resumo: 'Entrada como Consultor Comercial e promoção a Gerente de Marketing, assumindo estratégia, mídia, CRM e conversão da unidade.',
    contexto: 'A trajetória começou na área comercial, em contato direto com o funil de vendas. Esse entendimento de ponta a ponta — do anúncio à matrícula — foi o que sustentou a promoção para a gestão de marketing.',
    destaque: {
      valor: 'Consultor → Gerente',
      label: 'promoção interna',
      detalhe: 'do comercial à gestão de marketing'
    },
    responsabilidades: [
      'Estratégias de Marketing',
      'Gestão de Tráfego',
      'Meta Ads',
      'Criação de Conteúdo',
      'Produção de Vídeos',
      'Planejamento',
      'CRM',
      'Otimização de Conversão',
      'Planejamento de Campanhas',
      'Gestão das Redes Sociais',
      'Estratégias Comerciais'
    ],
    entregas: [
      'Planejamento e execução de campanhas de captação',
      'Gestão de verba e otimização de Meta Ads',
      'Estruturação e uso de CRM no acompanhamento de leads',
      'Otimização de conversão em toda a jornada do lead',
      'Direção de conteúdo e produção audiovisual',
      'Alinhamento entre marketing e time comercial'
    ],
    resultados: [
      { valor: 'CRM', label: 'Processo comercial estruturado', detalhe: 'Acompanhamento de leads do anúncio à matrícula' },
      { valor: '—', label: 'Leads gerados', detalhe: 'Espaço reservado para inserir números' },
      { valor: '—', label: 'Campanhas ativas', detalhe: 'Espaço reservado para inserir números' }
    ],
    tags: ['Gestão', 'Meta Ads', 'CRM', 'Conversão', 'Educação'],
    galeria: [],
    videos: [],
    links: []
  },
  {
    id: 'lojas-marcellus',
    empresa: 'Lojas Marcellus',
    cargo: 'Vendedor & Gestor de Tráfego',
    tipo: 'CLT',
    periodo: '2022 — 2024',
    inicio: '2022',
    fim: '2024',
    atual: false,
    local: 'Minas Gerais',
    resumo: 'Atuação híbrida entre o balcão e a mídia paga: vender presencialmente e, ao mesmo tempo, gerar demanda pelo digital.',
    contexto: 'Estar dos dois lados — atendendo o cliente e gerindo os anúncios que o trouxeram — moldou a forma como leio campanha até hoje: performance só existe quando vira venda.',
    destaque: {
      valor: 'Loja + Ads',
      label: 'venda e mídia na mesma mão',
      detalhe: 'do anúncio ao fechamento'
    },
    responsabilidades: [
      'Vendas',
      'Gestão de Tráfego',
      'Atendimento ao cliente',
      'Campanhas locais'
    ],
    entregas: [
      'Gestão de campanhas de tráfego para o varejo',
      'Atendimento e fechamento de vendas',
      'Conexão direta entre anúncio e resultado no balcão'
    ],
    resultados: [
      { valor: '—', label: 'Vendas influenciadas por tráfego', detalhe: 'Espaço reservado para inserir números' }
    ],
    tags: ['Varejo', 'Vendas', 'Tráfego Pago'],
    galeria: [],
    videos: [],
    links: []
  },
  {
    id: 'quiosque',
    empresa: 'Quiosque',
    cargo: 'Empreendedor',
    tipo: 'Negócio próprio',
    periodo: 'Início da trajetória',
    inicio: '2019',
    fim: '2021',
    atual: false,
    local: 'Minas Gerais',
    resumo: 'Operação própria de venda de açaí, água de coco e vitaminas — o primeiro contato real com cliente, margem, estoque e demanda.',
    contexto: 'Antes de gerir verba de anúncio, geri caixa. Ter um negócio próprio ensina a olhar campanha pela ótica de quem paga a conta no fim do mês.',
    destaque: {
      valor: 'P&L próprio',
      label: 'negócio do zero',
      detalhe: 'compra, operação, venda e margem'
    },
    responsabilidades: [
      'Gestão do negócio',
      'Vendas diretas',
      'Controle de estoque e compras',
      'Atendimento ao cliente'
    ],
    entregas: [
      'Operação completa de um ponto de venda',
      'Controle de custos, margem e reposição',
      'Relacionamento e fidelização de clientes'
    ],
    resultados: [
      { valor: '100%', label: 'Autonomia operacional', detalhe: 'Do fornecedor ao caixa' }
    ],
    tags: ['Empreendedorismo', 'Vendas', 'Operação'],
    galeria: [],
    videos: [],
    links: []
  }
];
