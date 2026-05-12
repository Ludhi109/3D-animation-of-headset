import { motion } from "framer-motion";
import { Cpu, Music, Battery, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "V1 Processor",
    description: "Specially developed by Sony, the Integrated Processor V1 unlocks the full potential of our HD Noise Cancelling Processor QN1.",
    icon: <Cpu className="w-8 h-8 text-neon-blue" />,
  },
  {
    title: "High-Resolution Audio",
    description: "Supports High-Resolution Audio and High-Resolution Audio Wireless, thanks to LDAC.",
    icon: <Music className="w-8 h-8 text-neon-blue" />,
  },
  {
    title: "30-Hour Battery",
    description: "Enough power for even long trips. If you need to top up in a hurry, you can get 3 hours' worth of charge in just 3 minutes.",
    icon: <Battery className="w-8 h-8 text-neon-blue" />,
  },
  {
    title: "Adaptive Sound",
    description: "A smart function that senses where you are and what you're doing, then adjusts ambient sound settings for the ideal listening experience.",
    icon: <ShieldCheck className="w-8 h-8 text-neon-blue" />,
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Precision Engineering</h2>
        <div className="w-24 h-1 bg-neon-blue mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="glass p-8 rounded-3xl border border-white/10 hover:border-neon-blue/50 transition-all duration-500"
          >
            <div className="mb-6 p-4 bg-neon-blue/10 rounded-2xl w-fit">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
