import React from 'react';

const skillCategories = [
  {
    name: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap', 'Responsive Design', 'Prettier']
  },
  {
    name: 'Mobile',
    skills: ['Flutter', 'Dart', 'Google Generative AI']
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'PHP', 'Firebase', 'Supabase', 'MySQL', 'PostgreSQL', 'MongoDB']
  },
  {
    name: 'AI & Machine Learning',
    skills: ['Gemini', 'Anthropic', 'OpenAI']
  },
  {
    name: 'Developer Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Antigravity', 'Figma', 'Canva']
  },
  {
    name: 'Foundational Skills',
    skills: ['UI Design Basics', 'Responsive UI/UX Design', 'AI Integration', 'Client-Side Data Processing', 'Offline-First Development', 'Version Control', 'OOP']
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
            Technologies and tools I use to build mobile apps, web projects, and everything in between — sourced from my real GitHub repositories.
          </p>
        </div>

        <div className="skills-card reveal reveal-delay-3">
          <div className="skills-card-chrome">
            <div className="chrome-dots">
              <span className="chrome-dot chrome-dot--red"></span>
              <span className="chrome-dot chrome-dot--yellow"></span>
              <span className="chrome-dot chrome-dot--green"></span>
            </div>
            <span className="chrome-label">tech-stack.js</span>
          </div>

          <div className="skills-card-body">
            {skillCategories.map((category, index) => (
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
        </div>
      </div>
    </section>
  );
}
