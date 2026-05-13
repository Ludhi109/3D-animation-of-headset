import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Mic, Volume2 } from "lucide-react";

export const Visualizer = () => {
  const [activeMode, setActiveMode] = useState(0);

  const modes = [
    { 
      icon: <Music />, 
      label: "360 Reality", 
      color: "#00f2ff", 
      description: "Immersive spatial audio that wraps around you.",
      speed: 1.5,
      bars: 40
    },
    { 
      icon: <Mic />, 
      label: "Noise Sensor", 
      color: "#ff00e5", 
      description: "Dual sensors capture ambient noise for perfect silence.",
      speed: 0.8,
      bars: 30
    },
    { 
      icon: <Volume2 />, 
      label: "DSEE Extreme", 
      color: "#00ff4c", 
      description: "AI-driven upscaling for studio-quality sound.",
      speed: 2.5,
      bars: 50
    }
  ];

  return (
    <section id="visualizer" className="py-40 bg-black relative overflow-hidden flex flex-col items-center">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center z-10 w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-8 text-gradient"
        >
          Sonic Visualization
        </motion.h2>
        
        <AnimatePresence mode="wait">
          <motion.p 
            key={activeMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-lg md:text-xl font-light mb-16 max-w-2xl mx-auto"
          >
            {modes[activeMode].description}
          </motion.p>
        </AnimatePresence>

        {/* Cinematic Reactive Visualization */}
        <div className="relative h-[500px] w-full flex items-center justify-center mb-20 overflow-hidden">
          {/* Audio Rings (The 'Circles' from screenshot) */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`ring-${activeMode}-${i}`}
              animate={{ 
                scale: [1, 1.2 + i * 0.1, 1],
                opacity: [0.1, 0.4, 0.1],
                borderColor: modes[activeMode].color
              }}
              transition={{ 
                duration: 3 / modes[activeMode].speed, 
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute w-[300px] h-[300px] border-2 rounded-full pointer-events-none"
              style={{ boxShadow: `0 0 50px ${modes[activeMode].color}22` }}
            />
          ))}

          {/* Central Headset Silhouette (Neon Outline) */}
          <motion.div 
            animate={{ 
              y: [0, -15, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-64 h-64 flex items-center justify-center"
          >
            <div className="w-48 h-48 border-4 border-white/20 rounded-full flex items-center justify-center relative">
               {/* Headband part */}
               <div className="absolute top-0 w-32 h-32 border-t-4 border-neon-blue rounded-full opacity-80" />
               <Music className="w-20 h-20 text-white opacity-20" />
            </div>
          </motion.div>

          {/* The Audio Wave (Bars from screenshot) */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 px-10 pointer-events-none">
            {[...Array(modes[activeMode].bars)].map((_, i) => (
              <motion.div
                key={`${activeMode}-bar-${i}`}
                animate={{ 
                  height: [20, Math.random() * 250 + 50, 20],
                  backgroundColor: modes[activeMode].color,
                }}
                transition={{ 
                  duration: modes[activeMode].speed + Math.random() * 0.5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.02
                }}
                className="w-1 md:w-2 rounded-full opacity-60"
                style={{ boxShadow: `0 0 15px ${modes[activeMode].color}66` }}
              />
            ))}
          </div>
        </div>
        
        {/* Mode Selectors */}
        <div className="flex justify-center gap-8 md:gap-16">
          {modes.map((item, i) => (
            <button 
              key={i} 
              onClick={() => setActiveMode(i)}
              className="flex flex-col items-center gap-4 group outline-none"
            >
              <motion.div 
                animate={{ 
                  borderColor: activeMode === i ? item.color : "rgba(255,255,255,0.05)",
                  backgroundColor: activeMode === i ? `${item.color}11` : "rgba(255,255,255,0.05)",
                  scale: activeMode === i ? 1.1 : 1
                }}
                className="p-6 rounded-3xl border-2 transition-all duration-500 cursor-pointer text-gray-500"
                style={{ color: activeMode === i ? item.color : "" }}
              >
                {item.icon}
              </motion.div>
              <span className={`text-[10px] uppercase tracking-[0.4em] transition-colors duration-500 ${activeMode === i ? "text-white font-bold" : "text-gray-600"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

