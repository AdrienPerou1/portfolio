import React, { useState, useEffect, useRef } from 'react';
import skillsData from '../skills.json';
import './SkillsPage.css';

function SkillsPage() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // Intersection observer for animations
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...prev, entry.target.dataset.index]);
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const setCardRef = (element, index) => {
    if (element && observerRef.current) {
      element.dataset.index = index;
      observerRef.current.observe(element);
    }
  };

  // Tech icons mapping (using emoji as fallback)
  const iconMap = {
    'Intelligence Artificielle & Mathématiques': '🧠',
    'Développement Système & Logiciel': '💻',
    'Bases de données': '🗄️',
    'Web & Data Visualization': '📈',
    'Réseau & Système': '🌐',
    'Management & Analyse de SI': '📋',
  };

  return (
    <div className="skills-page">
      {/* Hero Section */}
      <section className="skills-hero">
        <div className="hero-content">
          <span className="section-label">Expertise</span>
          <h1>Mes Compétences</h1>
          <p className="hero-subtitle">
            Technologies et outils que je maîtrise, développés au fil de ma formation et de mes projets personnels.
          </p>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="skills-section">
        <div className="container">
          <div className="skills-container">
            {skillsData.map((skillCategory, index) => (
              <article
                key={index}
                ref={(el) => setCardRef(el, index)}
                className={`skill-category ${visibleCards.includes(String(index)) ? 'is-visible' : ''} ${expandedCategory === skillCategory.category ? 'expanded' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card glow effect */}
                <div className="card-border-glow"></div>

                {/* Header */}
                <div
                  className="skill-category-header"
                  onClick={() => skillCategory.subSkills.length > 0 && toggleCategory(skillCategory.category)}
                >
                  <div className="skill-icon-wrapper">
                    <span className="skill-icon">{iconMap[skillCategory.category] || '💡'}</span>
                  </div>
                  <div className="skill-header-content">
                    <h2>{skillCategory.category}</h2>
                    {skillCategory.subSkills.length > 0 && (
                      <span className="skill-count">{skillCategory.subSkills.length} sous-compétences</span>
                    )}
                  </div>
                  {skillCategory.subSkills.length > 0 && (
                    <div className="expand-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="skill-category-description">{skillCategory.description}</p>

                {/* Sub-skills */}
                {skillCategory.subSkills.length > 0 && (
                  <div className="sub-skills-container">
                    {skillCategory.subSkills.map((subSkill, subIndex) => (
                      <div
                        key={subIndex}
                        className="sub-skill"
                        style={{ animationDelay: `${subIndex * 0.05}s` }}
                      >
                        <h3>{subSkill.name}</h3>
                        <p>{subSkill.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tools section */}
      <section className="tools-section">
        <div className="container">
          <h2 className="tools-title">Outils & Technologies</h2>
          <div className="tools-grid">
            {['Git', 'Docker', 'Linux', 'PostgreSQL', 'React', 'Agile/Scrumban', 'Spring Boot', 'd3.js', 'Cisco', 'ACID', 'Python/Maths', 'Java POO', 'MongoDB', 'Cassandra'].map((tool, index) => (
              <div
                key={tool}
                className="tool-item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SkillsPage;