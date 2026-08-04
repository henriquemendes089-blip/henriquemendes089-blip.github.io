/* ============================================================
   CORE / REVEAL — animações de entrada, contadores e progresso.
   Tudo baseado em IntersectionObserver: zero custo durante o scroll.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, qsa, throttleRAF, reduced, formatNumber, easeOutExpo } = PM.util;

  /* ------------------------------------------------------------
     1. Scroll reveal — com escalonamento automático por grupo.
     ------------------------------------------------------------ */
  function initReveal(scope) {
    const nodes = qsa('[data-reveal]:not(.is-visible)', scope || document);
    if (!nodes.length) return;

    if (reduced() || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    // Aplica atraso progressivo aos filhos de um mesmo grupo.
    qsa('[data-reveal-group]', scope || document).forEach((group) => {
      if (group.dataset.staggered) return;
      group.dataset.staggered = '1';
      const step = parseInt(group.dataset.revealGroup, 10) || 70;
      qsa('[data-reveal]', group).forEach((child, i) => {
        child.style.setProperty('--reveal-delay', Math.min(i * step, 520) + 'ms');
      });
    });

    // threshold 0 + margem inferior negativa: o elemento revela assim que
    // cruza a linha de corte, independentemente da própria altura.
    // (Um threshold percentual nunca é atingido por blocos mais altos
    // que a viewport — o conteúdo ficava invisível.)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 }
    );

    nodes.forEach((n) => io.observe(n));
  }

  /* ------------------------------------------------------------
     2. Contadores animados.
     Elemento: <span data-count="2500" data-suffix="+"></span>
     ------------------------------------------------------------ */
  function initCounters(scope) {
    const nodes = qsa('[data-count]:not([data-counted])', scope || document);
    if (!nodes.length) return;

    const run = (node) => {
      node.dataset.counted = '1';
      const target = parseFloat(node.dataset.count) || 0;
      const decimals = (node.dataset.count.split('.')[1] || '').length;

      if (reduced() || target === 0) {
        node.textContent = decimals ? target.toFixed(decimals) : formatNumber(target);
        return;
      }

      const duration = 1500;
      const start = performance.now();

      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const value = target * easeOutExpo(p);
        node.textContent = decimals
          ? value.toFixed(decimals)
          : formatNumber(Math.round(value));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(run);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          run(entry.target);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
  }

  /* ------------------------------------------------------------
     3. Barra de progresso do scroll.
     ------------------------------------------------------------ */
  function initProgress() {
    const bar = qs('.progress__bar');
    if (!bar) return;

    const update = throttleRAF(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = 'scaleX(' + p + ')';
    });

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ------------------------------------------------------------
     4. Trilho da timeline que preenche conforme o scroll.
     ------------------------------------------------------------ */
  function initTimelineRail() {
    const rail = qs('.timeline__rail-fill');
    const timeline = qs('.timeline');
    if (!rail || !timeline) return;

    if (reduced()) {
      rail.style.height = '100%';
      return;
    }

    const update = throttleRAF(() => {
      const r = timeline.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const p = Math.max(0, Math.min((anchor - r.top) / r.height, 1));
      rail.style.height = p * 100 + '%';
    });

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ------------------------------------------------------------
     5. Marca elementos visíveis (usado por nós da timeline e KPIs).
     ------------------------------------------------------------ */
  function initVisibility(selector, margin) {
    const nodes = qsa(selector);
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window) || reduced()) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px ' + (margin || '-20%') + ' 0px', threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
  }

  /* ------------------------------------------------------------
     6. Transição suave ao sair para uma página interna.
     ------------------------------------------------------------ */
  function initPageTransition() {
    if (reduced()) return;

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      if (
        link.target === '_blank' ||
        link.hasAttribute('download') ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0
      ) return;

      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) return; // âncora interna

      e.preventDefault();
      document.body.classList.add('is-leaving');
      setTimeout(() => { location.href = link.href; }, 200);
    });

    // Evita a página ficar apagada ao voltar pelo histórico.
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) document.body.classList.remove('is-leaving');
    });
  }

  PM.reveal = { initReveal, initCounters, initProgress, initTimelineRail, initVisibility, initPageTransition };
})();
