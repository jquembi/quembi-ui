import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'apps/web/dist');
const index = join(dist, 'index.html');
const base = process.env.GITHUB_PAGES === 'true' ? '/quembi-ui/' : '/';

assert.ok(existsSync(index), 'Build missing: apps/web/dist/index.html');
assert.ok(existsSync(join(dist, 'favicon.svg')), 'Build missing: favicon.svg');
const html = readFileSync(index, 'utf8');
assert.match(html, /<div\s+id="root"\s*>/, 'Build missing React root element');
assert.ok(html.includes(`href="${base}favicon.svg"`), `Favicon must use base ${base}`);
assert.ok(!html.includes('%BASE_URL%'), 'Unresolved Vite BASE_URL placeholder');

const assetUrls = [...html.matchAll(/(?:src|href)="([^"?#]+\/assets\/[^"?#]+\.(?:js|css))"/g)].map(match => match[1]);
assert.ok(assetUrls.some(url => url.endsWith('.js')), 'Build missing referenced JavaScript');
assert.ok(assetUrls.some(url => url.endsWith('.css')), 'Build missing referenced CSS');
for (const url of assetUrls) {
  assert.ok(url.startsWith(`${base}assets/`), `Asset has wrong base: ${url}; expected ${base}`);
  const relative = url.slice(base.length);
  const destination = resolve(dist, relative);
  assert.ok(destination.startsWith(dist + sep), `Unexpected asset path: ${url}`);
  assert.ok(existsSync(destination) && statSync(destination).size > 0, `Missing or empty asset: ${url}`);
}

const walk = directory => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    assert.ok(!/(^\.env(?:\.|$)|\.(?:pem|key|p12)$)/i.test(entry.name), `Sensitive-looking file in public build: ${fullPath}`);
    assert.ok(!(entry.isDirectory() && /^premium$/i.test(entry.name)), `Premium directory exposed: ${fullPath}`);
    if (entry.isDirectory()) walk(fullPath);
  }
};
walk(dist);
console.log(`PASS: ${base} build contains HTML, favicon, ${assetUrls.length} referenced assets and no secret-looking files.`);
