import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import projectsData from '../projects.json';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './ProjectDetailsPage.css';

function ProjectDetailsPage() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Affiche une page d'erreur si le projet n'existe pas
  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Projet non trouvé</h1>
        <p>Le projet que vous recherchez n'existe pas.</p>
        <Link to="/projects" className="back-button">
          Retour aux projets
        </Link>
      </div>
    );
  }

  // Gestion des images (Screenshot prioritaire pour la présentation, image principale en fallback/alternatif)
  const images = [];
  if (project.screenshot) images.push({ src: project.screenshot, alt: "Capture d'écran du projet" });
  if (project.image && project.image !== project.screenshot) images.push({ src: project.image, alt: "Image principale" });

  // S'assurer qu'il y a au moins une image pour éviter le crash
  const currentImage = images[activeImageIndex] || { src: project.image, alt: project.title };

  return (
    <div className="project-details-page">
      {/* Section héro avec image de fond */}
      <section className="project-hero">
        <div className="hero-background">
          <img src={`${currentImage.src}`} alt="" className="hero-bg-image" />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <Link to="/projects" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Retour aux projets</span>
          </Link>

          <h1>{project.title}</h1>

          <div className="project-meta">
            <div className="technologies">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Voir sur GitHub</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Contenu principal du projet */}
      <section className="project-content">
        <div className="container">
          {/* Galerie d'images */}
          <div className="project-image-large">
            <img
              src={`${currentImage.src}`}
              alt={currentImage.alt}
              className="gallery-image"
            />

            {/* Indicateurs si plusieurs images */}
            {images.length > 1 && (
              <div className="gallery-indicators">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`gallery-dot ${index === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`Voir image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Section 01 : Description détaillée */}
          {project.detailedDescription && (
            <div className="content-section">
              <h2>
                <span className="section-number">01</span>
                Description du projet
              </h2>
              <p className="description-text">{project.detailedDescription}</p>
            </div>
          )}

          {/* Section 02 : Caractéristiques principales */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="content-section">
              <h2>
                <span className="section-number">02</span>
                Caractéristiques principales
              </h2>
              <ul className="features-list">
                {project.keyFeatures.map((feature, index) => (
                  <li key={index}>
                    <span className="feature-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 03 : Ce que j'ai appris */}
          {project.whatILearned && (
            <div className="content-section">
              <h2>
                <span className="section-number">03</span>
                Ce que j'ai appris
              </h2>
              <div className="learning-card">
                <p>{project.whatILearned}</p>
              </div>
            </div>
          )}

          {/* Section 04 : Extrait de code */}
          {project.codeSnippet && (
            <div className="content-section">
              <h2>
                <span className="section-number">04</span>
                Extrait de code
              </h2>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-lang">{project.codeSnippet.language}</span>
                  <div className="code-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <SyntaxHighlighter
                  language={project.codeSnippet.language}
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0 0 12px 12px',
                    fontSize: '0.95rem',
                  }}
                >
                  {project.codeSnippet.code}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          {/* Navigation vers la liste des projets */}
          <div className="project-navigation">
            <Link to="/projects" className="nav-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Tous les projets</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectDetailsPage;