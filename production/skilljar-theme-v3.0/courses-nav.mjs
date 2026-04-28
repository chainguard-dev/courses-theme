import { Q, el, sanitizeUrl } from "./utils.mjs";
import { CG } from "./CG.mjs";

import { logoCourses } from "../data/graphics.mjs";

/**
 * Builds and inserts the secondary "Courses" navigation bar that sits below
 * the main Chainguard brand header.
 *
 * On scroll, a passive listener adds `courses-header-pinned` to <body> which
 * CSS uses to slide the brand bar away and pin this bar to the top.
 *
 * Only rendered on desktop (≥691 px) — controlled by CSS display:none/flex.
 * Call only for pages that should show the two-tier header.
 */
export function setupCoursesNav() {
  const accountNav = Q(".account-nav");

  const coursesNav = el("div", { id: "courses-nav" }, [
    el("div", { id: "courses-nav-inner" }, [
      el("div", { id: "courses-nav-left" }, [
        el("div", { id: "courses-nav-logo" }, [
          el("a", {
            className: "header-logo-link focus-link-v2",
            href: sanitizeUrl(CG.state.baseURL),
            aria: { label: "Chainguard Courses home" },
            innerHTML: logoCourses,
          }),
        ]),
        el("nav", { id: "courses-nav-links", aria: { label: "Site navigation" } }),
      ]),
      el("div", { id: "courses-nav-right" }, [
        accountNav,
      ].filter(Boolean)),
    ]),
  ]);

  CG.dom.bodyHeader.insertAdjacentElement("afterend", coursesNav);

  const headerHeight = CG.dom.bodyHeader.offsetHeight || 60;

  window.addEventListener(
    "scroll",
    () => {
      CG.dom.body.classList.toggle(
        "courses-header-pinned",
        window.scrollY > headerHeight
      );
    },
    { passive: true }
  );
}
