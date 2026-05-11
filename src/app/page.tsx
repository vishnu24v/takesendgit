import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import SickSection from "@/components/sections/SickSection";
import ScrollSection from "@/components/sections/ScrollSection";
import Bottle3D from "@/components/sections/Bottle3D";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";

const marqueeText = "• AN IMMUNITY VITAMIN • IT'S LIKE A CONDOM FOR YOUR HEALTH • AN IMMUNITY VITAMIN • FOMO FOR YOUR HEALTH • BECAUSE BEING SICK SUCKS • AN IMMUNITY VITAMIN • DON’T PANIC, TAKE BOOST • BOOST YOUR IMMUNITY ";

export default function Home() {
  return (
    <main className="relative bg-transparent min-h-screen">
      <Navbar />
      <Bottle3D />
      <Hero />
      <SickSection />
      <ScrollSection />
      
      <div className="bg-gradient-to-r from-[#ffb800] to-[#ff9007] text-white">
        <Testimonials />

        {/* Double Marquee Section - Compact & Straight Text */}
        <section className="py-8 bg-transparent overflow-hidden">
          {/* Row 1: Right to Left */}
          <div className="flex whitespace-nowrap animate-marquee mb-2">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="marquee-text-size font-black text-white uppercase mx-10">
                {marqueeText}
              </span>
            ))}
          </div>
          
          {/* Row 2: Left to Right (Reverse) */}
          <div className="flex whitespace-nowrap animate-marquee-reverse">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="marquee-text-size font-black text-white uppercase mx-10">
                {marqueeText}
              </span>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
