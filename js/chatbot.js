/* ================================================================
   PORTFOLIO — CHATBOT SCRIPT
   File:    js/chatbot.js
   Purpose:
     Part 1 — Page-section chatbot (#chat-messages, #chat-input …)
     Part 2 — Floating Gemini widget (#gemini-panel, #gemini-fab …)
   Dependencies: config.js (must load first — exposes GEMINI_API_KEY)
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
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

  /* ── System prompt + conversation history ───────────────── */
  const SYSTEM_PROMPT = `
You are a helpful assistant representing Allen Del Valle, a Bachelor of Science in
Information Technology (BSIT) student at Bicol University.
Answer questions about their background, skills, projects, and availability.
Be friendly, concise, and professional.
If asked something you don't know, say you're not sure but they can reach out via the contact form.
Do not use markdown formatting blocks for simple text.
  `.trim();

  let conversationHistory = [
    { role: 'user',  parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Understood. I will act as the virtual assistant and answer questions concisely and professionally.' }] }
  ];

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

    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      addMessageToUI('bot', 'API key not configured. Please add your Gemini API key to config.js.');
      return;
    }

    chatInput.value   = '';
    chatInput.disabled    = true;
    chatSendBtn.disabled  = true;

    addMessageToUI('user', message);
    conversationHistory.push({ role: 'user', parts: [{ text: message }] });

    typingIndicator.classList.add('is-typing');
    scrollToBottom();

    try {
      const response = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          contents: conversationHistory,
          generationConfig: { temperature: 0.7, maxOutputTokens: 150 }
        })
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      let botReply = 'I\'m not sure about that. Try asking something else!';
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        botReply = data.candidates[0].content.parts[0].text;
      }

      typingIndicator.classList.remove('is-typing');
      addMessageToUI('bot', botReply);
      conversationHistory.push({ role: 'model', parts: [{ text: botReply }] });

    } catch (error) {
      console.error('Section chatbot error:', error);
      typingIndicator.classList.remove('is-typing');
      addMessageToUI('bot', 'Sorry, I had trouble connecting. Please try again.');
      conversationHistory.pop();
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
   Shares the same GEMINI_API_KEY from config.js but maintains its
   own separate conversation history.
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
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

  /* ── System prompt ──────────────────────────────────────── */
  const SYSTEM_PROMPT = `You are a helpful AI assistant for Allen Del Valle, a Bachelor of Science in Information Technology (BSIT) student at Bicol University. Answer questions about their skills, projects, and background. Be friendly, concise, and professional. Do not use markdown formatting.`;

  /* ── Conversation history (separate from section chatbot) ── */
  let history = [
    { role: 'user',  parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Understood. I\'m ready to help answer questions.' }] }
  ];

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

    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      addBotMessage('API key not configured. Please add your Gemini API key to config.js.');
      return;
    }

    /* Optimistic UI: show user message immediately */
    input.value      = '';
    input.disabled   = true;
    sendBtn.disabled = true;

    addUserMessage(text);
    history.push({ role: 'user', parts: [{ text }] });

    /* Show typing indicator */
    typing.classList.add('is-active');
    scrollToLatest();

    try {
      const res = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          contents: history,
          generationConfig: { temperature: 0.7, maxOutputTokens: 200 }
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      let reply = 'I\'m not sure about that. Try asking something else!';
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        reply = data.candidates[0].content.parts[0].text;
      }

      typing.classList.remove('is-active');
      addBotMessage(reply);
      history.push({ role: 'model', parts: [{ text: reply }] });

    } catch (err) {
      console.error('Floating widget error:', err);
      typing.classList.remove('is-active');
      addBotMessage('Sorry, I had trouble connecting. Please try again.');
      /* Remove the failed turn so history stays consistent */
      history.pop();
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
