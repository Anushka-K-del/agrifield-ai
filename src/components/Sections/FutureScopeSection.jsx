import React from 'react';
import { Sparkles, Radio, Cpu, ShoppingBag, CloudRain, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

export default function FutureScopeSection() {
  const scopeItems = [
    {
      phase: 'Phase 2 Hardware Scope',
      badge: 'Physical IoT Probes',
      badgeColor: 'border-amber-400/40 text-amber-300 bg-amber-950/40',
      title: 'IoT Soil & NPK In-Ground Telemetry',
      desc: 'Deploy low-power ESP32 field probes equipped with optical NPK, soil moisture, pH, and canopy temperature sensors. Telemetry transmitted over LoRaWAN mesh to complement visual leaf detection.',
      icon: Radio,
      tag: 'Hardware Roadmap'
    },
    {
      phase: 'Software Expansion',
      badge: 'Offline Inference',
      badgeColor: 'border-[#B9FBC0]/40 text-[#B9FBC0] bg-[#1B4332]',
      title: 'On-Device TFLite WebAssembly Engine',
      desc: 'Compile quantized MobileNetV3 directly to WebAssembly and TensorFlow Lite, enabling real-time foliar disease scanning in 100% disconnected remote agricultural areas without cellular reception.',
      icon: Cpu,
      tag: 'Offline-First'
    },
    {
      phase: 'Software Expansion',
      badge: 'Economic Linkage',
      badgeColor: 'border-[#74C69D]/40 text-[#74C69D] bg-[#081C15]',
      title: 'e-NAM & APMC Mandi Price Linkage',
      desc: 'Direct API integration with national e-NAM and local Maharashtra APMC wholesale markets to advise farmers on optimal harvesting schedules and highest-margin mandi selling points.',
      icon: TrendingUp,
      tag: 'Market Intelligence'
    },
    {
      phase: 'Software Expansion',
      badge: 'Predictive Climate',
      badgeColor: 'border-blue-400/40 text-blue-300 bg-blue-950/40',
      title: 'Hyperlocal Micro-Weather Early Warning',
      desc: 'Predictive algorithms cross-referencing satellite meteorological forecasts to alert farmers 48 hours prior to humidity surges and temperature windows optimal for fungal sporulation.',
      icon: CloudRain,
      tag: 'Climate Resilience'
    },
    {
      phase: 'Ecosystem Expansion',
      badge: 'E-Commerce Bridge',
      badgeColor: 'border-purple-400/40 text-purple-300 bg-purple-950/40',
      title: 'Certified Bio-Input Supply Marketplace',
      desc: 'One-click direct dispatch connecting smallholders with government-certified neem extracts, Trichoderma cultures, and bio-fertilizer cooperatives at transparent, fair prices.',
      icon: ShoppingBag,
      tag: 'Direct Supply Chain'
    }
  ];

  return (
    <section id="future-scope" className="min-h-screen relative py-24 px-4 sm:px-6 lg:px-8 bg-[#081C15]/95">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4332] border border-[#B9FBC0]/40 text-[#B9FBC0] text-xs font-extrabold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB703]" />
            <span>Strategic Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Future Scope & <span className="text-[#B9FBC0]">Phase 2 Expansion</span>
          </h2>

          <p className="text-sm sm:text-base text-[#74C69D] mt-3">
            While our current SIH26131 deliverable is 100% software-driven, our long-term roadmap expands into IoT hardware telemetry, market linkages, and offline edge computing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scopeItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="glass-panel p-6 sm:p-7 rounded-3xl border border-[#40916C]/30 hover:border-[#B9FBC0]/60 transition-all flex flex-col justify-between group bg-gradient-to-br from-[#1B4332]/40 to-[#081C15]/90 hover:scale-[1.02]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#081C15] border border-[#40916C]/40 flex items-center justify-center text-[#B9FBC0] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-[#FFB703] uppercase tracking-wider block mb-1">
                    {item.phase}
                  </span>

                  <h3 className="text-lg font-extrabold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#74C69D] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#40916C]/20 flex items-center justify-between text-[10px] text-[#B9FBC0] font-semibold">
                  <span>Planned for Phase 2 Deployment</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
