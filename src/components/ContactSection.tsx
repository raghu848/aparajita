import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink, Send, Check } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    categoryInterest: 'Women Fashion',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        categoryInterest: 'Women Fashion',
        message: '',
      });
    }, 4000);
  };

  const getWhatsAppDirectUrl = () => {
    const text = encodeURIComponent(
      `Hello ${STORE_INFO.name},\n\nI have an inquiry regarding your collections:\n- Name: ${formData.name || 'Valued Client'}\n- Interest: ${formData.categoryInterest}\n- Message: ${formData.message || 'I would like to inquire about customized sizing and availability.'}`
    );
    return `https://wa.me/${STORE_INFO.rawPhone}?text=${text}`;
  };

  return (
    <section id="contact-section" className="w-full py-16 sm:py-20 bg-white border-b border-warm-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-warm-500 font-sans font-semibold block">
            Visit Our Studio Or Reach Out
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-warm-900 tracking-tight font-normal">
            We’d Love to Help You
          </h2>
          <p className="font-sans text-sm sm:text-base text-warm-600 leading-relaxed">
            Need sizing advice, custom bridal fittings, or bulk home textile inquiries? Our team is always here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Studio Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-cream-50 rounded-3xl p-6 sm:p-8 border border-warm-200/80 space-y-6 text-left shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-blush-600 font-sans font-bold">
                Flagship Studio & Boutique
              </span>
              <h3 className="font-serif text-2xl font-medium text-warm-900">
                {STORE_INFO.name} Atelier
              </h3>
            </div>

            <div className="space-y-4 text-sm font-sans text-warm-700">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-blush-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-warm-900 leading-relaxed">
                    {STORE_INFO.address}
                  </p>
                  <a
                    href={STORE_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-blush-600 hover:text-blush-700 underline font-semibold"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-blush-500 shrink-0" />
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="font-medium text-warm-900 hover:text-blush-600 transition-colors"
                >
                  {STORE_INFO.phone}
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center space-x-3">
                <MessageCircle size={18} className="text-[#25D366] shrink-0" />
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-warm-900 hover:text-blush-600 transition-colors"
                >
                  WhatsApp: +91 {STORE_INFO.rawPhone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-blush-500 shrink-0" />
                <a
                  href={`mailto:${STORE_INFO.email}`}
                  className="font-medium text-warm-900 hover:text-blush-600 transition-colors"
                >
                  {STORE_INFO.email}
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-center space-x-3 pt-2 border-t border-warm-200/80">
                <Clock size={18} className="text-warm-400 shrink-0" />
                <span className="text-xs text-warm-600">{STORE_INFO.hours}</span>
              </div>
            </div>

            {/* Quick Action Map Button */}
            <div className="pt-2">
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-white border border-warm-300 hover:border-warm-900 text-warm-800 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center space-x-2 shadow-2xs"
              >
                <MapPin size={15} />
                <span>Get Directions in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-warm-200/80 shadow-xs text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-warm-900 mb-2">
              Send an Inquiry or Book a Studio Visit
            </h3>
            <p className="text-xs sm:text-sm text-warm-500 font-sans mb-6">
              Fill out your details below and our customer concierge will respond within 4 business hours.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center">
                  <Check size={24} />
                </div>
                <h4 className="font-serif text-xl text-warm-900">Thank You!</h4>
                <p className="text-xs font-sans text-warm-600 max-w-sm mx-auto">
                  Your message has been received. Our concierge team in Ludhiana will contact you on WhatsApp or call shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-warm-700 font-medium">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 focus:border-warm-900 focus:outline-none text-sm text-warm-900 bg-cream-50/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-warm-700 font-medium">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98110 00000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 focus:border-warm-900 focus:outline-none text-sm text-warm-900 bg-cream-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-warm-700 font-medium">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 focus:border-warm-900 focus:outline-none text-sm text-warm-900 bg-cream-50/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-warm-700 font-medium">Category of Interest</label>
                    <select
                      value={formData.categoryInterest}
                      onChange={(e) => setFormData({ ...formData, categoryInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 focus:border-warm-900 focus:outline-none text-sm text-warm-900 bg-cream-50/50 cursor-pointer"
                    >
                      <option>Women: Kurta Sets & Ethnic</option>
                      <option>Women: Anarkali & Designer Suits</option>
                      <option>Women: Western Wear</option>
                      <option>Kids Wear & Cardigans</option>
                      <option>Home: Luxury Towels</option>
                      <option>Home: Cotton & Linen Bedsheets</option>
                      <option>Bespoke Bridal Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-warm-700 font-medium">Your Message or Requirements</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us regarding sizes, color preferences, custom bridal requirements, or delivery location..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 focus:border-warm-900 focus:outline-none text-sm text-warm-900 bg-cream-50/50 resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-xl bg-warm-900 hover:bg-warm-800 text-cream-50 font-sans font-semibold tracking-wider uppercase text-xs transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send size={14} />
                    <span>Send Message</span>
                  </button>

                  <a
                    href={getWhatsAppDirectUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle size={15} />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
