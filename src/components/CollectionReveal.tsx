import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COLLECTION_LOOKS } from '../data/coutureData';
import { Clock, Scissors, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CollectionRevealProps {
  onSelectLook?: (lookId: string) => void;
  onOpenAppointment: () => void;
}

export const CollectionReveal: React.FC<CollectionRevealProps> = ({ onOpenAppointment }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    if (!section || !pinContainer) return;

    const lookFrames = section.querySelectorAll('.look-frame');
    const textFrames = section.querySelectorAll('.text-frame');

    const ctx = gsap.context(() => {
      // Create master pinned timeline across all 4 looks
      const totalLooks = COLLECTION_LOOKS.length;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalLooks * 120}%`,
          pin: pinContainer,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              totalLooks - 1,
              Math.floor(self.progress * totalLooks)
            );
            setActiveIdx(idx);
          },
        },
      });

      // Animate transitions between looks sequentially
      lookFrames.forEach((frame, i) => {
        if (i === 0) {
          // Look 1 starts active
          gsap.set(frame, { opacity: 1, scale: 1, xPercent: 0, yPercent: 0 });
          gsap.set(textFrames[0], { opacity: 1, y: 0 });
        } else {
          // Alternate entry directions for high-fashion editorial dynamism
          const enterFromLeft = i % 2 === 1;
          gsap.set(frame, {
            opacity: 0,
            scale: 1.12,
            xPercent: enterFromLeft ? -30 : 30,
            yPercent: 10,
          });
          gsap.set(textFrames[i], { opacity: 0, y: 40 });

          // Transition timeline segment
          tl.to(
            lookFrames[i - 1],
            {
              opacity: 0,
              scale: 0.94,
              xPercent: enterFromLeft ? 20 : -20,
              yPercent: -8,
              duration: 1.4,
              ease: 'power2.inOut',
            },
            `step-${i}`
          )
            .to(
              textFrames[i - 1],
              {
                opacity: 0,
                y: -30,
                duration: 0.9,
                ease: 'power2.in',
              },
              `step-${i}`
            )
            .to(
              frame,
              {
                opacity: 1,
                scale: 1,
                xPercent: 0,
                yPercent: 0,
                duration: 1.4,
                ease: 'power2.out',
              },
              `step-${i}+=0.3`
            )
            .to(
              textFrames[i],
              {
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: 'power2.out',
              },
              `step-${i}+=0.4`
            );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative w-full bg-charcoal text-ivory"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinContainerRef}
        className="w-full h-[100dvh] min-h-[600px] overflow-hidden flex flex-col justify-between p-4 sm:p-8 md:p-12 lg:p-16 relative"
      >
        {/* Editorial Section Top Header */}
        <div className="relative z-20 flex items-center justify-between border-b border-ivory/10 pb-3 sm:pb-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gold font-sans">
              Curated Lookbook
            </span>
            <span className="text-ivory/20 font-light">/</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-ivory/60 font-sans truncate max-w-[140px] sm:max-w-none">
              The Nocturne Suite
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 text-[10px] sm:text-[11px] font-mono tracking-widest text-gold">
            <span>0{activeIdx + 1}</span>
            <span className="text-ivory/30">/</span>
            <span className="text-ivory/50">0{COLLECTION_LOOKS.length}</span>
          </div>
        </div>

        {/* Central Asymmetric Fashion Editorial Composition */}
        <div className="relative z-10 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center py-2 sm:py-4 my-auto">
          {/* Main Viewport Model Frame */}
          <div className="lg:col-span-7 xl:col-span-8 relative h-[42vh] sm:h-[50vh] lg:h-[68vh] rounded-sm overflow-hidden bg-charcoal-800">
            {COLLECTION_LOOKS.map((look, idx) => (
              <div
                key={look.id}
                className="look-frame absolute inset-0 w-full h-full will-change-transform"
                style={{ opacity: idx === 0 ? 1 : 0 }}
                data-cursor="VIEW LOOK"
              >
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out"
                />
                {/* Subtle soft gradient scrim to give text and details crisp editorial contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-charcoal-900/20" />
                <div className="absolute inset-0 border border-gold/15 pointer-events-none" />

                {/* Floating look number watermark inside the frame */}
                <div className="absolute bottom-3 right-4 sm:bottom-6 sm:right-6 font-serif italic text-4xl sm:text-7xl lg:text-8xl text-ivory/10 font-light select-none">
                  {look.number}
                </div>
              </div>
            ))}
          </div>

          {/* Floating Editorial Narrative & Craft Metadata (Takes 5 of 12 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 relative min-h-[220px] sm:min-h-[260px] lg:min-h-[300px] flex flex-col justify-center pl-0 lg:pl-6">
            {COLLECTION_LOOKS.map((look, idx) => (
              <div
                key={`text-${look.id}`}
                className="text-frame absolute inset-0 flex flex-col justify-center space-y-2 sm:space-y-4 will-change-transform"
                style={{ opacity: idx === 0 ? 1 : 0 }}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-gold font-sans">
                    Ensemble {look.number}
                  </span>
                  <span className="w-6 sm:w-8 h-[1px] bg-gold/40" />
                </div>

                <h3 className="font-editorial text-lg sm:text-2xl lg:text-4xl tracking-wider text-ivory font-light uppercase leading-tight">
                  {look.title}
                </h3>

                <p className="font-serif italic text-xs sm:text-base lg:text-lg text-ivory/80 leading-relaxed line-clamp-2 sm:line-clamp-none">
                  "{look.quote}"
                </p>

                <div className="space-y-1.5 sm:space-y-2 pt-1.5 sm:pt-2 border-t border-ivory/10 text-[10px] sm:text-[11px] tracking-wider text-ivory/70 font-sans">
                  <div className="flex items-center space-x-2 truncate">
                    <Scissors size={12} className="text-gold/80 flex-shrink-0" />
                    <span className="truncate"><strong className="text-ivory font-medium">Silhouette:</strong> {look.silhouette}</span>
                  </div>
                  <div className="flex items-center space-x-2 truncate">
                    <Sparkles size={12} className="text-gold/80 flex-shrink-0" />
                    <span className="truncate"><strong className="text-ivory font-medium">Craft:</strong> {look.craftsmanship}</span>
                  </div>
                  <div className="hidden sm:flex items-center space-x-2">
                    <Clock size={12} className="text-gold/80 flex-shrink-0" />
                    <span><strong className="text-ivory font-medium">Atelier Time:</strong> {look.hours.toLocaleString()} Hours</span>
                  </div>
                </div>

                <div className="pt-2 sm:pt-4 flex items-center space-x-3 sm:space-x-4">
                  <button
                    onClick={onOpenAppointment}
                    className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-sans px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gold/15 text-gold border border-gold/40 hover:bg-gold hover:text-charcoal-900 transition-all duration-300"
                    data-cursor="INQUIRE"
                  >
                    Request Fitting
                  </button>
                  <span className="text-[9px] tracking-widest text-ivory/40 uppercase font-sans">
                    Custom Bespoke
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pinned Progress Line */}
        <div className="relative z-20 flex items-center justify-between border-t border-ivory/10 pt-3 sm:pt-4">
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-ivory/40 font-sans">
            Scroll to turn page
          </span>
          <div className="flex space-x-2">
            {COLLECTION_LOOKS.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  activeIdx === i ? 'w-6 sm:w-8 bg-gold' : 'w-2 bg-ivory/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
