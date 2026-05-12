import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, MapPin } from "lucide-react";

export const CheckoutForm = ({ isOpen, onClose, onConfirm, productPrice }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onConfirm(data);
  };

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
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-sony-black border border-white/10 z-[501] p-10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">Delivery Details</h2>
                <p className="text-neon-blue text-sm font-bold mt-1 uppercase tracking-widest">Total: {productPrice}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neon-blue transition-colors" />
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-all"
                  />
                </div>

                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neon-blue transition-colors" />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-all"
                  />
                </div>

                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neon-blue transition-colors" />
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-all"
                  />
                </div>

                <div className="relative group">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-500 group-focus-within:text-neon-blue transition-colors" />
                  <textarea
                    required
                    name="address"
                    placeholder="Shipping Address"
                    rows="3"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-neon-blue text-black font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(0,242,255,0.3)] mt-8"
              >
                Complete Order
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
