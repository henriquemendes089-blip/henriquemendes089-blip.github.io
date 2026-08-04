/* ============================================================
   RENDER / HABILIDADES — cards por categoria, sem barras de progresso.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, qsa, el, esc } = PM.util;

  const ICONS = {
    strategy: 'strategy',
    palette: 'palette',
    film: 'film',
    spark: 'spark'
  };

  function render() {
    const grid = qs('#skills-grid');
    if (!grid || !PM.skills) return;

    PM.skills.forEach((cat) => {
      const items = cat.itens.map((s) =>
        '<span class="tag' + (s.nivel === 'core' ? ' tag--core' : '') + '">' + esc(s.nome) + '</span>'
      ).join('');

      const card = el('article', { class: 'skill-card', 'data-reveal': 'fade' });
      card.innerHTML =
        '<div class="skill-card__head">' +
          '<span class="skill-card__index">' + esc(cat.indice) + '</span>' +
          '<div>' +
            '<h3 class="skill-card__title">' + esc(cat.titulo) + '</h3>' +
            '<p class="skill-card__desc">' + esc(cat.descricao) + '</p>' +
          '</div>' +
          '<span class="card__icon" style="margin-left:auto;flex-shrink:0">' +
            PM.icon(ICONS[cat.icone] || 'layers') +
          '</span>' +
        '</div>' +
        '<div class="skill-card__items">' + items + '</div>';

      grid.appendChild(card);
    });

    PM.util.spotlight(qsa('.skill-card', grid));
  }

  PM.renderSkills = render;
})();
