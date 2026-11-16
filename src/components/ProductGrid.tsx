import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { Product, MainCategory, SubCategory } from '../types/store';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  activeMainCategory: MainCategory;
  activeSubCategory: SubCategory;
  searchQuery: string;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeMainCategory,
  activeSubCategory,
  searchQuery,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onResetFilters,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Main Category filter
        if (activeMainCategory !== 'all' && p.mainCategory !== activeMainCategory) {
          return false;
        }
        // Sub Category filter
        if (activeSubCategory !== 'all' && p.subCategory !== activeSubCategory) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.categoryLabel.toLowerCase().includes(q);
          const matchSub = p.subCategoryLabel.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchSub && !matchDesc) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, activeMainCategory, activeSubCategory, searchQuery, sortBy]);

  return (
    <section id="products" className="w-full py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-warm-200/80">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl sm:text-3xl text-warm-900 font-normal">
                {activeSubCategory !== 'all'
                  ? activeSubCategory.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                  : activeMainCategory !== 'all'
                  ? `${activeMainCategory.toUpperCase()} COLLECTION`
                  : 'All Store Products'}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cream-200 font-sans text-warm-700 font-medium">
                {filteredProducts.length} items
              </span>
            </div>
            {searchQuery && (
              <p className="text-xs text-warm-500 font-sans pt-1 flex items-center space-x-1">
                <span>Filtering by search:</span>
                <span className="font-semibold text-warm-800">"{searchQuery}"</span>
                <button
                  onClick={onResetFilters}
                  className="text-blush-600 hover:text-blush-700 ml-1 underline"
                >
                  Clear search
                </button>
              </p>
            )}
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center space-x-3 self-end sm:self-auto">
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-warm-200 text-xs font-sans text-warm-700 shadow-2xs">
              <SlidersHorizontal size={14} className="text-warm-500" />
              <label htmlFor="sort-select" className="text-warm-500">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-warm-900 font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {(activeMainCategory !== 'all' || activeSubCategory !== 'all' || searchQuery) && (
              <button
                onClick={onResetFilters}
                className="px-3 py-1.5 bg-cream-100 hover:bg-cream-200 text-warm-700 rounded-xl text-xs font-sans font-medium transition-colors flex items-center space-x-1"
                title="Reset all filters"
              >
                <X size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-cream-200 mx-auto flex items-center justify-center text-warm-500">
              <Sparkles size={24} />
            </div>
            <h4 className="font-serif text-xl text-warm-900">No products found</h4>
            <p className="text-sm text-warm-600 font-sans max-w-sm mx-auto">
              We couldn't find any products matching your current filters. Try selecting another category or resetting filters.
            </p>
            <button
              onClick={onResetFilters}
              className="px-6 py-2.5 rounded-xl bg-warm-900 text-cream-50 hover:bg-warm-800 text-xs font-sans font-medium tracking-wide transition-colors"
            >
              Reset Filters & Show All
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
