import React, { useState, useMemo } from 'react';
import projectsData from '../projects.json';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import './ProjectsPage.css';

const MAIN_TECH = ['C', 'Python', 'PHP', 'React', 'JavaScript', 'Java', 'PostgreSQL', 'HTML', 'CSS'];

// Recherche insensible aux accents : « donnees » doit trouver « données ».
function normalise(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const technologies = useMemo(
    () => [...new Set(projectsData.flatMap((p) => p.technologies))]
      .filter((tech) => MAIN_TECH.includes(tech))
      .sort(),
    []
  );

  const filtered = useMemo(() => {
    const term = normalise(query.trim());

    return projectsData.filter((project) => {
      const matchesTech = filter === 'all' || project.technologies.includes(filter);
      if (!matchesTech) return false;
      if (!term) return true;

      const haystack = normalise(
        [project.title, project.description, ...project.technologies].join(' ')
      );
      return haystack.includes(term);
    });
  }, [filter, query]);

  const resetAll = () => {
    setFilter('all');
    setQuery('');
  };

  return (
    <div className="projects-page">
      <header className="page-header">
        <div className="container">
          <span className="eyebrow">Portfolio</span>
          <h1>Projets</h1>
          <p className="lede">
            {projectsData.length} projets menés pendant ma formation, mon stage et sur mon
            temps libre — de l'analyse de données à l'algorithmique bas niveau.
          </p>
        </div>
      </header>

      <section className="projects-controls">
        <div className="container">
          <div className="search-field">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un projet, une techno…"
              aria-label="Rechercher un projet"
            />
          </div>

          <div className="filter-buttons" role="group" aria-label="Filtrer par technologie">
            <button
              type="button"
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
              aria-pressed={filter === 'all'}
            >
              Tous <span className="filter-count">{projectsData.length}</span>
            </button>

            {technologies.map((tech) => {
              const count = projectsData.filter((p) => p.technologies.includes(tech)).length;
              return (
                <button
                  key={tech}
                  type="button"
                  className={`filter-btn ${filter === tech ? 'active' : ''}`}
                  onClick={() => setFilter(tech)}
                  aria-pressed={filter === tech}
                >
                  {tech} <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="projects-grid-section">
        <div className="container">
          <p className="results-count" role="status">
            {filtered.length === 0
              ? 'Aucun projet ne correspond'
              : `${filtered.length} projet${filtered.length > 1 ? 's' : ''}`}
          </p>

          {filtered.length > 0 ? (
            <div className="projects-grid">
              {filtered.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Essayez un autre terme, ou repartez de la liste complète.</p>
              <button type="button" className="btn btn-secondary" onClick={resetAll}>
                Tout afficher
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProjectsPage;
