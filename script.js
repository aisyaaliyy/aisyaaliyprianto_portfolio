const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll("#mobileMenu a");
const langBtn = document.getElementById("langBtn");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const fadeItems = document.querySelectorAll(".fade-in");

function openMenu() {
  mobileMenu.classList.add("open");
  document.body.classList.add("menu-open");
  menuBtn.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  mobileMenu.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn.addEventListener("click", function () {
  if (mobileMenu.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

mobileLinks.forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

const fadeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeItems.forEach(function (item) {
  fadeObserver.observe(item);
});

const sectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute("href") === "#" + entry.target.id;
      link.classList.toggle("active", isActive);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(function (section) {
  sectionObserver.observe(section);
});

document.getElementById("year").textContent = new Date().getFullYear();