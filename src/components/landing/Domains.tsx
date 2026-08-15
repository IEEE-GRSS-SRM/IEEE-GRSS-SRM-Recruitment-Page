import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Brain, Code2, Paintbrush, FileText, Briefcase, Calendar } from 'lucide-react';

const domains = [
  {
    title: 'AI/ML',
    description: 'Build predictive models, dive into neural networks, and explore the future of artificial intelligence in earth sciences.',
    Icon: Brain,
    color: 'text-red-500',
  },
  {
    title: 'Web Dev',
    description: 'Craft high-performance, accessible, and stunning web experiences.',
    Icon: Code2,
    color: 'text-blue-500',
  },
  {
    title: 'Creatives',
    description: 'Define our visual identity through UI/UX design, 3D modeling, and motion graphics.',
    Icon: Paintbrush,
    color: 'text-white',
  },
  {
    title: 'Content & Research',
    description: 'Investigate complex topics and distill them into compelling technical papers and blogs.',
    Icon: FileText,
    color: 'text-purple-400',
  },
  {
    title: 'Corporate',
    description: 'Forge strategic partnerships and manage external relations to fund our ambitious projects.',
    Icon: Briefcase,
    color: 'text-yellow-500',
  },
  {
    title: 'Events',
    description: 'Orchestrate massive hackathons and tech talks. Handle logistics and execution seamlessly.',
    Icon: Calendar,
    color: 'text-cyan-400',
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

                  {/* Icon Side */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/10 flex items-center justify-center bg-black/50 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] group hover:border-white/30 transition-all duration-500">
                      <div className="absolute inset-0 rounded-full border-2 border-white/5 group-hover:scale-110 transition-transform duration-500" />
                      <domain.Icon className="text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300" size={56} strokeWidth={1} />
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
