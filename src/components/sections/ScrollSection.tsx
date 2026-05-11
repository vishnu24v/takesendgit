'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background Text Scale/Opacity
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);

  // Bottle & BUY button positioning
  // Start: Right side (from previous section)
  // End: Center
  const itemX = useTransform(scrollYProgress, [0, 0.3], ["30%", "0%"]);
  const itemY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Follows scroll a bit

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#ff8a00] overflow-visible">

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Text */}
        <motion.div 
          style={{ opacity: textOpacity, scale: textScale }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <h2 className="text-[15vw] font-black text-white leading-[0.8] tracking-tighter uppercase text-center opacity-30">
            INGREDIENTS <br /> YOU MOM <br /> WILL LOVE
          </h2>
          <div className="mt-10 text-white font-black text-center max-w-xs">
             <p className="text-xl uppercase tracking-tighter">AND YOU, OF COURSE.</p>
          </div>
        </motion.div>

        {/* Central Moving Elements (Bottle + BUY Button) */}
        <motion.div 
          style={{ x: itemX, y: itemY }}
          className="relative z-20 flex flex-col items-center"
        >
          {/* BUY Button above/next to bottle */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            onClick={() => router.push('/shop')}
            className="mb-[-20px] ml-[100px] z-30 w-20 h-20 bg-white rounded-full border-2 border-black flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all shadow-xl"
          >
             <span className="text-black group-hover:text-white font-black text-xs uppercase">BUY</span>
          </motion.div>

          {/* Bottle Removed to use Bottle3D component */}
          <div className="w-[400px] h-[400px]" /> {/* Spacer */}
        </motion.div>

      </div>
    </section>
  );
}
