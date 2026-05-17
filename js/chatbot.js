/* ================================================================
   PORTFOLIO — CHATBOT SCRIPT
   File:    js/chatbot.js
   Purpose:
     Part 1 — Page-section chatbot (#chat-messages, #chat-input …)
     Part 2 — Floating Gemini widget (#gemini-panel, #gemini-fab …)
   Dependencies: 
     - config.js (must load first — exposes GEMINI_API_KEY)
     - gemini-service.js (must load before this file)
================================================================ */

'use strict';

/* ================================================================
   PART 1 — PAGE-SECTION CHATBOT
   Powers the full-width chatbot section embedded in the page.
================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Element references ──────────────────────────────────── */
  const chatMessages    = document.getElementById('chat-messages');
  const chatInput       = document.getElementById('chat-input');
  const chatSendBtn     = document.getElementById('chat-send-btn');
  const typingIndicator = document.getElementById('typing-indicator');

  /* Guard: only run if the section chatbot elements exist */
  if (!chatMessages || !chatInput || !chatSendBtn) return;

  /* ── API setup ──────────────────────────────────────────── */
  const API_KEY = typeof GEMINI_API_KEY !== 'undefined' ? GEMINI_API_KEY : '';
  
  const SYSTEM_PROMPT = `
You are a helpful assistant representing Allen Del Valle, a Bachelor of Science in
Information Technology (BSIT) student at Bicol University.
Answer questions about their background, skills, projects, and availability.
Be friendly, concise, and professional.
If asked something you don't know, say you're not sure but they can reach out via the contact form.
Do not use markdown formatting blocks for simple text.
  `.trim();

  /* Initialize GeminiService */
  const gemini = window.GeminiService ? 
    new window.GeminiService(API_KEY, SYSTEM_PROMPT, 'Understood. I will act as the virtual assistant and answer questions concisely and professionally.') : 
    null;

  /* ── Utilities ──────────────────────────────────────────── */
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;')
      .replace(/'/g,  '&#039;');
  }

  function addMessageToUI(sender, text) {
    const wrapper = document.createElement('div');

    if (sender === 'user') {
      wrapper.className = 'chat-bubble user-message';
      wrapper.innerHTML = `<div class="bubble-content"><p>${escapeHTML(text)}</p></div>`;
    } else {
      wrapper.className = 'chat-bubble bot-message';
      wrapper.innerHTML = `
        <div class="bot-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 8V4H8"/>
            <rect width="16" height="12" x="4" y="8" rx="2"/>
            <path d="M2 14h2"/><path d="M20 14h2"/>
            <path d="M15 13v2"/><path d="M9 13v2"/>
          </svg>
        </div>
        <div class="bubble-content"><p>${escapeHTML(text)}</p></div>`;
    }

    chatMessages.insertBefore(wrapper, typingIndicator);
    scrollToBottom();
  }

  /* ── Send handler ───────────────────────────────────────── */
  async function handleSendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    if (!gemini) {
      addMessageToUI('bot', 'GeminiService is missing. Please check script imports.');
      return;
    }

    chatInput.value   = '';
    chatInput.disabled    = true;
    chatSendBtn.disabled  = true;

    addMessageToUI('user', message);
    typingIndicator.classList.add('is-typing');
    scrollToBottom();

    try {
      const reply = await gemini.sendMessage(message);
      typingIndicator.classList.remove('is-typing');
      addMessageToUI('bot', reply);
    } catch (error) {
      console.error('Section chatbot error:', error);
      typingIndicator.classList.remove('is-typing');
      
      if (error.code === 'MISSING_API_KEY') {
        addMessageToUI('bot', 'API key not configured. Please add your Gemini API key to config.js.');
      } else {
        addMessageToUI('bot', 'Sorry, I had trouble connecting. Please try again.');
      }
    } finally {
      chatInput.disabled   = false;
      chatSendBtn.disabled = false;
      chatInput.focus();
    }
  }

  /* ── Event listeners ────────────────────────────────────── */
  chatSendBtn.addEventListener('click', handleSendMessage);

  chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); handleSendMessage(); }
  });

});


