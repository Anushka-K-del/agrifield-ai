import React, { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/Auth/AuthModal";
import ScanHistoryModal from "./components/ScanHistory/ScanHistoryModal";

import LoadingScreen from "./components/LoadingScreen";
import Navigation from "./components/Navigation";
import CanvasContainer from "./components/CanvasContainer";

import HeroSection from "./components/Sections/HeroSection";
import CredentialsHeaderBlock from "./components/Sections/CredentialsHeaderBlock";
import InteractiveDemoSection from "./components/Sections/InteractiveDemoSection";
import WeatherSection from "./components/Sections/WeatherSection";
import HowItWorksSection from "./components/Sections/HowItWorksSection";
import TargetAudienceSection from "./components/Sections/TargetAudienceSection";
import ProblemSection from "./components/Sections/ProblemSection";
import SolutionSection from "./components/Sections/SolutionSection";
import SystemPillarsSection from "./components/Sections/SystemPillarsSection";
import TechStackSection from "./components/Sections/TechStackSection";
import ImpactSection from "./components/Sections/ImpactSection";
import FutureScopeSection from "./components/Sections/FutureScopeSection";
import ResearchReferencesSection from "./components/Sections/ResearchReferencesSection";
import FooterCTASection from "./components/Sections/FooterCTASection";

gsap.registerPlugin(ScrollTrigger);

function MainApp() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeNavSection, setActiveNavSection] = useState("hero");
  const [sceneActiveSection, setSceneActiveSection] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef(null);

  const sectionIds = [
    "hero",
    "credentials",
    "demo",
    "weather",
    "how-it-works",
    "audience",
    "problem",
    "solution",
    "pillars",
    "tech",
    "impact",
    "future-scope",
    "references",
    "cta",
  ];

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();

      const totalScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (totalScroll > 0) {
        const p = Math.max(
          0,
          Math.min(1, window.scrollY / totalScroll)
        );

        setScrollProgress(p);

        const sceneSec = Math.min(
          6,
          Math.floor(p * 7)
        );

        setSceneActiveSection(sceneSec);

        let currentNav = "hero";

        for (let i = 0; i < sectionIds.length; i++) {
          const el = document.getElementById(
            sectionIds[i]
          );

          if (el) {
            const rect =
              el.getBoundingClientRect();

            if (
              rect.top <=
              window.innerHeight * 0.4
            ) {
              currentNav = sectionIds[i];
            }
          }
        }

        setActiveNavSection(currentNav);
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

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#081C15] text-[#D8F3DC] overflow-x-hidden selection:bg-[#40916C] selection:text-white"
    >
      {loading && (
        <LoadingScreen
          onFinished={() => setLoading(false)}
        />
      )}

      <Navigation
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
        activeSection={activeNavSection}
      />

      <CanvasContainer
        scrollProgress={scrollProgress}
        activeSection={sceneActiveSection}
        reducedMotion={reducedMotion}
      />

      <AuthModal />
      <ScanHistoryModal />

      <main className="relative z-10">

        <HeroSection
          onExplore={() => {
            const el =
              document.getElementById("demo");

            if (el) {
              el.scrollIntoView({
                behavior: "smooth",
              });
            }
          }}
        />

        <CredentialsHeaderBlock />

        <InteractiveDemoSection />

        {/* NEW WEATHER INTELLIGENCE MODULE */}
        <WeatherSection />

        <HowItWorksSection />

        <TargetAudienceSection />

        <ProblemSection />

        <SolutionSection />

        <SystemPillarsSection />

        <TechStackSection />

        <ImpactSection />

        <FutureScopeSection />

        <ResearchReferencesSection />

        <FooterCTASection />

      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}