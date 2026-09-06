import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import CanvasContainer from './components/CanvasContainer';

import HeroSection from './components/Sections/HeroSection';
import ProblemSection from './components/Sections/ProblemSection';
import SolutionSection from './components/Sections/SolutionSection';
import SystemPillarsSection from './components/Sections/SystemPillarsSection';
import TechStackSection from './components/Sections/TechStackSection';
import ImpactSection from './components/Sections/ImpactSection';
import FooterCTASection from './components/Sections/FooterCTASection';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
    });

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const p = Math.max(0, Math.min(1, window.scrollY / totalScroll));
        setScrollProgress(p);

        // Mapped 7 sections (0 to 6)
        const currentSec = Math.min(6, Math.floor(p * 7));
        setActiveSection(currentSec);
      }
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  // Section IDs array for active section highlighting
  const sectionIds = ['hero', 'problem', 'solution', 'pillars', 'tech', 'impact', 'cta'];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#081C15] text-[#D8F3DC] overflow-x-hidden selection:bg-[#40916C] selection:text-white">
      {/* Loading Screen Overlay */}
      {loading && <LoadingScreen onFinished={() => setLoading(false)} />}

      {/* Navigation Bar */}
      <Navigation
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
        activeSection={sectionIds[activeSection]}
      />

      {/* Fixed Full-Screen 3D Background Canvas */}
      <CanvasContainer
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        reducedMotion={reducedMotion}
      />

      {/* Foreground Scrollable Content */}
      <main className="relative z-10">
        <HeroSection onExplore={() => {
          const el = document.getElementById('problem');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />
        <ProblemSection />
        <SolutionSection />
        <SystemPillarsSection />
        <TechStackSection />
        <ImpactSection />
        <FooterCTASection />
      </main>
    </div>
  );
}
