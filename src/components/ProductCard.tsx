import React from 'react';
import { Heart, MessageCircle, Eye, Star } from 'lucide-react';
import { Product } from '../types/store';
import { STORE_INFO } from '../data/storeData';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
}) => {
  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const handleWhatsAppDirect = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello ${STORE_INFO.name}, I would like to inquire about this design:\n- Product: ${product.name}\n- Category: ${product.subCategoryLabel}\n\nPlease share available colors, sizing, and details.`
    );
    window.open(`https://wa.me/${STORE_INFO.rawPhone}?text=${text}`, '_blank');
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-2xl border border-warm-200/80 shadow-xs hover:shadow-md hover:border-warm-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-warm-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[10px] font-sans font-semibold tracking-wide text-warm-800 shadow-2xs border border-warm-200/50">
              {product.badge}
            </span>
          )}
        </div>

        {/* Top Right Save to Favorites Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
            isWishlisted
              ? 'bg-blush-50 text-blush-600 shadow-xs'
              : 'bg-white/90 text-warm-600 hover:text-blush-600 hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from favorites' : 'Save to favorites'}
          title={isWishlisted ? 'Saved in favorites' : 'Save to favorites'}
        >
          <Heart size={16} className={isWishlisted ? 'fill-blush-500 text-blush-500' : ''} />
        </button>

        {/* Hover Quick View Pill (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex justify-center z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 bg-white/95 hover:bg-white text-warm-900 text-xs font-sans font-semibold rounded-xl shadow-md border border-warm-200 flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Eye size={14} />
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col justify-between flex-grow space-y-3 text-left">
        <div className="space-y-1">
          {/* Subcategory Label & Rating */}
          <div className="flex items-center justify-between text-[11px] text-warm-500 font-sans">
            <span className="uppercase tracking-wider font-medium text-warm-600">
              {product.subCategoryLabel}
            </span>
            <div className="flex items-center space-x-1 text-amber-500">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="font-medium text-warm-800">{product.rating}</span>
              <span className="text-warm-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg font-medium text-warm-900 line-clamp-1 group-hover:text-blush-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-[11px] text-warm-500 font-sans line-clamp-1">
            Fabric: {product.fabric}
          </p>
        </div>

        {/* Action Buttons: View Details & WhatsApp Inquire */}
        <div className="pt-2 border-t border-warm-100 flex items-center justify-between gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="text-xs font-sans font-medium text-warm-700 hover:text-warm-900 flex items-center space-x-1"
          >
            <span>View Details</span>
          </button>

          <button
            onClick={handleWhatsAppDirect}
            className="px-2.5 py-1.5 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-sans font-medium flex items-center space-x-1 transition-colors"
            title="Inquire directly on WhatsApp"
          >
            <MessageCircle size={13} className="text-[#25D366]" />
            <span>Inquire</span>
          </button>
        </div>
      </div>
    </div>
  );
};
