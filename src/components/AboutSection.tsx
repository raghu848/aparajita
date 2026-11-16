import React from 'react';
import { Sparkles, Shield, Heart, Feather } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="w-full py-16 sm:py-20 bg-cream-100/50 border-b border-warm-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Visual Gallery (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-md aspect-[4/5] bg-warm-100 border border-warm-200">
                <img
                  src="/images/couture_handloom_loom.jpg"
                  alt="Aparajita Atelier Craftsmanship"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = '/images/couture_saree_royal.jpg';
                    }
                  }}
                />
              </div>

              {/* Float Experience Badge */}
              <div className="absolute -bottom-5 -right-3 sm:right-4 bg-white p-4 rounded-2xl shadow-lg border border-warm-200/80 max-w-[200px] text-left">
                <span className="text-[10px] uppercase tracking-wider text-warm-500 font-sans font-semibold block">
                  Studio Provenance
                </span>
                <span className="font-serif text-lg font-bold text-warm-900 block">
                  Ludhiana, Punjab
                </span>
                <span className="text-xs text-warm-600 font-sans block pt-0.5">
                  Handcrafted with care by master karigars.
                </span>
              </div>
            </div>
          </div>

          {/* Right Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blush-100/70 border border-blush-200 text-blush-600 text-xs font-sans font-medium">
              <Sparkles size={13} />
              <span>About Atelier Aparajita</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-warm-900 tracking-tight font-normal leading-tight">
              Honoring Heritage Crafts, <br />
              Tailoring Everyday Comfort.
            </h2>

            <p className="font-sans text-base text-warm-600 leading-relaxed">
              At <strong>{STORE_INFO.name}</strong>, we believe elegance should be effortless and premium comfort should be accessible. Rooted in our Ludhiana atelier, our creations bring together the soulful heritage of Indian textiles with modern, wearable cuts.
            </p>

            <p className="font-sans text-sm text-warm-600 leading-relaxed">
              Whether you are selecting a hand-embroidered Anarkali for a family wedding, dressing your little ones in gentle hypoallergenic cottons, or resting in breathable 400 TC sateen sheets, each piece is crafted with obsessive attention to fabric purity and durability.
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-warm-200/80">
              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-warm-200 flex items-center justify-center text-blush-600 shrink-0 shadow-2xs">
                  <Feather size={17} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-warm-900">100% Purity</h4>
                  <p className="text-xs text-warm-500 font-sans">Combed cotton, linen & silks</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-warm-200 flex items-center justify-center text-blush-600 shrink-0 shadow-2xs">
                  <Heart size={17} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-warm-900">Skin-Friendly</h4>
                  <p className="text-xs text-warm-500 font-sans">Azo-free non-toxic dyes</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-warm-200 flex items-center justify-center text-blush-600 shrink-0 shadow-2xs">
                  <Shield size={17} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-warm-900">Direct Atelier</h4>
                  <p className="text-xs text-warm-500 font-sans">Fair pricing without middlemen</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-warm-200 flex items-center justify-center text-blush-600 shrink-0 shadow-2xs">
                  <Sparkles size={17} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-warm-900">Timeless Cut</h4>
                  <p className="text-xs text-warm-500 font-sans">Designed to be worn forever</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
