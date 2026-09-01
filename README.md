# builtbyjuls

The source for [builtbyjuls.com](https://builtbyjuls.com), Julius Cessar Lapugot's portfolio.

## Local development

Requirements:

- Node.js 22.20 or newer within Angular 21's supported range
- npm 11

```bash
npm ci
npm start
```

The local site runs at `http://localhost:4200`.

## Checks

```bash
npm run check
npm run format:check
```

The production build is a prerendered static site in `dist/builtbyjuls/browser`.

## Deployment

Pushes to `main` run the GitHub Pages workflow. The repository must have GitHub Pages configured to use GitHub Actions. The `CNAME` file declares `builtbyjuls.com`; DNS records still need to point the domain to GitHub Pages before launch.
