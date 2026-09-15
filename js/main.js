// Fram — main.js
// Shared logic for every page: the hamburger menu toggle and the
// newsletter signup form validation. Each function checks whether its
// relevant elements exist before doing anything, so this single file
// works safely across index.html, products.html, and contact.html.

/**
 * Makes the mobile hamburger menu open/close and keeps aria-expanded
 * in sync with the actual visibility of the nav, for screen readers.
 */
const initHamburgerMenu = () => {
  const btn = document.querySelector(".hamburger-btn");
  const nav = document.getElementById("main-nav");
  if (!btn || !nav) return;

  const closeMenu = () => {
    btn.setAttribute("aria-expanded", "false");
    nav.setAttribute("hidden", "");
  };

  const openMenu = () => {
    btn.setAttribute("aria-expanded", "true");
    nav.removeAttribute("hidden");
  };

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  // Lukk menyen automatisk når en lenke velges (kun relevant på mobil,
  // siden navigasjonen alltid er synlig på desktop uansett).
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 1024) closeMenu();
    });
  });
};

/**
 * Client-side validation for the newsletter signup form. Validates on
 * blur (so the person gets feedback while filling the form) and again
 * on submit (so nothing invalid can be "submitted", even without a
 * real backend to send it to).
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const showFieldError = (input, errorEl, message) => {
  input.setAttribute("aria-invalid", "true");
  errorEl.textContent = message;
};

const clearFieldError = (input, errorEl) => {
  input.removeAttribute("aria-invalid");
  errorEl.textContent = "";
};

const initNewsletterForm = () => {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  const nameInput = document.getElementById("newsletter-name");
  const nameError = document.getElementById("newsletter-name-error");
  const emailInput = document.getElementById("newsletter-email");
  const emailError = document.getElementById("newsletter-email-error");
  const successEl = document.getElementById("newsletter-success");

  const validateName = () => {
    if (!nameInput.value.trim()) {
      showFieldError(nameInput, nameError, "Please enter your first name.");
      return false;
    }
    clearFieldError(nameInput, nameError);
    return true;
  };

  const validateEmail = () => {
    const value = emailInput.value.trim();
    if (!value) {
      showFieldError(emailInput, emailError, "Please enter your e-mail address.");
      return false;
    }
    if (!EMAIL_PATTERN.test(value)) {
      showFieldError(emailInput, emailError, "Please enter a valid e-mail address.");
      return false;
    }
    clearFieldError(emailInput, emailError);
    return true;
  };

  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    successEl.textContent = "";

    const isNameValid = validateName();
    const isEmailValid = validateEmail();

    if (!isNameValid) {
      nameInput.focus();
      return;
    }
    if (!isEmailValid) {
      emailInput.focus();
      return;
    }

    // Ingen backend i dette prosjektet — vi bekrefter bare visuelt
    // at innsendingen "lyktes" og nullstiller skjemaet.
    successEl.textContent = `Thanks, ${nameInput.value.trim()}! You're signed up.`;
    form.reset();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  initNewsletterForm();
});