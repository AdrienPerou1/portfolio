import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import projectsData from '../projects.json';
import { useTheme } from '../context/ThemeContext';
import assetUrl from '../assetUrl';
import './ProjectDetailsPage.css';

function ProjectDetailsPage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const project = projectsData.find((p) => p.id === id);
  const currentIndex = projectsData.findIndex((p) => p.id === id);

  if (!project) {
    return (
      <div className="project-not-found container">
        <span className="eyebrow">Erreur 404</span>
        <h1>Ce projet n'existe pas</h1>
        <p>Le lien est peut-être obsolète, ou l'identifiant a changé.</p>
        <Link to="/projects" className="btn btn-primary">Voir tous les projets</Link>
      </div>
    );
  }

  const images = [];
  if (project.screenshot) images.push({ src: project.screenshot, alt: `${project.title} — capture d'écran` });
  if (project.image && project.image !== project.screenshot) {
    images.push({ src: project.image, alt: `${project.title} — visuel` });
  }
  const currentImage = images[activeImageIndex] || { src: project.image, alt: project.title };

  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <article className="project-details-page">
      <header className="page-header">
        <div className="container">
          <Link to="/projects" className="back-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M11 5l-7 7 7 7" />
            </svg>
            Tous les projets
          </Link>

          <h1>{project.title}</h1>

          <div className="project-meta">
            <div className="technologies">
              {project.technologies.map((tech) => (
                <span key={tech} className="mono-tag">{tech}</span>
              ))}
            </div>

            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Code source
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="container project-body">
        <figure className="project-figure">
          <img src={assetUrl(currentImage.src)} alt={currentImage.alt} className="gallery-image" />

          {images.length > 1 && (
            <div className="gallery-controls">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className={`gallery-dot ${index === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Voir l'image ${index + 1} sur ${images.length}`}
                  aria-pressed={index === activeImageIndex}
                />
              ))}
            </div>
          )}
        </figure>

        <div className="project-prose">
          {project.detailedDescription && (
            <section className="content-section">
              <h2>Le projet</h2>
              <p>{project.detailedDescription}</p>
            </section>
          )}

          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <section className="content-section">
              <h2>Ce qu'il fait</h2>
              <ul className="features-list">
                {project.keyFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {project.whatILearned && (
            <section className="content-section">
              <h2>Ce que j'en ai retiré</h2>
              <blockquote className="learning-card">{project.whatILearned}</blockquote>
            </section>
          )}

          {project.codeSnippet && (
            <section className="content-section">
              <h2>Un extrait</h2>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-lang">{project.codeSnippet.language}</span>
                </div>
                <SyntaxHighlighter
                  language={project.codeSnippet.language}
                  style={theme === 'dark' ? oneDark : oneLight}
                  customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    fontSize: '0.85rem',
                    background: 'transparent',
                  }}
                >
                  {project.codeSnippet.code}
                </SyntaxHighlighter>
              </div>
            </section>
          )}
        </div>

        <nav className="project-navigation" aria-label="Projet suivant">
          <Link to={`/project/${nextProject.id}`} className="next-project">
            <span className="next-label">Projet suivant</span>
            <span className="next-title">{nextProject.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}

export default ProjectDetailsPage;
