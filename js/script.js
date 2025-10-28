document.addEventListener("DOMContentLoaded", () => {
  console.log("Haloween Festival site loaded!");
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar  = document.querySelector(".sidebar");
  const bodyEl   = document.body;

  const setSidebarHeightVar = () => {
    // ค่าความสูงจริงของ sidebar ตอนเปิด ใช้ดัน content ลง
    const h = sidebar.scrollHeight;
    bodyEl.style.setProperty("--sidebar-height", h + "px");
  };

  const openSidebar = () => {
    sidebar.classList.add("show");
    bodyEl.classList.add("sidebar-open");
    setSidebarHeightVar();
  };

  const closeSidebar = () => {
    sidebar.classList.remove("show");
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

  // อัปเดตความสูงเมื่อรีไซซ์ (โดยเฉพาะตอน tablet หมุนจอ)
  window.addEventListener("resize", () => {
    if (sidebar.classList.contains("show")) setSidebarHeightVar();
  });
});