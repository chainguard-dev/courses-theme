import { Q, el, sanitizeUrl } from "./utils.mjs";
import { CG } from "./CG.mjs";

/**
 * Adds a hamburger button to #mobile-header-right and a slide-down drawer
 * below it. The drawer holds a clone of .account-nav (so Skilljar's JS on
 * the original is undisturbed) and the "Go to Chainguard" link.
 *
 * Must be called after CG.dom.mobileHeader is set and before setupCoursesNav()
 * so the .account-nav clone is taken while the element is still in #header-right.
 */
export function setupMobileNav() {
  const btn = el("button", {
    id: "mobile-nav-toggle",
    type: "button",
    aria: { label: "Open menu", expanded: "false" },
  }, [el("span"), el("span"), el("span")]);

  const accountNavClone = Q(".account-nav")?.cloneNode(true) ?? null;

  const drawer = el("nav", {
    id: "mobile-nav-drawer",
    aria: { label: "Mobile navigation", hidden: "true" },
  }, [
    ...(accountNavClone ? [accountNavClone] : []),
    el("a", {
      className: "mobile-nav-link",
      href: sanitizeUrl("https://www.chainguard.dev"),
      target: "_blank",
      rel: "noopener noreferrer",
      text: "Go to Chainguard →",
    }),
  ]);

  CG.dom.mobileHeader.right.replaceChildren(btn);

  Q("header#mobile-header").insertAdjacentElement("afterend", drawer);

  function setOpen(open) {
    CG.dom.body.classList.toggle("mobile-nav-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    drawer.setAttribute("aria-hidden", String(!open));
  }

  btn.addEventListener("click", () =>
    setOpen(!CG.dom.body.classList.contains("mobile-nav-open"))
  );

  document.addEventListener("click", (e) => {
    if (!CG.dom.body.classList.contains("mobile-nav-open")) return;
    if (btn.contains(e.target) || drawer.contains(e.target)) return;
    setOpen(false);
  });
}
