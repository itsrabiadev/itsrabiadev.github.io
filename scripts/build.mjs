// Static site build: data + templates -> plain HTML/CSS/JS at the repository root,
// ready to be served by GitHub Pages. Run with `npm run build`.
import { mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync, statSync, existsSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import { site } from '../src/data/site.js';
import { caseStudies } from '../src/data/projects.js';
import { relative, tidy } from '../src/lib/html.js';
import { IMAGE_WIDTHS } from '../src/components/media.js';
import { homePage } from '../src/pages/home.js';
import { caseStudyPage, notFoundPage } from '../src/pages/case-study.js';
import { caseStudyPath } from '../src/sections/projects.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = (...p) => join(root, ...p);
const require = createRequire(import.meta.url);
const t0 = Date.now();

// Build-time config: process env first, then an optional untracked .env file.
const env = { ...process.env };
if (existsSync(out('.env'))) {
  for (const line of readFileSync(out('.env'), 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in env)) env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}
const web3formsKey = env.WEB3FORMS_ACCESS_KEY || '';
if (!web3formsKey) console.warn('! WEB3FORMS_ACCESS_KEY is not set: the contact form will render but cannot submit. See .env.example.');

const write = (path, content) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
};
const hash = (content) => createHash('sha256').update(content).digest('hex').slice(0, 10);

/* ---------- 1. Clean generated output (images are cached, see step 4) ---------- */
for (const p of ['index.html', '404.html', 'sitemap.xml', 'robots.txt', 'projects', 'assets/css', 'assets/js', 'assets/fonts']) {
  rmSync(out(p), { recursive: true, force: true });
}

/* ---------- 2. Fonts ---------- */
const fontFiles = {
  'geist-latin-wght-normal.woff2': '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2',
  'geist-mono-latin-wght-normal.woff2': '@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2',
};
for (const [name, from] of Object.entries(fontFiles)) {
  mkdirSync(out('assets/fonts'), { recursive: true });
  copyFileSync(require.resolve(from), out('assets/fonts', name));
}

