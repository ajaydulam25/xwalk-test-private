# Project map

## Overview and stack

`xwalk-test-private` is an AEM Sites Edge Delivery Services website using Universal Editor (xwalk). The package still identifies itself as `@adobe/aem-boilerplate` version 1.3.0. Runtime code uses native ES modules, DOM decoration, HTML, and plain CSS. npm tooling supplies ESLint, Stylelint, JSON aggregation, and Husky; there is no application bundler or framework.

## Live folder ownership and entry points

| Location | Purpose / implementation landmarks |
| --- | --- |
| `head.html` | Loads the core library, page entry module, and critical global CSS; declares CSP and viewport. |
| `scripts/scripts.js` | `loadPage` orchestrates eager/lazy/delayed phases; exports main/button decoration and instrumentation helpers. |
| `scripts/aem.js` | Core Edge Delivery library; never modify. |
| `scripts/editor-support.js`, `editor-support-rte.js` | Universal Editor updates and rich-text instrumentation; `dompurify.min.js` sanitizes update HTML. |
| `scripts/delayed.js` | Placeholder for postponed functionality. |
| `blocks/` | `cards`, `columns`, `footer`, `fragment`, `header`, `hero`, `promo-banner`, `quote`, `teaser`, `teaser-with-aem-coder`. |
| `button/` | Shared `x-button` decorators and asynchronously loaded styles; not an authored block directory. |
| `models/` | Default content/page/section partials and three aggregation entry files. |
| Root `component-*.json` | Generated authoring definitions, models, and filters; definition filename is singular. |
| `styles/` | Critical `styles.css`, below-fold `lazy-styles.css`, and `fonts.css`. |
| `fonts/` | Four Roboto / Roboto Condensed WOFF2 assets. |
| `icons/` | Currently `search.svg`; root `favicon.ico` provides favicon. |
| `tools/sidekick/config.json` | Sidekick configuration. |
| `fstab.yaml`, `paths.json`, `xwalk.json` | AEM markup mount, authoring path mappings, and multi-field configuration. |
| `helix-query.yaml`, `helix-sitemap.yaml` | Query index and sitemap delivery configuration. |
| `.github/` | Push lint workflow, repository creation cleanup workflow, and PR template. |
| `.husky/` | Commit hook that rebuilds and stages authoring aggregates when partials are staged. |
| `.migration/project.json` | Existing migration configuration; verify consumers before changing. |
| `.ecc/` | Local guidance entry point and detailed metadata; ignored by current Git rules. |

Root governance files include `AGENTS.md`, delegating `CLAUDE.md`, `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `LICENSE`.

## Commands found in the manifest

- `npm run lint:js`: ESLint over `.json`, `.js`, and `.mjs`.
- `npm run lint:css`: Stylelint over `blocks/**/*.css` and `styles/*.css`.
- `npm run lint`: both checks, sequentially.
- `npm run lint:fix`: both checks with autofix.
- `npm run build:json`: parallel model/definition/filter aggregation.
- `npm run build:json:models`, `build:json:definitions`, `build:json:filters`: individual merges.
- `npm run prepare`: Husky setup (also an install lifecycle step).

## Tests and missing locations

No `test/`, `tests/`, automated browser test configuration, application test script, or `drafts/` directory was found. Ignore-file references to tests/coverage do not prove a test suite exists. No `node_modules/` was present at inspection. No React app, Maven modules, dispatcher tree, AEM clientlibs, Figma assets, or theme registry was found.

## Architectural boundaries

Authored pages and navigation content come from AEM rather than checked-in route components. Blocks transform authored rows/cells; global scripts coordinate delivery and editor integration. Shared CTA behavior belongs in the existing button utility where suitable. Do not conflate JSON model generation with compiling browser code.
