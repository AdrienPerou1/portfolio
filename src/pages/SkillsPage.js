import React, { useState } from 'react';
import skillsData from '../skills.json';
import './SkillsPage.css';

// Codes courts, dans la même langue visuelle que la fiche du hero.
const CODES = {
  'Intelligence Artificielle & Mathématiques': 'AI',
  'Développement Système & Logiciel': 'SYS',
  'Bases de données': 'DB',
  'Web & Data Visualization': 'WEB',
  'Réseau & Système': 'NET',
  'Management & Analyse de SI': 'PM',
};

const TOOLS = [
  'Git', 'Docker', 'Linux', 'PostgreSQL', 'React', 'Agile/Scrumban', 'Spring Boot',
  'd3.js', 'Cisco', 'ACID', 'Python/Maths', 'Java POO', 'MongoDB', 'Cassandra',
];

function SkillsPage() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="skills-page">
      <header className="page-header">
        <div className="container">
          <span className="eyebrow">Compétences</span>
          <h1>Ce que je sais faire</h1>
          <p className="lede">
            Six domaines construits au fil du BUT et des projets, de la théorie des bases
            de données à l'administration réseau.
          </p>
        </div>
      </header>

      <section className="skills-section">
        <div className="container">
          <div className="skills-list">
            {skillsData.map((category) => {
              const isOpen = expanded === category.category;
              const hasSubSkills = category.subSkills.length > 0;

              return (
                <article
                  key={category.category}
                  className={`skill-category ${isOpen ? 'expanded' : ''}`}
                >
                  <h2 className="skill-heading">
                    <button
                      type="button"
                      className="skill-trigger"
                      onClick={() => setExpanded(isOpen ? null : category.category)}
                      aria-expanded={isOpen}
                      disabled={!hasSubSkills}
                    >
                      <span className="skill-code" aria-hidden="true">
                        {CODES[category.category] || '··'}
                      </span>

                      <span className="skill-heading-text">
                        <span className="skill-name">{category.category}</span>
                        <span className="skill-desc">{category.description}</span>
                      </span>

                      {hasSubSkills && (
                        <span className="skill-chevron" aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </h2>

                  {hasSubSkills && isOpen && (
                    <div className="sub-skills">
                      {category.subSkills.map((sub) => (
                        <div className="sub-skill" key={sub.name}>
                          <h3>{sub.name}</h3>
                          <p>{sub.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="tools-section">
        <div className="container">
          <h2 className="tools-title">Outils au quotidien</h2>
          <ul className="tools-grid">
            {TOOLS.map((tool) => (
              <li key={tool} className="mono-tag">{tool}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default SkillsPage;
