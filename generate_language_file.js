#!/usr/bin/env node
// Scans a folder of course HTML files and writes a sorted JSON array of all
// Shiki language identifiers found in code blocks to production/data/languages.json.
//
// Usage: node generate_language_file.js <path-to-html-folder>
//
// Recognises both patterns Skilljar produces:
//   <pre class="language-terraform"><code data-lang="terraform">
//   <pre data-lang="terraform"><code>

const { readFileSync, writeFileSync, readdirSync, statSync } = require("fs");
const { join, extname, resolve } = require("path");

const htmlFolder = process.argv[2];

if (!htmlFolder) {
  console.error("Usage: node generate_language_file.js <path-to-html-folder>");
  process.exit(1);
}

function walkHtml(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walkHtml(full));
    } else if (extname(entry) === ".html") {
      files.push(full);
    }
  }
  return files;
}

const patterns = [
  /class="language-([^"\s]+)"/g,
  /data-lang="([^"]+)"/g,
];

const languages = new Set();

for (const file of walkHtml(resolve(htmlFolder))) {
  const content = readFileSync(file, "utf-8");
  for (const re of patterns) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(content)) !== null) {
      languages.add(match[1]);
    }
  }
}

const sorted = [...languages].sort();
const outputPath = join(__dirname, "production/data/languages.json");

writeFileSync(outputPath, JSON.stringify(sorted, null, 2) + "\n");

console.log(`Found ${sorted.length} language(s): ${sorted.join(", ") || "(none)"}`);
console.log(`Written to ${outputPath}`);
