import { useState } from "react";
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
      heightRange: [50, 300]
    },
    { 
      icon: <Mic />, 
      label: "Noise Sensor", 
      color: "#ff00e5", 
      description: "Dual sensors capture ambient noise for perfect silence.",
      speed: 0.8,
      heightRange: [20, 150]
    },
    { 
      icon: <Volume2 />, 
      label: "DSEE Extreme", 
      color: "#00ff4c", 
      description: "AI-driven upscaling for studio-quality sound.",
      speed: 2.5,
      heightRange: [100, 350]
    }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-gradient">Sonic <br /> Visualization</h2>
          
          <AnimatePresence mode="wait">
            <motion.p 
              key={activeMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-gray-400 text-xl font-light mb-12 h-20"
            >
              {modes[activeMode].description}
            </motion.p>
          </AnimatePresence>
          
          <div className="flex gap-8">
            {modes.map((item, i) => (
              <button 
                key={i} 
                onClick={() => setActiveMode(i)}
                className="flex flex-col items-center gap-3 group outline-none"
              >
                <motion.div 
                  animate={{ 
                    borderColor: activeMode === i ? item.color : "rgba(255,255,255,0.05)",
                    boxShadow: activeMode === i ? `0 0 20px ${item.color}33` : "none"
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all duration-500 bg-white/5 group-hover:bg-white/10 cursor-pointer ${activeMode === i ? "text-white" : "text-gray-500"}`}
                  style={{ color: activeMode === i ? item.color : "" }}
                >
                  {item.icon}
                </motion.div>
                <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${activeMode === i ? "text-white font-bold" : "text-gray-600"}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="order-1 lg:order-2 h-[400px] flex items-end justify-center gap-3 px-8">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={`${activeMode}-${i}`}
              initial={{ height: 20 }}
              animate={{ 
                height: [
                  20, 
                  Math.random() * (modes[activeMode].heightRange[1] - modes[activeMode].heightRange[0]) + modes[activeMode].heightRange[0], 
                  20
                ],
                backgroundColor: modes[activeMode].color,
                boxShadow: `0 0 15px ${modes[activeMode].color}66`
              }}
              transition={{ 
                duration: modes[activeMode].speed + Math.random() * 0.5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.03
              }}
              className="w-full rounded-full"
              style={{ maxWidth: "6px" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

