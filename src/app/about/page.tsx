'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { X, ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/sections/Footer';
import gsap from 'gsap';

const faqData = [
  {
    category: 'GENERAL',
    questions: [
      {
        q: "Do I have to sign up for your texting service?",
        a: "No, but you should. BOOST works best<br />when you take advantage of everyyyything<br />we offer. Plus we're cool people. Text us<br />about literally anything."
      },
      {
        q: "Do I need to sign up for a BOOST Membership?",
        a: "No, but members get ~all~ the perks and<br />~sick~ deals. Trust us, you don't want to miss<br />out."
      },
      {
        q: "Are your products gluten free?",
        a: "Yes, we're gluten free and you'll find the<br />gluten free logo on our bottles."
      }
    ]
  },
  {
    category: 'SHIPPING',
    questions: [
      {
        q: "When can I expect my order?",
        a: "We’re currently filing a ton of orders from<br />AWESOME people like you. Feel free to email<br />sup@takeboost.com with any questions"
      },
      {
        q: "Where is BOOST located?",
        a: "Our offices are in New York City and all of<br />our products are made and manufactured in<br />the USA."
      }
    ]
  },
  {
    category: 'BRAND',
    questions: [
      {
        q: "Why BOOST?",
        a: "We’re on a mission to make health simple<br />and we’re starting with your immune system<br />🤪 We’re the first company totally dedicated<br />to your immune system and that's why you<br />should pick BOOST-- to help you get sick less."
      },
      {
        q: "When will you be releasing new products?",
        a: "We’re currently working to release another<br />line. Sign up for our email list here to stay in<br />the loop."
      },
      {
        q: "Does BOOST test on animals?",
        a: "Literally, Kim, we would never. Ew. Who<br />does that anymore?"
      }
    ]
  }
];

