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

Cloudflare Pages builds and deploys the `main` branch through its Git integration.

Use these project settings:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist/builtbyjuls/browser`
- Root directory: leave blank

The `.nvmrc` file pins the Node.js version used by the Cloudflare build. Connect `builtbyjuls.com` through the Pages project's Custom domains screen after the domain is active on Cloudflare DNS.
