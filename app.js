(function () {
  const cfg = window.PORTFOLIO_CONFIG || {};
  const overrides = cfg.projectOverrides || {};
  const hiddenRepoNames = new Set(
    (cfg.hiddenRepos || []).map((n) => String(n).trim()).filter(Boolean)
  );

  const $ = (id) => document.getElementById(id);

  function setText(id, text) {
    const el = $(id);
    if (el && text != null) el.textContent = text;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initialsFromName(name) {
    const parts = String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (!parts.length) return "GP";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function socialLink(href, label) {
    return `<a href="${escapeHtml(href)}" rel="noopener noreferrer" target="_blank">${escapeHtml(label)}</a>`;
  }

  function initHero() {
    const name = cfg.name || "Your Name";
    const logo = $("site-logo");
    if (logo) logo.textContent = initialsFromName(name);

    setText("hero-name", name);
    setText(
      "hero-title",
      cfg.title != null && String(cfg.title).trim() !== ""
        ? cfg.title
        : "Java Backend Engineer"
    );
    setText("hero-tagline", cfg.tagline || "");

    const kickerBits = [];
    if (cfg.availability) kickerBits.push(cfg.availability);
    if (cfg.location) kickerBits.push(cfg.location);
    setText("hero-kicker", kickerBits.join(" · "));

    const actions = $("hero-actions");
    if (actions) {
      actions.innerHTML = [
        `<a class="btn btn-primary" href="#projects">View work</a>`,
        `<a class="btn btn-ghost" href="resume.pdf" id="hero-resume" download="Gunasagar_Pullamchetty_Resume.pdf">Download resume</a>`,
      ].join("");
    }

    const social = $("hero-social");
    if (social) {
      const links = [];
      if (cfg.social?.linkedin)
        links.push(socialLink(cfg.social.linkedin, "LinkedIn"));
      if (cfg.social?.github)
        links.push(socialLink(cfg.social.github, "GitHub"));
      if (cfg.social?.email)
        links.push(
          `<a href="mailto:${escapeHtml(cfg.social.email)}">Email</a>`
        );
      social.innerHTML = links.join("");
    }
  }

  function initAbout() {
    setText("about-text", cfg.about || "");
  }

  function initExperience() {
    const root = $("experience-list");
    if (!root) return;
    const jobs = Array.isArray(cfg.experience) ? cfg.experience : [];
    if (!jobs.length) {
      root.innerHTML =
        '<p class="section-lead">Add experience entries in config.js.</p>';
      return;
    }

    root.innerHTML = jobs
      .map((job) => {
        const bullets = (job.bullets || [])
          .map((b) => `<li>${escapeHtml(b)}</li>`)
          .join("");
        const meta = [job.period, job.location].filter(Boolean).join(" · ");
        return `<article class="exp-card">
          <div class="exp-top">
            <h3 class="exp-role">${escapeHtml(job.role || "")}</h3>
            <p class="exp-meta">${escapeHtml(meta)}</p>
          </div>
          <p class="exp-company">${escapeHtml(job.company || "")}</p>
          <ul class="exp-bullets">${bullets}</ul>
        </article>`;
      })
      .join("");
  }

  function initSkills() {
    const root = $("skills-groups");
    if (!root) return;
    const groups = Array.isArray(cfg.skills) ? cfg.skills : [];
    if (!groups.length) {
      root.innerHTML = "";
      return;
    }

    root.innerHTML = groups
      .map((g) => {
        const chips = (g.items || [])
          .map((item) => `<span class="skill-chip">${escapeHtml(item)}</span>`)
          .join("");
        return `<div class="skill-group">
          <h3 class="skill-group-title">${escapeHtml(g.group || "")}</h3>
          <div class="skill-chips">${chips}</div>
        </div>`;
      })
      .join("");
  }

  function techChips(tech) {
    if (!tech || !tech.length) return "";
    return `<div class="project-tech">${tech
      .map((t) => `<span class="tech-chip">${escapeHtml(t)}</span>`)
      .join("")}</div>`;
  }

  function projectCard(r, { featuredLayout } = {}) {
    const meta =
      r.stars != null && !featuredLayout
        ? `<span class="project-meta">★ ${escapeHtml(String(r.stars))}</span>`
        : featuredLayout
          ? `<span class="project-badge">Featured</span>`
          : "";
    const desc = escapeHtml(r.description || "No description.");
    const repoBtn = r.htmlUrl
      ? `<a class="btn btn-ghost" href="${escapeHtml(r.htmlUrl)}" rel="noopener noreferrer" target="_blank">Repository</a>`
      : "";
    const demoBtn = r.liveUrl
      ? `<a class="btn btn-primary" href="${escapeHtml(r.liveUrl)}" target="_blank" rel="noopener noreferrer">Open demo</a>`
      : "";

    return `<article class="project-card${featuredLayout || r.featured ? " featured" : ""}">
      <div class="project-top">
        <h3 class="project-name">${
          r.htmlUrl
            ? `<a href="${escapeHtml(r.htmlUrl)}" rel="noopener noreferrer" target="_blank">${escapeHtml(r.name)}</a>`
            : escapeHtml(r.name)
        }</h3>
        ${meta}
      </div>
      <p class="project-desc">${desc}</p>
      ${techChips(r.tech)}
      ${
        repoBtn || demoBtn
          ? `<div class="project-actions">${repoBtn}${demoBtn}</div>`
          : ""
      }
    </article>`;
  }

  function initFeatured() {
    const grid = $("featured-grid");
    if (!grid) return;
    const list = Array.isArray(cfg.featuredProjects) ? cfg.featuredProjects : [];
    if (!list.length) {
      grid.hidden = true;
      return;
    }
    grid.innerHTML = list
      .map((p) =>
        projectCard(
          {
            name: p.name,
            description: p.description,
            tech: p.tech,
            htmlUrl: p.htmlUrl || null,
            liveUrl: p.liveUrl || null,
            featured: true,
          },
          { featuredLayout: true }
        )
      )
      .join("");
  }

  function initContact() {
    const lead = $("contact-lead");
    if (lead) {
      const bits = [];
      if (cfg.availability) bits.push(cfg.availability + ".");
      bits.push("Reach out by email or LinkedIn.");
      lead.textContent = bits.join(" ");
    }
    const actions = $("contact-actions");
    if (!actions) return;
    const links = [];
    if (cfg.social?.email) {
      links.push(
        `<a class="btn btn-primary" href="mailto:${escapeHtml(cfg.social.email)}">Email me</a>`
      );
    }
    if (cfg.social?.linkedin) {
      links.push(
        `<a class="btn btn-ghost" href="${escapeHtml(cfg.social.linkedin)}" rel="noopener noreferrer" target="_blank">LinkedIn</a>`
      );
    }
    if (cfg.social?.github) {
      links.push(
        `<a class="btn btn-ghost" href="${escapeHtml(cfg.social.github)}" rel="noopener noreferrer" target="_blank">GitHub</a>`
      );
    }
    actions.innerHTML = links.join("");
  }

  async function initResume() {
    const frame = $("resume-frame");
    const status = $("resume-status");
    const download = $("resume-download");
    const heroResume = $("hero-resume");
    if (!frame || !status) return;

    // Cache-bust so browsers don't keep an old placeholder PDF in the iframe.
    const pdfUrl = "resume.pdf?v=gp-resume-2026-08-03";
    const downloadName = "Gunasagar_Pullamchetty_Resume.pdf";
    let pdfOk = false;
    try {
      const headRes = await fetch(pdfUrl, { method: "HEAD" });
      pdfOk = headRes.ok;
    } catch {
      pdfOk = false;
    }

    if (pdfOk) {
      frame.src = pdfUrl;
      let settled = false;
      const timer = setTimeout(() => {
        if (!settled) status.textContent = "";
      }, 2500);

      frame.addEventListener("load", () => {
        settled = true;
        clearTimeout(timer);
        status.textContent = "";
      });

      frame.addEventListener("error", () => {
        settled = true;
        clearTimeout(timer);
        status.textContent = "Resume could not be displayed.";
      });
    } else {
      frame.src = "about:blank";
      status.textContent =
        "Add resume.pdf next to index.html to show and download your resume.";
    }

    function wireDownload(el) {
      if (!el) return;
      if (!pdfOk) {
        el.classList.add("is-disabled");
        el.setAttribute("aria-disabled", "true");
      }
      el.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          const r = await fetch(pdfUrl, { method: "HEAD" });
          if (!r.ok) {
            status.textContent = "Resume PDF not found.";
            return;
          }
          const a = document.createElement("a");
          a.href = pdfUrl;
          a.download = downloadName;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } catch {
          status.textContent = "Could not download resume.";
        }
      });
    }

    wireDownload(download);
    wireDownload(heroResume);
  }

  function suggestedPagesUrl(username, repoName) {
    return `https://${encodeURIComponent(username)}.github.io/${encodeURIComponent(repoName)}/`;
  }

  function mergeRepo(repo) {
    const o = overrides[repo.name] || {};
    const username = cfg.githubUsername || "";
    let liveUrl = o.liveUrl;
    if (!liveUrl && cfg.suggestGithubPagesDemo && username && !repo.archived) {
      liveUrl = suggestedPagesUrl(username, repo.name);
    }
    return {
      id: repo.id,
      name: repo.name,
      htmlUrl: repo.html_url,
      description: o.description ?? repo.description ?? "",
      stars: repo.stargazers_count,
      pushedAt: repo.pushed_at,
      archived: repo.archived,
      fork: repo.fork,
      liveUrl: liveUrl || null,
      tech: o.tech || null,
      featured: !!o.featured,
      hidden: !!o.hidden || hiddenRepoNames.has(repo.name),
    };
  }

  function sortRepos(a, b) {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    const ta = new Date(a.pushedAt || 0).getTime();
    const tb = new Date(b.pushedAt || 0).getTime();
    return tb - ta;
  }

  function showProjectsLoading() {
    const grid = $("projects-grid");
    if (!grid) return;
    grid.innerHTML =
      '<p class="section-lead projects-loading" role="status">Loading repositories…</p>';
  }

  function renderProjects(repos) {
    const grid = $("projects-grid");
    const errEl = $("projects-error");
    if (!grid) return;

    const list = repos.filter((r) => !r.hidden && !r.fork);
    list.sort(sortRepos);

    if (!list.length) {
      grid.innerHTML =
        '<p class="section-lead" style="margin:0">No public repositories to show.</p>';
      return;
    }

    grid.innerHTML = list.map((r) => projectCard(r)).join("");
  }

  async function loadReposFromStatic() {
    const errEl = $("projects-error");
    try {
      const res = await fetch("repos.json", { cache: "no-store" });
      if (!res.ok) return false;
      const data = await res.json();
      if (!Array.isArray(data)) return false;
      const merged = data.map(mergeRepo);
      renderProjects(merged);
      if (errEl) errEl.hidden = true;
      return true;
    } catch {
      return false;
    }
  }

  async function loadGithubRepos() {
    const errEl = $("projects-error");
    const username = (cfg.githubUsername || "").trim();
    if (!username) {
      if (errEl) {
        errEl.hidden = false;
        errEl.textContent = "Set githubUsername in config.js to load projects.";
      }
      return;
    }

    const api = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`;

    try {
      const res = await fetch(api, {
        headers: {
          Accept: "application/vnd.github+json",
        },
      });
      if (!res.ok) {
        const remaining = res.headers.get("x-ratelimit-remaining");
        const isRateLimited = res.status === 403 && remaining === "0";
        const msg = isRateLimited
          ? "GitHub API rate limit reached in the browser. Redeploy the site so repos.json is included, or try again later."
          : res.status === 404
            ? "That GitHub profile could not be found."
            : "Projects could not be loaded. Try again later.";
        throw new Error(msg);
      }
      const data = await res.json();
      const merged = data.map(mergeRepo);
      renderProjects(merged);
      if (errEl) errEl.hidden = true;
    } catch (e) {
      if (errEl) {
        errEl.hidden = false;
        errEl.textContent = e.message || "Failed to load repositories.";
      }
      const grid = $("projects-grid");
      if (grid && !grid.querySelector(".project-card")) {
        grid.innerHTML = "";
      }
    }
  }

  async function loadProjects() {
    showProjectsLoading();
    const errEl = $("projects-error");
    if (errEl) errEl.hidden = true;
    const fromStatic = await loadReposFromStatic();
    if (!fromStatic) await loadGithubRepos();
  }

  function initFooter() {
    const el = $("footer-built");
    if (el) {
      const y = new Date().getFullYear();
      const n = (cfg.name || "").trim();
      const avail = cfg.availability ? ` · ${cfg.availability}` : "";
      el.textContent = n ? `© ${y} ${n}${avail}` : `© ${y}`;
    }
  }

  /** Penner ease-out-back: slight overshoot then settle (clamped when applied to scroll). */
  function easeOutBack(t) {
    const c1 = 1.525;
    const c3 = c1 + 1;
    const x = t - 1;
    return 1 + c3 * x * x * x + c1 * x * x;
  }

  function maxScrollY() {
    const root = document.documentElement;
    return Math.max(0, root.scrollHeight - window.innerHeight);
  }

  function elasticScrollTo(targetY) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: targetY, behavior: "smooth" });
      return;
    }
    const start = window.scrollY;
    const maxS = maxScrollY();
    const end = Math.max(0, Math.min(maxS, targetY));
    const t0 = performance.now();
    const duration = 880;

    function step(now) {
      const t = Math.min(1, (now - t0) / duration);
      const e = easeOutBack(t);
      const y = start + (end - start) * e;
      window.scrollTo(0, Math.max(0, Math.min(maxS, y)));
      if (t < 1) requestAnimationFrame(step);
      else window.scrollTo(0, end);
    }
    requestAnimationFrame(step);
  }

  function initElasticNavScroll() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (href == null || !href.startsWith("#")) return;

      if (href === "#" || href === "#top") {
        e.preventDefault();
        elasticScrollTo(0);
        const path = window.location.pathname + window.location.search;
        history.replaceState(null, "", path);
        return;
      }

      const id = decodeURIComponent(href.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      const header = document.querySelector(".site-header");
      const off = header ? header.offsetHeight + 10 : 16;
      const top = el.getBoundingClientRect().top + window.scrollY - off;
      elasticScrollTo(top);
      history.pushState(null, "", href);
    });
  }

  function initOverscrollElastic() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const main = document.querySelector("main");
    if (!main) return;

    const maxPull = 76;
    const wheelGain = 0.085;
    const touchGain = 0.22;
    let pull = 0;
    let rafId = 0;

    function tick() {
      pull *= 0.86;
      if (Math.abs(pull) < 0.35) {
        pull = 0;
        main.style.transform = "";
        main.style.willChange = "auto";
        rafId = 0;
        return;
      }
      main.style.willChange = "transform";
      main.style.transform = `translate3d(0, ${pull}px, 0)`;
      rafId = requestAnimationFrame(tick);
    }

    function bumpPull(delta) {
      pull = Math.max(-maxPull, Math.min(maxPull, pull + delta));
      main.style.willChange = "transform";
      main.style.transform = `translate3d(0, ${pull}px, 0)`;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener(
      "wheel",
      (e) => {
        const root = document.documentElement;
        const atTop = window.scrollY <= 0;
        const atBottom =
          window.scrollY + window.innerHeight >= root.scrollHeight - 1;

        if (atTop && e.deltaY < 0) bumpPull(-e.deltaY * wheelGain);
        else if (atBottom && e.deltaY > 0) bumpPull(-e.deltaY * wheelGain);
      },
      { passive: true }
    );

    let touchLastY = 0;
    window.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length === 1) touchLastY = e.touches[0].clientY;
      },
      { passive: true }
    );

    window.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length !== 1) return;
        const root = document.documentElement;
        const y = e.touches[0].clientY;
        const dy = y - touchLastY;
        touchLastY = y;

        const atTop = window.scrollY <= 0;
        const atBottom =
          window.scrollY + window.innerHeight >= root.scrollHeight - 1;

        if (atTop && dy > 0) bumpPull(dy * touchGain);
        else if (atBottom && dy < 0) bumpPull(dy * touchGain);
      },
      { passive: true }
    );
  }

  initHero();
  initAbout();
  initExperience();
  initSkills();
  initFeatured();
  initContact();
  void initResume();
  initFooter();
  initElasticNavScroll();
  initOverscrollElastic();
  void loadProjects();
})();
