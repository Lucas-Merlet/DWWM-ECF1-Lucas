// Grab all tab buttons and all tab panels from infos.html
const tabBtns = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Reset all buttons and panels to inactive before activating the clicked one
    tabBtns.forEach((b) => b.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));

    btn.classList.add("active");
    // Matches the panel by ID convention: button's data-tab="acces" → panel "#panel-acces"
    document.getElementById("panel-" + btn.dataset.tab).classList.add("active");
  });
});
