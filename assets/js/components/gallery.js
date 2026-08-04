/* ============================================================
   COMPONENTE / GALERIA E VÍDEO
   Constrói grades de mídia com mockups, lightbox e players.
   Suporta: imagem, MP4, YouTube e Vimeo.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { el, esc, asset } = PM.util;

  /* ------------------------------------------------------------
     GALERIA DE IMAGENS
     items: [{ src, alt, legenda, mockup: 'desktop'|'notebook'|'celular' }]
     ------------------------------------------------------------ */
  function gallery(items, opts) {
    const o = opts || {};
    if (!items || !items.length) {
      return placeholder(
        'image',
        o.emptyText || 'Galeria pronta para receber prints, mockups e fotos.',
        o.emptyHint
      );
    }

    const wrap = el('div', { class: 'gallery', 'data-reveal-group': '60' });

    const lightItems = items.map((it) => ({
      type: 'image',
      src: it.src,
      alt: it.alt || '',
      caption: it.legenda || it.alt || ''
    }));

    items.forEach((it, i) => {
      const figure = PM.media({
        src: it.src,
        alt: it.alt || '',
        ratio: it.ratio || (it.mockup === 'celular' ? 'ratio-9-16' : 'ratio-16-9'),
        contain: it.inteira === true,
        zoom: true,
        mark: o.mark,
        placeholder: 'Imagem em breve'
      });

      const inner = it.mockup
        ? el('div', { class: 'mockup mockup--' + it.mockup }, figure)
        : figure;

      const item = el('button', {
        class: 'gallery__item',
        type: 'button',
        'data-reveal': 'scale',
        'aria-label': 'Ampliar: ' + (it.alt || 'imagem ' + (i + 1))
      }, inner);

      item.insertAdjacentHTML('beforeend',
        '<span class="gallery__zoom" aria-hidden="true">' + PM.icon('zoom') + '</span>');

      item.addEventListener('click', () => PM.lightbox.open(lightItems, i));
      wrap.appendChild(item);
    });

    return wrap;
  }

  /* ------------------------------------------------------------
     VÍDEOS
     items: [{ tipo:'mp4'|'youtube'|'vimeo', src|id, poster, titulo }]
     MP4 com pôster: reproduz silenciosamente ao entrar em tela.
     ------------------------------------------------------------ */
  function videos(items, opts) {
    const o = opts || {};
    if (!items || !items.length) {
      return placeholder(
        'video',
        o.emptyText || 'Suporte a vídeo pronto: MP4, YouTube e Vimeo.',
        o.emptyHint
      );
    }

    const wrap = el('div', { class: 'gallery', 'data-reveal-group': '70' });

    items.forEach((v) => {
      const card = el('div', { class: 'video ratio-16-9', 'data-reveal': 'scale' });

      if (v.tipo === 'youtube' || v.tipo === 'vimeo') {
        // Fachada leve: só carrega o player após o clique (economiza ~1MB).
        const poster = v.poster
          ? '<img src="' + asset(v.poster) + '" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover">'
          : (v.tipo === 'youtube'
              ? '<img src="https://i.ytimg.com/vi/' + esc(v.id) + '/hqdefault.jpg" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover">'
              : '');

        card.innerHTML = poster +
          '<button class="video__play" type="button" aria-label="Reproduzir: ' + esc(v.titulo || 'vídeo') + '">' +
            '<span class="video__play-btn">' + PM.icon('play') + '</span>' +
          '</button>';

        card.querySelector('.video__play').addEventListener('click', () => {
          PM.lightbox.open([{ type: v.tipo, id: v.id, caption: v.titulo || '' }], 0);
        });
      } else {
        const video = el('video', {
          src: asset(v.src),
          poster: v.poster ? asset(v.poster) : null,
          muted: true,
          loop: true,
          playsinline: true,
          preload: 'metadata',
          controls: true,
          style: 'width:100%;height:100%;object-fit:cover'
        });
        video.muted = true;
        card.appendChild(video);
        autoplayWhenVisible(video);
      }

      const item = v.titulo
        ? el('div', {}, [card, el('div', { class: 'video__caption', text: v.titulo })])
        : card;

      wrap.appendChild(item);
    });

    return wrap;
  }

  /** Autoplay silencioso apenas enquanto o vídeo está em tela. */
  function autoplayWhenVisible(video) {
    if (PM.util.reduced() || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { const p = video.play(); if (p) p.catch(() => {}); }
        else video.pause();
      });
    }, { threshold: 0.4 });
    io.observe(video);
  }

  /* ------------------------------------------------------------
     BLOCO VAZIO — comunica que a estrutura existe e como preencher.
     ------------------------------------------------------------ */
  function placeholder(iconName, text, hint) {
    const box = el('div', { class: 'placeholder-box', 'data-reveal': 'fade' });
    box.innerHTML =
      PM.icon(iconName) +
      '<p>' + esc(text) + '</p>' +
      (hint ? '<p><code>' + esc(hint) + '</code></p>' : '');
    return box;
  }

  PM.gallery = { gallery, videos, placeholder };
})();
