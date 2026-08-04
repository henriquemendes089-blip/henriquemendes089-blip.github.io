# Ícones

| Arquivo | Uso |
|---|---|
| `favicon.svg` | Ícone da aba (já incluído) |
| `apple-touch-icon.png` | Ícone no iOS — 180×180 |
| `icon-192.png` | Manifest — 192×192 |
| `icon-512.png` | Manifest — 512×512 |

## `tech/` — logos oficiais das ferramentas

Cada ferramenta em `data/technologies.js` usa um glifo geométrico próprio,
desenhado no arquivo de dados. Isso evita reproduzir marca registrada de forma
incorreta.

Para usar o logo oficial de uma marca:

1. Baixe o SVG em [simpleicons.org](https://simpleicons.org).
2. Salve como `assets/icons/tech/ID.svg`, usando o mesmo `id` do item
   (`claude`, `chatgpt`, `gemini`, `veo`, `meta-ads`, `canva`, `capcut`).
3. Adicione `logoOficial: true` ao item em `data/technologies.js`.

Sem essa marcação o site nem procura o arquivo — evita requisições 404.

> Os ícones de interface (setas, play, copiar, redes sociais) ficam no registro
> SVG em `assets/js/core/utils.js`, todos no mesmo padrão de traço.
