import { motion } from "framer-motion";
import { Zap, Mic2, Battery, Cpu, ShieldCheck, Bluetooth } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Unrivaled Noise Cancelling",
    desc: "Industry-leading noise cancellation optimized to you and your environment."
  },
  {
    icon: Zap,
    title: "High-Resolution Audio",
    desc: "Specially developed 30mm driver unit for even more natural sound quality."
  },
  {
    icon: Mic2,
    title: "Crystal Clear Calls",
    desc: "Precise Voice Pickup Technology with newly developed wind noise reduction."
  },
  {
    icon: Battery,
    title: "30-Hour Battery Life",
    desc: "Enough power for even long trips. Quick charge gives 3 hours in 3 minutes."
  },
  {
    icon: Cpu,
    title: "V1 Integrated Processor",
    desc: "Unlocks the full potential of our HD Noise Cancelling Processor QN1."
  },
  {
    icon: Bluetooth,
    title: "Multipoint Connection",
    desc: "Can be paired with two Bluetooth devices at the same time."
  }
];

export const FeatureShowcase = () => {
  return (
    <section className="relative py-32 px-4 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-neon-blue text-xs tracking-[1em] font-black uppercase mb-4">Features</h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">Precision <span className="text-neon-blue">Crafted</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[3rem] border border-white/5 group hover:border-neon-blue/30 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-neon-blue/20 transition-colors">
                <f.icon className="text-neon-blue" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4 tracking-tight uppercase">{f.title}</h4>
              <p className="text-gray-400 font-light leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
