'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/sections/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ingredientsData = [
  {
    id: 'elderberry',
    name: 'ELDERBERRY',
    amount: '150mg',
    description: 'A natural remedy with a long history of medicinal use, Elderberry Extract has a wide array of health benefits and powerful immune-boosting, antiviral properties.',
    benefits: [
      { title: 'Major Cold and Flu Relief', text: 'Elderberry extract has been shown to be a safe treatment for both cold and flu symptoms thanks to its anthocyanidins, chemical compounds known for their immuno-stimulant effects 🤒' },
      { title: 'Encourages Healthy Skin', text: 'Its bio-flavonoids and antioxidants as well as its high Vitamin A content make it awesome for skin health 💅' },
      { title: 'Sinus Infection Aid', text: 'With elderberry’s anti-inflammatory and antioxidant properties, it also helps clear up sinus infections and ease allergies 🤧' },
      { title: 'Anti-inflammatory benefits', text: 'Elderberry is packed with antioxidants that help fight inflammation-- which is linked to improving symptoms of arthritis and reducing inflammatory markers in your blood 🧐' }
    ]
  },
  {
    id: 'vitamin-c',
    name: 'VITAMIN C',
    amount: '100mg',
    description: 'One of the best known ingredients for improving immune health, Vitamin C acts as an antioxidant in the body, and may help reduce symptoms and shorten the duration of the common cold.',
    benefits: [
      { title: 'Improves Symptoms of the Common Cold', text: 'Getting enough vitamin C may help reduce symptoms and shorten the duration of respiratory tract infections, such as the common cold 😷' },
      { title: 'Holds Powerful Antioxidant Properties', text: 'Vitamin C acts as an antioxidant in the body, helping prevent the buildup of free radicals to protect your body against disease 🤑' },
      { title: 'Promotes Glowing Skin', text: 'Vitamin C is believed to help slow down skin aging and can protect against skin damage, thanks to its involvement in collagen synthesis 🧖‍♀️' },
      { title: 'Enhances Brain Function', text: 'Studies have found that blood levels of vitamin C tend to be lower in people with dementia, and a high antioxidant intake of vitamin C could slow cognitive delay in older adults 🤓' }
    ]
  },
  {
    id: 'zinc',
    name: 'ZINC',
    amount: '10mg',
    description: 'Zinc helps control inflammation and aids in the development of immune cells. This natural, essential mineral helps fight the common cold and may reduce your risk of becoming sick.',
    benefits: [
      { title: 'Acts as a Powerful Antioxidant', text: 'Zinc may relieve stress on the immune system when it’s faced with a threat, helping to BOOST the function of T-cells, which help protect against infection 🥵' },
      { title: 'Helps Balances Hormones', text: 'Zinc plays an important role in hormone production by increasing testosterone naturally 😵' },
      { title: 'Maintains Heart Health', text: 'Zinc is needed to maintain the health of cells within the cardiovascular system, while also helping lower inflammation and oxidative stress 🤜🤛' },
      { title: 'Aids in Digestion', text: 'Zinc affects protein synthesis and is required by the body to use amino acids from food 💆‍♂️' }
    ]
  },
  {
    id: 'inactive',
    name: 'INACTIVE INGREDIENTS',
    description: 'Maltose Syrup, Purified Water, Sucrose, Polydextrose, Carrageenan, Pectin, Sodium Hexametaphosphate, Blueberry Flavor, Vegetable Oil, Carnauba Wax, Trisodium Citrate.',
    benefits: []
  }
];

