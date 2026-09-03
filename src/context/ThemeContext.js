import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => { } });

const STORAGE_KEY = 'theme';

// Le script inline de public/index.html a déjà posé data-theme avant le premier
// rendu. On lit cette valeur plutôt que de la recalculer, pour rester cohérent.
function readInitialTheme() {
  if (typeof document === 'undefined') return 'light';
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'dark' ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitialTheme);

  const applyTheme = useCallback((next) => {
    document.documentElement.setAttribute('data-theme', next);
    setTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // Stockage indisponible (navigation privée) : le thème reste valable
      // pour la session en cours.
    }
    applyTheme(next);
  }, [theme, applyTheme]);

  // Tant que l'utilisateur n'a pas fait de choix explicite, on suit l'OS.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch (e) {
        // Sans stockage, on ne peut pas savoir s'il y a eu un choix : on suit l'OS.
      }
      applyTheme(event.matches ? 'dark' : 'light');
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
