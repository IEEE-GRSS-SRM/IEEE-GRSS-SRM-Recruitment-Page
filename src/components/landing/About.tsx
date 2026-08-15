import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: textRef.current?.children,
              translateY: [40, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: anime.stagger(150),
              easing: 'easeOutQuart'
            });

            anime({
              targets: statsRef.current?.children,
              translateY: [20, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: anime.stagger(100, { start: 400 }),
              easing: 'easeOutQuart'
            });

            const counters = document.querySelectorAll('.stat-counter');
            counters.forEach(counter => {
              const target = parseInt(counter.getAttribute('data-target') || '0', 10);
              const suffix = counter.getAttribute('data-suffix') || '';
              anime({
                targets: counter,
                innerHTML: [0, target],
                round: 1,
                easing: 'easeOutExpo',
                duration: 2500,
                delay: 600,
                update: function (a) {
                  if (counter) {
                    counter.innerHTML = a.animations[0].currentValue + suffix;
                  }
                }
              });
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 relative z-10 border-t border-white/[0.02]">
      <div className="max-w-6xl mx-auto flex flex-col gap-24">

        <div ref={textRef} className="space-y-10 max-w-3xl">
          <h2 className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase opacity-0">Our Mission</h2>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.2] opacity-0">
            Pioneering the future of technology, research, and earth sciences.
          </h3>
          <p className="text-lg text-gray-400 leading-relaxed font-light opacity-0">
            The IEEE Geoscience and Remote Sensing Society (GRSS) at SRM is a collective of builders, researchers, and visionaries. We don't just learn about the future we actively build it through rigorous engineering and creative design.
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 py-12 border-y border-white/[0.05]">
          {[
            { target: 100, suffix: '+', line1: 'No of', line2: 'Members' },
            { target: 5, suffix: '+', line1: 'Events', line2: 'Conducted' },
            { target: 500, suffix: '+', line1: 'Total', line2: 'Audience' },
            { target: 2, suffix: '', line1: 'Projects', line2: 'Completed' }
          ].map((stat, i) => (
            <div key={i} className="opacity-0 flex items-center gap-4">
              <div
                className="stat-counter text-5xl md:text-7xl font-bold tracking-tight text-[#e2e2e2] tabular-nums"
                data-target={stat.target}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </div>
              <div className="text-sm md:text-base text-gray-400 leading-tight">
                {stat.line1}<br />{stat.line2}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
