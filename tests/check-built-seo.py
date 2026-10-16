"""Check prerendered production output after a production build (Python stdlib)."""
import json
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
from xml.etree import ElementTree

ROOT = Path('.next/server/app')
ORIGIN = 'https://parkplacedentist.com'

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.h1 = 0
        self.canonicals = []
        self.descriptions = []
        self.titles = []
        self.links = []
        self.graphs = []
        self.capture = None
        self.buffer = ''
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'h1': self.h1 += 1
        if tag == 'link' and a.get('rel') == 'canonical': self.canonicals.append(a['href'])
        if tag == 'meta' and a.get('name') == 'description': self.descriptions.append(a.get('content', ''))
        if tag == 'meta' and a.get('name') == 'robots': assert 'noindex' not in a.get('content', '')
        if tag == 'a': self.links.append(a.get('href', ''))
        if tag == 'title' or (tag == 'script' and a.get('type') == 'application/ld+json'):
            self.capture = tag
            self.buffer = ''

    def handle_data(self, data):
        if self.capture: self.buffer += data

    def handle_endtag(self, tag):
        if tag != self.capture: return
        if tag == 'title': self.titles.append(self.buffer)
        if tag == 'script': self.graphs.extend(json.loads(self.buffer).get('@graph', []))
        self.capture = None

urls = [node.text for node in ElementTree.parse(ROOT / 'sitemap.xml.body').iter() if node.tag.endswith('}loc')]
assert len(urls) == len(set(urls)) == 63, 'Expected 60 original pages plus three guides'
pages = {}
for url in urls:
    path = urlsplit(url).path
    file = ROOT / (path.lstrip('/') + '.html' if path else 'index.html')
    page = Page(file.read_text())
    assert page.h1 == 1, (url, 'H1 count', page.h1)
    assert page.canonicals == [url], (url, page.canonicals)
    assert len(page.titles) == 1 and page.titles[0], (url, 'title')
    assert len(page.descriptions) == 1 and page.descriptions[0], (url, 'description')
    for node in page.graphs:
        if node.get('@type') == 'BreadcrumbList':
            items = node['itemListElement']
            for i, item in enumerate(items):
                assert item['position'] == i + 1 and item['name'], (url, item)
                if i < len(items) - 1:
                    assert item.get('item', '').startswith(ORIGIN), (url, 'missing breadcrumb URL', item)
        if node.get('@type') == 'BlogPosting':
            assert node['datePublished'] <= node['dateModified'], url
            assert Path('public' + urlsplit(node['image']).path).is_file(), (url, 'missing article image')
    pages[url] = page

for field in ['titles', 'descriptions']:
    duplicates = [text for text, count in Counter(getattr(p, field)[0] for p in pages.values()).items() if count > 1]
    assert not duplicates, (field, duplicates)

new = ['broken-denture-repair-reline-replacement', 'same-day-vs-traditional-crowns', 'implants-bridges-partial-dentures']
for slug in new:
    url = ORIGIN + '/patient-resources/blog/' + slug
    page = pages[url]
    article = next(n for n in page.graphs if n.get('@type') == 'BlogPosting')
    assert 'reviewedBy' not in article and 'lastReviewed' not in article, 'No invented clinician review'
    assert article['author']['@id'] == article['publisher']['@id'], 'Practice author'
    assert sum(1 for other in pages.values() if urlsplit(url).path in other.links) >= 3, 'Guide needs contextual discovery paths'
    assert any('mouthhealthy.org' in href or 'gotoapro.org' in href for href in page.links), 'Clinical sources'

broken = []
for url, page in pages.items():
    for href in page.links:
        parsed = urlsplit(href)
        if parsed.scheme and parsed.netloc != urlsplit(ORIGIN).netloc: continue
        if not parsed.path or not parsed.path.startswith('/'): continue
        path = unquote(parsed.path).rstrip('/')
        if ORIGIN + path in pages or (Path('public') / path.lstrip('/')).exists(): continue
        if path in ['/thank-you', '/style-guide']: continue
        broken.append((url, href))
assert not broken, broken
print('PASS: 63 pages; unique metadata; canonical/indexability/H1 checks; valid breadcrumb paths; article schema and assets; contextual guide links; no broken internal destinations.')
