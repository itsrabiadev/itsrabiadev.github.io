import { site } from '../data/site.js';
import { esc, list } from '../lib/html.js';
import { section, sectionHead } from '../components/section.js';

const facts = [
  ['Based in', site.location],
  ['Experience', `${site.yearsExperience} years, since 2015`],
  ['Core stack', 'PHP · Laravel · Symfony · Node.js · NestJS'],
  ['Also building with', 'React · Next.js · WordPress · WooCommerce · Strapi'],
  ['Education', 'B.E. Computer Software Engineering, MUET'],
  ['Working style', 'Remote, async-friendly'],
  ['Workflow', 'AI-assisted — Cursor & Claude'],
];

export function about() {
  return section({
    id: 'about',
    className: 'about',
    head: sectionHead({
      id: 'about',
      index: '01',
      eyebrow: 'About',
      title: 'Backend depth, <span class="text-muted">full stack reach.</span>',
    }),
    body: `<div class="about__grid">
      <div class="about__copy" data-reveal>
        <p class="about__lead">
          I design and build the systems behind websites and web applications — and the interfaces that sit on top of them.
        </p>
        <p>
          For more than nine years I’ve worked on the backend of the web: architecting Laravel and Symfony systems,
          building REST and GraphQL APIs, and keeping databases and infrastructure running the way they should.
        </p>
        <p>
          That foundation expanded into React, Next.js, Node.js and NestJS, so I can take a product from data model to
          finished interface without handing it off halfway — whether it’s a custom web application, a headless CMS build,
          or a WordPress and WooCommerce store.
        </p>
        <p>
          Alongside agency work, I’ve delivered 50+ freelance projects for international clients in fintech, real estate
          and tourism — turning business requirements into working software. AI tools like Cursor and Claude are part of
          my workflow: not to replace judgement, but to move faster through routine work and spend more time on
          architecture and code quality.
        </p>
      </div>
      <div class="facts" data-reveal>
        <dl>
          ${list(facts, ([k, v]) => `<div class="facts__row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)}
        </dl>
      </div>
    </div>`,
  });
}
