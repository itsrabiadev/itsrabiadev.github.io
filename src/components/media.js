import { attr } from '../lib/html.js';

// Must match the widths generated in scripts/build.mjs (images step).
export const IMAGE_WIDTHS = [480, 800];
const RATIO = 0.5; // all project screenshots are 2:1

/**
 * Responsive project screenshot: WebP srcset with a JPEG fallback.
 * @param {object} o
 * @param {string} o.image  base name in assets/img/projects
 * @param {string} o.alt
 * @param {string} o.sizes
 * @param {(p: string) => string} o.url  page-relative URL builder
 * @param {boolean} [o.eager]
 */
export function projectPicture({ image, alt, sizes, url, eager = false }) {
  const base = url(`assets/img/projects/${image}`);
  const webp = IMAGE_WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
  const max = IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
  return `<picture>
    <source type="image/webp" srcset="${webp}" sizes="${attr(sizes)}">
    <img src="${base}-${max}.jpg" alt="${attr(alt)}" width="${max}" height="${max * RATIO}" ${
      eager ? 'fetchpriority="high"' : 'loading="lazy"'
    } decoding="async">
  </picture>`;
}

/** Faux browser chrome around a screenshot. */
export function browserFrame(inner, label = '') {
  return `<div class="frame">
    <div class="frame__bar" aria-hidden="true"><span></span><span></span><span></span>${
      label ? `<em>${attr(label)}</em>` : ''
    }</div>
    <div class="frame__body">${inner}</div>
  </div>`;
}
