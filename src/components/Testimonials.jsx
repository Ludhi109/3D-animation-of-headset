import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Music Producer",
    content: "The noise cancellation is unmatched. It's like having a silent studio wherever I go. Truly transformative.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Tech Enthusiast",
    content: "The 3D audio experience feels like being in the front row of a concert. Sony has outdone themselves again.",
    rating: 5,
  },
  {
    name: "Marcus Thorne",
    role: "Frequent Traveler",
    content: "Battery life that actually lasts my longest flights. And the soft-fit leather is incredibly comfortable.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="container mx-auto px-6 relative z-10">
      <div className="flex flex-col items-center mb-20 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-neon-blue font-bold tracking-[0.4em] text-[10px] uppercase mb-4"
        >
          Voices of Excellence
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Loved by Professionals</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="glass-card p-12 rounded-[3rem] border border-white/5 relative group"
          >
            <Quote className="absolute top-10 right-10 w-12 h-12 text-neon-blue opacity-5 group-hover:opacity-20 transition-opacity" />
            
            <div className="flex gap-1 mb-8">
              {[...Array(t.rating)].map((_, j) => (
                <Star key={j} size={14} className="fill-neon-blue text-neon-blue" />
              ))}
            </div>
            
            <p className="text-xl text-gray-300 font-light mb-12 leading-relaxed tracking-wide">
              "{t.content}"
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-white opacity-20" />
              <div>
                <h4 className="font-bold text-white text-lg tracking-tight">{t.name}</h4>
                <p className="text-neon-blue text-[10px] uppercase tracking-[0.2em] font-bold">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
