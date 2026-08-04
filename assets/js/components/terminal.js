/* ============================================================
   COMPONENTE / TERMINAL — sequência digitada na home.
   Roda uma única vez, quando o bloco entra em tela.
   ============================================================ */
(function () {
  'use strict';

  const PM = window.PM;
  const { qs, el, esc, reduced } = PM.util;

  /* Roteiro exibido. Cada passo é um comando e sua saída. */
  function script() {
    const p = PM.profile;
    return [
      {
        cmd: 'whoami',
        out: [{ type: 'text', value: p.nome, accent: true }]
      },
      {
        cmd: 'role',
        out: [{ type: 'text', value: p.headline }]
      },
      {
        cmd: 'skills',
        out: [{
          type: 'list',
          value: [
            'Marketing Strategy',
            'Traffic Management',
            'Artificial Intelligence',
            'Video Production',
            'Growth',
            'Web Design',
            'Content Strategy'
          ]
        }]
      },
      {
        cmd: 'status',
        out: [{ type: 'text', value: p.disponibilidade + ' · ' + p.local }]
      }
    ];
  }

  function init() {
    const body = qs('#terminal-body');
    if (!body) return;

    const steps = script();

    /* Sem animação: imprime tudo de uma vez, com o mesmo resultado visual. */
    if (reduced()) {
      steps.forEach((s) => {
        body.appendChild(lineNode(s.cmd, true));
        s.out.forEach((o) => body.appendChild(outNode(o)));
      });
      return;
    }

    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      play(body, steps);
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { run(); io.disconnect(); }
      }, { threshold: 0.3 });
      io.observe(body);
    } else run();
  }

  function lineNode(cmd, complete) {
    const line = el('div', { class: 'terminal__line' });
    line.innerHTML =
      '<span class="terminal__prompt" aria-hidden="true">&gt;</span>' +
      '<span class="terminal__cmd">' + (complete ? esc(cmd) : '') + '</span>';
    return line;
  }

  function outNode(o) {
    if (o.type === 'list') {
      const wrap = el('div', { class: 'terminal__list' });
      wrap.innerHTML = o.value.map((v) => '<span>' + esc(v) + '</span>').join('');
      return wrap;
    }
    return el('div', {
      class: 'terminal__out' + (o.accent ? ' terminal__out--accent' : ''),
      text: o.value
    });
  }

  function play(body, steps) {
    const caret = el('span', { class: 'terminal__caret' });
    let i = 0;

    const nextStep = () => {
      if (i >= steps.length) {
        const last = body.lastElementChild;
        if (last) last.appendChild(caret);
        return;
      }
      const step = steps[i++];
      const line = lineNode(step.cmd, false);
      const target = line.querySelector('.terminal__cmd');
      body.appendChild(line);
      target.appendChild(caret);

      typeText(target, step.cmd, caret, () => {
        caret.remove();
        let d = 90;
        step.out.forEach((o) => {
          setTimeout(() => {
            const node = outNode(o);
            node.style.opacity = '0';
            node.style.transform = 'translateY(4px)';
            node.style.transition = 'opacity 260ms ease-out, transform 260ms cubic-bezier(.16,1,.3,1)';
            body.appendChild(node);
            requestAnimationFrame(() => {
              node.style.opacity = '';
              node.style.transform = '';
            });
          }, d);
          d += 130;
        });
        setTimeout(nextStep, d + 340);
      });
    };

    nextStep();
  }

  /** Digita caractere a caractere com ritmo levemente irregular. */
  function typeText(target, text, caret, done) {
    let idx = 0;
    const step = () => {
      if (idx >= text.length) { done(); return; }
      target.insertBefore(document.createTextNode(text[idx++]), caret);
      setTimeout(step, 42 + Math.random() * 55);
    };
    setTimeout(step, 220);
  }

  PM.terminal = { init };
})();
