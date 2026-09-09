import React from 'react';
import { X, Sparkles, Tag, ShoppingBag, ArrowRight } from 'lucide-react';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDiscount: (code: string) => void;
  cartItemCount: number;
}

export default function ExitIntentModal({
  isOpen,
  onClose,
  onApplyDiscount,
  cartItemCount
}: ExitIntentModalProps) {
  if (!isOpen) return null;

  const handleClaimDiscount = () => {
    onApplyDiscount('RAKHI10');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 font-sans bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200" id="exit-intent-modal">
      <div className="bg-white border-2 border-rose-500 rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative overflow-hidden text-center space-y-5 animate-in zoom-in-95 duration-200">
        
        {/* Background Decorative Accents */}
        <div className="absolute -right-12 -top-12 w-40 h-40 bg-rose-100 rounded-full blur-2xl"></div>
        <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-blue-100 rounded-full blur-2xl"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all z-10"
          aria-label="Close offer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="relative z-10 mx-auto w-16 h-16 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 border-2 border-white">
          <Tag className="w-8 h-8 animate-bounce" />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-2">
          <span className="bg-rose-100 text-rose-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-rose-200 inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-rose-500" /> Wait! Don't Miss 10% Off
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
            Save 10% Extra On Your Order!
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
            You have <strong className="text-slate-800 font-bold">{cartItemCount} item{cartItemCount !== 1 ? 's' : ''}</strong> waiting in your cart. Apply promo code <strong className="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md font-mono font-black border border-rose-200">RAKHI10</strong> now!
          </p>
        </div>

        {/* Coupon Code Display Box */}
        <div className="relative z-10 bg-slate-50 border-2 border-dashed border-rose-300 rounded-2xl p-3 flex items-center justify-between">
          <div className="text-left">
            <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">Exclusive Promo Code</span>
            <span className="text-base font-black text-rose-600 tracking-wider font-mono">RAKHI10</span>
          </div>
          <span className="bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-xs">
            10% Off
          </span>
        </div>

        {/* Actions */}
        <div className="relative z-10 space-y-2 pt-1">
          <button
            onClick={handleClaimDiscount}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider py-4 px-6 rounded-2xl transition-all shadow-lg hover:scale-102 flex items-center justify-center gap-2"
            id="claim-discount-btn"
          >
            <span>Apply 10% Discount & View Cart</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onClose}
            className="text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors block mx-auto pt-1"
          >
            No thanks, I'll pay full price
          </button>
        </div>

      </div>
    </div>
  );
}
