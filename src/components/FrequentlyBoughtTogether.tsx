import React from 'react';
import { Product } from '../types';
import { Plus, Sparkles, Check, ShoppingCart, Tag } from 'lucide-react';

interface FrequentlyBoughtTogetherProps {
  primaryProduct: Product;
  bundleProduct: Product;
  onAddBundleToCart: (products: Product[]) => void;
}

export default function FrequentlyBoughtTogether({
  primaryProduct,
  bundleProduct,
  onAddBundleToCart
}: FrequentlyBoughtTogetherProps) {
  const [added, setAdded] = React.useState(false);

  const price1 = primaryProduct.isSale && primaryProduct.salePrice ? primaryProduct.salePrice : primaryProduct.price;
  const price2 = bundleProduct.isSale && bundleProduct.salePrice ? bundleProduct.salePrice : bundleProduct.price;

  const rawTotal = price1 + price2;
  const discountedTotal = Math.round(rawTotal * 0.90 * 100) / 100;
  const savings = Math.round((rawTotal - discountedTotal) * 100) / 100;

  const handleAddBundle = () => {
    onAddBundleToCart([primaryProduct, bundleProduct]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-700/80 relative overflow-hidden my-6">
      <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 border-b border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black tracking-tight text-white uppercase">
              Frequently Bought Together
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">Pair & Save 10% Bundle Discount</p>
          </div>
        </div>
        <span className="bg-rose-500/20 text-rose-300 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border border-rose-500/30">
          Save 10% Bundle
        </span>
      </div>

      {/* Items preview row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          {/* Product 1 */}
          <div className="flex items-center gap-2.5 bg-slate-800/80 border border-slate-700/80 p-2 rounded-2xl max-w-[200px]">
            <img
              src={primaryProduct.images[0]}
              alt={primaryProduct.name}
              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-600"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-200 truncate">{primaryProduct.name}</h4>
              <span className="text-xs font-black text-emerald-400 font-mono">${price1.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-1.5 bg-slate-800 rounded-full text-slate-400 border border-slate-700">
            <Plus className="w-4 h-4" />
          </div>

          {/* Product 2 */}
          <div className="flex items-center gap-2.5 bg-slate-800/80 border border-slate-700/80 p-2 rounded-2xl max-w-[200px]">
            <img
              src={bundleProduct.images[0]}
              alt={bundleProduct.name}
              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-600"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-200 truncate">{bundleProduct.name}</h4>
              <span className="text-xs font-black text-emerald-400 font-mono">${price2.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-slate-700/60 pt-3 sm:pt-0">
          <div className="text-left sm:text-right">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-emerald-400 font-mono">${discountedTotal.toFixed(2)}</span>
              <span className="text-xs text-slate-400 line-through font-mono">${rawTotal.toFixed(2)}</span>
            </div>
            <span className="text-[10px] text-rose-400 font-bold block">
              You Save ${savings.toFixed(2)} (10% Off)
            </span>
          </div>

          <button
            onClick={handleAddBundle}
            disabled={added}
            className={`py-3 px-5 rounded-2xl text-xs font-black tracking-wider uppercase transition-all shadow-md flex items-center gap-2 ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-103'
            }`}
            id="add-bundle-btn"
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Bundle Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add Bundle to Cart (-10%)</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
