# Component development

## Block contract

Create reusable authored features in `blocks/<blockname>/` using `<blockname>.js`, `<blockname>.css`, and, where authorable, `_<blockname>.json`. Export a default decorator accepting the block element; asynchronous decorators are supported when necessary. Inspect actual delivered row/cell markup before assuming field positions or nesting.

Handle missing optional content gracefully. Preserve semantics, image alternatives, heading hierarchy, keyboard interaction, focus visibility, and editor instrumentation while transforming DOM. Use `textContent` for plain strings and retain/sanitize rich content through established boundaries rather than interpolating unchecked HTML.

Existing blocks: cards, columns, footer, fragment, header, hero, promo-banner, quote, teaser, and teaser-with-aem-coder. Header/footer/quote have no block authoring partial in the inspected tree; do not assume all runtime blocks are editor insertables.

## Universal Editor modeling

- Put definitions/models/filters in partials under `models/` or the matching block directory.
- `models/_component-definition.json` aggregates default content, sections, and wildcard block definitions.
- `models/_component-models.json` aggregates page/default-content/section models and wildcard block models.
- `models/_component-filters.json` defines the main section restriction and includes section/block filters.
- Run `npm run build:json` after partial changes; review `component-definition.json`, `component-models.json`, and `component-filters.json` together.
- Check both field modeling and the actual delivered markup; a model label alone does not establish a decorator contract.
- `xwalk.json` enables multi-field support.

## Reuse landmarks

`cards.js` converts rows to list items, moves instrumentation, and optimizes pictures through `createOptimizedPicture`. It is a useful example for semantic list conversion and image replacement.

`teaser.js` expects image, alternative text, pretitle, title, description, and actions rows, with fallback content detection for shorter structures. Reconcile any changes with its own model and editor output.

The shared `button/button.js` exports `decorateButton`, `decorateButtonGroup`, and `loadButtonStyles`. It accepts anchor/button elements and supports solid/outline variants, sm/md/lg sizes, and primary/secondary colors; styles load once on demand. Reuse it for compatible block CTAs.

Global `decorateButtons` is a separate authored-formatting system: strong links become primary, emphasized links secondary, and combined formatting accent. It skips plain URL display links and image links. Do not assume `.button` and `.x-button` share an interchangeable contract.

## Styling and authoring caution

Scope new selectors to their block. Avoid new internal blockname-container/wrapper names even though the existing teaser uses `teaser-wrapper`; treat that as existing debt rather than a pattern to copy. Teaser-with-aem-coder documentation is not a reliable contract summary; inspect its partial and decorator directly.
