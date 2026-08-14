# Sites Worker ESM starter

Use this starter for a static microsite, click counter, or simple internal UI whose state is browser-scoped. It has no dependencies and needs no install.

Edit `worker/index.js`. Use the Sites checkpoint when a coherent milestone is ready to inspect or share; the remote builder then runs the checked-in build and validation scripts. Do not run them as a normal pre-checkpoint step.

The build copies only `worker/index.js` and `.openai/hosting.json`. Do not add standalone asset files. Embed any essential raster bytes in `worker/index.js` and serve or reference them as a data URL.

For targeted diagnosis after a remote build failure, the same commands are available in the Sites Linux environment:

```sh
bash scripts/build.sh
node scripts/validate-artifact.mjs
```

The deterministic build produces:

```text
dist/
├── .openai/
│   └── hosting.json
└── server/
    └── index.js
```

`dist/server/index.js` is an ES module with a default export containing `fetch(request, env, ctx)`. Edit `worker/index.js`, not the generated file under `dist/`.

## Local commands

A `Makefile` is included for common tasks:

```sh
make help
make build
make validate
make pages
make preview
make clean
```

You can change the preview port:

```sh
make preview PORT=4173
```

There is also an npm shortcut:

```sh
npm run preview
```

## GitHub Pages

This repo also includes a GitHub Pages workflow at `.github/workflows/deploy-pages.yml`.

- The source of truth stays in `worker/index.js`.
- `npm run build:pages` extracts the inline HTML and writes `pages-dist/index.html`.
- `make preview` builds `pages-dist/` and serves it locally.
- Pushing to `main` triggers deployment.

To enable it in GitHub:

1. Push this repo to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` or run the **Deploy to GitHub Pages** workflow manually.
