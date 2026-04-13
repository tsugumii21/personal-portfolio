/* ================================================================
   PORTFOLIO — MAIN SCRIPT
   File:    js/main.js
   Purpose: Core site-wide JavaScript behaviour.
            Responsibilities:
              • Navbar scroll listener (.navbar--scrolled class)
              • Mobile hamburger menu toggle
              • Close mobile menu on link click or backdrop click
              • Intersection Observer for section entrance animations
                (.reveal → .visible)
              • Active nav link highlighting on scroll
   Dependencies: None (vanilla JS only)
   Load order:   Third (after config.js and chatbot.js)
================================================================ */

'use strict';

/* ================================================================
   DOM ELEMENT REFERENCES
   Cache all queried elements once at module level to avoid
   repeated DOM lookups throughout the script.
================================================================ */

/** @type {HTMLElement} The fixed top navbar header element */
const navbar = document.getElementById('navbar');

/** @type {HTMLButtonElement} The hamburger toggle button */
const navToggle = document.getElementById('nav-toggle');

/** @type {HTMLUListElement} The nav links list (mobile dropdown target) */
const navLinks = document.getElementById('nav-links');

/** @type {HTMLDivElement} The semi-transparent backdrop behind the mobile menu */
const navBackdrop = document.getElementById('nav-backdrop');

/** @type {NodeList} All individual nav link anchors (for active state + close-on-click) */
const allNavLinks = document.querySelectorAll('[data-nav-link]');

/** @type {NodeList} All elements that should animate in on scroll (.reveal = fade up, .reveal-left = slide from left) */
const revealElements = document.querySelectorAll('.reveal, .reveal-left');


/* ================================================================
   CONSTANTS
================================================================ */

/** Scroll depth in pixels at which the navbar gains its scrolled style */
const NAV_SCROLL_THRESHOLD = 20;

/** CSS classes managed by this script */
const CSS = {
  navScrolled: 'navbar--scrolled',
  navOpen:     'nav-open',
  navActive:   'nav-link--active',
  visible:     'visible',
};


/* ================================================================
   1. NAVBAR SCROLL LISTENER
      Adds .navbar--scrolled to <header> when the page is scrolled
      past NAV_SCROLL_THRESHOLD. This switches the navbar from
      transparent to a white background with a border and shadow
      (styles defined in css/style.css section 9a).
================================================================ */

/**
 * Updates the navbar appearance based on the current scroll position.
 * Called on 'scroll' event and once on page load to handle
 * direct-to-anchor page loads.
 */
function handleNavbarScroll() {
  if (window.scrollY > NAV_SCROLL_THRESHOLD) {
    navbar.classList.add(CSS.navScrolled);
  } else {
    navbar.classList.remove(CSS.navScrolled);
  }
}

/* Attach the scroll listener with passive: true for performance */
window.addEventListener('scroll', handleNavbarScroll, { passive: true });

/* Run once immediately so the correct state is set on page load */
handleNavbarScroll();


/* ================================================================
   2. HAMBURGER MENU TOGGLE
      Opens and closes the mobile navigation dropdown.
      State is tracked via:
        • aria-expanded on the toggle button (accessibility)
        • .nav-open class on <body> (CSS hooks for dropdown + backdrop)
================================================================ */

/**
 * Opens the mobile navigation menu.
 * Sets the correct ARIA state and prevents body scroll.
 */
function openMobileNav() {
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.classList.add(CSS.navOpen);
}

/**
 * Closes the mobile navigation menu.
 * Restores ARIA state and re-enables body scroll.
 */
function closeMobileNav() {
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove(CSS.navOpen);
}

/**
 * Toggles the mobile menu open/closed based on current state.
 */
function toggleMobileNav() {
  const isCurrentlyOpen = navToggle.getAttribute('aria-expanded') === 'true';
  if (isCurrentlyOpen) {
    closeMobileNav();
  } else {
    openMobileNav();
  }
}

/* Hamburger button click → toggle menu */
navToggle.addEventListener('click', toggleMobileNav);


