import { motion } from "framer-motion";
import { Cpu, Music, Battery, Zap, ShieldCheck, Bluetooth } from "lucide-react";

const features = [
  {
    title: "V1 Processor",
    description: "Unlocks the full potential of our HD Noise Cancelling Processor QN1 for unprecedented clarity.",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    title: "Spatial Audio",
    description: "Immersive sound that wraps around you, creating a cinematic experience in your ears.",
    icon: <Music className="w-6 h-6" />,
  },
  {
    title: "40H Battery",
    description: "Power for the long haul. 3 minutes of charge gives you 3 hours of playback.",
    icon: <Battery className="w-6 h-6" />,
  },
  {
    title: "Bluetooth 5.3",
    description: "Seamless connectivity with multi-point pairing for all your devices.",
    icon: <Bluetooth className="w-6 h-6" />,
  },
];

export const Features = () => {
  return (
    <section id="features" className="container mx-auto px-6 relative z-10 py-24">
      <div className="flex flex-col items-center mb-20 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-neon-blue font-bold tracking-[0.4em] text-[10px] uppercase mb-4"
        >
          Technological Superiority
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Beyond The Silence</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            className="glass-card p-10 rounded-[2.5rem] transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
              {feature.icon}
            </div>
            
            <div className="mb-8 p-4 bg-neon-blue/10 rounded-2xl w-fit group-hover:bg-neon-blue group-hover:text-black transition-all duration-500">
              {feature.icon}
            </div>
            
            <h3 className="text-xl font-bold mb-4 tracking-tight">{feature.title}</h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              {feature.description}
            </p>

            <div className="mt-8 flex items-center gap-2 text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-[10px] font-bold uppercase tracking-widest">Learn More</span>
              <Zap size={10} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