export default function ShopPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<'single' | 'subscribe' | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [buttonColor, setButtonColor] = useState('orange');
  const mainRef = useRef<HTMLElement>(null);
  const bottleRef = useRef<HTMLImageElement>(null);
  const whatsInsideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (buttonHovered && selectedOption) {
      setButtonColor('purple');
      interval = setInterval(() => {
        setButtonColor(prev => prev === 'purple' ? 'orange' : 'purple');
      }, 2000);
    } else {
      setButtonColor('orange');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [buttonHovered, selectedOption]);

  useEffect(() => {
    if (!bottleRef.current || !mainRef.current || !whatsInsideRef.current) return;
    
    // Initial rotation set to match the image's tilt (cap to right)
    gsap.set(bottleRef.current, { rotation: 45 });

    // GSAP ScrollTrigger - User requested fixed bottle (no movement/rotation on scroll)
    // Killing previous animation to make it fixed as requested
    const anim = gsap.to(bottleRef.current, {
       // Static position
    });

    // Unified Background color animation
    const bgAnim = gsap.to(mainRef.current, {
      scrollTrigger: {
        trigger: whatsInsideRef.current,
        start: "top center", // Triggers when WHAT'S INSIDE hits the vertical center
        end: "bottom top",
        toggleActions: "play none none reverse", // Reverts when scrolling back up
      },
      backgroundImage: 'linear-gradient(to right, #ffb800 40%, #ff9007 100%)',
      backgroundColor: 'transparent', // Ensure gradient shows
      duration: 0.8,
      ease: "power2.out"
    });

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
      if (bgAnim.scrollTrigger) bgAnim.scrollTrigger.kill();
      bgAnim.kill();
    };
  }, []);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  // Auto-scroll when ingredient is opened
  useEffect(() => {
    if (openId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`ingredient-${openId}`);
        if (element) {
          const offset = element.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2) + (element.offsetHeight / 2);
          window.scrollTo({
            top: offset - 50, // Slight adjustment to show both lines clearly
            behavior: 'smooth'
          });
        }
      }, 100); // Small delay to let the height animation start
      return () => clearTimeout(timer);
    }
  }, [openId]);

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { name: 'SHOP', href: '/shop' },
    { name: 'ABOUT', href: '/about' },
  ];

  return (
    <main ref={mainRef} className="relative bg-[#fffcf4] min-h-screen transition-colors duration-500">
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
              className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-white z-[201] p-12 shadow-2xl flex flex-col border-l-2 border-black"
            >
              <button 
                onClick={() => setIsCartOpen(false)}
                className="absolute top-4 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-50"
              >
                <X size={28} className="text-black" />
              </button>

              <div className="mt-8 flex-grow pl-0 flex flex-col items-start text-left">
                <h3 className="text-black font-black leading-none uppercase mb-6 origin-left scale-x-125"
                    style={{ fontSize: 'max(50px, 5vw)', letterSpacing: '-0.05em' }}>
                  CART
                </h3>
                <p className="text-lg text-black mb-10 font-medium">Your cart is empty</p>
                
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="flex items-center gap-2 text-xl font-medium text-black group transition-all"
                >
                  Go Shopping 
                  <span className="inline-block transition-transform group-hover:translate-x-2 translate-y-[2px]">
                    <svg width="45" height="18" viewBox="0 0 60 20" fill="none" className="text-black">
                      <path d="M0 10H58M58 10L50 2M58 10L50 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header Area - High Z-Index for Interactivity */}
      <div className="max-w-[98%] mx-auto px-4 pt-4 pb-10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-[205]">
         <Link 
           href="/"
           className="flex flex-col items-center cursor-pointer no-cursor-effect relative z-[210]"
         >
            <span className="text-3xl md:text-4xl font-black tracking-tighter leading-none text-black">boost</span>
            <span className="text-[8px] md:text-[10px] font-normal opacity-80 text-black tracking-widest lowercase">immunity vitamin</span>
         </Link>
         
         <div className="flex items-center gap-6 md:gap-12 px-6 md:px-10 py-1.5 border-2 border-black rounded-2xl relative z-[210]">
            {navLinks.map((link) => {
              const isActive = link.name === 'SHOP';
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative text-xs md:text-sm font-bold text-black uppercase tracking-widest group px-2 py-1"
                >
                  <span className="relative z-10 transition-opacity group-hover:opacity-70">{link.name}</span>
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 w-full h-[4px] bg-black rounded-full" />
                  )}
                  <AnimatePresence>
                    {hoveredLink === link.name && !isActive && (
                      <motion.div 
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 12, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute -bottom-1 left-0 w-full h-[4px] bg-black rounded-full"
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
              className="px-6 md:px-8 py-2.5 md:py-3.5 bg-white text-black border-2 border-black rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm"
            >
              CART
            </button>
         </div>
      </div>

      <div className="container mx-auto px-6 pt-0 pb-10">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 md:gap-0 items-start mb-10 relative">
          
          {/* Left: Product Image in Circle */}
          <div className="relative lg:sticky lg:top-32 z-10 flex justify-center lg:justify-start lg:-ml-[5%]">
            {/* The orange circle */}
            <div className="relative w-[90vw] md:w-[60vw] lg:w-[100%] max-w-[600px] aspect-square rounded-full border-[2px] border-[#ff8a00] flex items-center justify-center pointer-events-none overflow-hidden">
               
               {/* The Bottle */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                 <img 
                   ref={bottleRef}
                   src="/bottle-rotation/ezgif-frame-001.png" 
                   alt="BOOST Gummy Vitamins"
                   className="w-[50%] h-auto object-contain"
                   style={{ transform: 'rotate(45deg)' }}
                 />
                </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="text-black text-left z-20 lg:-ml-8 xl:-ml-12">
            <h3 
              className="uppercase text-black text-[32px] md:text-[max(37px,4.514vw)] leading-[90%] tracking-[-.0608em] font-medium mb-4"
            >
              IMMUNITY <br /> GUMMY VITAMINS
            </h3>
            
            {/* Description */}
            <div className="text-black text-[14px] mb-6 leading-tight font-normal text-justify space-y-2 max-w-full lg:max-w-[115%]">
              <p className="whitespace-normal md:whitespace-nowrap">BOOST immunity gummy vitamins are loaded with Elderberry, Vitamin C and Zinc</p>
              <p className="whitespace-normal md:whitespace-nowrap">— the three power ingredients that put your immune system on the offense.</p>
              <p className="whitespace-normal md:whitespace-nowrap">BOOST has 3g of sugar (half the amount of sugar as the leading gummy vitamins)</p>
              <p className="whitespace-normal md:whitespace-nowrap">per serving.</p>
            </div>

            <div className="mb-6">
              <h4 
                className="uppercase text-black text-[16px] md:text-[max(18px,2vw)] leading-none tracking-[-.03em] font-normal mb-2"
              >
                BECAUSE BEING SICK SUCKS
              </h4>
              <div className="w-full h-[1.5px] bg-black mb-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               {/* Single Purchase */}
                <div 
                   onClick={() => setSelectedOption('single')}
                   className={`clickable border-2 rounded-3xl transition-all cursor-pointer group relative overflow-hidden transition-colors duration-500 min-h-[200px] flex flex-col ${
                     selectedOption === 'single' 
                     ? 'border-transparent text-white' 
                     : 'bg-transparent border-black hover:border-transparent hover:text-white'
                   }`}
                  style={selectedOption === 'single' ? {
                    backgroundImage: 'linear-gradient(315.01deg, #ff710d 8.31%, #ffa800 88.22%)'
                  } : {}}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 ${selectedOption === 'single' ? 'hidden' : 'block'}`}
                       style={{ backgroundImage: 'linear-gradient(315.01deg, #ff710d 8.31%, #ffa800 88.22%)' }} />

                  <div className="relative z-10 px-8 pt-4 pb-2">
                    <div className="flex justify-between items-center mb-0"
                         style={{
                           lineHeight: '110%',
                           letterSpacing: '-.02em',
                           fontFamily: 'var(--font-space)',
                           fontSize: 'max(14px, 1.4vw)',
                           fontWeight: 700
                         }}>
                       <span className="uppercase">Single Purchase</span>
                       <span>$35.00</span>
                    </div>
                  </div>

                  <div className={`relative z-10 w-full h-[1px] ${selectedOption === 'single' ? 'bg-white' : 'bg-black group-hover:bg-white'}`} />

                  <div className="relative z-10 px-8 py-3 flex-grow">
                    <ul className="text-[9px] font-medium uppercase tracking-widest space-y-1 text-black">
                       <li>+ One Bottle</li>
                       <li>+ One Time Purchase</li>
                       <li>+ Standard Tips*</li>
                       <li className="normal-case leading-relaxed text-[8px] text-black/80">*Standard Tips include weekly immunity consulting and FIRE limited time offers...all for free</li>
                    </ul>
                  </div>
                </div>

               {/* Subscribe and Save */}
                <div 
                   onClick={() => setSelectedOption('subscribe')}
                   className={`clickable border-2 rounded-3xl transition-all cursor-pointer group relative overflow-hidden transition-colors duration-500 min-h-[200px] flex flex-col ${
                     selectedOption === 'subscribe' 
                     ? 'border-transparent text-white' 
                     : 'bg-transparent border-black hover:border-transparent hover:text-white'
                   }`}
                  style={selectedOption === 'subscribe' ? {
                    backgroundImage: 'linear-gradient(315.01deg, #ff710d 8.31%, #ffa800 88.22%)'
                  } : {}}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 ${selectedOption === 'subscribe' ? 'hidden' : 'block'}`}
                       style={{ backgroundImage: 'linear-gradient(315.01deg, #ff710d 8.31%, #ffa800 88.22%)' }} />

                  <div className="relative z-10 px-8 pt-4 pb-2">
                    <div className="flex justify-between items-center mb-0"
                         style={{
                           lineHeight: '110%',
                           letterSpacing: '-.02em',
                           fontFamily: 'var(--font-space)',
                           fontSize: 'max(14px, 1.4vw)',
                           fontWeight: 700
                         }}>
                       <span className="uppercase">Subscribe and Save</span>
                       <span>$30.00</span>
                    </div>
                  </div>

                  <div className={`relative z-10 w-full h-[1px] ${selectedOption === 'subscribe' ? 'bg-white' : 'bg-black group-hover:bg-white'}`} />

                  <div className="relative z-10 px-8 py-3 flex-grow">
                    <ul className="text-[9px] font-medium uppercase tracking-widest space-y-1 text-black">
                       <li>+ One Bottle/Month</li>
                       <li>+ Cancel Anytime</li>
                       <li>+ *BOOST Membership</li>
                       <li className="normal-case leading-relaxed text-[8px] text-black/80">*BOOST membership includes weekly immunity tips, limited time offers, sick discounts, first access to new products and merch...</li>
                    </ul>
                  </div>
                </div>
            </div>

            {/* ADD TO CART */}
            <button 
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              className={`w-full py-6 rounded-full font-black uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4 transition-all duration-700 ease-in-out ${
                selectedOption ? 'clickable text-white opacity-100' : 'text-white bg-[#a0a0a0] cursor-not-allowed opacity-100'
              }`}
              style={selectedOption ? {
                backgroundImage: buttonColor === 'purple' 
                  ? 'linear-gradient(319deg, #c54664 1%, #7e22ce 35%, #3b82f6 70%, #ff8554 100%)' 
                  : 'linear-gradient(134.99deg, #ff710d 8.31%, #ffa800 88.22%)',
              } : {}}
            >
              ADD TO CART <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Ingredients Section - Block Centered, Content Left-Aligned */}
        <div ref={whatsInsideRef} className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
          <div className="mb-24 relative">
            <h1 
              className="uppercase mb-0 text-white origin-left scale-x-125"
              style={{
                lineHeight: '80%',
                letterSpacing: '-.0608em',
                fontSize: 'max(54px, 11.806vw)',
                fontWeight: 700,
                textAlign: 'left'
              }}
            >
              WHAT’S
            </h1>
            <div className="flex flex-col md:flex-row items-baseline justify-start md:gap-8 mt-4 md:mt-2">
              <span className="text-white font-black uppercase text-[10px] md:text-[12px] leading-tight text-left mb-4 md:mb-0">
                peep the <br /> ingredients
              </span>
              <h2 
                className="uppercase text-white origin-left scale-x-125"
                style={{
                  lineHeight: '90%',
                  letterSpacing: '-.0608em',
                  fontSize: 'max(45px, 6.806vw)',
                  fontWeight: 500
                }}
              >
                INSIDE?
              </h2>
            </div>
          </div>

          <div className="border-t-2 border-white relative">
            {ingredientsData.map((item) => (
              <div 
                key={item.id} 
                id={`ingredient-${item.id}`} 
                className={`border-b-2 border-white transition-all duration-700 ease-in-out relative ${
                  openId === item.id ? 'min-h-[80vh] flex flex-col justify-center' : 'opacity-100'
                }`}
              >
                <button 
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="w-full py-10 flex items-center justify-between group select-text focus:outline-none focus-visible:outline-none outline-none cursor-pointer"
                >
                  <span 
                    className="text-white uppercase transition-all duration-500 text-left select-text origin-left scale-x-125"
                    style={{
                      fontSize: openId === item.id ? 'max(40px, 6vw)' : 'max(30px, 4.5vw)',
                      fontWeight: 700,
                      letterSpacing: '0',
                      lineHeight: '100%'
                    }}
                  >
                    {item.name}
                  </span>
                  <div className="relative w-6 h-6 shrink-0">
                    {/* Symmetrical Rotating Plus to Cross Icon - Fixed Dimensions */}
                    <motion.div 
                      animate={{ rotate: openId === item.id ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "backOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {/* Horizontal Line */}
                      <div className="absolute w-6 h-[2px] bg-white rounded-full" />
                      {/* Vertical Line */}
                      <div className="absolute h-6 w-[2px] bg-white rounded-full" />
                    </motion.div>
                  </div>
                </button>
                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-16 pt-6">
                        {/* Top Info Row - Compact */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-left">
                          <div className="text-white">
                            <p className="text-sm font-black uppercase tracking-widest mb-1">BOOST has {item.amount}</p>
                            <p className="text-lg font-bold">of {item.name.toLowerCase()} per serving</p>
                          </div>
                          <div className="text-white font-bold text-[18px] leading-snug max-w-xl">
                            {item.description}
                          </div>
                        </div>

                        {/* Benefits Section with Image on Left */}
                        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start">
                          {/* Image Column - Moved up */}
                          {item.id !== 'inactive' && (
                            <div className="w-full md:w-1/3 flex items-center justify-center -mt-8">
                              <motion.img 
                                initial={{ scale: 0.8, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                src={`/${item.id === 'elderberry' ? 'Elderberry' : item.id === 'vitamin-c' ? 'Vitaminc' : 'Zinc'}.png`}
                                alt={item.name}
                                className="w-[85%] h-auto drop-shadow-2xl"
                              />
                            </div>
                          )}

                          {/* Benefits Grid Column */}
                          <div className={`w-full ${item.id === 'inactive' ? 'md:w-full' : 'md:w-2/3'}`}>
                            <div className="flex justify-between items-center mb-8">
                              <h5 className="text-white text-[12px] font-black uppercase tracking-widest">BENEFITS</h5>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-left">
                              {item.benefits.map((benefit, idx) => (
                                <div key={idx} className="relative pt-6">
                                  {/* Thick white line above each benefit */}
                                  <div className="absolute top-0 left-0 w-full h-[4px] bg-white mb-6" />
                                  
                                  <h6 className="text-[19px] font-black text-white uppercase tracking-tight mb-3">
                                    {benefit.title}
                                  </h6>
                                  <p className="text-white font-medium text-[14px] leading-relaxed">
                                    {benefit.text}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unified background area - text-white applied globally */}
      <div className="text-white">
        
        {/* WORD ON THE STREET (Testimonials) */}
        <Testimonials />

        {/* Double Marquee Section - Directly above GET BOOSTED */}
        <section className="py-8 bg-transparent overflow-hidden">
          {/* Row 1: Right to Left */}
          <div className="flex whitespace-nowrap animate-marquee mb-2">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="marquee-text-size font-black text-white uppercase mx-10">
                • AN IMMUNITY VITAMIN • IT'S LIKE A CONDOM FOR YOUR HEALTH • AN IMMUNITY VITAMIN • FOMO FOR YOUR HEALTH • BECAUSE BEING SICK SUCKS • AN IMMUNITY VITAMIN • DON’T PANIC, TAKE BOOST • BOOST YOUR IMMUNITY
              </span>
            ))}
          </div>
          
          {/* Row 2: Left to Right (Reverse) */}
          <div className="flex whitespace-nowrap animate-marquee-reverse">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="marquee-text-size font-black text-white uppercase mx-10">
                • AN IMMUNITY VITAMIN • IT'S LIKE A CONDOM FOR YOUR HEALTH • AN IMMUNITY VITAMIN • FOMO FOR YOUR HEALTH • BECAUSE BEING SICK SUCKS • AN IMMUNITY VITAMIN • DON’T PANIC, TAKE BOOST • BOOST YOUR IMMUNITY
              </span>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
