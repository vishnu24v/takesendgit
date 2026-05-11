'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BottleRotation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(1);
  const totalFrames = 160;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate frame based on scroll
  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      const newFrame = Math.floor(v * (totalFrames - 1)) + 1;
      setFrame(newFrame);
    });
  }, [scrollYProgress]);

  // Format frame number to match filename (ezgif-frame-XXX.png)
  const formatFrame = (num: number) => {
    return num.toString().padStart(3, '0');
  };

  return (
    <div ref={containerRef} className="h-[300vh] w-full absolute top-0 left-0 pointer-events-none">
      <div className="sticky top-0 h-screen w-full flex items-center justify-end pr-[5%] pointer-events-none overflow-hidden">
        
        {/* Rotation Container */}
        <div className="relative w-[50vw] md:w-[40vw] max-w-[600px] aspect-[3/4] flex items-center justify-center pointer-events-auto">
          
          {/* BUY Button - Positioned near the cap as per image 2 */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-[20%] right-[10%] w-16 h-16 md:w-20 md:h-20 bg-white border-2 border-black rounded-full flex items-center justify-center font-black text-black text-sm md:text-base shadow-xl z-50 clickable"
          >
            BUY
          </motion.button>

          {/* The Bottle Image Sequence */}
          <div className="relative w-full h-full">
            <img 
              src={`/bottle-rotation/ezgif-frame-${formatFrame(frame)}.png`}
              alt="BOOST Bottle Rotation"
              className="w-full h-full object-contain drop-shadow-2xl brightness-110 contrast-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
