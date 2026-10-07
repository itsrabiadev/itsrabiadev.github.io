import { site, nav, links } from '../data/site.js';
import { esc, attr, list } from '../lib/html.js';
import { icon, brand } from './icons.js';

/**
 * Shared page shell.
 * @param {object} page
 * @param {string} page.title
 * @param {string} page.description
 * @param {string} page.path        canonical path relative to site root ('' for home)
 * @param {(p: string) => string} page.url   page-relative URL builder
 * @param {boolean} page.isHome
 * @param {object[]} [page.jsonLd]
 * @param {string} page.body
 * @param {object} page.assets      { css, js, font } hashed asset paths
 * @param {string} [page.ogType]
 * @param {string} [page.preloadImage]
 */
export function layout(page) {
  const { url, isHome } = page;
  const canonical = new URL(page.path, site.url).href;
  const ogImage = new URL(site.seo.ogImage, site.url).href;
  const home = isHome ? '' : url('');

  return `<!doctype html>
<html lang="${site.locale}" class="no-js">
<head>
<meta charset="utf-8">
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-7S4V6G2C5H"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-7S4V6G2C5H');
</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${attr(page.description)}">
<link rel="canonical" href="${canonical}">
<meta name="author" content="${attr(site.fullName)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#08080D">
<meta name="color-scheme" content="dark">
<meta property="og:type" content="${page.ogType ?? 'website'}">
<meta property="og:site_name" content="${attr(`${site.name} — ${site.title}`)}">
<meta property="og:title" content="${attr(page.title)}">
<meta property="og:description" content="${attr(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${attr(`${site.name} — ${site.title}`)}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(page.title)}">
<meta name="twitter:description" content="${attr(page.description)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="${url('favicon.svg')}" type="image/svg+xml">
<link rel="icon" href="${url('favicon-32.png')}" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${url('apple-touch-icon.png')}">
<link rel="manifest" href="${url('site.webmanifest')}">
<link rel="preload" href="${url(page.assets.font)}" as="font" type="font/woff2" crossorigin>
${page.preloadImage ? `<link rel="preload" as="image" type="image/webp" href="${page.preloadImage}">` : ''}
<link rel="stylesheet" href="${url(page.assets.css)}">
<script>document.documentElement.className='js'</script>
<script src="${url(page.assets.js)}" defer></script>
${list(page.jsonLd ?? [], (data) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`)}
</head>
<body${isHome ? ' class="is-home"' : ''}>
<a class="skip-link" href="#main">Skip to content</a>
${header({ home, isHome })}
<main id="main" tabindex="-1">
${page.body}
</main>
${footer({ home })}
</body>
</html>`;
}

function navLinks(home, attrs = '') {
  return list(
    nav,
    (item) =>
      `<li><a href="${home}#${item.id}" data-nav="${item.id}"${attrs}>${esc(item.label)}</a></li>`
  );
}

function header({ home }) {
  return `<header class="site-header" data-header>
  <div class="container site-header__inner">
    <a class="logo" href="${home}#home" aria-label="${attr(`${site.name}, ${site.title} — home`)}">
      <span class="logo__mark" aria-hidden="true">R</span>
      <span class="logo__text">${esc(site.name)}</span>
    </a>
    <nav class="site-nav" aria-label="Primary">
      <ul class="site-nav__list">${navLinks(home)}</ul>
    </nav>
    <a class="btn btn--primary btn--sm site-header__cta" href="${home}#contact">Let’s Work Together</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
      <span class="visually-hidden" data-menu-label>Open menu</span>
      <span class="menu-toggle__bars" aria-hidden="true"><span></span><span></span></span>
    </button>
  </div>
  <div class="mobile-menu" id="mobile-menu" data-menu hidden>
    <nav class="container" aria-label="Mobile">
      <ul class="mobile-menu__list">${navLinks(home)}</ul>
      <div class="mobile-menu__footer">
        <a class="btn btn--primary btn--block" href="${home}#contact">Let’s Work Together ${icon('arrow-right', { size: 18 })}</a>
        <p class="mobile-menu__meta">${esc(site.availability)}</p>
      </div>
    </nav>
  </div>
</header>`;
}

function footer({ home }) {
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="container">
    <div class="site-footer__top">
      <div class="site-footer__brand">
        <a class="logo" href="${home}#home"><span class="logo__mark" aria-hidden="true">R</span><span class="logo__text">${esc(site.name)}</span></a>
        <p>${esc(site.title)}</p>
      </div>
      <nav aria-label="Footer">
        <ul class="site-footer__nav">${navLinks(home)}</ul>
      </nav>
      <ul class="social" aria-label="Contact and social links">
        <li><a href="${site.contact.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn (opens in a new tab)">${brand('linkedin', { size: 18 })}</a></li>
        <li><a href="${links.email}" aria-label="Email ${attr(site.contact.email)}">${icon('mail', { size: 18 })}</a></li>
        <li><a href="${links.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp (opens in a new tab)">${brand('whatsapp', { size: 18 })}</a></li>
      </ul>
    </div>
    <div class="site-footer__bottom">
      <p>© ${year} ${esc(site.fullName)}. All rights reserved.</p>
      <p>${esc(site.location)} · Remote, async-friendly</p>
    </div>
  </div>
</footer>`;
}
