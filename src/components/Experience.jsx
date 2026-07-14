import React from 'react';

const timelineData = [
  {
    role: 'Senior High School',
    org: 'Ligao National High School',
    strand: 'TVL ICT — Computer System Servicing',
    date: '2021 – 2023',
    status: 'completed',
    statusLabel: 'Completed',
    bullets: [
      'Completed Grade 11–12 under the TVL-ICT strand',
      'Graduated with Honors'
    ]
  },
  {
    role: 'Bachelor of Science in Information Technology',
    org: 'Bicol University Polangui',
    strand: '',
    date: '2023 – Present',
    status: 'ongoing',
    statusLabel: 'Ongoing',
    bullets: [
      'Currently in 3rd year, 2nd semester',
      'Focused on Data Structures, Algorithms, and Web Development',
      'Active participant in university tech seminars and coding bootcamps'
    ]
  },
  {
    role: 'Software Engineer',
    org: 'Tech Industry',
    strand: '',
    date: '2027 – Future',
    status: 'future',
    statusLabel: 'Coming Soon',
    bullets: [
      'Aspiring to specialize in Full-Stack Web Development and Artificial Intelligence.',
      'Open to internships and entry-level opportunities',
      'Continuously learning new technologies and best practices.'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" aria-label="Education and experience timeline">
      <div className="container">
        <div className="experience-header">
          <span className="section-label reveal">My Journey</span>
          <h2 className="section-heading reveal reveal-delay-1">Education &amp; Experience</h2>
        </div>

        <div className="experience-timeline">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`timeline-item reveal-left reveal-delay-${index + 1}`}
            >
              <div
                className={`timeline-dot timeline-dot--${item.status}`}
                aria-hidden="true"
              />
              <div className={`timeline-card ${item.status === 'future' ? 'timeline-card--future' : ''}`}>
                <div className="timeline-card-top">
                  <div className="timeline-title-group">
                    <h3 className="timeline-role">{item.role}</h3>
                    <p className="timeline-org">{item.org}</p>
                    {item.strand && <p className="timeline-strand">{item.strand}</p>}
                    <small className="timeline-date">{item.date}</small>
                  </div>
                  <span className={`timeline-badge timeline-badge--${item.status}`}>
                    {item.statusLabel}
                  </span>
                </div>
                <ul className="timeline-bullets">
                  {item.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
