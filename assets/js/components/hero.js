/* ============================================================
   COMPONENTE / HERO — partículas em canvas + parallax leve.
   Desliga sozinho em telas pequenas, toque ou movimento reduzido.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, reduced, throttleRAF, debounce } = PM.util;

  function initParticles() {
    const canvas = qs('.hero__canvas');
    if (!canvas) return;

    // Em telas pequenas ou com movimento reduzido, o grid + glow já bastam.
    if (reduced() || window.innerWidth < 720) { canvas.remove(); return; }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) { canvas.remove(); return; }

    const hero = canvas.closest('.hero');
    let dpr = 1, w = 0, h = 0, particles = [];
    let raf = null, running = false;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    function resize() {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      const density = Math.round((w * h) / 26000);
      const count = Math.max(24, Math.min(density, 70));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16 - 0.045,
          a: Math.random() * 0.4 + 0.12,
          // profundidade: define o quanto a partícula reage ao cursor
          z: Math.random() * 0.6 + 0.4
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const ox = (pointer.x - 0.5) * 26;
      const oy = (pointer.y - 0.5) * 18;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -12) p.x = w + 12;
        else if (p.x > w + 12) p.x = -12;
        if (p.y < -12) p.y = h + 12;
        else if (p.y > h + 12) p.y = -12;

        const px = p.x + ox * p.z;
        const py = p.y + oy * p.z;

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(169, 192, 255, ' + p.a * p.z + ')';
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      frame();
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }

    // Só anima enquanto o hero estiver em tela.
    if ('IntersectionObserver' in window && hero) {
      new IntersectionObserver(
        (entries) => { entries[0].isIntersecting ? start() : stop(); },
        { threshold: 0.01 }
      ).observe(hero);
    } else start();

    document.addEventListener('visibilitychange', () => {
      document.hidden ? stop() : start();
    });

    window.addEventListener('pointermove', throttleRAF((e) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    }), { passive: true });

    // Ao estreitar a janela até tamanho de celular, encerra a animação:
    // não faz sentido gastar bateria com partículas nesse contexto.
    window.addEventListener('resize', debounce(() => {
      if (window.innerWidth < 720) { stop(); canvas.style.display = 'none'; return; }
      canvas.style.display = '';
      resize();
      start();
    }, 180));

    resize();
  }

  /* ------------------------------------------------------------
     Parallax discreto do conteúdo do hero durante o scroll.
     ------------------------------------------------------------ */
  function initParallax() {
    const inner = qs('.hero__inner');
    const grid = qs('.hero__grid');
    if (!inner || reduced()) return;

    const update = throttleRAF(() => {
      const y = window.scrollY;
      if (y > window.innerHeight) return;
      inner.style.transform = 'translate3d(0,' + y * 0.14 + 'px,0)';
      inner.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.72)));
      if (grid) grid.style.transform =
        'perspective(680px) rotateX(62deg) translateY(' + (-14 + y * 0.012) + '%)';
    });

    window.addEventListener('scroll', update, { passive: true });
  }

  PM.hero = { initParticles, initParallax };
})();
