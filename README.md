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

Cloudflare Workers Builds deploys the `main` branch through its Git integration. Wrangler serves the prerendered site as static assets and falls back to Angular for unknown client-side routes.

Use these project settings:

- Project name: `builtbyjuls`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Non-production branch deploy command: `npx wrangler versions upload`
- Path: `/`

The `.nvmrc` file pins the Node.js version used by the Cloudflare build. The deployment configuration is in `wrangler.jsonc`. Connect `builtbyjuls.com` through the Worker's Domains & Routes screen after the domain is active on Cloudflare DNS.
