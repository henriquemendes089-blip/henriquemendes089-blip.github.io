/* ============================================================
   COMPONENTE / LIGHTBOX — visualizador de imagens e vídeos.
   Acessível: foco preso, ESC fecha, setas navegam.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, qsa, el, esc, asset } = PM.util;

  let box = null;
  let items = [];
  let index = 0;
  let lastFocus = null;

  function build() {
    if (box) return box;

    box = el('div', {
      class: 'lightbox',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': 'Visualizador de mídia'
    });

    box.innerHTML =
      '<div class="lightbox__bar">' +
        '<span class="lightbox__count" data-count></span>' +
        '<button class="icon-btn" type="button" data-close aria-label="Fechar (Esc)">' + PM.icon('close') + '</button>' +
      '</div>' +
      '<div class="lightbox__stage">' +
        '<button class="icon-btn lightbox__nav lightbox__nav--prev" type="button" data-prev aria-label="Anterior">' + PM.icon('chevron-left') + '</button>' +
        '<figure class="lightbox__figure" data-figure></figure>' +
        '<button class="icon-btn lightbox__nav lightbox__nav--next" type="button" data-next aria-label="Próximo">' + PM.icon('chevron-right') + '</button>' +
      '</div>' +
      '<div class="lightbox__thumbs" data-thumbs></div>';

    document.body.appendChild(box);

    qs('[data-close]', box).addEventListener('click', close);
    qs('[data-prev]', box).addEventListener('click', () => go(index - 1));
    qs('[data-next]', box).addEventListener('click', () => go(index + 1));

    // Clicar no fundo fecha.
    box.addEventListener('click', (e) => {
      if (e.target === box || e.target.classList.contains('lightbox__stage')) close();
    });

    document.addEventListener('keydown', onKey);
    return box;
  }

  function onKey(e) {
    if (!box || !box.classList.contains('is-open')) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    else if (e.key === 'Tab') trapFocus(e);
  }

  function trapFocus(e) {
    const focusables = qsa('button, [href], iframe, video[controls]', box)
      .filter((n) => n.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function render() {
    const item = items[index];
    if (!item) return;

    const figure = qs('[data-figure]', box);
    const single = items.length < 2;

    qs('[data-count]', box).textContent =
      single ? '' : String(index + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0');
    qs('[data-prev]', box).style.display = single ? 'none' : '';
    qs('[data-next]', box).style.display = single ? 'none' : '';

    let inner = '';
    if (item.type === 'youtube') {
      inner = '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(item.id) +
        '?autoplay=1&rel=0" title="' + esc(item.caption || 'Vídeo') +
        '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
    } else if (item.type === 'vimeo') {
      inner = '<iframe src="https://player.vimeo.com/video/' + esc(item.id) +
        '?autoplay=1" title="' + esc(item.caption || 'Vídeo') +
        '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
    } else if (item.type === 'video' || item.type === 'mp4') {
      inner = '<video src="' + asset(item.src) + '" controls autoplay playsinline' +
        (item.poster ? ' poster="' + asset(item.poster) + '"' : '') + '></video>';
    } else {
      inner = '<img src="' + asset(item.src) + '" alt="' + esc(item.alt || item.caption || '') + '">';
    }

    if (item.caption) inner += '<figcaption class="lightbox__caption">' + esc(item.caption) + '</figcaption>';
    figure.innerHTML = inner;

    // Miniaturas
    const thumbs = qs('[data-thumbs]', box);
    if (single) { thumbs.innerHTML = ''; return; }

    thumbs.innerHTML = items.map((it, i) =>
      '<button class="lightbox__thumb' + (i === index ? ' is-active' : '') +
      '" type="button" data-go="' + i + '" aria-label="Item ' + (i + 1) + '">' +
      (it.thumb || (it.type === 'image' || !it.type ? '<img src="' + asset(it.src) + '" alt="" loading="lazy">' : PM.icon('play')) ) +
      '</button>'
    ).join('');

    qsa('[data-go]', thumbs).forEach((b) =>
      b.addEventListener('click', () => go(parseInt(b.dataset.go, 10)))
    );
  }

  function go(next) {
    if (!items.length) return;
    index = (next + items.length) % items.length;
    render();
  }

  function open(list, start) {
    if (!list || !list.length) return;
    build();
    items = list;
    index = Math.max(0, Math.min(start || 0, list.length - 1));
    lastFocus = document.activeElement;

    render();
    document.body.classList.add('is-locked');
    box.classList.add('is-open');
    setTimeout(() => { const b = qs('[data-close]', box); if (b) b.focus(); }, 60);
  }

  function close() {
    if (!box) return;
    box.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    // Interrompe qualquer reprodução em andamento.
    setTimeout(() => { qs('[data-figure]', box).innerHTML = ''; }, 260);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  PM.lightbox = { open, close };
})();
