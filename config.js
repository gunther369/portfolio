/** Site content and GitHub integration (see projectOverrides, hiddenRepos). */
window.PORTFOLIO_CONFIG = {
  name: "Gunasagar Pullamchetty",
  title: "Java Backend Engineer",
  tagline:
    "Designing and scaling distributed, event-driven backends for enterprise platforms — Java, Spring Boot, Kafka.",
  location: "Pune, India",
  availability: "Open to opportunities",

  about:
    "Senior Java Backend Engineer with 4+ years building microservices for enterprise CPQ platforms. I focus on API design, Kafka-based integrations, performance tuning, and cloud-native delivery — from design through production support. Currently at Amdocs; looking for a Java backend role where I can own services end to end.",

  experience: [
    {
      company: "Amdocs",
      role: "Software Developer · Enterprise CPQ Platform",
      period: "Jul 2022 — Present",
      location: "Pune, India",
      bullets: [
        "Own end-to-end backend work across design, APIs, testing, CI/CD, and production support — cut post-release defects by 15%+.",
        "Led Java 8 → 17 migration across 20+ modules (100+ API/compatibility fixes) with zero-downtime delivery.",
        "Designed Kafka event-driven quote-to-order flows (partitioning, DLQ, consumer scaling) — 30% faster processing.",
        "Improved REST API latency 20%+ and request latency 25%+ via Redis, pooling, JVM/GC analysis, and DB tuning.",
        "Technical leadership for a team of 4–5 through architecture reviews, quality initiatives, and incident support.",
      ],
    },
  ],

  skills: [
    {
      group: "Languages & frameworks",
      items: ["Java", "Spring Boot", "Hibernate", "SQL", "NoSQL", "OOP"],
    },
    {
      group: "Architecture",
      items: [
        "Microservices",
        "Event-driven systems",
        "REST API design",
        "Distributed systems",
        "Performance optimization",
      ],
    },
    {
      group: "Platform & DevOps",
      items: ["Apache Kafka", "Redis", "Kubernetes", "OpenShift", "AWS", "Jenkins", "CI/CD", "Git"],
    },
  ],

  /** Curated highlights shown above the GitHub project list (can be private/internal work). */
  featuredProjects: [
    {
      name: "HelmPilot",
      description:
        "Self-healing MCP server that automates multi-cluster OpenShift deployments via Bitbucket — cut deploy time ~90% (10 min → 45 sec) with namespace safety checks and multi-repo fallback.",
      tech: ["Python", "MCP", "OpenShift", "Kubernetes", "Bitbucket"],
      htmlUrl: null,
      liveUrl: null,
    },
    {
      name: "CPQ Plugin",
      description:
        "Internal browser extension for Keycloak multi-role auth (80% less login friction) and multi-service trace → UML sequence diagrams for faster root-cause analysis on distributed CPQ flows.",
      tech: ["JavaScript", "HTML", "Tracing APIs"],
      htmlUrl: null,
      liveUrl: null,
    },
  ],

  githubUsername: "gunther369",

  hiddenRepos: [
    "portfolio",
    "skills-copilot-codespaces-vscode",
    "amdocs_git",
    "amdocs_git2",
    "DevOps",
  ],

  social: {
    github: "https://github.com/gunther369",
    linkedin: "https://in.linkedin.com/in/gunasagarpullamchetty/",
    email: "gunasagar.pullamchetty@gmail.com",
  },

  projectOverrides: {},

  /** Do not invent GitHub Pages URLs — broken demos hurt credibility. */
  suggestGithubPagesDemo: false,
};
