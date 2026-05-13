import { motion } from "framer-motion";

const colors = [
  { name: "Midnight Black", hex: "#050505", class: "bg-black" },
  { name: "Platinum Silver", hex: "#d1d1d1", class: "bg-[#d1d1d1]" },
  { name: "Deep Blue", hex: "#0a192f", class: "bg-[#0a192f]" },
];

export const ColorVariants = ({ activeColor, onColorChange }) => {
  return (
    <section className="py-40 border-y border-white/5 relative overflow-hidden flex flex-col items-center">
      {/* Background Full Headset Image - High Visibility Re-applied */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-60 pointer-events-none">
        <img 
          src="https://www.sony.co.in/image/5d02da5df552836db894cead8afc2098?fmt=pjpeg&wid=1200&hei=470&bgcolor=F1F5F9&qlt=43" 
          alt="Headset Backdrop Full" 
          className="w-full h-full object-contain scale-110 mix-blend-lighten"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight">Choose Your Aesthetic</h2>
        
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center">
            {colors.map((color) => (
              <div 
                key={color.name}
                className="flex flex-col items-center gap-6"
              >
                <div 
                  onClick={() => onColorChange(color.hex)}
                  className={`w-24 h-24 rounded-full border-2 cursor-pointer transition-all duration-500 relative group ${activeColor === color.hex ? "border-neon-blue scale-110 shadow-[0_0_40px_rgba(0,242,255,0.4)]" : "border-white/10 hover:border-white/30"}`}
                  style={{ backgroundColor: color.hex }}
                >
                  {activeColor === color.hex && (
                    <motion.div 
                      layoutId="selection-ring"
                      className="absolute -inset-4 border border-neon-blue rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neon-blue rounded-full shadow-[0_0_15px_#00f2ff]" />
                    </motion.div>
                  )}
                </div>
                <span className={`text-[11px] tracking-[0.4em] uppercase transition-all duration-500 ${activeColor === color.hex ? "text-white font-bold opacity-100" : "text-gray-500 opacity-60"}`}>
                  {color.name}
                </span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
