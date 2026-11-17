import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Instagram,
  Facebook,
  ArrowUp,
  Check,
  ArrowRight,
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { MainCategory, SubCategory } from '../types/store';

interface FooterProps {
  onSelectCategory: (main: MainCategory, sub?: SubCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-warm-900 text-cream-100 font-sans pt-16 pb-10 border-t border-warm-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-warm-800 text-left">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-block group"
            >
              <img
                src="/images/logo.png"
                alt="Aparajitaa Courturee Logo"
                className="h-16 sm:h-20 w-auto object-contain brightness-110 drop-shadow-md group-hover:scale-105 transition-transform"
              />
            </a>

            <p className="text-xs text-warm-300 leading-relaxed max-w-sm">
              Curated everyday elegance and home comfort. Specializing in women's western & heirloom ethnic wear, gentle organic kids essentials, and premium bed & bath textiles.
            </p>

            {/* Newsletter Mini Form */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-warm-300 font-medium block">
                Join Our Private Circle
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-sm">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-warm-800 border border-warm-700 px-3 py-2 text-xs text-cream-100 placeholder:text-warm-500 rounded-l-lg focus:outline-none focus:border-blush-400 w-full"
                />
                <button
                  type="submit"
                  className="bg-blush-500 hover:bg-blush-600 text-white px-3.5 py-2 rounded-r-lg text-xs font-medium transition-colors flex items-center justify-center shrink-0"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check size={14} /> : <ArrowRight size={14} />}
                </button>
              </form>
              {subscribed && (
                <span className="text-[10px] text-blush-300 block">
                  ✦ Thank you for joining our private registry.
                </span>
              )}
            </div>
          </div>

          {/* Col 2: Women Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-cream-50 tracking-wider uppercase">
              Women's Wear
            </h4>
            <ul className="space-y-2 text-xs text-warm-300">
              {[
                { label: 'Western Wear', sub: 'western-wear' },
                { label: 'Ethnic Wear', sub: 'ethnic-wear' },
                { label: 'Kurta Sets', sub: 'kurta-sets' },
                { label: 'Anarkali Sets', sub: 'anarkali' },
                { label: 'Designer Suits', sub: 'designer-suits' },
                { label: 'Party Wear Suits', sub: 'party-wear' },
              ].map((item) => (
                <li key={item.sub}>
                  <button
                    onClick={() => onSelectCategory('women', item.sub as any)}
                    className="hover:text-blush-300 transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Kids & Home (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-2">
              <h4 className="font-serif text-sm font-semibold text-cream-50 tracking-wider uppercase">
                Kids Collection
              </h4>
              <ul className="space-y-2 text-xs text-warm-300">
                {[
                  { label: 'Kids Wear', sub: 'kids-wear' },
                  { label: 'Cardigans & Knits', sub: 'cardigans' },
                  { label: 'Kids Towels', sub: 'kids-towels' },
                  { label: 'Kids Bedsheets', sub: 'kids-bedsheets' },
                ].map((item) => (
                  <li key={item.sub}>
                    <button
                      onClick={() => onSelectCategory('kids', item.sub as any)}
                      className="hover:text-blush-300 transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="font-serif text-sm font-semibold text-cream-50 tracking-wider uppercase">
                Home & Living
              </h4>
              <ul className="space-y-2 text-xs text-warm-300">
                {[
                  { label: 'Luxury Towels', sub: 'towels' },
                  { label: 'Premium Bedsheets', sub: 'bedsheets' },
                ].map((item) => (
                  <li key={item.sub}>
                    <button
                      onClick={() => onSelectCategory('home', item.sub as any)}
                      className="hover:text-blush-300 transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 4: Studio Contact Information (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-cream-50 tracking-wider uppercase">
              Studio & Boutique Contact
            </h4>
            <div className="space-y-2.5 text-xs text-warm-300">
              <div className="flex items-start space-x-2.5">
                <MapPin size={15} className="text-blush-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="leading-relaxed text-cream-200">
                    {STORE_INFO.address}
                  </p>
                  <a
                    href={STORE_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[11px] text-blush-300 hover:text-blush-200 underline"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 pt-1">
                <Phone size={14} className="text-blush-400 shrink-0" />
                <a href={`tel:${STORE_INFO.phone}`} className="hover:text-cream-50 transition-colors">
                  {STORE_INFO.phone}
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <MessageCircle size={14} className="text-[#25D366] shrink-0" />
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream-50 transition-colors"
                >
                  WhatsApp: +91 {STORE_INFO.rawPhone}
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail size={14} className="text-blush-400 shrink-0" />
                <a href={`mailto:${STORE_INFO.email}`} className="hover:text-cream-50 transition-colors">
                  {STORE_INFO.email}
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center space-x-3 text-warm-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-warm-800 hover:bg-blush-500 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-warm-800 hover:bg-blush-500 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-warm-800 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-warm-400 space-y-3 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} {STORE_INFO.name} (JSSG ENTERPRISES). All Rights Reserved.
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <a href="#about-section" className="hover:text-cream-100 transition-colors">
              Privacy Policy
            </a>
            <a href="#about-section" className="hover:text-cream-100 transition-colors">
              Terms & Conditions
            </a>
            <a href="#about-section" className="hover:text-cream-100 transition-colors">
              Shipping & Returns
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-blush-300 hover:text-white transition-colors ml-2"
              title="Back to Top"
            >
              <span>Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
