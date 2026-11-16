import React, { useState } from 'react';
import { X, Star, MessageCircle, Heart, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { Product } from '../types/store';
import { STORE_INFO } from '../data/storeData';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '');

  const getWhatsAppInquiryUrl = () => {
    const text = encodeURIComponent(
      `Hello ${STORE_INFO.name},\n\nI would like to inquire about this design:\n- Product: ${product.name}\n- Category: ${product.subCategoryLabel}${selectedSize ? `\n- Size preference: ${selectedSize}` : ''}${selectedColor ? `\n- Color preference: ${selectedColor}` : ''}\n\nPlease share availability, customization options, and studio fitting details.`
    );
    return `https://wa.me/${STORE_INFO.rawPhone}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-warm-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-warm-200/80 p-5 sm:p-8 md:p-10 text-warm-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-warm-500 hover:text-warm-900 hover:bg-cream-100 transition-colors"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Image (5 cols) */}
          <div className="md:col-span-5 relative rounded-2xl overflow-hidden bg-warm-100 aspect-[3/4] border border-warm-200/60">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = 'true';
                  if (product.subCategory === 'towels' || product.subCategory === 'kids-towels') {
                    target.src = '/images/towel_white_folded.jpg';
                  } else if (product.subCategory === 'bedsheets' || product.subCategory === 'kids-bedsheets') {
                    target.src = '/images/bedsheet_hotel_white.jpg';
                  } else if (product.subCategory === 'cardigans') {
                    target.src = '/images/kids_cardigan_wool.jpg';
                  } else if (product.mainCategory === 'kids') {
                    target.src = '/images/kids_dress_cotton.jpg';
                  } else if (product.subCategory === 'western-wear') {
                    target.src = '/images/women_western_blazer.jpg';
                  } else {
                    target.src = '/images/couture_saree_royal.jpg';
                  }
                }
              }}
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-xs text-xs font-semibold font-sans rounded-lg shadow-sm text-warm-800 border border-warm-200">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right Column: Details & Actions (7 cols) */}
          <div className="md:col-span-7 space-y-5 text-left">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-sans text-warm-500 uppercase tracking-wider">
                <span>{product.categoryLabel}</span>
                <span>·</span>
                <span className="font-semibold text-warm-700">{product.subCategoryLabel}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-warm-900 tracking-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-2 text-xs font-sans text-warm-600 pt-0.5">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-warm-300'}
                    />
                  ))}
                </div>
                <span className="font-bold text-warm-800">{product.rating}</span>
                <span className="text-warm-400">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Fabric Highlight Badge */}
            <div className="p-3 bg-cream-50 rounded-xl border border-warm-200/60 flex items-center justify-between text-xs font-sans">
              <span className="text-warm-500">Fabric Composition:</span>
              <span className="font-semibold text-warm-900">{product.fabric}</span>
            </div>

            {/* Description */}
            <p className="font-sans text-sm text-warm-600 leading-relaxed">
              {product.description}
            </p>

            {/* Sizes (if available) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-sans text-warm-700">
                  <span className="font-semibold">Sizing / Fit Options:</span>
                  <span className="text-warm-500">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-sans transition-all border ${
                        selectedSize === size
                          ? 'border-warm-900 bg-warm-900 text-white font-medium'
                          : 'border-warm-200 bg-white text-warm-700 hover:border-warm-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors (if available) */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-sans font-semibold text-warm-700 block">
                  Available Shades:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 rounded-md text-xs font-sans transition-all border ${
                        selectedColor === color
                          ? 'border-blush-500 bg-blush-50 text-blush-700 font-semibold'
                          : 'border-warm-200 bg-cream-50 text-warm-600 hover:border-warm-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Details List */}
            {product.details && (
              <div className="space-y-1.5 pt-2 text-xs text-warm-600 font-sans">
                {product.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Check size={13} className="text-blush-500 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Inquiry CTA Buttons */}
            <div className="pt-4 border-t border-warm-100 space-y-3">
              <div className="flex items-center space-x-3">
                {/* Direct WhatsApp Inquiry Button */}
                <a
                  href={getWhatsAppInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <MessageCircle size={16} />
                  <span>Inquire via WhatsApp</span>
                </a>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isWishlisted
                      ? 'bg-blush-50 border-blush-300 text-blush-600'
                      : 'border-warm-200 text-warm-600 hover:border-warm-400'
                  }`}
                  aria-label="Save to favorites"
                  title="Save to favorites"
                >
                  <Heart size={18} className={isWishlisted ? 'fill-blush-500 text-blush-500' : ''} />
                </button>
              </div>

              {/* Studio visit link */}
              <a
                href="#contact-section"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl border border-warm-300 hover:border-warm-900 text-warm-800 text-xs font-sans font-medium tracking-wide flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Sparkles size={14} className="text-blush-500" />
                <span>Book Fitting or Studio Visit in Ludhiana</span>
              </a>
            </div>

            {/* Reassurance text */}
            <div className="pt-1 flex items-center justify-center space-x-4 text-[11px] text-warm-500 font-sans">
              <span className="flex items-center space-x-1">
                <ShieldCheck size={13} className="text-warm-400" />
                <span>Direct Atelier Craftsmanship</span>
              </span>
              <span>·</span>
              <span>Custom Sizing & Trial Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
