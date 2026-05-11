'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  stagger?: number;
}

export default function TextReveal({ text, className, stagger = 0.05 }: TextRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.fromTo(chars, 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger, 
        duration: 1, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [stagger]);

  return (
    <h1 ref={containerRef} className={`${className} overflow-hidden flex flex-wrap`}>
      {text.split("").map((char, index) => (
        <span key={index} className="char inline-block whitespace-pre">
          {char}
        </span>
      ))}
    </h1>
  );
}
