/**
 * PERFIL — Fonte única de verdade sobre a identidade.
 * Alterar aqui reflete em todas as páginas do site.
 */
window.PM = window.PM || {};
window.PM.profile = {
  nome: 'Henrique Mendes',
  primeiroNome: 'Henrique',
  iniciais: 'HM',
  headline: 'Marketing Strategist • AI Specialist • Traffic Manager',
  papeis: ['Marketing Strategist', 'AI Specialist', 'Traffic Manager'],
  frase: 'Transformando estratégia, criatividade e inteligência artificial em crescimento real para empresas.',
  fraseDestaque: 'real',
  local: 'Brasil · Atendimento remoto',
  disponibilidade: 'Disponível para novos projetos',

  // Foto da seção Sobre. Se o arquivo não existir, o site exibe
  // automaticamente um monograma elegante no lugar.
  foto: 'assets/images/henrique-mendes.jpg',
  fotoAlt: 'Henrique Mendes em sua estação de trabalho, analisando conteúdo no celular',
  // Deve bater com a proporção do arquivo para a imagem não ser cortada:
  // ratio-1-1 (quadrada) · ratio-3-4 (vertical) · ratio-4-3 (horizontal)
  fotoProporcao: 'ratio-1-1',

  // Colocar o PDF em assets/docs/ mantendo este nome.
  curriculo: 'assets/docs/henrique-mendes-curriculo.pdf',

  contato: {
    whatsapp: {
      label: 'WhatsApp',
      valor: '+55 11 93774-3705',
      raw: '5511937743705',
      href: 'https://wa.me/5511937743705?text=Ol%C3%A1%20Henrique!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.',
      descricao: 'Resposta rápida, direto no celular'
    },
    instagram: {
      label: 'Instagram',
      valor: '@henriquemendes.ads',
      raw: 'henriquemendes.ads',
      href: 'https://instagram.com/henriquemendes.ads',
      descricao: 'Bastidores, conteúdo e resultados'
    },
    email: {
      label: 'E-mail',
      valor: 'henriquemendes089@gmail.com',
      raw: 'henriquemendes089@gmail.com',
      href: 'mailto:henriquemendes089@gmail.com?subject=Projeto%20-%20contato%20pelo%20portf%C3%B3lio',
      descricao: 'Para propostas e materiais'
    }
  },

  sobre: {
    titulo: 'Marketing não é só criatividade.',
    tituloDestaque: 'É método.',
    paragrafos: [
      'Não acredito que marketing seja apenas criatividade. Acredito em estratégia, dados, otimização contínua e execução.',
      'Durante minha trajetória desenvolvi campanhas, estratégias comerciais, produção audiovisual, gestão de tráfego, criação de conteúdo e soluções utilizando Inteligência Artificial para acelerar resultados de empresas.',
      'Meu maior diferencial é identificar oportunidades de melhoria dentro dos processos e transformá-las em crescimento para o negócio.',
      'Sou proativo, organizado e colaborativo, sempre buscando agregar valor além da função que desempenho.'
    ],
    pilares: [
      { titulo: 'Estratégia', texto: 'Diagnóstico antes de execução. Todo investimento precisa de uma tese por trás.' },
      { titulo: 'Dados', texto: 'Métrica que não gera decisão é enfeite. Leio números para agir, não para relatar.' },
      { titulo: 'Execução', texto: 'Da ideia ao ar. Campanha, criativo, vídeo, página e otimização — mão na massa.' },
      { titulo: 'Inteligência Artificial', texto: 'IA como multiplicador de velocidade e volume, sem perder o padrão de qualidade.' }
    ]
  },

  // Chips exibidos ao lado da foto na seção Sobre
  destaques: [
    { valor: '5+', label: 'anos em marketing e vendas' },
    { valor: '2.5K+', label: 'seguidores gerados em 5 meses' },
    { valor: '4', label: 'operações estruturadas do zero' }
  ],

  seo: {
    titulo: 'Henrique Mendes — Marketing Strategist, AI Specialist & Traffic Manager',
    descricao: 'Portfólio de Henrique Mendes: estratégia de marketing, gestão de tráfego, Meta Ads, produção audiovisual e inteligência artificial aplicada ao crescimento de empresas.',
    keywords: 'Henrique Mendes, marketing estratégico, gestor de tráfego, Meta Ads, especialista em IA, social media, produção de vídeo, growth, portfólio',
    url: 'https://henriquemendes089-blip.github.io/',
    imagem: 'assets/images/og-cover.jpg'
  }
};
