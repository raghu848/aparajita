import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { WomenSection } from './components/WomenSection';
import { KidsSection } from './components/KidsSection';
import { HomeLivingSection } from './components/HomeLivingSection';
import { ProductGrid } from './components/ProductGrid';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PRODUCTS } from './data/storeData';
import { Product, MainCategory, SubCategory } from './types/store';

export const App: React.FC = () => {
  // Navigation & Category Filtering State
  const [activeMainCategory, setActiveMainCategory] = useState<MainCategory>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Wishlist / Saved Favorites State
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aparajita_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aparajita_favorites', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  // Category selection handler with smooth scroll
  const handleSelectCategory = (main: MainCategory, sub: SubCategory = 'all') => {
    setActiveMainCategory(main);
    setActiveSubCategory(sub);
    setSearchQuery('');

    setTimeout(() => {
      const el = document.getElementById('products');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Subcategory click from promotional sections
  const handleSubCategoryClick = (sub: SubCategory) => {
    if (
      ['western-wear', 'ethnic-wear', 'kurta-sets', 'anarkali', 'designer-suits', 'party-wear'].includes(
        sub
      )
    ) {
      setActiveMainCategory('women');
    } else if (['kids-wear', 'cardigans', 'kids-towels', 'kids-bedsheets'].includes(sub)) {
      setActiveMainCategory('kids');
    } else {
      setActiveMainCategory('home');
    }
    setActiveSubCategory(sub);
    setSearchQuery('');

    setTimeout(() => {
      const el = document.getElementById('products');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleResetFilters = () => {
    setActiveMainCategory('all');
    setActiveSubCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-warm-900 font-sans flex flex-col selection:bg-blush-200 selection:text-warm-900">
      {/* Sticky Header */}
      <Header
        wishlistCount={wishlistIds.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={handleSelectCategory}
        activeMainCategory={activeMainCategory}
      />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <Hero
          onShopNow={(cat = 'all') => {
            handleSelectCategory(cat, 'all');
          }}
        />

        {/* Category Navigation Bar (Effortlessly browse between Women, Kids, Home & Living) */}
        <CategoryNav
          activeMainCategory={activeMainCategory}
          activeSubCategory={activeSubCategory}
          onSelectMainCategory={(main) => {
            setActiveMainCategory(main);
            setActiveSubCategory('all');
          }}
          onSelectSubCategory={(sub) => setActiveSubCategory(sub)}
        />

        {/* Women Section (Prominent Category Cards: Western, Ethnic, Kurta Sets, Anarkali, Designer Suits, Party Wear) */}
        <WomenSection onSelectCategory={handleSubCategoryClick} />

        {/* Kids Section (Kids Wear, Cardigans, Towels, Bedsheets) */}
        <KidsSection onSelectCategory={handleSubCategoryClick} />

        {/* Home & Living Section (Luxury Towels, Bedsheets) */}
        <HomeLivingSection onSelectCategory={handleSubCategoryClick} />

        {/* Product Grid / Catalog Showcase */}
        <ProductGrid
          products={PRODUCTS}
          activeMainCategory={activeMainCategory}
          activeSubCategory={activeSubCategory}
          searchQuery={searchQuery}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
          onResetFilters={handleResetFilters}
        />

        {/* About Section */}
        <AboutSection />

        {/* Contact & Studio Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Floating WhatsApp Action */}
      <WhatsAppButton />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        onApplySearchQuery={(q) => {
          setSearchQuery(q);
          const el = document.getElementById('products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Quick View Product Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />
    </div>
  );
};

export default App;
