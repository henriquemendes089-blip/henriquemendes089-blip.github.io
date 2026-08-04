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

window.PM.results = [
  {
    id: 'seguidores',
    valor: 2500,
    sufixo: '+',
    label: 'Seguidores gerados',
    detalhe: 'Crescimento orgânico e pago em perfis gerenciados',
    icone: 'users',
    status: 'ativo',
    destaque: true,
    serie: [53, 180, 420, 760, 1240, 1780, 2500]
  },
  {
    id: 'leads',
    valor: 0,
    sufixo: '',
    label: 'Leads gerados',
    detalhe: 'Contatos qualificados originados de campanhas',
    icone: 'target',
    status: 'pendente',
    serie: [4, 6, 5, 9, 8, 12, 14]
  },
  {
    id: 'campanhas',
    valor: 0,
    sufixo: '',
    label: 'Campanhas gerenciadas',
    detalhe: 'Meta Ads em captação, remarketing e reconhecimento',
    icone: 'megaphone',
    status: 'pendente',
    serie: [2, 4, 3, 6, 7, 6, 9]
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
    id: 'conversoes',
    valor: 0,
    sufixo: '',
    label: 'Conversões',
    detalhe: 'Ações concluídas no funil: formulário, contato e matrícula',
    icone: 'check',
    status: 'pendente',
    serie: [3, 5, 8, 7, 11, 13, 16]
  },
  {
    id: 'videos',
    valor: 0,
    sufixo: '',
    label: 'Vídeos produzidos',
    detalhe: 'Captação, roteiro e edição para social e mídia paga',
    icone: 'play',
    status: 'pendente',
    serie: [2, 5, 4, 8, 10, 9, 13]
  },
  {
    id: 'sites',
    valor: 0,
    sufixo: '',
    label: 'Sites e landing pages',
    detalhe: 'Páginas construídas com foco em conversão',
    icone: 'browser',
    status: 'pendente',
    serie: [1, 1, 2, 3, 3, 4, 6]
  },
  {
    id: 'roi',
    valor: 0,
    sufixo: 'x',
    label: 'ROI médio',
    detalhe: 'Retorno sobre o investimento em mídia paga',
    icone: 'trending',
    status: 'pendente',
    serie: [1, 1.4, 1.8, 2.1, 2.6, 3.0, 3.4]
  }
];
