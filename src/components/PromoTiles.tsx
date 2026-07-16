import { PROMO_TILES } from '../data/products';
import { ComparisonMode } from '../types';
import { ArrowRight, ShoppingCart } from 'lucide-react';

interface PromoTilesProps {
  comparisonMode: ComparisonMode;
  onExplore: (category: string, subcategory?: string) => void;
}

export default function PromoTiles({ comparisonMode, onExplore }: PromoTilesProps) {
  
  const handleTileClick = (id: string) => {
    if (id === 'promo-wand') {
      onExplore('Collections');
    } else if (id === 'promo-jump') {
      onExplore('Lifestyle', 'Fun and Games');
    } else {
      onExplore('Lifestyle', 'Bags');
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-y border-slate-200 font-sans" id="promo-tiles-row">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Featured Collections & Partnerships
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            Discover bespoke collaborative gear designed exclusively for Google enthusiasts.
          </p>
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PROMO_TILES.map((tile) => (
            <div
              key={tile.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col group animate-in fade-in"
              id={`promo-${tile.id}`}
            >
              {/* Promo Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <img
                  src={tile.image}
                  alt={tile.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-[9px] font-extrabold uppercase tracking-widest text-white px-2.5 py-1 rounded-md">
                  Exclusive Collab
                </div>
              </div>

              {/* Promo Body Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Title / Pun */}
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {tile.title}
                  </h3>

                  {/* Descriptive Subline and Explanation (CONDITIONAL RENDER BASED ON COMPARISON STATE) */}
                  {comparisonMode === 'optimized' ? (
                    <div className="mt-2 animate-in fade-in duration-300">
                      {/* Secondary Subline */}
                      <p className="text-xs font-bold text-blue-600 leading-normal mb-1.5">
                        {tile.subline}
                      </p>
                      {/* Full description */}
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {tile.description}
                      </p>
                    </div>
                  ) : (
                    /* Broken State: No info overlay or descriptive lines. Only shows pun without context */
                    <div className="mt-1 bg-red-50 border border-red-100 p-2 rounded-lg text-[11px] text-red-600 flex items-center gap-1.5 mt-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                      <span>Broken: Lacks descriptive lines. Shoppers cannot tell what is sold here!</span>
                    </div>
                  )}
                </div>

                {/* CTA Link */}
                <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleTileClick(tile.id)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-extrabold tracking-wide uppercase text-blue-600 group-hover:text-blue-800 transition-colors focus:outline-hidden"
                  >
                    <span>{tile.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
