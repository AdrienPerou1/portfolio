import React from 'react';
import './EntityCard.css';

/**
 * L'élément signature du site : Adrien présenté comme un enregistrement
 * relationnel. Le relationnel (PostgreSQL, modélisation UML, ACID) est le fil
 * le plus répété de ses projets — la carte emprunte donc son vocabulaire
 * plutôt qu'un ornement décoratif générique.
 */

const FIELDS = [
  {
    name: 'formation',
    type: 'text',
    value: 'BUT Informatique — IUT Lannion',
  },
  {
    name: 'parcours',
    type: 'text',
    value: 'Données, structuration et analyse',
  },
  {
    name: 'stack',
    type: 'text[]',
    value: '{React, PHP, Python, Java, PostgreSQL, Docker}',
  },
  {
    name: 'domaines',
    type: 'text[]',
    value: '{data, IA, bases de données, full-stack}',
  },
  {
    name: 'langues',
    type: 'text[]',
    value: '{fr — natif, en — courant}',
  },
];

function EntityCard({ projectCount }) {
  const fields = [
    ...FIELDS,
    { name: 'projets', type: 'integer', value: String(projectCount) },
  ];

  return (
    <figure className="entity-card" aria-label="Fiche de présentation d'Adrien Pérou">
      <figcaption className="entity-card-head">
        <span className="entity-card-name">adrien_perou</span>
        <span className="entity-card-meta">1 ligne</span>
      </figcaption>

      <dl className="entity-card-body">
        {fields.map((field) => (
          <div className="entity-row" key={field.name}>
            <dt className="entity-key">{field.name}</dt>
            <span className="entity-type" aria-hidden="true">{field.type}</span>
            <dd className="entity-value">{field.value}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}

export default EntityCard;
