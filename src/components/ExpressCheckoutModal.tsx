import React from 'react';
import { CartItem } from '../types';
import { X, ShieldCheck, Lock, Truck, CheckCircle2, CreditCard, ArrowRight, Sparkles, Check } from 'lucide-react';

interface ExpressCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal?: number;
  discountAmount?: number;
  promoCodeApplied: string | null;
  onClearCart: () => void;
}

export default function ExpressCheckoutModal({
  isOpen,
  onClose,
  cartItems,
  subtotal: passedSubtotal,
  discountAmount: passedDiscount,
  promoCodeApplied,
  onClearCart
}: ExpressCheckoutModalProps) {
  const [guestEmail, setGuestEmail] = React.useState('alex.dev@example.com');
  const [firstName, setFirstName] = React.useState('Alex');
  const [lastName, setLastName] = React.useState('Taylor');
  const [address, setAddress] = React.useState('1600 Amphitheatre Pkwy');
  const [city, setCity] = React.useState('Mountain View');
  const [state, setState] = React.useState('CA');
  const [zip, setZip] = React.useState('94043');

  const rawSubtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.product.isSale && item.product.salePrice ? item.product.salePrice : item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const subtotal = passedSubtotal !== undefined ? passedSubtotal : rawSubtotal;
  const discountAmount = passedDiscount !== undefined ? passedDiscount : (promoCodeApplied ? subtotal * 0.10 : 0);
  const [shippingMethod, setShippingMethod] = React.useState<'free' | 'express'>('free');
  
  const [cardNumber, setCardNumber] = React.useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = React.useState('12/28');
  const [cardCvc, setCardCvc] = React.useState('888');

  const [addressSuggestionsOpen, setAddressSuggestionsOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState('');

  if (!isOpen) return null;

  const shippingCost = shippingMethod === 'express' ? 12.00 : (subtotal >= 50 ? 0 : 5.00);
  const taxCost = Math.round((subtotal - discountAmount) * 0.0825 * 100) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost + taxCost);

  const handleCompleteOrder = (payMethod: string) => {
    setIsProcessing(true);
    const newOrderId = 'GGL-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);

    setTimeout(() => {
      setIsProcessing(false);
      setIsOrderComplete(true);
      onClearCart();
    }, 1200);
  };

  const ADDRESS_PRESETS = [
    { street: '1600 Amphitheatre Pkwy', city: 'Mountain View', state: 'CA', zip: '94043' },
    { street: '111 8th Ave', city: 'New York', state: 'NY', zip: '10011' },
    { street: '345 Spear St', city: 'San Francisco', state: 'CA', zip: '94105' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col relative my-auto">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-850 tracking-tight uppercase flex items-center gap-2">
                Express 1-Page Checkout
                <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-full border border-emerald-200">
                  ⚡ Guest Checkout Active
                </span>
              </h2>
              <p className="text-[10px] text-slate-500 font-medium">SSL Encrypted • Fast 1-Click Processing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all"
            aria-label="Close Checkout Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isOrderComplete ? (
          /* Order Complete Confirmation View */
          <div className="p-8 sm:p-12 text-center space-y-5 overflow-y-auto flex-1 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-emerald-100 border-4 border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1 max-w-md">
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Order Confirmed!</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Thank you for your order, {firstName}!
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Order Reference: <strong className="text-slate-800 font-extrabold">{orderId}</strong>
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md w-full text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Shipping Address:</span>
                <span className="font-bold text-slate-800 text-right">{address}, {city}, {state} {zip}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Confirmation Email:</span>
                <span className="font-bold text-slate-800">{guestEmail}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-bold">Paid Total:</span>
                <span className="font-extrabold text-blue-600 text-sm">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-2 items-center text-slate-400 text-[11px] font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Simulated prototype transaction completed. No money was charged.</span>
            </div>

            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl transition-all shadow-md hover:scale-103"
            >
              Return to Storefront
            </button>
          </div>
        ) : (
          /* Main 1-Page Express Checkout Body */
          <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            
            {/* Left Column: Form & Express Pay */}
            <div className="lg:col-span-7 p-6 space-y-6">
              
              {/* Express Payment Options */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Express Instant Pay</span>
                  <span className="text-[10px] text-slate-400 font-semibold">1-Tap Fast Checkout</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleCompleteOrder('Google Pay')}
                    disabled={isProcessing}
                    className="bg-black hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-md hover:scale-102"
                  >
                    <span className="text-blue-400 font-black">G</span>
                    <span className="text-rose-400 font-black">P</span>
                    <span className="text-amber-400 font-black">a</span>
                    <span className="text-emerald-400 font-black">y</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCompleteOrder('Apple Pay')}
                    disabled={isProcessing}
                    className="bg-black hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-xs hover:shadow-md hover:scale-102"
                  >
                     Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCompleteOrder('PayPal')}
                    disabled={isProcessing}
                    className="bg-amber-400 hover:bg-amber-500 text-blue-950 py-3 rounded-xl font-black text-xs flex items-center justify-center transition-all shadow-xs hover:shadow-md hover:scale-102"
                  >
                    PayPal
                  </button>
                </div>
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase">Or Pay with Credit Card</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>
              </div>

              {/* Guest Customer Contact Info */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">1. Contact & Guest Email</h3>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="Email Address for Order Confirmation"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Shipping Address with auto-complete simulation */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">2. Shipping Address</h3>
                  <span className="text-[10px] text-blue-600 font-bold cursor-pointer" onClick={() => setAddressSuggestionsOpen(!addressSuggestionsOpen)}>
                    {addressSuggestionsOpen ? 'Hide Suggestions' : '⚡ Auto-Fill Preset Address'}
                  </span>
                </div>

                {addressSuggestionsOpen && (
                  <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-2.5 space-y-1 animate-in fade-in duration-200">
                    <span className="text-[10px] font-bold text-blue-800 block">Select Quick Test Location:</span>
                    {ADDRESS_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setAddress(preset.street);
                          setCity(preset.city);
                          setState(preset.state);
                          setZip(preset.zip);
                          setAddressSuggestionsOpen(false);
                        }}
                        className="w-full text-left text-[11px] bg-white hover:bg-blue-100/50 p-2 rounded-lg font-medium text-slate-700 border border-blue-100 flex items-center justify-between transition-colors"
                      >
                        <span>{preset.street}, {preset.city}, {preset.state} {preset.zip}</span>
                        <span className="text-[9px] font-bold text-blue-600 uppercase">Select</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>

                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street Address"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />

                <div className="grid grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="Zip Code"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Shipping Speed options */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">3. Delivery Speed</h3>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShippingMethod('free')}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      shippingMethod === 'free'
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-extrabold text-slate-800">Standard Eco</span>
                      <span className="text-[10px] font-black text-emerald-600 uppercase">
                        {subtotal >= 50 ? 'FREE' : '$5.00'}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium mt-1">3-5 Business Days</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingMethod('express')}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      shippingMethod === 'express'
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-extrabold text-slate-800">Priority Express</span>
                      <span className="text-[10px] font-black text-blue-600 uppercase">$12.00</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium mt-1">1-2 Business Days</span>
                  </button>
                </div>
              </div>

              {/* Credit Card Input */}
              <div className="space-y-3 pt-1">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center justify-between">
                  <span>4. Card Details</span>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit Encrypted
                  </span>
                </h3>
                <div className="space-y-2 bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary & Complete Button */}
            <div className="lg:col-span-5 bg-slate-50 p-6 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-200">
                  Order Summary ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)
                </h3>

                {/* Items preview list */}
                <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                  {cartItems.map((item, idx) => {
                    const price = item.product.isSale && item.product.salePrice ? item.product.salePrice : item.product.price;
                    return (
                      <div key={idx} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 truncate">{item.product.name}</h4>
                          <span className="text-[10px] text-slate-400 font-medium block">
                            Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                          </span>
                        </div>
                        <span className="text-xs font-extrabold text-slate-900">${(price * item.quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2 text-xs border-t border-slate-200 pt-3">
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-slate-800">${subtotal.toFixed(2)}</span>
                  </div>

                  {promoCodeApplied && (
                    <div className="flex justify-between text-rose-600 font-bold">
                      <span>Promo Discount ({promoCodeApplied})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? <strong className="text-emerald-600 uppercase">FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Estimated Sales Tax</span>
                    <span className="font-bold text-slate-800">${taxCost.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-slate-900 text-sm font-black border-t border-slate-200 pt-2">
                    <span>Total Due Now</span>
                    <span className="text-blue-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-700 font-extrabold">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Official Google Merch Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-700 font-extrabold">
                    <Truck className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Free 30-Day Hassle-Free Returns</span>
                  </div>
                </div>
              </div>

              {/* Complete Payment Button */}
              <button
                type="button"
                onClick={() => handleCompleteOrder('Credit Card')}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-2xl transition-all shadow-lg hover:scale-102 flex items-center justify-center gap-2"
                id="complete-order-btn"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Securing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ${finalTotal.toFixed(2)} & Complete Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
