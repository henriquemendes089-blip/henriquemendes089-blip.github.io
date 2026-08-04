# Portfólio — Henrique Mendes

Currículo em formato de experiência digital. HTML, CSS e JavaScript puros: **sem build, sem dependências, sem framework**. Basta subir a pasta.

---

## Sumário

- [Como abrir](#como-abrir)
- [Como publicar no GitHub Pages](#como-publicar-no-github-pages)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Como editar o conteúdo](#como-editar-o-conteúdo)
  - [Adicionar um projeto](#adicionar-um-projeto)
  - [Adicionar uma experiência](#adicionar-uma-experiência)
  - [Atualizar os números do painel](#atualizar-os-números-do-painel)
  - [Habilidades e tecnologias](#habilidades-e-tecnologias)
- [Onde colocar cada arquivo](#onde-colocar-cada-arquivo)
- [Galeria, mockups e vídeos](#galeria-mockups-e-vídeos)
- [Design system](#design-system)
- [Acessibilidade e performance](#acessibilidade-e-performance)
- [Checklist antes de publicar](#checklist-antes-de-publicar)

---

## Como abrir

**Opção 1 — clique duplo.** Abra `index.html` no navegador. Funciona direto, sem servidor.
Os dados ficam em arquivos `.js` justamente para não depender de `fetch`, que o navegador bloqueia em `file://`.

**Opção 2 — servidor local** (recomendado enquanto edita, evita cache agressivo):

```bash
python -m http.server 4173
```

Depois acesse `http://localhost:4173`.

---

## Publicação

O site está no ar em **https://henriquemendes089-blip.github.io/**

Repositório: `henriquemendes089-blip/henriquemendes089-blip.github.io`
(nome no formato `usuario.github.io`, por isso o site fica na raiz do domínio).

### Como enviar uma atualização

Depois de editar qualquer arquivo:

```bash
git add -A && git commit -m "Atualiza conteudo" && git push
```

O GitHub Pages republica sozinho em 1 a 2 minutos.

### Se um dia usar domínio próprio

O endereço aparece em 5 arquivos. Troque `henriquemendes089-blip.github.io` pelo novo domínio em:

| Arquivo | O que trocar |
|---|---|
| `index.html` | `canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD |
| `projects/projeto.html` | `canonical`, `og:image`, `twitter:image` |
| `pages/experiencia.html` | `canonical`, `og:image`, `twitter:image` |
| `robots.txt` | linha `Sitemap:` |
| `sitemap.xml` | as 11 URLs |

Depois crie um arquivo `CNAME` na raiz contendo só o domínio, e aponte o DNS
para o GitHub Pages.

---

## Estrutura de pastas

```
.
├── index.html                  Página principal (todas as seções)
├── 404.html                    Erro 404 (estilos embutidos, funciona em qualquer rota)
├── robots.txt · sitemap.xml · site.webmanifest
│
├── data/                       ← VOCÊ EDITA AQUI (99% do tempo)
│   ├── profile.js              Nome, frases, contatos, foto, currículo
│   ├── experiences.js          Trajetória profissional
│   ├── projects.js             Cases
│   ├── results.js              Métricas do painel
│   ├── skills.js               Habilidades por categoria
│   └── technologies.js         Ferramentas
│
├── pages/experiencia.html      Template de experiência  (?id=SLUG)
├── projects/projeto.html       Template de projeto       (?slug=SLUG)
│
└── assets/
    ├── css/
    │   ├── tokens.css          Cores, tipografia, espaçamento, animação
    │   ├── base.css            Reset, tipografia, layout, scroll reveal
    │   ├── components.css      Navbar, botões, cards, galeria, lightbox, rodapé
    │   ├── sections.css        Identidade visual de cada seção
    │   └── pages.css           Páginas internas e 404
    ├── js/
    │   ├── core/               utils (DOM + ícones) · reveal (animações)
    │   ├── components/         navbar · hero · terminal · lightbox · gallery
    │   ├── render/             uma seção da home por arquivo
    │   ├── pages/              lógica das páginas de detalhe
    │   └── main.js             Inicialização
    ├── images/ · videos/ · icons/ · fonts/ · docs/
    └── docs/                   ← currículo em PDF vai aqui
```

**Princípio:** conteúdo mora em `data/`. Aparência mora em `assets/css/`. Comportamento mora em `assets/js/`. Você quase nunca precisa tocar em HTML.

---

## Como editar o conteúdo

### Adicionar um projeto

Abra `data/projects.js`. No fim do arquivo existe um bloco **MODELO** comentado. Copie, cole no início do array e preencha:

```js
{
  slug: 'campanha-black-friday',      // vira o endereço da página — precisa ser único
  titulo: 'Black Friday 2026',
  subtitulo: 'Campanha de captação em 3 semanas',
  categoria: 'trafego',                // trafego | social | audiovisual | ia | web
  categoriaLabel: 'Tráfego Pago',
  cliente: 'Nome do cliente',
  ano: '2026',
  papel: 'Estratégia e gestão de tráfego',
  status: 'publicado',                 // publicado | em-breve
  destaque: false,
  resumo: 'Frase curta que aparece no card.',
  metricaCard: { valor: '312', label: 'leads gerados' },
  descricao: ['Primeiro parágrafo.', 'Segundo parágrafo.'],
  objetivos: ['...'],
  desafios: ['...'],
  solucoes: ['...'],
  resultados: [{ valor: '312', label: 'Leads', detalhe: 'Em 21 dias' }],
  tecnologias: ['Meta Ads', 'Canva'],
  galeria: [],
  videos: [],
  links: [{ label: 'Ver campanha', href: 'https://...', principal: true }]
}
```

Pronto. O card na home, a página completa, a galeria, o índice lateral, a navegação anterior/próximo e o SEO são gerados sozinhos.

Para aparecer no Google, acrescente a URL em `sitemap.xml`:

```xml
<url><loc>https://SEU-DOMINIO/projects/projeto.html?slug=campanha-black-friday</loc></url>
```

**Sobre o layout:** a grade se reorganiza sozinha. O primeiro card ocupa a linha inteira e os demais ficam dois por linha; se sobrar um ímpar no fim, ele também ocupa a linha. Nunca fica buraco, com qualquer quantidade de projetos.

### Adicionar uma experiência

Mesma lógica em `data/experiences.js`. O array vai **do mais recente para o mais antigo** — a ordem no arquivo é a ordem na timeline.

### Atualizar os números do painel

Em `data/results.js`, troque o `valor` e mude `status` de `'pendente'` para `'ativo'`:

```js
{ id: 'leads', valor: 1240, sufixo: '', label: 'Leads gerados',
  detalhe: '...', icone: 'target', status: 'ativo',
  serie: [80, 140, 260, 430, 700, 980, 1240] }
```

- `serie` desenha o mini-gráfico do card (7 a 12 números, escala automática).
- Cards com `status: 'pendente'` aparecem com o selo *Aguardando* e um traço no lugar do número — honesto e elegante enquanto o dado não existe.
- O contador anima sozinho quando o card entra na tela.

### Habilidades e tecnologias

- `data/skills.js` — categorias e itens. `nivel: 'core'` acende um ponto azul no chip.
- `data/technologies.js` — ferramentas da esteira e da grade.

**Sobre os logos:** cada ferramenta usa um glifo geométrico próprio, desenhado no arquivo — evita reproduzir marca registrada de forma incorreta. Para usar o logo oficial:

1. Baixe o SVG (ex.: [simpleicons.org](https://simpleicons.org)).
2. Salve em `assets/icons/tech/ID.svg` (mesmo `id` do item).
3. Adicione `logoOficial: true` ao item.

---

## Onde colocar cada arquivo

| O quê | Onde | Nome esperado |
|---|---|---|
| Sua foto | `assets/images/` | `henrique-mendes.jpg` |
| Currículo | `assets/docs/` | `henrique-mendes-curriculo.pdf` |
| Capa para redes sociais | `assets/images/` | `og-cover.jpg` (1200×630) |
| Ícone do app | `assets/icons/` | `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` |
| Imagens de projeto | `assets/images/projetos/SLUG/` | livre |
| Vídeos de projeto | `assets/videos/projetos/SLUG/` | livre |

Os nomes de foto e currículo estão definidos em `data/profile.js` — se preferir outro nome, mude lá.

> **Enquanto o arquivo não existe, nada quebra.** Imagens ausentes viram um placeholder em vidro com o monograma e a legenda "em breve". Seções de galeria e vídeo mostram uma caixa explicando onde inserir o conteúdo.

---

## Galeria, mockups e vídeos

**Imagens** (`galeria: []` de cada projeto):

```js
galeria: [
  { src: 'assets/images/projetos/SLUG/01.jpg', alt: 'Painel da campanha', mockup: 'desktop' },
  { src: 'assets/images/projetos/SLUG/02.jpg', alt: 'Story publicado',    mockup: 'celular' },
  { src: 'assets/images/projetos/SLUG/03.jpg', alt: 'Arte final' }
]
```

`mockup` aceita `desktop`, `notebook`, `celular` — ou pode ser omitido para imagem pura. Clicar abre o lightbox (setas do teclado navegam, `Esc` fecha).

**Vídeos** (`videos: []`):

```js
videos: [
  { tipo: 'mp4',     src: 'assets/videos/projetos/SLUG/reel.mp4',
    poster: 'assets/images/projetos/SLUG/poster.jpg', titulo: 'Reel institucional' },
  { tipo: 'youtube', id: 'ID_DO_VIDEO', titulo: 'Depoimento' },
  { tipo: 'vimeo',   id: 'ID_DO_VIDEO', titulo: 'Making of' }
]
```

- **MP4** toca silenciosamente ao entrar na tela e pausa ao sair.
- **YouTube/Vimeo** carregam só depois do clique — a página não paga o custo do player antes disso.

---

## Design system

Todos os valores visuais vivem em `assets/css/tokens.css`. Mudar a identidade do site inteiro é mudar uma variável.

```css
--accent: #5a83f0;    /* azul de acento */
--bg-0:   #050507;    /* fundo da página */
--txt-1:  #f4f5f7;    /* texto principal */
```

**Tipografia:** Inter Tight (títulos e texto) · Instrument Serif itálico (palavra em destaque) · JetBrains Mono (rótulos, terminal, números).
A palavra destacada nos títulos usa a classe `.em`.

**Cada seção tem identidade própria:** grid em perspectiva no topo, editorial no Sobre, trilho luminoso na Experiência, grade bento nos Projetos, painel de produto nos Resultados, cards indexados nas Habilidades, esteira infinita nas Tecnologias e aurora no Contato.

---

## Acessibilidade e performance

- Contraste verificado: texto de apoio 7.6:1, texto secundário 4.7:1, acento 5.5:1 (mínimo WCAG AA é 4.5:1).
- Link "pular para o conteúdo", foco visível em tudo, navegação completa por teclado.
- Lightbox com foco preso e retorno ao elemento de origem.
- `prefers-reduced-motion` desliga **todas** as animações — inclusive partículas, esteira e digitação do terminal, que passam a exibir o estado final.
- Alvos de toque de 44px em telas sensíveis ao toque.
- Zero dependências externas de JavaScript. Imagens com `lazy loading`. Seções fora da tela não são renderizadas (`content-visibility`). Partículas do topo pausam quando saem da tela ou a aba perde o foco.

---

## Checklist antes de publicar

- [ ] Colocar a foto em `assets/images/henrique-mendes.jpg`
- [ ] Colocar o PDF em `assets/docs/henrique-mendes-curriculo.pdf`
- [ ] Criar a capa social `assets/images/og-cover.jpg` (1200×630)
- [ ] Trocar o domínio de exemplo nos 4 arquivos listados acima
- [ ] Preencher os números reais em `data/results.js`
- [ ] Conferir os contatos em `data/profile.js`
- [ ] Abrir no celular e conferir o menu
