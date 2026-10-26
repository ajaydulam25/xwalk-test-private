# Figma workflow

## Design-to-repository placement

Before design implementation, sync the live project structure and `.ecc/GUIDELINES.md`. Reuse an existing authored block when its content contract genuinely fits; otherwise create a new self-contained block under `blocks/<blockname>/` with matching JS/CSS and Universal Editor modeling as needed.

A design page should normally be composed as AEM sections, default content, and blocks, not a React page or a new application route. Shared compatible CTA behavior can use `button/`. Put only truly global theme changes in `styles/`; keep unique presentation scoped to a block.

## Required decisions and verification

- Establish whether the design represents a full page or reusable component, and whether existing design components should be included.
- Obtain layout, styles, and visual references before assuming typography, spacing, imagery, or responsive behavior.
- Inspect existing tokens, block contracts, and delivered authored markup before implementation.
- Determine the authoring fields and optional-content behavior before coding the decorator.
- Preserve editor metadata, semantic HTML, WCAG 2.2 AA behavior, and staged performance loading.
- Validate against actual authored content or an AEM-structured draft fixture, then check the feature preview.

## Readiness gaps

No Figma link/export, design-system mapping, `.ecc/THEMES.md`, or `.ecc/COMPONENTS.md` registry was found in the original repository. The guidance documents are not a source of design measurements. No local drafts or browser test suite exists yet. Obtain missing design/content details when essential, rather than inventing a new architecture or authoring contract.
