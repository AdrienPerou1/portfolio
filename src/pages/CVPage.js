import React from 'react';
import ContactSection from '../components/ContactSection/ContactSection';
import assetUrl from '../assetUrl';
import './CVPage.css';

const TIMELINE = [
  {
    period: '2025',
    kind: 'Expérience',
    title: "Stage — Bek's Informatique",
    detail:
      "Application web complète : vitrine des produits et gestion interne des rendez-vous. "
      + 'Front React, API REST en PHP natif, base PostgreSQL, notifications automatiques '
      + 'par PHPMailer et SMTP.',
    tags: ['React', 'PHP', 'PostgreSQL', 'SMTP'],
  },
  {
    period: '2023 – 2025',
    kind: 'Formation',
    title: 'BUT Informatique — IUT de Lannion',
    detail:
      'Parcours Données, structuration et analyse : bases de données relationnelles et NoSQL, '
      + 'machine learning, algorithmique, développement web et administration réseau.',
    tags: ['Data', 'IA', 'Bases de données', 'Réseau'],
  },
  {
    period: '2020 – 2023',
    kind: 'Formation',
    title: 'Baccalauréat général — Lycée René Cassin, Montfort',
    detail: 'Obtenu avec mention.',
    tags: [],
  },
];

const LANGUAGES = [
  { name: 'Français', level: 'langue maternelle' },
  { name: 'Anglais', level: 'courant' },
];

const INTERESTS = ['Jeux de gestion', 'Intelligence artificielle', 'Histoire', 'Cyclisme', 'Jeux compétitifs'];

function CVPage() {
  return (
    <div className="cv-page">
      <header className="page-header">
        <div className="container">
          <span className="eyebrow">Parcours</span>
          <h1>Formation et expérience</h1>
          <p className="lede">
            Le détail complet est dans le CV en PDF ; l'essentiel tient ci-dessous.
          </p>
          <a href={assetUrl('cv/Cv_PEROU.pdf')} download className="btn btn-primary cv-download">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Télécharger le CV (PDF)
          </a>
        </div>
      </header>

      <section className="timeline-section">
        <div className="container">
          <ol className="timeline">
            {TIMELINE.map((entry) => (
              <li className="timeline-entry" key={entry.title}>
                <div className="timeline-aside">
                  <span className="timeline-period">{entry.period}</span>
                  <span className="timeline-kind">{entry.kind}</span>
                </div>

                <div className="timeline-body">
                  <h2 className="timeline-title">{entry.title}</h2>
                  <p className="timeline-detail">{entry.detail}</p>
                  {entry.tags.length > 0 && (
                    <div className="timeline-tags">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="mono-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cv-facts">
        <div className="container">
          <div className="facts-grid">
            <div className="fact-block">
              <h2>Langues</h2>
              <ul>
                {LANGUAGES.map((lang) => (
                  <li key={lang.name}>
                    <span className="fact-key">{lang.name}</span>
                    <span className="fact-value">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="fact-block">
              <h2>Centres d'intérêt</h2>
              <div className="fact-tags">
                {INTERESTS.map((interest) => (
                  <span key={interest} className="mono-tag">{interest}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cv-preview-section">
        <div className="container">
          <h2 className="preview-title">Le CV en entier</h2>
          <div className="cv-preview">
            <img src={assetUrl('cv/1.png')} alt="CV d'Adrien Pérou, page 1" className="cv-image" loading="lazy" />
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}

export default CVPage;
