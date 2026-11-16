import React, { useState } from 'react';
import { ZoomIn, Sparkles, Feather, ShieldCheck } from 'lucide-react';

interface DetailItem {
  id: string;
  name: string;
  category: string;
  technique: string;
  image: string;
  description: string;
  hours: string;
}

const DETAILS: DetailItem[] = [
  {
    id: 'd-1',
    name: 'Sleeve Cuff Zardozi',
    category: 'EMBROIDERY',
    technique: 'Twisted Salma & Bullion Wire',
    image: '/images/couture_zardozi_macro.jpg',
    description: 'Miniature Mughal floral jaal hand-embroidered with micro-seed pearls and pure gold wires.',
    hours: '280 Hours'
  },
  {
    id: 'd-2',
    name: 'Scalloped Dupatta Border',
    category: 'VEILING',
    technique: 'Gotta Patti & Cut-dana Edge',
    image: '/images/couture_scallop_dupatta.jpg',
    description: 'Weightless silk organza edged in undulating scallops finished with antique silver dabka.',
    hours: '190 Hours'
  },
  {
    id: 'd-3',
    name: 'Heirloom Polki & Emeralds',
    category: 'JEWELLERY',
    technique: 'Uncut Jadau & Basra Pearls',
    image: '/images/couture_jewellery_polki.jpg',
    description: 'Antique 22-karat gold collar set with uncut diamond slices and Colombian emerald droplets.',
    hours: 'Master Jeweller'
  },
  {
    id: 'd-4',
    name: 'Handwoven Kadhwa Brocade',
    category: 'TEXTILE',
    technique: 'Real Gold Zari Pit-Loom',
    image: '/images/couture_handloom_loom.jpg',
    description: 'Pure katan mulberry silk warp with hand-interlocked metallic zari motifs on wooden looms.',
    hours: '90 Days Weave'
  },
  {
    id: 'd-5',
    name: 'Corseted Silk Bodice',
    category: 'CONSTRUCTION',
    technique: 'Architectural Internal Boning',
    image: '/images/couture_corset_angrakha.jpg',
    description: 'Ergonomically contoured inner corsetry allowing effortless grace and breathable comfort.',
    hours: '120 Hours'
  },
  {
    id: 'd-6',
    name: 'Antique Zari Tassels',
    category: 'FINISHING',
    technique: 'Hand-knotted Metallic Latkan',
    image: '/images/couture_saree_royal.jpg',
    description: 'Custom handcrafted tassels composed of spun silver threads, Basra seed pearls, and semi-precious beads.',
    hours: '45 Hours'
  }
];

export const DetailsSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<DetailItem | null>(null);

  return (
    <section id="details" className="relative w-full py-28 bg-charcoal-noir text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] sm:tracking-[0.45em] text-gold font-sans mb-2 sm:mb-3 block">
            Atelier Micro-Craft
          </span>
          <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl text-ivory uppercase tracking-wide">
            THE ANATOMY OF PERFECTION
          </h2>
          <div className="w-10 sm:w-12 h-[1px] bg-gold/50 mx-auto my-3 sm:my-4" />
          <p className="font-serif italic text-sm sm:text-base md:text-lg text-ivory/70">
            Tap or hover over any detail plate to inspect the craftsmanship, techniques, and artisan hours.
          </p>
        </div>

        {/* 6-Grid Interactive Floating Detail Plates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {DETAILS.map((item) => {
            const isSelected = activeItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(isSelected ? null : item)}
                onMouseEnter={() => setActiveItem(item)}
                onMouseLeave={() => setActiveItem(null)}
                className={`group relative rounded-sm overflow-hidden border transition-all duration-700 bg-charcoal-800 cursor-pointer p-3.5 sm:p-4 flex flex-col justify-between ${
                  isSelected
                    ? 'border-gold shadow-[0_0_35px_rgba(197,168,128,0.25)]'
                    : 'border-ivory/10 hover:border-gold/60 hover:shadow-[0_0_35px_rgba(197,168,128,0.15)]'
                }`}
                data-cursor="INSPECT"
              >
                {/* Image Frame */}
                <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-charcoal-900 mb-3.5 sm:mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out filter brightness-95 ${
                      isSelected ? 'scale-105 brightness-105' : 'group-hover:scale-110 group-hover:brightness-105'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                  
                  {/* Floating category tag */}
                  <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 text-[8px] uppercase tracking-[0.3em] font-sans px-2.5 py-1 rounded-full bg-charcoal-900/80 backdrop-blur-sm border border-gold/30 text-gold">
                    {item.category}
                  </span>

                  {/* Loupe Icon */}
                  <div className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 rounded-full bg-charcoal-900/80 backdrop-blur-sm border flex items-center justify-center transition-colors ${
                    isSelected ? 'text-gold border-gold' : 'border-ivory/20 text-ivory/70 group-hover:text-gold group-hover:border-gold'
                  }`}>
                    <ZoomIn size={13} />
                  </div>
                </div>

                {/* Caption & Metadata */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-editorial text-base sm:text-lg text-ivory tracking-wide group-hover:text-gold transition-colors duration-300">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-gold/80 font-mono">
                      {item.hours}
                    </span>
                  </div>

                  <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gold/90 font-sans">
                    {item.technique}
                  </p>

                  <p className="font-serif italic text-xs text-ivory/70 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Hover/Active Indicator Bar */}
                <div className="w-full h-[1px] bg-ivory/10 mt-3 sm:mt-4 relative overflow-hidden">
                  <div className={`h-full bg-gold transition-all duration-500 ${
                    isSelected ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Atelier Commitment Note */}
        <div className="mt-16 p-8 border border-gold/20 rounded-sm bg-charcoal-900/40 backdrop-blur-md flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <ShieldCheck size={28} className="text-gold flex-shrink-0" />
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-sans block">
                Certificate of Authenticity
              </span>
              <p className="font-serif italic text-sm text-ivory/80">
                Each couture piece is inscribed with its unique atelier registry number and signed by the master karigar.
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-mono text-gold border border-gold/30 px-4 py-2 rounded-full">
            Nocturne MMXXV Registry
          </span>
        </div>
      </div>
    </section>
  );
};
