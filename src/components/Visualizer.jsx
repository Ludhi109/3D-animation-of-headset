import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Mic, Volume2 } from "lucide-react";
import { Headset3D } from "./Headset3D";
import { ErrorBoundary } from "./ErrorBoundary";
import userCustomBg from "../assets/user-custom-bg.jpg";

export const Visualizer = () => {
  const [activeMode, setActiveMode] = useState(0);

  const modes = [
    { 
      icon: <Music />, 
      label: "360 Reality", 
      color: "#00f2ff", 
      description: "Immersive spatial audio that wraps around you.",
      speed: 1.5
    },
    { 
      icon: <Mic />, 
      label: "Noise Sensor", 
      color: "#ff00e5", 
      description: "Dual sensors capture ambient noise for perfect silence.",
      speed: 0.8
    },
    { 
      icon: <Volume2 />, 
      label: "DSEE Extreme", 
      color: "#00ff4c", 
      description: "AI-driven upscaling for studio-quality sound.",
      speed: 2.5
    }
  ];

  return (
    <section id="visualizer" className="py-40 bg-black relative overflow-hidden">
      {/* Custom Background Image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src={userCustomBg} 
          alt="Audio Background" 
          className="w-full h-full object-cover mix-blend-screen"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <div className="z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-8 text-gradient"
          >
            Sonic <br /> Visualization
          </motion.h2>
          
          <AnimatePresence mode="wait">
            <motion.p 
              key={activeMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
                className="flex flex-col items-center gap-4 group outline-none"
              >
                <motion.div 
                  animate={{ 
                    borderColor: activeMode === i ? item.color : "rgba(255,255,255,0.05)",
                    backgroundColor: activeMode === i ? `${item.color}11` : "rgba(255,255,255,0.1)",
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
        
        {/* The 'Old Model' - 3D Interactivity in Visualizer */}
        <div className="relative h-[500px] flex items-center justify-center">
            {/* Pulsing Glow behind 3D */}
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute w-64 h-64 rounded-full blur-[80px]"
                style={{ backgroundColor: modes[activeMode].color }}
            />

            <div className="w-full h-full cursor-grab active:cursor-grabbing">
                <ErrorBoundary fallback={<div className="text-gray-500">Visualization Engine Offline</div>}>
                    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <Suspense fallback={null}>
                            <Headset3D 
                                mouse={{ current: [0, 0] }} 
                                color={modes[activeMode].color} 
                            />
                        </Suspense>
                    </Canvas>
                </ErrorBoundary>
            </div>

            {/* Subtle Audio Bars on the side */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-end gap-1 h-32 opacity-30">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ height: [10, Math.random() * 80 + 20, 10] }}
                        transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                        className="w-1 bg-white rounded-full"
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};
