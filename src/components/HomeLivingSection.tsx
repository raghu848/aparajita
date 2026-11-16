import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SubCategory } from '../types/store';

interface HomeLivingSectionProps {
  onSelectCategory: (subCategory: SubCategory) => void;
}

export const HomeLivingSection: React.FC<HomeLivingSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="home-section" className="w-full py-16 sm:py-24 bg-cream-50 border-b border-warm-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-warm-500 font-sans font-semibold block">
            Sanctuary & Home Textiles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-warm-900 tracking-tight font-normal">
            Everyday Luxury for Your Home
          </h2>
          <p className="font-sans text-sm sm:text-base text-warm-600 leading-relaxed">
            Thoughtfully woven towels and silky smooth bedsheets designed to turn your bedroom and bath into a serene sanctuary.
          </p>
        </div>

        {/* 2 Featured Lifestyle Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 text-left">
          {/* Card 1: Luxury Towels */}
          <div className="group rounded-3xl overflow-hidden bg-white border border-warm-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-warm-100">
              <img
                src="/images/towel_white_folded.jpg"
                alt="Plush Luxury Towels in Modern Bath"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = 'true';
                    target.src = '/images/towel_white_folded.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-900/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-xs font-sans font-semibold text-warm-900 shadow-xs">
                Spa Collection
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-xs uppercase tracking-widest text-blush-200 font-sans block">
                  600 GSM Zero-Twist Cotton
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium">
                  Luxury Bath & Spa Towels
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
              <p className="text-sm text-warm-600 font-sans leading-relaxed">
                Experience cloud-like softness and ultra-fast absorption. Our bath sheets, hand towels, and textured waffle sets are crafted from long-staple Indian cotton that grows softer with every wash.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-warm-700 font-sans border-y border-warm-100 py-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={15} className="text-blush-500 shrink-0" />
                  <span>Zero-twist combed loops</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={15} className="text-blush-500 shrink-0" />
                  <span>Lint-free & quick-drying</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={15} className="text-blush-500 shrink-0" />
                  <span>OEKO-TEX® non-toxic dyes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={15} className="text-blush-500 shrink-0" />
                  <span>Bath, hand & face sets</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] text-warm-500 uppercase tracking-wider block font-sans">
                    Material Standard
                  </span>
                  <span className="text-sm font-semibold text-warm-900 font-sans">
                    100% Combed Indian Cotton
                  </span>
                </div>

                <button
                  onClick={() => onSelectCategory('towels')}
                  className="px-6 py-3 rounded-xl bg-warm-900 text-cream-50 hover:bg-warm-800 text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center space-x-2"
                >
                  <span>Explore Towels</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Premium Bedsheets */}
          <div className="group rounded-3xl overflow-hidden bg-white border border-warm-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-warm-100">
              <img
                src="/images/bedsheet_luxury_linen.jpg"
                alt="Silky Sateen Bedding in Warm Bedroom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = 'true';
                    target.src = '/images/bedsheet_hotel_white.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-900/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-xs font-sans font-semibold text-warm-900 shadow-xs">
                Sleep Haven
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-xs uppercase tracking-widest text-blush-200 font-sans block">
                  300 & 400 Thread Count
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium">
                  Premium Cotton & Linen Bedsheets
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
              <p className="text-sm text-warm-600 font-sans leading-relaxed">
                Indulge in breathable, cooling sateen and effortlessly relaxed French washed linen. Each set includes generous deep-pocket sheets and tailored flange-border pillow covers.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-warm-700 font-sans border-y border-warm-100 py-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={15} className="text-blush-500 shrink-0" />
                  <span>100% Long-staple cotton</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={15} className="text-blush-500 shrink-0" />
                  <span>Deep 12-inch mattress fit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={15} className="text-blush-500 shrink-0" />
                  <span>Silky luminous sateen weave</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={15} className="text-blush-500 shrink-0" />
                  <span>Queen, King & Super King</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] text-warm-500 uppercase tracking-wider block font-sans">
                    Sizing Available
                  </span>
                  <span className="text-sm font-semibold text-warm-900 font-sans">
                    Queen · King · Custom Deep Fit
                  </span>
                </div>

                <button
                  onClick={() => onSelectCategory('bedsheets')}
                  className="px-6 py-3 rounded-xl bg-warm-900 text-cream-50 hover:bg-warm-800 text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center space-x-2"
                >
                  <span>Explore Bedsheets</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
