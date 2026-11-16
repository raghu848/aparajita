import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check for custom cursor targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorEl = target.closest('[data-cursor]');
        if (cursorEl) {
          const text = cursorEl.getAttribute('data-cursor') || '';
          setCursorText(text);
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationId: number;
    const render = () => {
      // Lerp smoothing
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.18;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.18;
      setPosition({ x: posRef.current.x, y: posRef.current.y });
      animationId = requestAnimationFrame(render);
    };
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-300 ease-out flex items-center justify-center mix-blend-difference"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isHovered ? (cursorText ? '80px' : '48px') : '10px',
        height: isHovered ? (cursorText ? '80px' : '48px') : '10px',
        borderRadius: '50%',
        backgroundColor: isHovered ? (cursorText ? 'rgba(247, 244, 238, 0.95)' : 'transparent') : 'rgba(238, 217, 168, 0.9)',
        border: isHovered && !cursorText ? '1px solid rgba(238, 217, 168, 0.8)' : 'none',
      }}
    >
      {cursorText && (
        <span className="text-[10px] tracking-widest uppercase font-medium text-charcoal-900 select-none font-sans scale-90">
          {cursorText}
        </span>
      )}
    </div>
  );
};
