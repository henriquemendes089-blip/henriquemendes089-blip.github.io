/* ============================================================
   RENDER / RESULTADOS — painel de KPIs com contador e sparkline.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, el, esc } = PM.util;

  const ICONS = {
    users: 'users',
    target: 'target',
    megaphone: 'megaphone',
    briefcase: 'briefcase',
    check: 'circleCheck',
    play: 'circlePlay',
    browser: 'browser',
    trending: 'trending',
    film: 'film'
  };

  /* Converte a série numérica em um caminho SVG suave. */
  function sparkline(serie) {
    const W = 100, H = 30, PAD = 2;
    if (!serie || serie.length < 2) return null;

    const min = Math.min.apply(null, serie);
    const max = Math.max.apply(null, serie);
    const span = max - min || 1;

    const pts = serie.map((v, i) => [
      PAD + (i / (serie.length - 1)) * (W - PAD * 2),
      H - PAD - ((v - min) / span) * (H - PAD * 2)
    ]);

    // Curva suavizada por pontos médios — evita bicos.
    let d = 'M' + pts[0][0].toFixed(2) + ' ' + pts[0][1].toFixed(2);
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const cur = pts[i];
      const cx = (prev[0] + cur[0]) / 2;
      d += ' Q' + prev[0].toFixed(2) + ' ' + prev[1].toFixed(2) +
           ' ' + cx.toFixed(2) + ' ' + ((prev[1] + cur[1]) / 2).toFixed(2);
    }
    d += ' T' + pts[pts.length - 1][0].toFixed(2) + ' ' + pts[pts.length - 1][1].toFixed(2);

    const area = d + ' L' + (W - PAD) + ' ' + H + ' L' + PAD + ' ' + H + ' Z';
    return { line: d, area: area, len: Math.round(W * 1.35) };
  }

  function kpi(m) {
    const spark = sparkline(m.serie);
    const pending = m.status === 'pendente' || !m.valor;

    const node = el('article', {
      class: 'kpi' + (pending ? ' kpi--pending' : ''),
      'data-reveal': 'fade'
    });

    node.innerHTML =
      '<div class="kpi__top">' +
        '<span class="kpi__icon">' + PM.icon(ICONS[m.icone] || 'trending') + '</span>' +
        (pending
          ? '<span class="badge badge--soon">Aguardando</span>'
          : (m.destaque ? '<span class="badge badge--live"><i class="dot"></i>Verificado</span>' : '')) +
      '</div>' +
      '<div class="kpi__value">' +
        (pending
          ? '<span>—</span>'
          : '<span data-count="' + esc(m.valor) + '">0</span>' +
            (m.sufixo ? '<sup>' + esc(m.sufixo) + '</sup>' : '')) +
      '</div>' +
      '<div>' +
        '<p class="kpi__label">' + esc(m.label) + '</p>' +
        '<p class="kpi__detail">' + esc(m.detalhe) + '</p>' +
      '</div>' +
      (spark
        ? '<svg class="kpi__spark" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">' +
            (pending ? '' : '<path class="kpi__spark-area" d="' + spark.area + '"/>') +
            '<path class="kpi__spark-line" d="' + spark.line + '" style="--len:' + spark.len + '"/>' +
          '</svg>'
        : '');

    return node;
  }

  function render() {
    const grid = qs('#results-grid');
    if (!grid || !PM.results) return;

    // Gradiente compartilhado pelas áreas dos sparklines.
    grid.insertAdjacentHTML('beforebegin',
      '<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute">' +
        '<defs><linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="rgba(90,131,240,.28)"/>' +
          '<stop offset="100%" stop-color="rgba(90,131,240,0)"/>' +
        '</linearGradient></defs>' +
      '</svg>');

    PM.results.forEach((m) => grid.appendChild(kpi(m)));

    const bar = qs('#results-updated');
    if (bar) {
      bar.textContent = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'short', year: 'numeric'
      });
    }
  }

  PM.renderResults = render;
})();
