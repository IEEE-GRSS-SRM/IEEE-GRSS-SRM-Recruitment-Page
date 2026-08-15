import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer transition-transform hover:scale-105" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/assets/favicon.ico" alt="IEEE-GRSS Logo" className="w-9 h-9 object-contain group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all" />
          <span className="text-xl font-bold tracking-wider text-white">
            IEEE-GRSS
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('about')} className="relative text-sm text-gray-300 hover:text-white transition-colors group">
            Mission
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => scrollTo('domains')} className="relative text-sm text-gray-300 hover:text-white transition-colors group">
            Domains
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => scrollTo('contact')} className="relative text-sm text-gray-300 hover:text-white transition-colors group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </button>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdWP2w1zO00BhEu6uUtEw1IYWdlzdSsePfQp8sh_EXBoofP4A/viewform?usp=publish-editor"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            Register Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gray-300 transition-colors">
            {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[400px] py-8 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col items-center gap-8">
          <button onClick={() => scrollTo('about')} className="text-lg text-gray-300 hover:text-white transition-colors">
            Mission
          </button>
          <button onClick={() => scrollTo('domains')} className="text-lg text-gray-300 hover:text-white transition-colors">
            Domains
          </button>
          <button onClick={() => scrollTo('contact')} className="text-lg text-gray-300 hover:text-white transition-colors">
            Contact
          </button>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdWP2w1zO00BhEu6uUtEw1IYWdlzdSsePfQp8sh_EXBoofP4A/viewform?usp=publish-editor"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] mt-2"
          >
            Register Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
