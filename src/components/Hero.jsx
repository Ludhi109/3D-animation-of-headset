import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// High-fidelity Sony XM5 Image
const heroImageUrl = "https://www.sony.co.in/image/5d02da5df552836db894cead8afc2098?fmt=pjpeg&wid=1200&hei=470&bgcolor=F1F5F9&qlt=43";

export const Hero = () => {
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power4.out",
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
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.05)_0%,transparent_70%)]" />

      {/* The 'Full Image' Headset - Guaranteed Uncropped */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <div 
          className="w-full h-full"
          style={{ 
            backgroundImage: `url(${heroImageUrl})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'lighten'
          }}
        />
        {/* Subtle Bottom Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      </motion.div>

      {/* Hero Content Layered Over Image */}
      <div className="hero-content z-10 flex flex-col items-center text-center px-4 -mt-20">
        <motion.div
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.5 }}
          className="text-neon-blue text-xs md:text-sm font-bold uppercase mb-6 tracking-[0.5em]"
        >
          Industry Leading Noise Cancellation
        </motion.div>

        <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-none mb-8 text-white drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          SONY <br />
          <span className="text-gradient">WH-1000XM5</span>
        </h1>

        <p className="max-w-2xl text-gray-400 text-lg md:text-xl font-light mb-12 leading-relaxed bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/5">
          Engineered for absolute perfection. Experience the world's most advanced noise cancelling with industry-leading sound quality.
        </p>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <button 
            onClick={() => scrollToSection("pricing")}
            className="px-10 py-4 bg-neon-blue text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(0,242,255,0.3)]"
          >
            Pre-order Now
          </button>
          
          <button 
            onClick={() => scrollToSection("visualizer")}
            className="px-10 py-4 glass text-white font-medium rounded-full border border-white/20 hover:bg-white/10 transition-all flex items-center gap-3"
          >
            Watch Film
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
              <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-white border-b-[3px] border-b-transparent ml-0.5" />
            </div>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <span className="text-[10px] tracking-[0.4em] text-gray-500 uppercase">Scroll to Discover</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-neon-blue to-transparent" />
      </div>
    </section>
  );
};
