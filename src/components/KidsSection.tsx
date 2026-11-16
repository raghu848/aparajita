import React from 'react';
import { ArrowRight, HeartHandshake } from 'lucide-react';
import { KIDS_CATEGORIES } from '../data/storeData';
import { SubCategory } from '../types/store';

interface KidsSectionProps {
  onSelectCategory: (subCategory: SubCategory) => void;
}

export const KidsSection: React.FC<KidsSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="kids-section" className="w-full py-16 sm:py-20 bg-white border-b border-warm-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cream-200/80 border border-warm-300 text-warm-700 text-xs font-sans font-medium">
            <HeartHandshake size={13} className="text-blush-500" />
            <span>Pure & Playful Childhood</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-warm-900 tracking-tight font-normal">
            Kids Wear & Gentle Home Comfort
          </h2>
          <p className="font-sans text-sm sm:text-base text-warm-600 leading-relaxed">
            Hypoallergenic 100% combed cottons, itch-free cardigans, cloud-soft bath wraps, and cozy whimsical bedsheets.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {KIDS_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-cream-50 border border-warm-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-warm-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = '/images/kids_dress_cotton.jpg';
                    }
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-warm-900/65 via-warm-900/10 to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-lg text-[11px] font-sans font-medium text-warm-800 shadow-xs">
                  {cat.itemCount} Designs
                </div>

                {/* Bottom Header on Image */}
                <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                  <span className="text-[10px] uppercase tracking-wider text-blush-200 font-sans block">
                    {cat.tagline}
                  </span>
                  <h3 className="font-serif text-xl font-medium tracking-wide">
                    {cat.title}
                  </h3>
                </div>
              </div>

              {/* Text Description & CTA */}
              <div className="p-4 flex flex-col justify-between flex-grow space-y-3 text-left">
                <p className="text-xs text-warm-600 font-sans leading-relaxed line-clamp-2">
                  {cat.description}
                </p>

                <div className="pt-2 border-t border-warm-200/60 flex items-center justify-between">
                  <span className="text-xs font-sans font-semibold text-warm-900 group-hover:text-blush-600 transition-colors">
                    Explore Collection
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-warm-700 group-hover:text-blush-600 group-hover:translate-x-1 transition-all shadow-2xs">
                    <ArrowRight size={13} />
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
