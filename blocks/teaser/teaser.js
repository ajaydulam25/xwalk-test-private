import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { decorateButtonGroup } from '../../button/button.js';

function cellByIndex(rows, index) {
  return rows[index]?.firstElementChild || null;
}

function getTextContent(cell) {
  return cell?.textContent?.trim() || '';
}

function buildImage(cell, imageAlt) {
  const img = cell?.querySelector('img');
  if (!img) return null;

  const optimizedPicture = createOptimizedPicture(img.src, imageAlt || img.alt || '', false, [{ width: '1200' }]);
  moveInstrumentation(img, optimizedPicture.querySelector('img'));

  const figure = document.createElement('figure');
  figure.className = 'teaser-image';
  figure.append(optimizedPicture);
  return figure;
}

function buildTitle(cell) {
  if (!cell) return null;

  const existingHeading = cell.querySelector('h1, h2, h3, h4, h5, h6');
  if (existingHeading) {
    existingHeading.classList.add('teaser-title');
    return existingHeading;
  }

  const text = getTextContent(cell);
  if (!text) return null;

  const heading = document.createElement('h2');
  heading.className = 'teaser-title';
  heading.textContent = text;
  return heading;
}

function buildDescription(cell) {
  if (!cell) return null;

  const wrapper = document.createElement('div');
  wrapper.className = 'teaser-description';
  wrapper.append(...[...cell.childNodes]);

  return wrapper.childNodes.length ? wrapper : null;
}

function buildActions(cell) {
  if (!cell) return null;

  const actionItems = [...cell.querySelectorAll(':scope > div')];
  const fallbackActions = [...cell.querySelectorAll('a[href], button')];
  const actionElements = [];

  actionItems.forEach((item) => {
    const existingAction = item.querySelector('a[href], button');
    if (existingAction) {
      actionElements.push(existingAction);
      return;
    }

    const values = [...item.querySelectorAll(':scope > div, :scope > p')]
      .map((element) => element.textContent.trim())
      .filter(Boolean);

    if (values.length < 2) return;

    const [first, second] = values;
    const firstLooksLikeUrl = /^(https?:\/\/|\/|#|mailto:|tel:)/i.test(first);
    const href = firstLooksLikeUrl ? first : second;
    const text = firstLooksLikeUrl ? second : first;

    if (!href || !text) return;

    const actionLink = document.createElement('a');
    actionLink.href = href;
    actionLink.textContent = text;
    actionElements.push(actionLink);
  });

  const normalizedActions = actionElements.length ? actionElements : fallbackActions;
  const actions = document.createElement('div');
  actions.className = 'teaser-actions';
  actions.append(...normalizedActions);
  const decoratedActions = decorateButtonGroup(actions, {
    variant: 'solid',
    size: 'md',
    color: 'primary',
  });

  return decoratedActions.length ? actions : null;
}

export default function decorate(block) {
  const rows = [...block.children];
  const imageCell = cellByIndex(rows, 0);
  const imageAltCell = cellByIndex(rows, 1);
  const preTitleCell = cellByIndex(rows, 2);
  const titleCell = cellByIndex(rows, 3);
  const descriptionCell = cellByIndex(rows, 4);
  const actionsCell = cellByIndex(rows, 5);

  const imageAlt = getTextContent(imageAltCell);
  const content = document.createElement('div');
  content.className = 'teaser-content';

  const preTitle = getTextContent(preTitleCell);
  if (preTitle) {
    const preTitleElement = document.createElement('p');
    preTitleElement.className = 'teaser-pretitle';
    preTitleElement.textContent = preTitle;
    content.append(preTitleElement);
  }

  const title = buildTitle(titleCell);
  if (title) content.append(title);

  const description = buildDescription(descriptionCell);
  if (description) content.append(description);

  const actions = buildActions(actionsCell);
  if (actions) content.append(actions);

  const teaserWrapper = document.createElement('div');
  teaserWrapper.className = 'teaser-wrapper';

  const image = buildImage(imageCell, imageAlt);
  if (image) teaserWrapper.append(image);

  teaserWrapper.append(content);
  block.replaceChildren(teaserWrapper);
}
