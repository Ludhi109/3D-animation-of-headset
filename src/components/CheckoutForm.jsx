import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Truck, ShieldCheck, Zap } from "lucide-react";

export const CheckoutForm = ({ isOpen, onClose, total, onComplete }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[500]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-sony-black border border-white/10 z-[501] p-10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors">
              <X size={20} />
            </button>

            <div className="mb-10 text-center">
              <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-neon-blue" size={32} />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2">Secure Checkout</h2>
              <p className="text-gray-500 text-xs font-bold tracking-[0.3em] uppercase">Premium Encryption Active</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              onComplete();
            }}>
              <div className="space-y-4">
                <div className="relative">
                  <Truck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Shipping Address" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-neon-blue/50 transition-all outline-none"
                  />
                </div>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Card Number (XXXX XXXX XXXX XXXX)" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-neon-blue/50 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/5 bg-white/5 mt-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Order Total</span>
                  <span className="text-2xl font-bold text-neon-blue">${total}</span>
                </div>
                <div className="flex items-center gap-2 text-[8px] text-green-500 font-bold tracking-[0.2em] uppercase">
                  <Zap size={10} /> Free Express Shipping Included
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-white text-black font-black rounded-xl hover:bg-neon-blue transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
              >
                PAY NOW
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
