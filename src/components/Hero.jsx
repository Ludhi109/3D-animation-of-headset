import { motion } from "framer-motion";
import heroImage from "../assets/premium-bg.png";

export const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-neon-blue/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-neon-blue/5 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      {/* Main Product Image (Full Headset) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none"
      >
        <img 
          src="/bg-sequence/ezgif-frame-240.jpg" 
          alt="Sony WH-1000XM5 Wireframe" 
          className="w-full max-w-5xl h-auto object-contain opacity-60 brightness-150"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sony-black via-transparent to-sony-black opacity-60" />
      </motion.div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-neon-blue text-[10px] tracking-[1.5em] font-black uppercase mb-8 neon-text-glow">
            Evolution of Sound
          </h2>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-12">
            SONY <span className="text-neon-blue">XM5</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl font-light tracking-wide leading-relaxed mb-12">
            Immersive silence. Exceptional sound. The pinnacle of wireless noise-cancelling technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex gap-8 justify-center pointer-events-auto"
        >
          <button 
            onClick={() => scrollToSection("visualizer")}
            className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-neon-blue transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer"
          >
            Experience Now
          </button>
          <button 
            onClick={() => scrollToSection("showcase")}
            className="px-10 py-5 border border-white/10 glass text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:border-neon-blue transition-all duration-500 cursor-pointer"
          >
            View Details
          </button>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] tracking-[0.5em] text-gray-500 uppercase font-bold">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-blue to-transparent" />
      </motion.div>
    </section>
  );
};
