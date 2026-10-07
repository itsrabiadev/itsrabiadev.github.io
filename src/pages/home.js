import { site } from '../data/site.js';
import { experience } from '../data/profile.js';
import { layout } from '../components/layout.js';
import { hero, techStripSection } from '../sections/hero.js';
import { about } from '../sections/about.js';
import { servicesSection } from '../sections/services.js';
import { skillsSection } from '../sections/skills.js';
import { projectsSection } from '../sections/projects.js';
import { experienceSection } from '../sections/experience.js';
import { whySection, contactSection } from '../sections/contact.js';

export function personJsonLd() {
  return {
    '@type': 'Person',
    '@id': `${site.url}#person`,
    name: site.fullName,
    alternateName: 'Rabia',
    jobTitle: site.title,
    url: site.url,
    email: `mailto:${site.contact.email}`,
    image: new URL(site.seo.ogImage, site.url).href,
    address: { '@type': 'PostalAddress', addressLocality: 'Karachi', addressCountry: 'PK' },
    sameAs: [site.contact.linkedin],
    worksFor: experience.filter((e) => e.current && e.org !== 'Upwork').map((e) => ({ '@type': 'Organization', name: e.org })),
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Mehran University of Engineering & Technology' },
    knowsAbout: [
      'PHP', 'Laravel', 'Symfony', 'Node.js', 'NestJS', 'React', 'Next.js', 'WordPress', 'WooCommerce',
      'Magento', 'Strapi', 'REST APIs', 'GraphQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS',
    ],
  };
}

export function homePage({ url, assets, config = {} }) {
  return layout({
    title: site.seo.title,
    description: site.seo.description,
    path: '',
    url,
    isHome: true,
    assets,
    ogType: 'profile',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${site.url}#website`,
            url: site.url,
            name: `${site.name} — ${site.title}`,
            inLanguage: 'en',
            publisher: { '@id': `${site.url}#person` },
          },
          {
            '@type': 'ProfilePage',
            '@id': `${site.url}#profile`,
            url: site.url,
            name: site.seo.title,
            mainEntity: { '@id': `${site.url}#person` },
          },
          personJsonLd(),
        ],
      },
    ],
    body: [
      hero(),
      techStripSection(),
      about(),
      servicesSection(),
      skillsSection(),
      projectsSection(url),
      experienceSection(),
      whySection(),
      contactSection({ web3formsKey: config.web3formsKey }),
    ].join('\n'),
  });
}
