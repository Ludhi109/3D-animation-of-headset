import { motion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";

export const Pricing = ({ onAddToCart, onOrderNow }) => {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to XM5

  const products = [
    { name: "WH-1000XM4", price: "$349", features: ["Active Noise Cancelling", "30h Battery", "Touch Controls"] },
    { name: "WH-1000XM5", price: "$399", features: ["Industry Leading ANC", "8 Microphones", "Integrated V1 Processor", "Ultra-lightweight"], premium: true },
    { name: "WH-CH720N", price: "$149", features: ["Noise Cancelling", "35h Battery", "Multi-point connection"] }
  ];

  return (
    <section className="py-32 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Sound</h2>
          <p className="text-gray-400 font-light">Select the perfect companion for your journey.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedPlan(i)}
              className={`p-10 rounded-[2.5rem] border flex flex-col cursor-pointer transition-all duration-500 relative group ${selectedPlan === i ? "border-neon-blue neon-glow bg-neon-blue/5 scale-105 z-20" : "border-white/10 glass hover:border-white/30 z-10"}`}
            >
              {plan.premium && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-bold uppercase rounded-full shadow-[0_0_20px_#00f2ff] transition-all ${selectedPlan === i ? "bg-neon-blue text-black" : "bg-gray-800 text-gray-400"}`}>
                  Popular Choice
                </div>
              )}
              
              <h3 className={`text-2xl font-bold mb-2 transition-colors ${selectedPlan === i ? "text-neon-blue" : "group-hover:text-white"}`}>{plan.name}</h3>
              <div className="text-4xl font-bold mb-8 text-gradient">{plan.price}</div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-gray-300 font-light">
                    <Check className={`w-5 h-5 transition-colors ${selectedPlan === i ? "text-neon-blue" : "text-gray-600"}`} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOrderNow(plan);
                  }}
                  className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${selectedPlan === i ? "bg-neon-blue text-black shadow-[0_0_30px_rgba(0,242,255,0.3)]" : "bg-white text-black hover:bg-neon-blue hover:text-black"}`}
                >
                  Order Now
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(plan);
                  }}
                  className="w-full py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 border border-white/5"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="text-sm">Add to Cart</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



