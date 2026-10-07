// Tiny templating helpers. Templates are plain template literals; anything that
// comes from data must go through esc() (text) or attr() (attribute values).

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ESC[c]);
export const attr = esc;

/** Join an array of template fragments (falsy entries are dropped). */
export const list = (items, render) => items.map(render).filter(Boolean).join('');

/** Render a fragment only when the condition is truthy. */
export const when = (cond, render) => (cond ? render() : '');

/** Build a page-relative URL so the site works from any base path (GitHub Pages, WAMP, file server). */
export const relative = (depth) => (path = '') => `${'../'.repeat(depth)}${path}` || './';

/** Strip blank lines and leading indentation from rendered HTML. */
export const tidy = (html) =>
  html
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
