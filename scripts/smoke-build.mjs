import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'apps/web/dist');
const index = join(dist, 'index.html');

assert.ok(existsSync(index), 'Build missing: apps/web/dist/index.html');
assert.ok(existsSync(join(dist, 'favicon.svg')), 'Build missing: public/favicon.svg');
const html = readFileSync(index, 'utf8');
assert.match(html, /<div\s+id="root"\s*>/, 'Build missing React root element');

const assetPaths = [...html.matchAll(/(?:src|href)="\/?(assets\/[^"?#]+\.(?:js|css))"/g)].map(match => match[1]);
assert.ok(assetPaths.some(path => path.endsWith('.js')), 'Build missing referenced JavaScript');
assert.ok(assetPaths.some(path => path.endsWith('.css')), 'Build missing referenced CSS');
for (const asset of assetPaths) {
  const destination = resolve(dist, asset);
  assert.ok(destination.startsWith(dist + sep), `Unexpected asset path: ${asset}`);
  assert.ok(existsSync(destination) && statSync(destination).size > 0, `Missing or empty asset: ${asset}`);
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
console.log(`PASS: static build contains HTML, favicon, ${assetPaths.length} referenced assets and no secret-looking files.`);
