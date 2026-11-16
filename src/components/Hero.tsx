import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_IMAGE } from '../data/coutureData';
import { ChevronDown } from 'lucide-react';
import { scrollToSection } from '../utils/lenis';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance reveal
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        imageRef.current,
        { scale: 1.15, filter: 'brightness(0.6)' },
        { scale: 1.05, filter: 'brightness(0.9)', duration: 2.2, ease: 'power2.out' }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30, letterSpacing: '0.6em' },
          { opacity: 0.9, y: 0, duration: 1.4, letterSpacing: '0.4em' },
          '-=1.4'
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 50, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.6 },
          '-=1.2'
        )
        .fromTo(
          statementRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2 },
          '-=0.9'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          '-=0.5'
        );

      // Scroll-driven storytelling transition
      if (containerRef.current && imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.25,
          yPercent: 12,
          filter: 'brightness(0.75)',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        // Typography moves independently upwards with varying parallax velocities
        if (titleRef.current) {
          gsap.to(titleRef.current, {
            y: -180,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '60% top',
              scrub: 0.8,
            },
          });
        }

        if (statementRef.current) {
          gsap.to(statementRef.current, {
            y: -120,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '50% top',
              scrub: 0.6,
            },
          });
        }

        if (subtitleRef.current) {
          gsap.to(subtitleRef.current, {
            y: -80,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '40% top',
              scrub: 0.5,
            },
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[580px] overflow-hidden bg-charcoal-noir flex items-center justify-center select-none"
    >
      {/* Background Image Layer with Chiaroscuro Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          ref={imageRef}
          src={HERO_IMAGE}
          alt="Aparajita Indian Couture Editorial Campaign"
          className="w-full h-full object-cover object-center will-change-transform"
        />
        {/* Editorial Vignette & Subtle Film Grading */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/30 to-charcoal-900/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-charcoal-900/20 to-charcoal-noir/70 pointer-events-none" />
      </div>

      {/* Hero Typography Composition */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 text-center flex flex-col items-center justify-center">
        {/* Edition Subtitle */}
        <div
          ref={subtitleRef}
          className="text-[9px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.45em] text-gold font-sans mb-3 sm:mb-6"
        >
          Haute Couture · Nocturne Suite MMXXV
        </div>

        {/* Master Brand Wordmark */}
        <div ref={titleRef} className="overflow-hidden mb-3 sm:mb-6 max-w-full">
          <h1 className="font-editorial text-3xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.12em] sm:tracking-[0.22em] text-ivory font-light uppercase leading-none drop-shadow-2xl">
            APARAJITA
          </h1>
        </div>

        {/* The Art of Indian Couture Statement */}
        <div ref={statementRef} className="flex flex-col items-center space-y-2 sm:space-y-3 max-w-xl">
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-ivory/90 tracking-wide font-light">
            The Art of Indian Couture
          </p>
          <div className="w-10 sm:w-12 h-[1px] bg-gold/50 my-1.5 sm:my-2" />
          <p className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-ivory/70 font-sans">
            Crafted slowly. Worn forever.
          </p>
        </div>
      </div>

      {/* Floating Campaign Attributes */}
      <div className="absolute bottom-10 left-8 md:left-14 hidden md:flex flex-col space-y-1 text-left z-10">
        <span className="text-[9px] uppercase tracking-[0.3em] text-gold/80 font-sans">Atelier Coordinates</span>
        <span className="text-[11px] tracking-wider text-ivory/60 font-serif italic">30°54'00" N · 75°51'26" E — Ludhiana, Punjab</span>
      </div>

      <div className="absolute bottom-10 right-8 md:right-14 hidden md:flex flex-col space-y-1 text-right z-10">
        <span className="text-[9px] uppercase tracking-[0.3em] text-gold/80 font-sans">Edition No.</span>
        <span className="text-[11px] tracking-wider text-ivory/60 font-serif italic">Curated Lookbook 01 / 04</span>
      </div>

      {/* Cinematic Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer group"
        onClick={() => scrollToSection('#collection')}
        data-cursor="SCROLL"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-ivory/60 group-hover:text-gold transition-colors duration-300 font-sans mb-2">
          Explore Story
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gold/60 to-transparent relative overflow-hidden">
          <div className="w-full h-1/2 bg-gold animate-bounce" />
        </div>
      </div>
    </section>
  );
};
