// Users storage
let users = JSON.parse(localStorage.getItem("users")) || [];

// DOM Elements
const authModal = document.getElementById("authModal");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const closeModal = document.getElementById("closeModal");

// Open modal on clicking Get Started or Login buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    authModal.style.display = "block";
    showLogin();
  });
});

// Close modal
closeModal.addEventListener("click", () => {
  authModal.style.display = "none";
});

// Switch forms
loginBtn.addEventListener("click", showLogin);
registerBtn.addEventListener("click", showRegister);

function showLogin() {
  loginBtn.classList.add("active");
  registerBtn.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
}

function showRegister() {
  loginBtn.classList.remove("active");
  registerBtn.classList.add("active");
  loginForm.classList.remove("active");
  registerForm.classList.add("active");
}

// Register form submission
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  if (!email || !password) return alert("Please fill all fields.");

  const exists = users.some((user) => user.email === email);
  if (exists) return alert("User already exists. Please login.");

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful! You can now login.");
  registerForm.reset();
  showLogin();
});

// Login form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  if (!email || !password) return alert("Please fill all fields.");

  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    alert(`Login successful! Welcome ${email}`);
    authModal.style.display = "none";
    loginForm.reset();
  } else {
    alert("Invalid email or password.");
  }
});

// Close modal if clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === authModal) authModal.style.display = "none";
});
