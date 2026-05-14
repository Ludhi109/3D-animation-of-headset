import { motion } from "framer-motion";
import { Globe, Share2, MessageCircle, Play, ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative pt-32 pb-12 px-4 md:px-20 border-t border-white/5 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-black italic tracking-tighter mb-8">SONY</h2>
            <p className="max-w-xs text-gray-500 font-light leading-relaxed mb-12">
              Innovating at the intersection of sound, technology, and art to create the future of acoustic experiences.
            </p>
            <div className="flex gap-6">
              {[Globe, Share2, MessageCircle, Play].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center text-gray-500 hover:text-neon-blue hover:border-neon-blue transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8">Products</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-light">
              {["Headphones", "Noise Cancelling", "Earbuds", "Gaming Gear"].map((item) => (
                <li key={item}><a href="#" className="hover:text-neon-blue transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8">Support</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-light">
              {["Product Support", "Warranty", "Returns", "Contact Us"].map((item) => (
                <li key={item}><a href="#" className="hover:text-neon-blue transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:row-row justify-between items-center gap-8 border-t border-white/5 pt-12 text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
          <p>© 2024 Sony Corporation. All rights reserved.</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
