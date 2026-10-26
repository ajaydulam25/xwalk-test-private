# Flagged for deletion / review-only observations

## Deletion status

No files are confirmed safe for deletion. This analysis does not authorize cleanup or change application code. Inspect references, ownership, deployment consumers, and authored content before proposing removals.

## Documentation and configuration drift

- `README.md` retains a placeholder project title/description; package metadata still identifies the starter boilerplate. Review for documentation updates, not deletion.
- `AGENTS.md` illustrates `component-definitions.json` and repeats the models filename for filters. The manifest and live files use `component-definition.json`, `component-models.json`, and `component-filters.json`.
- The push workflow label says Node.js 20, but `node-version` is 24. Align the label separately if desired.
- Teaser-with-aem-coder README describes model `teaser` and generic one-cell content, while its actual partial defines `teaser-with-aem-coder` with six fields. Verify decorator/CMS output before rewriting the authoring instructions.
- Existing teaser uses internal `teaser-wrapper`, contrary to the root class naming recommendation. Preserve compatibility unless a deliberate refactor is scoped and validated.
- `lint:css` does not cover the shared `button/` CSS. Expanding lint coverage is a separate code/config decision.
- Ignore rules mention absent tests/coverage/Karma-related locations. These may reserve future workflows and are not inherently obsolete.
- `.migration/project.json` and repository-creation cleanup automation require consumer/lifecycle review before removal.

## Guidance persistence

`.ecc/*` is Git-ignored. This may be intentional for local assistant guidance; do not remove the ignore rule simply to make generated documents appear in normal status output.
