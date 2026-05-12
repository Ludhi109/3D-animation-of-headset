import { motion } from "framer-motion";

const colors = [
  { name: "Midnight Black", hex: "#050505", class: "bg-black" },
  { name: "Platinum Silver", hex: "#d1d1d1", class: "bg-[#d1d1d1]" },
  { name: "Deep Blue", hex: "#0a192f", class: "bg-[#0a192f]" },
];

export const ColorVariants = ({ activeColor, onColorChange }) => {
  return (
    <section className="py-24 border-y border-white/5 bg-sony-black/50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Choose Your Aesthetic</h2>
        
        <div className="flex justify-center gap-12 items-center">
            {colors.map((color) => (
              <div 
                key={color.name}
                className="flex flex-col items-center gap-6"
              >
                <div 
                  onClick={() => onColorChange(color.hex)}
                  className={`w-20 h-20 rounded-full border-2 cursor-pointer transition-all duration-500 relative group ${activeColor === color.hex ? "border-neon-blue scale-110 shadow-[0_0_30px_rgba(0,242,255,0.4)]" : "border-white/5 hover:border-white/20"}`}
                  style={{ backgroundColor: color.hex }}
                >
                  {activeColor === color.hex && (
                    <motion.div 
                      layoutId="selection-ring"
                      className="absolute -inset-3 border border-neon-blue rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neon-blue rounded-full shadow-[0_0_10px_#00f2ff]" />
                    </motion.div>
                  )}
                </div>
                <span className={`text-[10px] tracking-[0.3em] uppercase transition-colors duration-500 ${activeColor === color.hex ? "text-neon-blue font-bold" : "text-gray-500"}`}>
                  {color.name}
                </span>
              </div>
            ))}

        </div>
      </div>
    </section>
  );
};
