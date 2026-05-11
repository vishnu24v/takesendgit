'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const letters = ['b', 'o', 'o', 's', 't'];

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[1000] bg-gradient-to-r from-[#ffb800] to-[#ff8a00] flex flex-col items-center justify-center"
        >
          <div className="text-center relative">
            <div className="flex justify-center items-center">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  animate={{ 
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="text-5xl md:text-[6vw] font-black text-white tracking-tighter leading-none"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white font-medium text-sm md:text-lg mt-6 opacity-80 uppercase tracking-widest"
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
