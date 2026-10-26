# Teaser with ECC

A standalone teaser with an image on the left and a heading, description, and CTA on the right. Below 600px the image appears above the content.

## Authoring contract

In Universal Editor, add **Teaser with ECC** to a section. Provide an image and alternative text, a title (H2 by default), a paragraph description, and a button URL and label. Choose a heading level appropriate to the page hierarchy. Use empty alternative text only for decorative images.

The semantic field pairs collapse into four single-cell rows:

| Teaser with ECC |
| --- |
| Image (image + imageAlt) |
| Heading (title + titleType) |
| Paragraph description |
| CTA link (link + linkText) |

Keep empty rows in place when omitting a field; do not shift remaining content into another field's row. Image and title are recommended. Description and CTA are optional. A CTA needs both a URL and meaningful label. Inline description links remain inline links, not buttons.

## Acceptance criteria

- Image left, vertically centered text right at 600px and above; stacked below 600px.
- Authored image alternatives, responsive sources, headings, rich text, link destinations, and editor instrumentation survive decoration.
- No image: remaining content fills the width. No description or CTA: no empty spacing. Empty button labels do not create interactive controls.
- Long titles, descriptions, words, and CTA labels wrap without horizontal overflow.
- Native CTA link supports keyboard navigation and visible focus, with at least a 44px target height.
- Existing blocks and shared scripts remain unchanged.

## Validation

Local sample content: `/drafts/teaser-with-ecc` (serve with the AEM CLI's HTML folder set to `drafts`). Examples cover the default, missing optional content, missing image, long text, and missing title/empty CTA label.

Run the JSON aggregation and repository lint checks after authoring changes. Validate the sample in a real browser at 375px, 768px, and 1200px, including keyboard focus and CTA navigation. Verify actual CMS-delivered four-row markup and editor updates before publishing. Local examples are not a CMS preview or evidence of successful browser validation.
