import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import BackgroundParticles from './BackgroundParticles';
import FarmTerrain from './FarmTerrain';
import LeafModel from './LeafModel';
import SmartphoneModel from './SmartphoneModel';
import OrbitingNodes from './OrbitingNodes';
import ExplodedStack from './ExplodedStack';
import AerialFarmPins from './AerialFarmPins';

export default function MainScene({ scrollProgress, activeSection, reducedMotion }) {
  const { camera } = useThree();
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Determine target camera position and lookAt target per section (0 to 6)
    const p = scrollProgress; // 0.0 to 1.0 total page scroll

    let targetCamPos = new THREE.Vector3(0, 3, 9);
    let targetLookAt = new THREE.Vector3(0, 0, 0);

    if (reducedMotion) {
      // Simplified static camera for accessibility
      targetCamPos.set(0, 2, 7);
      targetLookAt.set(0, 0, 0);
    } else {
      // Smooth interpolation mapped across 7 sections
      if (p < 0.16) {
        // Section 1: Hero
        const t = p / 0.16;
        targetCamPos.set(0, 3 - t * 1, 9 - t * 2);
        targetLookAt.set(0, 0, 0);
      } else if (p < 0.32) {
        // Section 2: Problem (Zoom into Leaf)
        const t = (p - 0.16) / 0.16;
        targetCamPos.set(0, 0, 4.2 - t * 0.4);
        targetLookAt.set(0, 0, 0);
      } else if (p < 0.48) {
        // Section 3: Solution (Reveal Phone & Scan)
        const t = (p - 0.32) / 0.16;
        targetCamPos.set(0, 0.5, 6.2 + t * 0.5);
        targetLookAt.set(0, 0, 0);
      } else if (p < 0.64) {
        // Section 4: System Pillars (Orbiting Nodes)
        const t = (p - 0.48) / 0.16;
        targetCamPos.set(Math.sin(t * Math.PI) * 2, 1.2, 7.5);
        targetLookAt.set(0, 0, 0);
      } else if (p < 0.8) {
        // Section 5: Tech Stack (Exploded Panels)
        const t = (p - 0.64) / 0.16;
        targetCamPos.set(3 - t * 1.5, 1, 7);
        targetLookAt.set(0, 0, 0);
      } else if (p < 0.92) {
        // Section 6: Impact (Aerial View Pins)
        const t = (p - 0.8) / 0.12;
        targetCamPos.set(0, 10 + t * 2, 6 + t * 2);
        targetLookAt.set(0, -1, 0);
      } else {
        // Section 7: Closing CTA (Macro Macro Overview)
        const t = (p - 0.92) / 0.08;
        targetCamPos.set(Math.sin(t * Math.PI * 2) * 2, 4, 9);
        targetLookAt.set(0, 0, 0);
      }
    }

    // Lerp Camera Position
    camera.position.lerp(targetCamPos, delta * 4);
    cameraTargetRef.current.lerp(targetLookAt, delta * 4);
    camera.lookAt(cameraTargetRef.current);
  });

  // Calculate Section Sub-progresses
  const problemProgress = Math.max(0, Math.min(1, (scrollProgress - 0.16) / 0.16));
  const scanProgress = Math.max(0, Math.min(1, (scrollProgress - 0.32) / 0.16));
  const pillarsProgress = Math.max(0, Math.min(1, (scrollProgress - 0.48) / 0.16));
  const stackProgress = Math.max(0, Math.min(1, (scrollProgress - 0.64) / 0.16));
  const aerialProgress = Math.max(0, Math.min(1, (scrollProgress - 0.8) / 0.12));

  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#74C69D" />
      <pointLight position={[0, 4, 2]} intensity={1} color="#B9FBC0" />

      {/* Spore Atmosphere Particles */}
      <BackgroundParticles count={reducedMotion ? 40 : 120} />

      {/* Section 1 & Section 7: Farm Terrain */}
      <FarmTerrain
        opacity={activeSection === 0 || activeSection === 6 ? 1 : 0.25}
        droneRotationSpeed={reducedMotion ? 0.2 : 1}
      />

      {/* Section 2 & 3: Leaf & Phone Scan Models */}
      {(activeSection === 1 || activeSection === 2) && (
        <group position={[0, 0, 0]}>
          <LeafModel
            diseaseProgress={problemProgress}
            scanProgress={scanProgress}
            scanActive={activeSection === 2}
          />
          <SmartphoneModel
            visible={activeSection === 2}
            scanActive={activeSection === 2}
          />
        </group>
      )}

      {/* Section 4: Orbiting System Nodes */}
      <OrbitingNodes
        visible={activeSection === 3}
        progress={pillarsProgress}
      />

      {/* Section 5: Exploded Tech Architecture Stack */}
      <ExplodedStack
        visible={activeSection === 4}
        progress={stackProgress}
      />

      {/* Section 6: Aerial View Location Pins */}
      <AerialFarmPins
        visible={activeSection === 5}
        progress={aerialProgress}
      />
    </>
  );
}
