document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  // Form switcher
  loginBtn.addEventListener("click", () => {
    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  });

  signupBtn.addEventListener("click", () => {
    signupBtn.classList.add("active");
    loginBtn.classList.remove("active");
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  });

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Basic form validation
  const validateForm = (form) => {
    const inputs = form.querySelectorAll("input");
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });

    return isValid;
  };

  // Login form submission
  loginForm.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm(loginForm)) {
      // Here you would typically send the login data to your server
      alert("Login successful!");
    }
  });

  // Signup form submission
  signupForm.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm(signupForm)) {
      // Here you would typically send the signup data to your server
      alert("Sign up successful!");
    }
  });

  // Password confirmation check
  const signupPassword = document.getElementById("signupPassword");
  const signupConfirmPassword = document.getElementById(
    "signupConfirmPassword"
  );

  signupConfirmPassword.addEventListener("input", () => {
    if (signupPassword.value !== signupConfirmPassword.value) {
      signupConfirmPassword.setCustomValidity("Passwords don't match");
    } else {
      signupConfirmPassword.setCustomValidity("");
    }
  });

  // Theme functions
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  function toggleTheme() {
    const currentTheme = localStorage.getItem("theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  // Function to get the user's theme preference
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Set the initial theme
  setTheme(getPreferredTheme());

  // Listen for changes in the OS theme
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
    });

  // Add a theme toggle button
  const themeToggle = document.createElement("button");
  themeToggle.id = "theme-toggle";
  themeToggle.innerHTML = "🌓";
  themeToggle.setAttribute("aria-label", "Toggle theme");
  document.body.appendChild(themeToggle);

  themeToggle.addEventListener("click", toggleTheme);

  // Style the theme toggle button
  themeToggle.style.position = "fixed";
  themeToggle.style.bottom = "20px";
  themeToggle.style.right = "20px";
  themeToggle.style.fontSize = "24px";
  themeToggle.style.background = "none";
  themeToggle.style.border = "none";
  themeToggle.style.cursor = "pointer";
  themeToggle.style.zIndex = "1000";
  themeToggle.style.width = "40px";
  themeToggle.style.height = "40px";
  themeToggle.style.borderRadius = "50%";
  themeToggle.style.display = "flex";
  themeToggle.style.justifyContent = "center";
  themeToggle.style.alignItems = "center";
  themeToggle.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  themeToggle.style.transition = "background-color 0.3s ease";

  // Update theme toggle button style based on current theme
  function updateThemeToggleStyle() {
    const currentTheme = localStorage.getItem("theme") || "light";
    if (currentTheme === "dark") {
      themeToggle.style.backgroundColor = "#ffffff";
      themeToggle.style.color = "#121212";
    } else {
      themeToggle.style.backgroundColor = "#121212";
      themeToggle.style.color = "#ffffff";
    }
  }

  // Initial style update
  updateThemeToggleStyle();

  // Update style when theme changes
  themeToggle.addEventListener("click", () => {
    setTimeout(updateThemeToggleStyle, 0);
  });
});
