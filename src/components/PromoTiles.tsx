import { PROMO_TILES } from '../data/products';
import { ComparisonMode } from '../types';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

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
    <section className="py-14 sm:py-20 bg-[#fafafa] border-y border-slate-200 font-sans relative overflow-hidden" id="promo-tiles-row">
      {/* Subtle Ferrari carbon grid accent in background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-2 text-[10px] font-mono tracking-[0.2em] uppercase text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e10600]"></span>
            <span>CURATED EDITIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-display">
            Featured Collections & Partnerships
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2.5 font-normal">
            Discover bespoke collaborative gear designed exclusively for Google enthusiasts.
          </p>
        </motion.div>

        {/* Promo Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PROMO_TILES.map((tile, idx) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(225,6,0,0.12)] hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col group relative"
              id={`promo-${tile.id}`}
            >
              {/* Ferrari Red Accent Top Hairline */}
              <span className="absolute top-0 left-0 w-0 h-[2.5px] bg-[#e10600] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-30"></span>

              {/* Promo Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={tile.image}
                  alt={tile.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-[9px] font-extrabold uppercase tracking-widest text-white px-2.5 py-1 rounded-md border border-white/15">
                  Exclusive Collab
                </div>
              </div>

              {/* Promo Body Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Title / Pun */}
                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#e10600] transition-colors duration-300 font-display">
                    {tile.title}
                  </h3>

                  {/* Descriptive Subline and Explanation (CONDITIONAL RENDER BASED ON COMPARISON STATE) */}
                  {comparisonMode === 'optimized' ? (
                    <div className="mt-2.5 animate-in fade-in duration-300">
                      {/* Secondary Subline */}
                      <p className="text-xs font-bold text-[#e10600] leading-normal mb-1.5">
                        {tile.subline}
                      </p>
                      {/* Full description */}
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
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
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-black tracking-wider uppercase text-slate-900 group-hover:text-[#e10600] transition-colors duration-300 focus:outline-hidden"
                  >
                    <span>{tile.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#e10600] group-hover:translate-x-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
