import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { atelierAmbiance } from '../utils/audioAmbiance';
import { scrollToSection } from '../utils/lenis';
import { ATELIER_CONTACT } from '../data/coutureData';

interface NavbarProps {
  onOpenAppointment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAppointment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const playing = atelierAmbiance.toggle();
    setIsAudioPlaying(playing);
  };

  const navLinks = [
    { label: 'Collection', target: '#collection' },
    { label: 'Craft', target: '#craft' },
    { label: 'The Signature', target: '#signature' },
    { label: 'Lookbook', target: '#lookbook' },
    { label: 'Atelier Story', target: '#story' },
  ];

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    scrollToSection(target);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled
            ? 'py-4 bg-charcoal-900/75 backdrop-blur-md border-b border-gold/15 shadow-2xl'
            : 'py-7 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Brand Left */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="group flex flex-col cursor-pointer"
            data-cursor="ATELIER"
          >
            <span className="font-editorial text-base sm:text-lg md:text-xl tracking-[0.25em] sm:tracking-[0.35em] text-ivory font-light group-hover:text-gold transition-colors duration-500">
              APARAJITA
            </span>
            <span className="text-[7px] sm:text-[8px] tracking-[0.35em] sm:tracking-[0.45em] text-gold/70 uppercase font-sans -mt-0.5">
              Haute Couture · Ludhiana, Punjab
            </span>
          </a>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-10 text-[11px] uppercase tracking-[0.25em] text-ivory/80 font-sans">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.target}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.target);
                }}
                className="relative py-1 hover:text-ivory transition-colors duration-300 group"
                data-cursor="VIEW"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-gold-shimmer transition-all duration-300 -translate-x-1/2 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-5 md:space-x-8">
            {/* Audio Ambiance Toggle */}
            <button
              onClick={handleAudioToggle}
              className="flex items-center space-x-2 text-[10px] tracking-widest uppercase text-ivory/70 hover:text-gold transition-colors duration-300 py-1 px-2.5 rounded-full border border-ivory/10 hover:border-gold/30 bg-charcoal/30 backdrop-blur-sm"
              title={isAudioPlaying ? 'Mute atelier ambiance' : 'Listen to atelier ambiance'}
              data-cursor="SOUND"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 size={13} className="text-gold animate-pulse" />
                  <span className="hidden sm:inline text-[9px] text-gold">Ambiance On</span>
                  <div className="flex items-end space-x-0.5 h-3">
                    <span className="w-0.5 h-2 bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-0.5 h-3 bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-0.5 h-1.5 bg-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX size={13} className="text-ivory/60" />
                  <span className="hidden sm:inline text-[9px] text-ivory/60">Sound</span>
                </>
              )}
            </button>

            {/* Appointment CTA */}
            <button
              onClick={onOpenAppointment}
              className="hidden sm:flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] font-sans px-5 py-2.5 rounded-full border border-gold/40 text-ivory bg-gold/10 hover:bg-gold hover:text-charcoal-900 transition-all duration-500 hover:shadow-[0_0_20px_rgba(197,168,128,0.25)]"
              data-cursor="SALON"
            >
              <span>Book Appointment</span>
              <ArrowUpRight size={12} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-ivory hover:text-gold transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Editorial Full-screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-charcoal-900/98 backdrop-blur-xl transition-all duration-700 flex flex-col justify-between px-8 py-10 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
      >
        <div className="flex items-center justify-between border-b border-ivory/10 pb-6">
          <div className="flex flex-col">
            <span className="font-editorial text-xl tracking-[0.35em] text-ivory">APARAJITA</span>
            <span className="text-[8px] tracking-[0.4em] text-gold/80 uppercase font-sans">Haute Couture</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-ivory hover:text-gold transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col space-y-6 my-auto">
          {navLinks.map((item, idx) => (
            <a
              key={item.label}
              href={item.target}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.target);
              }}
              className="group flex items-baseline justify-between py-2 border-b border-ivory/5"
            >
              <span className="font-serif text-3xl text-ivory/90 group-hover:text-gold transition-colors duration-300 italic">
                {item.label}
              </span>
              <span className="text-[10px] tracking-widest text-gold/60 font-sans">
                0{idx + 1}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col space-y-3 pt-6 border-t border-ivory/10">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAppointment();
            }}
            className="w-full py-3.5 text-center text-xs uppercase tracking-[0.25em] font-sans rounded-full bg-gold text-charcoal-900 font-medium hover:bg-gold-light transition-colors"
          >
            Request Private Appointment
          </button>

          <div className="grid grid-cols-2 gap-2 text-center">
            <a
              href={ATELIER_CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-full border border-[#25D366]/40 text-[#25D366] text-[10px] uppercase tracking-wider font-sans flex items-center justify-center space-x-1.5"
            >
              <MessageCircle size={12} />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${ATELIER_CONTACT.phone}`}
              className="py-2.5 px-3 rounded-full border border-gold/40 text-gold text-[10px] uppercase tracking-wider font-sans flex items-center justify-center space-x-1.5"
            >
              <Phone size={12} />
              <span>Call Concierge</span>
            </a>
          </div>

          <div className="flex items-center justify-between text-[10px] tracking-widest text-ivory/50 uppercase font-sans pt-1">
            <span>Atelier Studio · Ludhiana, Punjab</span>
            <button onClick={handleAudioToggle} className="text-gold">
              {isAudioPlaying ? 'Mute Sound' : 'Play Soundscape'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
