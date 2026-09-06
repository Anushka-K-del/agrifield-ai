import React from 'react';
import { Camera, Cpu, Activity, Volume2, History, ArrowRight } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Snap Leaf Photograph',
      desc: 'Smallholder farmer captures a clear photo of any discolored, spotted, or wilting crop leaf using an affordable Android smartphone.',
      icon: Camera,
      highlight: 'Works with phone camera or uploaded gallery photos'
    },
    {
      number: '02',
      title: 'Neural Vision Analysis',
      desc: 'MobileNetV3-class lightweight deep CNN extracts microscopic foliar textures, lesions, and pigment anomalies in under 200 milliseconds.',
      icon: Cpu,
      highlight: 'Trained on 54,000+ benchmark plant pathology images'
    },
    {
      number: '03',
      title: 'Instant Pathogen Identification',
      desc: 'The engine categorizes the specific fungal, bacterial, or viral disease, computes infection confidence score, and grades severity.',
      icon: Activity,
      highlight: 'Eliminates 4–7 day waiting period for lab reports'
    },
    {
      number: '04',
      title: 'Vernacular Voice Advisory',
      desc: 'Step-by-step chemical and organic remedies with precise calculated dosages are spoken aloud in Marathi, Hindi, Tamil, Telugu, and Bengali.',
      icon: Volume2,
      highlight: 'Accessible for illiterate farmers via native voice synthesis'
    },
    {
      number: '05',
      title: 'Track History & Extension Sync',
      desc: 'Scans are archived into personal history to audit treatment recovery and export diagnostic logs to local Krishi Vigyan Kendra (KVK) officers.',
      icon: History,
      highlight: 'Builds longitudinal field health records over time'
    }
  ];

  return (
    <section id="how-it-works" className="min-h-screen relative py-24 px-4 sm:px-6 lg:px-8 bg-[#081C15]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4332] border border-[#B9FBC0]/40 text-[#B9FBC0] text-xs font-extrabold uppercase tracking-wider mb-4">
            <span>5-Step Operational Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How AgriShield AI Works
          </h2>

          <p className="text-sm sm:text-base text-[#74C69D] mt-3">
            A transparent, software-driven pipeline built for rural connectivity constraints and accessible vernacular comprehension.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="glass-panel p-6 rounded-3xl border border-[#40916C]/30 hover:border-[#B9FBC0]/60 transition-all flex flex-col justify-between group bg-[#081C15]/80 hover:scale-[1.02]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-mono font-black text-[#B9FBC0]/40 group-hover:text-[#B9FBC0] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#1B4332] border border-[#B9FBC0]/30 flex items-center justify-center text-[#B9FBC0]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#74C69D] leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#40916C]/20 text-[10px] font-semibold text-[#B9FBC0]">
                  ✓ {step.highlight}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
