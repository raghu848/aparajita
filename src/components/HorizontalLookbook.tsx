import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HORIZONTAL_LOOKS } from '../data/coutureData';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalLookbookProps {
  onOpenAppointment: () => void;
}

export const HorizontalLookbook: React.FC<HorizontalLookbookProps> = ({ onOpenAppointment }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal scroll width
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Subtle parallax on individual images while scrolling horizontally
      const cards = track.querySelectorAll('.look-card-img');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 1.0 },
          {
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="horizontal-gallery"
      ref={containerRef}
      className="relative w-full bg-charcoal overflow-hidden text-ivory"
    >
      <div className="w-full h-[100dvh] min-h-[580px] flex flex-col justify-between py-5 sm:py-8 md:py-12 overflow-hidden relative">
        {/* Gallery Top Navigation / Header */}
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 md:px-12 flex items-end justify-between border-b border-ivory/10 pb-3 sm:pb-4 flex-shrink-0 z-20">
          <div>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] sm:tracking-[0.4em] text-gold font-sans">
              Editorial Panorama
            </span>
            <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl text-ivory tracking-wide mt-0.5 sm:mt-1">
              THE NOCTURNE SUITE · COMPLETE EDIT
            </h3>
          </div>
          <div className="flex items-center space-x-2 text-[9px] sm:text-[10px] tracking-widest uppercase text-ivory/50 font-sans">
            <span className="hidden sm:inline">Scroll vertically to traverse gallery</span>
            <span className="sm:hidden">Swipe / Scroll</span>
            <ArrowRight size={12} className="text-gold" />
          </div>
        </div>

        {/* Horizontal Track with Asymmetric Art-Directed Frames */}
        <div className="relative flex-1 flex items-center my-auto">
          <div
            ref={trackRef}
            className="flex items-center space-x-6 sm:space-x-12 md:space-x-20 px-5 sm:px-8 md:px-16 w-max will-change-transform py-4 sm:py-6"
          >
            {/* Opening Editorial Intro Block */}
            <div className="w-[220px] sm:w-[280px] md:w-[360px] flex-shrink-0 flex flex-col justify-center space-y-2 sm:space-y-4 pr-4 sm:pr-6">
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-gold font-sans">
                Six Perspectives
              </span>
              <h4 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-ivory font-light leading-snug">
                From broad runway silhouette to microscopic zari coil.
              </h4>
              <p className="text-[11px] sm:text-xs text-ivory/70 leading-relaxed font-sans">
                Each composition challenges the conventional fashion catalog, offering varied proportions and intimate details.
              </p>
            </div>

            {/* Individual Asymmetric Editorial Looks */}
            {HORIZONTAL_LOOKS.map((look, idx) => {
              // Custom varied heights and widths to ensure NO cookie-cutter cards
              const frameStyles = [
                'w-[260px] sm:w-[320px] md:w-[420px] h-[55vh] sm:h-[64vh]', // Look 1: Tall bridal
                'w-[230px] sm:w-[280px] md:w-[350px] h-[48vh] sm:h-[52vh] self-start sm:mt-6', // Look 2: Intimate portrait
                'w-[270px] sm:w-[340px] md:w-[460px] h-[58vh] sm:h-[68vh]', // Look 3: Dramatic runway movement
                'w-[240px] sm:w-[300px] md:w-[380px] h-[50vh] sm:h-[58vh] self-end sm:mb-6', // Look 4: Six-yard classic
                'w-[220px] sm:w-[260px] md:w-[320px] h-[44vh] sm:h-[48vh] self-center', // Look 5: Fabric macro
                'w-[250px] sm:w-[320px] md:w-[400px] h-[54vh] sm:h-[62vh]', // Look 6: Gossamer veil
              ];

              return (
                <div
                  key={look.id}
                  className={`flex-shrink-0 flex flex-col justify-between group cursor-pointer ${
                    frameStyles[idx % frameStyles.length]
                  }`}
                  onClick={onOpenAppointment}
                  data-cursor="DISCOVER"
                >
                  {/* Image Container with Editorial Border & Scrim */}
                  <div className="relative w-full h-[82%] rounded-sm overflow-hidden border border-gold/20 bg-charcoal-800">
                    <img
                      src={look.image}
                      alt={look.title}
                      className="look-card-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-charcoal-900/10" />

                    {/* Number Badge */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[9px] sm:text-[10px] font-mono tracking-widest text-gold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-charcoal-900/80 border border-gold/30">
                      {look.number} / 06
                    </div>

                    {/* Silhouette Tag */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-[9px] sm:text-[10px] tracking-wider uppercase text-ivory/80 font-sans">
                      <span className="truncate pr-2">{look.silhouette}</span>
                      <Sparkles size={11} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                    </div>
                  </div>

                  {/* Editorial Caption Metadata */}
                  <div className="pt-2 sm:pt-3 flex flex-col">
                    <div className="flex items-center justify-between">
                      <h5 className="font-editorial text-base sm:text-lg text-ivory tracking-wide group-hover:text-gold transition-colors duration-300 truncate pr-2">
                        {look.title}
                      </h5>
                      <span className="text-[9px] sm:text-[10px] text-gold/80 font-mono flex-shrink-0">
                        {look.hours}h
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-ivory/60 font-serif italic mt-0.5 truncate">
                      {look.subtitle} · {look.fabric}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Final Horizon Callout */}
            <div className="w-[260px] sm:w-[300px] md:w-[380px] h-[50vh] sm:h-[55vh] flex-shrink-0 flex flex-col justify-center items-center text-center p-6 sm:p-8 border border-gold/30 rounded-sm bg-charcoal-900/50 backdrop-blur-sm">
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] text-gold font-sans mb-2 sm:mb-3">
                Private Commission
              </span>
              <h4 className="font-editorial text-lg sm:text-2xl text-ivory uppercase tracking-wider mb-2 sm:mb-4">
                Curate Your Bespoke Ensemble
              </h4>
              <p className="font-serif italic text-xs text-ivory/70 mb-4 sm:mb-6 leading-relaxed line-clamp-3">
                Consult personally with our creative director and master embroiderers for your heirloom trousseau.
              </p>
              <button
                onClick={onOpenAppointment}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] bg-gold text-charcoal-900 font-medium hover:bg-gold-shimmer transition-colors"
                data-cursor="SALON"
              >
                Inquire With Atelier
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Bottom Status Bar */}
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex items-center justify-between border-t border-ivory/10 pt-4 flex-shrink-0 z-20">
          <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/40 font-sans">
            Atelier Aparajita · Haute Couture Nocturne
          </span>
          <div className="flex items-center space-x-2 text-[9px] tracking-widest text-gold uppercase font-sans">
            <span>Handloom Banarasi · Awadhi Zardozi · Bengal Marodi</span>
          </div>
        </div>
      </div>
    </section>
  );
};
