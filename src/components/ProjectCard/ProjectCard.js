import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

function ProjectCard({ project, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const currentRef = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link to={`/project/${project.id}`} className="project-card-link">
      <article
        ref={cardRef}
        className={`project-card ${isVisible ? 'is-visible' : ''}`}
        style={{
          animationDelay: `${index * 0.1}s`,
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`,
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Glow effect */}
        <div className="card-glow"></div>

        {/* Image */}
        <div className="project-image-wrapper">
          <img
            src={`${project.thumbnail || project.image}`}
            alt={project.title}
            className="project-image"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${project.image}`;
            }}
          />
          <div className="image-overlay"></div>
        </div>

        {/* Content */}
        <div className="project-info">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>

          {/* Technologies */}
          <div className="project-technologies">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <span key={techIndex} className="project-tech-tag">{tech}</span>
            ))}
            {project.technologies.length > 4 && (
              <span className="project-tech-tag more">+{project.technologies.length - 4}</span>
            )}
          </div>

          {/* View more indicator */}
          <div className="view-more">
            <span>Voir le projet</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ProjectCard;