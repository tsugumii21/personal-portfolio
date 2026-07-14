import React from 'react';

export default function About() {
  return (
    <section id="about" aria-label="About me">
      <div className="container">
        <div className="about-grid">
          {/* ── Left column: profile image ─────────────── */}
          <div className="about-image-wrapper reveal">
            <div className="about-image-frame">
              <div className="about-image-placeholder" aria-hidden="true">
                <span>ADV</span>
              </div>
              <img
                src="assets/profile.jpg"
                alt="Profile photo of Allen Del Valle"
                className="about-image"
                loading="lazy"
                onError={(e) => e.target.classList.add('about-image--hidden')}
              />
            </div>
            <div className="about-image-deco" aria-hidden="true"></div>
          </div>

          {/* ── Right column: bio + details ────────────── */}
          <div className="about-content">
            <span className="section-label reveal">About Me</span>
            <h2 className="section-heading reveal reveal-delay-1">Who I Am</h2>

            <div className="about-bio reveal reveal-delay-2">
              <p>
                I'm an aspiring AI and Software Engineer and a BSIT student at Bicol University. I focus on building high-performance cross-platform mobile apps and responsive web applications that combine premium modern aesthetics with robust functionality.
              </p>
              <p>
                My technical toolkit includes cross-platform development with Dart and Flutter, web engineering using vanilla JavaScript and responsive CSS systems, and backend integration with services like Firebase, Supabase, and Cloudinary. I have hands-on experience implementing offline-first architectures with local NoSQL databases (Isar), performing client-side data processing, and integrating smart services like Google Gemini AI.
              </p>
            </div>

            <dl className="about-details reveal reveal-delay-3">
              <div className="detail-item">
                <dt class="detail-label">Name</dt>
                <dd class="detail-value">Allen Del Valle</dd>
              </div>

              <div className="detail-item">
                <dt class="detail-label">Course</dt>
                <dd class="detail-value">BS Information Technology (BSIT)</dd>
              </div>

              <div className="detail-item">
                <dt class="detail-label">School</dt>
                <dd class="detail-value">Bicol University</dd>
              </div>

              <div className="detail-item">
                <dt class="detail-label">Location</dt>
                <dd class="detail-value">Ligao City, Philippines</dd>
              </div>

              <div className="detail-item detail-item--full">
                <dt class="detail-label">Email</dt>
                <dd class="detail-value">
                  <a href="mailto:allendelvalle016@gmail.com" className="detail-link">
                    allendelvalle016@gmail.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
