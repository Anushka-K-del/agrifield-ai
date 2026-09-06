import React from 'react';
import { Shield, Sparkles, Heart, Mail, Code2 } from 'lucide-react';

export default function FooterCTASection() {
  return (
    <footer id="cta" className="min-h-screen relative flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="max-w-4xl w-full text-center my-auto flex flex-col items-center">
        {/* Emblem */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1B4332] to-[#40916C] border border-[#B9FBC0]/40 flex items-center justify-center mb-6 shadow-2xl shadow-[#40916C]/40 animate-pulse">
          <Shield className="w-8 h-8 text-[#B9FBC0]" />
        </div>

        <h2 className="text-3xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight">
          Ready to Protect India’s Crops?
        </h2>

        <p className="text-base sm:text-xl text-[#74C69D]/90 max-w-2xl mx-auto mb-8 font-medium">
          AgriShield AI brings instant photo-based disease detection, precision dosages, and multilingual voice advisory directly into the hands of rural farmers.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => {
              const el = document.getElementById('demo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-extrabold text-sm bg-gradient-to-r from-[#40916C] via-[#52B788] to-[#B9FBC0] text-[#081C15] shadow-xl shadow-[#40916C]/30 hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#081C15]" />
            <span>Launch Interactive Demo</span>
          </button>

          <a
            href="https://github.com/Slayerxy77/agrifield-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm glass-panel text-[#D8F3DC] border border-[#40916C]/40 hover:border-[#B9FBC0]/60 hover:text-white transition-all"
          >
            <Code2 className="w-4 h-4 text-[#B9FBC0]" />
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* Hackathon Project Credits Card */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[#B9FBC0]/30 max-w-2xl w-full text-left bg-[#081C15]/80 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between mb-3 border-b border-[#40916C]/30 pb-3 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B9FBC0] animate-ping" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#B9FBC0]">
                Smart India Hackathon 2026 Submission
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-[#FFB703] bg-[#1B4332] px-2.5 py-0.5 rounded-full">
              PS ID: SIH26131
            </span>
          </div>

          <div className="text-xs text-[#D8F3DC]/90 space-y-2">
            <p><strong className="text-white">Problem Statement:</strong> Early detection and management of crop diseases and pest infestations</p>
            <p><strong className="text-white">Track:</strong> Software Track Only (Zero Mandatory Hardware Dependency)</p>
            <p><strong className="text-white">Theme:</strong> Agriculture, FoodTech & Rural Development</p>
            <p><strong className="text-white">Sponsoring Organization:</strong> Government of Maharashtra</p>
            <div className="pt-2 border-t border-[#40916C]/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#74C69D]">
              <span><strong>Team:</strong> Team AgriShield Innovators</span>
              <span><strong>Deployment:</strong> Vercel Global Edge CDN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="w-full max-w-5xl border-t border-[#40916C]/20 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#74C69D]/70 gap-3">
        <div className="flex items-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-red-400 fill-current" />
          <span>for Maharashtra & Indian Agriculture</span>
        </div>

        <div>
          © 2026 AgriShield AI • Smart India Hackathon Finalist
        </div>
      </div>
    </footer>
  );
}
