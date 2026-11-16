import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CRAFT_DETAILS } from '../data/coutureData';
import { Award, Compass, Feather, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CraftSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const macroImageRef = useRef<HTMLImageElement>(null);
  const fullModelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [activeCraftTab, setActiveCraftTab] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    const macroImage = macroImageRef.current;
    const fullModel = fullModelRef.current;
    const headline = headlineRef.current;

    if (!container || !pin || !macroImage || !fullModel || !headline) return;

    const ctx = gsap.context(() => {
      // Pinned zoom transition: Macro -> Zoom out -> Reveal Garment & Model
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=200%',
          pin: pin,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Phase 1: Macro starts deeply zoomed in (3.2x) and slowly unzooms
      tl.fromTo(
        macroImage,
        { scale: 3.2, filter: 'contrast(1.15) brightness(0.95)' },
        { scale: 1.0, filter: 'contrast(1.0) brightness(0.9)', duration: 2, ease: 'power2.inOut' }
      )
        // Phase 2: Fade in full model garment revelation overlay
        .fromTo(
          fullModel,
          { opacity: 0, scale: 1.15 },
          { opacity: 1, scale: 1.0, duration: 2, ease: 'power2.out' },
          '-=0.8'
        )
        // Phase 3: Reveal statement
        .fromTo(
          headline,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
          '-=1.2'
        );
    }, container);

    return () => ctx.revert();
  }, []);

  const craftMetrics = [
    { label: '4,800 Hours', detail: 'Dedicated hand needlework by master karigars', icon: Sparkles },
    { label: '98.5% Silver Zari', detail: 'Real silver-gilt wire beaten into fine purl thread', icon: Award },
    { label: 'Pure Mulberry Silk', detail: 'Organically reeled across Varanasi weaving districts', icon: Feather },
    { label: '32 Artisans', detail: 'Generational masters from Bengal & Awadh ateliers', icon: Compass },
  ];

  return (
    <section
      id="craft"
      ref={containerRef}
      className="relative w-full bg-charcoal-noir text-ivory overflow-hidden"
    >
      {/* Pinned Zoom-out Canvas */}
      <div
        ref={pinRef}
        className="w-full h-screen relative flex items-center justify-center overflow-hidden"
      >
        {/* Layer 1: Macro Zari / Embroidery Texture that zooms out */}
        <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
          <img
            ref={macroImageRef}
            src="/images/couture_zardozi_macro.jpg"
            alt="Macro Zardozi Embroidery Craftsmanship"
            className="w-full h-full object-cover object-center will-change-transform"
          />
          <div className="absolute inset-0 bg-charcoal-900/40 pointer-events-none" />
        </div>

        {/* Layer 2: Crossfade to Full Model Couture Reveal */}
        <div
          ref={fullModelRef}
          className="absolute inset-0 w-full h-full overflow-hidden opacity-0 will-change-transform pointer-events-none"
        >
          <img
            src="/images/couture_crimson_bridal.jpg"
            alt="Full Couture Garment Revelation"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-noir via-charcoal-900/60 to-charcoal-noir/40" />
        </div>

        {/* Central Editorial Narrative Overlay */}
        <div
          ref={headlineRef}
          className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center flex flex-col items-center pointer-events-auto"
        >
          <span className="text-[9px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.45em] text-gold font-sans mb-2 sm:mb-3">
            Atelier Savoir-Faire
          </span>
          <h2 className="font-editorial text-2xl sm:text-5xl md:text-7xl tracking-[0.08em] sm:tracking-[0.18em] text-ivory uppercase font-light leading-tight drop-shadow-2xl">
            FROM THREAD<br />TO COUTURE
          </h2>
          <div className="w-12 sm:w-16 h-[1px] bg-gold/60 my-3 sm:my-5" />
          <p className="font-serif italic text-base sm:text-2xl text-ivory/85 max-w-2xl font-light">
            Every motif begins as a hand-drawn sketch on parchment, translated through pure silver threads into wearable poetry.
          </p>

          {/* Interactive Craft Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mt-6 sm:mt-8 w-full max-w-3xl pt-4 sm:pt-6 border-t border-ivory/15 backdrop-blur-sm bg-charcoal-900/40 p-3 sm:p-4 rounded-sm">
            {craftMetrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center p-1 sm:p-2">
                  <Icon size={14} className="text-gold mb-1 sm:mb-2" />
                  <span className="font-serif text-base sm:text-xl text-ivory font-medium tracking-wide">
                    {metric.label}
                  </span>
                  <span className="text-[8px] sm:text-[9px] tracking-wider text-ivory/60 uppercase font-sans mt-0.5 sm:mt-1">
                    {metric.detail}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Corner Coordinates */}
        <div className="absolute bottom-6 left-8 text-[9px] tracking-[0.3em] uppercase text-ivory/40 font-sans hidden sm:block">
          Precision Needlework · 0.2mm Zari Wire
        </div>
        <div className="absolute bottom-6 right-8 text-[9px] tracking-[0.3em] uppercase text-ivory/40 font-sans hidden sm:block">
          Macro Texture Zoom Reveal
        </div>
      </div>

      {/* Expanded Atelier Craft Details Gallery */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 relative z-10 border-t border-ivory/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-sans">
              Material Provenance
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-ivory tracking-wide mt-2">
              THE FOUR PILLARS OF ATELIER APARAJITA
            </h3>
          </div>
          <p className="text-[11px] tracking-widest uppercase text-ivory/60 font-sans mt-4 md:mt-0 max-w-xs">
            Preserving vanishing royal ateliers across the Indian subcontinent.
          </p>
        </div>

        {/* Tabbed Interactive Technique Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Technique Selector List */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {CRAFT_DETAILS.map((craft, idx) => (
              <div
                key={craft.id}
                onClick={() => setActiveCraftTab(idx)}
                className={`p-6 rounded-sm border cursor-pointer transition-all duration-500 text-left ${
                  activeCraftTab === idx
                    ? 'bg-charcoal-800/80 border-gold/50 shadow-[0_0_30px_rgba(197,168,128,0.12)]'
                    : 'bg-charcoal-900/40 border-ivory/5 hover:border-ivory/20'
                }`}
                data-cursor="INSPECT"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] tracking-[0.35em] uppercase text-gold font-sans font-medium">
                    {craft.category}
                  </span>
                  <span className="text-xs font-mono text-ivory/30">0{idx + 1}</span>
                </div>
                <h4 className="font-editorial text-xl text-ivory tracking-wide">
                  {craft.title}
                </h4>
                <p className="font-serif italic text-sm text-ivory/70 mt-2 line-clamp-2">
                  {craft.description}
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px] tracking-wider text-ivory/50 font-sans border-t border-ivory/5 pt-2">
                  <span>{craft.provenance}</span>
                  <span className="text-gold/80">{craft.karigarTime}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Dynamic Detail View */}
          <div className="lg:col-span-7 relative h-[360px] sm:h-[440px] md:h-[540px] rounded-sm overflow-hidden border border-gold/20 bg-charcoal-800">
            <img
              src={CRAFT_DETAILS[activeCraftTab].image}
              alt={CRAFT_DETAILS[activeCraftTab].title}
              className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-noir via-transparent to-charcoal-noir/30" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 p-4 sm:p-6 bg-charcoal-900/90 backdrop-blur-md border border-gold/20 rounded-sm">
              <span className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-gold font-sans">
                Authentic Provenance
              </span>
              <h5 className="font-editorial text-lg sm:text-2xl text-ivory tracking-wide mt-1">
                {CRAFT_DETAILS[activeCraftTab].title}
              </h5>
              <p className="font-serif text-xs sm:text-sm text-ivory/80 mt-1.5 sm:mt-2 leading-relaxed">
                {CRAFT_DETAILS[activeCraftTab].description}
              </p>
              <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-3 text-[9px] sm:text-[10px] tracking-wider uppercase font-sans text-gold">
                <span>📍 {CRAFT_DETAILS[activeCraftTab].provenance}</span>
                <span>⏱ {CRAFT_DETAILS[activeCraftTab].karigarTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
