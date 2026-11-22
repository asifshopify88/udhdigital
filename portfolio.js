// UDH Digital portfolio content
// Portfolio projects are listed below.
// Upload project screenshots to the repository root and use the exact filename.

const portfolioProjects = [
  {
    "id": "shopify-02",
    "category": "shopify",
    "categoryLabel": "Shopify Store Development",
    "title": "Skinatona – Shopify Store",
    "description": "Shopify store design and development project for Skinatona.",
    "image": "skinatona-portfolio.png",
    "imageAlt": "Skinatona Shopify store screenshot",
    "url": "https://skinatona.com/",
    "review": "UDH Digital was a joy to work with. They understood the assignment and delivered exactly what I needed. They were proactive and made valuable suggestions throughout the project. I highly recommend them."
  },  {
    "id": "shopify-01",
    "category": "shopify",
    "categoryLabel": "Shopify Store Development",
    "title": "Luxury Guilt – Shopify Store",
    "description": "Designed and developed a polished Shopify fashion storefront with collection-focused navigation and a responsive shopping experience.",
    "image": "luxuryguilt-portfolio.png",
    "imageAlt": "Luxury Guilt Shopify store homepage screenshot",
    "url": "https://luxuryguilt.com/",
    "review": "I had a great experience working with UDH Digital. They did an excellent job on my project. They are very professional, delivered the work on time, and the quality was outstanding. I highly recommend them to anyone looking for reliable and professional service. Thank you, UDH Digital!"
  },

];

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  if (navbar && menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
      menuToggle.textContent = isOpen ? "×" : "☰";
    });
    navbar.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navbar.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open Menu");
      menuToggle.textContent = "☰";
    }));
  }

  const grid = document.getElementById("projectGrid");
  const search = document.getElementById("projectSearch");
  const emptyState = document.getElementById("emptyState");
  const filterButtons = [...document.querySelectorAll(".filter-btn")];
  let activeFilter = "all";

  const icons = { shopify: "fa-brands fa-shopify", web: "fa-solid fa-laptop-code", seo: "fa-solid fa-chart-line" };
  const visualLabels = { shopify: "SHOPIFY PROJECT", web: "WEB DEVELOPMENT PROJECT", seo: "SEO PROJECT" };

  const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  function renderProjects() {
    const term = search.value.trim().toLowerCase();
    const filtered = portfolioProjects.filter(project => {
      // Show only real projects; hide empty sample placeholders.
      const hasRealContent = Boolean(project.image || project.url || project.review);
      const matchesCategory = activeFilter === "all" || project.category === activeFilter;
      const searchable = [project.title, project.categoryLabel, project.description].join(" ").toLowerCase();
      return hasRealContent && matchesCategory && searchable.includes(term);
    });

    grid.innerHTML = filtered.map(project => {
      const imageMarkup = project.image
        ? `<img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.imageAlt || project.title)}" loading="lazy" onerror="this.remove();">`
        : "";
      const linkMarkup = project.url
        ? `<a class="project-link" href="${escapeHTML(project.url)}" target="_blank" rel="noopener noreferrer">View Project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`
        : "";

      return `
        <article class="project-card">
          <div class="project-visual ${escapeHTML(project.category)}">
            ${imageMarkup}
            <div class="project-placeholder">
              <i class="${icons[project.category]}"></i>
              <span>${visualLabels[project.category]}</span>
            </div>
          </div>
          <div class="project-body">
            <span class="project-category">${escapeHTML(project.categoryLabel)}</span>
            <h3>${escapeHTML(project.title)}</h3>
            <p>${escapeHTML(project.description)}</p>
            <div class="project-actions">${linkMarkup}</div>
            ${project.review ? `<div class="project-review"><div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div><p>“${escapeHTML(project.review)}”</p><span>— Client Review</span></div>` : ""}
          </div>
        </article>`;
    }).join("");

    grid.querySelectorAll(".project-visual img").forEach(image => {
      image.addEventListener("load", () => {
        const placeholder = image.parentElement.querySelector(".project-placeholder");
        if (placeholder) placeholder.hidden = true;
      });
    });
    emptyState.hidden = filtered.length !== 0;
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach(item => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      renderProjects();
    });
  });

  search.addEventListener("input", renderProjects);
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();
  renderProjects();
});
