/* ============================================================
   MAIN — inicialização compartilhada por todas as páginas.
   Último script a ser carregado.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, qsa, asset, isTouch, reduced } = PM.util;

  function boot() {
    document.documentElement.classList.remove('no-js');

    /* --- Estrutura comum --- */
    PM.navbar.renderNav();
    PM.navbar.renderFooter();

    /* --- Conteúdo da home --- */
    if (document.documentElement.dataset.page === 'home') {
      if (PM.renderAbout) PM.renderAbout();
      if (PM.renderExperience) PM.renderExperience();
      if (PM.renderProjects) PM.renderProjects();
      if (PM.renderResults) PM.renderResults();
      if (PM.renderSkills) PM.renderSkills();
      if (PM.renderTech) PM.renderTech();
      if (PM.renderContact) PM.renderContact();

      if (PM.hero) { PM.hero.initParticles(); PM.hero.initParallax(); }
      if (PM.terminal) PM.terminal.init();
      PM.reveal.initTimelineRail();
      PM.reveal.initVisibility('.timeline__item', '-18%');
      PM.reveal.initVisibility('.kpi', '-15%');
    }

    /* --- Páginas de detalhe --- */
    if (PM.pageProject) PM.pageProject();
    if (PM.pageExperience) PM.pageExperience();

    /* --- Comportamentos globais --- */
    fillDynamicLinks();
    PM.reveal.initReveal();
    PM.reveal.initCounters();
    PM.reveal.initProgress();
    PM.reveal.initPageTransition();
    initButtonGlow();
    PM.util.spotlight(qsa('.card--spot'));
  }

  /* Preenche botões/links marcados com data-link no HTML estático. */
  function fillDynamicLinks() {
    const p = PM.profile;
    const map = {
      whatsapp: p.contato.whatsapp.href,
      instagram: p.contato.instagram.href,
      email: p.contato.email.href,
      cv: asset(p.curriculo)
    };

    qsa('[data-link]').forEach((a) => {
      const target = map[a.dataset.link];
      if (target) a.setAttribute('href', target);
    });

    qsa('[data-text]').forEach((n) => {
      const path = n.dataset.text.split('.');
      let v = p;
      for (let i = 0; i < path.length && v; i++) v = v[path[i]];
      if (typeof v === 'string') n.textContent = v;
    });
  }

  /* Brilho dos botões acompanhando o cursor. */
  function initButtonGlow() {
    if (isTouch() || reduced()) return;
    qsa('.btn').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        btn.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
