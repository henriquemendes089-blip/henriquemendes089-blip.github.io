# Componentes

Os componentes reutilizáveis deste projeto **não são arquivos HTML soltos** — eles são
módulos JavaScript que geram o markup:

| Componente | Arquivo |
|---|---|
| Navbar, menu mobile, scroll spy, rodapé | `assets/js/components/navbar.js` |
| Hero (partículas + parallax) | `assets/js/components/hero.js` |
| Terminal | `assets/js/components/terminal.js` |
| Lightbox | `assets/js/components/lightbox.js` |
| Galeria, mockups e vídeos | `assets/js/components/gallery.js` |
| Imagem com placeholder, ícones SVG | `assets/js/core/utils.js` |

**Por que não usar partials `.html`?**
Carregar um HTML externo exige `fetch()`, que o navegador bloqueia no protocolo
`file://`. Como módulos JS, o site funciona tanto com clique duplo em `index.html`
quanto no GitHub Pages — sem servidor e sem build.

O estilo de cada componente está em `assets/css/components.css`.
