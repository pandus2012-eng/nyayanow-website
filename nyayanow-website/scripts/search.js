// scripts/search.js

(async function initStudentsPage() {
  if (!document.getElementById("caseList")) return;

  const listEl = document.getElementById("caseList");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  let allCases = [];

  try {
    allCases = await window.nnLoadCases();
  } catch (err) {
    listEl.innerHTML =
      '<p class="nn-error">Unable to load cases. Check cases.json and try again.</p>';
    console.error(err);
    return;
  }

  function render(filtered) {
    if (!filtered.length) {
      listEl.innerHTML = '<p class="nn-text-soft">No cases match your search.</p>';
      return;
    }
    listEl.innerHTML = filtered
      .map(
        (c) => `
      <article class="nn-list-item">
        <div class="nn-list-item-title">
          <a href="case.html?id=${encodeURIComponent(c.id)}">${c.title_en}</a>
        </div>
        <div class="nn-list-item-meta">
          <span class="nn-chip">${c.year}</span>
          <span class="nn-chip">${c.category}</span>
          ${
            c.articles?.length
              ? `<span>Articles: ${c.articles.join(", ")}</span>`
              : ""
          }
        </div>
      </article>
    `
      )
      .join("");
  }

  function applyFilter() {
    const q = (searchInput.value || "").toLowerCase();
    const cat = categoryFilter.value;

    const filtered = allCases.filter((c) => {
      const hay =
        (c.title_en || "") +
        " " +
        (c.title_kn || "") +
        " " +
        (c.facts_en || "") +
        " " +
        (c.issues_en || "") +
        " " +
        (c.category || "") +
        " " +
        (c.articles || []).join(" ");
      const matchesQuery = !q || hay.toLowerCase().includes(q);
      const matchesCat = !cat || (c.category || "").startsWith(cat);
      return matchesQuery && matchesCat;
    });

    render(filtered);
  }

  searchInput.addEventListener("input", applyFilter);
  categoryFilter.addEventListener("change", applyFilter);

  render(allCases);
})();
