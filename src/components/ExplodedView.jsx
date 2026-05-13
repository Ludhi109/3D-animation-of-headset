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

  return (
    <section ref={targetRef} className="relative h-[250vh]">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-sony-black/30" />

      {/* Sticky Content Overlay */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden pointer-events-none">
        <div className="text-center mb-16 relative z-30">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">Precision Components</h2>
          <p className="text-gray-400 font-light max-w-lg mx-auto">Scroll to see the engineering masterpiece disassembled in real-time.</p>
        </div>
        
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-30">
          {components.map((c, i) => (
            <div
              key={i}
              className="p-8 glass rounded-[2rem] border border-white/5 backdrop-blur-xl"
            >
              <h4 className="text-neon-blue font-bold text-xs tracking-widest mb-3 uppercase">{c.name}</h4>
              <p className="text-sm text-gray-300 font-light leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
