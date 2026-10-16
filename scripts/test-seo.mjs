import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

const root = process.cwd();
function load(file, mocks = {}, globals = {}, cache = new Map()) {
  const absolute = path.resolve(root, file);
  if (cache.has(absolute)) return cache.get(absolute);
  const exports = {};
  cache.set(absolute, exports);
  const code = ts.transpileModule(readFileSync(absolute, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, {
    exports, process: { env: { NEXT_PUBLIC_SITE_URL: 'https://parkplacedentist.com' } },
    setTimeout, console, ...globals,
    require(name) {
      if (name in mocks) return mocks[name];
      const local = name.startsWith('@/') ? path.join(root, 'src', name.slice(2)) : path.resolve(path.dirname(absolute), name);
      return load(local + (path.extname(local) ? '' : '.ts'), mocks, globals, cache);
    },
  }, { filename: absolute });
  return exports;
}
const { posts } = load('src/content/posts.ts');
const { locations } = load('src/content/locations.ts');
const { serviceCategories } = load('src/content/services.ts');
const routes = new Set(['/']);
function discover(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.includes('[')) discover(file);
    if (entry.name === 'page.tsx') routes.add('/' + path.relative('src/app', dir).replaceAll(path.sep, '/'));
  }
}
discover('src/app');
for (const p of posts) routes.add(`/patient-resources/blog/${p.slug}`);
for (const l of locations) routes.add(`/locations/${l.slug}`);
for (const c of serviceCategories) {
  routes.add(`/services/${c.slug}`);
  for (const s of c.children) routes.add(`/services/${c.slug}/${s.slug}`);
}
function checkLinks(value) {
  if (!value || typeof value !== 'object') return;
  for (const [key, item] of Object.entries(value)) {
    if (key === 'href' && item.startsWith('/')) assert.ok(routes.has(item.split('#')[0]), `Missing route: ${item}`);
    if (key === 'image') assert.ok(existsSync(path.join('public', item)), `Missing image: ${item}`);
    if (key === 'relatedSlugs') for (const slug of item) assert.ok(posts.some(p => p.slug === slug), slug);
    checkLinks(item);
  }
}
test('14 articles and 14 towns preserve working links, images and comparison tables', () => {
  assert.equal(posts.length, 14);
  assert.equal(locations.length, 14);
  assert.equal(new Set(posts.map(p => p.slug)).size, 14);
  checkLinks(posts); checkLinks(locations);
  for (const post of posts) {
    assert.ok(post.updated >= post.published);
    for (const block of post.blocks) if (block.kind === 'table') {
      for (const row of block.rows) assert.equal(row.length, block.columns.length, post.slug);
    }
  }
  for (const location of locations) {
    assert.equal(new URL(location.directionsHref).searchParams.get('destination'), '403 N 3rd St, Booneville, MS 38829');
    assert.ok(!('miles' in location));
  }
});
test('breadcrumbs have absolute items and editorial updates do not assert clinical review', () => {
  const { articleGraph, breadcrumbNode } = load('src/lib/schema.ts');
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Articles', href: '/patient-resources/blog' }, { label: 'Current article' }];
  const breadcrumb = breadcrumbNode('/test', crumbs);
  assert.equal(breadcrumb.itemListElement[2].item, 'https://parkplacedentist.com/test');
  for (const post of posts) {
    const graph = JSON.parse(articleGraph({ path: `/patient-resources/blog/${post.slug}`, headline: post.title, description: post.metaDescription, published: post.published, modified: post.updated, author: post.author, reviewed: post.reviewed, image: post.image, crumbs }));
    for (const node of graph['@graph']) {
      assert.ok(!node.reviewedBy, post.slug);
      assert.ok(!node.lastReviewed, post.slug);
    }
  }
});
test('GA4 events allow only coarse form types and never submitted patient fields', () => {
  const events = [];
  const analytics = load('src/lib/analytics-events.ts', {}, { window: { gtag: (...args) => events.push(args) } });
  analytics.trackLeadOutcome('lead_submitted', 'appointment');
  analytics.trackLeadOutcome('lead_submitted', 'private medical text');
  analytics.trackLeadOutcome('lead_failed', 'contact', 500);
  analytics.trackPhoneClick('private medical text');
  assert.deepEqual(JSON.parse(JSON.stringify(events)), [
    ['event', 'generate_lead', { form_type: 'appointment' }],
    ['event', 'generate_lead', { form_type: 'unknown' }],
    ['event', 'lead_failed', { form_type: 'contact', status: 500 }],
    ['event', 'call_started', { placement: 'page' }],
  ]);
});
async function formHarness(responder) {
  const events = []; let sends = 0;
  const hooks = {
    useState: initial => [initial, () => {}], useRef: current => ({ current }),
    useCallback: fn => fn, useEffect: fn => { fn(); },
  };
  const { useSubmit } = load('src/components/page/useSubmit.ts', {
    react: hooks, '@vercel/analytics': { track() {} },
    '@/lib/analytics-events': { trackLeadOutcome: (...args) => events.push(args) },
  }, {
    document: { addEventListener() {}, removeEventListener() {} },
    fetch: async url => url === '/api/form-token'
      ? { json: async () => ({ token: 'test-token' }) }
      : (sends++, responder(sends)),
  });
  // React is replaced with a deterministic hook harness for this isolated test.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useSubmit();
  await new Promise(resolve => setImmediate(resolve));
  return { form, events, sends: () => sends };
}
test('a pending or accepted form cannot send or count a second lead', async () => {
  let finish;
  const h = await formHarness(() => new Promise(resolve => { finish = resolve; }));
  const first = h.form.submit({ kind: 'appointment', message: 'Not for analytics' });
  assert.equal(await h.form.submit({ kind: 'appointment' }), false);
  finish({ ok: true, json: async () => ({ ok: true }) });
  assert.equal(await first, true);
  assert.equal(await h.form.submit({ kind: 'appointment' }), false);
  assert.equal(h.sends(), 1);
  assert.equal(h.events.length, 1);
  assert.equal(h.events[0][0], 'lead_submitted');
});
test('a failed submission can be retried and only success counts a lead', async () => {
  const h = await formHarness(async n => ({ ok: n > 1, status: n > 1 ? 200 : 500, json: async () => ({ ok: n > 1 }) }));
  assert.equal(await h.form.submit({ kind: 'contact' }), false);
  assert.equal(await h.form.submit({ kind: 'contact' }), true);
  assert.equal(h.sends(), 2);
  assert.equal(h.events.map(e => e[0]).join(','), 'lead_failed,lead_submitted');
});
test('legacy redirects preserve paths and never match the current or unrelated host', async () => {
  const rules = await load('next.config.ts').default.redirects();
  assert.equal(rules.length, 2);
  for (const rule of rules) {
    const host = new RegExp(`^(?:${rule.has[0].value})$`);
    assert.ok(!host.test('parkplacedentist.com'));
    assert.ok(!host.test('parkplace-dentalXcom'));
    assert.ok(host.test('parkplace-dental.com') || host.test('www.parkplace-dental.com'));
    assert.equal(rule.destination, 'https://parkplacedentist.com/:path*');
    assert.equal(rule.permanent, true);
  }
});
