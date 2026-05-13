import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Mic, Volume2 } from "lucide-react";

// Use the same premium image as the Hero for consistency
const headsetImage = "https://www.sony.co.in/image/5d02da5df552836db894cead8afc2098?fmt=pjpeg&wid=1200&hei=470&bgcolor=F1F5F9&qlt=43";

export const Visualizer = () => {
  const [activeMode, setActiveMode] = useState(0);

  const modes = [
    { 
      icon: <Music />, 
      label: "360 Reality", 
      color: "#00f2ff", 
      description: "Immersive spatial audio that wraps around you.",
      speed: 1.5,
      bars: 50
    },
    { 
      icon: <Mic />, 
      label: "Noise Sensor", 
      color: "#ff00e5", 
      description: "Dual sensors capture ambient noise for perfect silence.",
      speed: 0.8,
      bars: 40
    },
    { 
      icon: <Volume2 />, 
      label: "DSEE Extreme", 
      color: "#00ff4c", 
      description: "AI-driven upscaling for studio-quality sound.",
      speed: 2.5,
      bars: 60
    }
  ];

  return (
    <section id="visualizer" className="py-60 bg-black relative overflow-hidden flex flex-col items-center">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[150px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center z-10 w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-[5rem] font-bold mb-6 text-gradient drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          Sonic Visualization
        </motion.h2>
        
        <AnimatePresence mode="wait">
          <motion.p 
            key={activeMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-lg md:text-xl font-light mb-24 max-w-2xl mx-auto"
          >
            {modes[activeMode].description}
          </motion.p>
        </AnimatePresence>

        {/* Cinematic Reactive Visualization */}
        <div className="relative h-[600px] w-full flex items-center justify-center mb-32 overflow-visible">
          {/* Audio Wave Pattern (Bars from screenshot) */}
          <div className="absolute inset-0 flex items-center justify-center gap-1 md:gap-3 px-4 pointer-events-none">
            {[...Array(modes[activeMode].bars)].map((_, i) => (
              <motion.div
                key={`${activeMode}-bar-${i}`}
                animate={{ 
                  height: [20, Math.random() * 350 + 80, 20],
                  backgroundColor: modes[activeMode].color,
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{ 
                  duration: modes[activeMode].speed + Math.random() * 0.5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.015
                }}
                className="w-1 md:w-3 rounded-full"
                style={{ 
                    boxShadow: `0 0 20px ${modes[activeMode].color}66`,
                    mixBlendMode: "screen"
                }}
              />
            ))}
          </div>

          {/* Rotating Rings (The 'Circles' from screenshot) */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`ring-${activeMode}-${i}`}
              animate={{ 
                rotate: [0, 360],
                borderColor: modes[activeMode].color,
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ 
                duration: (10 - i * 2) / modes[activeMode].speed, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-[450px] h-[450px] border-[1px] border-dashed rounded-full pointer-events-none"
              style={{ boxShadow: `0 0 40px ${modes[activeMode].color}11` }}
            />
          ))}

          {/* Central Photorealistic Headset with Glow */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.03, 1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-[400px] h-[400px] flex items-center justify-center"
          >
            {/* Pulsing Inner Glow */}
            <motion.div 
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-64 h-64 rounded-full"
                style={{ backgroundColor: modes[activeMode].color, filter: "blur(60px)" }}
            />
            
            <img 
                src={headsetImage} 
                alt="Sony Visualizer" 
                className="w-full h-full object-contain mix-blend-lighten drop-shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10"
            />
            
            {/* Music Note Centerpiece (as seen in screenshot) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <Music className="w-32 h-32 text-white blur-[2px]" />
            </div>
          </motion.div>
        </div>
        
        {/* Mode Selectors */}
        <div className="flex justify-center gap-6 md:gap-16">
          {modes.map((item, i) => (
            <button 
              key={i} 
              onClick={() => setActiveMode(i)}
              className="flex flex-col items-center gap-4 group outline-none"
            >
              <motion.div 
                animate={{ 
                  borderColor: activeMode === i ? item.color : "rgba(255,255,255,0.05)",
                  backgroundColor: activeMode === i ? `${item.color}22` : "rgba(255,255,255,0.05)",
                  scale: activeMode === i ? 1.1 : 1,
                  boxShadow: activeMode === i ? `0 0 30px ${item.color}44` : "none"
                }}
                className="p-6 rounded-[2rem] border-2 transition-all duration-500 cursor-pointer text-gray-500"
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

