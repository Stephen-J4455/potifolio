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

const chatPage = document.querySelector(".chat-page");
const chatButton = document.querySelector(".chat-bot");

chatButton.addEventListener("click", () => {
  chatPage.classList.remove("hidden");
});

document.getElementById("closeChat").addEventListener("click", () => {
  chatPage.classList.add("hidden");
});
// python request

async function typeBotResponse(text, container) {
  container.innerHTML = ""; // Clear previous content
  const words = text.split(" ");
  for (let i = 0; i < words.length; i++) {
    container.innerHTML += (i > 0 ? " " : "") + words[i];
    container.scrollTop = container.scrollHeight;
    await new Promise((res) => setTimeout(res, 80)); // Adjust speed here (ms per word)
  }
}

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;

  // Display user message
  chatMessages.innerHTML += `<div class="chat-msg user">${userMsg}</div>`;
  chatInput.value = "";

  // Show AI typing placeholder
  const typingDiv = document.createElement("div");
  typingDiv.className = "chat-msg bot ai-typing";
  typingDiv.textContent = "Stephen is typing...";
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Send to backend
  const res = await fetch("https://steve-t3ab.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMsg }),
  });
  const data = await res.json();

chatMessages.removeChild(typingDiv);

// Create bot message container with avatar
const botMsgCtn = document.createElement("div");
botMsgCtn.className = "botMsgCtn";

const botImg = document.createElement("img");
botImg.id = "botId";
botImg.src = "assests/stj.jpg";
botImg.alt = "";

const botDiv = document.createElement("div");
botDiv.className = "chat-msg bot";

botMsgCtn.appendChild(botImg);
botMsgCtn.appendChild(botDiv);
chatMessages.appendChild(botMsgCtn);

// Typing effect
await typeBotResponse(data.response, botDiv);

chatMessages.scrollTop = chatMessages.scrollHeight;
});

const chatSuggestions = document.getElementById("chatSuggestions");
chatSuggestions.addEventListener("change", function () {
  if (this.value) {
    chatInput.value = this.value;
    chatInput.focus();
    this.selectedIndex = 0; // Reset dropdown to placeholder
  }
});
