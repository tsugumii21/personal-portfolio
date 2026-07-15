import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: 'Sukli POS',
    desc: 'A comprehensive point-of-sale system built for small businesses and stalls, supporting inventory and quick sales.',
    tags: ['Flutter', 'Dart', 'Supabase'],
    category: 'mobile',
    categoryLabel: 'Mobile App',
    github: 'https://github.com/tsugumii21/Sukli_POS',
    primaryTagIndex: 0
  },
  {
    id: 2,
    title: 'MERKADO-GO',
    desc: 'Directory and AI Assistant application specifically designed for the Ligao City Public Market.',
    tags: ['Flutter', 'Firebase', 'Dart', 'Gemini AI'],
    category: 'mobile',
    categoryLabel: 'Mobile App',
    github: 'https://github.com/tsugumii21/MERKADO-GO---Ligao-City-Public-Market-Directory-AI-Assistant',
    primaryTagIndex: 0
  },
  {
    id: 3,
    title: 'BU GWA Calculator & Evaluator',
    desc: 'An academic utility application specifically built for Bicol University students to calculate and track GWA records and Latin Honors eligibility.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Academic Tool'],
    category: 'academic',
    categoryLabel: 'Academic Tool',
    github: 'https://github.com/tsugumii21/bu-gwa-calculator-evaluator',
    primaryTagIndex: 0
  },
  {
    id: 4,
    title: 'M.A.R.I.N.',
    desc: 'Final project showcasing advanced capabilities and systematic software engineering design paradigms.',
    tags: ['JavaScript', 'Node.js', 'MongoDB', 'React'],
    category: 'web',
    categoryLabel: 'Web App',
    github: 'https://github.com/IkkiKobayashi/-final-project-M.A.R.I.N.',
    visit: 'https://final-project-m-a-r-i-n.onrender.com/',
    primaryTagIndex: 3
  },
  {
    id: 5,
    title: 'DrivePinas',
    desc: 'A web application platform designed for buying and selling second-hand cars in the Philippines.',
    tags: ['HTML', 'CSS', 'JavaScript', 'E-Commerce'],
    category: 'web',
    categoryLabel: 'Web App',
    github: 'https://github.com/tsugumii21/DrivePinas',
    primaryTagIndex: 0
  },
  {
    id: 6,
    title: 'DairiX - Dairy Rover Ph',
    desc: 'A dairy management and logistics application to facilitate operations for Rover Ph.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: 'web',
    categoryLabel: 'Web App',
    github: 'https://github.com/tsugumii21/DairiX---Dairy-Rover-Ph',
    visit: 'https://tsugumii21.github.io/DairiX---Dairy-Rover-Ph/',
    primaryTagIndex: 0
  }
];

export default function AllProjects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isBackHovered, setIsBackHovered] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          project.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || project.category === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const premiumCardStyle = {
    boxShadow: '0 20px 40px -15px rgba(139, 92, 246, 0.12)',
    border: '1px solid rgba(139, 92, 246, 0.12)',
    transition: 'transform var(--transition-slow), box-shadow var(--transition-slow), border-color var(--transition-slow)'
  };

  return (
    <section id="all-projects" className="section" style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="container">
        {/* Navigation & Header */}
        <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <Link
            to="/"
            className="btn btn--outline"
            onMouseEnter={() => setIsBackHovered(true)}
            onMouseLeave={() => setIsBackHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: 'var(--spacing-md)'
            }}
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
              style={{
                transform: isBackHovered ? 'translateX(-4px)' : 'none',
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Portfolio
          </Link>
          
          <span className="section-label" style={{ display: 'block', marginTop: 'var(--spacing-md)' }}>Project Archive</span>
          <h1 className="section-heading" style={{ fontSize: 'var(--text-3xl)' }}>All My Projects</h1>
          <p className="section-subheading">
            A comprehensive list of my software engineering projects, mobile apps, and academic tools.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div
          className="skills-card"
          style={{
            ...premiumCardStyle,
            maxWidth: 'none',
            marginBottom: 'var(--spacing-2xl)',
            transform: 'none',
            transition: 'none'
          }}
        >
          <div className="skills-card-chrome">
            <div className="chrome-dots">
              <span className="chrome-dot chrome-dot--red"></span>
              <span className="chrome-dot chrome-dot--yellow"></span>
              <span className="chrome-dot chrome-dot--green"></span>
            </div>
            <span className="chrome-label">project-filters.sh</span>
          </div>
          
          <div className="skills-card-body" style={{ padding: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Search Input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'monospace', fontSize: 'var(--text-md)', color: 'var(--color-accent)', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              <span>ADV@Portfolio:~$ grep -i</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search projects by title, tag, or desc..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--color-text)',
                  fontFamily: 'monospace',
                  fontSize: 'var(--text-md)',
                  caretColor: 'var(--color-accent)'
                }}
              />
            </div>

            {/* Category tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['all', 'mobile', 'web', 'academic'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="btn btn--outline"
                  style={{
                    padding: '6px 16px',
                    fontSize: 'var(--text-xs)',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: activeTab === tab ? 'var(--color-accent)' : 'transparent',
                    borderColor: activeTab === tab ? 'var(--color-accent)' : 'var(--color-border)',
                    color: activeTab === tab ? '#ffffff' : 'var(--color-text)',
                    textTransform: 'capitalize'
                  }}
                >
                  {tab === 'all' ? 'Show All' : tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Structured Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <article
                key={project.id}
                className="project-card reveal visible"
                style={{ opacity: 1, transform: 'none' }}
              >
                <div className="project-image-wrapper">
                  <span
                    className="project-category-badge"
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      backgroundColor: 'rgba(124, 58, 237, 0.9)',
                      color: '#ffffff',
                      zIndex: 2
                    }}
                  >
                    {project.categoryLabel}
                  </span>
                  <div className="project-image-placeholder" />
                </div>
                
                <div className="project-content" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 180px)' }}>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc" style={{ flex: 1 }}>{project.desc}</p>
                  
                  <div className="project-tags" style={{ marginBottom: '16px' }}>
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tag}
                        className={`skill-tag ${tagIndex === project.primaryTagIndex ? 'skill-tag--primary' : ''}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-links" style={{ marginTop: 'auto' }}>
                    <a
                      href={project.github}
                      className="btn btn--outline project-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      Code
                    </a>
                    {project.visit && (
                      <a
                        href={project.visit}
                        className="btn btn--outline project-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Visit
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl) 0', color: 'var(--color-muted)' }}>
            <p style={{ fontSize: 'var(--text-lg)' }}>No projects found matching the criteria</p>
          </div>
        )}
      </div>
    </section>
  );
}
