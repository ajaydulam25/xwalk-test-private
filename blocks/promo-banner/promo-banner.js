import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { decorateButtonGroup } from '../../button/button.js';

function buildImage(cell, imageAlt) {
  const img = cell?.querySelector('img');
  if (!img) return null;

  const optimizedPicture = createOptimizedPicture(img.src, imageAlt || img.alt || '', false, [{ width: '1600' }]);
  moveInstrumentation(img, optimizedPicture.querySelector('img'));

  const figure = document.createElement('figure');
  figure.className = 'promo-banner-image';
  figure.append(optimizedPicture);
  return figure;
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

    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    actionElements.push(link);
  });

  const normalizedActions = actionElements.length ? actionElements : fallbackActions;
  if (!normalizedActions.length) return null;

  normalizedActions.forEach((action, index) => {
    // eslint-disable-next-line no-param-reassign
    action.dataset.variant = index === 1 ? 'outline' : 'solid';
  });

  const actions = document.createElement('div');
  actions.className = 'promo-banner-actions';
  actions.append(...normalizedActions);

  const decoratedActions = decorateButtonGroup(actions, {
    size: 'md',
    color: 'primary',
  });

  return decoratedActions.length ? actions : null;
}

export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const imageCell = cells.find((cell) => cell.querySelector('picture, img'));
  const actionsCell = cells.find((cell) => cell !== imageCell && cell.querySelector('a[href], button, ul, ol'))
    || cells.find((cell) => cell !== imageCell);

  const wrapper = document.createElement('div');
  wrapper.className = 'promo-banner-wrapper';

  const imageAltCell = cells.find((cell) => !cell.querySelector('picture, img') && !cell.querySelector('a[href], button, ul, ol') && cell.textContent.trim());
  const imageAlt = imageAltCell?.textContent?.trim() || '';
  const image = buildImage(imageCell, imageAlt);
  if (image) wrapper.append(image);

  const actions = buildActions(actionsCell?.cloneNode(true));
  if (actions) wrapper.append(actions);

  block.replaceChildren(wrapper);
}
