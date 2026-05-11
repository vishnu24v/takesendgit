'use client';

import LuxuryCard from '../ui/LuxuryCard';
import SmoothReveal from '../animations/SmoothReveal';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Abstract 3D Pack',
    price: '$49',
    category: '3D Assets',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    rating: 4.9
  },
  {
    id: 2,
    name: 'Luxury UI Kit',
    price: '$79',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    rating: 5.0
  },
  {
    id: 3,
    name: 'Motion Presets',
    price: '$29',
    category: 'Animation',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
    rating: 4.8
  }
];

export default function ProductShowcase() {
  return (
    <section className="py-32 relative overflow-hidden bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <SmoothReveal direction="right">
              <span className="text-purple-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Our Shop</span>
              <h2 className="text-4xl md:text-7xl font-black luxury-text-gradient leading-tight">
                Curated Digital <br /> Excellence.
              </h2>
            </SmoothReveal>
          </div>
          <SmoothReveal direction="left">
            <button className="px-10 py-5 glass rounded-full font-black uppercase tracking-widest text-xs border border-white/10 hover:bg-white/10 transition-all">
              Explore All Products
            </button>
          </SmoothReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <SmoothReveal key={product.id} delay={index * 0.2}>
              <LuxuryCard className="group">
                <div className="relative h-64 w-full rounded-3xl overflow-hidden mb-8">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-purple-300">
                    {product.category}
                  </div>
                </div>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 mt-1">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-white">{product.price}</p>
                </div>

                <button className="w-full mt-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 group-hover:bg-purple-500 group-hover:border-purple-500 transition-all">
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              </LuxuryCard>
            </SmoothReveal>
          ))}
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-10">
        <div className="w-full h-full border-[1px] border-white/10 rounded-full scale-150 rotate-45" />
      </div>
    </section>
  );
}
