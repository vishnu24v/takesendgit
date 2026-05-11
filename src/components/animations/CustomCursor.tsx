'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const hoverTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      if (hoverTimeline.current) {
        hoverTimeline.current.kill();
      }
      
      // Initial shrink and color set to Dark Purple
      gsap.to(cursor, {
        scale: 0.5,
        borderColor: '#7E22CE',
        backgroundColor: '#7E22CE',
        duration: 0.4,
        ease: "power2.out"
      });

      // Infinite cycling timeline: Purple -> Orange -> Purple
      hoverTimeline.current = gsap.timeline({ repeat: -1 })
        .to(cursor, {
          borderColor: '#F97316',
          backgroundColor: '#F97316',
          duration: 0.4,
          ease: "power2.inOut"
        }, "+=2") 
        .to(cursor, {
          borderColor: '#7E22CE',
          backgroundColor: '#7E22CE',
          duration: 0.4,
          ease: "power2.inOut"
        }, "+=2");
    };

    const handleMouseLeave = () => {
      if (hoverTimeline.current) {
        hoverTimeline.current.kill();
        hoverTimeline.current = null;
      }
      gsap.to(cursor, {
        scale: 1,
        borderColor: 'black',
        backgroundColor: 'transparent',
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleMouseOverDelegated = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, input, select, textarea, [role="button"], .clickable');
      const isExempt = target.closest('.no-cursor-effect');
      
      if (isClickable && !isExempt) {
        handleMouseEnter();
      }
    };

    const handleMouseOutDelegated = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, input, select, textarea, [role="button"], .clickable');
      
      if (isClickable) {
        const related = e.relatedTarget as HTMLElement | null;
        if (related && isClickable.contains(related)) return;
        handleMouseLeave();
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOverDelegated);
    document.addEventListener("mouseout", handleMouseOutDelegated);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOverDelegated);
      document.removeEventListener("mouseout", handleMouseOutDelegated);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-7 h-7 border-[1.5px] border-black rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{ transformOrigin: "center", backgroundColor: 'transparent', borderColor: 'black' }}
    />
  );
}
