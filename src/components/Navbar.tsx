import React from 'react';
import { ChevronDown } from 'lucide-react';

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
    <nav className="bg-white border-b border-slate-200 font-sans shadow-xs relative z-30" id="primary-navbar">
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
                  className={`flex items-center gap-1 py-3 px-3.5 text-xs font-semibold tracking-wide uppercase transition-all outline-hidden border-b-2 ${
                    isCategoryActive
                      ? 'text-blue-600 border-blue-600'
                      : 'text-slate-600 border-transparent hover:text-blue-600 hover:border-slate-200'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.subcategories && (
                    <ChevronDown className={`w-3 h-3 text-slate-405 transition-transform duration-200 ${isHovered ? 'rotate-180 text-blue-500' : ''}`} />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.subcategories && isHovered && (
                  <div className="absolute left-0 mt-0 w-52 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <button
                      onClick={() => handleItemClick(item.categoryValue)}
                      className="w-full text-left px-4 py-2 text-[11px] font-bold text-blue-600 hover:bg-blue-50 uppercase tracking-wider"
                    >
                      Shop All {item.name}
                    </button>
                    <div className="h-px bg-slate-200 my-1"></div>
                    {item.subcategories.map((sub) => {
                      const isSubActive = activeSubcategory === sub;
                      return (
                        <button
                          key={sub}
                          onClick={() => handleItemClick(item.categoryValue, sub)}
                          className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                            isSubActive
                              ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600'
                              : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
