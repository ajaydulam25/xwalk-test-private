# Assets and dispatcher

## Asset locations

The repository contains four WOFF2 fonts in `fonts/`, `icons/search.svg`, root `favicon.ico`, and bundled `scripts/dompurify.min.js`. Authored media normally comes from AEM-delivered content. No mock-data or dedicated design-export folder was found.

Use `createOptimizedPicture` from the core library for compatible authored image transformations, preserving alternative text and editor attributes. Optimize any committed image/font assets and review file size. Lazy-load noncritical media; treat a first-section/LCP image differently from below-fold images.

## Delivery configuration

- `fstab.yaml` mounts an AEM author markup endpoint at `/`, with HTML suffix. Treat environment-specific settings as configuration, not reusable content.
- `paths.json` maps `/content/aue-eds-demo/` to site-root content and maps its configuration/metadata resources to delivery JSON paths; includes are restricted to that content root.
- `xwalk.json` enables public multi-field support.
- `helix-query.yaml` indexes pages into `/query-index.json`, excluding JSON paths and capturing last-modified/robots properties.
- `helix-sitemap.yaml` generates `/sitemap.xml` from that index.
- `tools/sidekick/config.json` contains Sidekick integration settings.

No dispatcher module, Apache configuration, Maven packaging, or clientlib hierarchy exists here. Site delivery follows Edge Delivery conventions; do not invent dispatcher/clientlib tasks.

## Security and exposure

`head.html` declares a nonce-based CSP and disallows objects with a self-only base URI. Preserve security policy and intentional script loading. Editor update HTML passes through bundled DOMPurify; do not bypass it.

`.hlxignore` excludes dot-prefixed paths, Markdown, manifests/lockfile, license, test paths, and underscore-prefixed resources. `.gitignore` separately excludes `.ecc/*`, dependencies, local artifacts, and coverage. Git ignore rules are not a substitute for delivery exclusions or secret hygiene. Never commit credentials; client-side assets are publicly served.
