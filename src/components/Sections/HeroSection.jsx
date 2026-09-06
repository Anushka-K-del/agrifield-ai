import React from 'react';
import { Shield, Sparkles, Activity, ArrowRight } from 'lucide-react';

export default function HeroSection({ onExplore }) {
  return (
    <section id="hero" className="min-h-screen relative flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pt-28 pb-12">
      {/* Top Badge */}
      <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full text-xs font-semibold text-[#B9FBC0] border border-[#B9FBC0]/40 shadow-lg shadow-[#40916C]/20 animate-float bg-[#081C15]/80">
        <Sparkles className="w-4 h-4 text-[#FFB703]" />
        <span>Smart India Hackathon 2026 • PS ID: SIH26131 • Software Track</span>
      </div>

      {/* Hero Headline Content */}
      <div className="max-w-4xl text-center my-auto flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          AgriShield <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B9FBC0] via-[#74C69D] to-[#40916C]">AI</span>
        </h1>

        <p className="text-lg sm:text-2xl font-semibold text-[#D8F3DC] mb-4 tracking-wide max-w-3xl">
          AI-Driven Crop Pathology Scanner & Vernacular Advisory Ecosystem
        </p>

        <p className="text-sm sm:text-lg text-[#74C69D]/90 max-w-2xl font-normal leading-relaxed mb-8">
          Empowering Indian smallholders with instant photo-based crop disease diagnosis, MobileNetV3 convolutional neural vision, precision dosage calculations, and multilingual voice advisory in 6 Indian languages.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('demo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-extrabold text-sm bg-gradient-to-r from-[#40916C] via-[#52B788] to-[#B9FBC0] text-[#081C15] shadow-xl shadow-[#40916C]/40 hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#081C15]" />
            <span>Try Live Disease Scan</span>
          </button>

          <button
            onClick={onExplore}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-[#1B4332] text-[#B9FBC0] border border-[#B9FBC0]/40 hover:bg-[#2D6A4F] hover:text-white transition-all cursor-pointer shadow-lg"
          >
            <span>Explore 3D Models</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm glass-panel text-[#D8F3DC] border border-[#40916C]/40 hover:border-[#B9FBC0]/60 hover:text-white transition-all"
          >
            <Activity className="w-4 h-4 text-[#B9FBC0]" />
            <span>How It Works</span>
          </a>
        </div>
      </div>

      {/* Bouncing Scroll Indicator */}
      <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={onExplore}>
        <span className="text-xs font-semibold uppercase tracking-widest text-[#74C69D]/80 group-hover:text-[#B9FBC0] transition-colors">
          Scroll to Explore
        </span>
        <div className="w-8 h-12 rounded-full border-2 border-[#40916C]/60 flex items-start justify-center p-1.5 glass-panel group-hover:border-[#B9FBC0] transition-colors">
          <div className="w-1.5 h-3 bg-[#B9FBC0] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
