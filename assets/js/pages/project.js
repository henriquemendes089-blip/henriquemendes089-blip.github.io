/* ============================================================
   PÁGINA / PROJETO — projects/projeto.html?slug=SLUG
   Monta a página inteira a partir de data/projects.js.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, qsa, el, esc, root } = PM.util;

  function param(name) {
    return new URLSearchParams(location.search).get(name);
  }

  function notFound(host) {
    host.innerHTML =
      '<div class="container"><div class="state">' +
        '<h1 class="h2">Projeto não encontrado</h1>' +
        '<p class="lead">O case que você procura não existe ou foi renomeado.</p>' +
        '<a class="btn btn--primary" href="' + root() + 'index.html#projetos">' +
          'Ver todos os projetos' + PM.icon('arrow-right', 'btn__icon btn__icon--arrow') +
        '</a>' +
      '</div></div>';
  }

  /* ------------------------------------------------------------
     SEO dinâmico — título, descrição, canonical e Open Graph.
     ------------------------------------------------------------ */
  function seo(p) {
    const titulo = p.titulo + ' — Projeto de ' + PM.profile.nome;
    document.title = titulo;

    const set = (sel, attr, value) => {
      const node = qs(sel);
      if (node) node.setAttribute(attr, value);
    };
    set('meta[name="description"]', 'content', p.resumo);
    set('meta[property="og:title"]', 'content', titulo);
    set('meta[property="og:description"]', 'content', p.resumo);
    set('meta[name="twitter:title"]', 'content', titulo);
    set('meta[name="twitter:description"]', 'content', p.resumo);

    const canonical = qs('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', location.href.split('#')[0]);

    // Schema.org do case
    const ld = el('script', { type: 'application/ld+json' });
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: p.titulo,
      description: p.resumo,
      author: { '@type': 'Person', name: PM.profile.nome },
      dateCreated: String(p.ano),
      keywords: (p.tecnologias || []).join(', ')
    });
    document.head.appendChild(ld);
  }

  /* ------------------------------------------------------------
     Blocos reutilizáveis
     ------------------------------------------------------------ */
  function block(id, index, titulo, content) {
    const s = el('section', { class: 'page-block', id: id });
    s.innerHTML = '<h2 class="page-block__title" data-index="' + esc(index) + '">' + esc(titulo) + '</h2>';
    s.appendChild(content);
    return s;
  }

  function list(arr, modifier) {
    const ul = el('ul', { class: 'checklist' + (modifier ? ' checklist--' + modifier : ''), 'data-reveal-group': '60' });
    ul.innerHTML = arr.map((t) => '<li data-reveal="fade">' + esc(t) + '</li>').join('');
    return ul;
  }

  function results(arr) {
    const wrap = el('div', { class: 'result-grid', 'data-reveal-group': '70' });
    wrap.innerHTML = arr.map((r) =>
      '<article class="result-card" data-reveal="fade">' +
        '<b>' + esc(r.valor) + '</b>' +
        '<span>' + esc(r.label) + '</span>' +
        (r.detalhe ? '<small>' + esc(r.detalhe) + '</small>' : '') +
      '</article>'
    ).join('');
    return wrap;
  }

  /* ------------------------------------------------------------
     Render principal
     ------------------------------------------------------------ */
  function render() {
    const host = qs('#project-page');
    if (!host || !PM.projects) return;

    const slug = param('slug');
    const idx = PM.projects.findIndex((p) => p.slug === slug);
    const p = PM.projects[idx];

    if (!p) { notFound(host); return; }
    seo(p);

    /* --- HERO --- */
    const hero = el('header', { class: 'page-hero' });
    const links = (p.links || []).filter((l) => l.href && l.href !== '#');

    hero.innerHTML =
      '<div class="container">' +
        '<div class="page-hero__inner">' +
          '<nav class="breadcrumb" aria-label="Você está aqui">' +
            '<a href="' + root() + 'index.html">Início</a><span>/</span>' +
            '<a href="' + root() + 'index.html#projetos">Projetos</a><span>/</span>' +
            '<strong>' + esc(p.titulo) + '</strong>' +
          '</nav>' +
          '<div class="page-hero__meta">' +
            '<span class="chip chip--accent">' + esc(p.categoriaLabel) + '</span>' +
            '<span class="chip">' + esc(p.ano) + '</span>' +
            (p.status === 'em-breve'
              ? '<span class="badge badge--soon">Case em preparação</span>'
              : '<span class="badge badge--live"><i class="dot"></i>Publicado</span>') +
          '</div>' +
          '<h1 class="page-hero__title">' + esc(p.titulo) + '</h1>' +
          '<p class="page-hero__sub">' + esc(p.subtitulo) + '</p>' +
          (links.length
            ? '<div class="page-hero__actions">' + links.map((l) =>
                '<a class="btn ' + (l.principal ? 'btn--primary' : 'btn--ghost') + '" href="' + esc(l.href) +
                '" target="_blank" rel="noopener noreferrer">' + esc(l.label) +
                PM.icon('external', 'btn__icon') + '</a>').join('') + '</div>'
            : '') +
          '<dl class="factsheet">' +
            '<div class="factsheet__cell"><dt>Cliente</dt><dd>' + esc(p.cliente) + '</dd></div>' +
            '<div class="factsheet__cell"><dt>Período</dt><dd>' + esc(p.ano) + '</dd></div>' +
            '<div class="factsheet__cell"><dt>Atuação</dt><dd>' + esc(p.papel) + '</dd></div>' +
            '<div class="factsheet__cell"><dt>Ferramentas</dt><dd>' + esc((p.tecnologias || []).join(' · ')) + '</dd></div>' +
          '</dl>' +
        '</div>' +
      '</div>';

    /* --- CORPO --- */
    const body = el('div', { class: 'page-body' });
    const container = el('div', { class: 'container' });
    const layout = el('div', { class: 'page-layout' });
    const main = el('div', {});

    const blocks = [];

    if (p.descricao && p.descricao.length) {
      const prose = el('div', { class: 'page-prose', 'data-reveal': 'fade' });
      prose.innerHTML = p.descricao.map((t) => '<p>' + esc(t) + '</p>').join('');
      blocks.push({ id: 'visao-geral', label: 'Visão geral', node: block('visao-geral', '01', 'Visão geral', prose) });
    }
    if (p.objetivos && p.objetivos.length) {
      blocks.push({ id: 'objetivos', label: 'Objetivos', node: block('objetivos', '02', 'Objetivos', list(p.objetivos)) });
    }
    if (p.desafios && p.desafios.length) {
      blocks.push({ id: 'desafios', label: 'Desafios', node: block('desafios', '03', 'Desafios', list(p.desafios, 'challenge')) });
    }
    if (p.solucoes && p.solucoes.length) {
      blocks.push({ id: 'solucoes', label: 'Soluções', node: block('solucoes', '04', 'Soluções', list(p.solucoes, 'solution')) });
    }
    if (p.resultados && p.resultados.length) {
      blocks.push({ id: 'resultados', label: 'Resultados', node: block('resultados', '05', 'Resultados', results(p.resultados)) });
    }

    blocks.push({
      id: 'galeria', label: 'Galeria',
      node: block('galeria', '06', 'Galeria', PM.gallery.gallery(p.galeria, {
        mark: p.titulo.charAt(0).toUpperCase(),
        emptyText: 'Galeria pronta para receber prints, mockups e fotos deste projeto.',
        emptyHint: 'data/projects.js → galeria[]'
      }))
    });

    blocks.push({
      id: 'videos', label: 'Vídeos',
      node: block('videos', '07', 'Vídeos', PM.gallery.videos(p.videos, {
        emptyText: 'Suporte a vídeo já configurado: MP4, YouTube e Vimeo, com pôster personalizado.',
        emptyHint: 'data/projects.js → videos[]'
      }))
    });

    if (p.tecnologias && p.tecnologias.length) {
      const tags = el('div', { class: 'skill-card__items', 'data-reveal': 'fade' });
      tags.innerHTML = p.tecnologias.map((t) => '<span class="tag">' + esc(t) + '</span>').join('');
      blocks.push({ id: 'ferramentas', label: 'Ferramentas', node: block('ferramentas', '08', 'Ferramentas utilizadas', tags) });
    }

    blocks.forEach((b) => main.appendChild(b.node));

    /* --- Índice lateral --- */
    const aside = el('aside', { class: 'page-aside' });
    aside.innerHTML =
      '<nav class="toc" aria-label="Seções do projeto">' +
        '<h2>Neste case</h2>' +
        blocks.map((b) => '<a href="#' + b.id + '">' + esc(b.label) + '</a>').join('') +
      '</nav>';

    layout.appendChild(main);
    layout.appendChild(aside);
    container.appendChild(layout);

    /* --- Navegação entre projetos --- */
    const prev = PM.projects[idx - 1];
    const next = PM.projects[idx + 1];
    const nav = el('nav', { class: 'page-nav', 'aria-label': 'Outros projetos' });
    nav.innerHTML =
      navItem(prev, 'prev') + navItem(next, 'next');
    container.appendChild(nav);

    /* --- CTA final --- */
    container.appendChild(ctaBand());

    body.appendChild(container);
    host.appendChild(hero);
    host.appendChild(body);

    initTOC();
  }

  function navItem(item, dir) {
    if (!item) {
      return '<div class="page-nav__item page-nav__item--empty page-nav__item--' + dir + '">' +
        '<span class="page-nav__label">—</span>' +
        '<span class="page-nav__title dim">Fim da lista</span></div>';
    }
    const label = dir === 'prev'
      ? PM.icon('arrow-left') + 'Anterior'
      : 'Próximo' + PM.icon('arrow-right');
    return '<a class="page-nav__item page-nav__item--' + dir + '" href="' + PM.projectURL(item.slug) + '">' +
      '<span class="page-nav__label">' + label + '</span>' +
      '<span class="page-nav__title">' + esc(item.titulo) + '</span></a>';
  }

  function ctaBand() {
    const p = PM.profile;
    const band = el('section', { class: 'cta-band', 'data-reveal': 'scale' });
    band.innerHTML =
      '<span class="eyebrow">Próximo passo</span>' +
      '<h2>Quer um resultado parecido no seu negócio?</h2>' +
      '<p>Me conte o cenário atual e eu retorno com um diagnóstico do que dá para melhorar primeiro.</p>' +
      '<div class="cta-band__actions">' +
        '<a class="btn btn--wa btn--lg" href="' + esc(p.contato.whatsapp.href) + '" target="_blank" rel="noopener">' +
          PM.icon('whatsapp', 'btn__icon') + 'Falar no WhatsApp</a>' +
        '<a class="btn btn--ghost btn--lg" href="' + root() + 'index.html#projetos">Ver outros projetos' +
          PM.icon('arrow-right', 'btn__icon btn__icon--arrow') + '</a>' +
      '</div>';
    return band;
  }

  /* Índice lateral com destaque da seção visível. */
  function initTOC() {
    const links = qsa('.toc a');
    if (!links.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    qsa('.page-block').forEach((b) => io.observe(b));
  }

  PM.pageProject = render;
})();
