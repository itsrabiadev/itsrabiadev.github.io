// One-off: pull the base64 project screenshots out of the original single-file
// portfolio (legacy/index.original.html) into src/images/projects/<slug>.jpg.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'legacy/index.original.html'), 'utf8');
const outDir = join(root, 'src/images/projects');
mkdirSync(outDir, { recursive: true });

const slugify = (s) =>
  s.toLowerCase().replace(/&amp;/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const re = /<img[^>]*src="data:image\/(\w+);base64,([^"]+)"[^>]*alt="([^"]*)"[\s\S]*?class="project-name">([^<]+)</g;
let m;
let count = 0;
while ((m = re.exec(html))) {
  const [, ext, data, alt, name] = m;
  const slug = slugify(name);
  writeFileSync(join(outDir, `${slug}.${ext === 'jpeg' ? 'jpg' : ext}`), Buffer.from(data, 'base64'));
  console.log(`${slug}\t${alt}`);
  count++;
}
console.log(`extracted ${count} images`);
