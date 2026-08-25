import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
const root = new URL('../', import.meta.url).pathname;
const pageRoot = join(root, 'src');
const forbidden = [/zh-CN/i, /zh-TW/i, /lang=["'](?:en|zh|ko|id|ms)["']/i, /Baguio/i, /Daejeon/i, /Busan/i, /Indonesia/i];
let errors = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(astro|css|ts|js|mjs)$/.test(name)) {
      const text = readFileSync(p, 'utf8');
      for (const rule of forbidden) if (rule.test(text)) {
        console.error(`Language/locale contamination ${rule} in ${relative(root,p)}`); errors++;
      }
    }
  }
}
walk(pageRoot);
const layout = readFileSync(join(root,'src/layouts/BaseLayout.astro'),'utf8');
if (!/<html lang="he" dir="rtl">/.test(layout)) { console.error('Missing Hebrew RTL document declaration'); errors++; }
const main = readFileSync(join(root,'src/pages/index.astro'),'utf8');
if (!/!1she!2sil/.test(main)) { console.error('Google Maps embed is not localized to Hebrew/Israel'); errors++; }
if (errors) process.exit(1);
console.log('Hebrew/Israel locale audit passed.');
