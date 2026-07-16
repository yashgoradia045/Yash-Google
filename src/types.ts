export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  category: 'Apparel' | 'Lifestyle' | 'Stationery' | 'Collections' | 'Sale' | 'New' | 'Brand';
  subcategory: string;
  images: string[]; // [Primary, Secondary/Hover]
  colors: ColorSwatch[];
  sizes: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  salePrice?: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: ColorSwatch;
  selectedSize?: string;
}

export interface FilterState {
  categories: string[];
  subcategories: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  searchQuery: string;
  minDiscount?: number;
}

export type SortOption =
  | 'Relevance'
  | 'A-Z'
  | 'Price-Asc'
  | 'Price-Desc'
  | 'BestSellers'
  | 'New';

// Control the UX comparison in the prototype
export type ComparisonMode = 'audited' | 'optimized';
