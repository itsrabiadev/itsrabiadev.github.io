import { esc } from '../lib/html.js';

/**
 * Consistent section heading: numbered eyebrow + h2 (+ optional lede).
 * `title` is trusted HTML (may contain an accent <span>).
 */
export function sectionHead({ id, index, eyebrow, title, lede = '', align = 'start' }) {
  return `<header class="section-head section-head--${align}" data-reveal>
    <p class="eyebrow"><span class="eyebrow__index">${esc(index)}</span>${esc(eyebrow)}</p>
    <h2 class="section-title" id="${id}-title">${title}</h2>
    ${lede ? `<p class="section-lede">${lede}</p>` : ''}
  </header>`;
}

/** Wrap section content with the standard section element. */
export function section({ id, className = '', head, body }) {
  return `<section class="section ${className}" id="${id}" aria-labelledby="${id}-title">
  <div class="container">
    ${head}
    ${body}
  </div>
</section>`;
}

export const chips = (items, className = 'chip') =>
  items.map((t) => `<li class="${className}">${esc(t)}</li>`).join('');
