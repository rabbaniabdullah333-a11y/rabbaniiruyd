/**
 * ApexScale Commerce — Navigation & Menu Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileBackdrop = document.getElementById("mobileBackdrop");
  const mobileCloseBtn = document.getElementById("mobileCloseBtn");
  const navDropdowns = document.querySelectorAll(".nav-dropdown");

  // Mobile menu open / close
  function openMobileNav() {
    if (mobileNav && mobileBackdrop) {
      mobileNav.classList.add("open");
      mobileBackdrop.classList.add("open");
      document.body.style.overflow = "hidden";
      if (burgerBtn) burgerBtn.setAttribute("aria-expanded", "true");
    }
  }

  function closeMobileNav() {
    if (mobileNav && mobileBackdrop) {
      mobileNav.classList.remove("open");
      mobileBackdrop.classList.remove("open");
      document.body.style.overflow = "";
      if (burgerBtn) burgerBtn.setAttribute("aria-expanded", "false");
    }
  }

  if (burgerBtn) {
    burgerBtn.addEventListener("click", openMobileNav);
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener("click", closeMobileNav);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener("click", closeMobileNav);
  }

  // Keyboard accessibility (ESC closes mobile nav & dropdowns)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileNav();
      navDropdowns.forEach(dd => dd.classList.remove("open"));
    }
  });

  // Desktop dropdown toggle
  navDropdowns.forEach(dd => {
    const toggle = dd.querySelector(".nav-dropdown-toggle");
    if (toggle) {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = dd.classList.contains("open");
        navDropdowns.forEach(d => d.classList.remove("open"));
        if (!isOpen) {
          dd.classList.add("open");
          toggle.setAttribute("aria-expanded", "true");
        } else {
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  });

  // Click outside to close dropdowns
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-dropdown")) {
      navDropdowns.forEach(dd => {
        dd.classList.remove("open");
        const toggle = dd.querySelector(".nav-dropdown-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    }
  });

  // Highlight active link based on current path
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const allNavLinks = document.querySelectorAll(".nav-link, .mobile-nav-link, .dropdown-item, .mobile-sublink");

  allNavLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
      const parentDropdown = link.closest(".nav-dropdown");
      if (parentDropdown) {
        parentDropdown.classList.add("active");
        const toggle = parentDropdown.querySelector(".nav-dropdown-toggle");
        if (toggle) toggle.classList.add("active");
      }
    }
  });
});
