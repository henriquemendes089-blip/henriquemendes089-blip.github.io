/* ============================================================
   RENDER / EXPERIÊNCIA — timeline da home.
   Cada item aponta para sua página individual.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, el, esc, root } = PM.util;

  function pageURL(id) {
    return root() + 'pages/experiencia.html?id=' + encodeURIComponent(id);
  }

  function render() {
    const host = qs('#timeline');
    if (!host || !PM.experiences) return;

    host.innerHTML = '<div class="timeline__rail"><span class="timeline__rail-fill"></span></div>';

    PM.experiences.forEach((x) => {
      const item = el('article', { class: 'timeline__item', 'data-reveal': 'fade' });

      const tags = (x.tags || [])
        .map((t) => '<span class="tag">' + esc(t) + '</span>').join('');

      const highlight = x.destaque
        ? '<div class="exp-card__highlight">' +
            '<b>' + esc(x.destaque.valor) + '</b>' +
            '<div>' +
              '<span>' + esc(x.destaque.label) + '</span>' +
              (x.destaque.detalhe ? '<small>' + esc(x.destaque.detalhe) + '</small>' : '') +
            '</div>' +
          '</div>'
        : '';

      item.innerHTML =
        '<span class="timeline__node" aria-hidden="true"></span>' +
        '<div class="exp-card card--spot">' +
          '<div class="exp-card__top">' +
            '<div>' +
              '<h3 class="exp-card__company">' + esc(x.empresa) + '</h3>' +
              '<p class="exp-card__role">' + esc(x.cargo) + '</p>' +
              '<p class="exp-card__meta">' + esc(x.tipo) + ' · ' + esc(x.local) + '</p>' +
            '</div>' +
            '<span class="exp-card__period">' +
              (x.atual ? '<i class="dot dot--pulse" style="color:var(--ok)"></i>' : '') +
              esc(x.periodo) +
            '</span>' +
          '</div>' +
          '<p class="exp-card__summary">' + esc(x.resumo) + '</p>' +
          highlight +
          '<div class="exp-card__tags">' + tags + '</div>' +
          '<div class="exp-card__foot">' +
            '<span class="mono dim">' + (x.responsabilidades || []).length + ' frentes de atuação</span>' +
            '<a class="exp-card__more" href="' + pageURL(x.id) + '">' +
              'Ver detalhes' + PM.icon('arrow-right') +
            '</a>' +
          '</div>' +
        '</div>';

      host.appendChild(item);
    });

    PM.util.spotlight(PM.util.qsa('.exp-card', host));
  }

  PM.renderExperience = render;
  PM.expURL = pageURL;
})();
