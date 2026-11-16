import React, { useState } from 'react';
import { X, Check, MapPin, Calendar, Clock, Sparkles, MessageCircle, ExternalLink, Phone, Mail } from 'lucide-react';
import { SALON_LOCATIONS, ATELIER_CONTACT } from '../data/coutureData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [selectedCity, setSelectedCity] = useState(SALON_LOCATIONS[0].city);
  const [consultationType, setConsultationType] = useState('Bridal Heirloom Suite');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const selectedSalon = SALON_LOCATIONS.find((s) => s.city === selectedCity) || SALON_LOCATIONS[0];

  const getWhatsAppBookingUrl = () => {
    const text = encodeURIComponent(
      `Hello Atelier Aparajita,\n\nI would like to confirm a private couture consultation:\n- Name: ${formData.name || 'Valued Client'}\n- Salon / Studio: ${selectedSalon.city}\n- Service: ${consultationType}\n- Phone: ${formData.phone || 'N/A'}\n- Email: ${formData.email || 'N/A'}${formData.eventDate ? `\n- Event Date: ${formData.eventDate}` : ''}${formData.notes ? `\n- Notes: ${formData.notes}` : ''}`
    );
    return `https://wa.me/917889276601?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 md:p-10 select-none animate-in fade-in duration-300">
      {/* Dimmed Frosted Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal-noir/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-charcoal-900 border border-gold/30 rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.8)] text-ivory p-5 sm:p-10 md:p-12">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-ivory/60 hover:text-gold transition-colors"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {submitted ? (
          /* Confirmation Success State */
          <div className="py-8 sm:py-12 text-center flex flex-col items-center space-y-4 sm:space-y-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold/15 border border-gold flex items-center justify-center text-gold">
              <Check size={24} className="sm:size-[28px]" />
            </div>

            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] sm:tracking-[0.4em] text-gold font-sans">
              Private Salon Confirmed
            </span>

            <h3 className="font-editorial text-2xl sm:text-4xl text-ivory uppercase">
              YOUR COUTURE JOURNEY BEGINS
            </h3>

            <p className="font-serif italic text-sm sm:text-lg text-ivory/80 max-w-md leading-relaxed">
              Thank you, {formData.name || 'valued client'}. Our atelier concierge will contact you within 24 hours to personalize your private consultation at our Ludhiana studio.
            </p>

            <div className="p-4 sm:p-5 rounded-sm border border-gold/20 bg-charcoal-800/60 max-w-md w-full text-left text-xs text-ivory/80 space-y-2 font-sans">
              <div><strong className="text-gold">Studio:</strong> Ludhiana, Punjab</div>
              <div><strong className="text-gold">Address:</strong> {selectedSalon.address}</div>
              <div><strong className="text-gold">Service:</strong> {consultationType}</div>
              <div><strong className="text-gold">Direct Concierge / WhatsApp:</strong> {selectedSalon.phone}</div>
              <div><strong className="text-gold">Email:</strong> {selectedSalon.email}</div>
              {selectedSalon.mapUrl && (
                <div className="pt-1">
                  <a
                    href={selectedSalon.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-gold hover:text-gold-light underline text-xs"
                  >
                    <MapPin size={12} />
                    <span>View Location on Google Maps</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-2">
              <a
                href={getWhatsAppBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-full text-xs uppercase tracking-[0.2em] font-sans bg-[#25D366] text-charcoal-900 font-semibold hover:bg-[#20ba59] transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle size={15} />
                <span>Confirm via WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="py-3 px-6 rounded-full text-xs uppercase tracking-[0.2em] font-sans border border-ivory/20 text-ivory/80 hover:text-ivory hover:border-ivory transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center sm:text-left">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] sm:tracking-[0.4em] text-gold font-sans">
                Atelier Concierge
              </span>
              <h3 className="font-editorial text-xl sm:text-4xl text-ivory uppercase tracking-wide mt-1">
                REQUEST A PRIVATE APPOINTMENT
              </h3>
              <p className="font-serif italic text-xs sm:text-base text-ivory/70 mt-1 sm:mt-2">
                Private appointments · Custom heirloom trousseau · Bespoke couture
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Studio Location Display */}
              <div className="p-3.5 sm:p-4 rounded-sm border border-gold/30 bg-charcoal-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-medium">
                      Studio & Atelier · Ludhiana, Punjab
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-ivory/60 font-sans">
                    Private Appointment
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-ivory/80 font-serif italic pt-1">
                  <div className="flex items-start space-x-1.5">
                    <MapPin size={13} className="text-gold shrink-0 mt-0.5" />
                    <span>{selectedSalon.address}</span>
                  </div>
                  {selectedSalon.mapUrl && (
                    <a
                      href={selectedSalon.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-gold hover:text-gold-light underline inline-flex items-center space-x-1 font-sans not-italic shrink-0 pt-0.5"
                    >
                      <span>Google Maps</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>

              {/* Service Type Selection */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans block">
                  Couture Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Bridal Heirloom Suite',
                    'Bespoke Couture Ensemble',
                    'Private Trunk Consultation',
                  ].map((service) => (
                    <button
                      type="button"
                      key={service}
                      onClick={() => setConsultationType(service)}
                      className={`py-3 px-3 rounded-sm border text-xs font-sans uppercase tracking-wider transition-all duration-300 text-center ${
                        consultationType === service
                          ? 'border-gold bg-gold/15 text-gold font-medium'
                          : 'border-ivory/10 hover:border-ivory/30 text-ivory/70'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-ivory/60 font-sans">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full px-4 py-3 bg-charcoal-800 border border-ivory/15 focus:border-gold outline-none text-sm text-ivory placeholder:text-ivory/30 rounded-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-ivory/60 font-sans">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-3 bg-charcoal-800 border border-ivory/15 focus:border-gold outline-none text-sm text-ivory placeholder:text-ivory/30 rounded-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-ivory/60 font-sans">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98110 00000"
                    className="w-full px-4 py-3 bg-charcoal-800 border border-ivory/15 focus:border-gold outline-none text-sm text-ivory placeholder:text-ivory/30 rounded-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-ivory/60 font-sans">
                    Event / Wedding Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-4 py-3 bg-charcoal-800 border border-ivory/15 focus:border-gold outline-none text-sm text-ivory rounded-sm"
                  />
                </div>
              </div>

              {/* Personal Couture Vision */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-ivory/60 font-sans">
                  Your Couture Vision / Garment Preferences
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share details regarding your bridal vision, color palette, heirloom fabrics, or preferred silhouettes..."
                  className="w-full px-4 py-3 bg-charcoal-800 border border-ivory/15 focus:border-gold outline-none text-sm text-ivory placeholder:text-ivory/30 rounded-sm resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-full text-xs uppercase tracking-[0.25em] font-sans bg-gold text-charcoal-900 font-medium hover:bg-gold-light hover:shadow-[0_0_30px_rgba(197,168,128,0.4)] transition-all duration-300"
              >
                Confirm Private Appointment Request
              </button>

              <p className="text-[10px] text-center text-ivory/40 font-sans tracking-wide">
                Appointments are curated strictly by prior reservation. Atelier Aparajita honors complete discretion and client privacy.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
