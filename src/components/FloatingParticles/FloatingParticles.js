import React from 'react';
import './FloatingParticles.css';

const FloatingParticles = () => {
    // Generate random particles
    const particles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: Math.random() * 20 + 20,
        opacity: Math.random() * 0.3 + 0.1,
    }));

    return (
        <div className="floating-particles">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="particle"
                    style={{
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        left: `${particle.left}%`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                        opacity: particle.opacity,
                    }}
                />
            ))}

            {/* Geometric shapes */}
            <div className="shape shape-1" />
            <div className="shape shape-2" />
            <div className="shape shape-3" />
            <div className="shape shape-4" />
        </div>
    );
};

export default FloatingParticles;
