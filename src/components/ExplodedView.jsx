import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollSequence } from "./ScrollSequence";

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

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const textOpacity1 = useTransform(scrollYProgress, [0.1, 0.2, 0.4, 0.5], [0, 1, 1, 0]);
  const textOpacity2 = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} className="relative h-[600vh]">
      {/* High-fidelity Image Sequence */}
      <ScrollSequence />

      {/* Overlay Content */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4">
          


          <motion.div 
            style={{ opacity: textOpacity2 }}
            className="absolute inset-0 flex items-center justify-center px-4"
          >
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {components.map((c, i) => (
                <div
                  key={i}
                  className="p-8 glass rounded-3xl border border-white/5 backdrop-blur-xl"
                >
                  <h4 className="text-neon-blue font-bold text-xs tracking-widest mb-3 uppercase">{c.name}</h4>
                  <p className="text-sm text-gray-300 font-light leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};


