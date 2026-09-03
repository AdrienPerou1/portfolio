import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection/HeroSection';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import ContactSection from '../components/ContactSection/ContactSection';
import projectsData from '../projects.json';
import './HomePage.css';

// Les trois projets les plus représentatifs : IA/data, full-stack, algorithmique.
const FEATURED_IDS = ['muse-recommandation', 'beks-informatique', 'sudoku-c'];

function HomePage() {
  const featured = FEATURED_IDS
    .map((id) => projectsData.find((project) => project.id === id))
    .filter(Boolean);

  return (
    <div className="home-page">
      <HeroSection />

      <section className="featured-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Sélection</span>
              <h2>Trois projets qui résument le reste</h2>
            </div>
            <Link to="/projects" className="section-link">
              Les {projectsData.length} projets
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="featured-grid">
            {featured.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}

export default HomePage;
