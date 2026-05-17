/* ================================================================
   PORTFOLIO — CONTACT FORM
   File:    js/contact-form.js
   Purpose: Handles client-side validation and mock submission
            for the contact form.
================================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
  
  /* ── Constants ──────────────────────────────────────────── */
  const MOCK_API_DELAY_MS = 1000;
  const TOAST_DURATION_MS = 5000;

  /* ── Element references ─────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  const contactSubmitBtn = document.getElementById('contact-submit');
  const successMessage = document.getElementById('form-success-msg');

  if (!contactForm) return;

  const formInputs = contactForm.querySelectorAll('.form-input');

  /* ── Utilities ──────────────────────────────────────────── */
  
  /**
   * Validates an email address using a standard regex.
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /**
   * Shows an error message for a specific input field.
   * @param {HTMLElement} input
   * @param {string} message
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
   * @param {HTMLElement} input
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

  /* ── Event Listeners ────────────────────────────────────── */

  /* Clear error on input focus */
  formInputs.forEach(function(input) {
    input.addEventListener('input', function() {
      clearError(input);
    });
  });

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual form submission
    
    let isFormValid = true;
    
    // 1. Retrieve inputs
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
        
        // Hide success message after specified duration
        setTimeout(function() {
          successMessage.classList.remove('is-visible');
        }, TOAST_DURATION_MS);

      }, MOCK_API_DELAY_MS);
    }
  });

});
