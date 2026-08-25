#!/usr/bin/env node
/**
 * House rule: no em dashes anywhere on this website.
 *
 * Also catches the near misses that read the same way to a visitor: en dashes
 * used as punctuation, double hyphens, and the horizontal bar character.
 *
 * Dash characters are checked everywhere, since none of them belong in this
 * codebase. The double hyphen check runs against prose only, because CSS
 * custom properties and Tailwind's arbitrary-value syntax legitimately use
 * two hyphens and would otherwise drown the signal.
 *
 * Run with `npm run check:copy`. Exits non-zero so CI can gate on it.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["src", "content", "docs"];
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".md", ".mdx", ".json", ".css", ".html"]);
const PROSE_EXTS = new Set([".md", ".mdx", ".html"]);
const CODE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx"]);
const SKIP = new Set(["node_modules", ".next", ".git", "dist", "build"]);

/** Rules that apply to every character in every file. */
const GLOBAL_RULES = [
  { name: "em dash", re: /—/ },
  { name: "horizontal bar", re: /―/ },
  { name: "em dash entity", re: /&mdash;|&#8212;|&#x2014;/i },
  // An en dash between digits is a numeric range and is fine. Between words it
  // reads as an em dash to anyone looking at the page.
  { name: "en dash as punctuation", re: /(?<=[A-Za-z,])\s*–\s*(?=[A-Za-z])/ },
];

/** Rules that apply to prose only. */
const PROSE_RULES = [{ name: "double hyphen", re: /(?<![-:!<])--(?![->])/ }];

/**
 * A CSS custom property name starts with two hyphens and is not punctuation.
 * Strip those before testing so token names can be written out in prose.
 */
function stripCustomProperties(text) {
  // A backtick or pipe can precede the name in markdown tables and inline code.
  return text.replace(/(^|[\s(`|])--[a-z][a-z0-9-]*/gi, "$1");
}

function walk(dir, out = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const entry of entries) {
    if (SKIP.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXTS.has(extname(full))) out.push(full);
  }
  return out;
}

/**
 * Pulls the human-readable text out of a source file.
 *
 * Copy lives in src/lib/content.ts by design, so string literals are only
 * treated as prose there. Everywhere else the literals are class names and CSS
 * custom properties, which legitimately contain two hyphens. Text sitting
 * directly between JSX tags is always prose, so it is checked in every file.
 */
function extractJsxText(source) {
  const out = [];
  const jsxText = />([^<>{}]{4,})</g;
  let m;
  while ((m = jsxText.exec(source))) out.push(m[1]);
  return out;
}

/** Copy files hold nothing but prose, so they are checked line by line. */
function isCopyFile(file) {
  const p = file.replace(/\\/g, "/");
  return p.endsWith("src/lib/content.ts") || p.includes("/content/");
}

const files = ROOTS.flatMap((r) => walk(r));
const findings = [];

for (const file of files) {
  const ext = extname(file);
  const source = readFileSync(file, "utf8");

  source.split("\n").forEach((line, i) => {
    for (const rule of GLOBAL_RULES) {
      if (rule.re.test(line)) {
        findings.push({ file, line: i + 1, rule: rule.name, text: line.trim().slice(0, 110) });
      }
    }
  });

  const isMarkdown = ext === ".md" || ext === ".mdx";
  const checkLines = PROSE_EXTS.has(ext) || isCopyFile(file);

  if (checkLines) {
    source.split("\n").forEach((line, i) => {
      // Fenced and indented code blocks are only a markdown concern. Copy
      // files are normally indented source, so the skip must not apply there.
      if (isMarkdown && (/^\s{4,}/.test(line) || line.trim().startsWith("```"))) return;
      const cleaned = stripCustomProperties(line);
      for (const rule of PROSE_RULES) {
        if (rule.re.test(cleaned)) {
          findings.push({ file, line: i + 1, rule: rule.name, text: line.trim().slice(0, 110) });
        }
      }
    });
  }

  if (CODE_EXTS.has(ext)) {
    for (const text of extractJsxText(source)) {
      const cleaned = stripCustomProperties(text);
      for (const rule of PROSE_RULES) {
        if (rule.re.test(cleaned)) {
          findings.push({ file, line: 0, rule: rule.name, text: text.trim().slice(0, 110) });
        }
      }
    }
  }
}

if (findings.length === 0) {
  console.log(`Clean. No em dashes in ${files.length} files.`);
  process.exit(0);
}

console.error(`Found ${findings.length} problem(s):\n`);
for (const f of findings) {
  console.error(`  ${f.file}${f.line ? ":" + f.line : ""}  [${f.rule}]`);
  console.error(`    ${f.text}\n`);
}
process.exit(1);
