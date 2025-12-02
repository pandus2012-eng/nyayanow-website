// scripts/case.js

(function initCasePage() {
  const container = document.getElementById("caseDetail");
  if (!container) return;

  function getParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  }

  const id = getParam("id");
  if (!id) {
    container.innerHTML = "<p>Case ID missing in URL.</p>";
    return;
  }

  window.nnLoadCases()
    .then((cases) => {
      const c = cases.find((x) => x.id === id);
      if (!c) {
        container.innerHTML = "<p>Case not found.</p>";
        return;
      }

      container.innerHTML = `
        <header>
          <h1>${c.title_en}</h1>
          <p class="nn-case-subtitle">${c.year} • ${c.category || ""}</p>
          <div class="nn-case-tags">
            ${
              c.articles?.length
                ? `<span class="nn-pill">Articles: ${c.articles.join(", ")}</span>`
                : ""
            }
          </div>
        </header>

        <section class="nn-section">
          <h2>Facts (English)</h2>
          <p>${c.facts_en || "—"}</p>
        </section>
        <section class="nn-section">
          <h2>Facts (Kannada)</h2>
          <p>${c.facts_kn || "—"}</p>
        </section>

        <section class="nn-section">
          <h2>Issues (English)</h2>
          <p>${c.issues_en || "—"}</p>
        </section>
        <section class="nn-section">
          <h2>Issues (Kannada)</h2>
          <p>${c.issues_kn || "—"}</p>
        </section>

        <section class="nn-section">
          <h2>Judgment (English)</h2>
          <p>${c.judgment_en || "—"}</p>
        </section>
        <section class="nn-section">
          <h2>Judgment (Kannada)</h2>
          <p>${c.judgment_kn || "—"}</p>
        </section>

        <section class="nn-section">
          <h2>Ratio Decidendi (English)</h2>
          <p>${c.ratio_en || "—"}</p>
        </section>
        <section class="nn-section">
          <h2>Ratio (Kannada)</h2>
          <p>${c.ratio_kn || "—"}</p>
        </section>

        <section class="nn-section">
          <h2>Significance (English)</h2>
          <p>${c.significance_en || "—"}</p>
        </section>
        <section class="nn-section">
          <h2>Significance (Kannada)</h2>
          <p>${c.significance_kn || "—"}</p>
        </section>
      `;
    })
    .catch((err) => {
      console.error(err);
      container.innerHTML = "<p>Error loading case.</p>";
    });
})();
