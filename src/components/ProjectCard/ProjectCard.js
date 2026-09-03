import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import assetUrl from '../../assetUrl';
import './ProjectCard.css';

function ProjectCard({ project, index }) {
  const [isVisible, setIsVisible] = useState(false);
  // Le repli passe par un état : muter `src` sur le nœud DOM depuis onError
  // repart en boucle, React réappliquant la prop au rendu suivant.
  const [imageSrc, setImageSrc] = useState(project.thumbnail || project.image);
  const cardRef = useRef(null);

  useEffect(() => {
    const currentRef = cardRef.current;
    if (!currentRef) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, []);

  const indexLabel = String(index + 1).padStart(2, '0');

  return (
    <article ref={cardRef} className={`project-card ${isVisible ? 'is-visible' : ''}`}>
      <Link to={`/project/${project.id}`} className="project-card-link">
        <div className="project-image-wrapper">
          <img
            src={assetUrl(imageSrc)}
            alt=""
            className="project-image"
            loading="lazy"
            onError={() => {
              if (imageSrc !== project.image) setImageSrc(project.image);
            }}
          />
        </div>

        <div className="project-info">
          <div className="project-heading">
            <span className="project-index" aria-hidden="true">#{indexLabel}</span>
            <h3 className="project-title">{project.title}</h3>
          </div>

          <p className="project-description">{project.description}</p>

          <div className="project-technologies">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="mono-tag">{tech}</span>
            ))}
            {project.technologies.length > 4 && (
              <span className="mono-tag">+{project.technologies.length - 4}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProjectCard;
