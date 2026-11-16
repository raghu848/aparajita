import React, { useState } from 'react';
import { X, Star, ShoppingBag, MessageCircle, Check, Heart, ShieldCheck } from 'lucide-react';
import { Product } from '../types/store';
import { STORE_INFO } from '../data/storeData';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const getWhatsAppOrderUrl = () => {
    const text = encodeURIComponent(
      `Hello ${STORE_INFO.name},\n\nI would like to order this product:\n- Product: ${product.name}\n- Price: ₹${product.price.toLocaleString('en-IN')}\n- Quantity: ${quantity}${selectedSize ? `\n- Size: ${selectedSize}` : ''}${selectedColor ? `\n- Color: ${selectedColor}` : ''}\n\nPlease confirm availability and sharing delivery details.`
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
            />
            {product.discountBadge && (
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-blush-500 text-white text-xs font-bold font-sans rounded-lg shadow-sm">
                {product.discountBadge}
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

            {/* Price */}
            <div className="flex items-baseline space-x-3 pb-3 border-b border-warm-100">
              <span className="font-sans text-2xl sm:text-3xl font-bold text-warm-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="font-sans text-sm text-warm-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountBadge && (
                <span className="text-xs font-semibold text-blush-600 px-2 py-0.5 bg-blush-50 rounded border border-blush-200">
                  Save {product.discountBadge}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="font-sans text-sm text-warm-600 leading-relaxed">
              {product.description}
            </p>

            {/* Sizes (if available) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-sans text-warm-700">
                  <span className="font-semibold">Select Size:</span>
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

            {/* Quantity & CTA Buttons */}
            <div className="pt-4 border-t border-warm-100 space-y-3">
              <div className="flex items-center space-x-4">
                {/* Quantity Box */}
                <div className="flex items-center border border-warm-200 rounded-xl bg-cream-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-warm-600 hover:text-warm-900 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-semibold font-sans text-warm-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-warm-600 hover:text-warm-900 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center space-x-2 shadow-sm ${
                    added
                      ? 'bg-[#25D366] text-white'
                      : 'bg-warm-900 hover:bg-warm-800 text-cream-50'
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={16} />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isWishlisted
                      ? 'bg-blush-50 border-blush-300 text-blush-600'
                      : 'border-warm-200 text-warm-600 hover:border-warm-400'
                  }`}
                  aria-label="Wishlist"
                  title="Toggle wishlist"
                >
                  <Heart size={18} className={isWishlisted ? 'fill-blush-500 text-blush-500' : ''} />
                </button>
              </div>

              {/* Direct WhatsApp Order Button */}
              <a
                href={getWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-sans font-medium tracking-wide flex items-center justify-center space-x-2 transition-colors"
              >
                <MessageCircle size={15} className="text-[#25D366]" />
                <span>Instant Order via WhatsApp (+91 {STORE_INFO.rawPhone})</span>
              </a>
            </div>

            {/* Reassurance text */}
            <div className="pt-1 flex items-center justify-center space-x-4 text-[11px] text-warm-500 font-sans">
              <span className="flex items-center space-x-1">
                <ShieldCheck size={13} className="text-warm-400" />
                <span>Genuine Quality Guarantee</span>
              </span>
              <span>·</span>
              <span>Easy 7-Day Exchange Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
