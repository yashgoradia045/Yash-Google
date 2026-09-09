import React from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Trash2, Plus, Minus, Check, Gift, Tag, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number, color?: string, size?: string) => void;
  onRemoveItem: (id: string, color?: string, size?: string) => void;
  onClearCart: () => void;
  onOpenCheckoutModal: () => void;
  promoCodeApplied: string | null;
  onApplyPromoCode: (code: string) => void;
}

const SHIPPING_THRESHOLD = 50;

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckoutModal,
  promoCodeApplied,
  onApplyPromoCode
}: CartDrawerProps) {
  const [couponInput, setCouponInput] = React.useState('');
  const [couponError, setCouponError] = React.useState(false);

  if (!isOpen) return null;

  // Calculate Subtotal (considering sales)
  const rawSubtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.product.isSale && item.product.salePrice ? item.product.salePrice : item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const discountAmount = promoCodeApplied ? rawSubtotal * 0.10 : 0;
  const subtotal = rawSubtotal - discountAmount;

  const shippingRemaining = Math.max(0, SHIPPING_THRESHOLD - subtotal);
  const percentToFreeShipping = Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      onApplyPromoCode(couponInput.trim());
      setCouponInput('');
      setCouponError(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans" id="cart-drawer-root">
      {/* Darkened backdrop overlay */}
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                My Shopping Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-105 transition-all"
              id="close-cart-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400 border border-slate-200">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 uppercase">Your Cart is Empty</h3>
              <p className="text-xs text-slate-500 mt-1.5 max-w-xs leading-relaxed font-medium">
                Looks like you haven't added any products to your cart yet. Explore our Apparel or Stationery collections to begin.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wide py-3 px-6 rounded-xl transition-colors shadow-md"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            /* Populated cart items view */
            <>
              {/* Shipping Progress Widget */}
              <div className="bg-blue-50 border-y border-blue-100 px-6 py-4 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-blue-900 font-bold leading-none">
                  <Gift className="w-4 h-4 text-blue-600" />
                  {shippingRemaining > 0 ? (
                    <span>Add <strong className="text-blue-600">${shippingRemaining.toFixed(2)}</strong> more for FREE Shipping!</span>
                  ) : (
                    <span className="text-emerald-700">Congratulations! You've unlocked FREE standard eco-shipping!</span>
                  )}
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      percentToFreeShipping === 100 ? 'bg-emerald-500 animate-pulse' : 'bg-blue-600'
                    }`}
                    style={{ width: `${percentToFreeShipping}%` }}
                  ></div>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {cartItems.map((item, index) => {
                  const itemPrice = item.product.isSale && item.product.salePrice ? item.product.salePrice : item.product.price;
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <div
                      key={`${item.product.id}-${item.selectedColor?.name || ''}-${item.selectedSize || ''}`}
                      className="flex gap-4 border-b border-slate-200 pb-4 last:border-0"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Item Info details */}
                      <div className="flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <h4 className="font-bold text-slate-800 tracking-tight leading-normal line-clamp-1">
                            {item.product.name}
                          </h4>
                          
                          {/* Selected options labels */}
                          {(item.selectedColor || item.selectedSize) && (
                            <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 mt-1 text-[10px] text-slate-400 font-bold uppercase">
                              {item.selectedColor && (
                                <span className="flex items-center gap-1">
                                  Color: <span className="w-2.5 h-2.5 rounded-full inline-block border border-slate-200" style={{ backgroundColor: item.selectedColor.hex }}></span> {item.selectedColor.name}
                                </span>
                              )}
                              {item.selectedSize && (
                                <span>Size: {item.selectedSize}</span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Quantity and removal buttons row */}
                        <div className="flex items-center justify-between gap-2 mt-3">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50/50">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedColor?.name, item.selectedSize)}
                              disabled={item.quantity <= 1}
                              className="p-1 px-2 hover:bg-slate-100 text-slate-500 disabled:opacity-30 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 font-bold text-slate-800 text-[11px] select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedColor?.name, item.selectedSize)}
                              className="p-1 px-2 hover:bg-slate-100 text-slate-500 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-900 text-sm">
                              ${itemTotal.toFixed(2)}
                            </span>
                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedColor?.name, item.selectedSize)}
                              className="text-slate-400 hover:text-red-500 transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subtotal and checkout action container */}
              <div className="px-6 py-5 bg-slate-50 border-t border-slate-200 space-y-4">
                
                {/* Promo Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo Code (e.g. RAKHI10)"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 uppercase"
                    />
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>

                {/* Applied Promo Code Badge */}
                {promoCodeApplied && (
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-rose-700 font-bold">
                      <Tag className="w-3.5 h-3.5 text-rose-500" />
                      <span>10% Discount Applied ({promoCodeApplied})</span>
                    </div>
                    <span className="text-rose-600 font-mono font-black">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">${rawSubtotal.toFixed(2)}</span>
                  </div>

                  {promoCodeApplied && (
                    <div className="flex justify-between text-rose-600 font-bold">
                      <span>Promo Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-500">
                    <span>Standard Shipping</span>
                    {shippingRemaining === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase tracking-wide">FREE</span>
                    ) : (
                      <span className="font-bold text-slate-900">$5.00</span>
                    )}
                  </div>

                  <div className="flex justify-between text-slate-500 border-t border-slate-200/60 pt-2 font-black text-sm text-slate-900">
                    <span>Total Due</span>
                    <span className="text-blue-600">${(subtotal + (shippingRemaining === 0 ? 0 : 5)).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenCheckoutModal();
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold tracking-wider uppercase py-4 rounded-2xl transition-all shadow-md hover:scale-102 flex items-center justify-center gap-2 focus:outline-hidden"
                  id="checkout-btn"
                >
                  <span>Proceed to Express Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-Bit SSL Encrypted • Fast Guest Checkout</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
