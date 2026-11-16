import React, { useState } from 'react';
import { ArrowUp, ArrowRight, Check, MapPin, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { scrollToSection } from '../utils/lenis';
import { ATELIER_CONTACT } from '../data/coutureData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-charcoal-noir text-ivory border-t border-ivory/10 pt-20 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Colophon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-ivory/10">
          {/* Brand & Mission (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-editorial text-2xl md:text-3xl tracking-[0.3em] text-ivory uppercase font-light">
              APARAJITA
            </span>
            <span className="block text-[9px] uppercase tracking-[0.45em] text-gold font-sans">
              Haute Couture · Studio & Atelier
            </span>
            <p className="font-serif italic text-sm text-ivory/70 max-w-sm leading-relaxed pt-1">
              The art of slow, timeless Indian bridal and couture storytelling. Dedicated to the preservation of vanishing embroidery traditions and architectural female silhouettes.
            </p>
          </div>

          {/* Flagship Studio & Contact (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans block mb-2">
              Flagship Studio & Contact
            </span>
            <div className="space-y-2.5 text-xs text-ivory/75 font-sans">
              <div className="flex items-start space-x-2.5">
                <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="leading-relaxed font-serif italic text-ivory/90">
                    {ATELIER_CONTACT.address}
                  </p>
                  <a
                    href={ATELIER_CONTACT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[11px] text-gold hover:text-gold-light underline tracking-wider font-sans uppercase not-italic"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 pt-1">
                <Phone size={14} className="text-gold shrink-0" />
                <a
                  href={`tel:${ATELIER_CONTACT.phone}`}
                  className="hover:text-gold transition-colors tracking-wider"
                >
                  {ATELIER_CONTACT.phone}
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <MessageCircle size={14} className="text-[#25D366] shrink-0" />
                <a
                  href={ATELIER_CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors tracking-wider flex items-center space-x-1"
                >
                  <span>WhatsApp: {ATELIER_CONTACT.whatsapp}</span>
                  <ExternalLink size={10} className="text-ivory/40" />
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail size={14} className="text-gold shrink-0" />
                <a
                  href={ATELIER_CONTACT.emailLink}
                  className="hover:text-gold transition-colors tracking-wider lowercase"
                >
                  {ATELIER_CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans block mb-2">
              Atelier Directory
            </span>
            <ul className="space-y-2 text-xs text-ivory/70 font-sans tracking-wider">
              {['Collection', 'Craftsmanship', 'The Signature', 'Lookbook', 'Appointments'].map((link, i) => (
                <li key={i}>
                  <a
                    href="#collection"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#collection');
                    }}
                    className="hover:text-gold transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Private Newsletter Invitation (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans block mb-2">
              Private Previews
            </span>
            <p className="font-serif italic text-xs text-ivory/70 leading-relaxed">
              Receive private invitations to our forthcoming trunk shows.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1 flex flex-col space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full bg-charcoal-800 border border-ivory/15 px-3 py-2 text-xs text-ivory placeholder:text-ivory/30 outline-none focus:border-gold rounded-sm"
              />
              <button
                type="submit"
                className="w-full py-2 bg-gold text-charcoal-900 text-[10px] uppercase tracking-widest font-sans font-medium rounded-sm hover:bg-gold-light transition-colors flex items-center justify-center space-x-1"
                aria-label="Subscribe"
              >
                <span>{subscribed ? 'Subscribed' : 'Join Registry'}</span>
                {subscribed ? <Check size={12} /> : <ArrowRight size={12} />}
              </button>
            </form>
          </div>
        </div>

        {/* Studio Location & Consultation Bar */}
        <div className="py-8 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-ivory/50 font-sans border-b border-ivory/10">
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2">
            <span className="text-gold font-medium">Flagship Studio: Ludhiana, Punjab</span>
            <span>·</span>
            <span>Private Consultations by Appointment</span>
            <span>·</span>
            <span>Worldwide Delivery & Discretion</span>
          </div>
          <button
            onClick={() => scrollToSection('#hero')}
            className="flex items-center space-x-2 text-gold hover:text-gold-light transition-colors"
            data-cursor="TOP"
          >
            <span>Back to Beginning</span>
            <ArrowUp size={12} />
          </button>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-widest text-ivory/40 uppercase font-sans space-y-3 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} ATELIER APARAJITA COUTURE (JSSG ENTERPRISES). ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6">
            <span className="hover:text-ivory/70 cursor-pointer">Privacy & Discretion</span>
            <span className="hover:text-ivory/70 cursor-pointer">Atelier Registry</span>
            <span className="hover:text-ivory/70 cursor-pointer">Terms of Bespoke</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
