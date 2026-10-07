import { reasons } from '../data/profile.js';
import { site, links } from '../data/site.js';
import { esc, attr, list } from '../lib/html.js';
import { icon, brand } from '../components/icons.js';
import { section, sectionHead } from '../components/section.js';

export function whySection() {
  return section({
    id: 'why',
    className: 'why',
    head: sectionHead({
      id: 'why',
      index: '06',
      eyebrow: 'Why work with me',
      title: 'Senior experience, <span class="text-muted">focused on your business.</span>',
    }),
    body: `<ol class="why__grid" role="list">
      ${list(
        reasons,
        (r, i) => `<li class="reason" data-reveal>
          <span class="reason__index" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
          <h3 class="reason__title">${esc(r.title)}</h3>
          <p>${esc(r.text)}</p>
        </li>`
      )}
    </ol>`,
  });
}

/** Call-to-action panel, reused on the homepage and on case-study pages. */
export function contactPanel({ headingLevel = 2, id = 'contact', index = '07' } = {}) {
  const h = `h${headingLevel}`;
  return `<div class="contact-panel" data-reveal>
    <div class="contact-panel__glow" aria-hidden="true"></div>
    <div class="contact-panel__main">
      <p class="eyebrow">${index ? `<span class="eyebrow__index">${index}</span>` : ''}Contact</p>
      <${h} class="contact-panel__title" id="${id}-title">Have a project in mind?</${h}>
      <p class="contact-panel__text">Tell me what you’re building and let’s discuss how I can help.</p>
      <div class="contact-panel__actions">
        <a class="btn btn--primary btn--lg" href="${links.startProject}">${icon('rocket', { size: 18 })} Start a Project</a>
        <a class="btn btn--ghost btn--lg" href="${links.whatsapp}" target="_blank" rel="noopener">${brand('whatsapp', { size: 18 })} WhatsApp<span class="visually-hidden"> (opens in a new tab)</span></a>
        <a class="btn btn--ghost btn--lg" href="${links.email}">${icon('mail', { size: 18 })} Email Me</a>
      </div>
    </div>
    <ul class="contact-list" role="list">
      <li><span class="contact-list__k">Email</span><a href="${links.email}">${esc(site.contact.email)}</a></li>
      <li><span class="contact-list__k">Phone / WhatsApp</span><a href="${links.phone}">${esc(site.contact.phoneDisplay)}</a></li>
      <li><span class="contact-list__k">LinkedIn</span><a href="${site.contact.linkedin}" target="_blank" rel="noopener">${esc(site.contact.linkedinHandle)}<span class="visually-hidden"> (opens in a new tab)</span></a></li>
      <li><span class="contact-list__k">Location</span><span>${esc(site.location)} · Remote</span></li>
    </ul>
  </div>`;
}

const projectTypes = [
  'Website Development', 'Web Application', 'E-Commerce', 'WordPress', 'WooCommerce',
  'Laravel / PHP', 'Node.js / NestJS', 'API Development', 'Website Maintenance', 'Other',
];
const budgets = ['Under $500', '$500 – $1,000', '$1,000 – $2,500', '$2,500 – $5,000', '$5,000+', 'Not sure yet'];

const field = (id, label, control, { required = false, hint = '' } = {}) => `<div class="field" data-field>
  <label class="field__label" for="cf-${id}">${label}${required ? ' <span class="field__req" aria-hidden="true">*</span><span class="visually-hidden">(required)</span>' : ''}</label>
  ${control}
  <p class="field__error" id="cf-${id}-error" data-error hidden></p>${hint}
</div>`;

