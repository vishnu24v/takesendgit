'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Bottle3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameIndex, setFrameIndex] = useState(1);
  const totalFrames = 160;

  const { scrollYProgress } = useScroll();

  // Map scroll progress to frame index
  const frame = useTransform(scrollYProgress, [0, 0.4], [1, totalFrames]);

  useEffect(() => {
    const unsubscribe = frame.onChange((v) => {
      setFrameIndex(Math.max(1, Math.min(totalFrames, Math.floor(v))));
    });
    return () => unsubscribe();
  }, [frame]);

  const formatFrame = (num: number) => num.toString().padStart(3, '0');

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center md:justify-end md:pr-[10%]">
      
      {/* The Bottle Container - Responsive Sizing */}
      <div className="relative w-[70vw] md:w-full max-w-[300px] md:max-w-[550px] aspect-[3/4] flex items-center justify-center translate-y-[20%] md:translate-y-0">
        
        {/* BUY Button - Responsive */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          className="absolute top-[10%] md:top-[20%] right-[-5%] md:right-[-10%] z-50 pointer-events-auto cursor-pointer"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-black bg-white flex items-center justify-center shadow-xl clickable"
          >
            <span className="text-black font-black text-[10px] md:text-sm uppercase tracking-tighter">BUY</span>
          </motion.button>
        </motion.div>

        {/* The Bottle Image Sequence */}
        <div className="relative w-full h-full">
          <img 
            src={`/bottle-rotation/ezgif-frame-${formatFrame(frameIndex)}.png`}
            alt="Boost Immunity Vitamin Bottle"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
