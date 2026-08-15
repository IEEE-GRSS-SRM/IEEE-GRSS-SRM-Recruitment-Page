import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const SpaceBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const stars = 150; // Reduced star count for a cleaner, professional look
    const container = containerRef.current;
    
    container.innerHTML = '';

    for (let i = 0; i < stars; i++) {
      const star = document.createElement('div');
      star.classList.add('absolute', 'bg-white', 'rounded-full');
      
      const size = Math.random() * 1.5 + 0.5;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      
      container.appendChild(star);

      // Slower, more subtle twinkling
      anime({
        targets: star,
        opacity: [
          { value: Math.random() * 0.2 + 0.1, duration: Math.random() * 3000 + 2000, easing: 'easeInOutSine' },
          { value: Math.random() * 0.6 + 0.2, duration: Math.random() * 3000 + 2000, easing: 'easeInOutSine' }
        ],
        loop: true,
        direction: 'alternate',
        delay: Math.random() * 2000
      });
    }

    // Earth rotation based on scroll
    const handleScroll = () => {
      const earth = document.getElementById('earth-bg');
      if (earth) {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
        const rotation = scrollPercent * 180;
        earth.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Initial call to set correct rotation on load
    handleScroll();

    // Smooth, realistic shooting stars
    const createShootingStar = () => {
      if (!containerRef.current) return;
      const star = document.createElement('div');
      star.style.position = 'absolute';
      star.style.top = `${Math.random() * 40}%`;
      star.style.left = `${Math.random() * 50 + 30}%`;
      star.style.width = '160px';
      star.style.height = '2px';
      star.style.background = 'linear-gradient(to left, rgba(255,255,255,0), rgba(147,197,253,0.8), rgba(255,255,255,1))';
      star.style.borderRadius = '9999px';
      star.style.transform = 'rotate(-35deg)';
      star.style.boxShadow = '0 0 12px rgba(147,197,253,0.6)';
      star.style.pointerEvents = 'none';

      containerRef.current.appendChild(star);

      anime({
        targets: star,
        translateX: [0, -400],
        translateY: [0, 400],
        opacity: [
          { value: 0, duration: 0 },
          { value: 1, duration: 200 },
          { value: 0, duration: 800, delay: 300 }
        ],
        scaleX: [0.2, 1, 0.1],
        duration: 1400,
        easing: 'easeOutQuad',
        complete: () => {
          star.remove();
        }
      });
    };

    const shootingStarInterval = setInterval(createShootingStar, 6000);
    setTimeout(createShootingStar, 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(shootingStarInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#030303] pointer-events-none overflow-hidden">
      {/* Real NASA Earth Image */}
      <div 
        id="earth-bg"
        className="absolute w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] lg:w-[1400px] lg:h-[1400px] left-1/2 -translate-x-1/2 rounded-full opacity-60 mix-blend-screen"
        style={{
          top: '35%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2574&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: 'inset 0 0 100px 100px #030303', // Fade the edges into black
          WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
          maskImage: 'radial-gradient(circle, black 40%, transparent 70%)'
        }}
      />
      
      {/* Star container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full mix-blend-screen" />
      
      {/* Professional Film Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
        }}
      />
      
      {/* Deep vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] opacity-80" />
    </div>
  );
};

export default SpaceBackground;
