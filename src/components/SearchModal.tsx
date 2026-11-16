import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { Product } from '../types/store';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onApplySearchQuery: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onApplySearchQuery,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const popularTags = [
    'Kurta Sets',
    'Anarkali',
    'Designer Suits',
    'Kids Wear',
    'Cardigans',
    'Luxury Towels',
    'Bedsheets',
    'Western Wear',
  ];

  const searchResults = searchTerm.trim()
    ? products.filter((p) => {
        const q = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.subCategoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : [];

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
    onApplySearchQuery(tag);
    onClose();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onApplySearchQuery(searchTerm);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-warm-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-warm-200 overflow-hidden text-warm-900">
        {/* Search Header Form */}
        <form onSubmit={handleSearchSubmit} className="p-4 sm:p-5 border-b border-warm-200/80 flex items-center space-x-3 bg-cream-50">
          <Search size={20} className="text-warm-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search women's wear, kurta sets, kids towels, bedsheets..."
            className="w-full bg-transparent text-sm sm:text-base font-sans text-warm-900 placeholder:text-warm-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="p-1 text-warm-400 hover:text-warm-700"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 text-xs uppercase font-sans tracking-wider text-warm-500 hover:text-warm-900 font-semibold"
          >
            Esc
          </button>
        </form>

        {/* Content Area */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto space-y-6 text-left">
          {/* Popular Tag Pills */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-warm-500 font-sans font-semibold block">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="px-3 py-1 rounded-lg text-xs font-sans bg-cream-100 hover:bg-blush-100 text-warm-700 hover:text-blush-700 border border-warm-200/60 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Preview */}
          {searchTerm.trim() && (
            <div className="space-y-3 pt-2 border-t border-warm-100">
              <div className="flex items-center justify-between text-xs font-sans text-warm-500">
                <span>Matching Designs ({searchResults.length})</span>
                {searchResults.length > 0 && (
                  <button
                    onClick={handleSearchSubmit}
                    className="text-blush-600 font-semibold hover:underline flex items-center space-x-1"
                  >
                    <span>View all matching</span>
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>

              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="flex items-center space-x-3.5 p-2.5 rounded-xl hover:bg-cream-100/70 border border-transparent hover:border-warm-200 transition-all cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-14 object-cover object-top rounded-lg bg-warm-100 border border-warm-200"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-warm-400 font-sans block">
                          {product.subCategoryLabel}
                        </span>
                        <h4 className="font-serif text-sm font-medium text-warm-900 truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs font-sans text-warm-500">
                          <span>{product.fabric}</span>
                          <span>·</span>
                          <span className="flex items-center text-amber-500 text-[11px]">
                            <Star size={11} className="fill-amber-400 text-amber-400 mr-0.5" />
                            {product.rating}
                          </span>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-warm-400" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-warm-500 py-4 text-center font-sans">
                  No matching designs found for "{searchTerm}". Try a different keyword.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
