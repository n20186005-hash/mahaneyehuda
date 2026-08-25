import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const forbidden = [/example\.com/i, /localhost/i, /chrome-extension:\/\//i];
const allowedAuditFile = 'scripts/audit.mjs';
const files = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (['node_modules', '.git', '.astro', 'dist'].includes(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p); else files.push(p);
  }
}
walk(root);
let errors = 0;
for (const file of files) {
  const rel = relative(root, file);
  if (rel === allowedAuditFile || /\.(png|jpg|jpeg|webp|ico|zip)$/i.test(file)) continue;
  const text = readFileSync(file, 'utf8');
  for (const rule of forbidden) {
    if (rule.test(text)) {
      console.error(`Forbidden token ${rule} in ${rel}`);
      errors++;
    }
  }
  if (/lastmod/i.test(text) && (rel.startsWith('src/') || rel === 'astro.config.mjs')) {
    console.error(`Unexpected lastmod token in ${rel}`);
    errors++;
  }
}
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
for (const [group, deps] of Object.entries({dependencies: pkg.dependencies ?? {}, devDependencies: pkg.devDependencies ?? {}})) {
  for (const [name, version] of Object.entries(deps)) {
    if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
      console.error(`Non-exact version ${group}.${name}: ${version}`);
      errors++;
    }
  }
}
if (existsSync(join(root, 'pnpm-workspace.yaml'))) {
  const ws = readFileSync(join(root, 'pnpm-workspace.yaml'), 'utf8');
  if (!/packages\s*:\s*\n\s*-\s*['"]?\.['"]?/m.test(ws)) {
    console.error('pnpm-workspace.yaml exists but does not include packages: [.]');
    errors++;
  }
}
if (errors) process.exit(1);
console.log('Static source audit passed.');
