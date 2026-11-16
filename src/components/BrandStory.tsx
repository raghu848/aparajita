import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BrandStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const storyBlockRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const h1 = headline1Ref.current;
    const h2 = headline2Ref.current;
    const story = storyBlockRef.current;
    const bgImage = bgImageRef.current;

    if (!container || !h1 || !h2 || !story || !bgImage) return;

    const ctx = gsap.context(() => {
      // Parallax movement for background loom image
      gsap.to(bgImage, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Line 1 reveal with subtle horizontal glide
      gsap.fromTo(
        h1,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: h1,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 0.8,
          },
        }
      );

      // Line 2 reveal with opposite glide
      gsap.fromTo(
        h2,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: h2,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 0.8,
          },
        }
      );

      // Story paragraphs fade in smoothly
      gsap.fromTo(
        story,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: story,
            start: 'top 75%',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full py-20 sm:py-32 md:py-48 bg-charcoal-noir text-ivory overflow-hidden select-none"
    >
      {/* Faint Background Loom / Craft Image gliding in parallax */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-10 pointer-events-none overflow-hidden">
        <img
          ref={bgImageRef}
          src="/images/couture_handloom_loom.jpg"
          alt="Atelier Aparajita Loom & Handcraft"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-noir via-transparent to-charcoal-noir" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 md:px-12 text-center flex flex-col items-center">
        {/* Editorial Eyebrow */}
        <span className="text-[9px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.45em] text-gold font-sans mb-5 sm:mb-8">
          The Atelier Philosophy
        </span>

        {/* Large High-Contrast Serif Headline Revealing Line by Line */}
        <div className="overflow-hidden space-y-1 sm:space-y-2 mb-6 sm:mb-10 w-full px-2">
          <h2
            ref={headline1Ref}
            className="font-editorial text-xl sm:text-4xl md:text-6xl lg:text-7xl tracking-[0.08em] sm:tracking-[0.16em] text-ivory font-light uppercase leading-tight will-change-transform break-words"
          >
            ROOTED IN TRADITION.
          </h2>
          <h2
            ref={headline2Ref}
            className="font-editorial text-xl sm:text-4xl md:text-6xl lg:text-7xl tracking-[0.08em] sm:tracking-[0.16em] text-gold-shimmer font-light uppercase leading-tight will-change-transform break-words"
          >
            DESIGNED FOR NOW.
          </h2>
        </div>

        {/* Refined Brand Story Prose */}
        <div
          ref={storyBlockRef}
          className="max-w-2xl mx-auto space-y-4 sm:space-y-6 text-ivory/80 font-serif text-base sm:text-lg md:text-xl leading-relaxed"
        >
          <p className="italic font-light">
            Founded on the conviction that Indian couture is not merely celebratory attire, but living architectural sculpture. We resurrect endangered needlecrafts born in 16th-century royal courts and infuse them with modern fluidity.
          </p>
          <p className="text-sm md:text-base text-ivory/65 font-sans tracking-wide leading-loose">
            From the ghats of Varanasi where pure silver threads are reeled on traditional pit looms, to our Ludhiana atelier where master karigars spend up to 4,800 hours embroidering a single silhouette — each piece is created slowly, without haste, meant to be inherited across generations.
          </p>

          <div className="pt-8 flex flex-col items-center space-y-3">
            <div className="w-12 h-[1px] bg-gold/50" />
            <span className="font-editorial text-xs tracking-[0.3em] uppercase text-gold">
              Atelier Aparajita · Ludhiana, Punjab
            </span>
            <span className="text-[10px] tracking-widest text-ivory/40 uppercase font-sans">
              Heirloom Trousseau · Bespoke Commission · Private Consultations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
