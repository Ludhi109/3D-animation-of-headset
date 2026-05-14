import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Mic, Volume2 } from "lucide-react";
import { Headset3D } from "./Headset3D";
import userCustomBg from "../assets/user-custom-bg.jpg";
import premiumBg from "../assets/premium-bg.png";

export const Visualizer = () => {
  const [activeMode, setActiveMode] = useState(0);

  const modes = [
    { 
      icon: <Music />, 
      label: "360 Reality", 
      color: "#00f2ff", 
      description: "Immersive spatial audio that wraps around you."
    },
    { 
      icon: <Mic />, 
      label: "Noise Sensor", 
      color: "#ff00e5", 
      description: "Dual sensors capture ambient noise for perfect silence."
    },
    { 
      icon: <Volume2 />, 
      label: "DSEE Extreme", 
      color: "#00ff4c", 
      description: "AI-driven upscaling for studio-quality sound."
    }
  ];

  return (
    <section id="visualizer" className="py-32 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <div className="z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-neon-blue text-xs tracking-[1em] font-black uppercase mb-4">Acoustics</h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8">
              Sonic <br /> <span className="text-neon-blue">Engine</span>
            </h3>
            
            <AnimatePresence mode="wait">
              <motion.p 
                key={activeMode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-gray-400 text-xl font-light mb-12 h-20 max-w-md"
              >
                {modes[activeMode].description}
              </motion.p>
            </AnimatePresence>
            
            <div className="flex gap-6 pointer-events-auto">
              {modes.map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveMode(i)}
                  className="flex flex-col items-center gap-4 group cursor-pointer"
                >
                  <motion.div 
                    animate={{ 
                      borderColor: activeMode === i ? item.color : "rgba(255,255,255,0.05)",
                      backgroundColor: activeMode === i ? `${item.color}22` : "rgba(255,255,255,0.05)",
                    }}
                    className="p-6 rounded-[2rem] border transition-all duration-500 text-gray-500"
                    style={{ color: activeMode === i ? item.color : "" }}
                  >
                    {item.icon}
                  </motion.div>
                  <span className={`text-[8px] uppercase tracking-[0.4em] font-bold transition-colors duration-500 ${activeMode === i ? "text-white" : "text-gray-600"}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="relative h-[600px] flex items-center justify-center">
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
                style={{ backgroundColor: modes[activeMode].color }}
            />

            <div className="w-full h-full relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative w-full h-full"
              >
                <img 
                  src="/bg-sequence/ezgif-frame-240.jpg" 
                  alt="Sony WH-1000XM5 Wireframe" 
                  className="w-full h-full object-contain brightness-150 drop-shadow-[0_0_80px_rgba(0,242,255,0.4)]"
                />
              </motion.div>
            </div>

            {/* Audio Bars Overlay */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-end gap-2 h-12 opacity-50">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ height: [4, Math.random() * 40 + 8, 4] }}
                        transition={{ duration: 0.3 + Math.random(), repeat: Infinity }}
                        className="w-[2px] rounded-full"
                        style={{ backgroundColor: modes[activeMode].color }}
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};
