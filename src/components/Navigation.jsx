import React, { useState, useEffect } from 'react';
import { Shield, Sprout, Cpu, Layers, Award, ArrowUpRight } from 'lucide-react';
import ReducedMotionToggle from './ReducedMotionToggle';

export default function Navigation({ reducedMotion, setReducedMotion, activeSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'problem', label: 'Problem', icon: Sprout },
    { id: 'solution', label: 'Solution', icon: Shield },
    { id: 'pillars', label: 'Pillars', icon: Cpu },
    { id: 'tech', label: 'Stack', icon: Layers },
    { id: 'impact', label: 'Impact', icon: Award },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#081C15]/80 backdrop-blur-md border-b border-[#40916C]/20 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1B4332] to-[#40916C] border border-[#B9FBC0]/40 flex items-center justify-center shadow-lg shadow-[#40916C]/20 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-[#B9FBC0]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-[#B9FBC0] transition-colors">
                AgriShield
              </span>
              <span className="bg-[#B9FBC0] text-[#081C15] font-extrabold text-[10px] px-1.5 py-0.5 rounded tracking-wider uppercase">
                AI
              </span>
            </div>
            <p className="text-[10px] text-[#74C69D] font-medium tracking-wide hidden sm:block">
              Crop Health Ecosystem
            </p>
          </div>
        </div>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-3 py-1.5 rounded-full border border-[#40916C]/30">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#40916C] text-white shadow-md shadow-[#40916C]/40'
                    : 'text-[#D8F3DC]/80 hover:text-white hover:bg-[#1B4332]/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions & Accessibility */}
        <div className="flex items-center gap-3">
          <ReducedMotionToggle
            reducedMotion={reducedMotion}
            onToggle={() => setReducedMotion(!reducedMotion)}
          />

          <button 
            onClick={() => scrollToSection('cta')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-[#40916C] to-[#52B788] text-white shadow-md shadow-[#40916C]/30 hover:shadow-[#B9FBC0]/40 hover:scale-105 transition-all"
          >
            <span>Get Started</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
