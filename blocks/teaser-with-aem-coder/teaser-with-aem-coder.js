import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { decorateButton } from '../../button/button.js';

/**
 * Expected authored structure (one cell per row, field collapsing applied):
 *   row 1: image (picture/img, alt from imageAlt)
 *   row 2: title (text)
 *   row 3: description (richtext)
 *   row 4: call-to-action link (link + linkText)
 * Rows may be omitted; cells are detected by content as a fallback.
 */

function buildImage(cell) {
  const img = cell?.querySelector('img');
  if (!img) return null;

  const picture = createOptimizedPicture(img.src, img.alt || '', false, [
    { media: '(min-width: 900px)', width: '900' },
    { width: '750' },
  ]);
  moveInstrumentation(img, picture.querySelector('img'));

  const figure = document.createElement('div');
  figure.className = 'teaser-with-aem-coder-image';
  moveInstrumentation(cell, figure);
  figure.append(picture);
  return figure;
}

function buildTitle(cell) {
  if (!cell) return null;
  const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    heading.classList.add('teaser-with-aem-coder-title');
    return heading;
  }
  const text = cell.textContent.trim();
  if (!text) return null;
  const h2 = document.createElement('h2');
  h2.className = 'teaser-with-aem-coder-title';
  h2.textContent = text;
  moveInstrumentation(cell, h2);
  return h2;
}

function buildDescription(cell) {
  if (!cell || !cell.textContent.trim()) return null;
  const description = document.createElement('div');
  description.className = 'teaser-with-aem-coder-description';
  moveInstrumentation(cell, description);
  description.append(...cell.childNodes);
  return description;
}

function buildAction(cell) {
  const link = cell?.querySelector('a[href]');
  if (!link) return null;

  // unwrap any authored strong/em formatting and default button classes
  link.className = '';
  const actions = document.createElement('p');
  actions.className = 'teaser-with-aem-coder-actions';
  actions.append(link);
  decorateButton(link, { variant: 'solid', size: 'md', color: 'primary' });
  return actions;
}

export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];

  const imageCell = cells.find((cell) => cell.querySelector('picture, img'));
  // the CTA cell holds only a link; rich-text descriptions may contain inline links
  const ctaCell = [...cells].reverse().find((cell) => {
    if (cell === imageCell) return false;
    const link = cell.querySelector('a[href]');
    return link && cell.textContent.trim() === link.textContent.trim();
  });
  const textCells = cells.filter((cell) => cell !== imageCell && cell !== ctaCell);
  const titleCell = textCells.find((cell) => cell.textContent.trim());
  const descriptionCell = textCells.find((cell) => cell !== titleCell && cell.textContent.trim());

  const content = document.createElement('div');
  content.className = 'teaser-with-aem-coder-content';

  const title = buildTitle(titleCell);
  const description = buildDescription(descriptionCell);
  const action = buildAction(ctaCell);
  [title, description, action].filter(Boolean).forEach((el) => content.append(el));

  const image = buildImage(imageCell);
  if (!image) block.classList.add('no-image');

  block.replaceChildren(...[image, content].filter(Boolean));
}
