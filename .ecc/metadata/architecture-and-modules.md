# Architecture and modules

## Content-driven runtime

AEM supplies page HTML through the markup mount in `fstab.yaml`. `head.html` loads native modules and critical CSS. Default content, section metadata, and authored block rows are decorated in the browser; there is no checked-in SPA router or backend service.

## Loading phases

`scripts/scripts.js` invokes `loadPage()`:

1. Eager: set document language, decorate template/theme and main content, reveal the body, load the first section while waiting for its first image. Fonts are also requested on desktop or when the session flag exists.
2. Lazy: request header, load remaining sections, handle hash scrolling, request footer, and load lazy styles/fonts.
3. Delayed: import `scripts/delayed.js` after 3000ms; it currently contains only a placeholder comment.

`decorateMain` decorates icons, calls the currently empty auto-block hook, decorates sections and blocks, and decorates formatted CTA links. Keep new eager work tightly constrained to LCP requirements.

## Shared boundaries

- `scripts/aem.js` is protected core infrastructure. Call helpers rather than editing it.
- `moveAttributes` and `moveInstrumentation` in `scripts/scripts.js` support DOM replacement without losing authoring metadata.
- `blocks/fragment/fragment.js` fetches same-site `.plain.html`, resets relative media paths, then decorates and loads sections. Reuse its loader for fragment behavior rather than duplicating fetching/decorating logic.
- `button/button.js` is a shared utility imported by the teaser; it is separate from global formatted-link button decoration.
- `models/` and block partials define the Universal Editor contract; generated root JSON files expose the aggregate.

## Editor integration

`scripts/editor-support.js` processes Universal Editor patch/update/add/move/remove/copy events, sanitizes returned HTML using DOMPurify, and redecorates affected content. It falls back to a page reload if updates cannot be applied. Rich-text instrumentation is handled separately and observed for changes.

Preserve `data-aue-*` and `data-richtext-*` attributes on moved content and image replacements. Do not bypass sanitization or assume a new decorator only runs on an initial page load. Verify editor loading/integration in the actual authoring environment before changing it.

## Placement rules

Use self-contained blocks for reusable authored features, global scripts for cross-page orchestration, global CSS for true site defaults, and shared utilities for behavior used by multiple blocks. Pages remain CMS content; local HTML fixtures are a development fallback, not a routing architecture.
