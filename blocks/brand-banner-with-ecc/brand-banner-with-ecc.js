/**
 * Decorates a standalone banner with one cell per authored row:
 * image (+ imageAlt), heading group (eyebrow + title + titleType),
 * details group (category + date), and link (+ linkText).
 * Empty optional rows may be omitted; separate text rows are also supported.
 * Original rows/cells stay intact to preserve Universal Editor instrumentation.
 * @param {HTMLElement} block The authored block.
 */
export default function decorate(block) {
  const rows = [...block.children];
  const mediaRow = rows.find((row) => row.querySelector('picture, img'));
  const headingRow = rows.find((row) => row.querySelector('h1, h2, h3, h4, h5, h6'));
  const content = document.createElement('div');
  content.className = 'banner-content';
  const details = document.createElement('div');
  details.className = 'banner-details';

  // Keep authored sources, alt text, loading behavior and editor metadata unchanged.
  if (mediaRow) mediaRow.classList.add('banner-media');

  let headingSeen = false;
  rows.forEach((row) => {
    if (row === mediaRow) return;
    const link = row.querySelector('a[href]');
    row.querySelectorAll('p').forEach((paragraph) => {
      if (!paragraph.textContent.trim() && !paragraph.querySelector('a')) {
        paragraph.hidden = true;
      }
    });

    if (row === headingRow) {
      row.classList.add('banner-heading');
      headingSeen = true;
    } else if (link) {
      row.classList.add('banner-actions');
      // Remove only global button styling; retain unrelated authored classes/attributes.
      link.classList.remove('button', 'primary', 'secondary', 'accent');
      link.classList.add('banner-cta');
      if (link.target === '_blank') {
        link.rel = [...new Set([...link.relList, 'noopener', 'noreferrer'])].join(' ');
      }
      if (link.textContent.trim() || link.getAttribute('aria-label')) {
        const arrow = document.createElement('span');
        arrow.className = 'banner-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        link.append(arrow);
      } else {
        // Never expose a focusable, unnamed call to action.
        row.hidden = true;
      }
    } else if (headingRow && !headingSeen) {
      row.classList.add('banner-eyebrow');
    } else {
      row.classList.add('banner-detail');
      if (!row.textContent.trim()) row.hidden = true;
      details.append(row);
      return;
    }

    if (!row.textContent.trim() && !link) row.hidden = true;
    content.append(row);
  });

  if ([...details.children].some((row) => !row.hidden)) {
    const actions = content.querySelector('.banner-actions');
    content.insertBefore(details, actions);
  } else {
    // Retain empty field instrumentation for the editor, without introducing a gap.
    details.hidden = true;
    content.append(details);
  }

  block.replaceChildren(...(mediaRow ? [mediaRow] : []), content);
  if (!mediaRow && !block.textContent.trim()) block.hidden = true;
}
