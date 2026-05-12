import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

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
      <div className="z-10 mt-[-10vh]">
        <motion.h2
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-sm md:text-base font-medium text-neon-blue mb-6 uppercase"
        >
          The Future of Silence
        </motion.h2>
        
        <h1 ref={titleRef} className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-[0.8] mb-12 flex flex-wrap justify-center perspective-1000">
          <div className="w-full text-gradient overflow-hidden pb-4">
            {splitText("SONY")}
          </div>
          <div className="w-full text-white/90 overflow-hidden">
            {splitText("WH-1000XM5")}
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="max-w-2xl mx-auto text-gray-400 text-lg md:text-2xl font-light mb-12 leading-relaxed"
        >
          Immerse yourself in a world of pure sound. <br className="hidden md:block" /> 
          Precision engineered for those who demand perfection.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <button 
            onClick={() => scrollToSection("pricing")}
            className="group relative px-10 py-5 bg-neon-blue text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="relative z-10">Pre-order Now</span>
            <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </button>
          
          <button 
            onClick={() => scrollToSection("visualizer")}
            className="px-10 py-5 glass text-white font-medium rounded-full border border-white/10 hover:bg-white/10 transition-all flex items-center gap-3 active:scale-95 cursor-pointer"
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
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] tracking-[0.4em] text-gray-500 uppercase">Explore the Craft</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-neon-blue via-neon-blue/20 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};


