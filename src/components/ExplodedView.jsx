import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const components = [
  { name: "01 / EAR CUSHIONS", desc: "Pressure-relieving soft fit leather for long-lasting comfort." },
  { name: "02 / SPEAKER DRIVERS", desc: "30mm specially designed carbon fiber driver unit." },
  { name: "03 / BATTERY MODULE", desc: "Up to 30 hours of playback with quick charge support." },
  { name: "04 / NC MICROPHONES", desc: "8 microphones controlled by two processors for silence." },
  { name: "05 / BLUETOOTH CHIPSET", desc: "V1 Integrated Processor for high-fidelity audio." },
  { name: "06 / SOUND CHAMBERS", desc: "Optimized acoustic design for natural sound quality." }
];

export const ExplodedView = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [0, 1, 1, 0]);
  const cardsOpacity = useTransform(scrollYProgress, [0.5, 0.7, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} className="relative h-[400vh]">
      {/* Sticky Text Overlays */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-32 px-4 pointer-events-none">
        
        <motion.div 
          style={{ opacity: titleOpacity }}
          className="text-center mb-40"
        >
          <h2 className="text-neon-blue text-[10px] tracking-[1em] font-black uppercase mb-4 neon-text-glow">Internal</h2>
          <h3 className="text-6xl md:text-9xl font-black tracking-tighter uppercase">Precision <br /> Engineering</h3>
        </motion.div>

        <motion.div 
          style={{ opacity: cardsOpacity }}
          className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
        >
          {components.map((c, i) => (
            <div
              key={i}
              className="p-8 glass rounded-[2.5rem] border border-white/5 backdrop-blur-3xl"
            >
              <h4 className="text-neon-blue font-bold text-[10px] tracking-widest mb-3 uppercase">{c.name}</h4>
              <p className="text-sm text-gray-400 font-light leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
