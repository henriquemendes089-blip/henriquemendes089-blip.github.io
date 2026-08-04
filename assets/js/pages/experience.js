/* ============================================================
   PÁGINA / EXPERIÊNCIA — pages/experiencia.html?id=ID
   Monta a página inteira a partir de data/experiences.js.
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
        '<h1 class="h2">Experiência não encontrada</h1>' +
        '<p class="lead">O registro que você procura não existe ou foi renomeado.</p>' +
        '<a class="btn btn--primary" href="' + root() + 'index.html#experiencia">' +
          'Ver a trajetória completa' + PM.icon('arrow-right', 'btn__icon btn__icon--arrow') +
        '</a>' +
      '</div></div>';
  }

  function seo(x) {
    const titulo = x.cargo + ' · ' + x.empresa + ' — ' + PM.profile.nome;
    document.title = titulo;

    const set = (sel, attr, value) => {
      const node = qs(sel);
      if (node) node.setAttribute(attr, value);
    };
    set('meta[name="description"]', 'content', x.resumo);
    set('meta[property="og:title"]', 'content', titulo);
    set('meta[property="og:description"]', 'content', x.resumo);
    set('meta[name="twitter:title"]', 'content', titulo);
    set('meta[name="twitter:description"]', 'content', x.resumo);

    const canonical = qs('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', location.href.split('#')[0]);
  }

  function block(id, index, titulo, content) {
    const s = el('section', { class: 'page-block', id: id });
    s.innerHTML = '<h2 class="page-block__title" data-index="' + esc(index) + '">' + esc(titulo) + '</h2>';
    s.appendChild(content);
    return s;
  }

  function render() {
    const host = qs('#experience-page');
    if (!host || !PM.experiences) return;

    const id = param('id');
    const idx = PM.experiences.findIndex((x) => x.id === id);
    const x = PM.experiences[idx];

    if (!x) { notFound(host); return; }
    seo(x);

    /* --- HERO --- */
    const hero = el('header', { class: 'page-hero' });
    hero.innerHTML =
      '<div class="container">' +
        '<div class="page-hero__inner">' +
          '<nav class="breadcrumb" aria-label="Você está aqui">' +
            '<a href="' + root() + 'index.html">Início</a><span>/</span>' +
            '<a href="' + root() + 'index.html#experiencia">Experiência</a><span>/</span>' +
            '<strong>' + esc(x.empresa) + '</strong>' +
          '</nav>' +
          '<div class="page-hero__meta">' +
            (x.atual
              ? '<span class="badge badge--live"><i class="dot dot--pulse"></i>Atual</span>'
              : '<span class="badge">' + esc(x.periodo) + '</span>') +
            '<span class="chip">' + esc(x.tipo) + '</span>' +
            '<span class="chip">' + esc(x.local) + '</span>' +
          '</div>' +
          '<h1 class="page-hero__title">' + esc(x.empresa) + '</h1>' +
          '<p class="page-hero__sub"><strong style="color:var(--accent-soft);font-weight:500">' +
            esc(x.cargo) + '</strong> — ' + esc(x.resumo) + '</p>' +
          '<dl class="factsheet">' +
            '<div class="factsheet__cell"><dt>Período</dt><dd>' + esc(x.periodo) + '</dd></div>' +
            '<div class="factsheet__cell"><dt>Vínculo</dt><dd>' + esc(x.tipo) + '</dd></div>' +
            '<div class="factsheet__cell"><dt>Local</dt><dd>' + esc(x.local) + '</dd></div>' +
            '<div class="factsheet__cell"><dt>Frentes</dt><dd>' + (x.responsabilidades || []).length + ' áreas</dd></div>' +
          '</dl>' +
        '</div>' +
      '</div>';

    /* --- CORPO --- */
    const body = el('div', { class: 'page-body' });
    const container = el('div', { class: 'container' });
    const layout = el('div', { class: 'page-layout' });
    const main = el('div', {});
    const blocks = [];

    if (x.contexto) {
      const prose = el('div', { class: 'page-prose', 'data-reveal': 'fade' });
      prose.innerHTML = '<p>' + esc(x.contexto) + '</p>';

      if (x.destaque) {
        const hl = el('div', { class: 'exp-card__highlight', style: 'margin-top:var(--sp-6);max-width:70ch' });
        hl.innerHTML =
          '<b>' + esc(x.destaque.valor) + '</b>' +
          '<div><span>' + esc(x.destaque.label) + '</span>' +
          (x.destaque.detalhe ? '<small>' + esc(x.destaque.detalhe) + '</small>' : '') + '</div>';
        prose.appendChild(hl);
      }
      blocks.push({ id: 'contexto', label: 'Contexto', node: block('contexto', '01', 'Contexto', prose) });
    }

    if (x.responsabilidades && x.responsabilidades.length) {
      const tags = el('div', { class: 'skill-card__items', 'data-reveal': 'fade' });
      tags.innerHTML = x.responsabilidades
        .map((r) => '<span class="tag tag--core">' + esc(r) + '</span>').join('');
      blocks.push({ id: 'responsabilidades', label: 'Responsabilidades', node: block('responsabilidades', '02', 'Responsabilidades', tags) });
    }

    if (x.entregas && x.entregas.length) {
      const ul = el('ul', { class: 'checklist checklist--solution', 'data-reveal-group': '60' });
      ul.innerHTML = x.entregas.map((t) => '<li data-reveal="fade">' + esc(t) + '</li>').join('');
      blocks.push({ id: 'entregas', label: 'Entregas', node: block('entregas', '03', 'O que foi entregue', ul) });
    }

    if (x.resultados && x.resultados.length) {
      const grid = el('div', { class: 'result-grid', 'data-reveal-group': '70' });
      grid.innerHTML = x.resultados.map((r) =>
        '<article class="result-card" data-reveal="fade">' +
          '<b>' + esc(r.valor) + '</b><span>' + esc(r.label) + '</span>' +
          (r.detalhe ? '<small>' + esc(r.detalhe) + '</small>' : '') +
        '</article>'
      ).join('');
      blocks.push({ id: 'resultados', label: 'Resultados', node: block('resultados', '04', 'Resultados', grid) });
    }

    blocks.push({
      id: 'registros', label: 'Registros',
      node: block('registros', '05', 'Registros', PM.gallery.gallery(x.galeria, {
        mark: x.empresa.charAt(0).toUpperCase(),
        emptyText: 'Espaço pronto para prints de campanha, artes e fotos desta experiência.',
        emptyHint: 'data/experiences.js → galeria[]'
      }))
    });

    blocks.forEach((b) => main.appendChild(b.node));

    const aside = el('aside', { class: 'page-aside' });
    aside.innerHTML =
      '<nav class="toc" aria-label="Seções da experiência">' +
        '<h2>Nesta página</h2>' +
        blocks.map((b) => '<a href="#' + b.id + '">' + esc(b.label) + '</a>').join('') +
      '</nav>';

    layout.appendChild(main);
    layout.appendChild(aside);
    container.appendChild(layout);

    /* --- Navegação entre experiências --- */
    const prev = PM.experiences[idx - 1];
    const next = PM.experiences[idx + 1];
    const nav = el('nav', { class: 'page-nav', 'aria-label': 'Outras experiências' });
    nav.innerHTML = navItem(prev, 'prev') + navItem(next, 'next');
    container.appendChild(nav);

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
        '<span class="page-nav__title dim">Fim da trajetória</span></div>';
    }
    const label = dir === 'prev'
      ? PM.icon('arrow-left') + 'Mais recente'
      : 'Anterior' + PM.icon('arrow-right');
    return '<a class="page-nav__item page-nav__item--' + dir + '" href="' + PM.expURL(item.id) + '">' +
      '<span class="page-nav__label">' + label + '</span>' +
      '<span class="page-nav__title">' + esc(item.empresa) + '</span></a>';
  }

  function ctaBand() {
    const p = PM.profile;
    const band = el('section', { class: 'cta-band', 'data-reveal': 'scale' });
    band.innerHTML =
      '<span class="eyebrow">Vamos conversar</span>' +
      '<h2>Posso fazer isso pela sua empresa.</h2>' +
      '<p>Se o cenário acima parece com o seu, me chame — o primeiro passo é entender onde está a oportunidade.</p>' +
      '<div class="cta-band__actions">' +
        '<a class="btn btn--wa btn--lg" href="' + esc(p.contato.whatsapp.href) + '" target="_blank" rel="noopener">' +
          PM.icon('whatsapp', 'btn__icon') + 'Falar no WhatsApp</a>' +
        '<a class="btn btn--ghost btn--lg" href="' + root() + 'index.html#experiencia">Ver toda a trajetória' +
          PM.icon('arrow-right', 'btn__icon btn__icon--arrow') + '</a>' +
      '</div>';
    return band;
  }

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

  PM.pageExperience = render;
})();
