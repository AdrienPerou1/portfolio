import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TypingEffect from '../TypingEffect/TypingEffect';
import './HeroSection.css';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const words = ["Adrien Pérou", "Data & IA", "Développeur Full-Stack"];

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`hero-section ${isLoaded ? 'loaded' : ''}`}>
      {/* Decorative elements */}
      <div className="hero-decoration">
        <div className="deco-circle deco-circle-1"></div>
        <div className="deco-circle deco-circle-2"></div>
        <div className="deco-line deco-line-1"></div>
        <div className="deco-line deco-line-2"></div>
      </div>

      <div className="hero-content">
        {/* Badge d'introduction */}
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span>Disponible pour stage</span>
        </div>

        {/* Main title */}
        <p className="hero-intro">Bonjour, je suis</p>
        <h1 className="hero-title">
          <TypingEffect words={words} />
        </h1>

        {/* Description */}
        <p className="hero-description">
          Étudiant en <strong>3ème année de BUT Informatique</strong> à l'IUT de Lannion,
          parcours <strong>Données, structuration et analyse</strong>.
          Passionné par le développement web, la data et l'intelligence artificielle.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta">
          <Link to="/projects" className="cta-button primary">
            <span>Voir mes projets</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link to="/cv" className="cta-button secondary">
            <span>Télécharger CV</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
          </Link>
        </div>

        {/* Tech stack preview */}
        <div className="hero-tech-stack">
          <span className="tech-label">Technologies :</span>
          <div className="tech-tags">
            {['React', 'PHP', 'Python', 'Java', 'PostgreSQL', 'Docker'].map((tech, index) => (
              <span
                key={tech}
                className="tech-tag"
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Info cards - positioned absolutely at the bottom */}
      <div className="hero-info-grid">
        <div className="info-card">
          <span className="info-icon">🎓</span>
          <div className="info-content">
            <span className="info-label">Formation</span>
            <span className="info-value">BUT Informatique - IUT Lannion</span>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">📍</span>
          <div className="info-content">
            <span className="info-label">Localisation</span>
            <span className="info-value">Bretagne, France</span>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">💻</span>
          <div className="info-content">
            <span className="info-label">Spécialisation</span>
            <span className="info-value">Data & IA / Full-Stack</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;