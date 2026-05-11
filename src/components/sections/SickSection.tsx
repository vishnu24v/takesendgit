'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SickSection() {
  const router = useRouter();

  return (
    <section className="relative w-full min-h-screen bg-[#ff8a00] overflow-hidden flex items-center py-20">


      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Stay Sick Text & Circle */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-start justify-center min-h-[500px]">
            {/* White Circle Stroke */}
            <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[140%] aspect-square border-[1px] border-white/60 rounded-full pointer-events-none" />
            
            <div className="relative z-10 text-white font-black leading-[0.8] tracking-tighter text-left">
              <div className="text-[12vw] lg:text-[11vw] uppercase">
                STAY <br /> SICK <span className="inline-block translate-y-[-10%] text-[8vw] lg:text-[7vw]">🤙</span>
              </div>
              <div className="text-[12vw] lg:text-[11vw] uppercase mt-4">
                NOT <br /> SICK <span className="inline-block translate-y-[-10%] text-[8vw] lg:text-[7vw]">🤧</span>
              </div>
            </div>
          </div>

          {/* Middle: Vertical Arrow & Bottle */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center relative min-h-[600px]">
             {/* Vertical Line and Arrow - Centered */}
             <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
                <div className="w-[1px] h-20 bg-black opacity-20" />
                <div className="w-3 h-3 rounded-full border border-black opacity-20 my-2" />
                <div className="w-[1px] flex-grow bg-black opacity-20" />
                <div className="p-4">
                  <ArrowDown className="text-black opacity-20 w-5 h-5" />
                </div>
             </div>

             {/* Static Bottle Removed to use Bottle3D component */}
             <div className="h-[350px]" /> {/* Spacer */}

             {/* Buy Circle - Perfectly positioned like image */}
             <motion.div 
               whileHover={{ scale: 1.1 }}
               onClick={() => router.push('/shop')}
               className="absolute top-[40%] right-[-10px] z-30 w-16 h-16 bg-white rounded-full border border-black flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all shadow-lg"
             >
                <span className="font-black text-[10px] uppercase">BUY</span>
             </motion.div>
          </div>

          {/* Right Side: Text & Button */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left text-white">
            <div className="mb-8">
              <p className="text-[10px] font-bold tracking-[0.2em] mb-6 uppercase opacity-80">
                BOOST HELPS YOU GET SICK LESS
              </p>
              
              <h2 className="text-[6vw] lg:text-[4vw] font-black leading-[0.9] uppercase mb-10 tracking-tighter">
                BE PROACTIVE <br />
                NOT REACTIVE <br />
                ABOUT YOUR <br />
                IMMUNITY
              </h2>
              
              <p className="text-sm md:text-lg font-normal leading-relaxed mb-12 max-w-md opacity-90">
                No one gives a f*ck about their immune system unless they have to...and it took us a pandemic to realize that. BOOST is here to fix that.
              </p>

              <button 
                onClick={() => router.push('/shop')}
                className="px-12 py-3 border-2 border-white rounded-md font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-[#ff8a00] transition-all"
              >
                BUY BOOST
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
