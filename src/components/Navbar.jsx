import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, X } from "lucide-react";
import { useState } from "react";

export const Navbar = ({ cartCount = 0, onCartClick, view, setView }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "circOut" }}
      className="fixed top-0 left-0 w-full z-[100] bg-black/20 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-10 py-6 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
          <span className="text-3xl font-black tracking-tighter text-white">SONY</span>
        </div>
        
        {/* Center: Navigation */}
        <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">
          <button onClick={() => scrollToSection("hero")} className="hover:text-white transition-colors cursor-pointer">Experience</button>
          <button onClick={() => scrollToSection("showcase")} className="hover:text-white transition-colors cursor-pointer">Specifications</button>
          <button onClick={() => scrollToSection("visualizer")} className="hover:text-white transition-colors cursor-pointer">Audio</button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-8">
          <div className="relative group cursor-pointer" onClick={onCartClick}>
            <ShoppingBag className="w-5 h-5 text-white group-hover:text-neon-blue transition-colors" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-neon-blue text-black text-[8px] font-black rounded-full flex items-center justify-center shadow-[0_0_15px_#00f2ff]"
                >
                  {cartCount}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => scrollToSection("pricing")}
            className="buy-now-glow px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-black cursor-pointer"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </motion.nav>

    {/* Premium Search Overlay */}
    <AnimatePresence>
        {isSearchOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6"
            >
                <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors"
                >
                    <X size={32} />
                </button>
                <div className="w-full max-w-2xl">
                    <input 
                        autoFocus
                        type="text" 
                        placeholder="Search for perfection..." 
                        className="w-full bg-transparent border-b-2 border-white/10 py-6 text-4xl md:text-6xl font-black text-white focus:outline-none focus:border-neon-blue transition-colors placeholder:text-white/5 uppercase tracking-tighter"
                    />
                    <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
                        {["XM5 Black", "XM5 Silver", "Midnight Blue", "Technical Specs"].map((tag) => (
                            <span key={tag} className="px-6 py-2 rounded-full border border-white/5 text-[8px] uppercase tracking-widest text-white/40 hover:border-neon-blue hover:text-neon-blue transition-all cursor-pointer whitespace-nowrap">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        )}
    </AnimatePresence>

    {/* Premium User Modal */}
    <AnimatePresence>
        {isUserOpen && (
            <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="fixed top-24 right-10 z-[200] w-96 glass rounded-[2.5rem] p-10 border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-neon-blue/20 border border-neon-blue/50 flex items-center justify-center">
                        <User className="text-neon-blue" size={20} />
                    </div>
                    <div>
                        <h4 className="text-white font-black text-xs uppercase tracking-widest">Sony Account</h4>
                        <p className="text-neon-blue text-[8px] uppercase tracking-[0.2em] font-bold">Standard Member</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {[
                        { name: "Profile", status: "Active" },
                        { name: "Orders", status: "0 Items" },
                        { name: "My Products", status: "XM5 Registered" },
                        { name: "Sign Out", status: null }
                    ].map((item) => (
                        <button 
                            key={item.name} 
                            onClick={() => alert(`${item.name} functionality initialized.`)}
                            className="group w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all text-left"
                        >
                            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all">
                                {item.name}
                            </span>
                            {item.status && (
                                <span className="text-[8px] uppercase tracking-widest text-neon-blue/40 group-hover:text-neon-blue transition-colors">
                                    {item.status}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={() => setIsUserOpen(false)}
                    className="mt-10 w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[8px] font-black uppercase tracking-widest text-white/60 hover:bg-neon-blue hover:text-black transition-all"
                >
                    Close
                </button>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};
