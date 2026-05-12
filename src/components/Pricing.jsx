import { motion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";

export const Pricing = ({ onAddToCart, onOrderNow }) => {
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
              whileHover={{ scale: 1.02 }}
              className={`p-10 rounded-3xl border flex flex-col ${plan.premium ? "border-neon-blue neon-glow bg-neon-blue/5" : "border-white/10 glass"} transition-all`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-8 text-gradient">{plan.price}</div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-gray-300 font-light">
                    <Check className="w-5 h-5 text-neon-blue" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => onOrderNow(plan)}
                  className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${plan.premium ? "bg-neon-blue text-black" : "bg-white text-black"}`}
                >
                  Order Now
                </button>
                <button 
                  onClick={() => onAddToCart(plan)}
                  className="w-full py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
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



