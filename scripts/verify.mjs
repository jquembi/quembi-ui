import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve(import.meta.dirname, '..');
const names = ['Button', 'Badge', 'Card', 'Alert', 'Input', 'SectionHeader', 'PricingCard', 'DashboardShell'];
const reactIndex = readFileSync(join(root, 'packages/react/src/index.ts'), 'utf8');
const vueIndex = readFileSync(join(root, 'packages/vue/src/index.ts'), 'utf8');
const catalog = readFileSync(join(root, 'apps/web/src/data/catalog.ts'), 'utf8');
for (const name of names) {
  assert.match(reactIndex, new RegExp(`export \\{ ${name} \\}`), `Missing React export: ${name}`);
  assert.match(vueIndex, new RegExp(`Ui${name}`), `Missing Vue export: ${name}`);
  assert.ok(existsSync(join(root, `packages/vue/src/components/Ui${name}.vue`)), `Missing Vue SFC: ${name}`);
}
const freeIds = ['button','badge','card','input','alert','section-header','pricing-card','dashboard-shell'];
for (const id of freeIds) assert.ok(catalog.includes(`id: '${id}'`), `Missing catalog item: ${id}`);
assert.equal((catalog.match(/plan: 'free'/g) ?? []).length, 8, 'Expected 8 Free catalog entries');
assert.equal((catalog.match(/plan: 'premium'/g) ?? []).length, 4, 'Expected 4 Premium previews');
const webPackage = JSON.parse(readFileSync(join(root, 'apps/web/package.json'),'utf8'));
assert.equal(webPackage.private, true, 'Website must not be accidentally published to npm');
assert.ok(!readdirSync(join(root,'apps/web/public')).some(n => /premium|secret|token/i.test(n)), 'Unexpected commercial or secret-looking public assets');
console.log(`PASS: ${names.length} React + ${names.length} Vue Free exports, ${freeIds.length} catalog Free entries, 4 Premium demos, public-assets checks.`);
