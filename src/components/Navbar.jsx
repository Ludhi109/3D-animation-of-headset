import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export const Navbar = ({ cartCount = 0, onCartClick }) => {
  const scrollToSection = (id) => {
    console.log(`Scrolling to ${id}`);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Element with id ${id} not found`);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between backdrop-blur-md border-b border-white/5 bg-black/10"
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
        <span className="text-2xl font-bold tracking-tighter text-gradient">SONY</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-light tracking-widest uppercase text-gray-400">
        <button onClick={() => scrollToSection("hero")} className="hover:text-neon-blue transition-colors cursor-pointer">Experience</button>
        <button onClick={() => scrollToSection("features")} className="hover:text-neon-blue transition-colors cursor-pointer">Specifications</button>
        <button onClick={() => scrollToSection("visualizer")} className="hover:text-neon-blue transition-colors cursor-pointer">Audio</button>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative group cursor-pointer" onClick={onCartClick}>

          <ShoppingBag className="w-6 h-6 text-white group-hover:text-neon-blue transition-colors" />
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-neon-blue text-black text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_#00f2ff]"
              >
                {cartCount}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={() => scrollToSection("pricing")}
          className="px-6 py-2 bg-neon-blue text-black text-xs font-bold uppercase tracking-widest rounded-full neon-glow hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          Buy Now
        </button>
      </div>
    </motion.nav>
  );
};


