import React from 'react';
import { ArrowUpRight, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import { scrollToSection } from '../utils/lenis';
import { ATELIER_CONTACT, SALON_LOCATIONS } from '../data/coutureData';

interface AppointmentSectionProps {
  onOpenAppointment: () => void;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({ onOpenAppointment }) => {
  return (
    <section id="appointment" className="relative w-full py-20 sm:py-32 bg-charcoal text-ivory overflow-hidden select-none">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-12 text-center flex flex-col items-center">
        {/* Editorial Eyebrow */}
        <span className="text-[9px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.45em] text-gold font-sans mb-3 sm:mb-4">
          Private Atelier Consultations
        </span>

        {/* Minimal Luxury Heading */}
        <h2 className="font-editorial text-2xl sm:text-5xl md:text-7xl text-ivory uppercase tracking-[0.08em] sm:tracking-[0.15em] font-light leading-tight">
          YOUR COUTURE JOURNEY<br />BEGINS HERE.
        </h2>

        <div className="w-10 sm:w-12 h-[1px] bg-gold/50 my-4 sm:my-6" />

        <p className="font-serif italic text-base sm:text-2xl text-ivory/80 max-w-xl font-light mb-8 sm:mb-10">
          Private appointments · Custom couture · Bridal trousseau
        </p>

        {/* Minimal Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenAppointment}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-sans bg-gold text-charcoal-900 font-medium hover:bg-gold-light hover:shadow-[0_0_35px_rgba(197,168,128,0.35)] transition-all duration-300 flex items-center justify-center space-x-2"
            data-cursor="SALON"
          >
            <span>Book A Private Appointment</span>
            <ArrowUpRight size={14} />
          </button>

          <a
            href={ATELIER_CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-sans bg-charcoal-800 border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold transition-all duration-300 flex items-center justify-center space-x-2"
            data-cursor="WHATSAPP"
          >
            <MessageCircle size={14} className="text-[#25D366]" />
            <span>WhatsApp Atelier ({ATELIER_CONTACT.phone})</span>
          </a>

          <button
            onClick={() => scrollToSection('#collection')}
            className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-sans border border-ivory/20 text-ivory/80 hover:border-gold hover:text-gold transition-colors duration-300 text-center"
            data-cursor="EXPLORE"
          >
            Explore The Collection
          </button>
        </div>

        {/* Flagship Atelier Spotlight Card */}
        <div className="w-full max-w-3xl mt-12 sm:mt-14 p-6 sm:p-8 rounded-sm bg-charcoal-900/80 border border-gold/25 backdrop-blur-md text-left flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans font-medium">
                Flagship Atelier & Studio
              </span>
            </div>
            <h4 className="font-editorial text-lg sm:text-xl text-ivory tracking-wide uppercase">
              Ludhiana Couture Studio
            </h4>
            <p className="font-serif italic text-xs sm:text-sm text-ivory/80 leading-relaxed">
              {ATELIER_CONTACT.address}
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-sans text-ivory/70">
              <a
                href={`tel:${ATELIER_CONTACT.phone}`}
                className="flex items-center space-x-1.5 hover:text-gold transition-colors"
              >
                <Phone size={12} className="text-gold" />
                <span>{ATELIER_CONTACT.phone}</span>
              </a>
              <span className="text-ivory/30">·</span>
              <a
                href={ATELIER_CONTACT.emailLink}
                className="flex items-center space-x-1.5 hover:text-gold transition-colors"
              >
                <Mail size={12} className="text-gold" />
                <span>{ATELIER_CONTACT.email}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <a
              href={ATELIER_CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-sm border border-gold/40 text-gold hover:bg-gold hover:text-charcoal-900 transition-colors text-xs font-sans uppercase tracking-widest flex items-center justify-center space-x-2"
            >
              <MapPin size={13} />
              <span>Google Maps Link</span>
            </a>
            <a
              href={ATELIER_CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-sm bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/25 transition-colors text-xs font-sans uppercase tracking-widest flex items-center justify-center space-x-2"
            >
              <MessageCircle size={13} />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Studio Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-ivory/10 w-full max-w-3xl text-left">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans block">
              Private Salon Visits
            </span>
            <p className="font-serif italic text-xs text-ivory/70">
              Reserved exclusively by prior appointment for bespoke consultations.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans block">
              Bespoke Bridal Trousseau
            </span>
            <p className="font-serif italic text-xs text-ivory/70">
              Personalized pattern cuts, heritage zardozi, and hand-woven silks.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans block">
              Direct Concierge
            </span>
            <p className="font-serif italic text-xs text-ivory/70">
              Connect directly via WhatsApp or Phone: +91 78892 76601.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
