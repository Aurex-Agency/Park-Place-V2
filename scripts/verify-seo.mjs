import assert from 'node:assert/strict';
import http from 'node:http';

const base = process.env.SEO_BASE_URL ?? 'http://localhost:3009';
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(urls.length, 67, 'Expected 63 existing URLs and four new articles');
assert.equal(new Set(urls).size, urls.length);
const titles = new Set();
let breadcrumbs = 0;
for (const url of urls) {
  const route = new URL(url).pathname;
  const response = await fetch(`${base}${route}`);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title, `Missing title: ${route}`);
  assert.ok(!titles.has(title), `Duplicate title: ${route}`);
  titles.add(title);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `H1 count: ${route}`);
  assert.ok(html.includes(`rel="canonical" href="${url}"`), `Canonical: ${route}`);
  assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), `Unexpected noindex: ${route}`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    const graph = JSON.parse(match[1]);
    for (const node of graph['@graph'] ?? [graph]) if (node['@type'] === 'BreadcrumbList') {
      breadcrumbs++;
      for (const [index, crumb] of node.itemListElement.entries()) {
        assert.equal(crumb.position, index + 1, route);
        assert.ok(crumb.name && /^https?:\/\//.test(crumb.item), `Breadcrumb URL: ${route}`);
      }
    }
  }
}
for (const host of ['parkplace-dental.com', 'www.parkplace-dental.com']) {
  // Node fetch normalizes Host; use an HTTP request to test host routing.
  const response = await new Promise((resolve, reject) => {
    http.get(`${base}/contact-us`, { headers: { host } }, res => { res.resume(); resolve(res); }).on('error', reject);
  });
  assert.equal(response.statusCode, 308);
  assert.equal(response.headers.location, 'https://parkplacedentist.com/contact-us');
}
assert.equal((await fetch(`${base}/not-a-real-dental-page`)).status, 404);
console.log(`Verified ${urls.length} pages: 200 responses, unique titles, one H1, self canonicals and indexability; ${breadcrumbs} breadcrumb graphs; two legacy-host redirects; genuine 404.`);
