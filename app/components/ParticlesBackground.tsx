"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useCallback } from "react";

const initParticles = async (engine: Engine) => {
  await loadSlim(engine);
};

export default function ParticlesBackground({ id, density = 40, linkOpacity = 0.1 }: { id: string, density?: number, linkOpacity?: number }) {
  return (
    <ParticlesProvider init={initParticles}>
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-60">
        <Particles
          id={id}
          options={{
            fullScreen: { enable: false },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                repulse: {
                  distance: 150,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: { value: ["#9d78e2", "#b58ffd", "#ffffff"] },
              links: {
                color: "#9d78e2",
                distance: 150,
                enable: true,
                opacity: linkOpacity,
                width: 1,
              },
              move: {
                enable: true,
                speed: 0.6,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "bounce" },
              },
              number: {
                density: { enable: true, width: 800, height: 800 },
                value: density,
              },
              opacity: {
                value: 0.5,
                animation: { enable: true, speed: 1, sync: false },
              },
              shape: { type: "circle" },
              size: {
                value: { min: 1, max: 4 },
                animation: { enable: true, speed: 2, sync: false },
              },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 pointer-events-none"
        />
      </div>
    </ParticlesProvider>
  );
}
