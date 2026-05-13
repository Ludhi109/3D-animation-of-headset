import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroImage from "../assets/hero-premium.png";

export const Hero = () => {
  const containerRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray(".char");
      if (chars.length > 0) {
        gsap.from(chars, {
          opacity: 0,
          y: 100,
          rotateX: -90,
          stagger: 0.02,
          duration: 1,
          ease: "power4.out",
          delay: 0.8
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Video (Very subtle) */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-10"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-background-31580-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-sony-black/40" />
      </div>

      {/* Premium Headset Visual - Full Screen & Cinematic */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 0.8 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <img 
          src={heroImage} 
          alt="Sony WH-1000XM5" 
          className="w-full h-full object-cover mix-blend-lighten"
        />
        {/* Cinematic Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-sony-black via-sony-black/60 to-transparent" />
      </motion.div>

      <div className="z-10 flex flex-col items-center mt-[-5vh]">
        <motion.h2
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-sm md:text-base font-medium text-neon-blue mb-10 uppercase neon-text-glow"
        >
          Precision Engineering
        </motion.h2>
        
        <h1 ref={titleRef} className="text-7xl md:text-[8.5rem] font-bold tracking-tighter leading-[0.8] mb-16 flex flex-wrap justify-center perspective-1000 relative drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="w-full text-white overflow-hidden pb-2">
            {splitText("SONY")}
          </div>
          <div className="w-full text-gradient overflow-hidden">
            {splitText("WH-1000XM5")}
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="max-w-xl mx-auto text-gray-300 text-lg md:text-xl font-light mb-20 leading-relaxed bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/5"
        >
          Experience the world's most advanced noise cancelling. <br className="hidden md:block" /> 
          Engineered for absolute perfection.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col md:flex-row gap-10 justify-center items-center mt-10"
        >
          <button 
            onClick={() => scrollToSection("pricing")}
            className="group relative px-12 py-5 bg-neon-blue text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_50px_rgba(0,242,255,0.4)]"
          >
            <span className="relative z-10">Pre-order Now</span>
            <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </button>
          
          <button 
            onClick={() => scrollToSection("visualizer")}
            className="px-12 py-5 glass text-white font-medium rounded-full border border-white/20 hover:bg-white/10 transition-all flex items-center gap-3 active:scale-95 cursor-pointer"
          >
            <span>Watch Film</span>
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-1" />
            </div>
          </button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] tracking-[0.4em] text-gray-500 uppercase">Scroll to Discover</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-neon-blue to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};


