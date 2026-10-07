import { skillGroups } from '../data/profile.js';
import { esc, list } from '../lib/html.js';
import { brand, hasBrand } from '../components/icons.js';
import { section, sectionHead } from '../components/section.js';

const skillIcon = (item) =>
  hasBrand(item.icon)
    ? brand(item.icon, { size: 18 })
    : `<span class="skill__mono" aria-hidden="true">${esc(item.name.slice(0, 2))}</span>`;

export function skillsSection() {
  return section({
    id: 'skills',
    className: 'skills',
    head: sectionHead({
      id: 'skills',
      index: '03',
      eyebrow: 'Skills',
      title: 'A focused, production-tested stack',
      lede: 'Grouped by where it sits in a product. Backend is the core; everything else is used to ship complete products.',
    }),
    body: `<div class="skills__grid">
      ${list(
        skillGroups,
        (g) => `<article class="skill-group${g.primary ? ' skill-group--primary' : ''}" data-reveal aria-labelledby="skills-${g.id}">
          <header class="skill-group__head">
            <h3 id="skills-${g.id}">${esc(g.title)}</h3>
            ${g.note ? `<span class="badge">${esc(g.note)}</span>` : `<span class="skill-group__count">${g.items.length}</span>`}
          </header>
          <ul class="skill-list" role="list">
            ${list(g.items, (item) => `<li class="skill">${skillIcon(item)}<span>${esc(item.name)}</span></li>`)}
          </ul>
        </article>`
      )}
    </div>`,
  });
}
