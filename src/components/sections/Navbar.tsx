'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disable scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCartOpen]);

  return (
    <>
      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[220] md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[80%] bg-[#ff8a00] z-[221] p-10 flex flex-col md:hidden shadow-2xl"
            >
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2 text-white"
              >
                <X size={32} />
              </button>

              <div className="flex flex-col gap-10 mt-20">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-5xl font-black text-white uppercase tracking-tighter"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="mt-auto">
                <p className="text-white/60 text-xs font-bold tracking-widest uppercase">Take Boost © 2026</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[220]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-white z-[221] p-12 shadow-2xl flex flex-col border-l-2 border-black"
            >
              <button 
                onClick={() => setIsCartOpen(false)}
                className="absolute top-4 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-50"
              >
                <X size={28} className="text-black" />
              </button>

              <div className="mt-8 flex-grow pl-0 flex flex-col items-start text-left">
                <h3 className="text-black font-black leading-none uppercase mb-6 origin-left scale-x-125"
                    style={{ fontSize: 'max(40px, 8vw)', letterSpacing: '-0.05em' }}>
                  CART
                </h3>
                <p className="text-lg text-black mb-10 font-medium">Your cart is empty</p>
                
                <Link 
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="flex items-center gap-2 text-xl font-medium text-black group transition-all"
                >
                  Go Shopping 
                  <span className="inline-block transition-transform group-hover:translate-x-2 translate-y-[2px]">
                    <svg width="45" height="18" viewBox="0 0 60 20" fill="none" className="text-black">
                      <path d="M0 10H58M58 10L50 2M58 10L50 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[205] transition-all duration-500 px-4 py-2 ${
          isScrolled ? 'md:py-1' : 'md:py-2'
        }`}
      >
        <div className="max-w-[98%] mx-auto flex items-center justify-between px-2 py-1 transition-all duration-500">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white p-2"
            >
              <Menu size={28} />
            </button>
            <Link href="/" className="flex flex-col items-center group relative z-[210] no-cursor-effect">
              <span className="text-2xl md:text-3xl font-black tracking-tighter leading-none text-white transition-opacity group-hover:opacity-80">boost</span>
              <span className="text-[8px] md:text-[10px] font-normal opacity-80 text-white tracking-widest lowercase">immunity vitamin</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-12 px-6 py-1.5 border-2 border-white rounded-2xl backdrop-blur-md bg-white/5 relative z-[210]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative text-sm font-bold text-white uppercase tracking-widest group px-2 py-1"
                >
                  <span className="relative z-10 transition-opacity group-hover:opacity-70">{link.name}</span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <AnimatePresence>
                    {hoveredLink === link.name && !isActive && (
                      <motion.div 
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 12, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-white rounded-full"
                      />
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-6 relative z-[210]">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="px-5 md:px-8 py-2 md:py-3.5 border-2 border-white rounded-full font-bold text-[10px] md:text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              CART
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
