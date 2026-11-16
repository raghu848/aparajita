import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

export const WhatsAppButton: React.FC = () => {
  const whatsappHref = `https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(
    'Hello Aparajita Team, I would like to inquire about products and custom sizing.'
  )}`;

  return (
    <aside
      aria-label="Direct WhatsApp Support"
      className="fixed bottom-6 right-6 z-40 flex items-center select-none"
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center bg-white border border-warm-200 hover:border-warm-300 px-3.5 py-2.5 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-102"
        title={`Chat with us on WhatsApp (${STORE_INFO.phone})`}
      >
        {/* Pulsing indicator dot */}
        <span className="relative flex h-2.5 w-2.5 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
        </span>

        {/* WhatsApp Icon */}
        <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-2xs group-hover:scale-105 transition-transform">
          <MessageCircle size={15} />
        </div>

        {/* Text Label */}
        <div className="ml-2.5 flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-wider text-warm-500 font-sans font-semibold">
            Chat on WhatsApp
          </span>
          <span className="text-xs font-semibold text-warm-900 group-hover:text-blush-600 transition-colors">
            {STORE_INFO.phone}
          </span>
        </div>
      </a>
    </aside>
  );
};
