import { motion } from "framer-motion";
import premiumBg from "../assets/premium-bg.png";

export const Experience = ({ color = "#00f2ff", explosionProgress = 0, mousePos = { x: 0, y: 0 } }) => {
  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
      {/* Blue Wireframe Headset Centerpiece */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          rotateY: mousePos.x * 5,
          rotateX: -mousePos.y * 5
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-full h-full max-w-5xl"
      >
        <img 
          src="/bg-sequence/ezgif-frame-240.jpg" 
          alt="Sony WH-1000XM5 Wireframe" 
          className="w-full h-full object-contain brightness-150 contrast-125 drop-shadow-[0_0_80px_rgba(0,242,255,0.4)]"
        />
        
        {/* Dynamic Nodes Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-[45%] left-[30%] w-3 h-3 bg-neon-blue rounded-full shadow-[0_0_20px_#00f2ff]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute top-[52%] right-[32%] w-2 h-2 bg-neon-blue rounded-full shadow-[0_0_15px_#00f2ff]" 
          />
        </div>
      </motion.div>
    </div>
  );
};



