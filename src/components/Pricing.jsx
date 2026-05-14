import { motion } from "framer-motion";
import { Check, ShoppingCart, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Pricing = ({ onAddToCart, onOrderNow }) => {
  const [selectedPlan, setSelectedPlan] = useState(1);

  const products = [
    { name: "WH-1000XM4", price: "$349", features: ["Active Noise Cancelling", "30h Battery Life", "Touch Control Panel"], id: "xm4" },
    { name: "WH-1000XM5", price: "$399", features: ["Industry Leading ANC", "8 Microphones", "V1 Integrated Processor", "Ultra-lightweight Design"], premium: true, id: "xm5" },
    { name: "WH-CH720N", price: "$149", features: ["Digital Noise Cancelling", "35h Battery Life", "Multi-point Connection"], id: "ch720" }
  ];

  return (
    <section className="container mx-auto px-6 relative z-10">
      <div className="flex flex-col items-center mb-20 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-neon-blue font-bold tracking-[0.4em] text-[10px] uppercase mb-4"
        >
          Limited Edition Pricing
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Choose Your Sound</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        {products.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            onClick={() => setSelectedPlan(i)}
            className={`p-10 rounded-[3rem] border flex flex-col cursor-pointer transition-all duration-700 relative group overflow-hidden ${
              selectedPlan === i 
                ? "border-neon-blue/50 bg-neon-blue/5 shadow-[0_0_80px_rgba(0,242,255,0.1)] py-14" 
                : "border-white/5 glass hover:border-white/20 py-10 opacity-70 hover:opacity-100"
            }`}
          >
            {plan.premium && (
              <div className="absolute top-6 right-6">
                <div className="bg-neon-blue text-black text-[8px] font-black uppercase px-3 py-1 rounded-full shadow-[0_0_15px_#00f2ff]">
                  Premium
                </div>
              </div>
            )}
            
            <h3 className={`text-2xl font-bold mb-2 tracking-tight ${selectedPlan === i ? "text-neon-blue" : "text-white"}`}>
              {plan.name}
            </h3>
            <div className="flex items-baseline gap-1 mb-10">
              <span className="text-4xl font-black tracking-tighter">{plan.price}</span>
              <span className="text-gray-500 text-xs font-light">/ Limited Edition</span>
            </div>
            
            <ul className="space-y-6 mb-12 flex-1">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-gray-400 font-light leading-none">
                  <Check className={`w-4 h-4 mt-0.5 transition-colors ${selectedPlan === i ? "text-neon-blue" : "text-gray-700"}`} />
                  {feature}
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col gap-4 relative z-10">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onOrderNow(plan);
                }}
                className={`w-full py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-95 group/btn ${
                  selectedPlan === i 
                    ? "bg-neon-blue text-black shadow-[0_0_30px_rgba(0,242,255,0.4)]" 
                    : "bg-white text-black hover:bg-neon-blue"
                }`}
              >
                <span className="uppercase tracking-widest text-[10px]">Buy Now</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(plan);
                }}
                className="w-full py-5 rounded-2xl font-bold bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-95 border border-white/5"
              >
                <ShoppingCart className="w-4 h-4 opacity-50" />
                <span className="text-[10px] uppercase tracking-widest">Add to cart</span>
              </button>
            </div>

            {/* Background Accent */}
            <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[100px] transition-opacity duration-1000 ${selectedPlan === i ? "bg-neon-blue/20" : "bg-white/5"}`} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};



