/**
 * Edit this file to personalize your portfolio.
 * - Add resume.pdf next to index.html for the embedded resume.
 * - Set your GitHub username; repos are fetched from the public API.
 * - Use projectOverrides to set live demo URLs, hide repos, or pin descriptions.
 * - Use hiddenRepos for repo names to exclude without a full override block.
 */
window.PORTFOLIO_CONFIG = {
  name: "Gunasagar Pullamchetty",
  title: "Software Developer",
  tagline:
    "I build things on the web. Drop in your resume and connect your GitHub repos below.",

  githubUsername: "gunther369",

  /** Repo names to never show (e.g. this site, course templates). Forks are always hidden in the UI. */
  hiddenRepos: ["portfolio", "skills-copilot-codespaces-vscode", "amdocs_git", "amdocs_git2", "DevOps"],

  social: {
    github: "https://github.com/gunther369",
    linkedin: "https://in.linkedin.com/in/gunasagarpullamchetty/",
    email: "gunasagar.pullamchetty@amdocs.com",
  },

  /** Map repo name (string) to options; `hidden: true` also hides a single repo. */
  projectOverrides: {
    // Example:
    // "my-app": {
    //   liveUrl: "https://username.github.io/my-app/",
    //   description: "Short blurb shown on the card.",
    //   featured: true,
    //   hidden: false,
    // },
  },

  /**
   * If true, repos without an explicit liveUrl still get a "Try GitHub Pages" link
   * using https://{username}.github.io/{repo}/
   */
  suggestGithubPagesDemo: true,
};
