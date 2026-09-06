import React from 'react';
import { UserCheck, Users, Building, Landmark, CheckCircle2, ArrowRight } from 'lucide-react';

export default function TargetAudienceSection() {
  const personas = [
    {
      title: 'Smallholder Farmers',
      subtitle: 'Primary Beneficiary Group',
      badge: 'Tier 1 Priority',
      badgeColor: 'bg-[#1B4332] text-[#B9FBC0] border-[#B9FBC0]/40',
      icon: UserCheck,
      emoji: '👨‍🌾',
      benefit: 'Immediate on-field disease detection in <3s, stopping catastrophic 35% crop loss without waiting 4–7 days for traveling agronomists.',
      points: [
        'Voice output in native Marathi, Hindi, Telugu, Tamil, Bengali',
        'Accurate milliliter-per-liter dosage calculations prevent costly chemical waste',
        'Works directly on affordable entry-level smartphones'
      ]
    },
    {
      title: 'KVK Officers & Field Agronomists',
      subtitle: 'Krishi Vigyan Kendra Extension Network',
      badge: 'Field Extension',
      badgeColor: 'bg-[#1B4332] text-[#FFB703] border-[#FFB703]/40',
      icon: Users,
      emoji: '🔬',
      benefit: 'Rapid digital triage assistant during village field tours, replacing guesswork with scientific CNN pathology benchmarks.',
      points: [
        'Standardizes foliar disease diagnosis across extension workers',
        'Archives verified farmer scan logs to trace recovery trajectories',
        'Reduces manual diagnostic overhead by over 70%'
      ]
    },
    {
      title: 'FPOs & Farmer Cooperatives',
      subtitle: 'Aggregated Cluster Management',
      badge: 'Community Level',
      badgeColor: 'bg-[#1B4332] text-[#74C69D] border-[#74C69D]/40',
      icon: Building,
      emoji: '🏢',
      benefit: 'Aggregates community crop health data to coordinate bulk purchasing of certified bio-fungicides and neem formulations at wholesale discounts.',
      points: [
        'Village-wide pathogen outbreak heatmaps',
        'Group negotiation power with certified organic suppliers',
        'Auditable traceability for export certification'
      ]
    },
    {
      title: 'State Agriculture Departments',
      subtitle: 'Government of Maharashtra / National Agencies',
      badge: 'Policy & Monitoring',
      badgeColor: 'bg-[#1B4332] text-amber-300 border-amber-400/40',
      icon: Landmark,
      emoji: '🏛️',
      benefit: 'Provides high-resolution regional disease surveillance telemetry to dispatch targeted containment protocols before epidemics spread across districts.',
      points: [
        'Macro-level epidemic monitoring across talukas and districts',
        'Data-driven allocation of state agricultural subsidies and bio-inputs',
        'Aligned with Maharashtra State Agriculture Innovation Mandates'
      ]
    }
  ];

  return (
    <section id="audience" className="min-h-screen relative py-24 px-4 sm:px-6 lg:px-8 bg-[#081C15]/95">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4332] border border-[#B9FBC0]/40 text-[#B9FBC0] text-xs font-extrabold uppercase tracking-wider mb-4">
            <span>Target Stakeholders</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Who AgriShield AI Is Built For
          </h2>

          <p className="text-sm sm:text-base text-[#74C69D] mt-3">
            Designed specifically to address accessibility, literacy, and institutional triage hurdles across the entire agricultural lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((persona, idx) => {
            const Icon = persona.icon;
            return (
              <div
                key={persona.title}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#40916C]/30 hover:border-[#B9FBC0]/50 transition-all flex flex-col justify-between group bg-gradient-to-br from-[#1B4332]/60 to-[#081C15]/90"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#081C15] border border-[#40916C]/40 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                        <span>{persona.emoji}</span>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-white">
                          {persona.title}
                        </h3>
                        <p className="text-xs text-[#74C69D]">{persona.subtitle}</p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${persona.badgeColor}`}>
                      {persona.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-white/95 leading-relaxed mb-5 bg-[#081C15]/60 p-3.5 rounded-2xl border border-[#40916C]/20">
                    <strong>Primary Impact:</strong> {persona.benefit}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {persona.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#D8F3DC]/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B9FBC0] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#40916C]/20 flex items-center justify-between text-[11px] text-[#74C69D]">
                  <span>Optimized for Rural Deployment</span>
                  <span className="font-bold text-[#B9FBC0]">100% Software Track</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
