import React, { useState, useEffect } from 'react';

export default function Navbar({ theme, onToggleTheme, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
    return () => document.body.classList.remove('nav-open');
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header id="navbar" role="banner" className={isScrolled ? 'navbar--scrolled' : ''}>
        <nav className="nav-container" aria-label="Main navigation">
          {/* Hamburger toggle */}
          <button
            className="nav-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="nav-links"
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>

          {/* Links list */}
          <ul className="nav-links" id="nav-links" role="list">
            <li><a href="#hero" onClick={closeMenu} className={`nav-link ${activeSection === 'hero' ? 'nav-link--active' : ''}`}>Home</a></li>
            <li><a href="#about" onClick={closeMenu} className={`nav-link ${activeSection === 'about' ? 'nav-link--active' : ''}`}>About</a></li>
            <li><a href="#skills" onClick={closeMenu} className={`nav-link ${activeSection === 'skills' ? 'nav-link--active' : ''}`}>Skills</a></li>
            <li><a href="#certifications" onClick={closeMenu} className={`nav-link ${activeSection === 'certifications' ? 'nav-link--active' : ''}`}>Certifications</a></li>
            <li><a href="#experience" onClick={closeMenu} className={`nav-link ${activeSection === 'experience' ? 'nav-link--active' : ''}`}>Experience</a></li>
            <li><a href="#projects" onClick={closeMenu} className={`nav-link ${activeSection === 'projects' ? 'nav-link--active' : ''}`}>Projects</a></li>
            <li><a href="#contact" onClick={closeMenu} className={`nav-link ${activeSection === 'contact' ? 'nav-link--active' : ''}`}>Contact</a></li>
          </ul>

          {/* Theme toggler */}
          <button
            onClick={onToggleTheme}
            id="theme-toggle"
            className="nav-theme-btn"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <svg
                id="theme-icon-sun"
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
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg
                id="theme-icon-moon"
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
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        className="nav-backdrop"
        onClick={closeMenu}
        id="nav-backdrop"
        aria-hidden="true"
      ></div>
    </>
  );
}
