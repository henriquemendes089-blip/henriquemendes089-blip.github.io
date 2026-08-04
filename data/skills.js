/**
 * HABILIDADES — cards por categoria (sem barras de progresso).
 *
 * `nivel` é usado apenas como rótulo textual discreto no chip.
 * Valores aceitos: 'core' (competência central) | 'forte' | 'apoio'
 */
window.PM = window.PM || {};

window.PM.skillsIntro = {
  eyebrow: 'Habilidades',
  titulo: 'O que eu opero na prática.',
  tituloDestaque: 'prática',
  texto: 'Sem escala de 1 a 10. O que está aqui é o que eu executo com autonomia, do planejamento à entrega.'
};

window.PM.skills = [
  {
    id: 'marketing',
    indice: '01',
    titulo: 'Marketing',
    descricao: 'Da tese estratégica à campanha no ar, com leitura de número no meio do caminho.',
    icone: 'strategy',
    itens: [
      { nome: 'Marketing Estratégico', nivel: 'core' },
      { nome: 'Meta Ads', nivel: 'core' },
      { nome: 'Gestão de Tráfego', nivel: 'core' },
      { nome: 'Copywriting', nivel: 'forte' },
      { nome: 'Landing Pages', nivel: 'forte' },
      { nome: 'SEO', nivel: 'forte' },
      { nome: 'Lançamentos', nivel: 'forte' },
      { nome: 'Vendas', nivel: 'core' },
      { nome: 'Persuasão', nivel: 'forte' },
      { nome: 'CRM', nivel: 'forte' },
      { nome: 'Otimização de Conversão', nivel: 'forte' }
    ]
  },
  {
    id: 'design',
    indice: '02',
    titulo: 'Design',
    descricao: 'Identidade e peça gráfica com consistência visual entre todos os pontos de contato.',
    icone: 'palette',
    itens: [
      { nome: 'Canva', nivel: 'core' },
      { nome: 'Criação de Artes', nivel: 'core' },
      { nome: 'Identidade Visual', nivel: 'forte' },
      { nome: 'Direção de Arte', nivel: 'apoio' }
    ]
  },
  {
    id: 'video',
    indice: '03',
    titulo: 'Vídeo',
    descricao: 'Roteiro, captação e edição pensados para retenção — não para enfeite.',
    icone: 'film',
    itens: [
      { nome: 'CapCut', nivel: 'core' },
      { nome: 'Captação', nivel: 'core' },
      { nome: 'Edição', nivel: 'core' },
      { nome: 'Roteiros', nivel: 'forte' },
      { nome: 'Vídeo para Performance', nivel: 'forte' }
    ]
  },
  {
    id: 'ia',
    indice: '04',
    titulo: 'Inteligência Artificial',
    descricao: 'IA como multiplicador de velocidade e volume, com revisão humana no final da linha.',
    icone: 'spark',
    itens: [
      { nome: 'Claude', nivel: 'core' },
      { nome: 'ChatGPT', nivel: 'core' },
      { nome: 'Gemini', nivel: 'forte' },
      { nome: 'VEO', nivel: 'forte' },
      { nome: 'Prompt Engineering', nivel: 'core' },
      { nome: 'Automações com IA', nivel: 'forte' },
      { nome: 'Conteúdo com IA', nivel: 'core' }
    ]
  }
];
