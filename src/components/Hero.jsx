import { motion } from "framer-motion";
import { useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Headset3D } from "./Headset3D";
import { ErrorBoundary } from "./ErrorBoundary";

export const Hero = () => {
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        opacity: 0,
        y: 80,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2,
        delay: 0.5
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

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
      {/* Technical Schematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.15)_0%,transparent_80%)]" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent shadow-[0_0_20px_#00f2ff]" />
      </div>

      {/* 3D Scene - Double Layer (Solid + Hologram) */}
      <div className="absolute inset-0 z-10">
        <ErrorBoundary fallback={null}>
          <Canvas camera={{ position: [0, 0, 8], fov: 40 }} shadows>
            <Suspense fallback={null}>
              <group>
                {/* Layer 1: Background Hologram Outline */}
                <Headset3D 
                  mouse={{ current: [0, 0] }} 
                  color="#00f2ff" 
                  hologram={true}
                />
                
                {/* Layer 2: Main Solid Centerpiece Headset */}
                <Headset3D 
                  mouse={{ current: [0, 0] }} 
                  color="#0a0a0a" 
                  neonGlow={true}
                  hologram={false}
                />
              </group>
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Hero UI - Centered & Premium */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 w-full pointer-events-none">
        <motion.h1 
          className="hero-text text-[12vw] md:text-[10rem] font-bold tracking-tighter leading-none text-white opacity-95 mb-4 drop-shadow-[0_0_60px_rgba(255,255,255,0.1)]"
        >
          WH-1000XM5
        </motion.h1>

        <motion.div className="hero-text max-w-2xl px-8 py-6 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 mb-12">
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
            Immerse yourself in a world of pure sound. Precision engineered <br className="hidden md:block" /> 
            for those who demand nothing but absolute perfection.
          </p>
        </motion.div>

        <motion.div className="hero-text flex flex-col md:flex-row gap-8 items-center mt-4 pointer-events-auto">
          <button 
            onClick={() => scrollToSection("pricing")}
            className="px-12 py-5 bg-neon-blue text-black font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_50px_rgba(0,242,255,0.5)] uppercase tracking-widest text-xs"
          >
            Pre-order Now
          </button>
          
          <button 
            onClick={() => scrollToSection("visualizer")}
            className="px-12 py-5 glass text-white font-medium rounded-full border border-white/20 hover:bg-white/10 transition-all flex items-center gap-3 group"
          >
            <span className="uppercase tracking-widest text-xs">Watch Film</span>
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-neon-blue transition-colors">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-1" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Aesthetic Detail */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <span className="text-[10px] tracking-[0.5em] text-gray-500 uppercase">Explore the Craft</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-neon-blue to-transparent" />
      </div>
    </section>
  );
};
