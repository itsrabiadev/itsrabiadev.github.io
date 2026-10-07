// Global profile + contact data. Every value here comes from the original
// portfolio (legacy/index.original.html) — keep it that way.

export const site = {
  name: 'Rabia Rafique',
  fullName: 'Rabia Rafique',
  title: 'Senior Full Stack Developer',
  url: 'https://itsrabiadev.github.io/',
  locale: 'en',
  location: 'Karachi, Pakistan',
  yearsExperience: '9+',
  projectsDelivered: '50+',
  availability: 'Available for freelance & remote projects',

  seo: {
    title: 'Rabia Rafique | Senior Full Stack Developer',
    description:
      'Senior Full Stack Developer with 9+ years of experience building scalable web applications, APIs, e-commerce platforms and business solutions using Laravel, Symfony, Node.js, NestJS, WordPress and WooCommerce.',
    ogImage: 'assets/img/og.png',
  },

  contact: {
    email: 'itsrabiadev@gmail.com',
    phone: '+923323292312',
    phoneDisplay: '+92 332 3292312',
    whatsapp: 'https://wa.me/923323292312',
    linkedin: 'https://www.linkedin.com/in/itsrabiadev',
    linkedinHandle: '/in/itsrabiadev',
    github: 'https://github.com/itsrabiadev',
    githubHandle: 'github.com/itsrabiadev',
  },

  education: 'B.E. Computer Software Engineering, Mehran University of Engineering & Technology (MUET)',
};

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const mailSubject = encodeURIComponent('Project inquiry');
const mailBody = encodeURIComponent(
  'Hi Rabia Rafique,\n\nWhat I\'m building:\n\nCurrent stack (if any):\n\nTimeline:\n\nBudget range:\n\nThanks,\n'
);

export const links = {
  startProject: `mailto:${site.contact.email}?subject=${mailSubject}&body=${mailBody}`,
  email: `mailto:${site.contact.email}`,
  whatsapp: `${site.contact.whatsapp}?text=${encodeURIComponent('Hi Rabia Rafique, I found your portfolio and would like to discuss a project.')}`,
  phone: `tel:${site.contact.phone}`,
};