function contactForm(accessKey) {
  const req = 'required aria-required="true"';
  const opts = (items) => items.map((o) => `<option value="${attr(o)}">${esc(o)}</option>`).join('');
  return `<form class="contact-form" id="contact-form" action="https://api.web3forms.com/submit" method="POST" novalidate data-contact-form data-key-set="${accessKey ? 'true' : 'false'}">
    <input type="hidden" name="access_key" value="${attr(accessKey)}">
    <input type="hidden" name="subject" value="New project inquiry from the portfolio">
    <input type="hidden" name="from_name" value="Portfolio contact form">
    <p class="visually-hidden" aria-hidden="true"><label>Leave this field empty <input type="text" name="botcheck" tabindex="-1" autocomplete="off"></label></p>
    <div class="contact-form__grid">
      ${field('name', 'Full Name', `<input class="input" id="cf-name" name="name" type="text" autocomplete="name" ${req} aria-describedby="cf-name-error">`, { required: true })}
      ${field('email', 'Email Address', `<input class="input" id="cf-email" name="email" type="email" autocomplete="email" inputmode="email" ${req} aria-describedby="cf-email-error">`, { required: true })}
      ${field('phone', 'WhatsApp / Phone', `<input class="input" id="cf-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" aria-describedby="cf-phone-error">`)}
      ${field('type', 'Project Type', `<select class="input input--select" id="cf-type" name="project_type" ${req} aria-describedby="cf-type-error"><option value="" selected disabled>Select a project type</option>${opts(projectTypes)}</select>`, { required: true })}
      <div class="field--wide">${field('budget', 'Budget Range', `<select class="input input--select" id="cf-budget" name="budget" aria-describedby="cf-budget-error"><option value="" selected>Select a budget range</option>${opts(budgets)}</select>`)}</div>
      <div class="field--wide">${field('message', 'Project Details', `<textarea class="input input--area" id="cf-message" name="message" rows="5" minlength="10" placeholder="Tell me about your project, requirements, goals, timeline, or reference website." ${req} aria-describedby="cf-message-error"></textarea>`, { required: true })}</div>
    </div>
    <div class="contact-form__foot">
      <button class="btn btn--primary btn--lg" type="submit" data-submit><span data-submit-label>Send Project Inquiry</span> <span aria-hidden="true" data-submit-arrow>→</span><span class="spinner" aria-hidden="true"></span></button>
    </div>
    <div class="form-status" data-status role="status" aria-live="polite" tabindex="-1"></div>
  </form>`;
}

export function contactSection({ web3formsKey = '' } = {}) {
  return `<section class="section contact" id="contact" aria-labelledby="contact-title">
  <div class="container">
    <div class="contact-split">
      <div class="contact-split__info" data-reveal>
        <p class="eyebrow"><span class="eyebrow__index">07</span>Contact</p>
        <h2 class="contact-panel__title" id="contact-title">Let’s Build Something Together</h2>
        <p class="contact-panel__text">Tell me what you’re building — whether it’s a new product, an e-commerce store or an existing system that needs a senior hand — and I’ll reply with next steps.</p>
        <ul class="contact-list" role="list">
          <li><span class="contact-list__k">Email</span><a class="link-u" href="${links.email}">${esc(site.contact.email)}</a></li>
          <li><span class="contact-list__k">WhatsApp</span><a class="link-u" href="${links.whatsapp}" target="_blank" rel="noopener">${esc(site.contact.phoneDisplay)}<span class="visually-hidden"> (opens in a new tab)</span></a></li>
          <li><span class="contact-list__k">LinkedIn</span><a class="link-u" href="${site.contact.linkedin}" target="_blank" rel="noopener">${esc(site.contact.linkedinHandle)}<span class="visually-hidden"> (opens in a new tab)</span></a></li>
          <li><span class="contact-list__k">GitHub</span><a class="link-u" href="${site.contact.github}" target="_blank" rel="noopener">${esc(site.contact.githubHandle)}<span class="visually-hidden"> (opens in a new tab)</span></a></li>
          <li><span class="contact-list__k">Location</span><span>${esc(site.location)} · Remote</span></li>
        </ul>
      </div>
      <div class="contact-split__form" data-reveal>
        <div class="contact-panel__glow" aria-hidden="true"></div>
        ${contactForm(web3formsKey)}
      </div>
    </div>
  </div>
</section>`;
}
