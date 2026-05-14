import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Cinematic Ambient Track Placeholder
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Placeholder

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play blocked by browser"));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-10 left-10 z-[100] flex items-center gap-4">
      <audio ref={audioRef} src={audioUrl} loop />
      
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full glass flex items-center justify-center text-neon-blue shadow-[0_0_20px_rgba(0,242,255,0.2)] group relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="volume-on"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Volume2 size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="volume-off"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <VolumeX size={24} className="text-white/40" />
            </motion.div>
          )}
        </AnimatePresence>

        {isPlaying && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 border border-neon-blue rounded-full pointer-events-none"
          />
        )}
      </motion.button>

      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Ambient Mode</span>
        <span className="text-[12px] font-medium text-neon-blue tracking-wider">
          {isPlaying ? "SONIC IMMERSION ON" : "AUDIO MUTED"}
        </span>
      </div>
    </div>
  );
};
