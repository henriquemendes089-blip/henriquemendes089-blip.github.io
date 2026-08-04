# Vídeos

Crie uma pasta por projeto, usando o mesmo `slug` de `data/projects.js`:

```
assets/videos/projetos/crescimento-perfil-medico/reel.mp4
```

Depois referencie em `data/projects.js`:

```js
videos: [
  { tipo: 'mp4',     src: 'assets/videos/projetos/SLUG/reel.mp4',
    poster: 'assets/images/projetos/SLUG/poster.jpg', titulo: 'Reel institucional' },
  { tipo: 'youtube', id: 'ID_DO_VIDEO', titulo: 'Depoimento do cliente' },
  { tipo: 'vimeo',   id: 'ID_DO_VIDEO', titulo: 'Making of' }
]
```

## Como cada formato se comporta

- **MP4** — toca sem som automaticamente quando entra na tela e pausa ao sair.
  Use sempre um `poster`, senão o primeiro quadro fica preto durante o carregamento.
- **YouTube / Vimeo** — o player só é carregado depois do clique. Até lá a página
  exibe apenas a miniatura, o que evita ~1 MB de scripts de terceiros no
  carregamento inicial.

**Dica:** para vídeos hospedados aqui, prefira arquivos abaixo de 5 MB.
Peças mais pesadas rendem mais no YouTube ou Vimeo.
