import React, { useState, useEffect } from 'react';
import './TypingEffect.css';

const TypingEffect = ({ words, typingSpeed = 150, deletingSpeed = 100, delay = 1000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const fullText = words[currentWordIndex];
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        timer = setTimeout(handleTyping, deletingSpeed);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        timer = setTimeout(handleTyping, typingSpeed);
      }

      if (!isDeleting && currentText === fullText) {
        clearTimeout(timer);
        timer = setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        clearTimeout(timer);
        timer = setTimeout(handleTyping, 500); // Delay before typing next word
      }
    };

    timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delay]);

  return (
    <span className="typing-effect">
      {currentText}
      <span className="typing-cursor"></span>
    </span>
  );
};

export default TypingEffect;