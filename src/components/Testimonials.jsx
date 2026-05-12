import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
    <section className="py-32 px-4 bg-gradient-to-b from-sony-black to-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center">Loved by Professionals</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="glass p-10 rounded-3xl border border-white/5 relative"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-neon-blue text-neon-blue" />
                ))}
              </div>
              <p className="text-xl text-gray-300 font-light mb-8 italic">"{t.content}"</p>
              <div>
                <h4 className="font-bold text-white text-lg">{t.name}</h4>
                <p className="text-neon-blue text-sm uppercase tracking-widest">{t.role}</p>
              </div>
              
              <div className="absolute top-10 right-10 opacity-10">
                <Star className="w-20 h-20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
