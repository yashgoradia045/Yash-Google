import { FilterState, SortOption } from '../types';
import { Filter, RotateCcw, ShieldCheck, RefreshCw, SlidersHorizontal, Eye } from 'lucide-react';

interface SidebarFiltersProps {
  filters: FilterState;
  onFiltersChange: (newFilters: FilterState) => void;
  sortOption: SortOption;
  onSortChange: (newSort: SortOption) => void;
  onClearFilters: () => void;
  onSimulateEmpty: () => void;
  isSimulatedEmpty: boolean;
  totalProducts: number;
  selectedCategory?: string | null;
}

const CATEGORIES = ['Apparel', 'Lifestyle', 'Stationery', 'Collections', 'Sale'];
const COLORS = [
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Vibrant Black', hex: '#111827' },
  { name: 'Heather Gray', hex: '#9CA3AF' },
  { name: 'Sage Green', hex: '#8F9779' },
  { name: 'Midnight Navy', hex: '#1E293B' },
  { name: 'Forest Green', hex: '#14532D' },
  { name: 'Teal Glaze', hex: '#0D9488' }
];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

const SORT_OPTIONS = [
  { value: 'Relevance', label: 'Relevance' },
  { value: 'A-Z', label: 'Alphabetical: A-Z' },
  { value: 'Price-Asc', label: 'Price: Low to High' },
  { value: 'Price-Desc', label: 'Price: High to Low' },
  { value: 'BestSellers', label: 'Best Sellers' },
  { value: 'New', label: 'Newest Arrivals' }
];

export default function SidebarFilters({
  filters,
  onFiltersChange,
  sortOption,
  onSortChange,
  onClearFilters,
  onSimulateEmpty,
  isSimulatedEmpty,
  totalProducts,
  selectedCategory = null
}: SidebarFiltersProps) {

  const categoriesToShow = selectedCategory === 'Sale'
    ? ['Apparel', 'Lifestyle', 'Stationery']
    : CATEGORIES;

  const handleCategoryToggle = (category: string) => {
    const isSelected = filters.categories.includes(category);
    const newCategories = isSelected
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleColorToggle = (colorName: string) => {
    const isSelected = filters.colors.includes(colorName);
    const newColors = isSelected
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];

    onFiltersChange({ ...filters, colors: newColors });
  };

  const handleSizeToggle = (size: string) => {
    const isSelected = filters.sizes.includes(size);
    const newSizes = isSelected
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];

    onFiltersChange({ ...filters, sizes: newSizes });
  };

  const handlePriceChange = (maxVal: number) => {
    onFiltersChange({ ...filters, priceRange: [filters.priceRange[0], maxVal] });
  };

  return (
    <aside className="w-full lg:w-64 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 font-sans space-y-6 shrink-0 h-fit" id="filters-sidebar">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4.5 h-4.5 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Filters</h3>
        </div>
        <button
          onClick={onClearFilters}
          className="text-slate-400 hover:text-blue-600 text-xs font-semibold flex items-center gap-1 transition-colors"
          title="Reset all search queries and checkbox parameters"
          id="reset-filters-btn"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Interactive Sorting Selector */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">Sort Products</label>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full text-xs font-medium bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl py-2.5 px-3 outline-none text-slate-700 transition-all cursor-pointer"
          id="sort-select-dropdown"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Simulated Empty State Tester Toggle Widget */}
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 space-y-2">
        <div className="flex items-center gap-1.5">
          <Eye className="w-4 h-4 text-blue-600" />
          <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wide">Lab Simulation</span>
        </div>
        <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
          Toggle this simulation to test the correct empty-state behavior when 0 items match filters.
        </p>
        <button
          onClick={onSimulateEmpty}
          className={`w-full py-2 px-3.5 rounded-lg text-xs font-extrabold tracking-wide uppercase transition-all flex items-center justify-center gap-1.5 shadow-xs border ${
            isSimulatedEmpty
              ? 'bg-amber-500 hover:bg-amber-600 text-white border-transparent'
              : 'bg-white hover:bg-blue-50/50 text-blue-600 border-blue-200'
          }`}
          id="toggle-empty-state-btn"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSimulatedEmpty ? 'animate-spin' : ''}`} />
          <span>{isSimulatedEmpty ? 'Show Grid Products' : 'Simulate Empty State'}</span>
        </button>
      </div>

      {/* Category Checkboxes */}
      <div className="space-y-2.5">
        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
          {selectedCategory === 'Sale' ? 'Sale Departments' : 'Categories'}
        </span>
        <div className="space-y-2">
          {categoriesToShow.map((cat) => {
            const isChecked = filters.categories.includes(cat);
            return (
              <label key={cat} className="flex items-center gap-2.5 text-xs font-medium text-slate-700 hover:text-blue-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCategoryToggle(cat)}
                  className="w-4 h-4 rounded-sm text-blue-600 border-slate-300 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                />
                <span>{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Discount Filter (Sale page only) */}
      {selectedCategory === 'Sale' && (
        <div className="space-y-2.5 pt-2">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">Discount Range</span>
          <div className="grid grid-cols-4 gap-1.5">
            {[0, 10, 30, 50].map((discount) => {
              const isSelected = (filters.minDiscount || 0) === discount;
              return (
                <button
                  key={discount}
                  onClick={() => onFiltersChange({ ...filters, minDiscount: discount })}
                  className={`py-1.5 rounded-lg text-[10px] font-extrabold transition-all border ${
                    isSelected
                      ? 'bg-rose-600 text-white border-transparent shadow-xs font-black'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {discount === 0 ? 'Any' : `${discount}%+`}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Max Price Range Slider */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">Max Price</span>
          <span className="text-xs font-bold text-slate-900">${filters.priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="5"
          max="100"
          step="5"
          value={filters.priceRange[1]}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
          id="price-range-slider"
        />
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
          <span>Min: $5</span>
          <span>Max: $100</span>
        </div>
      </div>

      {/* Colors Swatch Multi-Selector */}
      <div className="space-y-2.5 pt-2">
        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">Filter by Color</span>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => {
            const isSelected = filters.colors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => handleColorToggle(color.name)}
                className={`w-5.5 h-5.5 rounded-full border shadow-xs transition-all relative ${
                  isSelected
                    ? 'ring-2 ring-blue-600 ring-offset-1 scale-110'
                    : 'hover:scale-105 border-slate-200'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Filter by color ${color.name}`}
              >
                {isSelected && (
                  <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-black ${color.name === 'Pure White' ? 'text-gray-900' : 'text-white'}`}>
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sizing Toggles */}
      <div className="space-y-2.5 pt-2">
        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">Filter by Size</span>
        <div className="grid grid-cols-4 gap-1.5">
          {SIZES.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`py-1.5 rounded-lg text-[10px] font-extrabold transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-transparent shadow-xs'
                    : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Eco Certification Banner */}
      <div className="border border-emerald-150 bg-emerald-50 rounded-2xl p-4 flex gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-wide block">Google Green</span>
          <p className="text-[10px] text-emerald-700 leading-normal font-medium">
            Over 85% of our lifestyle water bottles and organic apparel utilize post-consumer recycled fabrics and certified green materials.
          </p>
        </div>
      </div>
    </aside>
  );
}
