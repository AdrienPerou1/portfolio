import React, { useState } from 'react';
import projectsData from '../projects.json';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import './ProjectsPage.css';

function ProjectsPage() {
  const [filter, setFilter] = useState('all');

  // Get unique technologies and filter for main languages only
  const mainTechWhitelist = ['C', 'Python', 'PHP', 'React', 'JavaScript', 'Java', 'PostgreSQL', 'HTML', 'CSS'];
  const allTechnologies = [...new Set(projectsData.flatMap(p => p.technologies))]
    .filter(tech => mainTechWhitelist.includes(tech))
    .sort();

  // Filter projects
  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter(p => p.technologies.includes(filter));

  return (
    <div className="projects-page">
      {/* Hero section */}
      <section className="projects-hero">
        <div className="hero-content">
          <span className="section-label">Portfolio</span>
          <h1>Mes Projets</h1>
          <p className="hero-subtitle">
            Découvrez les projets que j'ai réalisés au cours de ma formation et de mes expériences personnelles.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="hero-decoration">
          <div className="deco-grid"></div>
        </div>
      </section>

      {/* Filters */}
      <section className="projects-filters">
        <div className="container">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Tous
              <span className="filter-count">{projectsData.length}</span>
            </button>
            {allTechnologies.map(tech => {
              const count = projectsData.filter(p => p.technologies.includes(tech)).length;
              return (
                <button
                  key={tech}
                  className={`filter-btn ${filter === tech ? 'active' : ''}`}
                  onClick={() => setFilter(tech)}
                >
                  {tech}
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="projects-grid-section">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectsPage;
