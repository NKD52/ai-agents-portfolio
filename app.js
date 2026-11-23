const grid = document.getElementById("project-grid");
const caseContent = document.getElementById("case-content");

if (grid) {
  grid.innerHTML = projects.map((project) => `
    <article class="project-card">
      <a class="card-link" href="project.html?id=${project.id}">
        <img src="assets/${project.images[0].file}" alt="" loading="lazy">
        <div class="card-text">
          <p class="kicker">${project.category}</p>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <span class="card-action">${project.video ? "Watch demo" : "View workflow"} <span aria-hidden="true">↗</span></span>
        </div>
      </a>
    </article>`).join("");
}

if (caseContent) {
  const id = new URLSearchParams(location.search).get("id");
  const project = projects.find((entry) => entry.id === id);

  if (project) {
    document.title = `${project.title} | Najmuddin Dawoodjee`;
    const media = project.video
      ? `<video controls playsinline preload="none" poster="assets/${project.images[0].file}" aria-label="${project.title} demo">
           <source src="assets/${project.video}" type="video/mp4">
           <a href="assets/${project.video}">Download the demo recording</a>
         </video>`
      : project.images.map(({ file, alt }) => `<a href="assets/${file}"><img src="assets/${file}" alt="${alt}"></a>`).join("");

    caseContent.innerHTML = `
      <header class="case-header">
        <p class="kicker">${project.category}</p>
        <h1>${project.title}</h1>
        <p class="intro">${project.summary}</p>
        <ul class="tools" aria-label="Tools">${project.stack.map((tool) => `<li>${tool}</li>`).join("")}</ul>
      </header>
      <figure class="case-media">${media}<figcaption>${project.caption}</figcaption></figure>
      <section class="case-flow">
        <h2>How it works</h2>
        <ol>${project.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
        <div class="actions">
          <a class="button primary" href="index.html#contact">Discuss a similar project</a>
          ${project.source ? `<a class="button" href="${project.source}">View project files on GitHub</a>` : ""}
        </div>
      </section>`;
  } else {
    caseContent.innerHTML = "<h1>Project unavailable</h1><p>See the current work using the link above.</p>";
  }
}
