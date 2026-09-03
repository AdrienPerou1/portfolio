import React from 'react';
import { Link } from 'react-router-dom';
import { EMAIL, GITHUB_URL } from '../ContactSection/ContactSection';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="container footer-inner">
        <p className="footer-name">Adrien Pérou — Data &amp; IA, full-stack</p>

        <nav className="footer-links" aria-label="Liens de pied de page">
          <Link to="/projects">Projets</Link>
          <Link to="/skills">Compétences</Link>
          <Link to="/cv">Parcours</Link>
          <a href={`mailto:${EMAIL}`}>Email</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
