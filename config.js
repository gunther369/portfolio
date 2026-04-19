/**
 * Edit this file to personalize your portfolio.
 * - Add resume.pdf next to index.html for the embedded resume.
 * - Set your GitHub username; repos are fetched from the public API.
 * - Use projectOverrides to set live demo URLs, hide repos, or pin descriptions.
 */
window.PORTFOLIO_CONFIG = {
  name: "Gunasagar Pullamchetty",
  title: "Software Developer",
  tagline:
    "I build things on the web. Drop in your resume and connect your GitHub repos below.",

  githubUsername: "gunther369",

  social: {
    github: "https://github.com/gunther369",
    linkedin: "",
    email: "",
  },

  /** Map repo name (string) to options */
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
