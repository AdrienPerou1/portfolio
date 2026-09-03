import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import projectsData from '../../projects.json';
import { useTheme } from '../../context/ThemeContext';
import { EMAIL, GITHUB_URL } from '../ContactSection/ContactSection';
import './CommandPalette.css';

function normalise(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);

  const commands = useMemo(() => {
    const pages = [
      { id: 'nav-home', group: 'Aller à', label: 'Accueil', run: () => navigate('/') },
      { id: 'nav-projects', group: 'Aller à', label: 'Projets', run: () => navigate('/projects') },
      { id: 'nav-skills', group: 'Aller à', label: 'Compétences', run: () => navigate('/skills') },
      { id: 'nav-cv', group: 'Aller à', label: 'Parcours', run: () => navigate('/cv') },
    ];

    const projects = projectsData.map((project) => ({
      id: `project-${project.id}`,
      group: 'Projets',
      label: project.title,
      hint: project.technologies.slice(0, 3).join(' · '),
      run: () => navigate(`/project/${project.id}`),
    }));

    const actions = [
      {
        id: 'action-theme',
        group: 'Actions',
        label: theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre',
        run: toggleTheme,
      },
      {
        id: 'action-email',
        group: 'Actions',
        label: 'Envoyer un email',
        hint: EMAIL,
        run: () => { window.location.href = `mailto:${EMAIL}`; },
      },
      {
        id: 'action-github',
        group: 'Actions',
        label: 'Ouvrir GitHub',
        run: () => window.open(GITHUB_URL, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'action-cv',
        group: 'Actions',
        label: 'Télécharger le CV',
        run: () => navigate('/cv'),
      },
    ];

    return [...pages, ...projects, ...actions];
  }, [navigate, theme, toggleTheme]);

  const results = useMemo(() => {
    const term = normalise(query.trim());
    if (!term) return commands;
    return commands.filter((command) =>
      normalise(`${command.label} ${command.hint || ''} ${command.group}`).includes(term)
    );
  }, [commands, query]);

  // Ouverture / fermeture au clavier.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen((open) => !open);
      } else if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setActiveIndex(0);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const runCommand = (command) => {
    close();
    command.run();
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index + 1) % results.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
    } else if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault();
      runCommand(results[activeIndex]);
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        className="palette-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir la recherche rapide"
      >
        <span>Rechercher</span>
        <kbd>Ctrl K</kbd>
      </button>
    );
  }

  let lastGroup = null;

  return (
    <div className="palette-overlay" onMouseDown={close} role="presentation">
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Recherche rapide"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="palette-field">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Page, projet, action…"
            aria-label="Rechercher une page, un projet ou une action"
          />
          <kbd>Esc</kbd>
        </div>

        <div className="palette-results" ref={listRef}>
          {results.length === 0 && (
            <p className="palette-empty">Rien ne correspond à « {query} ».</p>
          )}

          {results.map((command, index) => {
            const showGroup = command.group !== lastGroup;
            lastGroup = command.group;

            return (
              <React.Fragment key={command.id}>
                {showGroup && <p className="palette-group">{command.group}</p>}
                <button
                  type="button"
                  className="palette-item"
                  data-active={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => runCommand(command)}
                >
                  <span className="palette-label">{command.label}</span>
                  {command.hint && <span className="palette-hint">{command.hint}</span>}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
