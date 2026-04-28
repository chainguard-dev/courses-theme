import { Q, el, sanitizeUrl } from "./utils.mjs";
import { createClone } from "./icons.mjs";
import { CG } from "./CG.mjs";

// Card width (px) must match .lp-scroll-card in landing-page.css
const SCROLL_CARD_WIDTH = 280;
const SCROLL_GAP = 24;

// ─── Announcement ────────────────────────────────────────────────────────────

function makeAnnouncement(s) {
  return el("div", { className: "lp-announcement" }, [
    el("p", {}, [
      document.createTextNode(`${s.text} `),
      el("a", {
        href: sanitizeUrl(s.href),
        target: "_blank",
        rel: "noopener noreferrer",
        text: s.linkText,
      }),
    ]),
  ]);
}

// ─── Featured horizontal scroll ──────────────────────────────────────────────

function makeScrollCard(link, baseURL) {
  return el(
    "a",
    {
      className: "lp-scroll-card no-select",
      href: `${baseURL}/${link.slug}`,
      target: "_blank",
      rel: "noopener noreferrer",
      title: link.title,
    },
    [
      el("div", { className: "lp-card-thumb" }, [
        createClone(link.icon, { width: "64", height: "64" }),
      ]),
      el("div", { className: "lp-card-body" }, [
        el("span", { className: "lp-card-tag", text: link.tag }),
        el("h3", { text: link.title }),
        el("p", { text: link.description }),
      ]),
    ]
  );
}

function makeFeaturedScroll(s, baseURL) {
  const cards = s.links.map((link) => makeScrollCard(link, baseURL));
  const track = el("div", { className: "lp-scroll-track" }, cards);

  const btnPrev = el(
    "button",
    {
      className: "lp-nav-btn lp-nav-prev",
      aria: { label: "Scroll left" },
      on: {
        click: () =>
          track.scrollBy({
            left: -(SCROLL_CARD_WIDTH + SCROLL_GAP),
            behavior: "smooth",
          }),
      },
    },
    [el("i", { className: "fa fa-chevron-left" })]
  );

  const btnNext = el(
    "button",
    {
      className: "lp-nav-btn lp-nav-next",
      aria: { label: "Scroll right" },
      on: {
        click: () =>
          track.scrollBy({
            left: SCROLL_CARD_WIDTH + SCROLL_GAP,
            behavior: "smooth",
          }),
      },
    },
    [el("i", { className: "fa fa-chevron-right" })]
  );

  const syncBtns = () => {
    btnPrev.disabled = track.scrollLeft <= 0;
    btnNext.disabled =
      track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  };

  track.addEventListener("scroll", syncBtns, { passive: true });
  requestAnimationFrame(syncBtns);

  const introChildren = [
    s.eyebrow ? el("span", { className: "lp-eyebrow", text: s.eyebrow }) : null,
    el("h2", { text: s.title }),
    s.description ? el("p", { className: "lp-scroll-desc", text: s.description }) : null,
    s.ctaText
      ? el("a", {
          className: "lp-scroll-cta",
          href: sanitizeUrl(s.ctaHref ?? "/"),
          target: "_blank",
          rel: "noopener noreferrer",
          text: s.ctaText,
        })
      : null,
  ].filter(Boolean);

  return el("section", { className: "lp-featured-scroll" }, [
    el("div", { className: "lp-scroll-header" }, [
      el("div", { className: "lp-scroll-intro" }, introChildren),
      el("div", { className: "lp-nav-btns" }, [btnPrev, btnNext]),
    ]),
    el("div", { className: "lp-scroll-track-wrapper" }, [track]),
  ]);
}

// ─── New learning path callout ────────────────────────────────────────────────

function makePathCallout(s, baseURL) {
  const href = s.href.startsWith("/") ? `${baseURL}${s.href}` : s.href;

  return el("section", { className: "lp-path-callout" }, [
    el("div", { className: "lp-callout-inner" }, [
      el(
        "div",
        { className: "lp-callout-text" },
        [
          s.eyebrow
            ? el("span", { className: "lp-eyebrow", text: s.eyebrow })
            : null,
          el("h2", { text: s.title }),
          el("p", { text: s.description }),
          el("a", {
            className: "lp-callout-btn",
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            text: s.buttonText,
          }),
        ].filter(Boolean)
      ),
      el("div", { className: "lp-callout-card" }, [
        el("span", { className: "lp-callout-card-label", text: s.card.label }),
        el("h3", { text: s.card.title }),
      ]),
    ]),
  ]);
}

// ─── Community CTA ───────────────────────────────────────────────────────────

function makeCommunity(s) {
  return el("section", { className: "lp-community" }, [
    el("div", { className: "lp-community-inner" }, [
      el("div", { className: "lp-community-icon" }, [
        el("i", { className: "fa fa-users" }),
      ]),
      el("div", { className: "lp-community-content" }, [
        el("h2", { text: s.title }),
        el("p", { text: s.description }),
        el("a", {
          className: "lp-community-btn",
          href: sanitizeUrl(s.href),
          target: "_blank",
          rel: "noopener noreferrer",
          text: s.buttonText,
        }),
      ]),
    ]),
  ]);
}

// ─── Public entry point ───────────────────────────────────────────────────────

/**
 * Renders landing page components into the given parent element.
 * Similar to makeSections() but supports richer component types suited
 * to a home/landing page rather than a simple course grid.
 *
 * @param {Array}  sections       - Array of component config objects from landing-sections.mjs
 * @param {string} parentSelector - CSS selector for the container element
 * @param {string} baseURL        - Base URL for course/path links
 */
export function makeLandingPage(
  sections,
  parentSelector = "#skilljar-content",
  baseURL = "https://courses.chainguard.dev"
) {
  const parent = Q(parentSelector);
  if (!parent) return;

  sections.forEach((s) => {
    if (s.internalOnly && !CG.env.isInternal) return;
    if (s.adminOnly && !CG.env.isAdmin) return;

    let elem;
    switch (s.type) {
      case "announcement":
        elem = makeAnnouncement(s);
        break;
      case "featured-scroll":
        elem = makeFeaturedScroll(s, baseURL);
        break;
      case "path-callout":
        elem = makePathCallout(s, baseURL);
        break;
      case "community":
        elem = makeCommunity(s);
        break;
      default:
        return;
    }

    if (elem) parent.append(elem);
  });
}
