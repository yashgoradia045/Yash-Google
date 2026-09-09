import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onSelectCategory: (category: string | null) => void;
  onSelectSubcategory: (subcategory: string | null) => void;
  onNavigate: (page: 'home' | 'shop') => void;
  activeCategory: string | null;
  activeSubcategory: string | null;
}

interface NavItem {
  name: string;
  categoryValue: string | null;
  subcategories?: string[];
}

const NAV_ITEMS: NavItem[] = [
  { name: 'New', categoryValue: 'New' },
  {
    name: 'Apparel',
    categoryValue: 'Apparel',
    subcategories: ["Men's/Unisex", "Women's", 'Kids', 'Hats', 'Accessories', 'Socks']
  },
  {
    name: 'Lifestyle',
    categoryValue: 'Lifestyle',
    subcategories: ['Bags', 'Drinkware', 'Eco-Friendly', 'Fun and Games', 'Everything Else']
  },
  {
    name: 'Stationery',
    categoryValue: 'Stationery',
    subcategories: ['Notebooks', 'Stickers', 'Writing', 'Greeting Cards']
  },
  {
    name: 'Collections',
    categoryValue: 'Collections',
    subcategories: ['Summer Edit', 'Sustainable Line', 'Campus Collection', 'Pride Collection', 'Work From Anywhere']
  },
  {
    name: 'Shop by Brand',
    categoryValue: 'Brand',
    subcategories: ['Core', 'Cloud', 'Play', 'Labs']
  },
  { name: 'Sale', categoryValue: 'Sale' }
];

export default function Navbar({
  onSelectCategory,
  onSelectSubcategory,
  onNavigate,
  activeCategory,
  activeSubcategory
}: NavbarProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const handleItemClick = (category: string | null, subcategory: string | null = null) => {
    onSelectCategory(category);
    onSelectSubcategory(subcategory);
    onNavigate('shop');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 font-sans shadow-xs sticky top-0 z-30 transition-all" id="primary-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center md:justify-start items-center overflow-x-auto scrollbar-none py-1 gap-1 md:gap-2">
          {NAV_ITEMS.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isCategoryActive = activeCategory === item.categoryValue && !activeSubcategory;

            return (
              <div
                key={item.name}
                className="relative shrink-0"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <button
                  onClick={() => handleItemClick(item.categoryValue)}
                  className={`relative flex items-center gap-1.5 py-3 px-3.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 outline-hidden group ${
                    isCategoryActive
                      ? 'text-[#e10600]'
                      : 'text-slate-700 hover:text-[#e10600]'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.subcategories && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? 'rotate-180 text-[#e10600]' : 'text-slate-400 group-hover:text-[#e10600]'}`} />
                  )}

                  {/* Ferrari Rosso Corsa Animated Active/Hover Speed Bar */}
                  {isCategoryActive && (
                    <motion.span
                      layoutId="nav-speed-line"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e10600] rounded-full shadow-[0_0_8px_#e10600]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isCategoryActive && isHovered && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-slate-300 rounded-full animate-in fade-in duration-200" />
                  )}
                </button>

                {/* Dropdown Menu with High-Velocity Motion */}
                <AnimatePresence>
                  {item.subcategories && isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 mt-0 w-56 bg-white/98 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-2xl py-2.5 z-50 overflow-hidden"
                    >
                      {/* Top Ferrari Red accent strip inside dropdown */}
                      <div className="h-[2px] w-full bg-gradient-to-r from-[#e10600] via-red-500 to-rose-600 mb-1"></div>

                      <button
                        onClick={() => handleItemClick(item.categoryValue)}
                        className="w-full text-left px-4 py-2 text-[11px] font-black text-[#e10600] hover:bg-red-50/60 uppercase tracking-widest transition-colors"
                      >
                        Shop All {item.name}
                      </button>
                      <div className="h-px bg-slate-100 my-1"></div>
                      {item.subcategories.map((sub) => {
                        const isSubActive = activeSubcategory === sub;
                        return (
                          <button
                            key={sub}
                            onClick={() => handleItemClick(item.categoryValue, sub)}
                            className={`w-full text-left px-4 py-2 text-xs font-medium transition-all duration-200 flex items-center justify-between group/sub ${
                              isSubActive
                                ? 'bg-red-50/70 text-[#e10600] font-bold border-l-3 border-[#e10600]'
                                : 'text-slate-650 hover:bg-slate-50 hover:text-slate-950 hover:translate-x-1'
                            }`}
                          >
                            <span>{sub}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e10600] opacity-0 group-hover/sub:opacity-100 transition-opacity"></span>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