/* ---------- 3. CSS + JS ---------- */
const minifyCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\(\s+/g, '(')
    .trim()
    // restore spaces required inside values like `and (`, `calc(a + b)`
    .replace(/\band\(/g, 'and (');

const stylesDir = out('src/styles');
const css = minifyCss(
  readdirSync(stylesDir)
    .filter((f) => f.endsWith('.css'))
    .sort()
    .map((f) => readFileSync(join(stylesDir, f), 'utf8'))
    .join('\n')
);
const cssPath = `assets/css/site.${hash(css)}.css`;
write(out(cssPath), css);

const js = readFileSync(out('src/scripts/main.js'), 'utf8')
  .replace(/^\s*\/\/.*$/gm, '')
  .replace(/\n\s*\n/g, '\n');
const jsPath = `assets/js/main.${hash(js)}.js`;
write(out(jsPath), js);

const assets = { css: cssPath, js: jsPath, font: 'assets/fonts/geist-latin-wght-normal.woff2' };

/* ---------- 4. Images (responsive WebP + JPEG fallback, cached by mtime) ---------- */
const srcImages = out('src/images/projects');
const imgOut = out('assets/img/projects');
mkdirSync(imgOut, { recursive: true });
let encoded = 0;
await Promise.all(
  readdirSync(srcImages)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .map(async (file) => {
      const name = file.replace(/\.\w+$/, '');
      const src = join(srcImages, file);
      const srcTime = statSync(src).mtimeMs;
      const fresh = (p) => existsSync(p) && statSync(p).mtimeMs >= srcTime;
      const jobs = [];
      for (const w of IMAGE_WIDTHS) {
        const webp = join(imgOut, `${name}-${w}.webp`);
        if (!fresh(webp)) jobs.push(sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(webp));
      }
      const max = IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
      const jpg = join(imgOut, `${name}-${max}.jpg`);
      if (!fresh(jpg)) jobs.push(sharp(src).resize({ width: max, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(jpg));
      encoded += jobs.length;
      await Promise.all(jobs);
    })
);

/* ---------- 5. Icons + social image ---------- */
const markSvg = (size, radius) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6D28D9"/><stop offset="1" stop-color="#4C1D95"/></linearGradient></defs>
  <rect width="64" height="64" rx="${radius}" fill="url(#g)"/>
  <path d="M22 46V18h11.5c6 0 9.5 3.3 9.5 8.4 0 3.8-2 6.5-5.4 7.6L44 46h-6.6l-5.8-11.2H28V46h-6zm6-16.2h5c2.6 0 4-1.3 4-3.4s-1.4-3.4-4-3.4h-5v6.8z" fill="#fff"/>
</svg>`;
write(out('favicon.svg'), markSvg(64, 14));
await sharp(Buffer.from(markSvg(512, 14))).resize(32, 32).png().toFile(out('favicon-32.png'));
await sharp(Buffer.from(markSvg(512, 0))).resize(180, 180).png().toFile(out('apple-touch-icon.png'));
await sharp(Buffer.from(markSvg(512, 0))).resize(512, 512).png().toFile(out('assets/img/icon-512.png'));
write(
  out('site.webmanifest'),
  JSON.stringify(
    {
      name: `${site.name} — ${site.title}`,
      short_name: site.name,
      start_url: './',
      display: 'browser',
      background_color: '#08080D',
      theme_color: '#08080D',
      icons: [{ src: 'assets/img/icon-512.png', sizes: '512x512', type: 'image/png' }],
    },
    null,
    2
  )
);

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.75"><stop offset="0" stop-color="#6D28D9" stop-opacity="0.55"/><stop offset="1" stop-color="#08080D" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.05"/></pattern>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6D28D9"/><stop offset="1" stop-color="#4C1D95"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#08080D"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="80" y="80" width="56" height="56" rx="12" fill="url(#g)"/>
  <text x="108" y="118" text-anchor="middle" font-family="Consolas, monospace" font-size="26" font-weight="700" fill="#fff">R</text>
  <text x="156" y="118" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="600" fill="#fff">Rabia Rafique</text>
  <text x="80" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="500" fill="#A78BFA" letter-spacing="2">SENIOR FULL STACK DEVELOPER</text>
  <text x="80" y="378" font-family="Segoe UI, Arial, sans-serif" font-size="58" font-weight="700" fill="#FFFFFF">Scalable web applications, APIs</text>
  <text x="80" y="448" font-family="Segoe UI, Arial, sans-serif" font-size="58" font-weight="700" fill="#FFFFFF">&amp; e-commerce platforms.</text>
  <text x="80" y="550" font-family="Consolas, monospace" font-size="24" fill="#9CA3AF">9+ years · Laravel · Symfony · Node.js · NestJS · WordPress · WooCommerce</text>
</svg>`;
await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(out('assets/img/og.png'));

/* ---------- 6. Pages ---------- */
const pages = [];
const emit = (path, html) => {
  write(out(path), tidy(html) + '\n');
  pages.push(path);
};

emit('index.html', homePage({ url: relative(0), assets, config: { web3formsKey } }));
for (const p of caseStudies) {
  emit(`${caseStudyPath(p)}index.html`, caseStudyPage(p, { url: relative(2), assets }));
}
// 404 can be served at any depth, so it uses root-absolute URLs.
emit('404.html', notFoundPage({ url: (p = '') => `/${p}`, assets }));

/* ---------- 7. SEO files ---------- */
const today = new Date().toISOString().slice(0, 10);
const urls = ['', ...caseStudies.map(caseStudyPath)];
write(
  out('sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url><loc>${new URL(u, site.url).href}</loc><lastmod>${today}</lastmod><priority>${u ? '0.7' : '1.0'}</priority></url>`
  )
  .join('\n')}
</urlset>
`
);
write(out('robots.txt'), `User-agent: *\nAllow: /\nDisallow: /src/\nDisallow: /legacy/\nDisallow: /scripts/\n\nSitemap: ${new URL('sitemap.xml', site.url).href}\n`);
write(out('.nojekyll'), '');

console.log(
  `Built ${pages.length} pages, ${encoded} image variants encoded, css ${(css.length / 1024).toFixed(1)}kB, js ${(js.length / 1024).toFixed(
    1
  )}kB in ${Date.now() - t0}ms`
);
pages.forEach((p) => console.log('  ' + p));
