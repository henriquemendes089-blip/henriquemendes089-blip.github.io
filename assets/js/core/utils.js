/* ============================================================
   CORE / UTILS — helpers de DOM, formatação e biblioteca de ícones.
   Carregado antes de qualquer outro script.
   ============================================================ */
(function () {
  'use strict';

  window.PM = window.PM || {};

  /* ---------- DOM ---------- */
  const qs = (sel, ctx) => (ctx || document).querySelector(sel);
  const qsa = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /** Cria um elemento com atributos e filhos em uma chamada. */
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        const v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === 'class') node.className = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'dataset') Object.assign(node.dataset, v);
        else if (k === 'style') node.setAttribute('style', v);
        else if (k.startsWith('on') && typeof v === 'function') {
          node.addEventListener(k.slice(2).toLowerCase(), v);
        } else node.setAttribute(k, v === true ? '' : v);
      });
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach((c) => {
        if (c === null || c === undefined || c === false) return;
        node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
      });
    }
    return node;
  }

  /** Escapa texto vindo dos arquivos de dados antes de injetar como HTML. */
  function esc(str) {
    return String(str === undefined || str === null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ---------- Ambiente ---------- */
  const reduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isTouch = () =>
    window.matchMedia('(hover: none)').matches;

  /** Caminho relativo até a raiz do site (páginas internas ficam 1 nível abaixo). */
  function root() {
    return document.documentElement.dataset.root || '';
  }

  /** Resolve um caminho declarado nos dados (sempre relativo à raiz). */
  function asset(path) {
    if (!path) return '';
    if (/^(https?:)?\/\//.test(path) || path.startsWith('data:') || path.startsWith('mailto:') || path.startsWith('tel:')) return path;
    return root() + path.replace(/^\.?\//, '');
  }

  /* ---------- Eventos ---------- */
  function throttleRAF(fn) {
    let ticking = false;
    return function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        fn.apply(this, arguments);
        ticking = false;
      });
    };
  }

  function debounce(fn, wait) {
    let t;
    return function () {
      const args = arguments;
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait || 160);
    };
  }

  /* ---------- Números ---------- */
  const nf = new Intl.NumberFormat('pt-BR');

  function formatNumber(value) {
    if (typeof value !== 'number' || !isFinite(value)) return String(value);
    return Number.isInteger(value) ? nf.format(value) : nf.format(Math.round(value * 10) / 10);
  }

  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  /* ---------- Clipboard + toast ---------- */
  let toastEl = null;
  let toastTimer = null;

  function toast(message) {
    if (!toastEl) {
      toastEl = el('div', { class: 'toast', role: 'status', 'aria-live': 'polite' });
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = PM.icon('check') + '<span></span>';
    toastEl.querySelector('span').textContent = message;
    // força reflow para reiniciar a transição
    void toastEl.offsetWidth;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2400);
  }

  function copy(text, message) {
    const done = () => toast(message || 'Copiado para a área de transferência');
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallback(text, done));
    } else {
      fallback(text, done);
    }
  }

  function fallback(text, done) {
    const ta = el('textarea', { style: 'position:fixed;opacity:0;pointer-events:none;' });
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* silencioso */ }
    document.body.removeChild(ta);
  }

  /* ---------- Holofote que segue o cursor ---------- */
  function spotlight(nodes) {
    if (isTouch() || reduced()) return;
    nodes.forEach((node) => {
      node.addEventListener('pointermove', (e) => {
        const r = node.getBoundingClientRect();
        node.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        node.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      });
    });
  }

  /* ============================================================
     ÍCONES — conjunto único (traço 1.75, viewBox 24) para
     consistência visual. Nunca usar emoji como ícone.
     ============================================================ */
  const FILLED = ['play', 'whatsapp', 'sparkle'];

  const PATHS = {
    'arrow-right': 'M5 12h14M12 5l7 7-7 7',
    'arrow-left': 'M19 12H5M12 19l-7-7 7-7',
    'arrow-up': 'M12 19V5M5 12l7-7 7 7',
    'arrow-down': 'M12 5v14M19 12l-7 7-7-7',
    'arrow-up-right': 'M7 17 17 7M7 7h10v10',
    'chevron-left': 'm15 18-6-6 6-6',
    'chevron-right': 'm9 18 6-6-6-6',
    'chevron-down': 'm6 9 6 6 6-6',
    close: 'M18 6 6 18M6 6l12 12',
    check: 'M20 6 9 17l-5-5',
    zoom: 'M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7',
    download: 'M12 3v12M7 10l5 5 5-5M4 21h16',
    play: 'M6 3.5 20 12 6 20.5z',
    external: 'M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6',
    copy: 'M9 9h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
    mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 7l-9.1 5.8a2 2 0 0 1-1.8 0L2 7',
    instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4zM17.5 6.5h.01',
    whatsapp:
      'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.25-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.34M12.05 21.8h-.01c-1.77 0-3.5-.48-5.03-1.38l-.36-.22-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.16 6.44 6.6 2 12.05 2c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.43 9.89-9.88 9.89m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41Z',
    users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    target: 'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM12 11.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z',
    megaphone: 'm3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6',
    briefcase: 'M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16',
    circleCheck: 'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zM9 12l2 2 4-4',
    circlePlay: 'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zM10.2 8.4 16 12l-5.8 3.6z',
    browser: 'M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM2 8h20M6 5.6h.01M9 5.6h.01',
    trending: 'M22 7 13.5 15.5l-5-5L2 17M16 7h6v6',
    strategy: 'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zM16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36z',
    palette:
      'M12 22a10 10 0 1 1 10-10 4 4 0 0 1-4 4h-2.2a1.8 1.8 0 0 0-1.4 2.9l.3.4A1.8 1.8 0 0 1 13 22zM7.5 10.5h.01M10.5 7h.01M14.5 7h.01M17 10.5h.01',
    film: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM7 3v18M17 3v18M3 12h18M3 7.5h4M17 7.5h4M3 16.5h4M17 16.5h4',
    spark: 'M12 2.6 14 9l6.4 2-6.4 2-2 6.4-2-6.4L3.6 11 10 9zM19 3.5v3M20.5 5h-3M5 17.5v2.5M6.25 18.75h-2.5',
    sparkle: 'M12 2c0 5.52 4.48 10 10 10-5.52 0-10 4.48-10 10 0-5.52-4.48-10-10-10 5.52 0 10-4.48 10-10Z',
    image: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM9.5 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM21 15.5l-4-4L7 21',
    video: 'M4 5h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM17 9.5l5-3v11l-5-3z',
    clock: 'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zM12 6.5V12l3.5 2',
    pin: 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    layers: 'm12 2 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5'
  };

  /** Retorna o markup SVG de um ícone. */
  function icon(name, className) {
    const d = PATHS[name];
    if (!d) return '';
    const filled = FILLED.indexOf(name) !== -1;
    return (
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"' +
      (className ? ' class="' + className + '"' : '') +
      (filled
        ? ' fill="currentColor">'
        : ' fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">') +
      '<path d="' + d + '"/></svg>'
    );
  }

  /* ============================================================
     MÍDIA — imagem com placeholder automático.
     Se o arquivo não existir, o bloco continua elegante.
     ============================================================ */
  function media(opts) {
    const o = opts || {};
    const ratio = o.ratio || 'ratio-16-9';
    const wrap = el('div', {
      class: 'media ' + ratio + (o.zoom ? ' media--zoom' : '') + (o.class ? ' ' + o.class : '')
    });

    wrap.innerHTML =
      '<div class="media__fallback">' +
      '<div class="media__fallback-mark">' + esc(o.mark || 'HM') + '</div>' +
      '<div class="media__fallback-text">' + esc(o.placeholder || 'Mídia em breve') + '</div>' +
      '</div>';

    if (o.src) {
      const img = el('img', {
        src: asset(o.src),
        alt: o.alt || '',
        loading: o.eager ? 'eager' : 'lazy',
        decoding: 'async',
        style: 'opacity:0'
      });
      img.addEventListener('load', () => {
        wrap.classList.add('has-image');
        img.style.opacity = '1';
      });
      img.addEventListener('error', () => img.remove());
      wrap.appendChild(img);
    }
    return wrap;
  }

  /* ---------- Exporta ---------- */
  PM.util = {
    qs, qsa, el, esc, reduced, isTouch, root, asset,
    throttleRAF, debounce, formatNumber, easeOutExpo,
    copy, toast, spotlight
  };
  PM.icon = icon;
  PM.media = media;
  PM.iconPaths = PATHS;
})();
