let userData = {
  name: "Admin",
  email: "admin@gmail.com",
  password: "Syadam123!",
};

// helper
function showMessage(element, text, color = "red", inputs = []) {
  element.style.display = "block";
  element.style.color = color;
  element.innerText = text;
  inputs.forEach((input) => input.classList.add("is-invalid"));
}

function resetForm(messageEl, inputs = []) {
  messageEl.style.display = "none";
  messageEl.innerText = "";
  inputs.forEach((input) => input.classList.remove("is-invalid"));
}

// REGISTER
function registerUser(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const termsCheckbox = document.getElementById("terms");
  const messageEl = document.getElementById("errorMsg");

  if (
    !nameInput ||
    !emailInput ||
    !passwordInput ||
    !confirmPasswordInput ||
    !termsCheckbox ||
    !messageEl
  )
    return;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  resetForm(messageEl, [
    nameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
  ]);

  if (!name || !email || !password || !confirmPassword)
    return showMessage(messageEl, "Semua field wajib diisi!");

  if (email === userData.email)
    return showMessage(messageEl, "Email sudah terdaftar!", "red", [
      emailInput,
    ]);

  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}/.test(password))
    return showMessage(
      messageEl,
      "Password harus kombinasi huruf besar, kecil & angka!",
      "red",
      [passwordInput],
    );

  if (password !== confirmPassword)
    return showMessage(messageEl, "Password tidak sama!", "red", [
      passwordInput,
      confirmPasswordInput,
    ]);

  if (!termsCheckbox.checked)
    return showMessage(messageEl, "Harus menyetujui terms!");

  // simpan data
  userData = { name, email, password };

  showMessage(messageEl, "Registrasi berhasil! Redirect...", "green");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1200);
}

// LOGIN
function loginUser(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const messageEl = document.getElementById("errorMsg");

  if (!emailInput || !passwordInput || !messageEl) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  resetForm(messageEl, [emailInput, passwordInput]);

  if (!email || !password)
    return showMessage(messageEl, "Email dan password wajib diisi");

  if (email === userData.email && password === userData.password) {
    showMessage(messageEl, `Welcome ${userData.name} 👋`, "green");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    showMessage(messageEl, "Email atau password salah", "red", [
      emailInput,
      passwordInput,
    ]);
  }
}