/* ================================================================
   PART 2 — FLOATING GEMINI WIDGET
   Powers the fixed FAB + slide-up chat panel (#gemini-*).
   Maintains its own separate conversation history via GeminiService.
================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Element references ──────────────────────────────────── */
  const fab      = document.getElementById('gemini-fab');
  const panel    = document.getElementById('gemini-panel');
  const closeBtn = document.getElementById('gemini-close');
  const messages = document.getElementById('gemini-messages');
  const input    = document.getElementById('gemini-input');
  const sendBtn  = document.getElementById('gemini-send');
  const typing   = document.getElementById('gemini-typing');
  const badge    = document.getElementById('gemini-fab-badge');

  /* Guard: widget HTML must exist */
  if (!fab || !panel || !messages || !input || !sendBtn) return;

  /* ── API setup ──────────────────────────────────────────── */
  const API_KEY = typeof GEMINI_API_KEY !== 'undefined' ? GEMINI_API_KEY : '';
  const SYSTEM_PROMPT = `You are a helpful AI assistant for Allen Del Valle, a Bachelor of Science in Information Technology (BSIT) student at Bicol University. Answer questions about their skills, projects, and background. Be friendly, concise, and professional. Do not use markdown formatting.`;

  /* Initialize GeminiService */
  const gemini = window.GeminiService ? 
    new window.GeminiService(API_KEY, SYSTEM_PROMPT, 'Understood. I\'m ready to help answer questions.') : 
    null;

  /* ── State ──────────────────────────────────────────────── */
  let isOpen         = false;
  let hasBeenOpened  = false;

  /* ── Panel open / close ─────────────────────────────────── */
  function openPanel() {
    isOpen = true;
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    fab.setAttribute('aria-expanded', 'true');
    input.focus();

    /* Show welcome message and hide badge on first open */
    if (!hasBeenOpened) {
      hasBeenOpened = true;
      if (badge) badge.classList.add('is-hidden');
      addBotMessage("Hi! I'm Allen's AI assistant. Ask me anything about my background, skills, or projects!");
    }
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    fab.setAttribute('aria-expanded', 'false');
  }

  /* ── Toggle on FAB click ────────────────────────────────── */
  fab.addEventListener('click', function () {
    if (isOpen) closePanel(); else openPanel();
  });

  /* ── Close button ───────────────────────────────────────── */
  closeBtn.addEventListener('click', closePanel);

  /* ── Escape key closes panel ────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) closePanel();
  });

  /* ── Utilities ──────────────────────────────────────────── */
  function scrollToLatest() {
    messages.scrollTop = messages.scrollHeight;
  }

  function addUserMessage(text) {
    const div = document.createElement('div');
    div.className   = 'gemini-msg gemini-msg--user';
    div.textContent = text;
    /* Insert before the typing indicator so it stays at the bottom */
    messages.insertBefore(div, typing);
    scrollToLatest();
  }

  function addBotMessage(text) {
    const div = document.createElement('div');
    div.className   = 'gemini-msg gemini-msg--bot';
    div.textContent = text;
    messages.insertBefore(div, typing);
    scrollToLatest();
  }

  /* ── Send handler ───────────────────────────────────────── */
  async function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    if (!gemini) {
      addBotMessage('GeminiService is missing. Please check script imports.');
      return;
    }

    /* Optimistic UI: show user message immediately */
    input.value      = '';
    input.disabled   = true;
    sendBtn.disabled = true;

    addUserMessage(text);

    /* Show typing indicator */
    typing.classList.add('is-active');
    scrollToLatest();

    try {
      const reply = await gemini.sendMessage(text);
      typing.classList.remove('is-active');
      addBotMessage(reply);
    } catch (err) {
      console.error('Floating widget error:', err);
      typing.classList.remove('is-active');
      
      if (err.code === 'MISSING_API_KEY') {
        addBotMessage('API key not configured. Please add your Gemini API key to config.js.');
      } else {
        addBotMessage('Sorry, I had trouble connecting. Please try again.');
      }
    } finally {
      input.disabled   = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  /* ── Event listeners ────────────────────────────────────── */
  sendBtn.addEventListener('click', handleSend);

  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); handleSend(); }
  });

});
