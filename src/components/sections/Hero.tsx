'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={containerRef} className="relative min-h-[150vh] w-full flex flex-col items-start pt-32 md:pt-40 pb-20 overflow-hidden bg-transparent">
      {/* Noise Texture */}
      <div className="noise-bg opacity-10" />

      <div className="container mx-auto px-6 relative z-10 h-full">
        {/* Top: Huge Headline - Left Aligned */}
        <div className="flex flex-col items-start w-full md:w-3/4">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-[12vw] md:text-[14vw] font-black text-white leading-[0.7] tracking-tighter uppercase m-0 text-left"
          >
            BECAUSE <br /> BEING SICK
          </motion.h1>
          
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-10 w-full mt-2">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="text-[12vw] md:text-[14vw] font-black text-white leading-[0.7] tracking-tighter uppercase m-0 text-left"
            >
              SUCKS
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-4 md:mb-12"
            >
              <p className="text-white font-black text-[10px] md:text-sm leading-tight text-left uppercase tracking-widest opacity-80">
                BOOST Immunity <br /> Gummy Vitamin
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