export default function AboutPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openFaqCategory, setOpenFaqCategory] = useState<string | null>(null);
  const [isWhiteBg, setIsWhiteBg] = useState(false);

  const bottleRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // latest = 0: section starts entering from bottom
    // latest = 0.5: section is centered
    // latest = 1: section has fully scrolled out at the top
    
    // Trigger white background when the "WE MAKE PRODUCTS" section starts hiding at the top
    if (latest > 0.5) {
      setIsWhiteBg(true);
    } else {
      setIsWhiteBg(false);
    }
  });

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCartOpen]);

  useEffect(() => {
    if (!bottleRef.current) return;
    gsap.to(bottleRef.current, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Auto-scroll when FAQ category is opened
  useEffect(() => {
    if (openFaqCategory) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`faq-${openFaqCategory.toLowerCase()}`);
        if (element) {
          const headerOffset = 120; // Space from top
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 400); // Small delay to allow expansion animation to start
      return () => clearTimeout(timer);
    }
  }, [openFaqCategory]);

  const navLinks = [
    { name: 'SHOP', href: '/shop' },
    { name: 'ABOUT', href: '/about' },
  ];

  return (
    <main
      ref={containerRef}
      className={`relative min-h-screen transition-colors duration-700 overflow-x-hidden ${isWhiteBg ? 'bg-white text-black' : 'bg-gradient-to-br from-[#FF9E00] to-[#FF6B00] text-white'}`}
    >
      {/* Header Area */}
      <div className="max-w-[98%] mx-auto px-4 pt-4 pb-10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-[205]">
        <Link href="/" className="flex flex-col items-center cursor-pointer no-cursor-effect relative z-[210]">
          <span className={`text-3xl md:text-4xl font-black tracking-tighter leading-none transition-colors duration-500 ${isWhiteBg ? 'text-black' : 'text-white'}`}>boost</span>
          <span className={`text-[8px] md:text-[10px] font-normal opacity-80 transition-colors duration-500 ${isWhiteBg ? 'text-black' : 'text-white'} lowercase tracking-widest`}>immunity vitamin</span>
        </Link>

        <div className={`flex items-center gap-6 md:gap-12 px-4 md:px-6 py-1.5 border-2 rounded-2xl transition-all duration-500 relative z-[210] ${isWhiteBg ? 'border-black' : 'border-white'}`}>
          {navLinks.map((link) => {
            const isActive = link.name === 'ABOUT';
            return (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative text-xs md:text-sm font-bold uppercase tracking-widest group px-2 py-1 transition-colors duration-500 ${isWhiteBg ? 'text-black' : 'text-white'}`}
              >
                <span className="relative z-10 transition-opacity group-hover:opacity-70">{link.name}</span>
                {isActive && (
                  <div className={`absolute -bottom-1 left-0 w-full h-[2.5px] rounded-full ${isWhiteBg ? 'bg-black' : 'bg-white'}`} />
                )}
                <AnimatePresence>
                  {hoveredLink === link.name && !isActive && (
                    <motion.div
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 12, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className={`absolute -bottom-1 left-0 w-full h-[2.5px] rounded-full ${isWhiteBg ? 'bg-black' : 'bg-white'}`}
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
            className={`px-6 md:px-8 py-2.5 md:py-3.5 border-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-500 ${isWhiteBg
              ? 'bg-transparent text-black border-black hover:bg-black hover:text-white'
              : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
              }`}
          >
            CART
          </button>
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-transparent z-[200]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-white z-[201] p-6 md:p-12 shadow-2xl flex flex-col border-l-2 border-black"
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
                      <path d="M0 10H58M58 10L50 2M58 10L50 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <section className="w-full px-4 pt-4 pb-24 relative min-h-[70vh] md:min-h-[90vh] flex flex-col justify-start">
        <div className="flex flex-col w-full relative z-20 overflow-hidden">
          {/* Line 1: YOUR IMMUNE */}
          <h1 className="text-[18vw] md:text-[13.2vw] font-black leading-[0.75] tracking-[-0.08em] uppercase mb-0 w-full origin-left scale-x-[1.12] whitespace-nowrap">
            YOUR IMMUNE
          </h1>

          {/* Line 2: SYSTEM WILL */}
          <h1 className="text-[18vw] md:text-[13.2vw] font-black leading-[0.75] tracking-[-0.08em] uppercase mb-0 w-full origin-left scale-x-[1.12] whitespace-nowrap">
            SYSTEM WILL
          </h1>

          {/* Line 3: THANK YOU */}
          <h1 className="text-[18vw] md:text-[13.2vw] font-black leading-[0.75] tracking-[-0.08em] uppercase mb-0 w-full origin-left scale-x-[1.12] whitespace-nowrap">
            THANK YOU
          </h1>

          {/* Line 4: LATER. */}
          <h1 className="text-[18vw] md:text-[13.2vw] font-black leading-[0.75] tracking-[-0.08em] uppercase mb-0 w-full origin-left scale-x-[1.12] md:scale-x-[1.5] whitespace-nowrap">
            LATER.
          </h1>
        </div>

        {/* The original 3D Render - Fixed position */}
        <div className="absolute right-[-2%] bottom-[-55%] w-[48%] max-w-[700px] z-10 pointer-events-none">
          <motion.img 
            ref={bottleRef}
            src="/boost-3d.png" 
            alt="BOOST Bottle"
            className="w-full h-auto brightness-110 contrast-110"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -100])
            }}
          />
        </div>
      </section>

      {/* WHO WE ARE Section - Restored to morning state with specific line breaks */}
      <section className="container mx-auto px-6 my-20 md:my-40">
        <div className="max-w-4xl text-left">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
            Who we are
          </h2>
          <p className="text-xl md:text-2xl font-medium leading-[1.1] opacity-90">
            BOOST is the first company dedicated to helping <br />
            you get sick less. Because, honestly, why wait <br />
            until you’re sick to take care of your health? We <br />
            consider immunity to be of the utmost <br />
            importance, and we believe vitamins should work <br />
            for you…even if you’re not working for them.
          </p>
        </div>
      </section>

      {/* Movement Section - Refined Ellipse with exact line breaks */}
      <section
        ref={sectionRef}
        className="relative py-24 md:py-48 flex items-center justify-center overflow-hidden min-h-screen"
      >
        <div className="container mx-auto px-4 relative z-10 flex items-center justify-center">
          {/* The Large Ellipse Line - Sized 5% smaller as requested */}
          <div className={`absolute inset-0 rounded-[50%/50%] border-[1.5px] transition-all duration-700 ${isWhiteBg ? 'border-black' : 'border-white'} scale-x-[1.2] scale-y-[1.05] pointer-events-none opacity-100`}></div>

          <div className="relative z-20 w-full max-w-7xl px-12 md:px-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-32 w-full">
              {/* Left Side: Exact 4 Lines */}
              <div className="text-left flex-1 md:pl-10">
                <h3 className={`font-bold uppercase leading-[0.9] tracking-tighter transition-colors duration-700 ${isWhiteBg ? 'text-black' : 'text-white'}`} 
                    style={{ fontSize: 'max(30px, 6.5vw)' }}>
                  WE MAKE PRODUCTS <br />
                  TO HELP YOU FEEL <br />
                  GOOD WHILE STILL <br />
                  TASTING <span className="inline-block translate-y-1">👅</span> GOOD.
                </h3>
              </div>
              
              {/* Right Side: 5 Lines, Smaller Text, with left margin gap */}
              <div className="text-left flex-initial md:max-w-[400px] flex items-center md:pl-20">
                <p className={`text-base md:text-[20px] font-medium leading-[1.1] transition-colors duration-700 ${isWhiteBg ? 'text-black' : 'text-white'} opacity-90`}>
                  We hope to BOOST your <br />
                  mood in the process. BOOST <br />
                  is not just another brand, it’s <br />
                  a movement. Your immune <br />
                  system will thank you later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refined FAQ Section - Ultra Compact & Extra Spread Typography */}
      <section className="bg-white text-black pt-10 pb-10 px-6">
        <div className="container mx-auto max-w-7xl">
           <h2 className="text-6xl md:text-7xl font-black uppercase mb-2 tracking-[0.25em]">
             FAQ
           </h2>

           <div className="border-t-[1px] border-black">
              {faqData.map((cat) => {
                const isOpen = openFaqCategory === cat.category;
                return (
                  <div key={cat.category} id={`faq-${cat.category.toLowerCase()}`} className="border-b-[1px] border-black">
                    <button 
                      onClick={() => setOpenFaqCategory(isOpen ? null : cat.category)}
                      className="w-full py-1.5 flex items-center justify-between text-left group"
                    >
                      <span className="text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] transition-all">
                        {cat.category}
                      </span>
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        >
                          <Plus size={36} strokeWidth={1} />
                        </motion.div>
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-16 flex flex-col gap-12">
                            {cat.questions.map((q, idx) => (
                              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                                <div className="text-lg md:text-xl font-normal leading-tight tracking-[0.05em]">
                                  Q: {q.q}
                                </div>
                                <div className="text-lg md:text-xl font-normal leading-tight opacity-90 tracking-[0.05em]">
                                  <span className="inline-block" dangerouslySetInnerHTML={{ __html: `A: ${q.a}` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
           </div>
        </div>
      </section>

      {/* STAY SICK NOT SICK Section - Resized and Spaced */}
      <section className="bg-white py-32 flex flex-col items-center justify-center text-black">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4 text-6xl md:text-[7.2vw] font-black uppercase leading-[0.8] tracking-tighter">
            STAY SICK <span className="inline-block scale-125">🤙</span>
          </div>
          <div className="flex items-center gap-4 text-6xl md:text-[7.2vw] font-black uppercase leading-[0.8] tracking-tighter mt-4">
            <span className="inline-block scale-125">🤧</span> NOT SICK
          </div>
        </div>
      </section>

      {/* Double Marquee - Exactly like Shop Page */}
      <section className="py-20 overflow-hidden bg-white">
        <div className="flex whitespace-nowrap animate-marquee mb-1">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="marquee-text-size font-black text-black uppercase mx-10">
              • AN IMMUNITY VITAMIN • IT'S LIKE A CONDOM FOR YOUR HEALTH • AN IMMUNITY VITAMIN • FOMO FOR YOUR HEALTH • BECAUSE BEING SICK SUCKS • AN IMMUNITY VITAMIN • DON’T PANIC, TAKE BOOST • BOOST YOUR IMMUNITY
            </span>
          ))}
        </div>
        <div className="flex whitespace-nowrap animate-marquee-reverse">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="marquee-text-size font-black text-black uppercase mx-10">
              • AN IMMUNITY VITAMIN • IT'S LIKE A CONDOM FOR YOUR HEALTH • AN IMMUNITY VITAMIN • FOMO FOR YOUR HEALTH • BECAUSE BEING SICK SUCKS • AN IMMUNITY VITAMIN • DON’T PANIC, TAKE BOOST • BOOST YOUR IMMUNITY
            </span>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
