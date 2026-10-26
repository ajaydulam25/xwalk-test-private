# Build and local development

## Prerequisites and installation

`README.md` specifies Node.js 20+ and AEM Cloud Service release 2026.4+. The push workflow actually selects Node.js 24, despite its step label saying 20. Prefer the CI Node version for parity and check dependency engine requirements before choosing an older local version. No `engines` field is declared in the manifest.

- Install from the lockfile for reproducibility: `npm ci` (also used in CI).
- Root development instructions also support `npm install`.
- Installation configures Husky via the `prepare` lifecycle.

No dependencies were installed and no runtime or lint checks were executed as part of this documentation-only analysis.

## Local preview

Root `AGENTS.md` documents `npx -y @adobe/aem-cli up --no-open --forward-browser-logs`. The development server uses `http://localhost:3000`, serving local code against previewed authored content. There is no npm `start` or `dev` script.

If authored test content is unavailable, create AEM-structured HTML under a new root `drafts/` directory and add `--html-folder drafts` to the documented CLI invocation. This folder is not present yet. Use `.html` or `.plain.html` fixtures and validate against the real authored contract before publishing.

## Model generation and quality checks

- `npm run build:json` merges the three `models/_component-*.json` entry files into root authoring outputs in parallel.
- `npm run lint` runs JS/JSON ESLint followed by block/global CSS Stylelint.
- `npm run lint:fix` modifies matching files; inspect the resulting diff.
- The Husky pre-commit module rebuilds and stages the three aggregates if staged files match underscore-prefixed JSON partials. Explicitly rebuild after model changes rather than relying only on the hook.
- Browser code needs no compilation or bundling step.

## Publishing

Follow `AGENTS.md`: feature branch → push → AEM Code Sync preview → lint/performance checks → PR with a working feature-preview page URL → human review → merge. Preview URLs follow `https://{branch}--{repo}--{owner}.aem.page/{path}`; live uses `main` and `.aem.live`.

Verify the current repository owner, branch, and demonstration content before constructing links. README contains preview/live examples, but its project title and package repository metadata remain boilerplate. Aim for PageSpeed 100 and check actual results; do not claim scores without measurement.

## Guidance tracking

Current `.gitignore` excludes `.ecc/*`; generated guidance is local by default. Deliberate tracking changes require a separate decision and are not part of documentation creation.
