import React from 'react';
import './CVPage.css';

function CVPage() {
  return (
    <div className="cv-page">
      {/* Hero Section */}
      <section className="cv-hero">
        <div className="hero-content">
          <span className="section-label">Curriculum Vitae</span>
          <h1>Mon CV</h1>
          <p className="hero-subtitle">
            Téléchargez mon CV pour en savoir plus sur mon parcours, mes formations et mes expériences.
          </p>

          <a href="cv/Cv_PEROU.pdf" download className="download-button">
            <span className="btn-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </span>
            <span className="btn-text">Télécharger le CV (PDF)</span>
            <span className="btn-glow"></span>
          </a>
        </div>
      </section>

      {/* CV Preview */}
      <section className="cv-preview-section">
        <div className="container">
          <div className="cv-preview-wrapper">
            <div className="cv-container">
              <div className="cv-page-wrapper">
                <img src="cv/1.png" alt="CV page 1" className="cv-image" />
                <div className="page-number">Page 1</div>
              </div>
              <div className="cv-page-wrapper">
                <img src="cv/2.png" alt="CV page 2" className="cv-image" />
                <div className="page-number">Page 2</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CVPage;