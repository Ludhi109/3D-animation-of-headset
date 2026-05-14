import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";


gsap.registerPlugin(ScrollTrigger);

export const ScrollSequence = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const totalFrames = 240;

  useEffect(() => {
    // Preload images
    const loadedImages = [];
    let loaded = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameIndex = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${frameIndex}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalFrames) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  useEffect(() => {
    if (images.length < totalFrames) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    context.scale(dpr, dpr);

    const render = (index) => {
      if (images[index]) {
        const img = images[index];
        
        // High quality settings
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        const logicalWidth = window.innerWidth;
        const logicalHeight = window.innerHeight;
        
        // Refined scale factor for professional view
        const scaleFactor = 0.8; 
        
        const canvasRatio = logicalWidth / logicalHeight;
        const imgRatio = img.width / img.height;
        
        let drawWidth, drawHeight;
        
        if (canvasRatio > imgRatio) {
          drawHeight = logicalHeight * scaleFactor;
          drawWidth = drawHeight * imgRatio;
        } else {
          drawWidth = logicalWidth * scaleFactor;
          drawHeight = drawWidth / imgRatio;
        }

        const offsetX = (logicalWidth - drawWidth) / 2;
        const offsetY = (logicalHeight - drawHeight) / 2;

        context.clearRect(0, 0, logicalWidth, logicalHeight);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // Initial render
    render(0);

    const tl = gsap.to({}, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%", 
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const frameIndex = Math.floor(self.progress * (totalFrames - 1));
          render(frameIndex);
        }
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [images]);

  const labels = [];

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>
      
      {/* Global Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
        <div className="absolute inset-0 cinematic-vignette opacity-80" />
        <div className="absolute inset-0 noise opacity-[0.03]" />
      </div>

      {/* Holographic Interactive Labels */}
      <div className="relative z-20 w-full h-full pointer-events-none">
        {labels.map((label, i) => (
          <ScrollLabel key={i} label={label} />
        ))}

        {/* Initial Hero Text */}
        <section className="h-screen flex items-center justify-center relative">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-center px-4"
            >
                <div className="inline-block px-4 py-1 rounded-full border border-neon-blue/30 bg-neon-blue/10 backdrop-blur-md mb-6">
                    <span className="text-[8px] tracking-[0.5em] text-neon-blue font-black uppercase">Sony Engineering</span>
                </div>
                <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase mb-4 mix-blend-difference">
                    PRECISION <span className="text-neon-blue">ENGINEERING</span>
                </h1>
                <p className="text-gray-500 text-xs tracking-[0.3em] font-bold uppercase">The Science of Silence</p>
            </motion.div>
        </section>

      </div>

      {/* Loading State Overlay */}
      {loadedCount < totalFrames && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
            <div className="relative w-64 h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(loadedCount / totalFrames) * 100}%` }}
                    className="h-full bg-neon-blue shadow-[0_0_20px_#00f2ff]"
                />
            </div>
            <p className="mt-6 text-[8px] tracking-[0.8em] text-neon-blue uppercase font-black animate-pulse">
                Calibrating Neural Assets {Math.floor((loadedCount / totalFrames) * 100)}%
            </p>
        </div>
      )}
    </div>
  );
};

const ScrollLabel = ({ label }) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, label.time, [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, label.time, [20, 0, 0, -20]);

  return (
    <motion.div 
      style={{ opacity, y, ...label.pos }}
      className="fixed p-8 glass rounded-3xl border border-white/10 max-w-[280px] backdrop-blur-2xl hologram-border"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="glow-point" />
        <div className="h-[1px] flex-1 bg-neon-blue/30 shadow-[0_0_10px_#00f2ff]" />
      </div>
      <h4 className="text-neon-blue font-black text-[10px] tracking-[0.3em] uppercase mb-2">{label.name}</h4>
      <p className="text-gray-400 text-xs font-light leading-relaxed">{label.desc}</p>
      
      {/* Decorative corner markers */}
      <div className="absolute -left-1 -top-1 w-2 h-2 border-l border-t border-neon-blue/50" />
      <div className="absolute -right-1 -bottom-1 w-2 h-2 border-r border-b border-neon-blue/50" />
    </motion.div>
  );
};
