import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { DomainGraphic } from './DomainGraphic';

const domains = [
  {
    title: 'AI/ML',
    description: 'Build predictive models, dive into neural networks, and explore the future of artificial intelligence in earth sciences.',
    color: 'text-cyan-400',
    glowColor: 'group-hover:shadow-[0_0_50px_rgba(34,211,238,0.25)]',
    borderColor: 'group-hover:border-cyan-500/30',
  },
  {
    title: 'Web Dev',
    description: 'Craft high-performance, accessible, and stunning web experiences.',
    color: 'text-blue-400',
    glowColor: 'group-hover:shadow-[0_0_50px_rgba(59,130,246,0.25)]',
    borderColor: 'group-hover:border-blue-500/30',
  },
  {
    title: 'Creatives',
    description: 'Define our visual identity through UI/UX design, 3D modeling, and motion graphics.',
    color: 'text-purple-400',
    glowColor: 'group-hover:shadow-[0_0_50px_rgba(168,85,247,0.25)]',
    borderColor: 'group-hover:border-purple-500/30',
  },
  {
    title: 'Content & Research',
    description: 'Investigate complex topics and distill them into compelling technical papers and blogs.',
    color: 'text-teal-400',
    glowColor: 'group-hover:shadow-[0_0_50px_rgba(20,184,166,0.25)]',
    borderColor: 'group-hover:border-teal-500/30',
  },
  {
    title: 'Corporate',
    description: 'Forge strategic partnerships and manage external relations to fund our ambitious projects.',
    color: 'text-yellow-500',
    glowColor: 'group-hover:shadow-[0_0_50px_rgba(234,179,8,0.25)]',
    borderColor: 'group-hover:border-yellow-500/30',
  },
  {
    title: 'Events',
    description: 'Orchestrate massive hackathons and tech talks. Handle logistics and execution seamlessly.',
    color: 'text-red-400',
    glowColor: 'group-hover:shadow-[0_0_50px_rgba(239,68,68,0.25)]',
    borderColor: 'group-hover:border-red-500/30',
  }
];

const Domains = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.bento-card',
              translateY: [60, 0],
              scale: [0.95, 1],
              opacity: [0, 1],
              duration: 1200,
              delay: anime.stagger(150),
              easing: 'easeOutExpo'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="domains" ref={sectionRef} className="py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase mb-4">Divisions</h2>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white max-w-xl">
            Specialized teams working in unison.
          </h3>
        </div>

        <div className="flex flex-col gap-24 mt-24">
          {domains.map((domain, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index}
                className="bento-card relative w-full max-w-4xl mx-auto rounded-[40px] bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 md:p-14 opacity-0 hover:border-white/30 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group"
              >
                {/* Satellite Decorative Image floating on border */}
                <img 
                  src="/assets/Satellite-PNG-HD.png" 
                  alt="Satellite" 
                  className={`absolute -top-16 md:-top-24 w-32 md:w-56 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] z-20 group-hover:-translate-y-4 transition-transform duration-700 ${isEven ? 'right-8 md:right-24' : 'left-8 md:left-24'}`}
                />
                
                <div className={`flex flex-col md:flex-row items-center gap-12 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Text side */}
                  <div className={`flex-1 text-center md:text-left ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <h4 className={`text-4xl md:text-5xl font-bold mb-4 tracking-tight ${domain.color}`}>
                      {domain.title}
                    </h4>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">
                      {domain.description}
                    </p>
                  </div>

                  {/* Graphic Side */}
                  <div className="flex-shrink-0 relative">
                    <div className={`w-40 h-40 md:w-60 md:h-60 rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center bg-black/50 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] ${domain.borderColor} ${domain.glowColor} transition-all duration-500 group-hover:scale-105`}>
                      <DomainGraphic domain={domain.title} />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Domains;
