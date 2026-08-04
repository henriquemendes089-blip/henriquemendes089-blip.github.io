/* ============================================================
   RENDER / CONTATO — linhas de contato com ação de copiar.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, qsa, el, esc } = PM.util;

  const ORDER = [
    { key: 'whatsapp', icone: 'whatsapp' },
    { key: 'instagram', icone: 'instagram' },
    { key: 'email', icone: 'mail' }
  ];

  function render() {
    const host = qs('#contact-list');
    if (!host) return;
    const c = PM.profile.contato;

    ORDER.forEach((o) => {
      const item = c[o.key];
      if (!item) return;

      const row = el('div', { class: 'contact-row', 'data-reveal': 'fade' });
      row.innerHTML =
        '<span class="contact-row__icon">' + PM.icon(o.icone) + '</span>' +
        '<span class="contact-row__body">' +
          '<span class="contact-row__label">' + esc(item.label) + '</span>' +
          '<a class="contact-row__value stretch" href="' + esc(item.href) + '"' +
            (o.key === 'email' ? '' : ' target="_blank" rel="noopener"') + '>' +
            esc(item.valor) +
          '</a>' +
          '<span class="contact-row__desc">' + esc(item.descricao) + '</span>' +
        '</span>' +
        '<span class="contact-row__actions">' +
          '<button class="contact-row__copy" type="button" data-copy="' + esc(item.raw) +
            '" aria-label="Copiar ' + esc(item.label) + '">' + PM.icon('copy') + '</button>' +
        '</span>';

      host.appendChild(row);
    });

    qsa('[data-copy]', host).forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        PM.util.copy(btn.dataset.copy, 'Copiado: ' + btn.dataset.copy);
      });
    });
  }

  PM.renderContact = render;
})();
