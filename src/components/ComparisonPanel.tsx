import React from 'react';
import { ComparisonMode } from '../types';
import { AlertTriangle, CheckCircle, Info, Sparkles, ToggleLeft, ToggleRight } from 'lucide-react';

interface ComparisonPanelProps {
  mode: ComparisonMode;
  onChangeMode: (mode: ComparisonMode) => void;
}

export default function ComparisonPanel({ mode, onChangeMode }: ComparisonPanelProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm font-sans" id="comparison-panel-container">
      {isOpen ? (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 overflow-hidden transition-all duration-300 transform scale-100 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
              <h3 className="font-semibold text-gray-800 text-sm">Design Testing & Audit Center</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-xs px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
              id="close-panel-btn"
            >
              Hide
            </button>
          </div>

          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            Toggle between the <strong>Audited (Broken) Store</strong> state and the <strong>Optimized Redesign</strong> state to test trust, UX, and conversion changes live.
          </p>

          {/* Selector Switch */}
          <div className="flex bg-gray-100 p-1.5 rounded-xl gap-1.5 mb-5 border border-gray-200">
            <button
              onClick={() => onChangeMode('audited')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                mode === 'audited'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              id="toggle-audited-btn"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Audited (Broken)
            </button>
            <button
              onClick={() => onChangeMode('optimized')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                mode === 'optimized'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              id="toggle-optimized-btn"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Optimized (New)
            </button>
          </div>

          {/* Audit Checklist */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">UX & Conversion Audit Status</h4>
            
            {/* Issue 1 */}
            <div className="flex gap-3 items-start text-xs border-b border-gray-50 pb-2.5">
              {mode === 'audited' ? (
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-semibold text-gray-800">1. Product Pricing Bug</span>
                <p className="text-gray-500 text-[11px] mt-0.5">
                  {mode === 'audited' 
                    ? 'Every product tile renders flat $0.00 placeholder pricing, ruining shopper trust.' 
                    : 'Fixed: Real, dynamically formatted prices are fully restored.'}
                </p>
              </div>
            </div>

            {/* Issue 2 */}
            <div className="flex gap-3 items-start text-xs border-b border-gray-50 pb-2.5">
              {mode === 'audited' ? (
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-semibold text-gray-800">2. Orphaned Empty String</span>
                <p className="text-gray-500 text-[11px] mt-0.5">
                  {mode === 'audited' 
                    ? 'Ugly "There are no products to display" string is rendered above active lists.' 
                    : 'Fixed: Message hidden when products exist; clean empty state on 0 products.'}
                </p>
              </div>
            </div>

            {/* Issue 3 */}
            <div className="flex gap-3 items-start text-xs border-b border-gray-50 pb-2.5">
              {mode === 'audited' ? (
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-semibold text-gray-800">3. Quick-Add Grid CTA</span>
                <p className="text-gray-500 text-[11px] mt-0.5">
                  {mode === 'audited' 
                    ? 'Shoppers forced to load full product detail pages to purchase stickers, pins, or shirts.' 
                    : 'Fixed: One-click "Quick Add" button overlays on hover for friction-free carts.'}
                </p>
              </div>
            </div>

            {/* Issue 4 */}
            <div className="flex gap-3 items-start text-xs border-b border-gray-50 pb-2.5">
              {mode === 'audited' ? (
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-semibold text-gray-800">4. Double Image Hover Swap</span>
                <p className="text-gray-500 text-[11px] mt-0.5">
                  {mode === 'audited' 
                    ? 'Static, flat single-angle shots reduce buyer pre-click confidence.' 
                    : 'Fixed: Alternate lifestyle or detail angle fades in on hover/swipe.'}
                </p>
              </div>
            </div>

            {/* Issue 5 */}
            <div className="flex gap-3 items-start text-xs">
              {mode === 'audited' ? (
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-semibold text-gray-800">5. Context-Free Promo Tiles</span>
                <p className="text-gray-500 text-[11px] mt-0.5">
                  {mode === 'audited' 
                    ? 'Promo tiles rely purely on puns ("Wand in doubt") without product descriptions.' 
                    : 'Fixed: Added descriptive secondary sublines explaining collections.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-blue-700 leading-normal">
              <strong>Tip:</strong> Open the <strong>Stationery</strong> category, apply a <strong>$90+ price filter</strong> to test the fixed conditional empty-state view.
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white rounded-full p-3.5 shadow-2xl hover:bg-blue-700 transition-all flex items-center gap-2 group border border-blue-500 hover:scale-105"
          id="open-panel-btn"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
            Open Design Control Panel
          </span>
        </button>
      )}
    </div>
  );
}
