document.addEventListener("DOMContentLoaded", () => {
  console.log("Halloween Festival site loaded!");

  const toggleBtn = document.getElementById("toggleSidebar");
  const bodyEl = document.body;

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      bodyEl.classList.toggle("sidebar-open");
    });
  }
});