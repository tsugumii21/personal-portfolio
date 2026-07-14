import React, { useState, useEffect, useRef } from 'react';
import { GeminiService } from '../services/gemini';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const geminiRef = useRef(null);

  // Initialize service on mount
  useEffect(() => {
    // If config.js is loaded, GEMINI_API_KEY should be global
    const apiKey = typeof window.GEMINI_API_KEY !== 'undefined' ? window.GEMINI_API_KEY : '';
    const systemPrompt = "You are a helpful AI assistant for Allen Del Valle, a Bachelor of Science in Information Technology (BSIT) student at Bicol University. Answer questions about their skills, projects, and background. Be friendly, concise, and professional. Do not use markdown formatting.";
    geminiRef.current = new GeminiService(apiKey, systemPrompt, "Understood. I'm ready to help answer questions.");
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const togglePanel = () => {
    if (!isOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
      setMessages([
        {
          sender: 'bot',
          text: "Hi! I'm Allen's AI assistant. Ask me anything about my background, skills, or projects!"
        }
      ]);
    }
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    const text = inputVal.trim();
    if (!text) return;

    setInputVal('');
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setIsTyping(true);

    if (!geminiRef.current) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'GeminiService is missing. Please check configuration.'
        }
      ]);
      return;
    }

    try {
      const reply = await geminiRef.current.sendMessage(text);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setIsTyping(false);
      if (err.code === 'MISSING_API_KEY') {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: 'API key not configured. Please add your Gemini API key to config.js.'
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: 'Sorry, I had trouble connecting. Please try again.'
          }
        ]);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div id="gemini-widget">
      {/* ── Chat panel (hidden by default) ── */}
      <div
        id="gemini-panel"
        className={`gemini-panel ${isOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="AI Assistant chat panel"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="gemini-header">
          <div className="gemini-header-info">
            <div className="gemini-avatar" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />
                <path d="M15 13v2" />
                <path d="M9 13v2" />
              </svg>
            </div>
            <div>
              <p className="gemini-title">AI Assistant</p>
              <p className="gemini-subtitle">Allen Del Valle</p>
            </div>
          </div>
          <button
            className="gemini-close"
            onClick={togglePanel}
            aria-label="Close chat panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages area */}
        <div
          className="gemini-messages"
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`gemini-msg gemini-msg--${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="gemini-typing is-active" aria-hidden="true">
              <span className="gemini-typing-dot"></span>
              <span className="gemini-typing-dot"></span>
              <span className="gemini-typing-dot"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="gemini-input-area">
          <input
            type="text"
            className="gemini-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything…"
            autocomplete="off"
            aria-label="Type your message"
            disabled={isTyping}
          />
          <button
            className="gemini-send"
            onClick={handleSend}
            disabled={isTyping || !inputVal.trim()}
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* FAB trigger button */}
      <button
        className="gemini-fab"
        onClick={togglePanel}
        aria-label="Open AI chat assistant"
        aria-expanded={isOpen}
        aria-controls="gemini-panel"
      >
        <span
          className={`gemini-fab-badge ${hasBeenOpened ? 'is-hidden' : ''}`}
          aria-hidden="true"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  );
}
