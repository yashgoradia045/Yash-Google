import React from 'react';
import { Product, ColorSwatch, ComparisonMode } from '../types';
import { Star, Heart, ShoppingCart, Check, Info } from 'lucide-react';
import { motion } from 'motion/react';

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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(225,6,0,0.12)] hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between group relative"
      id={`product-${product.id}`}
    >
      {/* Ferrari Racing Red Top Accent Line */}
      <span className="absolute top-0 left-0 w-0 h-[2.5px] bg-[#e10600] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-30"></span>

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
            <span className="bg-[#e10600] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs shadow-red-900/20">
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

        {/* Social Proof Live Badge with Ferrari Red Beacon */}
        {comparisonMode === 'optimized' && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-slate-900/90 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-md border border-white/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e10600] animate-ping"></span>
            <span>🔥 {Math.floor(12 + (product.reviews % 15))} viewing now</span>
          </div>
        )}

        {/* Wishlist Heart Selector */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-md shadow-md border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isWishlisted
              ? 'bg-rose-50 text-rose-550 border-rose-200 shadow-rose-200'
              : 'bg-white/90 hover:bg-white text-slate-400 hover:text-rose-500 border-slate-200 hover:scale-110'
          }`}
          id={`wishlist-toggle-${product.id}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 transition-transform duration-200 ${isWishlisted ? 'fill-rose-500 scale-110' : ''}`} />
        </button>

        {/* Images with Ferrari Ken Burns crossfade */}
        <div className="w-full h-full relative">
          {/* Primary image */}
          <img
            src={product.images[0]}
            alt={`${product.name} primary angle`}
            className={`absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              activeImageIndex === 0 ? 'opacity-100' : 'opacity-0'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Secondary image (Alt / Lifestyle Angle) */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} detailed view`}
              className={`absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeImageIndex === 1 ? 'opacity-100' : 'opacity-0'
              }`}
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {/* Image dot/capsule indicators in Optimized Mode */}
        {comparisonMode === 'optimized' && product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1 bg-black/40 backdrop-blur-xs px-2 py-1 rounded-full">
            {product.images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeImageIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`}
              ></span>
            ))}
          </div>
        )}

        {/* QUICK ADD TO CART OVERLAY (Only in Optimized Mode) */}
        {comparisonMode === 'optimized' ? (
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/75 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 flex justify-center items-center">
            <button
              onClick={handleQuickAdd}
              disabled={addedSuccess}
              className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase shadow-lg flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 ${
                addedSuccess
                  ? 'bg-emerald-600 text-white hover:bg-emerald-600'
                  : 'bg-gradient-to-r from-red-600 to-[#e10600] hover:from-red-500 hover:to-rose-600 text-white shadow-red-900/30 hover:shadow-[0_0_15px_rgba(225,6,0,0.4)]'
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
          <h4 className="text-sm font-bold text-slate-800 tracking-tight line-clamp-1 group-hover:text-[#e10600] transition-colors duration-300">
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
                  className={`w-4 h-4 rounded-full border shadow-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    selectedColor.name === color.name
                      ? 'ring-2 ring-[#e10600] ring-offset-1 scale-125'
                      : 'hover:scale-110'
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
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border transition-all duration-200 ${
                    selectedSize === size
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
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
                    <span className="text-base font-extrabold text-[#e10600]" id={`price-${product.id}`}>
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

          {/* Quick-add button in card footer */}
          {comparisonMode === 'optimized' && (
            <button
              onClick={handleQuickAdd}
              disabled={addedSuccess}
              className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-1.5 active:scale-95 ${
                addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-[#e10600] text-white hover:scale-105 hover:shadow-[0_4px_12px_rgba(225,6,0,0.3)]'
              }`}
              id={`quick-add-footer-${product.id}`}
              aria-label="Quick Add to Cart"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>+ Quick Add</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
