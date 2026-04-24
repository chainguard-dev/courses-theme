/*
 * Chainguard Courses Theme v3.0
 * This script applies custom styles and functionality to Chainguard's Skilljar platform.
 * It includes features like curriculum styling, lesson navigation, and responsive design adjustments.
 * It also provides utility functions for clipboard operations and element styling.
 *
 * This script is designed to be run in the context of a Skilljar page.
 *
 * @version 3.0
 * @date 2026-03-20
 * @author Chainguard
 * @license MIT
 * @see {@link https://courses.chainguard.com|Chainguard Courses}
 */

import { CG } from "./skilljar-theme-v3.0/CG.mjs";
import { showBody } from "./skilljar-theme-v3.0/styling.mjs";
import { route, preRoute, postRoute } from "./skilljar-theme-v3.0/router.mjs";
import { setupDebug } from "./skilljar-theme-v3.0/debug.mjs";
import { logger } from "./skilljar-theme-v3.0/logger.mjs";

document.addEventListener("DOMContentLoaded", () => {
  try {
    if (CG.env.isAdmin) setupDebug();
    preRoute();
  } catch (err) {
    logger.error("Theme setup failed in preRoute().", err);
  }

  try {
    route();
  } catch (err) {
    logger.error("Theme setup failed in route().", err);
  }

  try {
    postRoute();
  } catch (err) {
    logger.error("Theme setup failed in postRoute().", err);
  }

  // Always show the body; preload.js hides it to prevent FOUC and we must
  // re-show it regardless of whether the theme applied successfully.
  showBody();
});
