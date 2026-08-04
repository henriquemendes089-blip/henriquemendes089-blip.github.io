/* ============================================================
   RENDER / SOBRE — retrato, texto e pilares.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, el, esc } = PM.util;

  function render() {
    const host = qs('#sobre-content');
    if (!host) return;
    const p = PM.profile;

    /* --- Coluna do retrato --- */
    const portrait = el('div', { class: 'about__portrait', 'data-reveal': 'left' });
    const frame = el('div', { class: 'about__portrait-frame' });
    frame.appendChild(PM.media({
      // Quadrado: mesma proporção do arquivo, então a foto entra sem corte.
      // Trocando o arquivo por um retrato vertical, use 'ratio-3-4'.
      src: p.foto,
      alt: p.fotoAlt,
      ratio: p.fotoProporcao || 'ratio-1-1',
      mark: p.iniciais,
      placeholder: 'Foto profissional',
      eager: true
    }));
    portrait.appendChild(frame);

    const stats = el('div', { class: 'about__stats' });
    stats.innerHTML = p.destaques.map((d) =>
      '<div class="about__stat"><b>' + esc(d.valor) + '</b><span>' + esc(d.label) + '</span></div>'
    ).join('');
    portrait.appendChild(stats);

    /* --- Coluna de texto --- */
    const body = el('div', { class: 'about__body', 'data-reveal': 'right' });

    const text = el('div', { class: 'about__text' });
    text.innerHTML = p.sobre.paragrafos.map((t) => '<p>' + esc(t) + '</p>').join('');
    body.appendChild(text);

    const pillars = el('div', { class: 'about__pillars', 'data-reveal-group': '80' });
    pillars.innerHTML = p.sobre.pilares.map((pl) =>
      '<article class="about__pillar" data-reveal="fade">' +
        '<h3>' + esc(pl.titulo) + '</h3>' +
        '<p>' + esc(pl.texto) + '</p>' +
      '</article>'
    ).join('');
    body.appendChild(pillars);

    host.appendChild(portrait);
    host.appendChild(body);
  }

  PM.renderAbout = render;
})();
