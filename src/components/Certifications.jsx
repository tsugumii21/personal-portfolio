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
  const [selectedCert, setSelectedCert] = useState(null);
  
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
    const t = setTimeout(syncPosition, 50);
    window.addEventListener('resize', syncPosition);

    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', syncPosition);
    };
  }, [current, visibleCount]);

  // Autoplay functionality (paused when modal is open)
  const startAuto = () => {
    stopAuto();
    if (selectedCert) return; // Keep paused if modal is open
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
  }, [visibleCount, maxIndex, selectedCert]);

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

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
                  <article 
                    className="cert-card" 
                    onClick={() => setSelectedCert(cert)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="cert-preview">
                      <img src={cert.img} alt={cert.name} loading="lazy" />
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
                      <span className="cert-date">{cert.date}</span>
                      <span className="cert-link">View Preview &rarr;</span>
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

      {/* ── Certification Preview Modal Overlay ── */}
      <div 
        className={`cert-modal-backdrop ${selectedCert ? 'is-open' : ''}`}
        onClick={() => setSelectedCert(null)}
      >
        {selectedCert && (
          <div 
            className="cert-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-modal-header">
              <h3 className="cert-modal-title">{selectedCert.name}</h3>
              <button 
                className="cert-modal-close-btn"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate preview"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            <div className="cert-modal-body">
              <div className="cert-modal-img-wrapper">
                <img 
                  src={selectedCert.img} 
                  alt={selectedCert.name} 
                  className="cert-modal-image"
                />
              </div>
              
              <div className="cert-modal-info">
                <div className="cert-modal-details">
                  <div className="cert-modal-detail-item">
                    <strong>Organization / Issuer</strong>
                    <span>{selectedCert.org}</span>
                  </div>
                  <div className="cert-modal-detail-item">
                    <strong>Description</strong>
                    <span>{selectedCert.via}</span>
                  </div>
                  <div className="cert-modal-detail-item">
                    <strong>Date Issued</strong>
                    <span>{selectedCert.date}</span>
                  </div>
                  {selectedCert.certId && (
                    <div className="cert-modal-detail-item">
                      <strong>Verification ID</strong>
                      <span>{selectedCert.certId}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="cert-modal-footer">
              <button 
                className="btn btn--outline"
                onClick={() => setSelectedCert(null)}
              >
                Close
              </button>
              <a 
                href={selectedCert.pdf}
                className="btn btn--dark"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Download PDF
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
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
