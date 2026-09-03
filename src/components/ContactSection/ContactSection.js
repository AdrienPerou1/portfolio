import React, { useState, useRef, useEffect } from 'react';
import './ContactSection.css';

export const EMAIL = 'adrienperou1@gmail.com';
export const GITHUB_URL = 'https://github.com/AdrienPerou1';

function ContactSection() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Presse-papiers refusé : le lien mailto reste utilisable.
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-panel">
          <div className="contact-intro">
            <span className="eyebrow">Contact</span>
            <h2>Parlons-en</h2>
            <p>
              Une question sur un projet, une opportunité, ou juste envie d'échanger :
              écrivez-moi, je réponds.
            </p>
          </div>

          <ul className="contact-list">
            <li className="contact-row">
              <span className="contact-key">email</span>
              <a href={`mailto:${EMAIL}`} className="contact-value">{EMAIL}</a>
              <button type="button" className="contact-copy" onClick={copyEmail}>
                {copied ? 'Copié' : 'Copier'}
              </button>
            </li>
            <li className="contact-row">
              <span className="contact-key">github</span>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-value"
              >
                github.com/AdrienPerou1
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
