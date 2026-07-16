import { Product, ColorSwatch } from '../types';
import { X, Heart, Trash2, ShoppingCart, Check } from 'lucide-react';
import React from 'react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color?: ColorSwatch, size?: string) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onAddToCart
}: WishlistDrawerProps) {
  const [addedItemIndex, setAddedItemIndex] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, product.colors[0], product.sizes[0] || '');
    setAddedItemIndex(product.id);
    setTimeout(() => {
      setAddedItemIndex(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans" id="wishlist-drawer-root">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                My Wishlist ({wishlistItems.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-105 transition-all"
              id="close-wishlist-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List items */}
          {wishlistItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400 border border-slate-200">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 uppercase">Your Wishlist is Empty</h3>
              <p className="text-xs text-slate-500 mt-1.5 max-w-xs leading-relaxed font-medium">
                Keep track of items you love by tapping the heart icon on any product tile. They will appear here for easy access.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wide py-3 px-6 rounded-xl transition-colors shadow-md"
              >
                Find Merch to Love
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {wishlistItems.map((product) => {
                const itemPrice = product.isSale && product.salePrice ? product.salePrice : product.price;

                return (
                  <div
                    key={product.id}
                    className="flex gap-4 border-b border-slate-200 pb-4 last:border-0"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Content details */}
                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <div className="flex items-center justify-between gap-1.5">
                          <h4 className="font-bold text-slate-800 tracking-tight leading-normal line-clamp-1">
                            {product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveFromWishlist(product)}
                            className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest block mt-0.5">
                          {product.subcategory}
                        </span>
                        <span className="font-extrabold text-slate-900 text-sm block mt-1.5">
                          ${itemPrice.toFixed(2)}
                        </span>
                      </div>

                      {/* Add to Cart quick button */}
                      <div className="mt-3.5">
                        <button
                          onClick={() => handleQuickAdd(product)}
                          disabled={addedItemIndex === product.id}
                          className={`w-full py-2 rounded-xl text-[10px] font-extrabold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-xs border ${
                            addedItemIndex === product.id
                              ? 'bg-emerald-600 text-white border-transparent'
                              : 'bg-white hover:bg-slate-50 text-blue-600 border-slate-250 hover:text-blue-700'
                          }`}
                        >
                          {addedItemIndex === product.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added to Cart!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Move to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer view */}
          <div className="px-6 py-5 bg-slate-50 border-t border-slate-200 text-center">
            <p className="text-[10px] text-slate-400 leading-normal font-semibold">
              Items in your wishlist are saved locally to your device and will persist across sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
