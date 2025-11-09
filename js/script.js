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

//Register Validation
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("registerForm");
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
