import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const skillCategories = [
  {
    name: 'Frontend',
    desc: 'Building responsive, high-performance, and visually stunning web interfaces.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap', 'Responsive Design', 'Prettier']
  },
  {
    name: 'Mobile',
    desc: 'Creating native, fast, and feature-rich cross-platform mobile applications.',
    skills: ['Flutter', 'Dart', 'Google Generative AI']
  },
  {
    name: 'Backend',
    desc: 'Designing scalable APIs, databases, and secure server-side architectures.',
    skills: ['Node.js', 'PHP', 'Firebase', 'Supabase', 'MySQL', 'PostgreSQL', 'MongoDB']
  },
  {
    name: 'AI & Machine Learning',
    desc: 'Integrating advanced cognitive models, LLM prompts, and smart agents.',
    skills: ['Gemini', 'Anthropic', 'OpenAI']
  },
  {
    name: 'Developer Tools',
    desc: 'Version control workflows, development environments, and UI/UX design tools.',
    skills: ['Git', 'GitHub', 'VS Code', 'Vite', 'Antigravity', 'Figma', 'Canva']
  },
  {
    name: 'Foundational Skills',
    desc: 'Engineering principles, software design patterns, and programming fundamentals.',
    skills: ['UI Design Basics', 'Responsive UI/UX Design', 'AI Integration', 'Client-Side Data Processing', 'Offline-First Development', 'Version Control', 'OOP']
  }
];

export default function AllStacks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isBackHovered, setIsBackHovered] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCategories = skillCategories.map(cat => {
    const matchedSkills = cat.skills.filter(skill =>
      skill.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      matchedSkills,
      hasMatch: matchedSkills.length > 0
    };
  }).filter(cat => cat.hasMatch);

  // Premium subtle border & shadow to override global neon glow
  const premiumCardStyle = {
    boxShadow: '0 20px 40px -15px rgba(139, 92, 246, 0.12)',
    border: '1px solid rgba(139, 92, 246, 0.12)',
    transition: 'transform var(--transition-slow), box-shadow var(--transition-slow), border-color var(--transition-slow)'
  };

  return (
    <section id="all-stacks" className="section" style={{ minHeight: '100vh', paddingTop: '100px' }}>
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
          
          <span className="section-label" style={{ display: 'block', marginTop: 'var(--spacing-md)' }}>Complete Stack Inventory</span>
          <h1 className="section-heading" style={{ fontSize: 'var(--text-3xl)' }}>All Stacks &amp; Skills</h1>
          <p className="section-subheading">
            A comprehensive list of all technical systems, tools, and methodologies I have worked with.
          </p>
        </div>

        {/* Terminal-themed Search Box (Expanded to full width) */}
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
            <span className="chrome-label">search-stacks.sh</span>
          </div>
          <div className="skills-card-body" style={{ padding: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'monospace', fontSize: 'var(--text-md)', color: 'var(--color-accent)' }}>
              <span>ADV@Portfolio:~$ grep -i</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search skills..."
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
                autoFocus
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--spacing-xl)' }}>
            {filteredCategories.map(cat => (
              <div
                key={cat.name}
                className="skills-card"
                style={{
                  ...premiumCardStyle,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div className="skills-card-chrome">
                  <div className="chrome-dots">
                    <span className="chrome-dot chrome-dot--red"></span>
                    <span className="chrome-dot chrome-dot--yellow"></span>
                    <span className="chrome-dot chrome-dot--green"></span>
                  </div>
                  <span className="chrome-label">{cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}.json</span>
                </div>
                <div className="skills-card-body" style={{ flex: 1, padding: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <h3 className="skill-category-name" style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--spacing-sm)' }}>
                      {cat.name}
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)', marginBottom: 'var(--spacing-md)', lineHeight: 'var(--leading-snug)' }}>
                      {cat.desc}
                    </p>
                  </div>
                  <div className="skill-tags" style={{ marginTop: 'var(--spacing-sm)' }}>
                    {cat.skills.map(skill => {
                      const isHighlighted = searchQuery && skill.toLowerCase().includes(searchQuery.toLowerCase());
                      return (
                        <span
                          key={skill}
                          className="skill-tag"
                          style={{
                            backgroundColor: isHighlighted ? 'var(--color-accent)' : '',
                            borderColor: isHighlighted ? 'var(--color-accent)' : '',
                            color: isHighlighted ? '#ffffff' : '',
                            opacity: searchQuery && !isHighlighted ? 0.45 : 1,
                            transition: 'opacity 0.2s ease, background-color 0.2s ease, border-color 0.2s ease'
                          }}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl) 0', color: 'var(--color-muted)' }}>
            <p style={{ fontSize: 'var(--text-lg)' }}>No skills match "{searchQuery}"</p>
          </div>
        )}
      </div>
    </section>
  );
}
