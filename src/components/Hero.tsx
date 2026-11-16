import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MainCategory } from '../types/store';

interface HeroProps {
  onShopNow: (category?: MainCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section id="hero" className="relative w-full bg-cream-50 overflow-hidden py-10 sm:py-16 md:py-20 border-b border-warm-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text Column (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Subtle Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blush-100/80 border border-blush-200 text-blush-600 text-xs font-sans font-medium">
              <Sparkles size={14} />
              <span>New Season Collection 2026</span>
            </div>

            {/* Short Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-warm-900 leading-[1.15] font-normal tracking-tight">
              Style for Every Occasion, <br className="hidden sm:inline" />
              <span className="italic font-light text-warm-800">Comfort for Every Home</span>
            </h1>

            {/* Small Supporting Text */}
            <p className="font-sans text-base sm:text-lg text-warm-600 max-w-xl leading-relaxed">
              Discover curated women’s ethnic & contemporary fashion, playful and gentle kids wear, and premium home textiles tailored for modern living.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={() => onShopNow('all')}
                className="px-8 py-3.5 rounded-xl bg-warm-900 text-cream-50 hover:bg-warm-800 font-sans text-sm font-medium tracking-wide shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>Shop Now</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onShopNow('women')}
                className="px-7 py-3.5 rounded-xl bg-blush-100 text-warm-800 hover:bg-blush-200/80 border border-blush-200 font-sans text-sm font-medium tracking-wide transition-all duration-200 text-center"
              >
                Explore Women
              </button>

              <button
                onClick={() => onShopNow('home')}
                className="px-7 py-3.5 rounded-xl bg-white text-warm-700 hover:bg-cream-100 border border-warm-200 font-sans text-sm font-medium tracking-wide transition-all duration-200 text-center"
              >
                Home & Living
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-warm-200/70 text-left">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-warm-900 font-sans block">Pure Fabrics</span>
                <span className="text-[11px] text-warm-500 font-sans block">100% Cotton & Silks</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-warm-900 font-sans block">Free Shipping</span>
                <span className="text-[11px] text-warm-500 font-sans block">On orders above ₹1,999</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-warm-900 font-sans block">Direct Atelier</span>
                <span className="text-[11px] text-warm-500 font-sans block">Studio in Ludhiana</span>
              </div>
            </div>
          </div>

          {/* Right Image Composition (5 cols on desktop) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Background soft decorative shape */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blush-100 via-beige-100 to-cream-200 rounded-3xl -rotate-1 transform -z-10" />

              {/* Main Lifestyle Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-warm-200/80 bg-warm-100 aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                  alt="Aparajita Fashion & Lifestyle Collection"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Floating Card Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-warm-200/60 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-warm-500 font-sans font-semibold block">
                      Curated For You
                    </span>
                    <span className="font-serif text-sm font-semibold text-warm-900 block">
                      Festive Suits & Linen Bedding
                    </span>
                  </div>
                  <span className="text-xs font-sans font-bold text-blush-600 px-2.5 py-1 bg-blush-50 rounded-lg border border-blush-200">
                    From ₹499
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
