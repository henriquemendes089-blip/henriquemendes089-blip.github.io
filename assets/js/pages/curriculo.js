/* ============================================================
   PÁGINA / CURRÍCULO
   Monta a folha A4 a partir dos mesmos arquivos de data/ que
   alimentam o site. Atualizou os dados, o currículo acompanha.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, el, esc } = PM.util;

  /* Bullets por experiência. As duas mais recentes ganham espaço maior;
     as antigas ficam resumidas para o currículo fechar em 2 páginas. */
  const BULLETS_RECENTES = 3;
  const BULLETS_ANTIGAS = 2;
  const RECENTES = 2;

  /* Vínculo ativo mostra só "Atual" — o ano de início não acrescenta
     nada ao lado de uma posição em andamento. */
  function periodo(x) {
    if (x.fim === 'Atual') return { de: '', ate: 'Atual' };
    if (x.inicio && x.fim) return { de: x.inicio, ate: x.fim };
    return { de: x.periodo, ate: '' };
  }

  function contatos() {
    const c = PM.profile.contato;
    const site = PM.profile.seo.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    return [
      { icone: 'whatsapp', texto: c.whatsapp.valor, href: c.whatsapp.href },
      { icone: 'mail', texto: c.email.valor, href: c.email.href },
      { icone: 'instagram', texto: c.instagram.valor, href: c.instagram.href },
      { icone: 'browser', texto: site, href: PM.profile.seo.url }
    ];
  }

  function render() {
    const host = qs('#cv');
    if (!host || !PM.profile) return;
    const p = PM.profile;

    /* --- Cabeçalho --- */
    const head = el('header', { class: 'cv-head' });
    head.innerHTML =
      '<div>' +
        '<h1 class="cv-name">' + esc(p.nome) + '</h1>' +
        '<p class="cv-role">' + esc(p.headline) + '</p>' +
        '<p class="cv-tagline">Transformando estratégia, criatividade e inteligência ' +
          'artificial em crescimento <em>real</em> para empresas.</p>' +
      '</div>' +
      '<ul class="cv-contact">' +
        contatos().map((c) =>
          '<li><b>' + esc(c.texto) + '</b>' + PM.icon(c.icone) + '</li>').join('') +
      '</ul>';
    host.appendChild(head);

    /* --- Perfil --- */
    host.appendChild(secao('Perfil',
      '<div class="cv-perfil">' +
        '<p>' + esc(p.sobre.paragrafos[0]) + '</p>' +
        '<p>' + esc(p.sobre.paragrafos[2]) + '</p>' +
      '</div>', 'cv-perfil-sec'));

    /* --- Experiência --- */
    const jobs = (PM.experiences || []).map((x, i) => {
      const d = periodo(x);
      const n = i < RECENTES ? BULLETS_RECENTES : BULLETS_ANTIGAS;
      const win = x.destaque
        ? '<p class="cv-job__win"><b>' + esc(x.destaque.valor) + '</b> — ' +
          esc(x.destaque.label) + (x.destaque.detalhe ? ' (' + esc(x.destaque.detalhe) + ')' : '') + '</p>'
        : '';
      return '<article class="cv-job">' +
        '<div class="cv-job__when">' + esc(d.de) +
          (d.ate ? '<b>' + esc(d.ate) + '</b>' : '') + '</div>' +
        '<div>' +
          '<h3 class="cv-job__title">' + esc(x.cargo) + '</h3>' +
          '<p class="cv-job__org"><b>' + esc(x.empresa) + '</b> · ' + esc(x.local) + '</p>' +
          '<ul class="cv-job__list">' +
            (x.entregas || []).slice(0, n)
              .map((e) => '<li>' + esc(e) + '</li>').join('') +
          '</ul>' + win +
        '</div>' +
      '</article>';
    }).join('');
    host.appendChild(secao('Experiência', jobs));

    /* --- Habilidades --- */
    const skills = (PM.skills || []).map((c) =>
      '<div class="cv-skill-group">' +
        '<h3>' + esc(c.titulo) + '</h3>' +
        '<p>' + esc(c.itens.map((i) => i.nome).join(' · ')) + '</p>' +
      '</div>').join('');
    host.appendChild(secao('Habilidades', '<div class="cv-skills">' + skills + '</div>'));

    /* --- Ferramentas --- */
    const tools = (PM.technologies || []).map((t) => '<span>' + esc(t.nome) + '</span>').join('');
    host.appendChild(secao('Ferramentas', '<div class="cv-tools">' + tools + '</div>'));

    /* --- Rodapé --- */
    const foot = el('footer', { class: 'cv-foot' });
    foot.innerHTML =
      '<span>' + esc(p.local) + ' · ' + esc(p.disponibilidade) + '</span>' +
      '<span>Portfólio completo em <a href="' + esc(p.seo.url) + '">' +
        esc(p.seo.url.replace(/^https?:\/\//, '').replace(/\/$/, '')) + '</a></span>';
    host.appendChild(foot);

    document.title = 'Currículo — ' + p.nome;
    montarBarra();
  }

  function secao(titulo, html, cls) {
    const s = el('section', { class: 'cv-section' + (cls ? ' ' + cls : '') });
    s.innerHTML = '<h2 class="cv-section__title">' + esc(titulo) + '</h2>' + html;
    return s;
  }

  /* Barra flutuante. Não é criada na geração do PDF (?pdf=1), porque
     alguns motores de impressão ignoram @media print e ela apareceria
     dentro do documento. */
  function montarBarra() {
    if (new URLSearchParams(location.search).has('pdf')) return;
    const bar = el('div', { class: 'cv-bar' });
    bar.innerHTML =
      '<span class="cv-bar__hint">Ctrl+P e escolha “Salvar como PDF”</span>' +
      '<button type="button" data-print>' + PM.icon('download') + 'Baixar PDF</button>' +
      '<a href="' + PM.util.root() + 'index.html">Voltar ao portfólio</a>';
    document.body.appendChild(bar);
    qs('[data-print]', bar).addEventListener('click', () => window.print());
  }

  PM.pageCurriculo = render;

  /* Renderiza já, dentro da execução deste script `defer`.
     Os dados e o utils.js vêm antes na ordem dos <script defer>, então
     tudo que a página precisa existe aqui. Fazer isso de forma síncrona
     — em vez de esperar DOMContentLoaded — garante que a folha esteja
     montada antes do evento `load`, que é o gatilho da geração de PDF. */
  render();
})();
