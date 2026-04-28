/**
 * Production build script — mirrors the npm build scripts but injects the
 * current git commit hash as a banner comment in both outputs so you can
 * verify which bundle is deployed without checking filenames.
 *
 * Usage:  node build-prod.mjs
 * CI:     set GITHUB_SHA in environment; the first 7 chars are used automatically.
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

const commit = process.env.GITHUB_SHA
  ? process.env.GITHUB_SHA.slice(0, 7)
  : execSync("git rev-parse --short HEAD").toString().trim();

const banner = `/* build: ${commit} */`;

console.log(`Building production bundle (commit: ${commit})…`);

// Lint
execSync("npm run lint", { stdio: "inherit" });

// CSS — minified, NODE_ENV=production for PostCSS plugins
execSync("npx postcss production/style.css -o dist/bundle.min.css", {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" },
});
const css = readFileSync("dist/bundle.min.css", "utf8");
writeFileSync("dist/bundle.min.css", `${banner}\n${css}`);

// JS — esbuild handles the banner natively
execSync(
  `npx esbuild production/theme.mjs --bundle --minify --banner:js=${JSON.stringify(banner)} --outfile=dist/bundle.min.js`,
  { stdio: "inherit" },
);

console.log(`Done. Bundle tagged: ${commit}`);
