(function () {
  "use strict";

  // Mobile navigation toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navMobile = document.querySelector(".nav-mobile");

  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      const isOpen = navMobile.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMobile.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // Contact form handling
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.querySelector(".form-success");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = contactForm.querySelector('[name="name"]');
      const phone = contactForm.querySelector('[name="phone"]');
      const email = contactForm.querySelector('[name="email"]');
      const message = contactForm.querySelector('[name="message"]');

      if (!name.value.trim() || !phone.value.trim() || !message.value.trim()) {
        alert("Please fill in all required fields.");
        return;
      }

      if (formSuccess) {
        formSuccess.classList.add("show");
        formSuccess.textContent =
          "Thank you, " +
          name.value.trim() +
          "! We'll call you back within 30 minutes during business hours.";
      }

      contactForm.reset();

      setTimeout(function () {
        if (formSuccess) formSuccess.classList.remove("show");
      }, 8000);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
