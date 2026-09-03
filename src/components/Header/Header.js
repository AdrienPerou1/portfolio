import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/projects', label: 'Projets' },
    { path: '/skills', label: 'Compétences' },
    { path: '/cv', label: 'CV' },
  ];

  return (
    <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">AP</span>
          <span className="logo-dot"></span>
        </Link>

        <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul>
            {navLinks.map((link, index) => (
              <li key={link.path} style={{ animationDelay: `${index * 0.1}s` }}>
                <Link
                  to={link.path}
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  <span className="nav-link-text">{link.label}</span>
                  <span className="nav-link-underline"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
