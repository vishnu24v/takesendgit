'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import SmoothReveal from '../animations/SmoothReveal';

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

export default function Ingredients() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-32 bg-transparent">
      <div className="container mx-auto px-6">
        <SmoothReveal className="text-left mb-24 relative">
          <div className="flex flex-col">
             <h2 className="text-[12vw] md:text-[10vw] font-black text-white leading-[0.8] tracking-tighter uppercase m-0">
               WHAT’S
             </h2>
             <h2 className="text-[12vw] md:text-[10vw] font-black text-white leading-[0.8] tracking-tighter uppercase m-0">
               INSIDE?
             </h2>
          </div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 md:translate-x-full md:ml-20">
             <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center mb-4">
                <div className="w-2 h-2 bg-white rounded-full" />
             </div>
             <p className="text-white font-black uppercase tracking-widest text-[10px]">Peep the ingredients</p>
          </div>
        </SmoothReveal>

        <div className="space-y-0 border-t border-white/30">
          {ingredientsData.map((item) => (
            <div key={item.id} className="border-b border-white/30">
              <button 
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full py-12 flex items-center justify-between group"
              >
                <span className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter group-hover:opacity-60 transition-opacity">
                  {item.name}
                </span>
                <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center transition-all group-hover:bg-white group-hover:text-black">
                   {openId === item.id ? <Minus size={32} /> : <Plus size={32} />}
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
                          <h4 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
                            BOOST has {item.amount} <br /> of {item.name.toLowerCase()} per serving
                          </h4>
                          <p className="text-white/70 font-bold text-lg leading-relaxed max-w-xl">
                            {item.description}
                          </p>
                       </div>

                       {item.benefits.length > 0 && (
                         <div className="space-y-12">
                            <h5 className="text-xl font-black text-white uppercase tracking-[0.3em] border-b-2 border-white/20 pb-4">Benefits</h5>
                            <div className="space-y-10">
                               {item.benefits.map((benefit, idx) => (
                                 <div key={idx} className="space-y-2">
                                    <h6 className="text-2xl font-black text-white uppercase tracking-tighter">
                                      {benefit.title}
                                    </h6>
                                    <p className="text-white/60 font-bold text-sm leading-relaxed">
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
    </section>
  );
}
