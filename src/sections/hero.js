import { site } from '../data/site.js';
import { techStrip } from '../data/profile.js';
import { esc, list } from '../lib/html.js';
import { icon, brand } from '../components/icons.js';

const stats = [
  { value: site.yearsExperience, label: 'Years of professional experience' },
  { value: site.projectsDelivered, label: 'Projects delivered' },
  { value: 'End-to-end', label: 'Architecture → deployment' },
];

export function hero() {
  return `<section class="hero" id="home" aria-labelledby="hero-title">
  <div class="hero__bg" aria-hidden="true"></div>
  <div class="container hero__grid">
    <div class="hero__copy">
      <p class="availability" data-hero-reveal>
        <span class="availability__dot" aria-hidden="true"></span>${esc(site.availability)}
      </p>
      <p class="eyebrow hero__eyebrow" data-hero-reveal>${esc(site.title)}</p>
      <h1 class="hero__title" id="hero-title" data-hero-reveal>
        Building scalable web applications, APIs <span class="text-gradient">&amp; e&#8209;commerce platforms.</span>
      </h1>
      <p class="hero__lede" data-hero-reveal>
        I’m ${esc(site.name)} — a full stack developer with ${esc(site.yearsExperience)} years of experience.
        I architect backends in <strong>Laravel, Symfony and NestJS</strong>, build frontends in React and Next.js,
        and deliver WordPress &amp; WooCommerce solutions, from data model to deployment.
      </p>
      <div class="hero__actions" data-hero-reveal>
        <a class="btn btn--primary btn--lg" href="#projects">View My Work ${icon('arrow-right', { size: 18 })}</a>
        <a class="btn btn--ghost btn--lg" href="#contact">Let’s Work Together</a>
      </div>
      <ul class="hero__stats" data-hero-reveal>
        ${list(
          stats,
          (s) => `<li class="stat"><span class="stat__value">${esc(s.value)}</span> <span class="stat__label">${esc(s.label)}</span></li>`
        )}
      </ul>
    </div>
    <div class="hero__visual" data-hero-reveal>
      ${architecture()}
      ${floaters()}
    </div>
  </div>
</section>`;
}

/** Decorative stack/architecture panel — purely visual, hidden from assistive tech. */
function architecture() {
  const node = (k, v, mod = '') =>
    `<div class="node ${mod}"><span class="node__k">${k}</span><span class="node__v">${v}</span></div>`;
  const wires = `<div class="arch__wires"><i></i><i></i></div>`;

  return `<div class="arch" aria-hidden="true">
    <div class="arch__bar"><span></span><span></span><span></span><em>system.overview</em></div>
    <div class="arch__body">
      <div class="arch__row">
        ${node('client', 'Next.js · React')}
        ${node('cms / commerce', 'WordPress · WooCommerce')}
      </div>
      ${wires}
      <div class="node node--core">
        <span class="node__k">api layer</span>
        <span class="node__v">Laravel · Symfony · NestJS</span>
        <span class="node__chips"><b>REST</b><b>GraphQL</b><b>Admin</b><b>Integrations</b></span>
      </div>
      ${wires}
      <div class="arch__row">
        ${node('data', 'MySQL · PostgreSQL · MongoDB')}
        ${node('cloud', 'AWS · Vercel · Docker')}
      </div>
    </div>
    <div class="arch__term">
      <p><span class="t-dim">~/project</span> <span class="t-accent">$</span> git push origin main</p>
      <p><span class="t-ok">✓</span> tests <span class="t-ok">✓</span> build <span class="t-ok">✓</span> deploy <span class="t-dim">→ production</span><span class="caret"></span></p>
    </div>
  </div>`;
}

/** Floating stack badges, overlapping the architecture panel. */
function floaters() {
  const badge = (name, mod) => `<span class="float-badge float-badge--${mod}">${name}</span>`;
  return `${badge('Laravel', 'a')}${badge('NestJS', 'b')}${badge('React', 'c')}`;
}

export function techStripSection() {
  return `<section class="tech-strip" aria-label="Core technologies">
  <div class="container tech-strip__inner">
    <p class="tech-strip__label">Core stack</p>
    <ul class="tech-strip__list">
      ${list(techStrip, (t) => `<li>${brand(t.icon, { size: 20 })}<span>${esc(t.name)}</span></li>`)}
    </ul>
  </div>
</section>`;
}
