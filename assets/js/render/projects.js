/* ============================================================
   RENDER / PROJETOS — grade assimétrica + filtros por categoria.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, qsa, el, esc, root } = PM.util;

  function pageURL(slug) {
    return root() + 'projects/projeto.html?slug=' + encodeURIComponent(slug);
  }

  /* ------------------------------------------------------------
     Card de projeto
     ------------------------------------------------------------ */
  function card(p) {
    const article = el('article', {
      class: 'project-card card--spot',
      'data-cat': p.categoria,
      'data-destaque': p.destaque ? '1' : '0',
      'data-reveal': 'fade'
    });

    const capa = (p.galeria && p.galeria[0] && p.galeria[0].src) || p.capa || '';

    const mediaWrap = el('div', { class: 'project-card__media' });
    mediaWrap.appendChild(PM.media({
      src: capa,
      alt: p.titulo,
      // a proporção final é definida pelo CSS conforme o card seja largo ou não
      ratio: 'ratio-16-9',
      mark: p.titulo.charAt(0).toUpperCase(),
      placeholder: 'Capa em breve'
    }));

    mediaWrap.insertAdjacentHTML('afterbegin',
      '<div class="project-card__badges">' +
        '<span class="badge">' + esc(p.categoriaLabel) + '</span>' +
        (p.status === 'em-breve'
          ? '<span class="badge badge--soon">Case em preparação</span>'
          : '<span class="badge badge--live"><i class="dot"></i>Publicado</span>') +
      '</div>');

    const tech = (p.tecnologias || []).slice(0, 4)
      .map((t) => '<span>' + esc(t) + '</span>').join('');

    const metric = p.metricaCard
      ? '<div class="project-card__metric">' +
          '<b>' + esc(p.metricaCard.valor) + '</b>' +
          '<span>' + esc(p.metricaCard.label) + '</span>' +
        '</div>'
      : '';

    const body = el('div', { class: 'project-card__body' });
    body.innerHTML =
      '<div>' +
        '<div class="project-card__head">' +
          '<h3 class="project-card__title">' + esc(p.titulo) + '</h3>' +
          '<p class="project-card__sub">' + esc(p.subtitulo) + '</p>' +
        '</div>' +
        '<p class="project-card__text" style="margin-top:var(--sp-4)">' + esc(p.resumo) + '</p>' +
      '</div>' +
      metric;

    const foot = el('div', { class: 'project-card__foot' });
    foot.innerHTML =
      '<div class="project-card__tech">' + tech + '</div>' +
      '<a class="project-card__go stretch" href="' + pageURL(p.slug) + '">' +
        'Ver case' + PM.icon('arrow-up-right') +
      '</a>';

    article.appendChild(mediaWrap);
    article.appendChild(body);
    article.appendChild(el('div', { style: 'padding:0 var(--sp-6) var(--sp-6)' }, foot));
    return article;
  }

  /* ------------------------------------------------------------
     Layout auto-balanceado
     Regra: o primeiro card ocupa a linha inteira; os demais vão a dois
     por linha. Se sobrar um ímpar no fim, ele também ocupa a linha —
     assim a grade nunca fica com um buraco, em qualquer quantidade
     de projetos ou filtro aplicado.
     ------------------------------------------------------------ */
  function layout(grid) {
    const visible = qsa('.project-card:not(.is-hidden)', grid);
    visible.forEach((c) => c.classList.remove('project-card--wide'));
    if (!visible.length) return;

    visible[0].classList.add('project-card--wide');

    const rest = visible.slice(1);
    if (rest.length % 2 === 1) rest[rest.length - 1].classList.add('project-card--wide');
  }

  /* ------------------------------------------------------------
     Grade + filtros
     ------------------------------------------------------------ */
  function render() {
    const grid = qs('#projects-grid');
    const filters = qs('#projects-filters');
    const counter = qs('#projects-count');
    if (!grid || !PM.projects) return;

    PM.projects.forEach((p) => grid.appendChild(card(p)));
    layout(grid);
    PM.util.spotlight(qsa('.project-card', grid));

    const setCount = (n) =>
      counter && (counter.textContent = String(n).padStart(2, '0') + ' ' + (n === 1 ? 'projeto' : 'projetos'));

    setCount(PM.projects.length);

    if (!filters || !PM.projectCategories) return;

    // Só exibe categorias que realmente possuem projetos.
    const used = PM.projectCategories.filter((c) =>
      c.id === 'todos' || PM.projects.some((p) => p.categoria === c.id)
    );

    filters.innerHTML = used.map((c, i) =>
      '<button class="filter' + (i === 0 ? ' is-active' : '') + '" type="button" data-filter="' +
      esc(c.id) + '">' + esc(c.label) + '</button>'
    ).join('');

    let empty = null;

    qsa('.filter', filters).forEach((btn) => {
      btn.addEventListener('click', () => {
        qsa('.filter', filters).forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const cat = btn.dataset.filter;
        let visible = 0;

        qsa('.project-card', grid).forEach((c) => {
          const show = cat === 'todos' || c.dataset.cat === cat;
          c.classList.toggle('is-hidden', !show);
          if (show) visible++;
        });

        setCount(visible);
        layout(grid);

        if (!visible) {
          if (!empty) {
            empty = el('p', {
              class: 'projects__empty',
              text: 'Nenhum projeto nesta categoria ainda.'
            });
          }
          grid.appendChild(empty);
        } else if (empty && empty.parentNode) {
          empty.remove();
        }
      });
    });
  }

  PM.renderProjects = render;
  PM.projectURL = pageURL;
})();
