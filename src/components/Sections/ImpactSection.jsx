import React, { useEffect, useState, useRef } from 'react';
import { Award, ShieldCheck, MapPin, Calculator, CloudSun, DollarSign } from 'lucide-react';

function CountUpNumber({ target, unit, inView, prefix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = target;
    const duration = 1400; // ms
    const stepTime = 25;
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>
      {prefix}{count}{unit}
    </span>
  );
}

const impactStats = [
  { target: 25, unit: '%', label: 'Yield Improvement', detail: 'Harvest loss prevented via Day-1 pathology detection' },
  { target: 30, unit: '%', label: 'Cost Reduction', detail: 'Via precision calculated organic & chemical dosages' },
  { target: 6, unit: '', label: 'Regional Languages', detail: 'Native vernacular voice in Marathi, Hindi, Tamil & more' },
  { target: 3, unit: 's', prefix: '<', label: 'Diagnosis Speed', detail: 'Sub-3-second instant computer vision inference' },
];

export default function ImpactSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const innovations = [
    {
      title: 'Offline AI Diagnostics',
      desc: 'Runs full neural inference on local device storage with zero cellular dependency.',
      icon: ShieldCheck,
    },
    {
      title: 'Precision Dosage Calculator',
      desc: 'Prevents chemical overuse by recommending exact milliliter formulations per acre.',
      icon: Calculator,
    },
    {
      title: 'Micro-Climate Warnings',
      desc: 'Predicts localized frost, humidity spikes, and fungal spore risks 48 hours in advance.',
      icon: CloudSun,
    },
    {
      title: 'Mandi Price Linkage',
      desc: 'Connects farmers directly to nearby wholesale mandis for fair crop pricing.',
      icon: DollarSign,
    },
  ];

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="min-h-screen relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="max-w-5xl w-full">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332] border border-[#FFB703]/40 text-[#FFB703] text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Innovation & Social Impact</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Transforming Agriculture at Scale
          </h2>
          <p className="text-base sm:text-lg text-[#74C69D]/90 max-w-2xl mx-auto">
            Measurable yield improvements, cost savings, and climate resilience for rural farming communities.
          </p>
        </div>

        {/* 4 Animated Impact Stats Counter Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {impactStats.map((stat, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-[#40916C]/40 text-center bg-[#081C15]/80">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#B9FBC0] mb-1">
                <CountUpNumber
                  target={stat.target}
                  unit={stat.unit}
                  inView={inView}
                  prefix={stat.prefix}
                />
              </div>
              <div className="text-xs font-bold text-white mb-1">{stat.label}</div>
              <div className="text-[10px] text-[#74C69D]/80">{stat.detail}</div>
            </div>
          ))}
        </div>

        {/* 4 Innovation Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {innovations.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-[#40916C]/30 flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-[#081C15] border border-[#40916C]/40 shrink-0">
                  <Icon className="w-6 h-6 text-[#B9FBC0]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{card.title}</h3>
                  <p className="text-xs text-[#74C69D]/90 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