/* ================================================================
   3. CLOSE MOBILE MENU — ON LINK CLICK
      When any nav link is tapped on mobile, close the dropdown
      immediately so the page scrolls to the target section cleanly.
================================================================ */

allNavLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    closeMobileNav();
  });
});


/* ================================================================
   4. CLOSE MOBILE MENU — ON BACKDROP CLICK
      Tapping the semi-transparent overlay behind the menu dismisses
      it without requiring the user to find the hamburger button.
================================================================ */

navBackdrop.addEventListener('click', closeMobileNav);


/* ================================================================
   5. CLOSE MOBILE MENU — ON ESCAPE KEY
      Keyboard accessibility: pressing Escape while the menu is
      open closes it and returns focus to the toggle button.
================================================================ */

document.addEventListener('keydown', function(event) {
  const isMenuOpen = navToggle.getAttribute('aria-expanded') === 'true';
  if (event.key === 'Escape' && isMenuOpen) {
    closeMobileNav();
    navToggle.focus(); /* Return focus to toggle for keyboard users */
  }
});


/* ================================================================
   6. CLOSE MOBILE MENU — ON RESIZE TO DESKTOP
      If the user resizes the browser from mobile to desktop width
      while the menu is open, reset the menu state to avoid a
      stuck open state on larger viewports.
================================================================ */

const DESKTOP_BREAKPOINT = 768; /* Must match CSS media query */

window.addEventListener('resize', function() {
  if (window.innerWidth >= DESKTOP_BREAKPOINT) {
    closeMobileNav();
  }
});


/* ================================================================
   7. ACTIVE NAV LINK HIGHLIGHTING
      Uses IntersectionObserver to detect which section is currently
      in view and highlights the corresponding nav link with the
      .nav-link--active class.
================================================================ */

/**
 * Updates the active nav link to match the currently visible section.
 * @param {string} activeSectionId - The id of the section in view.
 */
function setActiveNavLink(activeSectionId) {
  allNavLinks.forEach(function(link) {
    const href = link.getAttribute('href');

    /* Match the link whose href corresponds to the visible section */
    if (href === '#' + activeSectionId) {
      link.classList.add(CSS.navActive);
    } else {
      link.classList.remove(CSS.navActive);
    }
  });
}

/* Observe all sections that have a matching nav link */
const sectionIds = ['hero', 'about', 'skills', 'certifications', 'experience', 'projects', 'contact'];
const sections = sectionIds
  .map(function(id) { return document.getElementById(id); })
  .filter(Boolean); /* Remove any nulls if a section hasn't been built yet */

const sectionObserver = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      /* Only update active state when a section enters the viewport */
      if (entry.isIntersecting) {
        setActiveNavLink(entry.target.id);
      }
    });
  },
  {
    /* Trigger when the section occupies > 30% of the viewport */
    threshold: 0.3,

    /* Shrink the top boundary by nav height so the active link
       switches at the right time as the user scrolls down */
    rootMargin: '-' + NAV_SCROLL_THRESHOLD + 'px 0px 0px 0px',
  }
);

sections.forEach(function(section) {
  sectionObserver.observe(section);
});


/* ================================================================
   8. ENTRANCE ANIMATIONS — INTERSECTION OBSERVER
      Watches all .reveal elements. When they enter the viewport,
      the .visible class is added which triggers the CSS
      opacity + translateY transition defined in style.css section 5.
      Once visible, the element is unobserved to free up resources.
================================================================ */

const revealObserver = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add(CSS.visible);

        /* Stop watching this element — animation plays once only */
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    /* Start animating when 10% of the element is visible */
    threshold: 0.1,

    /* Give a small top offset so elements don't trigger
       while still completely hidden below the fold */
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach(function(element) {
  revealObserver.observe(element);
});


/* ================================================================
   9. CONTACT FORM VALIDATION
      Client-side validation for the contact form.
      Checks required fields and email formatting.
      Mocks a submission via console.log since there's no backend.
================================================================ */

