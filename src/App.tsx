import React from 'react';
import { Product, CartItem, FilterState, SortOption, ComparisonMode } from './types';
import { PRODUCTS } from './data/products';
import Header from './components/Header';
import Navbar from './components/Navbar';
import HeroVideo from './components/HeroVideo';
import PromoTiles from './components/PromoTiles';
import ProductCard from './components/ProductCard';
import SidebarFilters from './components/SidebarFilters';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ComparisonPanel from './components/ComparisonPanel';
import ExpressCheckoutModal from './components/ExpressCheckoutModal';
import ExitIntentModal from './components/ExitIntentModal';
import FloatingCartBar from './components/FloatingCartBar';
import FrequentlyBoughtTogether from './components/FrequentlyBoughtTogether';
import { Sparkles, ArrowRight, ShieldCheck, Heart, ShoppingBag, Grid, AlertTriangle, ChevronRight, HelpCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_FILTERS: FilterState = {
  categories: [],
  subcategories: [],
  colors: [],
  sizes: [],
  priceRange: [0, 100],
  searchQuery: '',
  minDiscount: 0
};

export default function App() {
  // Page States
  const [currentPage, setCurrentPage] = React.useState<'home' | 'shop'>('home');
  const [comparisonMode, setComparisonMode] = React.useState<ComparisonMode>('optimized');

  // Interactive Cart & Wishlist States
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [wishlist, setWishlist] = React.useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = React.useState(false);
  
  // CRO Express Checkout & Exit-Intent Promo States
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const [isExitIntentOpen, setIsExitIntentOpen] = React.useState(false);
  const [exitIntentTriggered, setExitIntentTriggered] = React.useState(false);
  const [promoCodeApplied, setPromoCodeApplied] = React.useState<string | null>(null);

  // Exit-intent mouse leave detector
  React.useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && cart.length > 0 && !exitIntentTriggered && !isCheckoutOpen) {
        setIsExitIntentOpen(true);
        setExitIntentTriggered(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [cart.length, exitIntentTriggered, isCheckoutOpen]);

  // Handle Bundle Addition to Cart
  const handleAddBundleToCart = (products: Product[]) => {
    products.forEach((prod) => {
      handleAddToCart(prod, prod.colors[0], prod.sizes[0]);
    });
    setPromoCodeApplied('BUNDLE10');
    setIsCartOpen(true);
  };

  // Search & Filter States
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filters, setFilters] = React.useState<FilterState>(INITIAL_FILTERS);
  const [sortOption, setSortOption] = React.useState<SortOption>('Relevance');
  
  // Design testing parameters
  const [isSimulatedEmpty, setIsSimulatedEmpty] = React.useState(false);

  // Active Category / Subcategory selected from navigation dropdowns
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<string | null>(null);

  // Sync Global Search Query into filters
  React.useEffect(() => {
    setFilters((prev) => ({ ...prev, searchQuery }));
  }, [searchQuery]);

  // Handle Cart Transactions
  const handleAddToCart = (product: Product, color?: { name: string; hex: string }, size?: string) => {
    setCart((prevCart) => {
      // Find matching item with identical color & size characteristics
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          (!color || item.selectedColor?.name === color.name) &&
          (!size || item.selectedSize === size)
      );

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      }

      return [
        ...prevCart,
        {
          product,
          quantity: 1,
          selectedColor: color,
          selectedSize: size
        }
      ];
    });
    // Trigger small cart open delay to provide visual feedback
    setTimeout(() => {
      setIsCartOpen(true);
    }, 300);
  };

  const handleUpdateCartQuantity = (id: string, quantity: number, colorName?: string, sizeName?: string) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        const matchesColor = !colorName || item.selectedColor?.name === colorName;
        const matchesSize = !sizeName || item.selectedSize === sizeName;
        if (item.product.id === id && matchesColor && matchesSize) {
          return { ...item, quantity: Math.max(1, quantity) };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (id: string, colorName?: string, sizeName?: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => {
        const matchesColor = !colorName || item.selectedColor?.name === colorName;
        const matchesSize = !sizeName || item.selectedSize === sizeName;
        return !(item.product.id === id && matchesColor && matchesSize);
      })
    );
  };

  const handleClearCart = () => setCart([]);

  // Handle Wishlist Transactions
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyWishlisted = prevWishlist.some((item) => item.id === product.id);
      if (isAlreadyWishlisted) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  // Handle Nav/Category redirection
  const handleSelectCategoryFromNavbar = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
    setSelectedSubcategory(null);
    setFilters((prev) => ({
      ...prev,
      categories: categoryName ? [categoryName] : [],
      subcategories: []
    }));
  };

  const handleSelectSubcategoryFromNavbar = (subcategoryName: string | null) => {
    setSelectedSubcategory(subcategoryName);
    setFilters((prev) => ({
      ...prev,
      subcategories: subcategoryName ? [subcategoryName] : []
    }));
  };

  const handleExploreFromPromo = (category: string, subcategory?: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory || null);
    setFilters((prev) => ({
      ...prev,
      categories: [category],
      subcategories: subcategory ? [subcategory] : []
    }));
    setCurrentPage('shop');
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setFilters({
      categories: [],
      subcategories: [],
      colors: [],
      sizes: [],
      priceRange: [0, 100],
      searchQuery: '',
      minDiscount: 0
    });
    setIsSimulatedEmpty(false);
  };

  // Filter & Sort Logic Pipeline
  const filteredProducts = React.useMemo(() => {
    if (isSimulatedEmpty) return [];

    let result = [...PRODUCTS];

    // Category Filter
    if (selectedCategory === 'Sale') {
      if (filters.categories.length > 0) {
        result = result.filter((prod) => prod.category === 'Sale' && filters.categories.includes(prod.subcategory));
      } else {
        result = result.filter((prod) => prod.category === 'Sale');
      }
    } else if (selectedCategory === 'New') {
      result = result.filter((prod) => prod.isNew || prod.category === 'New');
    } else if (selectedCategory === 'Brand') {
      result = result.filter((prod) => prod.category === 'Brand');
    } else if (selectedCategory === 'Collections') {
      result = result.filter((prod) => prod.category === 'Collections');
    } else if (filters.categories.length > 0) {
      result = result.filter((prod) => filters.categories.includes(prod.category));
    }

    // Subcategory Filter (only if not on Sale or Collections root view)
    if (filters.subcategories.length > 0 && selectedCategory !== 'Sale') {
      result = result.filter((prod) => filters.subcategories.includes(prod.subcategory));
    }

    // Minimum Discount Filter (Sale page only)
    if (selectedCategory === 'Sale' && filters.minDiscount && filters.minDiscount > 0) {
      result = result.filter((prod) => {
        if (prod.isSale && prod.salePrice) {
          const discountPct = Math.round(((prod.price - prod.salePrice) / prod.price) * 100);
          return discountPct >= (filters.minDiscount || 0);
        }
        return false;
      });
    }

    // Colors Filter
    if (filters.colors.length > 0) {
      result = result.filter((prod) =>
        prod.colors.some((color) => filters.colors.includes(color.name))
      );
    }

    // Sizes Filter
    if (filters.sizes.length > 0) {
      result = result.filter((prod) =>
        prod.sizes.some((size) => filters.sizes.includes(size))
      );
    }

    // Price Filter
    const maxPrice = filters.priceRange[1];
    result = result.filter((prod) => {
      const activePrice = prod.isSale && prod.salePrice ? prod.salePrice : prod.price;
      return activePrice <= maxPrice;
    });

    // Search Query Filter
    if (filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (prod) =>
          prod.name.toLowerCase().includes(query) ||
          prod.subcategory.toLowerCase().includes(query) ||
          prod.description.toLowerCase().includes(query)
      );
    }

    // Sort Ordering
    switch (sortOption) {
      case 'A-Z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Price-Asc':
        result.sort((a, b) => {
          const aPrice = a.isSale && a.salePrice ? a.salePrice : a.price;
          const bPrice = b.isSale && b.salePrice ? b.salePrice : b.price;
          return aPrice - bPrice;
        });
        break;
      case 'Price-Desc':
        result.sort((a, b) => {
          const aPrice = a.isSale && a.salePrice ? a.salePrice : a.price;
          const bPrice = b.isSale && b.salePrice ? b.salePrice : b.price;
          return bPrice - aPrice;
        });
        break;
      case 'BestSellers':
        result = result.filter((p) => p.isBestSeller || p.rating >= 4.8);
        break;
      case 'New':
        result = result.filter((p) => p.isNew);
        break;
      default:
        // Relevance - default order
        if (selectedCategory === 'Sale') {
          // Default sort: Best discount percentage first
          result.sort((a, b) => {
            const aDiscount = a.isSale && a.salePrice ? (a.price - a.salePrice) / a.price : 0;
            const bDiscount = b.isSale && b.salePrice ? (b.price - b.salePrice) / b.price : 0;
            return bDiscount - aDiscount;
          });
        }
        break;
    }

    return result;
  }, [filters, sortOption, isSimulatedEmpty]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900 antialiased font-sans selection:bg-blue-100 selection:text-blue-950">
      
      {/* Dynamic Header & Sticky Top row */}
      <div className="z-40">
        <Header
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          wishlistCount={wishlist.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNavigate={setCurrentPage}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategoryFromNavbar}
        />

        {/* Dropdown Navigation Bar */}
        <Navbar
          onSelectCategory={handleSelectCategoryFromNavbar}
          onSelectSubcategory={handleSelectSubcategoryFromNavbar}
          onNavigate={setCurrentPage}
          activeCategory={selectedCategory}
          activeSubcategory={selectedSubcategory}
        />
      </div>

      {/* Main Core Section */}
      <main className="flex-1">
        {currentPage === 'home' ? (
          /* HOMEPAGE VIEW */
          <div className="space-y-0 animate-in fade-in duration-500">
            {/* Hero Section with looping video overlay */}
            <HeroVideo
              onShopNew={() => {
                handleSelectCategoryFromNavbar('New');
                setCurrentPage('shop');
              }}
              comparisonMode={comparisonMode}
            />

            {/* Quick Link Category Rails */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
              >
                <div className="inline-flex items-center gap-2 mb-2 text-[10px] font-mono tracking-[0.2em] uppercase text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e10600]"></span>
                  <span>ENGINEERED CATEGORIES</span>
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-[#e10600] block">Quick Department Rails</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1 font-display">
                  Crafted Merchandise Ecosystem
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal">
                  Select from our audited, premium departments engineered for exceptional longevity.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                {/* Apparel Card */}
                <motion.button
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleExploreFromPromo('Apparel')}
                  className="group rounded-2xl overflow-hidden aspect-video relative text-left border border-slate-200/90 shadow-xs focus:outline-hidden hover:shadow-[0_20px_40px_-15px_rgba(225,6,0,0.15)] hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <span className="absolute top-0 left-0 w-0 h-[2.5px] bg-[#e10600] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-30"></span>
                  <img
                    src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80"
                    alt="Apparel department"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-5 left-5 text-white">
                    <span className="text-[10px] uppercase tracking-wider font-black text-red-300">Sustainable Wear</span>
                    <h3 className="text-base sm:text-lg font-black mt-0.5 font-display">Organic Apparel</h3>
                    <span className="text-xs font-semibold text-slate-200 mt-2 flex items-center gap-1 group-hover:text-red-200 transition-colors">
                      Shop Collection <ChevronRight className="w-3.5 h-3.5 text-[#e10600] group-hover:translate-x-1.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    </span>
                  </div>
                </motion.button>

                {/* Lifestyle Card */}
                <motion.button
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleExploreFromPromo('Lifestyle')}
                  className="group rounded-2xl overflow-hidden aspect-video relative text-left border border-slate-200/90 shadow-xs focus:outline-hidden hover:shadow-[0_20px_40px_-15px_rgba(225,6,0,0.15)] hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <span className="absolute top-0 left-0 w-0 h-[2.5px] bg-[#e10600] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-30"></span>
                  <img
                    src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80"
                    alt="Lifestyle department"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-5 left-5 text-white">
                    <span className="text-[10px] uppercase tracking-wider font-black text-red-300">Modern Living</span>
                    <h3 className="text-base sm:text-lg font-black mt-0.5 font-display">Drinkware & Hydration</h3>
                    <span className="text-xs font-semibold text-slate-200 mt-2 flex items-center gap-1 group-hover:text-red-200 transition-colors">
                      Shop Collection <ChevronRight className="w-3.5 h-3.5 text-[#e10600] group-hover:translate-x-1.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    </span>
                  </div>
                </motion.button>

                {/* Stationery Card */}
                <motion.button
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleExploreFromPromo('Stationery')}
                  className="group rounded-2xl overflow-hidden aspect-video relative text-left border border-slate-200/90 shadow-xs focus:outline-hidden hover:shadow-[0_20px_40px_-15px_rgba(225,6,0,0.15)] hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <span className="absolute top-0 left-0 w-0 h-[2.5px] bg-[#e10600] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-30"></span>
                  <img
                    src="https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=80"
                    alt="Stationery department"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-5 left-5 text-white">
                    <span className="text-[10px] uppercase tracking-wider font-black text-red-300">Creative Stationery</span>
                    <h3 className="text-base sm:text-lg font-black mt-0.5 font-display">Notebooks & Journals</h3>
                    <span className="text-xs font-semibold text-slate-200 mt-2 flex items-center gap-1 group-hover:text-red-200 transition-colors">
                      Shop Collection <ChevronRight className="w-3.5 h-3.5 text-[#e10600] group-hover:translate-x-1.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    </span>
                  </div>
                </motion.button>
              </div>
            </section>

            {/* Redesigned Promos & Partnerships Grid Row */}
            <PromoTiles
              comparisonMode={comparisonMode}
              onExplore={handleExploreFromPromo}
            />

            {/* CRO Trending Product Bundle Widget */}
            {comparisonMode === 'optimized' && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <FrequentlyBoughtTogether
                  primaryProduct={PRODUCTS[0]}
                  bundleProduct={PRODUCTS[2]}
                  onAddBundleToCart={handleAddBundleToCart}
                />
              </section>
            )}

            {/* Quick Best Sellers Grid for homepage engagement */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 border-b border-slate-200 pb-5"
              >
                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 mb-1 text-[10px] font-mono tracking-[0.2em] uppercase text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e10600] animate-ping"></span>
                    <span>LIVE VELOCITY</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight font-display">Trending Items Right Now</h2>
                  <p className="text-xs text-slate-500 mt-1 font-normal">Bestselling organic apparel and modular stationery loved by our global community.</p>
                </div>
                <button
                  onClick={() => {
                    handleClearAllFilters();
                    setCurrentPage('shop');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-black tracking-wider uppercase text-slate-900 hover:text-[#e10600] transition-colors duration-300 group"
                  id="view-all-merch-btn"
                >
                  <span>View Full Catalog</span>
                  <ArrowRight className="w-4 h-4 text-[#e10600] group-hover:translate-x-1.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </button>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {PRODUCTS.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    comparisonMode={comparisonMode}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlist.some((item) => item.id === product.id)}
                  />
                ))}
              </div>
            </section>

            {/* Trust Badges Bar (Ferrari Performance Dark Finish) */}
            <section className="bg-[#0a0a0c] text-white py-14 px-6 border-t border-slate-800 relative overflow-hidden">
              {/* Subtle speed glow background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(225,6,0,0.08)_0%,transparent_60%)] pointer-events-none"></div>

              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left relative z-10">
                <div className="space-y-2.5 max-w-sm mx-auto sm:mx-0 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e10600] animate-pulse"></span>
                    <span className="text-red-400 font-black uppercase text-[10px] tracking-widest block font-mono">Carbon Neutral</span>
                  </div>
                  <h4 className="text-base font-black tracking-tight font-display text-white">Eco-Standard Deliveries</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">We offset 100% of greenhouse gases from shipping so your carbon print remains strictly pristine.</p>
                </div>
                <div className="space-y-2.5 max-w-sm mx-auto sm:mx-0 border-y md:border-y-0 md:border-x border-slate-800/80 py-6 md:py-4 md:px-8 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e10600] animate-pulse"></span>
                    <span className="text-red-400 font-black uppercase text-[10px] tracking-widest block font-mono">Bespoke Quality</span>
                  </div>
                  <h4 className="text-base font-black tracking-tight font-display text-white">Reinforced French Terry</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">We design with raw organic cotton loops and premium stitching designed to handle thousands of wash cycles.</p>
                </div>
                <div className="space-y-2.5 max-w-sm mx-auto sm:mx-0 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e10600] animate-pulse"></span>
                    <span className="text-red-400 font-black uppercase text-[10px] tracking-widest block font-mono">Complete Trust</span>
                  </div>
                  <h4 className="text-base font-black tracking-tight font-display text-white">30-Day Flexible Return Window</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">Changed your mind? We provide pre-paid postage labels for immediate, hassle-free exchanges with no questions asked.</p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* CATEGORY / LISTING PAGE VIEW */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            {/* Breadcrumb Navigation trail */}
            <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-6 select-none" aria-label="Breadcrumb">
              <button onClick={() => { setCurrentPage('home'); handleClearAllFilters(); }} className="hover:text-blue-600 transition-colors">
                Home
              </button>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <button
                onClick={() => {
                  setSelectedSubcategory(null);
                  setFilters((p) => ({ ...p, subcategories: [] }));
                }}
                className={`${selectedCategory ? 'text-slate-500 hover:text-blue-600' : 'text-slate-900 font-black'}`}
                disabled={!selectedCategory}
              >
                {selectedCategory || 'All Catalog'}
              </button>
              {selectedCategory && selectedSubcategory && (
                <>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                  <span className="text-slate-900 font-black">{selectedSubcategory}</span>
                </>
              )}
            </nav>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left-hand SidebarFilters */}
              <SidebarFilters
                filters={filters}
                onFiltersChange={setFilters}
                sortOption={sortOption}
                onSortChange={setSortOption}
                onClearFilters={handleClearAllFilters}
                onSimulateEmpty={() => setIsSimulatedEmpty(!isSimulatedEmpty)}
                isSimulatedEmpty={isSimulatedEmpty}
                totalProducts={filteredProducts.length}
                selectedCategory={selectedCategory}
              />

              {/* Right-hand Products List Container */}
              <div className="flex-1 w-full space-y-6">
                
                {/* 1. Leftover Empty-State Bug Alert Box (CRITICAL P0 AUDIT REQUIREMENT) */}
                {comparisonMode === 'audited' && (
                  <div className="bg-amber-50 border-2 border-amber-300 text-amber-900 rounded-2xl p-4 flex gap-3 shadow-md animate-bounce" id="orphaned-bug-alert">
                    <AlertTriangle className="w-5.5 h-5.5 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                    <div className="text-xs">
                      <span className="font-extrabold uppercase tracking-wide block">AUDIT ISSUE DETECTED (FR2): Orphaned Empty State String</span>
                      <p className="font-semibold text-amber-700 mt-1">
                        &ldquo;There are no products to display&rdquo;
                      </p>
                      <p className="text-[10px] text-amber-600 mt-1 font-medium leading-relaxed">
                        This string erroneously renders on populated pages in the original store, confusing shoppers and indicating an unpolished, broken interface. In <strong>Optimized Mode</strong>, this conditional bug is fully fixed.
                      </p>
                    </div>
                  </div>
                )}

                {/* BANNERS / SECTION TILES FOR SPECIAL PAGES */}
                
                {/* SECTION 1: New Page Banner */}
                {selectedCategory === 'New' && (
                  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md">
                    <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute left-0 bottom-0 -translate-x-12 translate-y-12 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
                    <div className="relative z-10 max-w-xl space-y-3">
                      <span className="bg-blue-500/30 border border-blue-400/40 text-blue-100 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                        Just Dropped This Week
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                        Fresh Merchandise Arrivals
                      </h2>
                      <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
                        Genuinely fresh products mixed across apparel, stationery, and lifestyle accessories. Restocked and ready as of Wednesday, July 15, 2026.
                      </p>
                    </div>
                  </div>
                )}

                {/* SECTION 2: Shop by Brand Tiles */}
                {selectedCategory === 'Brand' && (
                  <div className="space-y-4">
                    <div className="bg-slate-100/60 border border-slate-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-black text-slate-850 tracking-tight uppercase">Shop by Brand</h2>
                        <p className="text-xs text-slate-500 font-medium mt-1">Explore our exclusive collections designed for Google Core, Cloud, Play, and experimental Labs.</p>
                      </div>
                      {selectedSubcategory && (
                        <button
                          onClick={() => {
                            setSelectedSubcategory(null);
                            setFilters((prev) => ({ ...prev, subcategories: [] }));
                          }}
                          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-xl shadow-xs transition-all self-start sm:self-center font-bold"
                        >
                          Show All Brands
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" id="brand-tiles-grid">
                      {[
                        {
                          name: 'Core',
                          color: 'border-blue-100 hover:border-blue-300 bg-blue-50/5',
                          text: 'text-blue-600',
                          accent: 'bg-blue-500',
                          img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=80',
                          tagline: 'Definitive Google Classics'
                        },
                        {
                          name: 'Cloud',
                          color: 'border-sky-100 hover:border-sky-300 bg-sky-50/5',
                          text: 'text-sky-600',
                          accent: 'bg-sky-500',
                          img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&auto=format&fit=crop&q=80',
                          tagline: 'Architected for Scale'
                        },
                        {
                          name: 'Play',
                          color: 'border-emerald-100 hover:border-emerald-300 bg-emerald-50/5',
                          text: 'text-emerald-600',
                          accent: 'bg-emerald-500',
                          img: 'https://images.unsplash.com/photo-1606168094336-48f205276929?w=300&auto=format&fit=crop&q=80',
                          tagline: 'Unwind and Create'
                        },
                        {
                          name: 'Labs',
                          color: 'border-indigo-100 hover:border-indigo-300 bg-indigo-50/5',
                          text: 'text-indigo-600',
                          accent: 'bg-indigo-500',
                          img: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&auto=format&fit=crop&q=80',
                          tagline: 'Experimental Sandbox'
                        }
                      ].map((b) => {
                        const isActive = selectedSubcategory === b.name;
                        return (
                          <button
                            key={b.name}
                            onClick={() => {
                              if (isActive) {
                                setSelectedSubcategory(null);
                                setFilters((prev) => ({ ...prev, subcategories: [] }));
                              } else {
                                setSelectedSubcategory(b.name);
                                setFilters((prev) => ({ ...prev, subcategories: [b.name] }));
                              }
                            }}
                            className={`group relative text-left rounded-2xl overflow-hidden border-2 p-3 transition-all duration-300 focus:outline-hidden ${b.color} ${
                              isActive ? 'ring-4 ring-blue-500/15 border-blue-500 scale-102 shadow-md bg-white' : 'shadow-xs hover:shadow-md bg-white'
                            }`}
                          >
                            <div className="aspect-video rounded-lg overflow-hidden mb-2.5 relative">
                              <img
                                src={b.img}
                                alt={b.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-slate-900/10"></div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2.5 h-2.5 rounded-full ${b.accent}`}></span>
                              <span className={`text-xs font-black tracking-tight ${b.text}`}>{b.name}</span>
                            </div>
                            <p className="text-[9px] text-slate-500 mt-0.5 font-medium leading-tight">{b.tagline}</p>
                            {isActive && (
                              <span className="absolute top-2 right-2 bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-xs animate-in zoom-in-50 uppercase tracking-wider">
                                Filtered
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SECTION 4: Sale Page Banner */}
                {selectedCategory === 'Sale' && (
                  <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md">
                    <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute left-0 bottom-0 -translate-x-12 translate-y-12 w-48 h-48 bg-rose-400/20 rounded-full blur-2xl"></div>
                    <div className="relative z-10 max-w-xl space-y-3">
                      <span className="bg-white/25 border border-white/30 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                        Limited Time Special
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                        Up to 50% Off Select Styles
                      </h2>
                      <p className="text-xs sm:text-sm text-pink-50 font-medium leading-relaxed">
                        Premium Google accessories and heavyweight apparel on promotion. Use filters to sort by maximum discount range or specific departments.
                      </p>
                    </div>
                  </div>
                )}

                {/* MAIN GRID BLOCK OR COLLECTIONS REPLACEMENT */}
                {selectedCategory === 'Collections' && !selectedSubcategory ? (
                  /* SECTION 3: Collections Page (Cards Grid View) */
                  <div className="space-y-6">
                    <div className="bg-slate-100/60 border border-slate-200 rounded-3xl p-5 sm:p-6">
                      <h2 className="text-lg font-black text-slate-850 tracking-tight uppercase">Curated Collections</h2>
                      <p className="text-xs text-slate-500 font-medium mt-1">Explore our exclusive, sustainably crafted themed capsule wardrobes and accessory edits.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="collections-grid-view">
                      {[
                        {
                          name: 'Summer Edit',
                          desc: 'Unstructured caps, insulated coolers, and vibrant outdoor accents engineered for warmer days.',
                          img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
                          accent: 'border-amber-100 hover:border-amber-300 bg-amber-50/5',
                          badge: 'Seasonal Collection'
                        },
                        {
                          name: 'Sustainable Line',
                          desc: 'Organic cotton hoodies, biodegradable bamboo utensils, and post-consumer recycled fabrics.',
                          img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
                          accent: 'border-emerald-100 hover:border-emerald-300 bg-emerald-50/5',
                          badge: '100% Eco-Standard'
                        },
                        {
                          name: 'Campus Collection',
                          desc: 'Vintage-themed fleece sweatshirts and heavyweight wool-felt pennants celebrating collegiate pride.',
                          img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=80',
                          accent: 'border-red-100 hover:border-red-300 bg-red-50/5',
                          badge: 'Collegiate'
                        },
                        {
                          name: 'Pride Collection',
                          desc: 'Classic rainbow knit crew socks and premium organic tees stitched with love and bright spectrums.',
                          img: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=800&auto=format&fit=crop&q=80',
                          accent: 'border-indigo-100 hover:border-indigo-300 bg-indigo-50/5',
                          badge: 'Celebrate Spectrum'
                        },
                        {
                          name: 'Work From Anywhere',
                          desc: 'Foldable aluminum laptop stands, smart USB task lamps, and modular felt organizers.',
                          img: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80',
                          accent: 'border-blue-100 hover:border-blue-300 bg-blue-50/5',
                          badge: 'Remote Office'
                        }
                      ].map((c) => (
                        <div
                          key={c.name}
                          className={`rounded-3xl border overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-lg ${c.accent}`}
                        >
                          <div className="aspect-video w-full overflow-hidden relative">
                            <img
                              src={c.img}
                              alt={c.name}
                              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-slate-950/20"></div>
                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-slate-800 text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-xs">
                              {c.badge}
                            </span>
                          </div>
                          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-white">
                            <div className="space-y-2">
                              <h3 className="text-xl font-black text-slate-900 tracking-tight">{c.name}</h3>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed">{c.desc}</p>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedSubcategory(c.name);
                                setFilters((prev) => ({ ...prev, subcategories: [c.name] }));
                              }}
                              className="w-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-3.5 px-5 rounded-xl transition-all shadow-xs"
                            >
                              Shop the Collection
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Standard Product Listing Block */
                  <>
                    {/* Grid Header Info bar */}
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div className="flex items-center gap-2">
                        <Grid className="w-4.5 h-4.5 text-blue-600" />
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {selectedCategory === 'Brand' && selectedSubcategory
                            ? `${selectedSubcategory} Brand`
                            : selectedCategory === 'Collections' && selectedSubcategory
                            ? `${selectedSubcategory} Collection`
                            : `${selectedCategory || 'All'} Catalog`}{' '}
                          ({filteredProducts.length})
                        </span>
                      </div>
                      {searchQuery && (
                        <span className="text-xs text-slate-500 font-medium">
                          Results for &ldquo;<strong className="text-blue-700">{searchQuery}</strong>&rdquo;
                        </span>
                      )}
                    </div>

                    {/* 2. Grid Render / Actual Empty State conditional renderer */}
                    {filteredProducts.length === 0 ? (
                      /* Beautiful Fixed Empty State view when grid genuinely contains 0 items */
                      <div className="text-center py-16 sm:py-24 bg-slate-100/50 border border-slate-200 rounded-3xl p-6 flex flex-col items-center max-w-lg mx-auto" id="genuine-empty-state">
                        <div className="w-16 h-16 bg-blue-50 border border-blue-150 rounded-full flex items-center justify-center mb-4.5 text-blue-600 shadow-xs">
                          <ShoppingBag className="w-6 h-6 animate-pulse" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wide">No Merch Matches Your Filters</h3>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-sm font-medium">
                          We couldn't find any clothing, accessories, or notebooks matching your exact parameters. Try widening your price ranges or adjusting the color filters.
                        </p>
                        <button
                          onClick={handleClearAllFilters}
                          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wide py-3 px-6 rounded-xl transition-all shadow-md hover:scale-103"
                        >
                          Clear All Active Filters
                        </button>
                      </div>
                    ) : (
                      /* Product Grid */
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8" id="product-card-grid">
                        {filteredProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            comparisonMode={comparisonMode}
                            onAddToCart={handleAddToCart}
                            onToggleWishlist={handleToggleWishlist}
                            isWishlisted={wishlist.some((item) => item.id === product.id)}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer block */}
      <footer className="bg-[#070709] text-slate-400 py-16 sm:py-20 px-6 font-sans border-t border-slate-800/80 relative overflow-hidden" id="site-footer">
        {/* Subtle Ferrari red telemetry background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(225,6,0,0.04)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
          
          {/* Brand Info */}
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" id="footer-google-logo">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span className="text-base font-black text-white tracking-tight font-display">Google Merch</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-normal">
              A high-fidelity UX design prototype and sandbox developed for e-commerce conversion, trust optimization, and user testing.
            </p>
            <div className="text-[10px] text-slate-500 font-bold font-mono">
              © 2026 Google Merch Shop. All rights reserved.
            </div>
          </div>

          {/* Quick Departments Links */}
          <div className="space-y-3.5 text-xs">
            <h4 className="text-white font-black uppercase tracking-wider text-[11px] font-mono">Departments</h4>
            <ul className="space-y-2 font-normal">
              <li>
                <button onClick={() => handleExploreFromPromo('Apparel')} className="hover:text-white hover:translate-x-1 transition-all duration-200 focus:outline-hidden inline-flex items-center gap-1 group">
                  <span className="text-[#e10600] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Apparel & Fashion Accessories</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleExploreFromPromo('Lifestyle')} className="hover:text-white hover:translate-x-1 transition-all duration-200 focus:outline-hidden inline-flex items-center gap-1 group">
                  <span className="text-[#e10600] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Hydration & Drinkware Mugs</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleExploreFromPromo('Stationery')} className="hover:text-white hover:translate-x-1 transition-all duration-200 focus:outline-hidden inline-flex items-center gap-1 group">
                  <span className="text-[#e10600] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Eco-friendly Notebooks & Pens</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleExploreFromPromo('Sale')} className="hover:text-white text-rose-400 hover:translate-x-1 transition-all duration-200 focus:outline-hidden inline-flex items-center gap-1 group">
                  <span className="text-[#e10600] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Exclusive Sale Clearance Grid</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-3.5 text-xs">
            <h4 className="text-white font-black uppercase tracking-wider text-[11px] font-mono">Shopping Support</h4>
            <ul className="space-y-2 font-normal">
              <li className="hover:text-white hover:translate-x-1 cursor-pointer transition-all duration-200 inline-flex items-center gap-1 group">
                <span className="text-[#e10600] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                <span>Flexible Returns & Exchange</span>
              </li>
              <li className="hover:text-white hover:translate-x-1 cursor-pointer transition-all duration-200 inline-flex items-center gap-1 group">
                <span className="text-[#e10600] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                <span>Standard Carbon-Offset Shipping</span>
              </li>
              <li className="hover:text-white hover:translate-x-1 cursor-pointer transition-all duration-200 inline-flex items-center gap-1 group">
                <span className="text-[#e10600] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                <span>Sustainability Certifications</span>
              </li>
              <li className="hover:text-white hover:translate-x-1 cursor-pointer transition-all duration-200 inline-flex items-center gap-1 group">
                <span className="text-[#e10600] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                <span>Frequently Asked Questions (FAQ)</span>
              </li>
              <li className="hover:text-white hover:translate-x-1 cursor-pointer transition-all duration-200 inline-flex items-center gap-1 group">
                <span className="text-[#e10600] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                <span>Submit Store Feedback</span>
              </li>
            </ul>
          </div>

          {/* Contact Details / Newsletter */}
          <div className="space-y-3.5 text-xs">
            <h4 className="text-white font-black uppercase tracking-wider text-[11px] font-mono">Newsletter Updates</h4>
            <p className="text-slate-400 leading-normal font-normal">Subscribe to receive first-access alerts on exclusive collaborative designer collections.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="yashgoradia045@gmail.com"
                className="bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-[#e10600] flex-1 outline-hidden transition-colors"
                disabled
              />
              <button
                onClick={() => alert('Newsletter simulated! Thank you.')}
                className="bg-gradient-to-r from-[#e10600] to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-black py-2.5 px-4 rounded-xl text-[10px] uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(225,6,0,0.4)]"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer Component */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOpenCheckoutModal={() => setIsCheckoutOpen(true)}
        promoCodeApplied={promoCodeApplied}
        onApplyPromoCode={(code) => setPromoCodeApplied(code)}
      />

      {/* Wishlist Drawer Component */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Persistent Floating Bottom Quick-Add / Checkout Bar in Optimized Mode */}
      {comparisonMode === 'optimized' && (
        <FloatingCartBar
          cartItems={cart}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenCheckout={() => setIsCheckoutOpen(true)}
          promoCodeApplied={promoCodeApplied}
        />
      )}

      {/* 1-Page Express Guest Checkout Modal */}
      <ExpressCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onClearCart={handleClearCart}
        promoCodeApplied={promoCodeApplied}
      />

      {/* Exit-Intent Recapture Modal */}
      <ExitIntentModal
        isOpen={isExitIntentOpen}
        onClose={() => setIsExitIntentOpen(false)}
        onApplyDiscount={(code) => {
          setPromoCodeApplied(code);
          setIsCartOpen(true);
        }}
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* Floating Design Testing Control Center Panel */}
      <ComparisonPanel
        mode={comparisonMode}
        onChangeMode={setComparisonMode}
      />
    </div>
  );
}
