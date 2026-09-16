import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = path => readFileSync(join(root, path), 'utf8');
const config = read('wrangler.toml');
const workflow = read('.github/workflows/deploy-cloudflare.yml');
const pkg = JSON.parse(read('package.json'));

assert.match(config, /^name\s*=\s*"quembi-ui"\s*$/m, 'Wrong Cloudflare Pages project name');
assert.match(config, /^pages_build_output_dir\s*=\s*"\.\/apps\/web\/dist"\s*$/m, 'Never upload the repository root');
assert.match(config, /^compatibility_date\s*=\s*"\d{4}-\d{2}-\d{2}"\s*$/m, 'Compatibility date required');
assert.match(workflow, /cloudflare\/wrangler-action@v3/, 'Wrangler deploy action missing');
assert.match(workflow, /pages deploy apps\/web\/dist --project-name=quembi-ui --branch=main/, 'Workflow must deploy production build');
assert.match(workflow, /secrets\.CLOUDFLARE_API_TOKEN/, 'API token must come from GitHub Secrets');
assert.match(workflow, /secrets\.CLOUDFLARE_ACCOUNT_ID/, 'Account ID must come from GitHub Secrets');
assert.ok(pkg.scripts['deploy:pages']?.includes('npm run smoke'), 'Manual deploy must validate the build');
assert.ok(!existsSync(join(root, '.github/workflows/pages.yml')), 'Obsolete GitHub Pages deployment must not coexist');
assert.ok(!/GITHUB_PAGES\s*[:=]\s*['"]?true/.test(workflow), 'Cloudflare must use the root path');
console.log('PASS: Wrangler project, output directory, deploy scripts, credentials and workflow are consistent.');
