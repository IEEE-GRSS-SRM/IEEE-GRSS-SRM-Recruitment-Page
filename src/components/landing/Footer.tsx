import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/[0.02] bg-[#030303] pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 mb-20">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <img src="/assets/favicon.ico" alt="IEEE-GRSS Logo" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-medium tracking-tight text-white">
                IEEE-GRSS
              </span>
            </div>
            <p className="text-gray-500 font-light text-base max-w-sm leading-relaxed">
              The premier student organization for exploration, innovation, and research in AI, Web Development, and Earth Sciences at SRM.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6 text-base tracking-wide">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-gray-500 hover:text-white transition-colors text-base">Mission</a></li>
              <li><a href="#domains" className="text-gray-500 hover:text-white transition-colors text-base">Divisions</a></li>
              <li><a href="#contact" className="text-gray-500 hover:text-white transition-colors text-base">Contact</a></li>
              <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdWP2w1zO00BhEu6uUtEw1IYWdlzdSsePfQp8sh_EXBoofP4A/viewform?usp=publish-editor" target="_blank" rel="noreferrer" className="text-white hover:text-gray-300 transition-colors text-base font-medium">Register Now</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} IEEE GRSS SRM Student Chapter. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-gray-500">
            <a href="https://www.instagram.com/ieeegrss_srmist?igsh=MTJ6dDBoYjk0cW1vZw==" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={22} strokeWidth={1.5} />
            </a>
            <a href="https://www.linkedin.com/company/ieee-grss-srmist/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin size={22} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
