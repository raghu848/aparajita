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
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PRODUCTS } from './data/storeData';
import { Product, CartItem, MainCategory, SubCategory } from './types/store';

export const App: React.FC = () => {
  // Navigation & Category Filtering State
  const [activeMainCategory, setActiveMainCategory] = useState<MainCategory>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Wishlist State with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aparajita_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aparajita_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aparajita_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aparajita_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Cart handlers
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    size?: string,
    color?: string
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            quantity,
            selectedSize: size || product.sizes?.[0],
            selectedColor: color || product.colors?.[0],
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  // Category selection handler with auto-scroll to Product Grid
  const handleSelectCategory = (main: MainCategory, sub: SubCategory = 'all') => {
    setActiveMainCategory(main);
    setActiveSubCategory(sub);
    setSearchQuery('');

    // Smooth scroll to product grid
    setTimeout(() => {
      const el = document.getElementById('products');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Subcategory click from promotional sections
  const handleSubCategoryClick = (sub: SubCategory) => {
    // Determine main category
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

  const totalCartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-warm-900 font-sans flex flex-col selection:bg-blush-200 selection:text-warm-900">
      {/* Sticky Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
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

        {/* Category Navigation Bar (Quick jumping between Women, Kids, Home & Living) */}
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

        {/* Product Grid & Filtering Catalog */}
        <ProductGrid
          products={PRODUCTS}
          activeMainCategory={activeMainCategory}
          activeSubCategory={activeSubCategory}
          searchQuery={searchQuery}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={(p) => handleAddToCart(p, 1)}
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

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onExploreProducts={() => {
          handleResetFilters();
          const el = document.getElementById('products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

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
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />
    </div>
  );
};

export default App;
