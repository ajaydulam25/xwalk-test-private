import { loadCSS } from '../scripts/aem.js';

const VARIANTS = ['solid', 'outline'];
const SIZES = ['sm', 'md', 'lg'];
const COLORS = ['primary', 'secondary'];

let buttonStylesPromise;

function normalize(value, supported, fallback) {
  return supported.includes(value) ? value : fallback;
}

function resolveOption(element, key, supported, fallback) {
  const dataValue = element.dataset?.[key];
  const classValue = supported.find((name) => element.classList.contains(name));

  return normalize(dataValue || classValue || fallback, supported, fallback);
}

export function loadButtonStyles() {
  if (!buttonStylesPromise) {
    buttonStylesPromise = loadCSS(`${window.hlx.codeBasePath}/button/button.css`);
  }

  return buttonStylesPromise;
}

/**
 * Decorates an anchor/button with reusable button classes.
 * @param {HTMLElement} element anchor or button element
 * @param {{variant?: string, size?: string, color?: string}} options button options
 * @returns {HTMLElement | null}
 */
export function decorateButton(element, options = {}) {
  if (!element || !['A', 'BUTTON'].includes(element.tagName)) return null;

  const variant = normalize(
    options.variant || resolveOption(element, 'variant', VARIANTS, 'solid'),
    VARIANTS,
    'solid',
  );
  const size = normalize(
    options.size || resolveOption(element, 'size', SIZES, 'md'),
    SIZES,
    'md',
  );
  const color = normalize(
    options.color || resolveOption(element, 'color', COLORS, 'primary'),
    COLORS,
    'primary',
  );

  element.classList.add('x-button', `x-button--${variant}`, `x-button--${size}`, `x-button--${color}`);
  element.classList.remove(...VARIANTS, ...SIZES, ...COLORS);

  if (!element.getAttribute('title')) {
    element.setAttribute('title', element.textContent.trim());
  }

  loadButtonStyles();
  return element;
}

/**
 * Decorates all action links inside a container.
 * @param {HTMLElement} container actions wrapper
 * @param {{variant?: string, size?: string, color?: string}} options default options
 * @returns {HTMLElement[]} list of decorated actions
 */
export function decorateButtonGroup(container, options = {}) {
  if (!container) return [];

  const actions = [...container.querySelectorAll('a[href], button')]
    .map((element) => decorateButton(element, options))
    .filter(Boolean);

  if (actions.length) {
    container.classList.add('x-button-group');
  }

  return actions;
}
