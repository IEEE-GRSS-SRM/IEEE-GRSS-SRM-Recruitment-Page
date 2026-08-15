import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = anime.timeline({
      easing: 'easeOutExpo',
    });

    if (headlineRef.current) {
      tl.add({
        targets: headlineRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1000,
      });
    }

    if (subRef.current) {
      tl.add({
        targets: subRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
      }, '-=600');
    }

    if (ctaRef.current) {
      tl.add({
        targets: ctaRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
      }, '-=600');
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6">
      <div className="relative z-10 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Cinematic background orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-blue-600/20 rounded-full blur-[100px] md:blur-[120px] pointer-events-none opacity-50 z-0" />

        <div className="relative z-10 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] mb-12 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
          <span className="text-sm font-semibold text-white tracking-[0.2em] uppercase drop-shadow-md">Recruitments'26</span>
        </div>

        <h1 
          ref={headlineRef}
          className="relative z-10 text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tight text-white mb-8 leading-[0.9] opacity-0 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]"
        >
          Recruitments '26
        </h1>

        <p 
          ref={subRef}
          className="text-lg md:text-2xl text-gray-400 max-w-2xl mb-14 font-normal tracking-tight opacity-0"
        >
          Join a community of pioneers. We explore artificial intelligence, web technologies, creative design, and the cosmos. 
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 w-full">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdWP2w1zO00BhEu6uUtEw1IYWdlzdSsePfQp8sh_EXBoofP4A/viewform?usp=publish-editor"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95"
          >
            Register Now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </a>
          <a
            href="#domains"
            className="group px-8 py-4 bg-transparent text-white font-medium rounded-full w-full sm:w-auto transition-all duration-300 hover:bg-white/5 hover:text-gray-300"
          >
            Explore Divisions
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
