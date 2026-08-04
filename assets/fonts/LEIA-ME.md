# Fontes

Hoje o site carrega as fontes pelo Google Fonts, com `preconnect` e `display=swap`:

- **Inter Tight** — títulos e texto
- **Instrument Serif** (itálico) — palavra em destaque nos títulos
- **JetBrains Mono** — rótulos, terminal e números

## Quer hospedar localmente?

Fontes próprias eliminam a conexão com um domínio externo e melhoram um pouco
a nota de performance e a privacidade.

1. Baixe os arquivos `.woff2` em [gwfh.mranftl.com](https://gwfh.mranftl.com).
2. Coloque nesta pasta.
3. Em `assets/css/tokens.css`, declare antes da lista de variáveis:

```css
@font-face {
  font-family: 'Inter Tight';
  src: url('../fonts/inter-tight-variable.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
```

4. Remova as tags do Google Fonts de `index.html`, `pages/experiencia.html`
   e `projects/projeto.html`.

Os nomes das famílias em `--font-sans`, `--font-serif` e `--font-mono` continuam
os mesmos — não é preciso mexer em mais nada.
