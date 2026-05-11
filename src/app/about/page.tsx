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
    offset: ["start start", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.05) {
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

  // Auto-scroll when category is opened
  useEffect(() => {
    if (openFaqCategory) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`faq-section-${openFaqCategory.toLowerCase()}`);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
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

        {/* Floating Gummy Bears - Removed as requested */}
        <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden">
        </div>

        {/* The original 3D Render Restored */}
        <div className="absolute right-[-2%] bottom-[-75%] w-[38%] max-w-[600px] z-10 pointer-events-none">
          <motion.img 
            ref={bottleRef}
            src="/boost-3d.png" 
            alt="BOOST Bottle"
            className="w-full h-auto brightness-110 contrast-110 drop-shadow-[0_0_40px_rgba(255,138,0,0.5)]"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -100])
            }}
          />
        </div>
      </section>

      {/* WHO WE ARE Section - Adjusted spacing for mobile */}
      <section className="container mx-auto px-6 my-20 md:my-40">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
            Who we are
          </h2>
          <div className="text-base md:text-lg font-medium leading-tight md:leading-[1.1] opacity-90">
            <p>BOOST is the first company dedicated to helping</p>
            <p>you get sick less. Because, honestly, why wait</p>
            <p>until you’re sick to take care of your health? We</p>
            <p className="mt-2">consider immunity to be of the utmost </p>
            <p>importance, and we believe vitamins should work</p>
            <p className="mt-2">for you…even if you’re not working for them.</p>
          </div>
        </div>
      </section>

      {/* Movement Section (The Circle Section) - Fully Responsive */}
      <section
        ref={sectionRef}
        className="relative py-12 md:py-24 overflow-hidden min-h-[60vh] md:min-h-screen flex items-center"
      >
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
          <div className="relative w-full max-w-[1800px] mx-auto flex items-center justify-center min-h-[40vh] md:min-h-[75vh]">
            {/* The Flattened Ellipse */}
            <div className={`absolute inset-0 rounded-[50%/50%] border-[2px] transition-all duration-700 ${isWhiteBg ? 'border-black' : 'border-white'} overflow-hidden scale-x-[1.3] scale-y-[1.2]`}>
               {/* Content inside circle if needed */}
            </div>

            <div className="text-center relative z-20 px-4">
               <h3 className={`text-[12vw] md:text-[10vw] font-black uppercase leading-[0.8] mb-8 transition-colors duration-700 ${isWhiteBg ? 'text-black' : 'text-white'}`}>
                 JOIN THE <br /> MOVEMENT
               </h3>
               <button className={`px-10 py-5 border-2 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-700 ${isWhiteBg ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'}`}>
                 GET BOOSTED
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white text-black py-24 px-6">
        <div className="container mx-auto max-w-6xl">
           <h2 className="text-6xl md:text-8xl font-black uppercase mb-20 tracking-tighter scale-x-110 origin-left">
             Common <br /> Questions
           </h2>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t-2 border-black pt-12">
              {faqData.map((cat) => (
                <div key={cat.category} id={`faq-section-${cat.category.toLowerCase()}`} className="flex flex-col gap-8">
                  <h3 className="text-xl font-black uppercase tracking-widest border-b-2 border-black pb-2 inline-block self-start">
                    {cat.category}
                  </h3>
                  <div className="flex flex-col gap-10">
                    {cat.questions?.map((q, idx) => (
                      <div key={idx} className="flex flex-col gap-3">
                         <h4 className="text-lg font-bold uppercase leading-tight">{q.q}</h4>
                         <p className="text-sm font-medium opacity-80 leading-relaxed" dangerouslySetInnerHTML={{ __html: q.a }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
