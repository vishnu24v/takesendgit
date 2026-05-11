'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const links = {
  main: ['HOME', 'SHOP', 'ABOUT'],
  contact: ['CONTACT', 'TERMS', 'PRIVACY'],
  social: ['INSTAGRAM', 'TIKTOK', 'FACEBOOK']
};

export default function Footer() {
  const [rotate, setRotate] = useState(0);

  return (
    <footer className="py-10 bg-transparent relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-4 relative">
          <h2 
            className="text-6xl md:text-9xl lg:text-[11vw] font-black leading-[0.8] uppercase m-0 tracking-[0.06em] scale-x-115 origin-left"
            style={{ marginLeft: '-0.72vw' }}
          >
            GET <br /> BOOSTED
          </h2>
          
          <motion.div 
            className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full border-[1.5px] border-current flex items-center justify-center cursor-pointer relative overflow-hidden group shrink-0 mb-1 md:translate-y-2 md:ml-28"
            onMouseEnter={() => setRotate(prev => prev + 360)}
            onMouseLeave={() => setRotate(prev => prev - 360)}
            animate={{ rotate }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
             <svg 
               viewBox="0 0 24 24" 
               className="w-2/3 h-2/3 fill-none stroke-current stroke-[1]"
             >
                <path d="M4 20L20 4M20 4H8M20 4V16" />
             </svg>
          </motion.div>
        </div>

        {/* Footer Links & Branding - Removed border-t */}
        <div className="flex flex-col lg:flex-row justify-between items-start pt-8">
          
          {/* 1. Logo & Copyright */}
          <div className="flex flex-col mb-12 lg:mb-0 w-full lg:w-1/4">
            <span className="text-4xl font-medium tracking-tighter mb-2">boost</span>
            <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">© 2026 TAKE BOOST</span>
          </div>

          {/* 2. Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-12 w-full lg:w-1/2 mb-12 lg:mb-0 justify-start lg:justify-center">
            <div className="flex flex-col gap-4">
               {links.main.map(l => <Link key={l} href={l === 'ABOUT' ? '/about' : l === 'SHOP' ? '/shop' : '/'} className="font-bold text-[10px] md:text-xs hover:opacity-60 transition-opacity tracking-widest">{l}</Link>)}
            </div>

            <div className="flex flex-col gap-4">
               {links.contact.map(l => <Link key={l} href="#" className="font-bold text-[10px] md:text-xs hover:opacity-60 transition-opacity tracking-widest">{l}</Link>)}
            </div>

            <div className="flex flex-col gap-4">
               {links.social.map(l => <Link key={l} href="#" className="font-bold text-[10px] md:text-xs hover:opacity-60 transition-opacity tracking-widest">{l}</Link>)}
            </div>
          </div>

          {/* 3. Phone Number Box */}
          <div className="text-left lg:text-right w-full lg:w-1/4 flex flex-col lg:items-end group">
             <div className="inline-block w-full max-w-sm lg:max-w-none">
                <p className="font-bold uppercase tracking-widest text-[8px] md:text-[9px] mb-3 opacity-60">Text Us - 24/7 Immunity Consultants</p>
                <div className="w-full px-6 py-4 border-[1.5px] border-current rounded-xl inline-flex items-center justify-center bg-transparent transition-all">
                   <span className="text-lg md:text-xl font-black tracking-tighter">+1 (917) 540-8641</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
