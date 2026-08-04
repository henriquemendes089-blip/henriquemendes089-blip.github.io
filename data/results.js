/**
 * RESULTADOS — dashboard de métricas.
 *
 * Basta trocar o `valor` de cada card: o contador anima sozinho.
 * `serie` desenha o mini-gráfico do card (7 a 12 números, escala livre).
 * `status: 'pendente'` mostra o card em modo "aguardando dado".
 */
window.PM = window.PM || {};

window.PM.resultsIntro = {
  eyebrow: 'Resultados',
  titulo: 'Números que sustentam a conversa.',
  tituloDestaque: 'conversa',
  texto: 'Painel vivo da operação. Cada métrica abaixo é atualizada conforme os projetos avançam — sem estimativa, sem número inflado.'
};

/*
 * `serie` desenha o mini-gráfico do card. Ela representa a CURVA de
 * evolução da métrica — não são valores diários exatos. O gráfico não
 * tem eixo nem rótulo justamente por isso: comunica tendência, não dado.
 */
window.PM.results = [
  {
    id: 'alcance',
    valor: 168050,
    sufixo: '',
    label: 'Contas alcançadas',
    detalhe: 'Pessoas impactadas pelas campanhas no Meta Ads',
    icone: 'target',
    status: 'ativo',
    destaque: true,
    serie: [7450, 10952, 15566, 22169, 25556, 108436, 168050]
  },
  {
    id: 'visualizacoes',
    valor: 435900,
    sufixo: '',
    label: 'Visualizações geradas',
    detalhe: 'Conteúdo exibido no Instagram e Facebook',
    icone: 'play',
    status: 'ativo',
    destaque: true,
    serie: [18000, 62000, 105000, 158000, 240000, 340000, 435900]
  },
  {
    id: 'seguidores',
    valor: 3380,
    sufixo: '+',
    label: 'Seguidores gerados',
    detalhe: 'Somando os perfis gerenciados, orgânico e impulsionado',
    icone: 'users',
    status: 'ativo',
    destaque: true,
    serie: [53, 420, 980, 1600, 2200, 2900, 3380]
  },
  {
    id: 'campanhas',
    valor: 6,
    sufixo: '',
    label: 'Campanhas gerenciadas',
    detalhe: 'Tráfego, mensagem e sorteio — com verba e resultado auditáveis',
    icone: 'megaphone',
    status: 'ativo',
    destaque: true,
    serie: [1, 2, 2, 3, 4, 5, 6]
  },
  {
    id: 'conversas',
    valor: 139,
    sufixo: '',
    label: 'Conversas iniciadas',
    detalhe: 'Contatos diretos abertos pelas campanhas de mensagem',
    icone: 'check',
    status: 'ativo',
    serie: [7, 17, 24, 39, 63, 98, 139]
  },
  {
    id: 'cliques',
    valor: 5400,
    sufixo: '',
    label: 'Cliques no link',
    detalhe: 'Tráfego enviado ao link da bio e às páginas de captação',
    icone: 'browser',
    status: 'ativo',
    serie: [180, 620, 1150, 1900, 2900, 4100, 5400]
  },
  {
    id: 'clientes',
    valor: 0,
    sufixo: '',
    label: 'Clientes atendidos',
    detalhe: 'Empresas e profissionais em operação contínua',
    icone: 'briefcase',
    status: 'pendente',
    serie: [1, 1, 2, 2, 3, 4, 5]
  },
  {
    id: 'videos',
    valor: 0,
    sufixo: '',
    label: 'Vídeos produzidos',
    detalhe: 'Captação, roteiro e edição para social e mídia paga',
    icone: 'film',
    status: 'pendente',
    serie: [2, 5, 4, 8, 10, 9, 13]
  }
];
