import React from 'react';
import { Award, ShieldCheck, Landmark, Sparkles, Building2, Code, FileText, CheckCircle2 } from 'lucide-react';

export default function CredentialsHeaderBlock() {
  return (
    <section id="credentials" className="relative z-20 py-8 px-4 sm:px-6 lg:px-8 -mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#B9FBC0]/40 bg-gradient-to-r from-[#081C15]/95 via-[#1B4332]/90 to-[#081C15]/95 shadow-2xl shadow-[#40916C]/30 relative overflow-hidden">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#40916C] via-[#B9FBC0] to-[#FFB703]" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Official Hackathon Title & Org */}
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4332] border border-[#B9FBC0]/40 text-[#B9FBC0] text-xs font-extrabold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-[#FFB703]" />
                  Smart India Hackathon 2026
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#081C15] border border-[#FFB703]/50 text-[#FFB703] text-xs font-extrabold font-mono tracking-wide">
                  PS ID: SIH26131
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#40916C]/40 border border-[#B9FBC0]/30 text-white text-xs font-bold">
                  <Code className="w-3 h-3 text-[#B9FBC0]" />
                  Software Track Only
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                Early Detection & Management of Crop Diseases and Pest Infestations
              </h2>

              <p className="text-xs sm:text-sm text-[#74C69D] leading-relaxed">
                Mobile-first artificial intelligence solution providing instant leaf disease detection, vernacular voice prescriptions, and precision treatment dosages for rural smallholders across Maharashtra and India.
              </p>
            </div>

            {/* Right: Ministry & Team Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 shrink-0 lg:w-80">
              <div className="p-3.5 rounded-2xl bg-[#081C15]/80 border border-[#40916C]/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1B4332] border border-[#B9FBC0]/40 flex items-center justify-center text-[#B9FBC0] shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#74C69D] block">
                    Sponsoring Organization
                  </span>
                  <strong className="text-xs font-extrabold text-white block">
                    AgriTech Innovations
                  </strong>
                  <span className="text-[10px] text-[#B9FBC0]">Theme: Agriculture & Rural Dev</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#081C15]/80 border border-[#40916C]/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1B4332] border border-[#B9FBC0]/40 flex items-center justify-center text-[#B9FBC0] shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#74C69D] block">
                    Finalist Team & Track
                  </span>
                  <strong className="text-xs font-extrabold text-white block">
                    Team AgriShield Innovators
                  </strong>
                  <span className="text-[10px] text-[#74C69D]">Pure Software Deliverable</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Deliverables Pill Strip */}
          <div className="mt-6 pt-4 border-t border-[#40916C]/30 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#D8F3DC]">
              <CheckCircle2 className="w-4 h-4 text-[#B9FBC0] shrink-0" />
              <span>PlantVillage CNN Model</span>
            </div>
            <div className="flex items-center gap-2 text-[#D8F3DC]">
              <CheckCircle2 className="w-4 h-4 text-[#B9FBC0] shrink-0" />
              <span>6 Vernacular Languages</span>
            </div>
            <div className="flex items-center gap-2 text-[#D8F3DC]">
              <CheckCircle2 className="w-4 h-4 text-[#B9FBC0] shrink-0" />
              <span>Zero-Hardware Dependency</span>
            </div>
            <div className="flex items-center gap-2 text-[#D8F3DC]">
              <CheckCircle2 className="w-4 h-4 text-[#B9FBC0] shrink-0" />
              <span>Organic & Chemical Dosages</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
