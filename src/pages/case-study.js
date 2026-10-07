import { site } from '../data/site.js';
import { caseStudies, projectBySlug } from '../data/projects.js';
import { esc, list, when } from '../lib/html.js';
import { icon } from '../components/icons.js';
import { layout } from '../components/layout.js';
import { projectPicture, browserFrame, IMAGE_WIDTHS } from '../components/media.js';
import { chips } from '../components/section.js';
import { contactPanel } from '../sections/contact.js';
import { caseStudyPath, liveLink } from '../sections/projects.js';

const block = (id, title, body) => `<section class="case-block" aria-labelledby="cs-${id}" data-reveal>
  <h2 class="case-block__title" id="cs-${id}">${title}</h2>
  ${body}
</section>`;

function pager(p, url) {
  const i = caseStudies.indexOf(p);
  const prev = caseStudies[(i - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(i + 1) % caseStudies.length];
  const item = (q, dir) => `<a class="pager__link pager__link--${dir}" href="${url(caseStudyPath(q))}">
    <span class="pager__dir">${dir === 'prev' ? 'Previous' : 'Next'} case study</span>
    <span class="pager__name">${esc(q.name)}</span>
  </a>`;
  return `<nav class="pager" aria-label="More case studies">${item(prev, 'prev')}${item(next, 'next')}</nav>`;
}

export function caseStudyPage(p, { url, assets }) {
  const cs = p.caseStudy;
  const related = cs.related ? projectBySlug(cs.related) : null;
  const home = url('');
  const path = caseStudyPath(p);
  const title = `${p.shortName ?? p.name} — Case Study | ${site.name}, ${site.title}`;
  const description = `${p.summary} Case study by ${site.fullName}, ${site.title}.`.slice(0, 300);
  const max = IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];

  const body = `<article class="case">
  <header class="case-hero">
    <div class="hero__bg hero__bg--soft" aria-hidden="true"></div>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><a href="${home}#home">Home</a></li>
          <li><a href="${home}#projects">Projects</a></li>
          <li aria-current="page">${esc(p.shortName ?? p.name)}</li>
        </ol>
      </nav>
      <p class="eyebrow" data-hero-reveal>Case study · ${esc(p.sector)}</p>
      <h1 class="case-hero__title" data-hero-reveal>${esc(p.name)}</h1>
      <p class="case-hero__lede" data-hero-reveal>${esc(p.summary)}</p>
      <div class="case-hero__actions" data-hero-reveal>
        ${p.url ? liveLink(p, 'btn btn--primary') : ''}
        <a class="btn btn--ghost" href="${home}#projects">${icon('arrow-right', { size: 16, className: 'icon--back' })} All projects</a>
      </div>
    </div>
  </header>

  <div class="container case-media" data-hero-reveal>
    ${browserFrame(
      projectPicture({ image: p.image, alt: p.imageAlt, sizes: '(min-width: 1200px) 1136px, 100vw', url, eager: true }),
      p.urlLabel ?? ''
    )}
  </div>

  <div class="container case-layout">
    <div class="case-aside">
      <div class="case-aside__inner">
        <h2 class="case-aside__title" id="glance-title">Overview</h2>
        <dl class="case-facts">
          <div><dt>Project</dt><dd>${esc(p.name)}</dd></div>
          <div><dt>Client</dt><dd>${esc(cs.client)}</dd></div>
          <div><dt>Sector</dt><dd>${esc(p.sector)}</dd></div>
          <div><dt>Role / scope</dt><dd>${esc(p.scope)}</dd></div>
          <div><dt>Technology</dt><dd><ul class="tags" role="list">${chips(p.stack, 'tag')}</ul></dd></div>
          <div><dt>Status</dt><dd>${esc(cs.status)}</dd></div>
          ${when(p.url, () => `<div><dt>Live</dt><dd>${liveLink(p)}</dd></div>`)}
        </dl>
      </div>
    </div>

    <div class="case-content">
      ${block('challenge', 'The challenge', `<p>${esc(cs.challenge)}</p>`)}
      ${block('solution', 'The solution', `<p>${esc(cs.solution)}</p>`)}
      ${block(
        'contribution',
        'My contribution',
        `<ul class="bullets">${list(cs.contribution, (c) => `<li>${esc(c)}</li>`)}</ul>`
      )}
      ${block(
        'features',
        'Key features',
        `<ul class="checklist">${list(cs.features, (f) => `<li>${icon('check', { size: 16 })}<span>${esc(f)}</span></li>`)}</ul>`
      )}
      ${block('technology', 'Technology', `<ul class="tags tags--lg" role="list">${chips(p.stack, 'tag')}</ul>`)}
      ${block('status', 'Result &amp; status', `<p>${esc(cs.status)}.</p>`)}
      ${when(
        related,
        () =>
          block(
            'related',
            'Related work',
            `<div class="related"><div class="related__media">${projectPicture({
              image: related.image,
              alt: related.imageAlt,
              sizes: '240px',
              url,
            })}</div><div><h3 class="related__title">${esc(related.name)}</h3><p>${esc(related.summary)}</p><ul class="tags" role="list">${chips(
              related.stack,
              'tag'
            )}</ul></div></div>`
          )
      )}
    </div>
  </div>

  <div class="container">${pager(p, url)}</div>
</article>
<section class="section contact" aria-labelledby="contact-title">
  <div class="container">${contactPanel({ index: '' })}</div>
</section>`;

  return layout({
    title,
    description,
    path,
    url,
    isHome: false,
    assets,
    ogType: 'article',
    preloadImage: `${url(`assets/img/projects/${p.image}`)}-${max}.webp`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CreativeWork',
            name: p.name,
            headline: `${p.name} — case study`,
            description: p.summary,
            url: new URL(path, site.url).href,
            image: new URL(`assets/img/projects/${p.image}-${max}.jpg`, site.url).href,
            creator: { '@type': 'Person', name: site.fullName, url: site.url },
            keywords: p.stack.join(', '),
            ...(p.url ? { sameAs: p.url } : {}),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
              { '@type': 'ListItem', position: 2, name: 'Projects', item: `${site.url}#projects` },
              { '@type': 'ListItem', position: 3, name: p.name, item: new URL(path, site.url).href },
            ],
          },
        ],
      },
    ],
    body,
  });
}

export function notFoundPage({ url, assets }) {
  return layout({
    title: `Page not found | ${site.name}`,
    description: 'This page could not be found.',
    path: '404.html',
    url,
    isHome: false,
    assets,
    body: `<section class="not-found">
  <div class="container">
    <p class="eyebrow">404</p>
    <h1 class="case-hero__title">This page doesn’t exist.</h1>
    <p class="case-hero__lede">The link may be outdated. Head back to the homepage or browse the projects.</p>
    <div class="case-hero__actions">
      <a class="btn btn--primary" href="${url('')}#home">Back to home</a>
      <a class="btn btn--ghost" href="${url('')}#projects">View projects</a>
    </div>
  </div>
</section>`,
  });
}

