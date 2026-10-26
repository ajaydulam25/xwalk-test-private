# Reference resources

## Repository sources

- Root `AGENTS.md`: architecture, coding standards, local development, performance, and publishing process; read before implementation.
- Root `CLAUDE.md`: delegates to `AGENTS.md`.
- Root `README.md`: prerequisites and example preview/live environments; project title remains a placeholder.
- `package.json` and lockfile: authoritative npm scripts and declared development dependencies.
- `.eslintrc.js`, `.stylelintrc.json`, `.editorconfig`: lint and formatting conventions.
- `.github/workflows/main.yaml`: actual CI checks and Node version.
- `.husky/pre-commit.mjs`: authoring aggregate regeneration behavior.
- Model partials and corresponding decorators: actual authoring/runtime contracts; prefer these over incomplete block prose.

## Official implementation guidance

- [AEM Edge Delivery documentation](https://www.aem.live/docs/) — General delivery and authoring concepts.
- [Developer tutorial](https://www.aem.live/developer/tutorial) — Core development workflow.
- [Universal Editor tutorial](https://www.aem.live/developer/ue-tutorial) — Editor integration and content authoring.
- [Component model definitions](https://www.aem.live/developer/component-model-definitions) — Model/definition/filter design.
- [Markup sections and blocks](https://www.aem.live/developer/markup-sections-blocks) — Authored DOM structure.
- [Markup reference](https://www.aem.live/developer/markup-reference) — Default content and block contracts.
- [Authoring path mapping](https://www.aem.live/developer/authoring-path-mapping) — Content path configuration.
- [Keeping it 100](https://www.aem.live/developer/keeping-it-100) — Performance practices.
- [Fragment block](https://www.aem.live/developer/block-collection/fragment) — Fragment loading patterns.
- [xwalk ESLint rules](https://github.com/adobe-rnd/eslint-plugin-xwalk#rules) — Applied modeling checks.
- [xwalk boilerplate](https://github.com/adobe-rnd/aem-boilerplate-xwalk/) — Upstream implementation examples.

These links are reference sources from repository guidance, not evidence of a live documentation audit. Verify current official guidance when a task depends on evolving platform behavior.
