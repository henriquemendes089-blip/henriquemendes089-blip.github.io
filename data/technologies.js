/**
 * TECNOLOGIAS — logos animados na esteira e na grade.
 *
 * ─────────────────────────────────────────────────────────────
 * SOBRE OS ÍCONES
 * ─────────────────────────────────────────────────────────────
 * Cada tecnologia usa um glifo geométrico próprio (desenhado aqui),
 * evitando reproduzir marcas registradas de forma incorreta.
 *
 * Para usar o logo OFICIAL de uma marca:
 *   1. Baixe o SVG oficial (ex.: simpleicons.org).
 *   2. Salve em  assets/icons/tech/ID.svg  (mesmo `id` do item).
 *   3. Adicione  logoOficial: true  no item correspondente abaixo.
 *   O site passa a exibir o arquivo; se ele falhar, o glifo padrão volta.
 *   (Sem essa marcação o site não procura o arquivo — evita 404 inútil.)
 *
 * `svg` recebe o conteúdo INTERNO de um <svg viewBox="0 0 24 24">.
 */
window.PM = window.PM || {};

window.PM.techIntro = {
  eyebrow: 'Stack',
  titulo: 'As ferramentas que colocam a estratégia no ar.',
  tituloDestaque: 'no ar',
  texto: 'Ferramenta não é diferencial — o que se faz com ela é. Este é o conjunto que uso no dia a dia da operação.'
};

window.PM.technologies = [
  {
    id: 'claude',
    nome: 'Claude',
    categoria: 'Inteligência Artificial',
    descricao: 'Estratégia, copy longa, análise e construção de automações.',
    site: 'https://claude.ai',
    svg: '<g fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><path d="M12 3.4v17.2"/><path d="M3.4 12h17.2"/><path d="M5.9 5.9l12.2 12.2"/><path d="M18.1 5.9L5.9 18.1"/></g>'
  },
  {
    id: 'chatgpt',
    nome: 'ChatGPT',
    categoria: 'Inteligência Artificial',
    descricao: 'Ideação rápida, variações de criativo e apoio operacional.',
    site: 'https://chat.openai.com',
    svg: '<path d="M12 2.7 20 7.3v9.4L12 21.3 4 16.7V7.3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="12" r="2.7" fill="currentColor"/>'
  },
  {
    id: 'gemini',
    nome: 'Gemini',
    categoria: 'Inteligência Artificial',
    descricao: 'Pesquisa, leitura de contexto e apoio multimodal.',
    site: 'https://gemini.google.com',
    svg: '<path d="M12 2c0 5.52 4.48 10 10 10-5.52 0-10 4.48-10 10 0-5.52-4.48-10-10-10 5.52 0 10-4.48 10-10Z" fill="currentColor"/>'
  },
  {
    id: 'veo',
    nome: 'VEO',
    categoria: 'Vídeo com IA',
    descricao: 'Geração e apoio à criação de peças audiovisuais.',
    site: 'https://deepmind.google/technologies/veo/',
    svg: '<circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.2 8.5 16 12l-5.8 3.5z" fill="currentColor"/>'
  },
  {
    id: 'meta-ads',
    nome: 'Meta Ads',
    categoria: 'Mídia paga',
    descricao: 'Captação, remarketing e reconhecimento no Facebook e Instagram.',
    site: 'https://business.facebook.com',
    svg: '<path d="M3.3 12c0-2.8 1.7-4.9 3.9-4.9 2.6 0 4 2.6 4.8 4.9.8 2.3 2.2 4.9 4.8 4.9 2.2 0 3.9-2.1 3.9-4.9s-1.7-4.9-3.9-4.9c-2.6 0-4 2.6-4.8 4.9-.8 2.3-2.2 4.9-4.8 4.9-2.2 0-3.9-2.1-3.9-4.9Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'
  },
  {
    id: 'canva',
    nome: 'Canva',
    categoria: 'Design',
    descricao: 'Criação de artes, identidade e peças para redes sociais.',
    site: 'https://canva.com',
    svg: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M15.1 9.3a3.5 3.5 0 0 0-5.8 1.2c-.8 2.4.2 4.5 2 4.8 1.3.2 2.5-.6 3.1-1.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'
  },
  {
    id: 'capcut',
    nome: 'CapCut',
    categoria: 'Edição de vídeo',
    descricao: 'Edição de vídeos verticais e criativos de performance.',
    site: 'https://capcut.com',
    svg: '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="7" cy="17.3" r="2.4"/><circle cx="17" cy="17.3" r="2.4"/><path d="M8.7 15.5 17.4 4.7M15.3 15.5 6.6 4.7"/></g>'
  }
];
