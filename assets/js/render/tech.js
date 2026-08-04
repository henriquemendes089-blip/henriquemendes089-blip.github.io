/* ============================================================
   RENDER / TECNOLOGIAS — esteira infinita + grade de cards.
   Usa o logo oficial se existir em assets/icons/tech/<id>.svg;
   caso contrário, mantém o glifo geométrico definido nos dados.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, qsa, el, esc, asset, reduced } = PM.util;

  const svgTag = (inner, cls) =>
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"' +
    (cls ? ' class="' + cls + '"' : '') + '>' + inner + '</svg>';

  /* ------------------------------------------------------------
     Esteira — duplica a lista para o loop ser contínuo.
     ------------------------------------------------------------ */
  function marquee() {
    const host = qs('#tech-marquee');
    if (!host || !PM.technologies) return;

    const chips = PM.technologies.map((t) =>
      '<span class="tech-chip" data-tech="' + esc(t.id) + '">' +
        svgTag(t.svg) + '<span>' + esc(t.nome) + '</span>' +
      '</span>'
    ).join('');

    // Duas cópias: a segunda entra em cena quando a primeira sai.
    host.innerHTML =
      '<div class="marquee__track">' + chips + '</div>' +
      '<div class="marquee__track" aria-hidden="true">' + chips + '</div>';

    if (reduced()) host.querySelectorAll('.marquee__track')[1].remove();
  }

  /* ------------------------------------------------------------
     Grade detalhada
     ------------------------------------------------------------ */
  function grid() {
    const host = qs('#tech-grid');
    if (!host || !PM.technologies) return;

    PM.technologies.forEach((t) => {
      const card = el('a', {
        class: 'tech-card',
        href: t.site || '#',
        target: t.site ? '_blank' : null,
        rel: t.site ? 'noopener noreferrer' : null,
        'data-reveal': 'fade'
      });

      card.innerHTML =
        '<span class="tech-card__logo" data-tech="' + esc(t.id) + '">' + svgTag(t.svg) + '</span>' +
        '<div>' +
          '<h3 class="tech-card__name">' + esc(t.nome) + '</h3>' +
          '<p class="tech-card__cat">' + esc(t.categoria) + '</p>' +
        '</div>' +
        '<p class="tech-card__desc">' + esc(t.descricao) + '</p>';

      host.appendChild(card);
    });
  }

  /* ------------------------------------------------------------
     Troca pelo logo oficial.
     Só é tentada para itens marcados com `logoOficial: true` nos dados
     — assim o site não dispara requisições 404 para arquivos que
     ainda não existem.
     ------------------------------------------------------------ */
  function upgradeLogos() {
    PM.technologies.filter((t) => t.logoOficial).forEach((t) => {
      const url = asset('assets/icons/tech/' + t.id + '.svg');
      const probe = new Image();
      probe.onload = () => {
        qsa('[data-tech="' + t.id + '"]').forEach((slot) => {
          slot.innerHTML =
            '<img src="' + url + '" alt="" width="24" height="24" loading="lazy" ' +
            'style="width:24px;height:24px;object-fit:contain">';
        });
      };
      probe.onerror = () => { /* mantém o glifo padrão */ };
      probe.src = url;
    });
  }

  function render() {
    marquee();
    grid();
    upgradeLogos();
  }

  PM.renderTech = render;
})();
