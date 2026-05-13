import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroImage from "../assets/hero-premium.png";

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
        stagger: 0.2
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
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.15)_0%,transparent_70%)]" />
        
        {/* Glowing Horizon Line (Matching Reference) */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue/60 to-transparent shadow-[0_0_25px_#00f2ff]" />

        {/* Premium Static Headset Visual - Centerpiece */}
        <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            <img 
                src={heroImage} 
                alt="Sony WH-1000XM5 Premium" 
                className="w-full h-full object-contain mix-blend-screen opacity-60"
            />
        </motion.div>
      </div>

      {/* Hero UI - Improved Spacing & Typography */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full pt-10">
        <motion.h1 
          className="hero-text text-[12vw] md:text-[10rem] font-bold tracking-tighter leading-none text-white mb-8 drop-shadow-[0_0_80px_rgba(255,255,255,0.1)]"
        >
          WH-1000XM5
        </motion.h1>

        <motion.div className="hero-text max-w-2xl px-10 py-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 mb-20">
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
            Immerse yourself in a world of pure sound. Precision engineered <br className="hidden md:block" /> 
            for those who demand nothing but absolute perfection.
          </p>
        </motion.div>

        <motion.div className="hero-text flex flex-col md:flex-row gap-12 items-center mb-10">
          <button 
            onClick={() => scrollToSection("pricing")}
            className="px-14 py-6 bg-neon-blue text-black font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_60px_rgba(0,242,255,0.5)] uppercase tracking-widest text-xs"
          >
            Pre-order Now
          </button>
          
          <button 
            onClick={() => scrollToSection("visualizer")}
            className="px-14 py-6 glass text-white font-medium rounded-full border border-white/20 hover:bg-white/10 transition-all flex items-center gap-4 group"
          >
            <span className="uppercase tracking-widest text-xs">Watch Film</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-neon-blue transition-colors">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-white border-b-[4px] border-b-transparent ml-1" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <span className="text-[10px] tracking-[0.6em] text-neon-blue uppercase font-bold">Explore the Craft</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-blue to-transparent animate-pulse" />
      </div>
    </section>
  );
};
