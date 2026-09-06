import React from 'react';
import { Cpu, Radio, Volume2, Sparkles } from 'lucide-react';

export default function SystemPillarsSection() {
  const pillars = [
    {
      title: '1. Deep Learning Vision Engine',
      tech: 'MobileNetV3 & PlantVillage',
      icon: Cpu,
      color: 'text-[#B9FBC0]',
      desc: 'Lightweight convolutional neural network trained on 54,000+ crop illness benchmark images. Delivers instant multi-crop pathogen classification in under 200ms without expensive hardware.',
    },
    {
      title: '2. Precision Treatment & Dosage Matrix',
      tech: 'Prescription Engine (Phase 1)',
      icon: Radio,
      color: 'text-[#74C69D]',
      desc: 'Calculates exact organic bio-remedies and targeted chemical dilutions (ml/L) based on foliar infection stage, preventing costly fertilizer runoff. (IoT soil sensor probes designated for Phase 2).',
    },
    {
      title: '3. Vernacular Voice Advisory',
      tech: 'SpeechSynthesis in 6 Languages',
      icon: Volume2,
      color: 'text-[#FFB703]',
      desc: "Spoken audio engine supporting Marathi, Hindi, Bengali, Tamil, Telugu, and English. Bridges rural literacy barriers by speaking clear treatment steps in the farmer's native mother tongue.",
    },
  ];

  return (
    <section id="pillars" className="min-h-screen relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-5xl w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332] border border-[#74C69D]/40 text-[#74C69D] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core System Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Triangular Intelligence Architecture
          </h2>
          <p className="text-base sm:text-lg text-[#74C69D]/90 max-w-2xl mx-auto">
            Three interconnected pillars forming a resilient, end-to-end smart agricultural safeguard.
          </p>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-6 rounded-3xl border border-[#40916C]/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3.5 rounded-2xl bg-[#081C15] border border-[#40916C]/50 shadow-lg">
                      <Icon className={`w-7 h-7 ${pillar.color}`} />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-1 rounded bg-[#1B4332] text-[#B9FBC0] border border-[#40916C]/40">
                      {pillar.tech}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{pillar.title}</h3>
                  <p className="text-xs text-[#74C69D]/90 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
