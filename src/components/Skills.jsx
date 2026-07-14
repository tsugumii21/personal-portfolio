import React from 'react';
import { Link } from 'react-router-dom';

const mainSkillCategories = [
  {
    name: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React']
  },
  {
    name: 'Mobile',
    skills: ['Flutter', 'Dart']
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Firebase', 'Supabase']
  },
  {
    name: 'AI & Machine Learning',
    skills: ['Gemini']
  },
  {
    name: 'Developer Tools',
    skills: ['Git', 'GitHub', 'VS Code']
  }
];

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills and technologies">
      <div className="container">
        <div className="skills-header">
          <span className="section-label reveal">What I Work With</span>
          <h2 className="section-heading reveal reveal-delay-1">Tech Stack</h2>
          <p className="section-subheading reveal reveal-delay-2">
            Primary technologies and tools I use to build mobile apps, web projects, and AI integrations.
          </p>
        </div>

        <div className="skills-card reveal reveal-delay-3" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="skills-card-chrome">
            <div className="chrome-dots">
              <span className="chrome-dot chrome-dot--red"></span>
              <span className="chrome-dot chrome-dot--yellow"></span>
              <span className="chrome-dot chrome-dot--green"></span>
            </div>
            <span className="chrome-label">tech-stack.js</span>
          </div>

          <div className="skills-card-body">
            {mainSkillCategories.map((category, index) => (
              <React.Fragment key={category.name}>
                {index > 0 && <div className="skill-divider" aria-hidden="true" />}
                <div className="skill-category">
                  <h3 className="skill-category-name">{category.name}</h3>
                  <div className="skill-tags">
                    {category.skills.map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--spacing-md) var(--spacing-lg) var(--spacing-lg) var(--spacing-lg)', borderTop: '1px solid var(--color-border)' }}>
            <Link to="/stacks" className="btn btn--outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              View All Stacks
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
