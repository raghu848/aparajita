import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ChevronRight, Phone } from 'lucide-react';
import { MainCategory, SubCategory } from '../types/store';
import { STORE_INFO } from '../data/storeData';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (main: MainCategory, sub?: SubCategory) => void;
  activeMainCategory: MainCategory;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onSelectCategory,
  activeMainCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (main: MainCategory, sub?: SubCategory, sectionId?: string) => {
    onSelectCategory(main, sub);
    setMobileMenuOpen(false);
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-warm-800 text-cream-50 py-1.5 px-4 text-center text-xs font-sans tracking-wide">
        <p className="flex items-center justify-center space-x-2">
          <span className="text-blush-300 font-medium">✦ Special Launch:</span>
          <span>Free Express Shipping Across India on Orders Above ₹1,999</span>
          <span className="hidden md:inline text-warm-400">|</span>
          <span className="hidden md:inline text-warm-300">Direct Studio Support: {STORE_INFO.phone}</span>
        </p>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-cream-50/95 backdrop-blur-md shadow-sm border-b border-warm-200/80 py-3.5'
            : 'bg-cream-50 border-b border-warm-200/50 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-warm-800 hover:text-warm-900 focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          {/* Store Logo / Name */}
          <div className="flex items-center space-x-3">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('all', 'all', 'hero');
              }}
              className="flex flex-col group"
            >
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.15em] text-warm-900 group-hover:text-blush-600 transition-colors">
                {STORE_INFO.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-warm-500 font-sans -mt-0.5">
                {STORE_INFO.tagline}
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-sans font-medium text-warm-700">
            <button
              onClick={() => handleNavClick('all', 'all', 'hero')}
              className={`hover:text-warm-900 transition-colors py-1 relative ${
                activeMainCategory === 'all' ? 'text-warm-900 font-semibold' : ''
              }`}
            >
              Home
              {activeMainCategory === 'all' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blush-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('women', 'all', 'women-section')}
              className={`hover:text-warm-900 transition-colors py-1 relative ${
                activeMainCategory === 'women' ? 'text-warm-900 font-semibold' : ''
              }`}
            >
              Women
              {activeMainCategory === 'women' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blush-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('kids', 'all', 'kids-section')}
              className={`hover:text-warm-900 transition-colors py-1 relative ${
                activeMainCategory === 'kids' ? 'text-warm-900 font-semibold' : ''
              }`}
            >
              Kids
              {activeMainCategory === 'kids' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blush-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('home', 'all', 'home-section')}
              className={`hover:text-warm-900 transition-colors py-1 relative ${
                activeMainCategory === 'home' ? 'text-warm-900 font-semibold' : ''
              }`}
            >
              Home & Living
              {activeMainCategory === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blush-500 rounded-full" />
              )}
            </button>

            <a
              href="#about-section"
              className="hover:text-warm-900 transition-colors py-1"
            >
              About
            </a>

            <a
              href="#contact-section"
              className="hover:text-warm-900 transition-colors py-1"
            >
              Contact
            </a>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-warm-700 hover:text-warm-900 hover:bg-cream-200/50 rounded-full transition-colors"
              aria-label="Search products"
              title="Search store"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Link */}
            <a
              href="#products"
              onClick={() => handleNavClick('all', 'all', 'products')}
              className="p-2 text-warm-700 hover:text-warm-900 hover:bg-cream-200/50 rounded-full transition-colors relative"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-blush-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-fade-in">
                  {wishlistCount}
                </span>
              )}
            </a>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className="p-2 text-warm-800 hover:text-warm-900 hover:bg-cream-200/50 rounded-full transition-colors relative flex items-center"
              aria-label="Shopping Cart"
              title="View Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-warm-900 text-cream-50 text-[10px] font-bold rounded-full flex items-center justify-center animate-fade-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-warm-900/40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-cream-50 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-warm-200">
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-warm-900">
                  {STORE_INFO.name}
                </span>
                <span className="block text-[10px] tracking-widest uppercase text-warm-500 font-sans">
                  {STORE_INFO.tagline}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-warm-600 hover:text-warm-900"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="space-y-1 font-sans">
              <button
                onClick={() => handleNavClick('all', 'all', 'hero')}
                className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-warm-800 hover:bg-cream-200/60 flex items-center justify-between"
              >
                <span>Home</span>
                <ChevronRight size={16} className="text-warm-400" />
              </button>

              <button
                onClick={() => handleNavClick('women', 'all', 'women-section')}
                className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-warm-800 hover:bg-cream-200/60 flex items-center justify-between"
              >
                <span>Women's Collection</span>
                <ChevronRight size={16} className="text-warm-400" />
              </button>

              <button
                onClick={() => handleNavClick('kids', 'all', 'kids-section')}
                className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-warm-800 hover:bg-cream-200/60 flex items-center justify-between"
              >
                <span>Kids Collection</span>
                <ChevronRight size={16} className="text-warm-400" />
              </button>

              <button
                onClick={() => handleNavClick('home', 'all', 'home-section')}
                className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-warm-800 hover:bg-cream-200/60 flex items-center justify-between"
              >
                <span>Home & Living</span>
                <ChevronRight size={16} className="text-warm-400" />
              </button>

              <div className="pt-2 border-t border-warm-200 space-y-1">
                <a
                  href="#about-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 text-sm text-warm-600 hover:text-warm-900"
                >
                  About Our Studio
                </a>
                <a
                  href="#contact-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 text-sm text-warm-600 hover:text-warm-900"
                >
                  Contact & Location
                </a>
              </div>
            </nav>
          </div>

          {/* Mobile Footer details */}
          <div className="pt-6 border-t border-warm-200 space-y-2 text-xs text-warm-600 font-sans">
            <p className="flex items-center space-x-2">
              <Phone size={14} className="text-blush-500" />
              <a href={`tel:${STORE_INFO.phone}`} className="hover:text-warm-900">
                {STORE_INFO.phone}
              </a>
            </p>
            <p className="text-[11px] text-warm-500">{STORE_INFO.shortAddress}</p>
          </div>
        </div>
      </div>
    </>
  );
};
