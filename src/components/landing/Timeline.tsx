import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { FileEdit, Mail, ClipboardList, Users, Handshake } from 'lucide-react';

const steps = [
  {
    title: 'Register',
    description: 'Answer the questions in the G-Form to get your journey started!',
    Icon: FileEdit,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
  },
  {
    title: 'Check Mail',
    description: 'Keep yourself up to date by checking your registered email on the regular. (Sneak a peek in the spam folder too)',
    Icon: Mail,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
  },
  {
    title: 'Interview',
    description: 'You are just one step away. Keep calm and get ready for a small, casual interview.',
    Icon: Users,
    color: 'text-orange-400',
    borderColor: 'border-orange-500/30',
  },
  {
    title: 'Welcome',
    description: 'Look at that! You are now officially a part of the IEEE GRSS SRM family. Many surprises await on the other side!',
    Icon: Handshake,
    color: 'text-green-400',
    borderColor: 'border-green-500/30',
  }
];

const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.timeline-item',
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: anime.stagger(200),
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.timeline-line',
              height: ['0%', '100%'],
              duration: 1500,
              easing: 'easeInOutQuart'
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
    <section id="timeline" ref={sectionRef} className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase mb-4">The Journey</h2>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white">
            Road to IEEE GRSS
          </h3>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
            <div className="timeline-line w-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 h-0" />
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="timeline-item opacity-0 relative flex items-center w-full">
                  
                  {/* Icon Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] group hover:scale-110 transition-transform duration-300">
                    <div className={`w-12 h-12 rounded-full border ${step.borderColor} bg-white/5 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/10 transition-colors`}>
                      <step.Icon className={`${step.color}`} size={20} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex w-full justify-between items-center">
                    {isEven ? (
                      <>
                        <div className="w-[42%]">
                          <div className="p-6 md:p-8 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 text-right hover:border-white/25 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                            <h4 className={`text-2xl font-bold mb-3 tracking-tight ${step.color}`}>{step.title}</h4>
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">{step.description}</p>
                          </div>
                        </div>
                        <div className="w-[42%]" />
                      </>
                    ) : (
                      <>
                        <div className="w-[42%]" />
                        <div className="w-[42%]">
                          <div className="p-6 md:p-8 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 text-left hover:border-white/25 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                            <h4 className={`text-2xl font-bold mb-3 tracking-tight ${step.color}`}>{step.title}</h4>
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">{step.description}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden w-full pl-20 pr-2">
                    <div className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                      <h4 className={`text-xl font-bold mb-2 tracking-tight ${step.color}`}>{step.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed font-medium">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
