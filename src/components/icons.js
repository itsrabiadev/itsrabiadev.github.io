// Inline SVG icons, resolved at build time (no icon font, no runtime requests).
//  - ui icons:    lucide-static (ISC)
//  - tech logos:  simple-icons (CC0)
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import * as simpleIcons from 'simple-icons';

const require = createRequire(import.meta.url);
const lucideDir = require.resolve('lucide-static/package.json').replace(/package\.json$/, 'icons/');

const brandBySlug = new Map(
  Object.values(simpleIcons)
    .filter((icon) => icon && icon.slug)
    .map((icon) => [icon.slug, icon])
);

// Brands no longer shipped by simple-icons.
const extraBrands = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
};

const lucideCache = new Map();

/** UI icon (stroke). */
export function icon(name, { size = 20, className = '' } = {}) {
  if (!lucideCache.has(name)) {
    const raw = readFileSync(`${lucideDir}${name}.svg`, 'utf8');
    const inner = raw.replace(/<!--[\s\S]*?-->/, '').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
    lucideCache.set(name, inner.replace(/\s*\n\s*/g, ''));
  }
  return `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${lucideCache.get(name)}</svg>`;
}

export const hasBrand = (slug) => Boolean(slug && (brandBySlug.has(slug) || extraBrands[slug]));

/** Brand logo (fill, monochrome via currentColor). */
export function brand(slug, { size = 20, className = '' } = {}) {
  const path = extraBrands[slug] ?? brandBySlug.get(slug)?.path;
  if (!path) return '';
  return `<svg class="brand ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="${path}"/></svg>`;
}
