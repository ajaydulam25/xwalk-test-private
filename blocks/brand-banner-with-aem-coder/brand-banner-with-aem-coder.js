import { decorateIcons } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

const BLOCK = 'brand-banner-with-aem-coder';
const HEADINGS = 'h1, h2, h3, h4, h5, h6';

/**
 * Expected authored structure (one cell per row, field collapsing and grouping applied):
 *   row 1: background image (picture, alt from imageAlt)
 *   row 2: heading group: eyebrow (p) + title (heading, level from heading_titleType)
 *   row 3: details group: category (p) + date (p)
 *   row 4: call-to-action link (link + linkText)
 * The image, link and heading rows are detected by content; the rest are read in order.
 */

function createElement(tag, className, source) {
  const el = document.createElement(tag);
  el.className = `${BLOCK}-${className}`;
  if (source) moveInstrumentation(source, el);
  return el;
}

function getText(el) {
  return el?.textContent.trim() || '';
}

function isLinkOnly(cell) {
  const link = cell.querySelector('a[href]');
  return link && getText(cell) === getText(link);
}

function buildMedia(cell) {
  const picture = cell?.querySelector('picture');
  if (!picture) return [];
  const media = createElement('div', 'media', cell);
  media.append(picture);
  return [media];
}

function buildHeading(cell) {
  if (!cell) return [];
  let title = cell.querySelector(HEADINGS);
  const paragraphs = [...cell.querySelectorAll('p')].filter((p) => getText(p));

  // a title authored as plain text becomes an h2
  if (!title && paragraphs.length > 1) {
    const source = paragraphs.pop();
    title = createElement('h2', 'title', source);
    title.textContent = getText(source);
  }

  const eyebrows = paragraphs
    .filter((p) => !title?.contains(p))
    .map((p) => {
      p.className = `${BLOCK}-eyebrow`;
      return p;
    });

  if (title) title.className = `${BLOCK}-title`;
  return [...eyebrows, title].filter((el) => el && getText(el));
}

function buildDetails(cell) {
  if (!cell) return [];
  const sources = [...cell.querySelectorAll('p')];
  const items = (sources.length ? sources : [cell])
    .filter((el) => getText(el))
    .map((el) => {
      const span = document.createElement('span');
      if (el !== cell) moveInstrumentation(el, span);
      span.textContent = getText(el);
      return span;
    });
  if (!items.length) return [];
  const details = createElement('p', 'details', cell);
  details.append(...items);
  return [details];
}

function buildAction(cell) {
  const link = cell?.querySelector('a[href]');
  if (!link) return [];

  link.className = `${BLOCK}-cta`;
  const icon = document.createElement('span');
  icon.className = 'icon icon-arrow-right';
  icon.setAttribute('aria-hidden', 'true');
  link.append(icon);
  decorateIcons(link);

  const actions = createElement('p', 'actions', cell);
  actions.append(link);
  return [actions];
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const cells = [...block.children].map((row) => row.firstElementChild || row);

  const imageCell = cells.find((cell) => cell.querySelector('picture'));
  const ctaCell = cells.find((cell) => cell !== imageCell && isLinkOnly(cell));
  const textCells = cells.filter((cell) => cell !== imageCell && cell !== ctaCell);
  const headingCell = textCells.find((cell) => cell.querySelector(HEADINGS)) || textCells[0];
  const detailsCell = textCells.find((cell) => cell !== headingCell);

  const content = createElement('div', 'content');
  content.append(
    ...buildHeading(headingCell),
    ...buildDetails(detailsCell),
    ...buildAction(ctaCell),
  );

  const media = buildMedia(imageCell);
  if (!media.length) block.classList.add('no-image');

  block.replaceChildren(...media, content);
}
