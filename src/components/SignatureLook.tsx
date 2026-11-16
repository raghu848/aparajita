import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SIGNATURE_HOTSPOTS } from '../data/coutureData';
import { Hotspot } from '../types';
import { Info, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const SignatureLook: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const backgroundTextRef = useRef<HTMLDivElement>(null);
  const modelWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    const bgText = backgroundTextRef.current;
    const modelWrapper = modelWrapperRef.current;

    if (!container || !pin || !bgText || !modelWrapper) return;

    const ctx = gsap.context(() => {
      // Pinned theatrical presentation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=160%',
          pin: pin,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Background typography glides smoothly behind the model
      tl.fromTo(
        bgText,
        { xPercent: 20, opacity: 0.08 },
        { xPercent: -20, opacity: 0.16, ease: 'none', duration: 2 }
      )
        // Model slowly scales and shifts with perspective depth
        .fromTo(
          modelWrapper,
          { scale: 0.95, yPercent: 4 },
          { scale: 1.08, yPercent: -4, ease: 'power1.out', duration: 2 },
          0
        );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signature"
      ref={containerRef}
      className="relative w-full bg-charcoal-noir text-ivory overflow-hidden"
    >
      <div
        ref={pinRef}
        className="w-full h-screen relative flex items-center justify-center overflow-hidden"
      >
        {/* Massive Editorial Background Typography sliding behind model */}
        <div
          ref={backgroundTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 whitespace-nowrap will-change-transform"
        >
          <span className="font-editorial text-[18vw] lg:text-[22vw] text-ivory/10 tracking-[0.1em] font-light uppercase leading-none">
            SIGNATURE
          </span>
        </div>

        {/* Ambient Subtle Chiaroscuro Lighting */}
        <div className="absolute inset-0 bg-radial-gradient from-champagne-100/5 via-transparent to-charcoal-noir pointer-events-none z-0" />

        {/* Center Model Garment Container */}
        <div
          ref={modelWrapperRef}
          className="relative z-10 w-[88vw] sm:w-[65vw] md:w-[48vw] lg:w-[36vw] h-[64vh] sm:h-[72vh] md:h-[82vh] max-h-[880px] rounded-sm overflow-hidden shadow-2xl border border-gold/25 will-change-transform bg-charcoal-800"
          data-cursor="THE MASTERPIECE"
        >
          <img
            src="/images/couture_crimson_bridal.jpg"
            alt="The Signature Aparajita Bridal Couture Garment"
            className="w-full h-full object-cover object-top transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-charcoal-900/30 pointer-events-none" />

          {/* Interactive Garment Hotspots */}
          {SIGNATURE_HOTSPOTS.map((spot) => (
            <div
              key={spot.id}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
            >
              <button
                onClick={() => setSelectedHotspot(spot)}
                className="group relative flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-charcoal-900/85 border border-gold text-gold hover:bg-gold hover:text-charcoal-900 transition-all duration-300"
                aria-label={spot.title}
                data-cursor="INSPECT"
              >
                {/* Pulsing radar ring */}
                <span className="absolute inset-0 rounded-full bg-gold/30 animate-ping opacity-75 pointer-events-none" />
                <span className="text-xs sm:text-[10px] font-mono font-medium">+</span>
              </button>
            </div>
          ))}

          {/* Selected Hotspot Provenance Drawer */}
          {selectedHotspot && (
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-40 bg-charcoal-900/95 backdrop-blur-xl border border-gold/40 p-4 sm:p-5 rounded-sm shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[8px] uppercase tracking-[0.3em] text-gold font-sans">
                    Craft Detail · {selectedHotspot.technique}
                  </span>
                  <h4 className="font-editorial text-base sm:text-lg text-ivory tracking-wider mt-0.5 sm:mt-1">
                    {selectedHotspot.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="p-1 text-ivory/60 hover:text-gold transition-colors"
                  aria-label="Close detail"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="font-serif text-xs text-ivory/80 mt-1.5 sm:mt-2 leading-relaxed">
                {selectedHotspot.description}
              </p>
            </div>
          )}
        </div>

        {/* Mobile Editorial Header Pill */}
        <div className="absolute top-6 left-6 right-6 z-20 text-center sm:hidden">
          <span className="text-[9px] uppercase tracking-[0.35em] text-gold font-sans">
            The Signature Look · Tap + To Inspect
          </span>
        </div>

        {/* Floating Minimal Editorial Statements (Desktop / Tablet) */}
        <div className="absolute left-8 lg:left-16 bottom-12 lg:bottom-24 z-20 max-w-xs hidden sm:block text-left">
          <div className="flex items-center space-x-2 text-[9px] uppercase tracking-[0.4em] text-gold font-sans mb-2">
            <span className="w-6 h-[1px] bg-gold" />
            <span>The Signature</span>
          </div>
          <h3 className="font-serif italic text-2xl lg:text-3xl text-ivory leading-snug">
            Where tradition becomes contemporary.
          </h3>
          <p className="text-[11px] tracking-wider text-ivory/60 font-sans mt-3">
            Click the <strong className="text-gold">+</strong> markers to inspect micro-embroidery provenance.
          </p>
        </div>

        <div className="absolute right-8 lg:right-16 top-24 z-20 max-w-[240px] hidden md:block text-right">
          <span className="text-[9px] uppercase tracking-[0.35em] text-gold/80 font-sans">
            Curatorial Note
          </span>
          <p className="font-serif italic text-sm text-ivory/70 mt-2">
            "Designed to be worn with effortless grace, defying the heavy stiffness of conventional bridal wear."
          </p>
        </div>
      </div>
    </section>
  );
};
