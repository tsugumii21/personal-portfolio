import React from 'react';

const projects = [
  {
    id: 1,
    title: 'Sukli POS',
    desc: 'A comprehensive point-of-sale system built for small businesses and stalls, supporting inventory and quick sales.',
    tags: ['Flutter', 'Dart', 'Supabase'],
    github: 'https://github.com/tsugumii21/Sukli_POS',
    primaryTagIndex: 0
  },
  {
    id: 2,
    title: 'MERKADO-GO',
    desc: 'Directory and AI Assistant application specifically designed for the Ligao City Public Market.',
    tags: ['Flutter', 'Firebase', 'Dart', 'Gemini AI'],
    github: 'https://github.com/tsugumii21/MERKADO-GO---Ligao-City-Public-Market-Directory-AI-Assistant',
    primaryTagIndex: 0
  },
  {
    id: 3,
    title: 'BU GWA Calculator & Evaluator',
    desc: 'An academic utility application specifically built for Bicol University students to calculate and track GWA records and Latin Honors eligibility.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Academic Tool'],
    github: 'https://github.com/tsugumii21/bu-gwa-calculator-evaluator',
    primaryTagIndex: 0
  },
  {
    id: 4,
    title: 'M.A.R.I.N.',
    desc: 'Final project showcasing advanced capabilities and systematic software engineering design paradigms.',
    tags: ['JavaScript', 'Node.js', 'MongoDB', 'React'],
    github: 'https://github.com/IkkiKobayashi/-final-project-M.A.R.I.N.',
    visit: 'https://final-project-m-a-r-i-n.onrender.com/',
    primaryTagIndex: 3
  },
  {
    id: 5,
    title: 'DrivePinas',
    desc: 'A web application platform designed for buying and selling second-hand cars in the Philippines.',
    tags: ['HTML', 'CSS', 'JavaScript', 'E-Commerce'],
    github: 'https://github.com/tsugumii21/DrivePinas',
    primaryTagIndex: 0
  },
  {
    id: 6,
    title: 'DairiX - Dairy Rover Ph',
    desc: 'A dairy management and logistics application to facilitate operations for Rover Ph.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/tsugumii21/DairiX---Dairy-Rover-Ph',
    visit: 'https://tsugumii21.github.io/DairiX---Dairy-Rover-Ph/',
    primaryTagIndex: 0
  }
];

export default function Projects() {
  return (
    <section id="projects" aria-label="Projects">
      <div className="container">
        <div className="projects-header">
          <span className="section-label reveal">My Portfolio</span>
          <h2 className="section-heading reveal reveal-delay-1">Featured Projects</h2>
          <p className="section-subheading reveal reveal-delay-2">
            A selection of my recent work, highlighting my ability to build clean, functional, and user-centric applications.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`project-card reveal reveal-delay-${(index % 4) + 1}`}
            >
              <div className="project-image-wrapper">
                <div className="project-image-placeholder" />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className={`skill-tag ${tagIndex === project.primaryTagIndex ? 'skill-tag--primary' : ''}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-links">
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
                      focusable="false"
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
                        focusable="false"
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

        <div className="projects-footer reveal reveal-delay-4">
          <a
            href="https://github.com/tsugumii21"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline"
          >
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
              aria-hidden="true"
              focusable="false"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
