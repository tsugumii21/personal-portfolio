import React, { useState, useEffect, useRef } from 'react';

const certs = [
  {
    id: 1,
    name: 'Digital Safety and Security Awareness',
    org: 'DICT-ITU DTC Initiative',
    via: 'via Cisco Networking Academy',
    certId: 'ID: 79dcfecd-bceb-43b7-9e7d-d025e22056b5',
    date: 'March 28, 2026',
    img: 'assets/certifications/cisco-digital-safety.jpg',
    pdf: 'assets/certifications/cisco-digital-safety.pdf',
    circle: 'D'
  },
  {
    id: 2,
    name: 'Digital Safety and Security Awareness',
    org: 'Cisco Networking Academy & OpenEDG',
    via: 'Statement of Achievement',
    certId: '',
    date: 'March 28, 2026',
    img: 'assets/certifications/cisco-digital-safety-soa.jpg',
    pdf: 'assets/certifications/DigitalSafetyandSecurityAwarenessv120260328-32-rrfu79.pdf',
    circle: 'C'
  },
  {
    id: 3,
    name: 'Data Analytics Essentials',
    org: 'Cisco Networking Academy',
    via: 'Certificate of Course Completion',
    certId: '',
    date: 'September 29, 2025',
    img: 'assets/certifications/cisco-data-analytics.jpg',
    pdf: 'assets/certifications/cisco-data-analytics.pdf',
    circle: 'C'
  },
  {
    id: 4,
    name: 'Certificate of Enterprise Training',
    org: 'Ollopa Corporation',
    via: 'Programming (Java) NC III · 120 Hours',
    certId: 'Supervised Industry Learning · Fairview, Quezon City',
    date: 'September 3, 2025',
    img: 'assets/certifications/oilopa-java.jpg',
    pdf: 'assets/certifications/oilopa-java.pdf',
    circle: 'O'
  },
  {
    id: 5,
    name: 'Programming (Java) NC III',
    org: 'TESDA & NRG Info-Tech Institute',
    via: 'Certificate of Training · 360 Hours',
    certId: 'CTPR No: 20230505ICTPRJ321053 · TWSP Scholar',
    date: 'August 4, 2025',
    img: 'assets/certifications/tesda-java-nc3.jpg',
    pdf: 'assets/certifications/tesda-java-nc3.pdf',
    circle: 'T'
  }
];

export default function Certifications() {
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const trackRef = useRef(null);
  const autoTimerRef = useRef(null);
  const touchStartXRef = useRef(0);

  // Dynamic visible count calculation
  const getVisibleCount = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const maxIndex = Math.max(0, certs.length - visibleCount);

  // Update visible count on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const count = getVisibleCount();
      setVisibleCount(count);
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Make sure current index doesn't overshoot maxIndex on resize
  useEffect(() => {
    if (current > maxIndex) {
      setCurrent(maxIndex);
    }
  }, [visibleCount, maxIndex, current]);

  // Adjust track position when current index or visibleCount changes
  useEffect(() => {
    const syncPosition = () => {
      const track = trackRef.current;
      if (!track) return;
      const slide = track.querySelector('.cert-slide');
      if (!slide) return;

      const slideW = slide.getBoundingClientRect().width;
      const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
      track.style.transform = `translateX(-${current * (slideW + gap)}px)`;
    };

    syncPosition();
    // Sync position on a tiny delay in case layout is adjusting
    const t = setTimeout(syncPosition, 50);
    window.addEventListener('resize', syncPosition);

    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', syncPosition);
    };
  }, [current, visibleCount]);

  // Autoplay functionality
  const startAuto = () => {
    stopAuto();
    autoTimerRef.current = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
  };

  const stopAuto = () => {
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current);
    }
  };

  const resetAuto = () => {
    stopAuto();
    startAuto();
  };

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [visibleCount, maxIndex]);

  const goTo = (idx) => {
    setCurrent(Math.max(0, Math.min(idx, maxIndex)));
    resetAuto();
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const delta = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      goTo(delta > 0 ? current + 1 : current - 1);
    }
  };

  return (
    <section id="certifications" aria-label="Certifications">
      <div className="container">
        <div className="certifications-header">
          <span className="section-label reveal">Certifications</span>
          <h2 className="section-heading reveal reveal-delay-1">My Certifications</h2>
        </div>

        <div
          className="cert-carousel-wrapper reveal reveal-delay-2"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
          onFocus={stopAuto}
          onBlur={startAuto}
        >
          {/* Prev Button */}
          <button
            className="cert-carousel-btn cert-carousel-btn--prev"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            aria-label="Previous certificate"
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
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Carousel Viewport */}
          <div
            className="cert-carousel"
            id="cert-carousel"
            aria-label="Certifications carousel"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="cert-carousel-track" ref={trackRef}>
              {certs.map((cert, index) => (
                <div
                  key={cert.id}
                  className="cert-slide"
                  role="group"
                  aria-label={`Certificate ${index + 1} of ${certs.length}`}
                >
                  <article className="cert-card">
                    <div className="cert-preview">
                      <a
                        href={cert.img}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${cert.name} Certificate image`}
                      >
                        <img src={cert.img} alt={cert.name} loading="lazy" />
                      </a>
                    </div>
                    <div className="cert-card-top">
                      <div className="cert-issuer-circle" aria-hidden="true">
                        {cert.circle}
                      </div>
                      <div className="cert-info">
                        <h3 className="cert-name">{cert.name}</h3>
                        <p className="cert-org">{cert.org}</p>
                        <p className="cert-via">{cert.via}</p>
                      </div>
                    </div>
                    <p className="cert-id">{cert.certId || '\u00A0'}</p>
                    <div className="cert-card-bottom">
                      <span class="cert-date">{cert.date}</span>
                      <a
                        href={cert.pdf}
                        className="cert-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open PDF &#8599;
                      </a>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            className="cert-carousel-btn cert-carousel-btn--next"
            onClick={() => goTo(current + 1)}
            disabled={current >= maxIndex}
            aria-label="Next certificate"
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="cert-carousel-dots" role="tablist" aria-label="Select certificate">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`cert-dot ${i === current ? 'cert-dot--active' : ''}`}
                role="tab"
                aria-label={`Go to certificate group ${i + 1}`}
                aria-selected={i === current}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
