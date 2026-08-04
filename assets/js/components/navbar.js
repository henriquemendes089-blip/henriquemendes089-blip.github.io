/* ============================================================
   COMPONENTE / NAVBAR + MENU MOBILE + RODAPÉ
   Renderizado por JS para existir uma única definição no projeto.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, qsa, el, esc, asset, root, throttleRAF } = PM.util;

  const LINKS = [
    { id: 'sobre', label: 'Sobre' },
    { id: 'experiencia', label: 'Experiência' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'resultados', label: 'Resultados' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'tecnologias', label: 'Tecnologias' },
    { id: 'contato', label: 'Contato' }
  ];

  const isHome = () => document.documentElement.dataset.page === 'home';
  const href = (id) => (isHome() ? '#' + id : root() + 'index.html#' + id);

  /* ------------------------------------------------------------
     NAVBAR
     ------------------------------------------------------------ */
  function renderNav() {
    const host = qs('#nav-root');
    if (!host) return;
    const p = PM.profile;

    const nav = el('nav', { class: 'nav', 'aria-label': 'Navegação principal' });
    nav.innerHTML =
      '<div class="nav__inner">' +
        '<a class="brand" href="' + (isHome() ? '#home' : root() + 'index.html') + '" aria-label="' + esc(p.nome) + ' — início">' +
          '<span class="brand__mark" aria-hidden="true">' + esc(p.iniciais) + '</span>' +
          '<span class="brand__text">' +
            '<span class="brand__name">' + esc(p.nome) + '</span>' +
            '<span class="brand__role">Marketing · IA · Tráfego</span>' +
          '</span>' +
        '</a>' +
        '<div class="nav__links">' +
          '<span class="nav__pill" aria-hidden="true"></span>' +
          LINKS.map((l) =>
            '<a class="nav__link" href="' + href(l.id) + '" data-nav="' + l.id + '">' + esc(l.label) + '</a>'
          ).join('') +
        '</div>' +
        '<div class="nav__actions">' +
          '<a class="btn btn--primary btn--sm btn--nav-cta" href="' + esc(p.contato.whatsapp.href) + '" target="_blank" rel="noopener">' +
            'Vamos conversar' + PM.icon('arrow-right', 'btn__icon btn__icon--arrow') +
          '</a>' +
          '<button class="nav__burger" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu-mobile">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</div>';

    host.appendChild(nav);
    renderMenu(host, p);

    // Sombra/opacidade da barra ao rolar
    const onScroll = throttleRAF(() => {
      nav.classList.toggle('is-scrolled', window.scrollY > 16);
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (isHome()) initScrollSpy(nav);
  }

  /* ------------------------------------------------------------
     MENU MOBILE
     ------------------------------------------------------------ */
  function renderMenu(host, p) {
    const menu = el('div', { class: 'menu', id: 'menu-mobile', hidden: false });
    menu.innerHTML =
      LINKS.map((l, i) =>
        '<a class="menu__link" href="' + href(l.id) + '" data-nav-m="' + l.id + '">' +
          esc(l.label) + '<span>' + String(i + 1).padStart(2, '0') + '</span>' +
        '</a>'
      ).join('') +
      '<div class="menu__foot">' +
        '<a class="btn btn--wa btn--full" href="' + esc(p.contato.whatsapp.href) + '" target="_blank" rel="noopener">' +
          PM.icon('whatsapp', 'btn__icon') + 'Falar no WhatsApp' +
        '</a>' +
        '<a class="btn btn--ghost btn--full" href="' + asset(p.curriculo) + '" download>' +
          PM.icon('download', 'btn__icon btn__icon--down') + 'Baixar currículo (PDF)' +
        '</a>' +
      '</div>';

    host.appendChild(menu);

    const burger = qs('.nav__burger', host);
    let open = false;

    const setOpen = (state) => {
      open = state;
      menu.classList.toggle('is-open', state);
      burger.setAttribute('aria-expanded', String(state));
      burger.setAttribute('aria-label', state ? 'Fechar menu' : 'Abrir menu');
      document.body.classList.toggle('is-locked', state);
    };

    burger.addEventListener('click', () => setOpen(!open));
    qsa('.menu__link, .menu__foot a', menu).forEach((a) =>
      a.addEventListener('click', () => setOpen(false))
    );
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && open) { setOpen(false); burger.focus(); }
    });
    window.addEventListener('resize', PM.util.debounce(() => {
      if (open && window.innerWidth > 1080) setOpen(false);
    }, 150));
  }

  /* ------------------------------------------------------------
     SCROLL SPY — marca a seção ativa e desliza a pílula.
     ------------------------------------------------------------ */
  function initScrollSpy(nav) {
    const links = qsa('.nav__link', nav);
    const mLinks = qsa('[data-nav-m]');
    const pill = qs('.nav__pill', nav);
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length) return;

    let current = '';

    const movePill = (link) => {
      if (!pill || !link) return;
      pill.style.width = link.offsetWidth + 'px';
      pill.style.transform = 'translateX(' + link.offsetLeft + 'px)';
      pill.classList.add('is-on');
    };

    const setActive = (id) => {
      if (id === current) return;
      current = id;
      let active = null;
      links.forEach((a) => {
        const on = a.dataset.nav === id;
        a.classList.toggle('is-active', on);
        if (on) active = a;
      });
      mLinks.forEach((a) => a.classList.toggle('is-active', a.dataset.navM === id));
      if (active) movePill(active);
      else if (pill) pill.classList.remove('is-on');
    };

    const update = throttleRAF(() => {
      const anchor = window.scrollY + window.innerHeight * 0.34;
      let found = '';

      for (let i = 0; i < sections.length; i++) {
        const s = sections[i];
        const top = s.offsetTop;
        if (anchor >= top && anchor < top + s.offsetHeight) { found = s.id; break; }
      }

      // Ao chegar ao fim da página, força a última seção.
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        found = sections[sections.length - 1].id;
      }
      setActive(found);
    });

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', PM.util.debounce(() => {
      current = '';
      update();
    }, 140));
    update();
  }

  /* ------------------------------------------------------------
     RODAPÉ
     ------------------------------------------------------------ */
  function renderFooter() {
    const host = qs('#footer-root');
    if (!host) return;
    const p = PM.profile;
    const c = p.contato;
    const ano = new Date().getFullYear();

    const footer = el('footer', { class: 'footer' });
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer__grid">' +
          '<div class="footer__brand">' +
            '<a class="brand" href="' + (isHome() ? '#home' : root() + 'index.html') + '">' +
              '<span class="brand__mark" aria-hidden="true">' + esc(p.iniciais) + '</span>' +
              '<span class="brand__text">' +
                '<span class="brand__name">' + esc(p.nome) + '</span>' +
                '<span class="brand__role">Marketing · IA · Tráfego</span>' +
              '</span>' +
            '</a>' +
            '<p class="dim" style="font-size:var(--fs-sm);line-height:1.62">' + esc(p.frase) + '</p>' +
            '<span class="badge badge--live"><i class="dot dot--pulse"></i>' + esc(p.disponibilidade) + '</span>' +
          '</div>' +

          '<div class="footer__col">' +
            '<h3>Navegação</h3>' +
            LINKS.map((l) => '<a class="footer__link" href="' + href(l.id) + '">' + esc(l.label) + '</a>').join('') +
          '</div>' +

          '<div class="footer__col">' +
            '<h3>Contato</h3>' +
            '<a class="footer__link" href="' + esc(c.whatsapp.href) + '" target="_blank" rel="noopener">' +
              PM.icon('whatsapp') + esc(c.whatsapp.valor) + '</a>' +
            '<a class="footer__link" href="' + esc(c.instagram.href) + '" target="_blank" rel="noopener">' +
              PM.icon('instagram') + esc(c.instagram.valor) + '</a>' +
            '<a class="footer__link" href="' + esc(c.email.href) + '">' +
              PM.icon('mail') + esc(c.email.valor) + '</a>' +
            '<a class="footer__link" href="' + asset(p.curriculo) + '" download>' +
              PM.icon('download') + 'Currículo em PDF</a>' +
          '</div>' +
        '</div>' +

        '<div class="footer__bottom">' +
          '<span>© ' + ano + ' ' + esc(p.nome) + '. Todos os direitos reservados.</span>' +
          '<span class="mono dim">Feito à mão · HTML, CSS e JavaScript</span>' +
          '<button class="footer__top-btn" type="button" data-to-top>' +
            'Voltar ao topo' + PM.icon('arrow-up') +
          '</button>' +
        '</div>' +
      '</div>';

    host.appendChild(footer);

    // Ícones do rodapé em tamanho reduzido
    qsa('.footer__link svg', footer).forEach((svg) => {
      svg.style.width = '15px';
      svg.style.height = '15px';
      svg.style.opacity = '0.6';
    });

    qs('[data-to-top]', footer).addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: PM.util.reduced() ? 'auto' : 'smooth' });
    });
  }

  PM.navbar = { renderNav, renderFooter, LINKS };
})();
