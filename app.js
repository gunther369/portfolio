(function () {
  const cfg = window.PORTFOLIO_CONFIG || {};
  const overrides = cfg.projectOverrides || {};

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

  function initHero() {
    setText("hero-name", cfg.name || "Your Name");
    setText("hero-title", cfg.title || "");
    setText("hero-tagline", cfg.tagline || "");

    const social = $("hero-social");
    if (!social) return;

    const links = [];
    if (cfg.social?.github)
      links.push({ href: cfg.social.github, label: "GitHub" });
    if (cfg.social?.linkedin)
      links.push({ href: cfg.social.linkedin, label: "LinkedIn" });
    if (cfg.social?.email)
      links.push({
        href: `mailto:${cfg.social.email}`,
        label: "Email",
      });

    social.innerHTML = links
      .map(
        (l) =>
          `<a href="${escapeHtml(l.href)}" rel="noopener noreferrer" target="_blank">${escapeHtml(l.label)}</a>`
      )
      .join("");
  }

  function initResume() {
    const frame = $("resume-frame");
    const status = $("resume-status");
    const download = $("resume-download");
    if (!frame || !status) return;

    const pdfUrl = "resume.pdf";
    frame.src = pdfUrl;

    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        status.textContent =
          "If the preview is blank, open the PDF directly or check the file name is resume.pdf";
      }
    }, 2500);

    frame.addEventListener("load", () => {
      settled = true;
      clearTimeout(timer);
      status.textContent = "Preview loads from resume.pdf in this folder.";
    });

    frame.addEventListener("error", () => {
      settled = true;
      clearTimeout(timer);
      status.textContent =
        "Could not load resume.pdf — add your file or use Download once it exists.";
    });

    if (download) {
      download.addEventListener("click", (e) => {
        fetch(pdfUrl, { method: "HEAD" }).then((r) => {
          if (!r.ok) e.preventDefault();
        });
      });
    }
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
      language: repo.language,
      stars: repo.stargazers_count,
      pushedAt: repo.pushed_at,
      archived: repo.archived,
      fork: repo.fork,
      liveUrl: liveUrl || null,
      pagesIsGuess: !o.liveUrl && !!liveUrl,
      featured: !!o.featured,
      hidden: !!o.hidden,
    };
  }

  function sortRepos(a, b) {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    const ta = new Date(a.pushedAt || 0).getTime();
    const tb = new Date(b.pushedAt || 0).getTime();
    return tb - ta;
  }

  function renderProjects(repos) {
    const grid = $("projects-grid");
    const errEl = $("projects-error");
    if (!grid) return;

    const list = repos.filter((r) => !r.hidden && !r.fork);
    list.sort(sortRepos);

    if (!list.length) {
      grid.innerHTML =
        '<p class="section-lead" style="margin:0">No public repositories found for this username.</p>';
      return;
    }

    grid.innerHTML = list
      .map((r) => {
        const meta = [r.language, r.stars != null ? `★ ${r.stars}` : ""]
          .filter(Boolean)
          .join(" · ");
        const desc = escapeHtml(r.description || "No description.");
        const demoBtn = r.liveUrl
          ? `<button type="button" class="btn btn-primary btn-open-demo" data-demo-url="${escapeHtml(r.liveUrl)}">Open demo</button>${
              r.pagesIsGuess
                ? ` <span class="project-meta" title="URL follows GitHub Pages convention; override in config.js if different">(Pages?)</span>`
                : ""
            }`
          : `<button type="button" class="btn btn-ghost" disabled title="Set liveUrl in config.js for this repo">No demo URL</button>`;

        return `<article class="project-card${r.featured ? " featured" : ""}">
          <div class="project-top">
            <h3 class="project-name"><a href="${escapeHtml(r.htmlUrl)}" rel="noopener noreferrer" target="_blank">${escapeHtml(r.name)}</a></h3>
            <span class="project-meta">${escapeHtml(meta)}</span>
          </div>
          <p class="project-desc">${desc}</p>
          <div class="project-actions">
            <a class="btn btn-ghost" href="${escapeHtml(r.htmlUrl)}" rel="noopener noreferrer" target="_blank">Repository</a>
            ${demoBtn}
          </div>
        </article>`;
      })
      .join("");

    grid.querySelectorAll(".btn-open-demo").forEach((btn) => {
      btn.addEventListener("click", () => {
        const url = btn.getAttribute("data-demo-url");
        if (url) loadDemo(url);
      });
    });
  }

  function loadDemo(url) {
    const frame = $("demo-frame");
    const input = $("demo-url");
    if (!frame) return;
    try {
      const u = new URL(url);
      if (u.protocol !== "http:" && u.protocol !== "https:") return;
      frame.classList.remove("is-visible");
      frame.src = u.toString();
      if (input) input.value = u.toString();
    } catch {
      /* ignore */
    }
  }

  function initDemoPanel() {
    const input = $("demo-url");
    const loadBtn = $("demo-load");
    const frame = $("demo-frame");

    loadBtn?.addEventListener("click", () => {
      const raw = input?.value?.trim();
      if (raw) loadDemo(raw);
    });

    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const raw = input.value.trim();
        if (raw) loadDemo(raw);
      }
    });

    frame?.addEventListener("load", () => {
      try {
        const src = frame.getAttribute("src") || frame.src || "";
        if (src && !src.endsWith("about:blank") && frame.src !== "about:blank") {
          frame.classList.add("is-visible");
        }
      } catch {
        /* ignore */
      }
    });
  }

  async function loadGithubRepos() {
    const errEl = $("projects-error");
    const username = (cfg.githubUsername || "").trim();
    if (!username) {
      if (errEl) {
        errEl.hidden = false;
        errEl.textContent = "Set githubUsername in config.js to load repositories.";
      }
      return;
    }

    const api = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`;

    try {
      const res = await fetch(api, { headers: { Accept: "application/vnd.github+json" } });
      if (!res.ok) {
        const msg =
          res.status === 404
            ? `GitHub user “${username}” was not found.`
            : `GitHub API error (${res.status}). Try again later or check rate limits.`;
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
    }
  }

  function initFooter() {
    const el = $("footer-built");
    if (el) {
      el.textContent = `GitHub: ${cfg.githubUsername || "—"} · Built as static HTML`;
    }
  }

  initHero();
  initResume();
  initDemoPanel();
  initFooter();
  loadGithubRepos();
})();
