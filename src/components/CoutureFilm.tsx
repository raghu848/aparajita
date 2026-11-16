import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, Film } from 'lucide-react';
import { atelierAmbiance } from '../utils/audioAmbiance';

gsap.registerPlugin(ScrollTrigger);

export const CoutureFilm: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const filmFrameRef = useRef<HTMLImageElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(38);

  useEffect(() => {
    const container = containerRef.current;
    const filmFrame = filmFrameRef.current;
    if (!container || !filmFrame) return;

    const ctx = gsap.context(() => {
      // Cinematic slow zoom & subtle panning simulating slow camera glide
      gsap.fromTo(
        filmFrame,
        { scale: 1.05, yPercent: -3 },
        {
          scale: 1.2,
          yPercent: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  // Simulated film time scrubber
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && !atelierAmbiance.getIsPlaying()) {
      atelierAmbiance.toggle();
    }
  };

  return (
    <section
      id="couture-film"
      ref={containerRef}
      className="relative w-full h-screen bg-charcoal-noir text-ivory overflow-hidden flex items-center justify-center select-none"
    >
      {/* Cinematic Letterbox Widescreen Bars */}
      <div className="absolute top-0 left-0 w-full h-10 md:h-16 bg-charcoal-noir z-30 flex items-center justify-between px-4 sm:px-8 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-ivory/40 font-mono border-b border-ivory/5">
        <span className="hidden sm:inline">CAM 01 · 35MM ANAMORPHIC T1.5</span>
        <span className="text-gold">RUNWAY SEQUENCE // NOCTURNE</span>
        <span>24.00 FPS</span>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-10 md:h-16 bg-charcoal-noir z-30 flex items-center justify-between px-4 sm:px-8 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-ivory/40 font-mono border-t border-ivory/5">
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlayback}
            className="flex items-center space-x-1.5 text-gold hover:text-gold-light transition-colors"
            data-cursor="PLAY/PAUSE"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? 'PAUSE FILM' : 'RESUME'}</span>
          </button>
        </div>

        {/* Film Progress Bar */}
        <div className="hidden sm:flex items-center space-x-3 w-48">
          <div className="w-full h-[1px] bg-ivory/20 relative">
            <div
              className="h-[2px] bg-gold absolute -top-[0.5px] left-0 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[9px] text-ivory/60 font-mono">
            {Math.floor(progress)}%
          </span>
        </div>

        <span className="text-ivory/50">ATELIER APARAJITA · LUDHIANA</span>
      </div>

      {/* Main Cinematic Film Visual Layer */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
        {/* Background Film Frame - Positioned absolute to stay behind typography */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <img
            ref={filmFrameRef}
            src="/images/couture_runway_lehenga.jpg"
            alt="Aparajita Runway Film Moment"
            className="w-full h-full object-cover object-center will-change-transform brightness-90 contrast-105"
          />

          {/* Film Grain & Editorial Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-noir via-transparent to-charcoal-noir/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(10,9,9,0.85)_100%)]" />

          {/* Subtle Film Grain Noise SVG overlay */}
          <div
            className="absolute inset-0 opacity-15 mix-blend-screen"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.7'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Minimal Editorial Overlay Text */}
        <div className="relative z-20 text-center px-4 max-w-[92vw] sm:max-w-2xl md:max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-[9px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.45em] text-gold font-sans mb-3 sm:mb-4 flex items-center justify-center space-x-2">
            <Film size={12} className="text-gold flex-shrink-0" />
            <span className="truncate">Cinematic Runway Presentation</span>
          </span>

          <h3 className="font-editorial text-2xl sm:text-4xl md:text-6xl lg:text-8xl tracking-[0.08em] sm:tracking-[0.16em] text-ivory uppercase font-light leading-tight drop-shadow-2xl text-center">
            MADE BY HAND.<br />
            <span className="text-gold-shimmer italic font-serif">MEANT TO BE REMEMBERED.</span>
          </h3>

          <p className="mt-3 sm:mt-6 text-[10px] sm:text-xs md:text-sm tracking-[0.12em] sm:tracking-[0.25em] uppercase text-ivory/70 font-sans max-w-xs sm:max-w-lg text-center leading-relaxed">
            A silent tribute to the cadence of the runway and the quiet power of Indian textiles.
          </p>
        </div>
      </div>
    </section>
  );
};