const contactForm = document.getElementById('contact-form');
const contactSubmitBtn = document.getElementById('contact-submit');
const successMessage = document.getElementById('form-success-msg');

if (contactForm) {
  
  /**
   * Validates an email address using a standard regex.
   */
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /**
   * Shows an error message for a specific input field.
   */
  function showError(input, message) {
    const errorSpan = document.getElementById('error-' + input.name);
    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.classList.add('is-visible');
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
    }
  }

  /**
   * Clears any error message for a specific input field.
   */
  function clearError(input) {
    const errorSpan = document.getElementById('error-' + input.name);
    if (errorSpan) {
      errorSpan.textContent = '';
      errorSpan.classList.remove('is-visible');
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
    }
  }

  /* Clear error on input focus */
  const formInputs = contactForm.querySelectorAll('.form-input');
  formInputs.forEach(function(input) {
    input.addEventListener('input', function() {
      clearError(input);
    });
  });

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual form submission
    
    let isFormValid = true;
    
    // 1. Validate variables
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    // Reset all errors first
    formInputs.forEach(clearError);

    // 2. Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your name.');
      isFormValid = false;
    }

    // 3. Validate Email
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Please enter your email address.');
      isFormValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address.');
      isFormValid = false;
    }

    // 4. Validate Subject
    if (!subjectInput.value.trim()) {
      showError(subjectInput, 'Please enter a subject.');
      isFormValid = false;
    }

    // 5. Validate Message
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Please enter your message.');
      isFormValid = false;
    }

    // 6. Submit handling (Mock)
    if (isFormValid) {
      // Show loading state
      contactSubmitBtn.classList.add('is-loading');
      contactSubmitBtn.textContent = 'Sending...';
      
      // Simulate network request (e.g., to Formspree)
      setTimeout(function() {
        console.log('Form submission successful:', {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: subjectInput.value.trim(),
          message: messageInput.value.trim()
        });

        // Reset form
        contactForm.reset();
        
        // Restore button state
        contactSubmitBtn.classList.remove('is-loading');
        contactSubmitBtn.innerHTML = `
          Send Message
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        `;

        // Show success message
        successMessage.classList.add('is-visible');
        
        // Hide success message after 5 seconds
        setTimeout(function() {
          successMessage.classList.remove('is-visible');
        }, 5000);

      }, 1000); // 1-second mock delay
    }
  });
}


/* ================================================================
   10. FOOTER DYNAMIC YEAR
       Sets the current year in the footer copyright string.
================================================================ */

const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}


/* ================================================================
   11. SCROLL-TO-TOP BUTTON
       Shows the button when scrolled down > 300px.
       Scrolls back to top smoothly when clicked.
================================================================ */

const scrollTopBtn = document.getElementById('scroll-top-btn');

if (scrollTopBtn) {
  // Toggle visibility on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('is-visible');
    } else {
      scrollTopBtn.classList.remove('is-visible');
    }
  });

  // Smooth scroll to top on click
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top:      0,
      behavior: 'smooth'
    });
  });
}

/* ================================================================
   12. DARK MODE TOGGLE
       Handles user preference and localStorage saving.
================================================================ */

const themeToggle = document.getElementById('theme-toggle');
const themeIconMoon = document.getElementById('theme-icon-moon');
const themeIconSun = document.getElementById('theme-icon-sun');

// Initialize Theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.documentElement.classList.add('dark');
  if (themeIconMoon) themeIconMoon.style.display = 'none';
  if (themeIconSun) themeIconSun.style.display = 'block';
}

if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    document.documentElement.classList.toggle('dark');
    
    // Check what the current mode is
    if (document.documentElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
      if (themeIconMoon) themeIconMoon.style.display = 'none';
      if (themeIconSun) themeIconSun.style.display = 'block';
    } else {
      localStorage.setItem('theme', 'light');
      if (themeIconMoon) themeIconMoon.style.display = 'block';
      if (themeIconSun) themeIconSun.style.display = 'none';
    }
  });
}
