import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found-page container">
      <span className="eyebrow">Erreur 404</span>
      <h1>Cette page n'existe pas</h1>
      <p>
        Le lien est peut-être obsolète, ou l'adresse comporte une faute de frappe.
      </p>
      <div className="not-found-actions">
        <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
        <Link to="/projects" className="btn btn-secondary">Voir les projets</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
