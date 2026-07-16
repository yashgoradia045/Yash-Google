import React from 'react';
import { Product, ColorSwatch, ComparisonMode } from '../types';
import { Star, Heart, ShoppingCart, Check, Info } from 'lucide-react';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  comparisonMode: ComparisonMode;
  onAddToCart: (product: Product, color?: ColorSwatch, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductCard({
  product,
  comparisonMode,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}: ProductCardProps) {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const [selectedColor, setSelectedColor] = React.useState<ColorSwatch>(product.colors[0]);
  const [selectedSize, setSelectedSize] = React.useState<string>(product.sizes[0] || '');
  const [addedSuccess, setAddedSuccess] = React.useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, selectedSize);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  // Check if sale applies
  const displayPrice = product.isSale && product.salePrice ? product.salePrice : product.price;

  return (
    <div
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group relative"
      id={`product-${product.id}`}
    >
      {/* Product Image Stage */}
      <div
        className="relative aspect-square w-full overflow-hidden bg-slate-50 cursor-pointer"
        onMouseEnter={() => comparisonMode === 'optimized' && setActiveImageIndex(1)}
        onMouseLeave={() => comparisonMode === 'optimized' && setActiveImageIndex(0)}
        onClick={() => {
          if (comparisonMode === 'optimized') {
            setActiveImageIndex(activeImageIndex === 0 ? 1 : 0);
          }
        }}
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
              Best Seller
            </span>
          )}
          {product.isSale && (
            <span className="bg-rose-500 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Heart Selector */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-md shadow-md border transition-all ${
            isWishlisted
              ? 'bg-rose-50 text-rose-550 border-rose-100'
              : 'bg-white/90 hover:bg-white text-slate-400 hover:text-rose-500 border-slate-200 hover:scale-110'
          }`}
          id={`wishlist-toggle-${product.id}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Images with crossfade */}
        <div className="w-full h-full relative">
          {/* Primary image */}
          <img
            src={product.images[0]}
            alt={`${product.name} primary angle`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              activeImageIndex === 0 ? 'opacity-100' : 'opacity-0'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Secondary image (Alt / Lifestyle Angle) */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} detailed view`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                activeImageIndex === 1 ? 'opacity-100' : 'opacity-0'
              }`}
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {/* Image dot indicators in Optimized Mode */}
        {comparisonMode === 'optimized' && product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1 bg-black/35 backdrop-blur-xs px-2 py-1 rounded-full">
            {product.images.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  activeImageIndex === idx ? 'bg-white scale-120' : 'bg-white/50'
                }`}
              ></span>
            ))}
          </div>
        )}

        {/* QUICK ADD TO CART OVERLAY (Only in Optimized Mode) */}
        {comparisonMode === 'optimized' ? (
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex justify-center items-center">
            <button
              onClick={handleQuickAdd}
              disabled={addedSuccess}
              className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase shadow-lg flex items-center justify-center gap-1.5 transition-all ${
                addedSuccess
                  ? 'bg-emerald-600 text-white hover:bg-emerald-600'
                  : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-103'
              }`}
              id={`quick-add-${product.id}`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Quick Add to Cart</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Broken State Alert overlay explaining no Quick Add button is active */
          <div className="absolute bottom-2 left-2 z-10 bg-red-100 border border-red-200 rounded-md p-1 px-1.5 text-[9px] text-red-600 flex items-center gap-1">
            <Info className="w-3 h-3" />
            <span>Broken: No in-grid Quick Add</span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Rating row */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            {product.category === 'Brand' ? (
              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${
                product.subcategory === 'Core'
                  ? 'bg-blue-550/10 text-blue-600 border-blue-500/20'
                  : product.subcategory === 'Cloud'
                  ? 'bg-sky-550/10 text-sky-600 border-sky-500/20'
                  : product.subcategory === 'Play'
                  ? 'bg-emerald-550/10 text-emerald-600 border-emerald-500/20'
                  : 'bg-indigo-550/10 text-indigo-600 border-indigo-500/20'
              }`}>
                {product.subcategory} Brand
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
                {product.subcategory}
              </span>
            )}
            <div className="flex items-center gap-0.5 bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-200">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
              <span className="text-[10px] text-slate-600 font-bold leading-none">{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h4 className="text-sm font-bold text-slate-800 tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h4>

          {/* Color Selection Swatches */}
          {comparisonMode === 'optimized' && product.colors.length > 0 && (
            <div className="flex gap-1.5 items-center mt-2.5">
              <span className="text-[10px] text-slate-400 uppercase font-bold mr-1">Colors:</span>
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  className={`w-4 h-4 rounded-full border shadow-xs transition-all ${
                    selectedColor.name === color.name
                      ? 'ring-2 ring-blue-500 ring-offset-1 scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select color ${color.name}`}
                ></button>
              ))}
            </div>
          )}

          {/* Sizes swatches (Optimized) */}
          {comparisonMode === 'optimized' && product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
            <div className="flex gap-1 items-center mt-2 flex-wrap">
              <span className="text-[10px] text-slate-400 uppercase font-bold mr-1">Sizes:</span>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border transition-all ${
                    selectedSize === size
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing Block */}
        <div className="mt-4 pt-3.5 border-t border-slate-200 flex items-center justify-between gap-2">
          <div>
            {/* PRICING (CONDITIONAL RENDER BASED ON COMPARISON STATE) */}
            {comparisonMode === 'optimized' ? (
              <div className="flex items-baseline gap-1.5 animate-in fade-in duration-300">
                {product.isSale && product.salePrice ? (
                  <>
                    <span className="text-base font-extrabold text-blue-600" id={`price-${product.id}`}>
                      ${product.salePrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-base font-extrabold text-slate-900 animate-in fade-in duration-300" id={`price-${product.id}`}>
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            ) : (
              /* Audited State: Pricing bug rendering $0.00 */
              <div className="flex flex-col text-left">
                <span className="text-base font-extrabold text-red-600 tracking-tight" id={`price-broken-${product.id}`}>
                  $0.00
                </span>
                <span className="text-[9px] text-red-500 font-bold block leading-none">
                  Broken Price Bug!
                </span>
              </div>
            )}
            <span className="text-[10px] text-slate-400 block font-medium">Excl. taxes</span>
          </div>

          {/* Quick-add fallback icon button for Mobile in Optimized state */}
          {comparisonMode === 'optimized' && (
            <button
              onClick={handleQuickAdd}
              disabled={addedSuccess}
              className={`md:hidden p-2 rounded-xl text-white shadow-md hover:scale-105 transition-all ${
                addedSuccess ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              id={`quick-add-mobile-${product.id}`}
              aria-label="Quick Add to Cart"
            >
              {addedSuccess ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
