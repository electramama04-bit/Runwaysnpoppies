/* Shared front-end for Runways n Poppies. */

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function cardHtml(doc, withTags) {
  const tags = withTags
    ? [
        doc.grade ? `<span class="tag grade">${esc(doc.grade)}</span>` : "",
        ...doc.subjects.map((s) => `<span class="tag">${esc(s)}</span>`),
      ].join("")
    : "";

  const meta = withTags
    ? `${esc(doc.format.toUpperCase())} &middot; ${esc(doc.sizeLabel)} &middot; updated ${esc(doc.updated)}`
    : `${esc(doc.format.toUpperCase())} &middot; ${esc(doc.sizeLabel)}`;

  return `
    <article class="card">
      <h3>${esc(doc.title)}</h3>
      <p>${esc(doc.description)}</p>
      ${withTags ? `<div class="tags">${tags}</div>` : ""}
      <p class="meta">${meta}</p>
      <a class="btn" href="/download/${encodeURIComponent(doc.id)}">Download</a>
    </article>`;
}

/* ---------- Home page ---------- */

function renderFeatured() {
  const host = document.getElementById("featured");
  fetch("/api/documents")
    .then((r) => r.json())
    .then(({ documents }) => {
      const featured = documents.filter((d) => d.featured);
      host.innerHTML = featured.length
        ? featured.map((d) => cardHtml(d, false)).join("")
        : '<p class="status">Nothing featured yet.</p>';
    })
    .catch(() => {
      host.innerHTML = '<p class="status">Could not load the files. Please refresh.</p>';
    });
}

/* ---------- Downloads page ---------- */

function renderLibrary() {
  let all = [];
  let active = "All";
  const host = document.getElementById("library");
  const filterHost = document.getElementById("filters");

  fetch("/api/documents")
    .then((r) => r.json())
    .then(({ documents }) => {
      all = documents;
      const grades = [...new Set(all.map((d) => d.grade).filter(Boolean))];
      const options = ["All", ...grades];

      filterHost.innerHTML = options
        .map(
          (g) =>
            `<button type="button" data-g="${esc(g)}" aria-pressed="${g === active}">${esc(g)}</button>`,
        )
        .join("");

      filterHost.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        active = btn.dataset.g;
        filterHost.querySelectorAll("button").forEach((b) => {
          b.setAttribute("aria-pressed", String(b.dataset.g === active));
        });
        draw();
      });

      draw();
    })
    .catch(() => {
      host.innerHTML = '<p class="status">Could not load the library. Please refresh.</p>';
    });

  function draw() {
    const shown = all.filter((d) => active === "All" || d.grade === active);
    host.innerHTML = shown.length
      ? shown.map((d) => cardHtml(d, true)).join("")
      : '<p class="status">Nothing in this section yet.</p>';
  }
}

/* ---------- Links page ---------- */

function renderLinks() {
  const host = document.getElementById("links");
  fetch("/api/links")
    .then((r) => r.json())
    .then(({ links }) => {
      if (!links.length) {
        host.innerHTML = '<p class="status">No links yet.</p>';
        return;
      }
      const groups = {};
      for (const link of links) (groups[link.category] ||= []).push(link);

      host.innerHTML = Object.entries(groups)
        .map(
          ([category, items]) => `
            <h2>${esc(category)}</h2>
            <ul class="linklist">
              ${items
                .map(
                  (l) => `
                <li>
                  <a href="${esc(l.url)}" rel="noopener noreferrer" target="_blank">${esc(l.title)}</a>
                  <p>${esc(l.description)}</p>
                </li>`,
                )
                .join("")}
            </ul>`,
        )
        .join("");
    })
    .catch(() => {
      host.innerHTML = '<p class="status">Could not load the links. Please refresh.</p>';
    });
}
