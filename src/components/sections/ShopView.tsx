'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, X, ArrowRight } from 'lucide-react';

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

export default function ShopView({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[2000] bg-[#fffcf4] overflow-y-auto h-screen w-full"
        >
          {/* Header Area */}
          <div className="container mx-auto px-6 py-10 flex justify-between items-center relative z-50">
             <div 
               onClick={onClose}
               className="flex flex-col items-center cursor-pointer"
             >
                <span className="text-4xl font-black tracking-tighter leading-none text-black">boost</span>
                <span className="text-[10px] font-normal opacity-80 text-black">Immunity Vitamin</span>
             </div>
             
             <div className="flex items-center gap-8 px-8 py-2 border-2 border-black rounded-md">
                <span className="text-sm font-medium text-black uppercase tracking-widest relative">
                  SHOP
                  {/* Thick Underline like in image */}
                  <div className="absolute -bottom-1 left-0 w-full h-[4px] bg-black" />
                </span>
                <span className="text-sm font-medium text-black uppercase tracking-widest hover:opacity-70 cursor-pointer transition-colors">ABOUT</span>
             </div>

             <div className="flex items-center gap-6">
                <button 
                  className="px-6 py-2 bg-white text-black border-2 border-black rounded-md font-medium text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  CART
                </button>
             </div>
          </div>

          <div className="container mx-auto px-6 py-10">
            {/* Main Product Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
              {/* Left: Product Image in Circle */}
              <div className="relative sticky top-20">
                <div className="w-full aspect-square rounded-full border border-[#ff8a00]/30 flex items-center justify-center">
                   <motion.img 
                     initial={{ rotate: -15, scale: 0.8 }}
                     animate={{ rotate: 0, scale: 1 }}
                     transition={{ delay: 0.2, duration: 1 }}
                     src="boost_orange_bottle_1778151076368.png" 
                     alt="BOOST Gummy Vitamins"
                     className="w-full max-w-lg drop-shadow-2xl rotate-[-15deg]"
                   />
                </div>
              </div>

              {/* Right: Info */}
              <div className="text-black text-left">
                <h3 
                  className="uppercase font-bold text-black"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    marginBottom: '1.597vw',
                    lineHeight: '90%',
                    letterSpacing: '-.0608em',
                    fontSize: '4.122vw',
                    fontWeight: 700,
                    visibility: 'inherit',
                    opacity: 1,
                    transform: 'translate(0px, 0px)'
                  }}
                >
                  IMMUNITY <br /> GUMMY VITAMINS
                </h3>
                <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
                  BOOST immunity gummy vitamins are loaded with Elderberry, Vitamin C and Zinc — the three power ingredients that put your immune system on the offense. BOOST has 3g of sugar (half the amount of sugar as the leading gummy vitamins) per serving.
                </p>

                <div className="border-t border-black/10 pt-8 mb-12">
                   <h3 className="text-3xl font-black uppercase tracking-tighter">
                     BECAUSE BEING SICK SUCKS
                   </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                   {/* Single Purchase */}
                   <div className="border-2 border-black p-8 rounded-3xl transition-all cursor-pointer group relative overflow-hidden hover:bg-[#ff8a00] hover:border-[#ff8a00]">
                      <div className="flex justify-between items-center mb-6">
                         <span className="font-black uppercase tracking-widest text-xs text-black group-hover:text-white transition-colors">Single Purchase</span>
                         <span className="text-2xl font-black text-black group-hover:text-white transition-colors">$35.00</span>
                      </div>
                      <ul className="text-[10px] font-black uppercase tracking-widest space-y-3 opacity-60 text-black group-hover:text-white group-hover:opacity-100 transition-all">
                         <li>+ One Bottle</li>
                         <li>+ One Time Purchase</li>
                         <li>+ Standard Tips*</li>
                         <li className="normal-case opacity-40 leading-relaxed group-hover:opacity-70">*Standard Tips include weekly immunity consulting and FIRE limited time offers...all for free</li>
                      </ul>
                   </div>

                   {/* Subscribe and Save */}
                   <div className="border-2 border-black p-8 rounded-3xl transition-all cursor-pointer group relative overflow-hidden hover:bg-[#ff8a00] hover:border-[#ff8a00]">
                      <div className="flex justify-between items-center mb-6">
                         <span className="font-black uppercase tracking-widest text-xs text-black group-hover:text-white transition-colors">Subscribe and Save</span>
                         <span className="text-2xl font-black text-black group-hover:text-white transition-colors">$30.00</span>
                      </div>
                      <ul className="text-[10px] font-black uppercase tracking-widest space-y-3 opacity-60 text-black group-hover:text-white group-hover:opacity-100 transition-all">
                         <li>+ One Bottle/Month</li>
                         <li>+ Cancel Anytime</li>
                         <li>+ *BOOST Membership</li>
                         <li className="normal-case opacity-40 leading-relaxed group-hover:opacity-70">*BOOST membership includes weekly immunity tips, limited time offers, sick discounts, first access to new products and merch, and 24/7 customer service</li>
                      </ul>
                   </div>
                </div>

                {/* ADD TO CART */}
                <button className="w-full bg-[#f0f0f0] text-black/40 py-8 rounded-full font-black uppercase tracking-[0.3em] text-sm hover:bg-black hover:text-white transition-all flex items-center justify-center gap-4">
                  ADD TO CART <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Ingredients Section (Moved from Home) */}
            <div className="border-t border-black/10 pt-32">
              <div className="flex flex-col mb-24">
                 <h2 className="text-[12vw] md:text-[10vw] font-black text-black leading-[0.8] tracking-tighter uppercase m-0">
                   WHAT’S
                 </h2>
                 <div className="flex items-center gap-10">
                    <h2 className="text-[12vw] md:text-[10vw] font-black text-black leading-[0.8] tracking-tighter uppercase m-0">
                      INSIDE?
                    </h2>
                    <p className="text-black font-black uppercase tracking-widest text-[10px] mt-10">Peep the ingredients</p>
                 </div>
              </div>

              <div className="space-y-0 border-t border-black/10">
                {ingredientsData.map((item) => (
                  <div key={item.id} className="border-b border-black/10">
                    <button 
                      onClick={() => setOpenId(openId === item.id ? null : item.id)}
                      className="w-full py-12 flex items-center justify-between group"
                    >
                      <span className="text-4xl md:text-8xl font-black text-black uppercase tracking-tighter group-hover:opacity-60 transition-opacity">
                        {item.name}
                      </span>
                      <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center transition-all group-hover:bg-black group-hover:text-white">
                         {openId === item.id ? <X size={32} /> : <Plus size={32} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {openId === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
                             <div className="space-y-10">
                                <h4 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tighter">
                                  BOOST has {item.amount} <br /> of {item.name.toLowerCase()} per serving
                                </h4>
                                <p className="text-black/70 font-bold text-lg leading-relaxed max-w-xl">
                                  {item.description}
                                </p>
                             </div>

                             {item.benefits.length > 0 && (
                               <div className="space-y-12">
                                  <h5 className="text-xl font-black text-black uppercase tracking-[0.3em] border-b-2 border-black/10 pb-4">Benefits</h5>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                                     {item.benefits.map((benefit, idx) => (
                                       <div key={idx} className="space-y-2 border-t border-black/10 pt-4">
                                          <h6 className="text-xl font-black text-black uppercase tracking-tighter">
                                            {benefit.title}
                                          </h6>
                                          <p className="text-black/60 font-bold text-xs leading-relaxed">
                                            {benefit.text}
                                          </p>
                                       </div>
                                     ))}
                                  </div>
                               </div>
                             )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
