import { experience, recognition } from '../data/profile.js';
import { esc, list, when } from '../lib/html.js';
import { icon } from '../components/icons.js';
import { section, sectionHead, chips } from '../components/section.js';

const role = (r) => `<li class="role${r.highlight ? ' role--highlight' : ''}" data-reveal>
  <span class="role__node" aria-hidden="true"></span>
  <div class="role__card">
    <div class="role__top">
      <p class="role__dates"><time>${esc(r.start)}</time> — ${r.end === 'Present' ? 'Present' : `<time>${esc(r.end)}</time>`}</p>
      ${when(r.current, () => '<span class="badge badge--live">Current</span>')}
    </div>
    <h3 class="role__title">${esc(r.role)}</h3>
    <p class="role__org">${esc(r.org)}</p>
    ${when(r.summary, () => `<p class="role__summary">${esc(r.summary)}</p>`)}
    <ul class="role__points">
      ${list(r.points, ([lead, text]) => `<li>${lead ? `<strong>${esc(lead)}</strong> — ` : ''}${esc(text)}</li>`)}
    </ul>
    ${when(r.stack.length, () => `<ul class="tags" role="list" aria-label="Technologies">${chips(r.stack, 'tag')}</ul>`)}
  </div>
</li>`;

export function experienceSection() {
  return section({
    id: 'experience',
    className: 'experience',
    head: sectionHead({
      id: 'experience',
      index: '05',
      eyebrow: 'Experience',
      title: 'Career timeline',
      lede: 'Agency engineering and independent client work, running in parallel since 2016.',
    }),
    body: `<ol class="timeline" role="list">
      ${list(experience, role)}
    </ol>
    <div class="recognition">
      <h3 class="recognition__title" data-reveal>Recognition &amp; education</h3>
      <ul class="recognition__grid" role="list">
        ${list(
          recognition,
          (r) => `<li class="honor" data-reveal>
            <span class="honor__icon">${icon(r.icon, { size: 18 })}</span>
            <div><p class="honor__title">${esc(r.title)}</p><p class="honor__org">${esc(r.org)}</p><p class="honor__text">${esc(r.text)}</p></div>
          </li>`
        )}
      </ul>
    </div>`,
  });
}
