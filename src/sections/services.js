import { services } from '../data/profile.js';
import { links } from '../data/site.js';
import { esc, list } from '../lib/html.js';
import { icon } from '../components/icons.js';
import { section, sectionHead, chips } from '../components/section.js';

export function servicesSection() {
  return section({
    id: 'services',
    className: 'services',
    head: sectionHead({
      id: 'services',
      index: '02',
      eyebrow: 'Services',
      title: 'How I can help',
      lede: 'From a new web application to a WooCommerce store that needs to do more — engagements usually fall into one of these.',
    }),
    body: `<ul class="services__grid" role="list">
      ${list(
        services,
        (s) => `<li class="service" data-reveal>
          <span class="service__icon">${icon(s.icon, { size: 22 })}</span>
          <h3 class="service__title">${esc(s.title)}</h3>
          <p class="service__text">${esc(s.text)}</p>
          <ul class="service__tags" aria-label="Typical technologies">${chips(s.tags, 'tag')}</ul>
        </li>`
      )}
      <li class="service service--cta" data-reveal>
        <h3 class="service__title">Not sure what you need?</h3>
        <p class="service__text">Describe the problem and I’ll suggest a practical approach and stack.</p>
        <a class="link-arrow" href="${links.startProject}">Start a conversation ${icon('arrow-right', { size: 16 })}</a>
      </li>
    </ul>`,
  });
}
