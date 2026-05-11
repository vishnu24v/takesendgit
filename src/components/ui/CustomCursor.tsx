'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorColor, setCursorColor] = useState('#ff8a00'); // Initial Orange

  const cursorX = useSpring(0, { damping: 20, stiffness: 300 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Color changing interval (every 2 seconds)
    const colorInterval = setInterval(() => {
      setCursorColor(prev => prev === '#ff8a00' ? '#7000ff' : '#ff8a00'); // Orange and Purple
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      clearInterval(colorInterval);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[7px] h-[7px] bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        backgroundColor: isHovering ? cursorColor : 'black',
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{ backgroundColor: { duration: 0.5 } }}
    />
  );
}
