document.addEventListener("DOMContentLoaded", function () {
  // Hamburger Menu Toggle
  const hamburger = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Animate hamburger bars
    const bars = this.querySelectorAll(".bar");
    if (this.classList.contains("active")) {
      bars[0].style.transform = "translateY(9px) rotate(45deg)";
      bars[1].style.opacity = "0";
      bars[2].style.transform = "translateY(-8px) rotate(-45deg)";
    } else {
      bars.forEach((bar) => {
        bar.style.transform = "";
        bar.style.opacity = "";
      });
    }
  });

  // Close menu when clicking a link
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      // Reset hamburger bars
      const bars = hamburger.querySelectorAll(".bar");
      bars.forEach((bar) => {
        bar.style.transform = "";
        bar.style.opacity = "";
      });
    });
  });

  // Scroll Reveal Animation
  const animateElements = document.querySelectorAll(
    ".animate-from-left, .animate-from-right, .animate-from-bottom, .animate-from-top"
  );

  function checkScroll() {
    animateElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate");
      }
    });
  }

  // Initial check
  checkScroll();

  // Check on scroll
  window.addEventListener("scroll", checkScroll);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scroll down
      header.style.transform = "translateY(-100%)";
    } else if (currentScroll < lastScroll) {
      // Scroll up
      header.style.transform = "translateY(0)";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }

    lastScroll = currentScroll;
  });
});

// open privacy policy
document.getElementById("privacy").addEventListener("click", () => {
  document.querySelector(".policypage").classList.toggle("show");
});

// Theme toggle logic
const themeToggle = document.getElementById("themeToggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
function setTheme(mode) {
  if (mode === "night") {
    document.body.classList.add("night");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("night");
    themeToggle.textContent = "🌙";
  }
}
// Follow system theme
function followSystemTheme() {
  setTheme(prefersDark.matches ? "night" : "day");
}
// Initial theme
followSystemTheme();
// Listen for system theme changes
prefersDark.addEventListener("change", followSystemTheme);
// Manual toggle
themeToggle.addEventListener("click", () => {
  if (document.body.classList.contains("night")) {
    setTheme("day");
  } else {
    setTheme("night");
  }
});

const chatPage = document.querySelector("chat-page");
const chatButton = document.querySelector("chat-bot");

chatButton.addEventListener("click", () => {});
