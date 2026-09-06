import React from 'react';
import { Shield, Smartphone, WifiOff, Mic, CheckCircle2, Zap } from 'lucide-react';

export default function SolutionSection() {
  const chips = [
    { title: 'Instant Neural Detection', detail: '>95% PlantVillage Acc', icon: Zap, color: 'border-[#B9FBC0] text-[#B9FBC0]' },
    { title: 'Precision Dosage Engine', detail: 'Organic & Chemical Formulations', icon: Smartphone, color: 'border-[#74C69D] text-[#74C69D]' },
    { title: 'Vernacular Voice Advisory', detail: '6 Indian Languages Supported', icon: Mic, color: 'border-[#FFB703] text-[#FFB703]' },
  ];

  return (
    <section id="solution" className="min-h-screen relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-5xl w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332] border border-[#B9FBC0]/40 text-[#B9FBC0] text-xs font-bold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>The AgriShield Innovation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Mobile-First Edge Intelligence <br />
            <span className="text-[#B9FBC0]">Real-Time Crop Pathology Engine</span>
          </h2>
          <p className="text-base sm:text-lg text-[#74C69D]/90 max-w-2xl mx-auto">
            A software-first ecosystem uniting convolutional computer vision, precision dosage calculations, and vernacular audio guidance for immediate, accessible farmer empowerment.
          </p>
        </div>

        {/* 3 Feature Chips Overlay */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {chips.map((chip, idx) => {
            const Icon = chip.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-[#40916C]/40 flex items-center gap-4 hover:border-[#B9FBC0] transition-all bg-[#081C15]/80"
              >
                <div className="p-3 rounded-xl bg-[#081C15] border border-[#40916C]/40">
                  <Icon className="w-6 h-6 text-[#B9FBC0]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5">{chip.title}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${chip.color}`}>
                    {chip.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Offline & Edge Capabilities */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#B9FBC0]/20 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#081C15]/80">
          {[
            'Lightweight AI Architecture: MobileNetV3 CNN designed for instant mobile inference',
            'Laser Sweep Scan: Isolates foliar regions and pinpoints specific fungal & bacterial pathogens',
            'Localized Remedy Advisory: Custom organic bio-controls & chemical milliliter dosages',
            'Vernacular Voice Engine: Spoken audio support in Marathi, Hindi, Tamil, Telugu, Bengali & English',
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#B9FBC0] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-[#D8F3DC]/90 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
