import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { WOMEN_CATEGORIES } from '../data/storeData';
import { SubCategory } from '../types/store';

interface WomenSectionProps {
  onSelectCategory: (subCategory: SubCategory) => void;
}

export const WomenSection: React.FC<WomenSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="women-section" className="w-full py-16 sm:py-20 bg-cream-100/60 border-b border-warm-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blush-100/70 border border-blush-200 text-blush-600 text-xs font-sans font-medium">
            <Sparkles size={13} />
            <span>Women’s Atelier & Daily Wear</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-warm-900 tracking-tight font-normal">
            Graceful Silhouettes for Every Moment
          </h2>
          <p className="font-sans text-sm sm:text-base text-warm-600 leading-relaxed">
            From breezy modern western coordinates to handcrafted festive suits and timeless Anarkali sets.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WOMEN_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-warm-200/70 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-warm-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-warm-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />

                {/* Item Count & Starting Price Badges */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-sans font-medium text-warm-800 shadow-xs">
                  {cat.itemCount} Designs
                </div>
                <div className="absolute top-3 right-3 bg-blush-50/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-sans font-bold text-blush-700 shadow-xs border border-blush-200">
                  From ₹{cat.priceStarting.toLocaleString('en-IN')}
                </div>

                {/* Overlaid Bottom Title on Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-blush-200 font-sans block">
                    {cat.tagline}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-wide">
                    {cat.title}
                  </h3>
                </div>
              </div>

              {/* Card Details Body */}
              <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                <p className="text-xs sm:text-sm text-warm-600 font-sans leading-relaxed">
                  {cat.description}
                </p>

                {/* Explore Button */}
                <div className="pt-2 border-t border-warm-100 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-sans font-semibold text-warm-900 group-hover:text-blush-600 transition-colors">
                    Explore Collection
                  </span>
                  <span className="w-8 h-8 rounded-full bg-cream-100 group-hover:bg-blush-100 flex items-center justify-center text-warm-700 group-hover:text-blush-700 group-hover:translate-x-1 transition-all">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
