/**
 * Landing page component configuration.
 *
 * Each entry is rendered by makeLandingPage() in landing-page.mjs.
 * Supported types: "announcement" | "featured-scroll" | "path-callout" | "community"
 */
export const landingSections = [
  {
    type: "announcement",
    text: "Curious about our latest product launches?",
    linkText: "Watch our most recent webinar →",
    href: "https://chainguard.ondemand.goldcast.io/on-demand/7375ddfb-fdc5-4b1d-8f20-2c417b9dfdaf",
  },

  {
    type: "featured-scroll",
    eyebrow: "Looking for a place to start?",
    title: "Featured Courses",
    description:
      "Whether you're new to Chainguard or deepening your expertise, these courses will get you up to speed quickly.",
    // ctaText: "Explore all courses →",
    // ctaHref: "#",
    links: [
      {
        isCourse: true,
        title: "Chainguard Containers Crash Course",
        slug: "linkys-crash-course-on-chainguard-images",
        description:
          "A fast, focused overview—from setup and registry basics to vulnerability management and support.",
        icon: "lightning",
        tag: "Course",
      },
      {
        isCourse: true,
        title: "Securing the AI/ML Supply Chain",
        slug: "securing-ai",
        description:
          "Protect models, datasets, and AI/ML pipelines—unpack the threats, tools, and standards shaping MLSecOps.",
        icon: "frames",
        tag: "Course",
      },
      {
        isPath: true,
        title: "Painless Vulnerability Management",
        slug: "path/painless-vulnerability-management",
        description:
          "Learn how to manage vulnerabilities effectively using Chainguard's tools and best practices.",
        icon: "burger",
        tag: "Learning Path",
      },
      {
        isCourse: true,
        title: "Getting Started with Custom Assembly",
        slug: "getting-started-with-chainguards-custom-assembly",
        description:
          "Quickly and securely customize your Chainguard Images—no Dockerfile required.",
        icon: "star",
        tag: "Course",
      },
      {
        isCourse: true,
        title: "Get Spicy with SLSA",
        slug: "get-spicy-with-slsa-securing-your-supply-chain-one-level-at-a-time",
        description:
          "Understand SLSA, how Chainguard helps you meet it, and why it matters now more than ever.",
        icon: "shield",
        tag: "Course",
      },
    ],
  },

  {
    type: "path-callout",
    eyebrow: "Coming in Q2",
    title: "Developing Safely with AI",
    description:
      "Ready to build real-world AI applications with security in mind? Our new learning path covers secure development patterns for AI/ML systems—from model sourcing to deployment. Six courses designed for developers who are ready to build safely.",
    href: "#",
    buttonText: "Learn more →",
    card: {
      label: "Learning Path",
      title: "Developing Safely\nwith AI",
    },
  },

  {
    type: "community",
    title: "Join the Chainguard Community",
    description:
      "Have a question about a course you're completing? Want to connect with other security professionals and Chainguard users? Join our community to share knowledge and get help.",
    buttonText: "Join Today",
    href: "https://chainguardcommunity.slack.com/join/shared_invite/zt-3nttdr807-V9BJHayWvsB0KbHsfZO5Rw#/shared-invite/email",
  },
];
