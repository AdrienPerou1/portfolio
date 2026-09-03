import React from 'react';
import { Link } from 'react-router-dom';
import EntityCard from '../EntityCard/EntityCard';
import projectsData from '../../projects.json';
import './HeroSection.css';

const STACK = ['React', 'PHP', 'Python', 'Java', 'PostgreSQL', 'Docker'];

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">BUT Informatique · IUT Lannion</span>

          <h1 className="hero-title">Adrien Pérou</h1>

          <p className="hero-role">Data &amp; IA — développeur full-stack</p>

          <p className="hero-description">
            Je conçois des systèmes qui vont de la modélisation des données à l'interface :
            un moteur de recommandation musicale entraîné sur 109 000 titres, une application
            de gestion construite pendant mon stage, des solveurs écrits en C.
            Le point commun, c'est la structure des données sous-jacente.
          </p>

          <div className="hero-cta">
            <Link to="/projects" className="btn btn-primary">
              Voir les projets
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/cv" className="btn btn-secondary">Parcours &amp; CV</Link>
          </div>

          <p className="hero-stack">
            <span className="hero-stack-label">stack</span>
            {STACK.join(' · ')}
          </p>
        </div>

        <div className="hero-figure">
          <EntityCard projectCount={projectsData.length} />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
