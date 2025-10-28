document.addEventListener("DOMContentLoaded", () => {
  console.log("Haloween Festival site loaded!");
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar  = document.querySelector(".sidebar");
  const bodyEl   = document.body;

  // ฟังก์ชันเช็คสถานะแล้วตั้งค่า push ให้ content
  const syncPush = () => {
    const isMobile = window.innerWidth <= 640;
    // desktop: เปิดเมื่อ !hidden, mobile: เปิดเมื่อ .show
    const isOpen = isMobile
      ? sidebar.classList.contains("show")
      : !sidebar.classList.contains("hidden");
    bodyEl.classList.toggle("sidebar-open", isOpen); // <-- ตัวนี้ทำให้ content ถูกดัน
  };

  // ปุ่ม ☰
  toggleBtn?.addEventListener("click", () => {
    const isMobile = window.innerWidth <= 640;
    if (isMobile) {
      sidebar.classList.toggle("show");     // มือถือ slide ลง/ขึ้น
    } else {
      sidebar.classList.toggle("hidden");   // เดสก์ท็อป slide ออก/เข้า
    }
    syncPush(); // อัปเดตการดัน content ทุกครั้งที่กด
  });

  // ให้ sync ครั้งแรก + เวลารีไซซ์
  syncPush();
  window.addEventListener("resize", syncPush);
});