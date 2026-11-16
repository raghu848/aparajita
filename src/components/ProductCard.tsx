import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { Product } from '../types/store';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
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

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-[10px] font-sans font-semibold tracking-wide text-warm-800 shadow-2xs border border-warm-200/50">
              {product.badge}
            </span>
          )}
          {product.discountBadge && (
            <span className="px-2 py-0.5 rounded-md bg-blush-500 text-white text-[10px] font-sans font-bold tracking-wide shadow-2xs">
              {product.discountBadge}
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
            isWishlisted
              ? 'bg-blush-50 text-blush-600 shadow-xs'
              : 'bg-white/90 text-warm-600 hover:text-blush-600 hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isWishlisted ? 'Saved in wishlist' : 'Add to wishlist'}
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
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
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
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-warm-100 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="font-sans text-base sm:text-lg font-bold text-warm-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="font-sans text-xs text-warm-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all duration-200 flex items-center space-x-1.5 ${
              added
                ? 'bg-[#25D366] text-white'
                : 'bg-warm-900 hover:bg-warm-800 text-cream-50'
            }`}
            aria-label="Add product to cart"
          >
            {added ? (
              <>
                <Check size={13} />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
