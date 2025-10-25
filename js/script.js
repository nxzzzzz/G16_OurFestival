document.addEventListener("DOMContentLoaded", () => {
  console.log("Haloween Festival site loaded!");
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.querySelector(".sidebar");
  const header = document.querySelector("header");

  if (header){
    const setHeaderH = () =>
      document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
    setHeaderH();
    window.addEventListener('resize', setHeaderH);
  }

  if (sidebar && window.innerWidth < 992) sidebar.classList.add("hidden");

  if (toggleBtn && sidebar){
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });
  }
});