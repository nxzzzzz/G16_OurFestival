document.addEventListener("DOMContentLoaded", () => {
  console.log("Haloween Festival site loaded!");
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.querySelector(".sidebar");
  const bodyEl = document.body;

  sidebar.classList.add("hidden");

  const setSidebarHeightVar = () => {
    const h = sidebar.scrollHeight;
    bodyEl.style.setProperty("--sidebar-height", h + "px");
  };

  const openSidebar = () => {
    sidebar.classList.add("show");
    sidebar.classList.remove("hidden");
    bodyEl.classList.add("sidebar-open");

    setTimeout(() => setSidebarHeightVar(), 50);
  };

  const closeSidebar = () => {
    sidebar.classList.remove("show");
    sidebar.classList.add("hidden");
    bodyEl.classList.remove("sidebar-open");
    bodyEl.style.setProperty("--sidebar-height", "0px");
  };

  toggleBtn?.addEventListener("click", () => {
    if (sidebar.classList.contains("show")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  window.addEventListener("resize", () => {
    if (sidebar.classList.contains("show")) setSidebarHeightVar();
  });
});