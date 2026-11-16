import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../utils/lenis';

gsap.registerPlugin(ScrollTrigger);

interface FinalStatementProps {
  onOpenAppointment: () => void;
}

export const FinalStatement: React.FC<FinalStatementProps> = ({ onOpenAppointment }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imageRef.current;
    const text = textRef.current;

    if (!container || !img || !text) return;

    const ctx = gsap.context(() => {
      // Slow dramatic zoom on scroll
      gsap.fromTo(
        img,
        { scale: 1.05, filter: 'brightness(0.7)' },
        {
          scale: 1.25,
          filter: 'brightness(0.85)',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      // Text rise & reveal
      gsap.fromTo(
        text,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 75%',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="statement"
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[580px] bg-charcoal-noir text-ivory overflow-hidden flex items-center justify-center select-none"
    >
      {/* Full Viewport High-Drama Indian Couture Visual */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          ref={imageRef}
          src="/images/couture_crimson_bridal.jpg"
          alt="Aparajita Couture Final Statement"
          className="w-full h-full object-cover object-center will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-noir via-charcoal-noir/40 to-charcoal-noir/70 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(10,9,9,0.7)_100%)] pointer-events-none" />
      </div>

      {/* Large Typography & Minimal CTA */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-5 sm:px-6 max-w-4xl flex flex-col items-center"
      >
        <span className="text-[9px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-gold font-sans mb-3 sm:mb-4">
          The Climax
        </span>

        <h2 className="font-editorial text-2xl sm:text-6xl md:text-8xl lg:text-9xl tracking-[0.08em] sm:tracking-[0.2em] text-ivory font-light uppercase leading-none drop-shadow-2xl text-center break-words">
          WEAR THE ART.
        </h2>

        <div className="w-12 sm:w-16 h-[1px] bg-gold/50 my-4 sm:my-6" />

        <p className="font-serif italic text-base sm:text-2xl text-ivory/80 max-w-lg mb-6 sm:mb-8 font-light">
          An heirloom designed not merely for an evening, but for a lifetime and beyond.
        </p>

        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
          <button
            onClick={onOpenAppointment}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-sans bg-gold text-charcoal-900 font-medium hover:bg-gold-light hover:shadow-[0_0_30px_rgba(197,168,128,0.4)] transition-all duration-300 flex items-center justify-center space-x-2"
            data-cursor="SALON"
          >
            <span>Book Private Consultation</span>
            <ArrowUpRight size={14} />
          </button>

          <button
            onClick={() => scrollToSection('#collection')}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-sans border border-ivory/30 text-ivory hover:border-gold hover:text-gold transition-colors duration-300 text-center"
            data-cursor="RETURN"
          >
            Revisit The Collection
          </button>
        </div>
      </div>

      {/* Floating Bottom Minimal Cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[9px] uppercase tracking-[0.35em] text-ivory/40 font-sans">
        Atelier Aparajita · MMXXV Edition
      </div>
    </section>
  );
};
