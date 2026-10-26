import { decorateButton } from '../../button/button.js';

/**
 * Decorates four single-cell rows: image, heading, description, and CTA.
 * Reuses authored rows/cells to preserve Universal Editor instrumentation.
 * @param {HTMLElement} block the authored teaser
 */
export default function decorate(block) {
  const [imageRow, titleRow, descriptionRow, actionRow] = [...block.children];
  const content = document.createElement('div');
  content.className = 'teaser-with-ecc-content';

  if (titleRow?.textContent.trim()) {
    const cell = titleRow.firstElementChild;
    if (cell && !cell.querySelector('h1, h2, h3, h4, h5, h6')) {
      const heading = document.createElement('h2');
      heading.append(...cell.childNodes);
      cell.append(heading);
    }
    titleRow.classList.add('teaser-with-ecc-title');
    content.append(titleRow);
  }

  if (descriptionRow?.textContent.trim()) {
    descriptionRow.classList.add('teaser-with-ecc-description');
    content.append(descriptionRow);
  }

  const link = actionRow?.querySelector('a[href]');
  if (link?.getAttribute('href').trim() && link.textContent.trim()) {
    link.classList.remove('button', 'primary', 'secondary', 'accent');
    decorateButton(link, { variant: 'solid', size: 'md', color: 'primary' });
    actionRow.classList.add('teaser-with-ecc-actions');
    content.append(actionRow);
  }

  const hasImage = Boolean(imageRow?.querySelector('img'));
  block.classList.toggle('no-image', !hasImage);
  if (hasImage) {
    imageRow.classList.add('teaser-with-ecc-image');
    block.replaceChildren(imageRow, content);
  } else {
    block.replaceChildren(content);
  }
}
