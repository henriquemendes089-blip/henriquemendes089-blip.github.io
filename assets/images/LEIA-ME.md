# Imagens

| Arquivo | Uso | Tamanho sugerido |
|---|---|---|
| `henrique-mendes.jpg` | Foto da seção Sobre | 1200×900 (4:3) |
| `og-cover.jpg` | Capa ao compartilhar o link | 1200×630 |

Enquanto o arquivo não existir, o site mostra um placeholder em vidro com o
monograma — nada quebra e nada fica com aparência de erro.

## Imagens de projeto

Crie uma pasta por projeto, usando o mesmo `slug` definido em `data/projects.js`:

```
assets/images/projetos/crescimento-perfil-medico/01.jpg
assets/images/projetos/crescimento-perfil-medico/02.jpg
```

Depois referencie em `data/projects.js`:

```js
galeria: [
  { src: 'assets/images/projetos/crescimento-perfil-medico/01.jpg',
    alt: 'Descrição da imagem', mockup: 'celular' }
]
```

**Dica de performance:** exporte em WebP quando possível e mantenha as imagens
abaixo de ~300 KB. Todas já carregam com `lazy loading`.
