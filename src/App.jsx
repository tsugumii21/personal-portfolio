import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Projects from './components/Projects';
import GithubActivity from './components/GithubActivity';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import ScrollToTop from './components/ScrollToTop';
import AllStacks from './pages/AllStacks';

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [activeSection, setActiveSection] = useState('hero');

  // Synchronize theme to <html> element
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const html = document.documentElement;
    html.classList.add('is-theme-switching');
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    setTimeout(() => {
      html.classList.remove('is-theme-switching');
    }, 500);
  };

  // Scroll animations and Scroll Spy
  useEffect(() => {
    // 1. Entrance reveal observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-left');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealElements.forEach((el) => revealObserver.observe(el));

    // 2. Scroll spy active navigation link observer
    const sections = document.querySelectorAll('section[id]');
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-70px 0px -60% 0px',
        threshold: 0
      }
    );
    sections.forEach((sec) => spyObserver.observe(sec));

    return () => {
      revealObserver.disconnect();
      spyObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} activeSection={activeSection} />

      <Routes>
        <Route path="/" element={
          <main id="main-content" role="main">
            <Hero />
            <About />
            <Skills />
            <Certifications />
            <Experience />
            <Projects />
            <GithubActivity />
            <Contact />
          </main>
        } />
        <Route path="/stacks" element={<AllStacks />} />
      </Routes>

      <footer id="footer" className="site-footer" role="contentinfo">
        <div className="container container--footer">
          {/* Left: Copyright */}
          <div className="footer-copy">
            <p>
              &copy; {new Date().getFullYear()} Allen Del Valle. All rights reserved.
            </p>
          </div>

          {/* Center: Nav Links */}
          <nav className="footer-nav" aria-label="Footer Navigation">
            <a href="/#hero" className="footer-nav-link">Home</a>
            <a href="/#about" className="footer-nav-link">About</a>
            <a href="/#skills" className="footer-nav-link">Skills</a>
            <a href="/#certifications" className="footer-nav-link">Certifications</a>
            <a href="/#experience" className="footer-nav-link">Experience</a>
            <a href="/#projects" className="footer-nav-link">Projects</a>
            <a href="/#contact" className="footer-nav-link">Contact</a>
          </nav>

          {/* Right: Social Icons */}
          <div className="footer-social">
            <a
              href="https://github.com/tsugumii21"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      <Chatbot />
      <ScrollToTop />
    </>
  );
}
