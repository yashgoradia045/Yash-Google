import React from 'react';
import { ShoppingBag, Heart, Search, User, Globe, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigate: (page: 'home' | 'shop') => void;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD ($)' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD ($)' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP (£)' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR (€)' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY (¥)' }
];

export default function Header({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  onNavigate,
  selectedCategory,
  onSelectCategory
}: HeaderProps) {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(COUNTRIES[0]);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 font-sans shadow-xs" id="site-header">
      {/* Top micro-bar for marketing */}
      <div className="bg-slate-900 text-white text-[11px] py-2 px-4 text-center font-medium tracking-wide flex justify-between items-center px-6 md:px-12">
        <div className="hidden md:block text-slate-400">Welcome to Google Merch Shop Prototype</div>
        <div className="mx-auto md:mx-0">
          ✨ Use promo code <span className="text-yellow-400 font-bold">TRUST2026</span> for 20% off apparel!
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-400">
          <span className="hover:text-white cursor-pointer">Support</span>
          <span className="hover:text-white cursor-pointer">Find a Store</span>
        </div>
      </div>

      {/* Google 4-Color Accent Stripe */}
      <div className="h-[3px] w-full flex" id="google-accent-stripe">
        <div className="bg-[#4285F4] flex-1"></div>
        <div className="bg-[#EA4335] flex-1"></div>
        <div className="bg-[#FBBC05] flex-1"></div>
        <div className="bg-[#34A853] flex-1"></div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            onNavigate('home');
            onSelectCategory(null);
          }}
          className="flex items-center gap-2.5 shrink-0 focus:outline-hidden group"
          id="brand-logo-btn"
        >
          <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 shrink-0" xmlns="http://www.w3.org/2000/svg" id="google-logo-icon">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          <div className="text-left leading-none">
            <div className="flex items-center gap-0.5 text-[19px] font-medium tracking-tight font-sans">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block mt-0.5">
              Merch Shop
            </span>
          </div>
        </button>

        {/* Center Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md relative" id="search-bar-container">
          <input
            type="text"
            placeholder="Search our modern apparel, drinkware & stationery..."
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              onNavigate('shop');
            }}
            className="w-full bg-slate-100/80 hover:bg-slate-200/55 focus:bg-white text-xs border border-transparent focus:border-slate-300 rounded-xl py-2.5 pl-10 pr-4 outline-none transition-all placeholder:text-slate-400 text-slate-800 focus:shadow-xs focus:ring-2 focus:ring-blue-500"
            id="search-input"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
              id="clear-search-btn"
            >
              Clear
            </button>
          )}
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-1 sm:gap-3.5">
          {/* Mobile Search Trigger */}
          <div className="md:hidden">
            <button
              onClick={() => {
                onNavigate('shop');
                // Auto-focus after navigating
                setTimeout(() => {
                  document.getElementById('mobile-search-input')?.focus();
                }, 100);
              }}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all"
              id="mobile-search-trigger"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Country / Currency Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setIsCountryDropdownOpen(!isCountryDropdownOpen);
                setIsProfileOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
              id="country-selector-btn"
            >
              <span>{selectedCountry.flag}</span>
              <span className="hidden sm:inline uppercase text-[11px] text-gray-600">{selectedCountry.code}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {isCountryDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-1.5 z-50 text-xs" id="country-dropdown">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                  Select Country
                </div>
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelectedCountry(country);
                                       }}
                    className="w-full flex items-center justify-between px-3.5 py-2 hover:bg-slate-50 text-slate-700 text-left transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </span>
                    {selectedCountry.code === country.code && (
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsCountryDropdownOpen(false);
              }}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all relative"
              id="profile-dropdown-btn"
            >
              <User className="w-5 h-5" />
              {isLoggedIn && (
                <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              )}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 text-xs text-slate-700" id="profile-dropdown">
                {isLoggedIn ? (
                  <>
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-semibold text-slate-900">Yash Goradia</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">yashgoradia045@gmail.com</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 hover:bg-slate-50">My Orders</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-slate-50">Wishlist Preferences</button>
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 border-t border-slate-100 mt-1"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-[11px] text-slate-500 mb-3">Sign in to sync your cart & track shipments</p>
                    <button
                      onClick={() => {
                        setIsLoggedIn(true);
                        setIsProfileOpen(false);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors shadow-xs"
                      id="sign-in-btn"
                    >
                      Sign In (Mock Account)
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Icon with Counter */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-gray-600 hover:text-rose-600 hover:bg-gray-50 rounded-xl transition-all relative"
            id="wishlist-btn"
            aria-label={`View Wishlist with ${wishlistCount} items`}
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-xs animate-bounce" id="wishlist-badge">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon with Counter */}
          <button
            onClick={onOpenCart}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all relative"
            id="cart-btn"
            aria-label={`View Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-xs" id="cart-badge">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Area (Revealed on Category page / when queried) */}
      <div className="md:hidden border-t border-slate-200 p-2.5 px-4 bg-slate-50 flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          id="mobile-search-input"
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            onNavigate('shop');
          }}
          className="w-full bg-white text-xs border border-slate-200 rounded-lg py-1.5 px-3 outline-none focus:border-blue-500 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="text-xs text-blue-600 font-semibold shrink-0"
          >
            Clear
          </button>
        )}
      </div>
    </header>
  );
}
