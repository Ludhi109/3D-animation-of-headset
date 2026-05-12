import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";

export const CartSidebar = ({ isOpen, onClose, items, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + parseInt(item.price.replace("$", "")), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-sony-black border-l border-white/10 z-[201] p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                  <div className="w-16 h-16 border-2 border-dashed border-gray-700 rounded-full flex items-center justify-center">
                    <Trash2 className="w-6 h-6 opacity-20" />
                  </div>
                  <p className="font-light tracking-widest uppercase text-xs">Cart is Empty</p>
                </div>
              ) : (
                items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 glass rounded-2xl border border-white/5"
                  >
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-neon-blue font-bold">{item.price}</p>
                    </div>
                    <button 
                      onClick={() => onRemove(i)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-400 font-light tracking-widest uppercase text-sm">Total Amount</span>
                <span className="text-3xl font-bold text-gradient">${total}</span>
              </div>
              <button 
                onClick={onCheckout}
                disabled={items.length === 0}
                className="w-full py-5 bg-neon-blue text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(0,242,255,0.3)] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
              >
                Checkout Now
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

