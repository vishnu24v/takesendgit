'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Extremely subtle horizontal movement (Slow Motion)
  const xMove = useTransform(scrollYProgress, [0, 1], [-80, -130]);
  
  // Vertical overlap: Starts at 5% overlap, moves to exactly 10%
  // -8px is approx 5% overlap, -18px is approx 10% overlap
  const yAdjustFirst = useTransform(scrollYProgress, [0, 1], [-8, -18]);

  const reviews = [
    { 
      text: "I haven’t sneezed since I took BOOST", 
      handle: "@superman", 
      rotation: 6,
      stars: 5 
    },
    { 
      text: "The only [best] way to rise and shine", 
      handle: "@TheentireKUWTKcast", 
      rotation: -6,
      stars: 5 
    },
    { 
      text: "It’s like a refreshing cold shower", 
      handle: "@JesseClemente", 
      rotation: 8,
      stars: 5 
    }
  ];

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden min-h-[700px] flex items-center bg-transparent select-text">
      {/* No local background - using global 30/70 split */}
      
      <div className="container mx-auto px-6 relative w-full flex items-center h-full select-text">
        
        {/* Large White Circle Background Element - Partially Hidden Left */}
        <div className="absolute left-[-10%] md:left-[-5%] top-[35%] -translate-y-1/2 w-[250px] h-[250px] md:w-[420px] md:h-[420px] rounded-full border-[1.5px] border-white flex flex-col justify-center items-center z-10 select-text">
          <div className="text-center px-6 pt-10 md:pt-12 select-text">
            <h2 className="text-2xl md:text-4xl font-black text-white leading-[0.85] tracking-tighter uppercase m-0 select-text">
              WORD ON <br /> THE STREET
            </h2>
            <p className="text-white font-bold text-[8px] md:text-[9px] mt-4 opacity-100 uppercase tracking-[0.3em]">
              Trust us with your immunity
            </p>
          </div>
        </div>

        {/* Testimonial Cards - Moving together Right to Left */}
        <motion.div 
          style={{ x: xMove }}
          className="relative z-20 w-full flex flex-col md:flex-row gap-10 md:gap-12 justify-center md:justify-start items-center md:pl-[380px] mt-40 md:mt-32"
        >
          {reviews.map((review, i) => (
            <motion.div 
              key={review.handle}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="bg-[#fffbf0] border-[1.5px] border-[#ffb800] p-8 rounded-2xl shadow-2xl flex flex-col justify-between min-h-[230px] w-full max-w-[280px] hover:scale-105 transition-transform cursor-pointer"
              style={{ 
                rotate: `${review.rotation}deg`, 
                zIndex: 30 + i,
                // Apply vertical adjustment only to the first card to change overlap from 10% to 20%
                translateY: i === 0 ? yAdjustFirst : 0
              }}
            >
              <div>
                <div className="flex text-black mb-4 tracking-[0.1em] text-2xl">
                  {[...Array(review.stars)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-xl font-medium text-black leading-tight tracking-tight">
                  {review.text}
                </p>
              </div>
              <div className="border-t-[1.5px] border-[#ffb800] mt-8 pt-4 flex items-center">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                   <svg width="33" height="32" viewBox="0 0 33 32" fill="none">
                      <rect x="1.303" y="0.611" width="30.555" height="30.555" rx="15.277" fill="#000"></rect>
                      <path d="M10.63 5.435a4.18 4.18 0 001.375 8.126c1.36 3.47 3.666 5.249 4.921 6.145a4.17 4.17 0 00 3.546 1.98z" fill="#fff" stroke="#000" strokeWidth="0.804"></path>
                      <path d="M16.363 20.853c1.243 0 5.733-.819 7.036-2.5a4.78 4.78 0 00.677-2.481c0-.854-.224-1.647-.602-2.33-2.035-3.728-3.097-4.677-4.922-6.145a4.497 4.497 0 00-2.166-.555h-.045c-.787 0-1.524.202-2.167.555-1.255.808-3.56 2.676-4.921 6.146a4.736 4.736 0 00-.603 2.329c0 .907.252 1.751.678 2.46 2.634 2.615 5.792 2.5 7.035 2.5z" fill="#fff" stroke="#000" strokeWidth="0.804"></path>
                      <path d="M26.274 9.617a4.172 4.172 0 00-7.723-2.202c1.827 1.468 2.887 2.417 4.922 6.146a4.174 4.174 0 00 2.8-3.944z" fill="#fff" stroke="#000" strokeWidth="0.804"></path>
                      <path d="M26.274 26.634c-2.742-1.526-5.464-3.665-5.993-6.475-1.514.46-3.065.685-3.718.685-.835 0-2.536.051-4.36-.709-.839 2.957-2.737 4.553-5.353 6.497a4.531 4.531 0 00-1.868 3.667 4.528 4.528 0 004.526 4.534c4.047 0 4.214-3.262 7.053-3.262 2.839 0 3.006 3.262 7.053 3.262a4.53 4.53 0 004.526-4.534 4.506 4.506 0 00-1.866-3.665z" fill="#fff" stroke="#000" strokeWidth="0.804"></path>
                      <rect x="1.303" y="0.611" width="30.555" height="30.555" rx="15.277" stroke="#000" strokeWidth="0.804"></rect>
                   </svg>
                </div>
                <span 
                  className="font-medium text-black"
                  style={{
                    marginLeft: '0.838vw',
                    fontSize: 'max(13px, 1.173vw)',
                    fontFamily: 'var(--font-secondary)'
                  }}
                >
                  {review.handle}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
