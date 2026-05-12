import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ScrollSequence = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const frameCount = 240;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

  useEffect(() => {
    // Preload images
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${frameNumber}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          // All images loaded
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;
      
      const context = canvas.getContext("2d");
      const index = Math.floor(frameIndex.get());
      const img = images[index - 1] || images[0];

      if (img) {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate aspect ratio to cover canvas
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // Use requestAnimationFrame for smooth updates
    const unsubscribe = frameIndex.on("change", () => {
      requestAnimationFrame(render);
    });

    // Initial render
    render();

    return () => unsubscribe();
  }, [images, frameIndex]);

  useEffect(() => {
    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="h-[400vh] relative">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        
        {/* Overlay for better integration */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 pointer-events-none" />
      </div>
    </div>
  );
};
