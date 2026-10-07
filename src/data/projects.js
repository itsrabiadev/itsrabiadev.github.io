// Project data. Names, descriptions, stacks and links are taken verbatim (or
// lightly edited for flow) from the original portfolio. Do not add metrics,
// outcomes or responsibilities that aren't documented there.
//
// Fields
//   slug       used for image file names (src/images/projects/<slug>.jpg) and case-study URLs
//   platform   drives the filter on the homepage: laravel | symfony | wordpress | javascript
//   sector     short business context label
//   scope      what the engagement covered, as described in the original portfolio
//   featured   order in the "Featured work" section (omit for the archive grid)
//   caseStudy  optional long-form content -> /projects/<slug>/

export const platforms = [
  { id: 'all', label: 'All' },
  { id: 'laravel', label: 'Laravel' },
  { id: 'symfony', label: 'Symfony' },
  { id: 'javascript', label: 'Next.js & Node' },
  { id: 'wordpress', label: 'WordPress' },
];

export const projects = [
  {
    slug: 'buna-payments-platform',
    image: 'cross-border-payments-platform',
    name: 'Buna — Cross-border Payments Platform',
    shortName: 'Buna Payments Platform',
    imageAlt: 'Buna cross-border payments platform homepage',
    sector: 'Fintech',
    platform: 'symfony',
    stack: ['Symfony', 'Sonata Admin', 'PHP'],
    summary:
      'Backend and admin tooling for an international cross-border payments platform, built to manage transaction workflows reliably at scale.',
    scope: 'Backend & admin tooling',
    url: 'https://one.buna.co',
    urlLabel: 'one.buna.co',
    featured: 1,
    caseStudy: {
      client: 'Buna',
      challenge:
        'An international cross-border payments network needed a backend and an administration layer that could manage transaction workflows reliably as the platform scaled.',
      solution:
        'A Symfony backend paired with Sonata Admin, giving the operations side structured admin tooling for managing the platform’s transaction workflows.',
      contribution: [
        'Backend development on Symfony for the payments platform.',
        'Admin tooling built on Sonata Admin for managing transaction workflows.',
      ],
      features: [
        'Symfony-based backend services',
        'Sonata Admin administration panel',
        'Transaction workflow management',
        'Built for reliability at scale',
      ],
      status: 'Live',
      related: 'buna-developer-portal',
    },
  },
  {
    slug: 'kitchenaid-ie',
    image: 'kitchenaid-ie',
    name: 'KitchenAid IE',
    imageAlt: 'KitchenAid IE product range on the e-commerce store',
    sector: 'E-commerce',
    platform: 'laravel',
    stack: ['Aimeos', 'Laravel', 'PostgreSQL'],
    summary:
      'Feature-rich e-commerce platform for KitchenAid built on Aimeos (Laravel), with custom bundles, discount logic and Aramex-integrated order fulfilment.',
    scope: 'E-commerce development · team project with Digital Gravity',
    featured: 2,
    caseStudy: {
      client: 'KitchenAid IE',
      challenge:
        'A brand e-commerce store that needed more than an off-the-shelf catalogue: custom product bundles, its own discount rules, and order fulfilment connected to Aramex.',
      solution:
        'An Aimeos e-commerce platform on Laravel with a PostgreSQL database, extended with custom bundle and discount logic and an Aramex integration for fulfilment.',
      contribution: [
        'Development on the Aimeos / Laravel platform as part of the Digital Gravity team.',
      ],
      features: [
        'Custom product bundles',
        'Custom discount logic',
        'Aramex-integrated order fulfilment',
        'Aimeos (Laravel) commerce engine on PostgreSQL',
      ],
      status: 'Delivered — built collaboratively with Digital Gravity’s team',
    },
  },
  {
    slug: 'roche-academy',
    image: 'roche-academy',
    name: 'Roche Academy',
    imageAlt: 'Roche Academy learning platform interface',
    sector: 'Learning platform',
    platform: 'symfony',
    stack: ['Symfony', 'Sonata Admin', 'REST APIs'],
    summary:
      'Learning and training platform for Roche, built with Symfony and Sonata Admin, including REST APIs powering a companion mobile app.',
    scope: 'Platform backend, admin & mobile REST APIs',
    featured: 3,
    caseStudy: {
      client: 'Roche',
      challenge:
        'A learning and training platform that had to be managed through a web admin while also serving content to a companion mobile app.',
      solution:
        'A Symfony application with Sonata Admin for content and platform administration, exposing REST APIs consumed by the mobile app.',
      contribution: [
        'Symfony platform development with Sonata Admin.',
        'REST APIs powering the companion mobile app.',
      ],
      features: [
        'Learning & training platform',
        'Sonata Admin back office',
        'REST API layer for the mobile app',
      ],
      status: 'Delivered',
    },
  },
  {
    slug: 'acube-developments',
    image: 'acube-developments',
    name: 'Acube Developments',
    imageAlt: 'Acube Developments homepage',
    sector: 'Real estate',
    platform: 'javascript',
    stack: ['Next.js', 'React', 'NestJS', 'Node.js'],
    summary:
      'Corporate platform for a Dubai-based real estate developer, showcasing its vision, developments and community-living philosophy — Next.js/React frontend with a NestJS/Node.js backend.',
    scope: 'Full stack — Next.js frontend & NestJS backend',
    featured: 4,
    caseStudy: {
      client: 'Acube Developments',
      challenge:
        'A Dubai real estate developer needed a corporate platform to present its vision, its developments and its community-living philosophy.',
      solution:
        'A Next.js and React frontend backed by a NestJS / Node.js service layer — a modern JavaScript stack end to end.',
      contribution: [
        'Frontend built with Next.js and React.',
        'Backend built with NestJS on Node.js.',
      ],
      features: [
        'Developments showcase',
        'Brand vision & community-living storytelling',
        'Next.js / React frontend',
        'NestJS / Node.js backend',
      ],
      status: 'Development complete — pending client launch',
    },
  },
  {
    slug: 'almadallah',
    image: 'almadallah',
    name: 'Almadallah',
    imageAlt: 'Almadallah member platform homepage',
    sector: 'Healthcare',
    platform: 'javascript',
    stack: ['Next.js', 'Strapi', 'Headless CMS'],
    summary:
      'Healthcare membership platform with a Next.js frontend and a Strapi headless CMS serving member and provider content.',
    scope: 'Next.js frontend & Strapi headless CMS',
    url: 'https://almadallah.ae',
    urlLabel: 'almadallah.ae',
    featured: 5,
    caseStudy: {
      client: 'Almadallah',
      challenge:
        'A healthcare membership platform that had to publish and manage content for two audiences — members and providers.',
      solution:
        'A headless architecture: Strapi as the CMS backend managing member and provider content, delivered through a Next.js frontend.',
      contribution: [
        'Next.js frontend.',
        'Strapi headless CMS backend for member and provider content.',
      ],
      features: [
        'Headless CMS architecture',
        'Member and provider content',
        'Next.js frontend',
      ],
      status: 'Live',
    },
  },
  {
    slug: 'knead-bakery',
    image: 'knead-bakery-and-patisserie',
    name: 'Knead Bakery & Patisserie',
    imageAlt: 'Knead Bakery and Patisserie online shop',
    sector: 'E-commerce · F&B',
    platform: 'wordpress',
    stack: ['WordPress', 'WooCommerce', 'WPML'],
    summary:
      'E-commerce site for an Abu Dhabi artisanal bakery, with a WooCommerce-powered shop, cart, favourites and account system, plus WPML multilingual support.',
    scope: 'WooCommerce store & multilingual setup',
    url: 'https://knead.ae',
    urlLabel: 'knead.ae',
    featured: 6,
    caseStudy: {
      client: 'Knead Bakery & Patisserie',
      challenge:
        'An artisanal bakery in Abu Dhabi wanted to sell online, with customer accounts and a multilingual storefront.',
      solution:
        'A WordPress and WooCommerce store with shop, cart, favourites and customer accounts, made multilingual with WPML.',
      contribution: [
        'WooCommerce shop, cart, favourites and account system.',
        'WPML multilingual support.',
      ],
      features: [
        'WooCommerce shop & cart',
        'Favourites',
        'Customer account system',
        'Multilingual storefront (WPML)',
      ],
      status: 'Live',
    },
  },

  // ---- Archive ---------------------------------------------------------
  {
    slug: 'buna-developer-portal',
    image: 'buna-developer-portal',
    name: 'Buna Developer Portal',
    imageAlt: 'Buna Developer Portal sign-in screen',
    sector: 'Fintech',
    platform: 'laravel',
    stack: ['Laravel', 'Authentication'],
    summary:
      'Secure developer sign-in portal for Buna’s cross-border payments network, giving partner institutions access for integrating with the payment infrastructure.',
  },
  {
    slug: 'betterhomes-qatar',
    image: 'betterhomes-qatar',
    name: 'Betterhomes Qatar',
    imageAlt: 'Betterhomes Qatar homepage',
    sector: 'Real estate portal',
    platform: 'wordpress',
    stack: ['WordPress'],
    summary:
      'Large-scale real estate portal for Doha’s Betterhomes, with multi-criteria property search across hundreds of areas, market insights and buyer, seller and tenant guides.',
    url: 'https://www.bhomesqatar.com/en',
    urlLabel: 'bhomesqatar.com',
  },
  {
    slug: 'judicial-watch',
    image: 'judicial-watch',
    name: 'Judicial Watch',
    imageAlt: 'Judicial Watch homepage',
    sector: 'High-traffic news',
    platform: 'wordpress',
    stack: ['WordPress'],
    summary:
      'Development and maintenance of a high-traffic WordPress news and advocacy site with complex content types, media feeds and lead-capture forms.',
    url: 'https://www.judicialwatch.org',
    urlLabel: 'judicialwatch.org',
  },
  {
    slug: 'sephora-squad-middle-east',
    image: 'sephora-squad-middle-east',
    name: 'Sephora Squad — Middle East',
    imageAlt: 'Sephora Squad Middle East campaign site',
    sector: 'Campaign microsite',
    platform: 'javascript',
    stack: ['HTML', 'Next.js API', 'Dynamic forms'],
    summary:
      'Creator-application microsite for Sephora Middle East, with dynamic multi-step application forms powered by a Next.js API layer.',
    url: 'https://sephorasquad.me',
    urlLabel: 'sephorasquad.me',
  },
  {
    slug: 'dubai-investments',
    image: 'dubai-investments',
    name: 'Dubai Investments',
    imageAlt: 'Dubai Investments homepage',
    sector: 'Investor relations',
    platform: 'laravel',
    stack: ['Laravel'],
    summary: 'Corporate website for Dubai Investments, a publicly listed investment holding company, built with Laravel.',
    url: 'https://dubaiinvestments.com',
    urlLabel: 'dubaiinvestments.com',
  },
  {
    slug: 'gbm',
    image: 'gbm',
    name: 'GBM',
    imageAlt: 'GBM homepage',
    sector: 'Enterprise IT',
    platform: 'laravel',
    stack: ['Laravel'],
    summary: 'Corporate website for GBM, a regional enterprise IT solutions and services provider, built with Laravel.',
    url: 'https://www.gbmme.com',
    urlLabel: 'gbmme.com',
  },
  {
    slug: 'scope-properties',
    image: 'scope-properties',
    name: 'Scope Properties',
    imageAlt: 'Scope Properties homepage',
    sector: 'Real estate',
    platform: 'laravel',
    stack: ['Laravel'],
    summary: 'Real estate platform with property listings, search and filtering, built for a responsive browsing experience.',
    url: 'https://www.scopeproperties.ae',
    urlLabel: 'scopeproperties.ae',
  },
  {
    slug: 'dubai-rapid-properties',
    image: 'dubai-rapid-properties',
    name: 'Dubai Rapid Properties',
    imageAlt: 'Dubai Rapid Properties homepage',
    sector: 'Real estate',
    platform: 'wordpress',
    stack: ['WordPress', 'Elementor'],
    summary:
      'Palm Jumeirah real estate agency site with advanced multi-criteria property search, holiday homes, an owner portal and WhatsApp-based agent lead capture.',
    url: 'https://dubairapidproperties.com',
    urlLabel: 'dubairapidproperties.com',
  },
  {
    slug: 'dlc-management',
    image: 'dlc-management',
    name: 'DLC Management',
    imageAlt: 'DLC Management homepage',
    sector: 'Commercial real estate · US',
    platform: 'wordpress',
    stack: ['WordPress', 'Elementor'],
    summary:
      'Website for a US commercial real estate firm managing open-air shopping centres for national tenants, with property search, case studies and a podcast library.',
    url: 'https://www.dlcmgmt.com',
    urlLabel: 'dlcmgmt.com',
  },
  {
    slug: 'rc-investments',
    image: 'rc-investments',
    name: 'RC Investments',
    imageAlt: 'RC Investments homepage',
    sector: 'Property investment',
    platform: 'laravel',
    stack: ['Laravel'],
    summary:
      'Site for a Dubai-based land and property investment firm, featuring land listings, a diamond investment programme and agent / user portals.',
    url: 'https://royalcapitaldubai.com',
    urlLabel: 'royalcapitaldubai.com',
  },
  {
    slug: 'dumont-paris',
    image: 'dumont-paris',
    name: 'Dumont Paris',
    imageAlt: 'Dumont Paris perfume homepage',
    sector: 'Product catalogue',
    platform: 'wordpress',
    stack: ['WordPress'],
    summary:
      'Website for a perfume trading brand with an extensive fragrance catalogue across multiple product lines, an Instagram feed integration and a B2B private-label section.',
    url: 'https://www.dumontparis.com',
    urlLabel: 'dumontparis.com',
  },
  {
    slug: 'andalusia-group',
    image: 'andalusia-group',
    name: 'Andalusia Group',
    imageAlt: 'Andalusia Group homepage',
    sector: 'Multi-sector group',
    platform: 'laravel',
    stack: ['Laravel'],
    summary:
      'Corporate site for a diversified UAE group spanning real estate, healthcare, retail and fit-out, with a multi-brand structure and a project portfolio across the UAE, KSA, Turkey and Spain.',
    url: 'https://acy.ae',
    urlLabel: 'acy.ae',
  },
  {
    slug: 'ohana-development',
    image: 'ohana-development',
    name: 'Ohana Development',
    imageAlt: 'Ohana Development homepage',
    sector: 'Luxury real estate',
    platform: 'wordpress',
    stack: ['WordPress'],
    summary:
      'Site for a private luxury real estate developer in the UAE and Lebanon, showcasing flagship branded residences.',
    url: 'https://www.ohana.ae',
    urlLabel: 'ohana.ae',
  },
  {
    slug: 'intertech-vision-me',
    image: 'intertech-vision-me',
    name: 'Intertech Vision ME',
    imageAlt: 'Intertech Vision ME corporate site',
    sector: 'B2B technology',
    platform: 'laravel',
    stack: ['Laravel'],
    summary:
      'Corporate site for a control-room technology provider, covering a multi-product catalogue, partner ecosystem and industry use-case pages across the MENA region.',
  },
  {
    slug: 'fibrex-construction-group',
    image: 'fibrex-construction-group',
    name: 'Fibrex Construction Group',
    imageAlt: 'Fibrex Construction Group homepage',
    sector: 'Construction',
    platform: 'wordpress',
    stack: ['WordPress'],
    summary:
      'Corporate site for a Tier 1 Abu Dhabi construction contractor, structuring its turnkey, specialist contracting and specialist divisions across sectors.',
  },
  {
    slug: 'lakhraim-group',
    image: 'lakhraim-group',
    name: 'Lakhraim Group',
    imageAlt: 'Dubai skyline on the Lakhraim Group website',
    sector: 'Investment group',
    platform: 'laravel',
    stack: ['Laravel'],
    summary:
      'Corporate site for a Dubai-based MENA investment group spanning hospitality, private investment, property development, commercial construction and healthcare.',
  },
  {
    slug: 'jabal-asset-management',
    image: 'jabal-asset-management',
    name: 'Jabal Asset Management',
    imageAlt: 'Jabal Asset Management homepage',
    sector: 'Finance · Oman',
    platform: 'wordpress',
    stack: ['WordPress'],
    summary:
      'Corporate website for an Oman-based asset management and brokerage firm regulated by the Financial Services Authority of Oman.',
    url: 'https://www.jabal.om',
    urlLabel: 'jabal.om',
  },
  {
    slug: 'synergi-mena',
    image: 'synergi-mena',
    name: 'Synergi MENA',
    imageAlt: 'Synergi MENA homepage',
    sector: 'Recruitment & HR',
    platform: 'wordpress',
    stack: ['WordPress'],
    summary:
      'Website for a Dubai-based executive recruitment and HR consulting firm, covering recruitment, leadership coaching, HR consulting and salary surveys.',
    url: 'https://synergimena.com',
    urlLabel: 'synergimena.com',
  },
  {
    slug: 'mahgoub-sons-group',
    image: 'mahgoub-sons-group',
    name: 'Mahgoub Sons Group',
    imageAlt: 'Mahgoub Sons Group homepage',
    sector: 'Conglomerate',
    platform: 'wordpress',
    stack: ['WordPress', 'Bilingual'],
    summary:
      'Bilingual corporate site for a Sudanese agribusiness conglomerate with subsidiaries across agriculture, food, engineering, media and logistics.',
    url: 'https://mahgoubsons.com',
    urlLabel: 'mahgoubsons.com',
  },
  {
    slug: 'gj-properties',
    image: 'gj-properties',
    name: 'GJ Properties',
    imageAlt: 'GJ Properties homepage',
    sector: 'Real estate',
    platform: 'wordpress',
    stack: ['WordPress'],
    summary: 'Property developer website for GJ Properties in the UAE, showcasing featured residential towers and project listings.',
    url: 'https://gjproperties.ae',
    urlLabel: 'gjproperties.ae',
  },
  {
    slug: 'media-land-group',
    image: 'media-land-group',
    name: 'Media Land Group',
    imageAlt: 'Media Land Group homepage',
    sector: 'Media & events',
    platform: 'laravel',
    stack: ['Laravel'],
    summary: 'Corporate website for a Dubai-based media and events group, built with Laravel to showcase live events and experiential productions.',
    url: 'https://www.medialandgroup.com',
    urlLabel: 'medialandgroup.com',
  },
  {
    slug: 'al-sadeem-astronomy',
    image: 'al-sadeem-astronomy',
    name: 'Al Sadeem Astronomy',
    imageAlt: 'Al Sadeem Astronomy homepage',
    sector: 'Tourism & bookings',
    platform: 'laravel',
    stack: ['Laravel', 'Bookings'],
    summary: 'Stargazing and observatory experience site with service listings and an inquiry / booking flow.',
    url: 'https://alsadeemastronomy.ae',
    urlLabel: 'alsadeemastronomy.ae',
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.featured - b.featured);

export const archiveProjects = projects.filter((p) => !p.featured);

export const caseStudies = featuredProjects.filter((p) => p.caseStudy);

export const projectBySlug = (slug) => projects.find((p) => p.slug === slug);
