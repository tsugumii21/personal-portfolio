import React from 'react';

export default function Hero() {
  return (
    <section id="hero" aria-label="Introduction">
      <div className="container">
        <div className="hero-grid">
          {/* ── Left column: text content ─────────────── */}
          <div className="hero-content">
            <span className="hero-greeting reveal">Hello, I'm</span>
            <h1 className="hero-name reveal reveal-delay-1">Allen Del Valle</h1>
            <p className="hero-role reveal reveal-delay-2">Aspiring AI &amp; Software Engineer</p>
            <p className="hero-bio reveal reveal-delay-2">
              BSIT student at Bicol University specializing in building high-performance cross-platform mobile apps and responsive web applications.
            </p>

            <div className="hero-actions reveal reveal-delay-3">
              <a href="#projects" className="btn btn--dark"> View Projects </a>
              <a href="assets/cv.pdf" className="btn btn--outline" download>
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
                  focusable="false"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV
              </a>
            </div>
          </div>

          {/* ── Right column: visual profile card ──────── */}
          <div className="hero-card-wrapper reveal reveal-delay-3" aria-hidden="true">
            <div className="hero-card">
              <div className="hero-card-chrome">
                <div className="chrome-dots">
                  <span className="chrome-dot chrome-dot--red"></span>
                  <span className="chrome-dot chrome-dot--yellow"></span>
                  <span className="chrome-dot chrome-dot--green"></span>
                </div>
                <span className="chrome-label">profile.js</span>
              </div>

              <div className="hero-card-body">
                <div className="hero-avatar">ADV</div>
                <p className="hero-card-name">Allen Del Valle</p>
                <p className="hero-card-role">Software Engineer</p>
                <div className="hero-card-divider"></div>
                <p className="hero-card-label">Tech Stack</p>
                <div className="hero-badges">
                  <span className="tech-badge">HTML</span>
                  <span className="tech-badge">CSS</span>
                  <span className="tech-badge">JavaScript</span>
                  <span className="tech-badge">Flutter</span>
                  <span className="tech-badge">Dart</span>
                  <span className="tech-badge">React</span>
                </div>
              </div>
              <div className="hero-card-deco" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="scroll-hint-text">Scroll</span>
        <div className="scroll-hint-line"></div>
      </div>
    </section>
  );
}
