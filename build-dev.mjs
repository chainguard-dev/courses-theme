/**
 * Dev build script — identical to the npm build:css:dev + build:js:dev scripts
 * but injects the current git commit hash as a banner comment in both outputs
 * so you can verify which bundle is loaded without checking filenames.
 *
 * Usage:  node build-dev.mjs
 * CI:     set GITHUB_SHA in environment; the first 7 chars are used automatically.
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

const commit = process.env.GITHUB_SHA
  ? process.env.GITHUB_SHA.slice(0, 7)
  : execSync("git rev-parse --short HEAD").toString().trim();

const banner = `/* build: ${commit} */`;

console.log(`Building dev bundle (commit: ${commit})…`);

// Lint (same as build:dev)
execSync("npm run lint", { stdio: "inherit" });

// CSS
execSync("npx postcss production/style.css -o dist/bundle.css --map", {
  stdio: "inherit",
});
const css = readFileSync("dist/bundle.css", "utf8");
writeFileSync("dist/bundle.css", `${banner}\n${css}`);

// JS — esbuild handles the banner natively
execSync(
  `npx esbuild production/theme.mjs --bundle --sourcemap --banner:js=${JSON.stringify(banner)} --outfile=dist/bundle.js`,
  { stdio: "inherit" },
);

console.log(`Done. Bundle tagged: ${commit}`);
