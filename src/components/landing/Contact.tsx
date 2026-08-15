import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Mail, MapPin, Globe, ArrowUpRight, Phone } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.contact-fade',
              translateY: [40, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: anime.stagger(150),
              easing: 'easeOutQuart'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 relative z-10 border-t border-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col max-w-2xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#5c6dff] mb-4 tracking-tight contact-fade opacity-0">Let's Work Together!</h2>
          <p className="text-lg md:text-xl text-gray-200 contact-fade opacity-0 mb-16">
            You can reach us via the following ways.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            {/* Phone Card */}
            <div className="contact-fade opacity-0 p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 flex flex-col items-center text-center gap-6 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group">
              <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]">
                <Phone className="text-blue-400" size={32} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-gray-400 text-sm mb-2 uppercase tracking-widest font-medium">Phone</h4>
                <p className="text-white text-xl md:text-2xl font-semibold tracking-tight">+919840912915</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="contact-fade opacity-0 p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 flex flex-col items-center text-center gap-6 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group">
              <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-500 shadow-[inset_0_0_20px_rgba(168,85,247,0.2)]">
                <Mail className="text-purple-400" size={32} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-gray-400 text-sm mb-2 uppercase tracking-widest font-medium">Email</h4>
                <a href="mailto:ieee.grss.cintel@srmist.edu.in" className="text-white text-lg md:text-xl font-semibold tracking-tight hover:text-purple-300 transition-colors break-words">
                  ieee.grss.cintel
                  <br />
                  @srmist.edu.in
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div className="contact-fade opacity-0 p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 flex flex-col items-center text-center gap-6 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group">
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-500 shadow-[inset_0_0_20px_rgba(34,197,94,0.2)]">
                <MapPin className="text-green-400" size={32} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-gray-400 text-sm mb-2 uppercase tracking-widest font-medium">Address</h4>
                <p className="text-white text-xl md:text-2xl font-semibold tracking-tight">SRM Nagar, Kattankulathur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
