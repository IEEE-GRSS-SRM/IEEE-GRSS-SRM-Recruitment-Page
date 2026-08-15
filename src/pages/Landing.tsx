import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import About from '@/components/landing/About';
import Domains from '@/components/landing/Domains';
import Timeline from '@/components/landing/Timeline';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';
import SpaceBackground from '@/components/landing/SpaceBackground';

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-hidden relative">
      <SpaceBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Domains />
          <Timeline />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
