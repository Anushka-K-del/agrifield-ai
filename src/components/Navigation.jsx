import React, { useState, useEffect } from 'react';
import { Shield, Sprout, Cpu, Layers, Award, ArrowUpRight, Sparkles, User, History, LogOut, LogIn, UserPlus } from 'lucide-react';
import ReducedMotionToggle from './ReducedMotionToggle';
import { useAuth } from '../context/AuthContext';

export default function Navigation({ reducedMotion, setReducedMotion, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const { user, logOut, openAuthModal, openScanHistory, scanHistory } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'demo', label: 'Try Demo', icon: Sparkles },
    { id: 'how-it-works', label: 'How It Works', icon: Sprout },
    { id: 'audience', label: 'Audience', icon: Shield },
    { id: 'pillars', label: 'Pillars', icon: Cpu },
    { id: 'tech', label: 'Stack', icon: Layers },
    { id: 'impact', label: 'Impact', icon: Award },
    { id: 'future-scope', label: 'Future Scope', icon: ArrowUpRight },
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
          ? 'bg-[#081C15]/90 backdrop-blur-md border-b border-[#40916C]/30 py-2.5 shadow-xl'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#1B4332] to-[#40916C] border border-[#B9FBC0]/40 flex items-center justify-center shadow-lg shadow-[#40916C]/20 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-[#B9FBC0]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-[#B9FBC0] transition-colors">
                AgriShield
              </span>
              <span className="bg-[#B9FBC0] text-[#081C15] font-extrabold text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded tracking-wider uppercase">
                AI
              </span>
            </div>
            <p className="text-[9px] text-[#74C69D] font-mono tracking-wide hidden lg:block">
              SIH26131 • Software Track
            </p>
          </div>
        </div>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 glass-panel px-3 py-1.5 rounded-full border border-[#40916C]/30 bg-[#081C15]/70">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
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

        {/* Actions, Auth & Accessibility */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ReducedMotionToggle
            reducedMotion={reducedMotion}
            onToggle={() => setReducedMotion(!reducedMotion)}
          />

          {user ? (
            /* Logged In State */
            <div className="flex items-center gap-2">
              <button
                onClick={openScanHistory}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-[#B9FBC0] border border-[#B9FBC0]/30 text-xs font-bold transition-all cursor-pointer shadow-md"
                title="View My Scan History"
              >
                <History className="w-3.5 h-3.5 text-[#B9FBC0]" />
                <span className="hidden sm:inline">My Scans</span>
                {scanHistory.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#B9FBC0] text-[#081C15] text-[10px] font-black flex items-center justify-center">
                    {scanHistory.length}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-1.5 pl-1">
                <div className="w-7 h-7 rounded-lg bg-[#1B4332] border border-[#B9FBC0]/40 flex items-center justify-center text-sm shadow-sm" title={user.email}>
                  {user.avatar || '🌾'}
                </div>
                <span className="text-xs font-bold text-white max-w-[90px] truncate hidden md:block">
                  {user.name}
                </span>
              </div>

              <button
                onClick={logOut}
                className="p-1.5 rounded-lg bg-[#081C15] hover:bg-red-950/60 text-[#74C69D] hover:text-red-300 border border-[#40916C]/30 text-xs transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* Logged Out State */
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#081C15]/80 hover:bg-[#1B4332] text-[#D8F3DC] border border-[#40916C]/40 text-xs font-bold transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#B9FBC0]" />
                <span>Log In</span>
              </button>

              <button
                onClick={() => openAuthModal('signup')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#40916C] to-[#52B788] text-white text-xs font-bold shadow-md shadow-[#40916C]/30 hover:scale-105 transition-all cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Up</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
