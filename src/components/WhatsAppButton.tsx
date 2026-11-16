import React, { useState } from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { ATELIER_CONTACT } from '../data/coutureData';

export const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappHref = `https://wa.me/917889276601?text=${encodeURIComponent(
    'Hello Atelier Aparajita, I would like to inquire about a private couture consultation.'
  )}`;

  return (
    <aside
      aria-label="Direct WhatsApp Concierge"
      className="fixed bottom-6 right-6 z-40 flex items-center select-none"
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center bg-charcoal-900/90 border border-gold/40 hover:border-gold px-3.5 py-2.5 rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,168,128,0.35)]"
        data-cursor="WHATSAPP"
        title="Chat with Atelier Concierge on WhatsApp (+91 78892 76601)"
      >
        {/* Pulsing indicator dot */}
        <span className="relative flex h-2.5 w-2.5 mr-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
        </span>

        {/* WhatsApp Icon */}
        <div className="w-7 h-7 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform">
          <MessageCircle size={15} />
        </div>

        {/* Text Label */}
        <div className="ml-2.5 flex flex-col text-left">
          <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-sans font-medium">
            Concierge WhatsApp
          </span>
          <span className="text-[11px] font-mono text-ivory/80 group-hover:text-ivory transition-colors">
            {ATELIER_CONTACT.phone}
          </span>
        </div>

        <ExternalLink size={12} className="ml-2 text-ivory/40 group-hover:text-gold transition-colors" />
      </a>
    </aside>
  );
};
