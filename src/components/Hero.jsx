import { useState, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { Headset3D } from "./Headset3D";
import { ErrorBoundary } from "./ErrorBoundary";

export const Hero = () => {
  const containerRef = useRef();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        {/* Deep Atmosphere Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.08)_0%,transparent_70%)]" />
        
        {/* Floating Particles/Light Streaks (CSS Animation for performance) */}
        <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute w-1 h-1 bg-neon-blue rounded-full blur-[1px] animate-float-particle"
                    style={{ 
                        left: `${Math.random() * 100}%`, 
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${10 + Math.random() * 10}s`
                    }}
                />
            ))}
        </div>
      </div>

      {/* The Centerpiece: Ultra Realistic 3D Headset */}
      <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
        <ErrorBoundary fallback={<div className="flex items-center justify-center h-full text-gray-500">3D Experience Unavailable</div>}>
          <Canvas 
            camera={{ position: [0, 0, 10], fov: 35 }}
            shadows
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <Headset3D 
                mouse={{ current: [0, 0] }} 
                color="#0a0a0a" 
                neonGlow={true}
              />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Hero UI Layer */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6"
        >
          <span className="text-neon-blue text-[10px] md:text-xs font-bold uppercase tracking-[0.8em] neon-text-glow">
            Future of Sound
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none mb-4 text-white drop-shadow-[0_0_80px_rgba(0,242,255,0.2)]"
        >
          SONY
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-2xl md:text-4xl font-light tracking-widest text-gradient mb-12"
        >
          WH-1000XM5
        </motion.h2>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col md:flex-row gap-8 items-center pointer-events-auto"
        >
          <button 
            onClick={() => scrollToSection("pricing")}
            className="px-12 py-5 bg-neon-blue text-black font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_50px_rgba(0,242,255,0.4)] uppercase tracking-widest text-xs"
          >
            Pre-order Now
          </button>
          
          <button 
            onClick={() => scrollToSection("visualizer")}
            className="px-12 py-5 glass text-white font-medium rounded-full border border-white/10 hover:bg-white/5 transition-all flex items-center gap-3 group"
          >
            <span className="uppercase tracking-widest text-xs">Watch Film</span>
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-neon-blue transition-colors">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-1" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30 pointer-events-none">
        <div className="flex gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-neon-blue/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-neon-blue/40" />
        </div>
        <span className="text-[9px] tracking-[0.5em] text-gray-500 uppercase">Scroll to Explore</span>
      </div>
    </section>
  );
};
