// Experience, skills, services and positioning copy.
// Experience entries, honours and education are taken from the original portfolio.

export const experience = [
  {
    role: 'Senior Full Stack Developer',
    org: 'Digital Gravity',
    start: 'Mar 2018',
    end: 'Present',
    current: true,
    highlight: true,
    summary:
      'Building and maintaining production systems across backend, frontend, CMS and cloud infrastructure.',
    points: [
      ['Backend architecture', 'built and maintained scalable systems in Laravel, PHP, Symfony, Node.js and NestJS, alongside Next.js and React on the frontend.'],
      ['APIs & CMS', 'designed GraphQL and REST APIs, and headless setups with WordPress and Strapi.'],
      ['Data & cloud', 'managed MySQL, PostgreSQL and MongoDB with Prisma / TypeORM, deployed on AWS and Vercel.'],
    ],
    stack: ['Laravel', 'Symfony', 'PHP', 'Node.js', 'NestJS', 'Next.js', 'React', 'GraphQL', 'WordPress', 'Strapi', 'PostgreSQL', 'MySQL', 'MongoDB', 'AWS', 'Vercel'],
  },
  {
    role: 'Freelance Software Engineer',
    org: 'Upwork',
    start: 'Apr 2016',
    end: 'Present',
    current: true,
    summary: 'Working directly with international clients, from initial scope through to deployment.',
    points: [
      ['50+ projects delivered', 'for clients across fintech, real estate and tourism, from initial scope through to deployment.'],
      ['Direct client ownership', 'worked with international founders to turn business requirements into working software.'],
    ],
    stack: [],
  },
  {
    role: 'PHP Web Developer',
    org: 'Hidaya Institute of Science & Technology',
    start: 'Feb 2015',
    end: 'Sep 2015',
    points: [
      [null, 'Built dynamic sites with PHP, MySQL and jQuery, and trained on Laravel 5, CodeIgniter and WordPress.'],
    ],
    stack: ['PHP', 'MySQL', 'jQuery', 'Laravel', 'CodeIgniter', 'WordPress'],
  },
];

export const recognition = [
  {
    icon: 'award',
    title: 'Commitment to Excellence Award',
    org: 'Digital Gravity',
    text: 'Recognised for consistent dedication, reliability and high-quality work delivered across projects.',
  },
  {
    icon: 'award',
    title: '1st Position — Advanced PHP',
    org: 'Hidaya Institute of Science & Technology',
    text: 'Top position in Advanced PHP during training.',
  },
  {
    icon: 'graduation-cap',
    title: 'MUET Merit Scholarship',
    org: 'Mehran University of Engineering & Technology',
    text: 'Merit-based scholarship for academic excellence during B.E. Computer Software Engineering.',
  },
  {
    icon: 'graduation-cap',
    title: 'B.E. Computer Software Engineering',
    org: 'Mehran University of Engineering & Technology',
    text: 'Plus PHP Basic & Advanced coursework at Hidaya Institute of Science & Technology.',
  },
];

// `icon` = simple-icons slug (optional). Items without one render as text chips.
export const skillGroups = [
  {
    id: 'backend',
    title: 'Backend',
    note: 'Core expertise',
    primary: true,
    items: [
      { name: 'PHP', icon: 'php' },
      { name: 'Laravel', icon: 'laravel' },
      { name: 'Symfony', icon: 'symfony' },
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'NestJS', icon: 'nestjs' },
      { name: 'REST & GraphQL', icon: 'graphql' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    items: [
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'HTML', icon: 'html5' },
      { name: 'CSS', icon: 'css' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
    ],
  },
  {
    id: 'cms',
    title: 'CMS & E-commerce',
    items: [
      { name: 'WordPress', icon: 'wordpress' },
      { name: 'WooCommerce', icon: 'woocommerce' },
      { name: 'Magento' },
      { name: 'Strapi', icon: 'strapi' },
    ],
  },
  {
    id: 'data',
    title: 'Databases',
    items: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Prisma / TypeORM', icon: 'prisma' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Infrastructure',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Docker', icon: 'docker' },
      { name: 'AWS' },
      { name: 'Vercel', icon: 'vercel' },
    ],
  },
];

export const techStrip = [
  { name: 'Laravel', icon: 'laravel' },
  { name: 'Symfony', icon: 'symfony' },
  { name: 'Node.js', icon: 'nodedotjs' },
  { name: 'NestJS', icon: 'nestjs' },
  { name: 'React', icon: 'react' },
  { name: 'Next.js', icon: 'nextdotjs' },
  { name: 'WordPress', icon: 'wordpress' },
  { name: 'WooCommerce', icon: 'woocommerce' },
];

// `icon` = lucide-static icon name
export const services = [
  {
    icon: 'layers',
    title: 'Full Stack Web Development',
    text: 'Custom web applications and business platforms, from data model and backend to the interface your users work in.',
    tags: ['Laravel', 'Next.js', 'React'],
  },
  {
    icon: 'server',
    title: 'Backend Development',
    text: 'Maintainable server-side systems in PHP, Laravel, Symfony, Node.js and NestJS, structured to grow with the product.',
    tags: ['PHP', 'Symfony', 'NestJS'],
  },
  {
    icon: 'plug',
    title: 'API Development',
    text: 'REST and GraphQL APIs, third-party integrations and backend services for web and mobile clients.',
    tags: ['REST', 'GraphQL', 'Integrations'],
  },
  {
    icon: 'layout-template',
    title: 'WordPress Development',
    text: 'Custom WordPress websites, themes, plugins and integrations — including headless WordPress setups.',
    tags: ['Themes', 'Plugins', 'Headless'],
  },
  {
    icon: 'shopping-cart',
    title: 'WooCommerce Development',
    text: 'Custom WooCommerce stores and functionality: catalogues, carts, customer accounts and multilingual shops.',
    tags: ['WooCommerce', 'WPML'],
  },
  {
    icon: 'store',
    title: 'E-commerce Development',
    text: 'E-commerce beyond templates — custom bundles, discount logic and fulfilment integrations on Laravel, WooCommerce or Magento.',
    tags: ['Aimeos', 'Magento', 'Integrations'],
  },
  {
    icon: 'wrench',
    title: 'Maintenance & Optimisation',
    text: 'Ongoing maintenance for live sites: performance improvements, bug fixing, updates and long-term support.',
    tags: ['Performance', 'Fixes', 'Updates'],
  },
];

export const reasons = [
  {
    title: '9+ years in production',
    text: 'Professional web development since 2015 — agency delivery and direct freelance work with international clients.',
  },
  {
    title: 'Genuinely full stack',
    text: 'Backend, frontend, APIs and databases. One person can own the feature from schema to screen.',
  },
  {
    title: 'Scalable architecture',
    text: 'Clean, maintainable structure in Laravel, Symfony and NestJS that the next developer can work with.',
  },
  {
    title: 'Business-first thinking',
    text: 'Used to turning founders’ business requirements into working software, not just closing tickets.',
  },
  {
    title: 'E-commerce experience',
    text: 'WooCommerce, Aimeos (Laravel) and Magento — catalogues, bundles, discounts and fulfilment integrations.',
  },
  {
    title: 'End-to-end delivery',
    text: 'From initial scope through development, integrations and deployment on AWS or Vercel, to maintenance.',
  },
];
