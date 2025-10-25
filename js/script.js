document.addEventListener("DOMContentLoaded", () => {
  console.log("Haloween Festival site loaded!");
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar  = document.querySelector(".sidebar");
  const header   = document.querySelector("header");

  // อัปเดตตัวแปรความสูง header (มีใช้ใน CSS เดิม)
  if (header){
    const setHeaderH = () => document.documentElement
      .style.setProperty('--header-h', header.offsetHeight + 'px');
    setHeaderH();
    window.addEventListener('resize', setHeaderH);
  }

  // เริ่มต้น: จอเล็กให้ซ่อน, จอใหญ่ให้แสดง
  if (sidebar){
    if (window.innerWidth <= 640){
      sidebar.classList.remove('hidden'); // โหมดมือถือใช้ .show แทน
    }else if (window.innerWidth < 992){
      sidebar.classList.add('hidden');    // แท็บเล็ตเล็กเริ่มซ่อนก็ได้
    }else{
      sidebar.classList.remove('hidden');
    }
  }

  const updateSidebarSpace = () => {
    if (window.innerWidth <= 640 && sidebar){
      const h = sidebar.classList.contains('show') ? sidebar.scrollHeight : 0;
      document.documentElement.style.setProperty('--sidebar-h', h + 'px');
    } else {
      document.documentElement.style.setProperty('--sidebar-h', '0px');
    }
  };
  
  // ปุ่ม ☰
  if (toggleBtn && sidebar){
    toggleBtn.addEventListener("click", () => {
      if (window.innerWidth <= 640){
        sidebar.classList.toggle("show");     // มือถือ: สไลด์ลง/ขึ้น
      }else{
        sidebar.classList.toggle("hidden");   // จอใหญ่: เลื่อนออกซ้าย/เข้า
      }
    });
  }

  window.addEventListener('resize', updateSidebarSpace);

});