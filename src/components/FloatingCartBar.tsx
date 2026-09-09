import React from 'react';
import { CartItem } from '../types';
import { ShoppingCart, ArrowRight, ShieldCheck, Gift } from 'lucide-react';

interface FloatingCartBarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenCheckout: () => void;
  promoCodeApplied: string | null;
}

export default function FloatingCartBar({
  cartItems,
  onOpenCart,
  onOpenCheckout,
  promoCodeApplied
}: FloatingCartBarProps) {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (totalItems === 0) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => {
    const price = item.product.isSale && item.product.salePrice ? item.product.salePrice : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const discountAmount = promoCodeApplied ? rawSubtotal * 0.10 : 0;
  const subtotal = rawSubtotal - discountAmount;
  const freeShippingUnlocked = subtotal >= 50;

  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 z-40 max-w-xl mx-auto sm:mx-0 font-sans animate-in slide-in-from-bottom-6 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl shadow-2xl p-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-3 group">
        
        {/* Left Side: Items & Subtotal */}
        <div
          onClick={onOpenCart}
          className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-xs">
              {totalItems}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wide text-white">
                {totalItems} Item{totalItems !== 1 ? 's' : ''} in Cart
              </span>
              {freeShippingUnlocked ? (
                <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md border border-emerald-500/30">
                  Free Shipping!
                </span>
              ) : (
                <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                  Add ${(50 - subtotal).toFixed(2)} for Free Shipping
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm font-black text-emerald-400 font-mono">
                ${subtotal.toFixed(2)}
              </span>
              {promoCodeApplied && (
                <span className="text-[9px] bg-rose-500/20 text-rose-300 font-bold px-1.5 py-0.5 rounded-md border border-rose-500/30">
                  10% OFF ({promoCodeApplied})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Primary CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCart}
            className="hidden sm:flex text-xs text-slate-300 hover:text-white font-bold underline px-2 py-1"
          >
            View Cart
          </button>
          
          <button
            onClick={onOpenCheckout}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-md transition-all hover:scale-103 flex items-center gap-1.5 shrink-0"
            id="floating-checkout-btn"
          >
            <span>Express Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
