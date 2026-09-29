function toTextList(cell) {
  if (!cell) return [];

  return cell.textContent
    .split(/\n|,|\||•/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function createHeading(cell) {
  const authoredHeading = cell?.querySelector('h1, h2, h3, h4, h5, h6');
  if (authoredHeading) return authoredHeading;

  const heading = document.createElement('h2');
  heading.textContent = cell?.textContent.trim() || '';
  return heading;
}

function createDescription(cell) {
  const authoredParagraph = cell?.querySelector('p');
  if (authoredParagraph) return authoredParagraph;

  const description = document.createElement('p');
  description.textContent = cell?.textContent.trim() || '';
  return description;
}

/**
 * Decorates the intelligent-personalisation block.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  const cells = rows.map((row) => row.firstElementChild || row);

  const [titleCell, descriptionCell, placeholderCell, ...labelCells] = cells;

  const labels = labelCells.flatMap((cell) => toTextList(cell));

  const content = document.createElement('div');
  content.className = 'intelligent-personalisation-content';

  const heading = createHeading(titleCell);
  const description = createDescription(descriptionCell);
  description.classList.add('intelligent-personalisation-description');

  const searchWrapper = document.createElement('div');
  searchWrapper.className = 'intelligent-personalisation-search';

  const inputLabel = document.createElement('label');
  inputLabel.className = 'visually-hidden';
  inputLabel.setAttribute('for', 'intelligent-personalisation-input');
  inputLabel.textContent = 'Ask TCS';

  const input = document.createElement('input');
  input.id = 'intelligent-personalisation-input';
  input.type = 'text';
  input.placeholder = placeholderCell?.textContent.trim() || 'Ask TCS...';
  input.setAttribute('aria-label', 'Ask TCS');

  const micButton = document.createElement('button');
  micButton.type = 'button';
  micButton.className = 'intelligent-personalisation-mic';
  micButton.setAttribute('aria-label', 'Start voice input');

  searchWrapper.append(inputLabel, input, micButton);

  content.append(heading, description, searchWrapper);

  if (labels.length) {
    const pillList = document.createElement('ul');
    pillList.className = 'intelligent-personalisation-pills';

    labels.forEach((label) => {
      const listItem = document.createElement('li');
      const pillButton = document.createElement('button');
      pillButton.type = 'button';
      pillButton.textContent = label;
      listItem.append(pillButton);
      pillList.append(listItem);
    });

    content.append(pillList);
  }

  block.replaceChildren(content);
}
