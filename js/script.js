// --- 1. โค้ดสำหรับ Hamburger Menu ---
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

// --- 2. โค้ดสำหรับค้างคาว ---
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if(!header) return;

  const bats = document.createElement('div');
  bats.className = 'bats';
  bats.setAttribute('aria-hidden','true');
  header.appendChild(bats);

  const N = 7;
  const src = 'https://em-content.zobj.net/source/animated-noto-color-emoji/356/bat_1f987.gif';
  for(let i=1;i<=N;i++){
    const img = document.createElement('img');
    img.className = `bat bat--${i} ${i%2? 'bat--ltr':'bat--rtl'}`;
    img.src = src; img.alt = '';
    bats.appendChild(img);
  }
});

// --- 3. โค้ดสำหรับ Register Validation ---
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("registerForm");
  // (เราจะตรวจสอบว่า form มีอยู่จริงหรือไม่ เพื่อไม่ให้ error ในหน้าอื่น)
  if (!form) return; 

  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  const statusSelect = document.getElementById("status");
  const age = document.getElementById("age");
  const telephone = document.getElementById("telephone");
  const email = document.getElementById("email");
  // Show Error
  function showError(input, message) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    let small = input.nextElementSibling;
    if (!small || small.tagName !== "SMALL") {
      small = input.parentElement.querySelector("small");
  }
    if (small && small.tagName === "SMALL") {
      small.className = "text-danger";
      small.textContent = message;
    }
  }
  // Show Success
  function showSuccess(input) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    const small = input.nextElementSibling;
    if (small && small.tagName === "SMALL") small.textContent = "";
  }
  // Get FieldName
  function getFieldName(input) {
    return input.id
      ? input.id.charAt(0).toUpperCase() + input.id.slice(1).replace("-", " ")
      : "";
  }
  // Validate Text
  function validateText(input) {
    const pattern = /^[A-Za-zก-๙]+$/;
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      return false;
    } else if (!pattern.test(input.value.trim())) {
      showError(input, "Only letters are allowed");
      return false;
    } else {
      showSuccess(input);
      return true;
    }
  }
  // Validate Gender
  function validateGender() {
    const checked = Array.from(genderInputs).some(r => r.checked);
    const parent = genderInputs[0].parentElement;
    const small = parent.querySelector("small");
    const input=genderInputs[0];
      if (!checked) {
        showError(input,"Please Select Gender");
        return false;
      } else {
        showSuccess(input);
        return true;
      }
    return checked;
  }
  // Validate Status
  function validateStatus(input) {
    if (input.value === "") {
      showError(input,"Please Select Status");
      return false;
    } else {
      showSuccess(input);
      return true;
    }
  }
  // Validate Age
  function validateAge(input) {
    const pattern = /^[0-9]{1,3}$/;
    if (input.value.trim() === "") {
      showError(input, "Age is required");
      return false;
    } else if (!pattern.test(input.value.trim())) {
      showError(input, "Only numbers allowed (max 3 digits)");
      return false;
    } else {
      showSuccess(input);
      return true;
    }
  }
  // Validate Telephone
  function validateTel(input) {
    const pattern = /^\d{10}$/;
    if (input.value.trim() === "") {
      showError(input, "Phone number is required");
      return false;
    } else if (!pattern.test(input.value.trim())) {
      showError(input, "Phone number must be 10 digits");
      return false;
    } else {
      showSuccess(input);
      return true;
    }
  }
  // Validate Email
  function validateEmail(input) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.value.trim() === "") {
      showError(input, "Email is required");
      return false;
    } else if (!pattern.test(input.value.trim())) {
      showError(input, "Invalid email");
      return false;
    } else {
      showSuccess(input);
      return true;
    }
  }
  // Real-time validation
  firstName.addEventListener("input", () => validateText(firstName));
  lastName.addEventListener("input", () => validateText(lastName));
  age.addEventListener("input", () => validateAge(age));
  telephone.addEventListener("input", () => validateTel(telephone));
  email.addEventListener("input", () => validateEmail(email));
  statusSelect.addEventListener("change", () => validateStatus(statusSelect));
  genderInputs.forEach(radio => radio.addEventListener("change", () => validateGender()));
  // Submit form
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const isFirst = validateText(firstName);
    const isLast = validateText(lastName);
    const isAge = validateAge(age);
    const isTel = validateTel(telephone);
    const isEmail = validateEmail(email);
    const isGender = validateGender();
    const isStatus = validateStatus(statusSelect);
    if (isFirst && isLast && isAge && isTel && isEmail && isGender && isStatus) {
      form.submit();
    }
  });
});

// --- 4. โค้ดสำหรับ Star Rating ---
document.addEventListener('DOMContentLoaded', () => {
  const starWrapper = document.querySelector('.star-rating');
  if (!starWrapper) return;

  const stars = Array.from(starWrapper.querySelectorAll('.star'));
  const ratingInput = document.getElementById('rating-value');
  const setRating = (rating) => {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.textContent = '★';
        star.classList.add('selected');
      } else {
        star.textContent = '☆';
        star.classList.remove('selected');
      }
    });
  };
  
  starWrapper.addEventListener('click', (e) => {
    const clickedStar = e.target.closest('.star');
    if (!clickedStar) return;

    const newRating = clickedStar.dataset.value; 
    const currentRating = ratingInput.value; 

    if (newRating === currentRating) {
      ratingInput.value = '0';
      setRating(0);
    } else {
      ratingInput.value = newRating;
      setRating(newRating);
    }
  });

  starWrapper.addEventListener('mouseover', (e) => {
    const hoverStar = e.target.closest('.star');
    if (!hoverStar) return;
    setRating(hoverStar.dataset.value);
  });

  starWrapper.addEventListener('mouseout', () => {
    setRating(ratingInput.value);
  });
});

// ... [Existing code for Hamburger Menu, Bats, and Form Validation] ...

// --- 5. โค้ดสำหรับ Card Hover Tilt Effect (ความสวยงาม) ---
document.addEventListener('DOMContentLoaded', () => {
    // เลือกการ์ดทั้งหมดที่ต้องการให้มีเอฟเฟกต์ (ในที่นี้คือ .card ทั้งหมด)
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        let rect = card.getBoundingClientRect(); 
        
        // Handler เมื่อเมาส์เคลื่อนที่
        const handleTilt = (e) => {
            // อัพเดทตำแหน่งของ Card เพื่อรองรับการเลื่อนหน้าจอ
            rect = card.getBoundingClientRect();
            
            // 1. หาตำแหน่งของเมาส์สัมพัทธ์กับจุดศูนย์กลางของการ์ด
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // 2. แปลงค่าตำแหน่งเป็นช่วง -1 ถึง 1 (จากศูนย์กลาง)
            const x = (mouseX - centerX) / (rect.width / 2);
            const y = (mouseY - centerY) / (rect.height / 2);

            // 3. คำนวณองศาการหมุน (สูงสุด 5 องศา)
            const tiltMax = 5;
            const rotateY = x * tiltMax;      // เอียงซ้าย/ขวา (แกน Y)
            const rotateX = y * tiltMax * -1; // เอียงขึ้น/ลง (แกน X, ต้องกลับทิศทาง)

            // 4. ใช้ CSS transform เพื่อเอียงการ์ด
            card.style.transform = `
                perspective(1000px)
                scale(1.01) 
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        };

        // Handler เมื่อเมาส์ออกจากการ์ด (คืนค่าปกติ)
        const handleReset = () => {
            card.style.transform = `
                perspective(1000px)
                scale(1)
                rotateX(0deg)
                rotateY(0deg)
            `;
        };

        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', handleReset);
    });
});