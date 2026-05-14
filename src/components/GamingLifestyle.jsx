import { motion } from "framer-motion";

export const GamingLifestyle = () => {
  return (
    <section className="relative min-h-screen py-32 flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-neon-blue/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-8"
          >
            Level <br /> <span className="text-neon-blue">Up</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-12"
          >
            Low latency, spatial audio, and extreme comfort for marathon gaming sessions. The XM5 isn't just for music; it's your competitive advantage.
          </motion.p>
          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="flex gap-4"
          >
            <div className="glass p-6 rounded-2xl flex-1 text-center">
              <h4 className="text-neon-blue font-bold text-2xl mb-1">24ms</h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Ultra Low Latency</p>
            </div>
            <div className="glass p-6 rounded-2xl flex-1 text-center">
              <h4 className="text-neon-blue font-bold text-2xl mb-1">360°</h4>
              <p className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Spatial Sound</p>
            </div>
          </motion.div>
        </div>

        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-neon-blue/10 rounded-full blur-[100px] animate-pulse" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            className="relative glass p-4 rounded-[4rem] aspect-square flex items-center justify-center overflow-hidden border border-white/10 group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.1)_0%,transparent_70%)] z-10" />
            <img 
              src="/gaming-lifestyle.png" 
              alt="Sony WH-1000XM5 Gaming Experience" 
              className="w-full h-full object-cover rounded-[3.5rem] grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
