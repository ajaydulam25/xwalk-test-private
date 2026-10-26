# Frontend styling and clientlibs

## Styling ownership

- `styles/styles.css`: critical site defaults, root color/typography tokens, fallback fonts, global CTAs, icons, and section layout.
- `styles/lazy-styles.css`: lazily requested additional global styles; put noncritical site-wide additions here when appropriate.
- `styles/fonts.css`: real font-face definitions; loaded by the page orchestration module.
- `blocks/<blockname>/<blockname>.css`: block-scoped presentation, loaded through the Edge Delivery block lifecycle.
- `button/button.css`: shared CTA utility styles, loaded by `loadButtonStyles`.

No CSS framework, preprocessor, AEM clientlib tree, or generated theme registry is present. Do not introduce clientlib packaging into this Edge Delivery repository by assumption.

## Tokens and layout

Existing `:root` tokens include background/light/dark/text/link/link-hover colors, body and heading font families, body/heading sizes, and navigation height. Global type sizes change at 900px. Main section content has a 1200px maximum width and 24px horizontal padding, rising to 32px at 900px.

Reuse tokens where their semantics match. New design values should be reviewed for whether they are site-wide tokens or block-local variables; do not silently re-theme unrelated content. There is no central spacing scale yet.

Roboto supplies body text; Roboto Condensed supplies headings. Local fallback faces use size adjustment to reduce layout shift. Fonts are fetched eagerly on desktop/cached sessions and during lazy loading otherwise; avoid unnecessary duplicate font requests.

## Conventions and checks

Follow Stylelint standard and current CSS conventions. Root guidance recommends mobile-first min-width breakpoints at 600/900/1200px; existing global CSS uses modern `@media (width >= 900px)` syntax. CSS indentation is four spaces in `.editorconfig`.

Keep all new block selectors scoped. Generated section container/wrapper classes should not be reused for internal block elements. Preserve focus outlines, ensure contrast and target sizing meet WCAG 2.2 AA, and test narrow screens and long authored text.

The current `lint:css` script covers blocks and global styles but omits `button/button.css`; run an explicit equivalent Stylelint check when changing shared button styles rather than assuming normal lint includes them.
