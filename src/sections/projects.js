import { featuredProjects, archiveProjects, platforms } from '../data/projects.js';
import { esc, attr, list, when } from '../lib/html.js';
import { icon } from '../components/icons.js';
import { projectPicture, browserFrame } from '../components/media.js';
import { section, sectionHead, chips } from '../components/section.js';

const pad = (n) => String(n).padStart(2, '0');
export const caseStudyPath = (p) => `projects/${p.slug}/`;

export const liveLink = (p, className = 'link-arrow') =>
  p.url
    ? `<a class="${className}" href="${attr(p.url)}" target="_blank" rel="noopener">${esc(p.urlLabel ?? 'Live site')} ${icon(
        'arrow-up-right',
        { size: 16 }
      )}<span class="visually-hidden"> (opens in a new tab)</span></a>`
    : '';

function featured(p, i, url) {
  const lead = i === 0;
  const href = p.caseStudy ? url(caseStudyPath(p)) : p.url;
  const sizes = lead ? '(min-width: 900px) 700px, 100vw' : '(min-width: 900px) 640px, 100vw';
  const media = projectPicture({ image: p.image, alt: p.imageAlt, sizes, url });

  return `<article class="feature${lead ? ' feature--lead' : i % 2 ? ' feature--flip' : ''}" data-reveal aria-labelledby="feature-${p.slug}">
    <a class="feature__media" href="${attr(href)}" tabindex="-1" aria-hidden="true">${browserFrame(media, p.urlLabel ?? '')}</a>
    <div class="feature__body">
      <p class="feature__meta"><span class="feature__index">${pad(i + 1)}</span><span>${esc(p.sector)}</span></p>
      <h4 class="feature__title" id="feature-${p.slug}">${
        p.caseStudy ? `<a href="${url(caseStudyPath(p))}">${esc(p.name)}</a>` : esc(p.name)
      }</h4>
      <p class="feature__summary">${esc(p.summary)}</p>
      <dl class="feature__facts">
        <div><dt>Scope</dt><dd>${esc(p.scope)}</dd></div>
        <div><dt>Stack</dt><dd><ul class="tags" role="list">${chips(p.stack, 'tag')}</ul></dd></div>
      </dl>
      <div class="feature__links">
        ${when(
          p.caseStudy,
          () =>
            `<a class="btn btn--secondary btn--sm" href="${url(caseStudyPath(p))}">Read case study ${icon('arrow-right', {
              size: 16,
            })}<span class="visually-hidden">: ${esc(p.name)}</span></a>`
        )}
        ${liveLink(p)}
      </div>
    </div>
  </article>`;
}

function card(p, url) {
  return `<li class="card" data-platform="${p.platform}">
    <article aria-labelledby="card-${p.slug}">
      <div class="card__media">${projectPicture({
        image: p.image,
        alt: p.imageAlt,
        sizes: '(min-width: 1100px) 360px, (min-width: 640px) 46vw, 100vw',
        url,
      })}</div>
      <div class="card__body">
        <p class="card__sector">${esc(p.sector)}</p>
        <h4 class="card__title" id="card-${p.slug}">${esc(p.name)}</h4>
        <p class="card__text">${esc(p.summary)}</p>
        <div class="card__foot">
          <ul class="tags" role="list" aria-label="Stack">${chips(p.stack, 'tag')}</ul>
          ${liveLink(p, 'card__link')}
        </div>
      </div>
    </article>
  </li>`;
}

export function projectsSection(url) {
  const counts = Object.fromEntries(
    platforms.map((pl) => [pl.id, pl.id === 'all' ? archiveProjects.length : archiveProjects.filter((p) => p.platform === pl.id).length])
  );

  return section({
    id: 'projects',
    className: 'projects',
    head: sectionHead({
      id: 'projects',
      index: '04',
      eyebrow: 'Selected work',
      title: 'Projects across fintech, e-commerce, healthcare &amp; real estate',
      lede: 'A selection of platforms and websites I’ve built or worked on. The featured projects below include short case studies.',
    }),
    body: `<h3 class="visually-hidden">Featured projects</h3>
    <div class="features">
      ${list(featuredProjects, (p, i) => featured(p, i, url))}
    </div>

    <div class="archive" data-archive>
      <div class="archive__head" data-reveal>
        <h3 class="archive__title">More projects <span class="text-muted">(${archiveProjects.length})</span></h3>
        <div class="filter js-only" role="group" aria-label="Filter projects by platform">
          ${list(
            platforms.filter((pl) => counts[pl.id] > 0),
            (pl, i) =>
              `<button type="button" class="filter__btn" data-filter="${pl.id}" aria-pressed="${i === 0}">${esc(pl.label)} <span class="filter__count">${counts[pl.id]}</span></button>`
          )}
        </div>
      </div>
      <p class="visually-hidden" aria-live="polite" data-filter-status></p>
      <ul class="archive__grid" role="list" data-archive-grid>
        ${list(archiveProjects, (p) => card(p, url))}
      </ul>
      <div class="archive__more js-only">
        <button type="button" class="btn btn--ghost" data-show-more aria-expanded="false">Show all projects ${icon('arrow-right', {
          size: 16,
          className: 'icon--down',
        })}</button>
      </div>
    </div>`,
  });
}
