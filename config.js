/** Site content and GitHub integration (see projectOverrides, hiddenRepos). */
window.PORTFOLIO_CONFIG = {
  name: "Gunasagar Pullamchetty",
  title: "Java Backend Engineer",
  tagline:
    "Designing and scaling distributed, event-driven backends for enterprise platforms — Java, Spring Boot, Kafka.",
  location: "Pune, India",
  phone: "+91 6370494452",
  availability: "Open to opportunities",

  about:
    "Senior Java Backend Engineer with 4+ years building microservices for enterprise CPQ platforms. I focus on API design, Kafka-based integrations, performance tuning, and cloud-native delivery — from design through production support. Currently at Amdocs; looking for a Java backend role where I can own services end to end.",

  summary:
    "Senior Java Backend Engineer with 4+ years designing and scaling distributed, event-driven backend systems for enterprise CPQ platforms. Expertise in microservices, Kafka integrations, performance optimization, and cloud-native delivery. Led Java 17 migrations, latency reduction, and developer productivity work while mentoring engineers.",

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

  education: [
    {
      school: "National Institute of Technology Calicut",
      degree: "B.Tech in Electronics and Communication Engineering",
      period: "Aug 2018 — May 2022",
      detail: "GPA 7.45/10.00 · Coursework in DSA, AI, Electronics, Communication Systems",
    },
  ],

  certifications: [
    {
      name: "Agentic AI Certified Foundations Associate",
      issuer: "Oracle University",
      period: "Jul 2026 — Jul 2028",
    },
    {
      name: "AI Database Certified Foundations Associate",
      issuer: "Oracle University",
      period: "Jul 2026 — Jul 2028",
    },
    {
      name: "AWS Certified AI Practitioner",
      issuer: "Amazon Web Services",
      period: "Expected Aug 2026 (in progress)",
    },
  ],

  accomplishments: [
    "Recognized as Employee of the Month multiple times on the Amdocs CPQ project.",
    "1st prize in Digimania (Tathva ’18, NIT Calicut).",
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
