# Brand Banner With ECC

A standalone EDS banner based on Figma file `yElx5Tf9wr8G2vCXopi49W`, node
`174:26773`, including the nested content visible in the design screenshot.
It renders a photographic background, eyebrow, heading, type/date metadata,
and a rounded navigation link with a decorative arrow.

## Authoring

Add **Brand Banner With ECC** to a section in Universal Editor. Choose a background
image, supply the heading, and optionally enter an eyebrow, content type, display
date, and call-to-action destination/text. The heading defaults to H2; choose H1
only when the banner supplies the page's main heading. Leave image alternative
text empty only for decorative imagery. Local design copy is an example, not a
hardcoded production destination.

The model uses the repository's verified element-grouping convention to stay
within the four-cell limit. Image/alt, title/type, and link/text pairs collapse
semantically; the heading and details groups each occupy one cell:

| Brand Banner With ECC |
| --- |
| Background picture (`image`, `imageAlt`) |
| Eyebrow paragraph and heading (`heading_eyebrow`, `heading_title`, `heading_titleType`) |
| Type/date paragraphs (`details_category`, `details_date`) |
| Navigation link (`link`, `linkText`) |

The decorator detects pictures, headings, and links semantically. It also accepts
separate text rows and omitted optional rows. Original rows, cells, paragraphs,
headings, pictures, and links are retained so their editor metadata survives.
Empty paragraphs/details do not introduce spacing or separators, unnamed links
are hidden, and an entirely empty banner is hidden.

## Design and responsive behavior

- Desktop at 1200px+: 859px minimum height, 120px vertical and 80px horizontal
  padding, 96px regular-weight heading, and content in the left of two columns.
- Tablet at 600px+: 640px minimum height, 80px/24px padding, 64px heading.
- Mobile: 480px minimum height, 40px/16px padding, 44px heading, wrapping CTA.
- Long content expands the banner instead of clipping text. The image covers the
  banner to avoid empty side bands, with responsive cropping and a contrast scrim.
- Typography uses the existing body font (Roboto), including for the heading.
  Figma specifies Inter, which is not bundled here. No external font request or
  global typography change was introduced; exact font matching remains a design
  follow-up if a licensed, approved local Inter asset is supplied.
- The arrow is drawn in CSS and hidden from assistive technology. Links remain
  native anchors, have visible keyboard focus, and respect reduced motion.
- Authored image sources, alternative text, dimensions, and loading behavior are
  preserved. Production images should be selected from DAM and previewed so EDS
  supplies optimized responsive pictures. The downloaded PNG is a local draft
  reference only; no production block code points to it.

## Acceptance criteria and validation

Test content: `drafts/brand-banner-with-ecc.plain.html`. It covers the complete
design, absent optional fields/image, long copy with one detail, omitted rows,
and an empty banner. The design CTA uses an in-page destination for testing;
authors must choose the intended production destination.

Verified locally:

- Model aggregation and full repository JS/JSON/CSS lint pass.
- Chrome rendering at 320, 375, 600, 768, 900, 1200, and 1440px has no horizontal
  page overflow. Long content grows vertically; empty banners have zero height.
- Heading level, metadata content, optional-field visibility, original DOM node
  retention, and `data-aue-*` / `data-richtext-*` preservation pass.
- CTA keyboard focus, Enter activation, hover feedback, decorative arrow, target
  height, and reduced-motion behavior pass. No browser console or page errors
  were observed in the local validation scenario.
- Block screenshots are retained locally under `.ecc/brand-banner-<width>.png`
  as review evidence, not production assets.

Pending before production acceptance:

- Author and preview the block in AEM and verify the actual grouped HTML and live
  Universal Editor field updates against this contract.
- The local AEM CLI can serve the fixture's `.plain.html`, but its normal page
  wrapping fails during a remote head lookup due to a certificate-chain error.
  Browser validation used a locally reconstructed standard page shell, mocked
  navigation/footer content, and the real site eager/lazy decoration pipeline.
  No certificate-verification bypass was added.
- Review screenshot fidelity (including font choice and responsive image crop),
  screen-reader behavior, and contrast with the final authored image.
- Measure PageSpeed/Core Web Vitals on the actual feature preview. No performance
  score or full WCAG conformance is claimed by the local checks.

No application test suite was added, and no changes were committed or published.
