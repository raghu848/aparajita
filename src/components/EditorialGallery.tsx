import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EditorialGalleryProps {
  onOpenAppointment: () => void;
}

export const EditorialGallery: React.FC<EditorialGalleryProps> = ({ onOpenAppointment }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const floatingFrameRef = useRef<HTMLDivElement>(null);
  const overlapFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    const floating = floatingFrameRef.current;
    const overlap = overlapFrameRef.current;

    if (!container || !leftCol || !rightCol || !floating || !overlap) return;

    const ctx = gsap.context(() => {
      // Asymmetric parallax speeds
      gsap.to(leftCol, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to(rightCol, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      });

      // Floating frame rotation & glide
      gsap.fromTo(
        floating,
        { rotate: -3, y: 60 },
        {
          rotate: 1,
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: floating,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Overlapping frame mask reveal
      gsap.fromTo(
        overlap,
        { scale: 0.92, opacity: 0.8 },
        {
          scale: 1.04,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: overlap,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.8,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lookbook"
      ref={containerRef}
      className="relative w-full py-16 sm:py-32 bg-charcoal text-ivory overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        {/* Magazine Masthead Header */}
        <div className="border-b border-ivory/15 pb-6 sm:pb-8 mb-10 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <div className="flex items-center space-x-2 sm:space-x-3 text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-gold font-sans">
              <span>Editorial Journal</span>
              <span>·</span>
              <span>Issue IV</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-6xl text-ivory tracking-wide mt-1 sm:mt-2">
              THE NOCTURNE FOLIO
            </h2>
          </div>
          <div className="mt-3 md:mt-0 text-left md:text-right">
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-ivory/50 font-sans block">
              Curated by Atelier Aparajita
            </span>
            <span className="font-serif italic text-xs sm:text-sm text-gold">
              Autumn · Winter Couture MMXXV
            </span>
          </div>
        </div>

        {/* Asymmetric Art-Directed Magazine Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start relative">
          {/* Left Column: Dominant Portrait + Editorial Narrative */}
          <div ref={leftColRef} className="lg:col-span-7 space-y-12 will-change-transform">
            {/* Primary Dominant Image with Framing */}
            <div className="relative rounded-sm overflow-hidden border border-gold/25 group bg-charcoal-800" data-cursor="EDITORIAL">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src="/images/couture_saree_royal.jpg"
                  alt="Aparajita Editorial Look 01"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-transparent to-charcoal-900/20" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-sans">
                    Plate 01 // Awadh Royalty
                  </span>
                  <h4 className="font-editorial text-2xl text-ivory tracking-wide">
                    The Basra Collared Choli
                  </h4>
                </div>
                <span className="text-xs font-mono text-ivory/50">LOOK 02-B</span>
              </div>
            </div>

            {/* Editorial Paragraph with Drop Cap & Pull Quote */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="border-l-2 border-gold/40 pl-6 space-y-3">
                <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-sans">
                  The Silhouette
                </span>
                <p className="font-serif italic text-lg text-ivory/90 leading-relaxed">
                  "We stripped away the rigid stiffness of 19th-century court dress, preserving its opulence while honoring the natural freedom of the female form."
                </p>
              </div>

              <div className="space-y-3 text-xs text-ivory/70 leading-relaxed font-sans">
                <p>
                  Each border is engineered using hand-drawn paper stencils, ensuring the repeat of floral vines flows naturally over the wearer's curves without any distortion or break in embroidery.
                </p>
                <div className="pt-2 flex items-center space-x-3 text-gold">
                  <span className="text-[10px] tracking-widest uppercase">Pure Gold Zari</span>
                  <span className="w-4 h-[1px] bg-gold/50" />
                  <span className="text-[10px] tracking-widest uppercase">32 Kalis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Asymmetric Overlapping Elements */}
          <div ref={rightColRef} className="lg:col-span-5 space-y-12 will-change-transform lg:pt-16">
            {/* Floating Card with Angle Rotation */}
            <div
              ref={floatingFrameRef}
              className="relative rounded-sm overflow-hidden border border-gold/30 shadow-2xl group bg-charcoal-800 will-change-transform"
              data-cursor="INSPECT"
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src="/images/couture_banarasi_gold.jpg"
                  alt="Aparajita Editorial Look 02"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 bg-charcoal-900 border-t border-gold/15">
                <span className="text-[8px] uppercase tracking-[0.3em] text-gold font-sans">
                  Plate 02 // Heritage Saree
                </span>
                <h5 className="font-editorial text-lg text-ivory tracking-wide mt-1">
                  Six Yards of Pure Varanasi Tissue
                </h5>
                <p className="font-serif text-xs text-ivory/60 mt-1 italic">
                  Woven on a 90-year-old wooden jacquard loom in Banaras.
                </p>
              </div>
            </div>

            {/* Overlapping Secondary Macro Frame */}
            <div
              ref={overlapFrameRef}
              className="relative -mt-10 lg:-ml-12 w-[90%] md:w-[85%] rounded-sm overflow-hidden border border-gold/40 shadow-2xl bg-charcoal-900 p-3"
            >
              <div className="aspect-[16/10] w-full overflow-hidden rounded-sm">
                <img
                  src="/images/couture_scallop_dupatta.jpg"
                  alt="Macro Brocade Weave"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-3 px-2 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-gold font-sans">
                <span>Detail: Metallic Katan Weft</span>
                <span className="text-ivory/50">98.5% Silver</span>
              </div>
            </div>

            {/* CTA Box */}
            <div className="p-8 border border-ivory/10 rounded-sm bg-charcoal-900/60 backdrop-blur-sm">
              <span className="text-[9px] uppercase tracking-[0.35em] text-gold font-sans">
                Atelier Lookbook
              </span>
              <h5 className="font-editorial text-xl text-ivory mt-2">
                Order The Printed Hardcover Folio
              </h5>
              <p className="font-serif italic text-xs text-ivory/70 mt-2 leading-relaxed">
                A clothbound 240-page monograph documenting the karigars, silk growers, and design sketches of the Nocturne Suite.
              </p>
              <button
                onClick={onOpenAppointment}
                className="mt-4 flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-gold hover:text-gold-light transition-colors"
              >
                <span>Request Archival Copy</span>
                <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
