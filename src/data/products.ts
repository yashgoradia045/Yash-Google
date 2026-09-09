import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-classic-tee',
    name: 'Google Signature Heavyweight Tee',
    price: 24.50,
    rating: 4.8,
    reviews: 142,
    category: 'Apparel',
    subcategory: "Men's/Unisex",
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Vibrant Black', hex: '#111827' },
      { name: 'Heather Gray', hex: '#9CA3AF' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
    description: 'A robust, 100% organic cotton tee with a relaxed fit. Engineered for daily wear with reinforced seams and a double-stitched collar.'
  },
  {
    id: 'prod-organic-hoodie',
    name: 'Cozy Organic Loopback Hoodie',
    price: 58.00,
    rating: 4.9,
    reviews: 98,
    category: 'Apparel',
    subcategory: "Women's",
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Sage Green', hex: '#8F9779' },
      { name: 'Oatmeal', hex: '#E5E0D8' },
      { name: 'Midnight Navy', hex: '#1E293B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isBestSeller: true,
    description: 'Crafted from soft, double-faced French terry with ribbed side panels for enhanced flexibility. This minimalist staple offers cozy comfort without the bulk.'
  },
  {
    id: 'prod-heritage-cap',
    name: 'Heritage Low-Profile Dad Hat',
    price: 19.99,
    rating: 4.6,
    reviews: 64,
    category: 'Apparel',
    subcategory: 'Hats',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534215754734-18e55d13ce35?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Washed Denim', hex: '#4B6B94' },
      { name: 'Charcoal', hex: '#374151' },
      { name: 'Mustard Yellow', hex: '#D97706' }
    ],
    sizes: ['One Size'],
    description: 'Unstructured 6-panel cap featuring a pre-curved visor and adjustable brass strap slider. Embroidered ventilation eyelets ensure cool comfort.'
  },
  {
    id: 'prod-knit-socks',
    name: 'Cushioned Merino Blend Knit Socks',
    price: 14.50,
    rating: 4.7,
    reviews: 55,
    category: 'Apparel',
    subcategory: 'Socks',
    images: [
      'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586043261358-135f60633bdf?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Forest Green', hex: '#14532D' },
      { name: 'Crimson', hex: '#991B1B' },
      { name: 'Slate Blue', hex: '#1E3A8A' }
    ],
    sizes: ['M (6-9)', 'L (9-12)'],
    isSale: true,
    salePrice: 10.99,
    description: 'Reinforced heel and toe padding coupled with breathable arch bands. Made with temperature-regulating Merino wool to keep your feet dry and comfy.'
  },
  {
    id: 'prod-insulated-bottle',
    name: 'Double-Wall Insulated Water Bottle',
    price: 32.50,
    rating: 4.8,
    reviews: 210,
    category: 'Lifestyle',
    subcategory: 'Drinkware',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#1F2937' },
      { name: 'Teal Glaze', hex: '#0D9488' },
      { name: 'Raw Stainless', hex: '#D1D5DB' }
    ],
    sizes: ['20 oz', '32 oz'],
    isBestSeller: true,
    description: 'Keeps liquids ice cold for 24 hours or steaming hot for 12. Complete with a leakproof twist-cap and integrated flexible carry loop.'
  },
  {
    id: 'prod-rolltop-backpack',
    name: 'Recycled Tech Roll-Top Backpack',
    price: 85.00,
    rating: 4.9,
    reviews: 73,
    category: 'Lifestyle',
    subcategory: 'Bags',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Carbon Black', hex: '#1F2937' },
      { name: 'Olive Drab', hex: '#3F6212' }
    ],
    sizes: ['Standard'],
    isNew: true,
    description: 'Constructed with 100% water-resistant recycled polyester. Features an exterior-access padded laptop sleeve (up to 16") and side bottle pockets.'
  },
  {
    id: 'prod-ceramic-mug',
    name: 'Cork-Base Ceramic Commuter Mug',
    price: 18.00,
    rating: 4.5,
    reviews: 119,
    category: 'Lifestyle',
    subcategory: 'Drinkware',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Warm Cream', hex: '#F9F6F0' },
      { name: 'Slate Gray', hex: '#4B5563' }
    ],
    sizes: ['12 oz'],
    description: 'Features a natural cork base that prevents sliding and protects surfaces from heat rings. Outfitted with a spill-resistant push-on lid.'
  },
  {
    id: 'prod-wooden-puzzle',
    name: 'Handcrafted Wooden Brainteaser Puzzle',
    price: 28.00,
    rating: 4.7,
    reviews: 32,
    category: 'Lifestyle',
    subcategory: 'Fun and Games',
    images: [
      '/images/handcrafted-wooden-brainteaser.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:8KNc5kuec8-VFM'
    ],
    colors: [
      { name: 'Natural Cherry & Walnut', hex: '#854D0E' }
    ],
    sizes: ['Standard'],
    description: 'An elegant addition to any coffee table or executive desk. Responsibly sourced premium hardwood block game to challenge spatial reasoning.'
  },
  {
    id: 'prod-dot-journal',
    name: 'Minimalist Hardcover Dot Grid Journal',
    price: 16.50,
    rating: 4.8,
    reviews: 186,
    category: 'Stationery',
    subcategory: 'Notebooks',
    images: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Desert Sand', hex: '#D7C49E' },
      { name: 'Forest Green', hex: '#1B4D3E' },
      { name: 'Deep Mustard', hex: '#B45309' }
    ],
    sizes: ['A5 Size'],
    isBestSeller: true,
    description: 'Eco-friendly, ink-bleed-resistant 120gsm cream paper bound in lay-flat vegan leather. Perfect for sketching, design ideation, and bullet journaling.'
  },
  {
    id: 'prod-gel-pens',
    name: 'Fine-Liner Premium Gel Pen Set',
    price: 12.00,
    rating: 4.6,
    reviews: 94,
    category: 'Stationery',
    subcategory: 'Writing',
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Rainbow Pack (6 Pens)', hex: '#EF4444' }
    ],
    sizes: ['0.5mm'],
    description: 'Japanese acid-free, smudge-resistant archival gel inks with ultra-fine precision needle tips. Non-skip water-based pigment ensures consistent flow.'
  },
  {
    id: 'prod-stickers',
    name: 'Die-Cut Tech Vinyl Sticker Pack',
    price: 8.50,
    rating: 4.7,
    reviews: 312,
    category: 'Stationery',
    subcategory: 'Stickers',
    images: [
      '/images/die-cut-tech-vinyl-sticker-pack.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:OOivdoHIqOW_sM'
    ],
    colors: [
      { name: 'Glossy Pack (12 stickers)', hex: '#3B82F6' }
    ],
    sizes: ['Assorted Sizes'],
    isBestSeller: true,
    isSale: true,
    salePrice: 5.99,
    description: 'Thick, ultra-durable vinyl stickers that protect from scratches, rain, and sunlight. Give your laptop, flask, or notebook an aesthetic boost.'
  },
  {
    id: 'prod-greeting-cards',
    name: 'Recycled Kraft Greeting Card Pack',
    price: 15.00,
    rating: 4.8,
    reviews: 41,
    category: 'Stationery',
    subcategory: 'Greeting Cards',
    images: [
      '/images/recycled-kraft-greeting-cards.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:xZZK8oHVFkkZ-M'
    ],
    colors: [
      { name: 'Kraft Brown', hex: '#C2A385' }
    ],
    sizes: ['Set of 8'],
    isNew: true,
    description: 'Uncoated, high-texture recycled cards with matching matching kraft paper envelopes. Left blank inside for custom heartfelt notes.'
  },
  // SECTION 1: NEW Page Products
  {
    id: 'new-chrome-tee',
    name: 'Google Chrome Retro Tee',
    price: 28.00,
    rating: 4.8,
    reviews: 12,
    category: 'New',
    subcategory: "Men's/Unisex",
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Vibrant Black', hex: '#111827' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    description: 'A premium heavy-cotton tee featuring the iconic Google Chrome vintage colorway. Clean, classic, and extremely breathable.'
  },
  {
    id: 'new-cloud-sweatshirt',
    name: 'Google Cloud Tech Knit Crewneck',
    price: 55.00,
    rating: 4.9,
    reviews: 8,
    category: 'New',
    subcategory: "Women's",
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Cloud White', hex: '#F3F4F6' },
      { name: 'Sky Blue', hex: '#3B82F6' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    description: 'A luxurious knit crewneck stitched with a subtle high-density Google Cloud tech pattern. Perfect for cozy terminal sessions.'
  },
  {
    id: 'new-canvas-tote',
    name: 'Woven Earth Organic Tote Bag',
    price: 24.00,
    rating: 4.7,
    reviews: 15,
    category: 'New',
    subcategory: 'Bags',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Natural Oatmeal', hex: '#E5E0D8' }
    ],
    sizes: ['Standard'],
    isNew: true,
    description: 'Generously sized tote bag crafted from heavy-duty organic canvas. Equipped with reinforced double-stitch straps and an inner pocket.'
  },
  {
    id: 'new-layflat-notebook',
    name: 'A5 Lay-Flat Hardcover Notebook',
    price: 19.50,
    rating: 4.6,
    reviews: 6,
    category: 'New',
    subcategory: 'Notebooks',
    images: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Google Blue', hex: '#4285F4' },
      { name: 'Google Green', hex: '#34A853' }
    ],
    sizes: ['A5 Size'],
    isNew: true,
    description: 'Premium lay-flat journal with ink-resistant 120gsm numbered pages, customized index tables, and a double-woven ribbon marker.'
  },
  {
    id: 'new-retro-cap',
    name: 'Chrome Retro Low-Profile Cap',
    price: 22.00,
    rating: 4.7,
    reviews: 14,
    category: 'New',
    subcategory: 'Hats',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534215754734-18e55d13ce35?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Retro Denim', hex: '#4B6B94' },
      { name: 'Sage Green', hex: '#8F9779' }
    ],
    sizes: ['One Size'],
    isNew: true,
    description: 'Vintage low-profile dad hat made with soft garment-washed twill and a custom adjustable silver metal buckle.'
  },
  {
    id: 'new-holo-stickers',
    name: 'Android Bot Holographic Sticker Pack',
    price: 8.50,
    rating: 4.9,
    reviews: 35,
    category: 'New',
    subcategory: 'Stickers',
    images: [
      '/images/android-bot-holographic-sticker.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:_BocWjPQpmN08M'
    ],
    colors: [
      { name: 'Holo Multi-Pack', hex: '#3B82F6' }
    ],
    sizes: ['Assorted Sizes'],
    isNew: true,
    description: 'A bundle of 10 shiny holographic vinyl stickers celebrating our favorite Android mascot. Highly water, rain, and scratch-resistant.'
  },
  {
    id: 'new-insulated-mug',
    name: 'Double-Wall Insulated Coffee Mug',
    price: 34.00,
    rating: 4.8,
    reviews: 9,
    category: 'New',
    subcategory: 'Drinkware',
    images: [
      '/images/double-wall-insulated-coffee-mug.jpg',
      '/images/double-wall-insulated-coffee-mug-2.jpg'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#1F2937' },
      { name: 'Google Yellow', hex: '#FBBC05' }
    ],
    sizes: ['16 oz'],
    isNew: true,
    description: 'Keep your brew piping hot during morning meetings. Spillproof, double-walled matte stainless steel mug.'
  },
  {
    id: 'new-bento-box',
    name: 'Eco-Friendly Bamboo Bento Box',
    price: 29.00,
    rating: 4.5,
    reviews: 4,
    category: 'New',
    subcategory: 'Everything Else',
    images: [
      'https://images.unsplash.com/photo-1606168094336-48f205276929?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Natural Bamboo', hex: '#E5C158' }
    ],
    sizes: ['Standard'],
    isNew: true,
    description: 'Ditch plastic with our certified biodegradable bamboo fiber lunchbox. Includes a custom elastic fabric strap and wood lid.'
  },
  {
    id: 'new-felt-mat',
    name: 'Felt Wool Desk Mat & Organizer',
    price: 45.00,
    rating: 4.8,
    reviews: 11,
    category: 'New',
    subcategory: 'Office Upgrade',
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Heather Gray', hex: '#9CA3AF' },
      { name: 'Charcoal Dark', hex: '#374151' }
    ],
    sizes: ['Medium', 'Large'],
    isNew: true,
    description: 'Crafted from premium sustainable wool felt, providing a soft cushioned tactile glide for your mouse and keyboard.'
  },

  // SECTION 2: SHOP BY BRAND Page Products (Core, Cloud, Play, Labs)
  {
    id: 'brand-core-tee',
    name: 'Google Core Multi-Color Stripe Tee',
    price: 26.00,
    rating: 4.9,
    reviews: 43,
    category: 'Brand',
    subcategory: 'Core',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Express your brand pride with the Google Core striped tee, stitching the red, green, yellow, and blue directly into the seams.'
  },
  {
    id: 'brand-cloud-windbreaker',
    name: 'Google Cloud Waterproof Windbreaker',
    price: 75.00,
    rating: 4.8,
    reviews: 19,
    category: 'Brand',
    subcategory: 'Cloud',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Deep Sky Blue', hex: '#1D4ED8' }
    ],
    sizes: ['M', 'L', 'XL'],
    description: 'Premium ripstop water-resistant technical shell, fully branded with subtle cloud architectures for rainy commutes.'
  },
  {
    id: 'brand-play-hoodie',
    name: 'Google Play Retro Joystick Hoodie',
    price: 52.00,
    rating: 4.7,
    reviews: 28,
    category: 'Brand',
    subcategory: 'Play',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Carbon Black', hex: '#111827' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Chunky, extra-warm cotton blend hoodie showcasing an embroidered retro play-controller graphic on the sleeve.'
  },
  {
    id: 'brand-labs-flask',
    name: 'Google Labs Thermal Hydro Flask',
    price: 36.00,
    rating: 4.9,
    reviews: 14,
    category: 'Brand',
    subcategory: 'Labs',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Raw Stainless', hex: '#D1D5DB' }
    ],
    sizes: ['32 oz'],
    description: 'Heavyweight vacuum-insulated thermal bottle custom-engraved for experimental engineers and lab coders.'
  },
  {
    id: 'brand-core-backpack',
    name: 'Google Core Classic Daypack',
    price: 48.00,
    rating: 4.6,
    reviews: 32,
    category: 'Brand',
    subcategory: 'Core',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Slate Gray', hex: '#4B5563' }
    ],
    sizes: ['Standard'],
    description: 'The definitive daily commuter bag, designed with customized compartments for chargers, books, and laptops.'
  },
  {
    id: 'brand-cloud-sleeve',
    name: 'Google Cloud Padded Laptop Sleeve',
    price: 28.00,
    rating: 4.7,
    reviews: 11,
    category: 'Brand',
    subcategory: 'Cloud',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Sky Blue', hex: '#3B82F6' }
    ],
    sizes: ['13-inch', '16-inch'],
    description: 'Ultra-plush padded sleeve wrapped in tearproof water-resistant nylon. Features deep pockets for dongles and cables.'
  },
  {
    id: 'brand-play-bottle',
    name: 'Google Play Kids Water Bottle',
    price: 18.50,
    rating: 4.5,
    reviews: 21,
    category: 'Brand',
    subcategory: 'Play',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Coral Red', hex: '#EF4444' }
    ],
    sizes: ['12 oz'],
    description: 'A durable, BPA-free visual hydration flask fitted with a custom soft-sip silicone straw lid for playful days.'
  },
  {
    id: 'brand-labs-notepad',
    name: 'Google Labs Dot-Grid Field Notepad',
    price: 12.00,
    rating: 4.8,
    reviews: 16,
    category: 'Brand',
    subcategory: 'Labs',
    images: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#111827' }
    ],
    sizes: ['Set of 3'],
    description: 'Pocket-sized weather-proof notebooks designed for field research, laboratory notes, or quick schematic design sketches.'
  },

  // SECTION 3: COLLECTIONS Page Products
  {
    id: 'coll-summer-cap',
    name: 'Google Summer Camp Canvas Cap',
    price: 22.00,
    rating: 4.7,
    reviews: 18,
    category: 'Collections',
    subcategory: 'Summer Edit',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534215754734-18e55d13ce35?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Mustard Yellow', hex: '#D97706' }],
    sizes: ['One Size'],
    description: 'A cheerful sun cap sewn with heavyweight duck canvas and finished with custom contrast stitching. Part of the exclusive Summer Edit.'
  },
  {
    id: 'coll-summer-cooler',
    name: 'Google Summer Insulated Bottle Cooler',
    price: 28.00,
    rating: 4.6,
    reviews: 12,
    category: 'Collections',
    subcategory: 'Summer Edit',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Oatmeal Green', hex: '#8F9779' }],
    sizes: ['Standard'],
    description: 'Neoprene insulation wrap with custom utility clips, perfect for warm outdoor picnics and lake adventures.'
  },
  {
    id: 'coll-sust-hoodie',
    name: 'Google Earth Sustainable Loopback Hoodie',
    price: 60.00,
    rating: 4.9,
    reviews: 51,
    category: 'Collections',
    subcategory: 'Sustainable Line',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Forest Green', hex: '#14532D' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Over 95% post-consumer organic fibers, featuring low-impact botanic dyes and double-lock heavy stitching.'
  },
  {
    id: 'coll-sust-straws',
    name: 'Google Eco Stainless Steel Straw Set',
    price: 14.00,
    rating: 4.8,
    reviews: 23,
    category: 'Collections',
    subcategory: 'Sustainable Line',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Raw Stainless', hex: '#D1D5DB' }],
    sizes: ['Set of 4'],
    description: 'Reusable metal straws in a recycled linen linen carrying pouch, bundled with a custom copper cleaning brush.'
  },
  {
    id: 'coll-campus-sweatshirt',
    name: 'Google University Vintage Sweatshirt',
    price: 45.00,
    rating: 4.8,
    reviews: 37,
    category: 'Collections',
    subcategory: 'Campus Collection',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Crimson Burgundy', hex: '#800020' }],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Retro letterman-style varsity sweatshirt printed on heavy fleece. A comfortable nod to collegiate pride.'
  },
  {
    id: 'coll-campus-pennant',
    name: 'Google University Wool Pennant',
    price: 18.00,
    rating: 4.7,
    reviews: 9,
    category: 'Collections',
    subcategory: 'Campus Collection',
    images: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Vintage Cream', hex: '#FDFBF7' }],
    sizes: ['Standard'],
    description: 'A heavy wool-felt wall hanging constructed with gold grommets, designed to showcase classic campus nostalgia.'
  },
  {
    id: 'coll-pride-tee',
    name: 'Google Pride Rainbow Stitch Tee',
    price: 25.00,
    rating: 4.9,
    reviews: 64,
    category: 'Collections',
    subcategory: 'Pride Collection',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Rainbow White', hex: '#FFFFFF' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A premium-cut tee showcasing an elegant, high-texture rainbow stripe stitched directly across the center chest.'
  },
  {
    id: 'coll-pride-socks',
    name: 'Google Pride Rainbow Knit Socks',
    price: 12.00,
    rating: 4.8,
    reviews: 42,
    category: 'Collections',
    subcategory: 'Pride Collection',
    images: [
      'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586043261358-135f60633bdf?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Rainbow Grey', hex: '#D1D5DB' }],
    sizes: ['M (6-9)', 'L (9-12)'],
    description: 'Comfy organic cotton blend crew socks featuring dynamic pride-color ribbing and complete arch support.'
  },
  {
    id: 'coll-work-stand',
    name: 'Google Workspace Foldable Laptop Stand',
    price: 39.00,
    rating: 4.7,
    reviews: 29,
    category: 'Collections',
    subcategory: 'Work From Anywhere',
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Tech Gunmetal', hex: '#2C3E50' }],
    sizes: ['Adjustable'],
    description: 'A feather-light sandblasted aluminum stand that folds down completely flat. Elevates your screen to the absolute perfect eye-level.'
  },
  {
    id: 'coll-work-light',
    name: 'Google Workspace USB Desk Light',
    price: 24.00,
    rating: 4.5,
    reviews: 15,
    category: 'Collections',
    subcategory: 'Work From Anywhere',
    images: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Carbon Black', hex: '#111827' }],
    sizes: ['Standard'],
    description: 'Flexible USB-powered task lamp with adjustable warmth controls and dual sleep timer modes for productive nights.'
  },

  // SECTION 4: SALE Page Products
  {
    id: 'sale-fleece',
    name: 'Google Trail Sherpa Fleece Zip-Up',
    price: 78.00,
    salePrice: 39.00,
    rating: 4.8,
    reviews: 57,
    category: 'Sale',
    subcategory: 'Apparel',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Oatmeal', hex: '#E5E0D8' }],
    sizes: ['S', 'M', 'L', 'XL'],
    isSale: true,
    description: 'Heavyweight sherpa fleece featuring dynamic ripstop elbow patches and customized mesh interior linings.'
  },
  {
    id: 'sale-beanie',
    name: 'Google Trail Ribbed Knit Beanie',
    price: 24.00,
    salePrice: 12.00,
    rating: 4.6,
    reviews: 33,
    category: 'Sale',
    subcategory: 'Apparel',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534215754734-18e55d13ce35?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Midnight Navy', hex: '#1E293B' }],
    sizes: ['One Size'],
    isSale: true,
    description: 'A cozy double-layer rib knit beanie designed to insulate beautifully against chilly morning commutes.'
  },
  {
    id: 'sale-speaker-cover',
    name: 'Google Nest Mini Smart Speaker Cover',
    price: 18.00,
    salePrice: 9.00,
    rating: 4.7,
    reviews: 144,
    category: 'Sale',
    subcategory: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Sage Green', hex: '#8F9779' }],
    sizes: ['Standard'],
    isSale: true,
    description: 'Responsibly woven organic linen protective sleeve cover tailored specifically for smart speaker installations.'
  },
  {
    id: 'sale-pouch',
    name: 'Google Accessories Cord Organizer Pouch',
    price: 32.00,
    salePrice: 16.00,
    rating: 4.5,
    reviews: 29,
    category: 'Sale',
    subcategory: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Charcoal Dark', hex: '#374151' }],
    sizes: ['Standard'],
    isSale: true,
    description: 'A tri-fold cord case finished with secure elastic loops and dedicated quick-access mesh zip folders.'
  },
  {
    id: 'sale-mug',
    name: 'Google Classic Ceramic Mug (Yellow)',
    price: 14.00,
    salePrice: 7.00,
    rating: 4.6,
    reviews: 82,
    category: 'Sale',
    subcategory: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Google Yellow', hex: '#FBBC05' }],
    sizes: ['12 oz'],
    isSale: true,
    description: 'Classic high-gloss ceramic mug finished with a bright contrast handle, perfect for high-capacity coffee breaks.'
  },
  {
    id: 'sale-pencil-case',
    name: 'Google Canvas Zipper Pencil Case',
    price: 12.50,
    salePrice: 6.25,
    rating: 4.8,
    reviews: 18,
    category: 'Sale',
    subcategory: 'Stationery',
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Raw Canvas', hex: '#F3EFE9' }],
    sizes: ['Standard'],
    isSale: true,
    description: 'Heavy cotton canvas container outfitted with smooth YKK brass zippers and contrast interior liners.'
  },
  {
    id: 'sale-planner',
    name: 'Google Workspace Weekly Productivity Planner',
    price: 26.00,
    salePrice: 13.00,
    rating: 4.7,
    reviews: 41,
    category: 'Sale',
    subcategory: 'Stationery',
    images: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Desert Sand', hex: '#D7C49E' }],
    sizes: ['A5 Size'],
    isSale: true,
    description: 'Undated layout pages coupled with specialized priority blocks and comprehensive calendar trackers.'
  },
  {
    id: 'sale-stickers',
    name: 'Google Material Design Giant Sticker Pack',
    price: 9.00,
    salePrice: 4.50,
    rating: 4.9,
    reviews: 110,
    category: 'Sale',
    subcategory: 'Stationery',
    images: [
      'https://images.unsplash.com/photo-1572945281861-68b143026a5a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589384267710-7a259678a59a?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Assorted Swirl', hex: '#3B82F6' }],
    sizes: ['Assorted Sizes'],
    isSale: true,
    description: 'An expansive pack of 20 premium die-cut vinyl stickers exploring beautiful material icons and interfaces.'
  },
  {
    id: 'sale-shorts',
    name: 'Google Athletics Light Running Shorts',
    price: 36.00,
    salePrice: 18.00,
    rating: 4.4,
    reviews: 25,
    category: 'Sale',
    subcategory: 'Apparel',
    images: [
      'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586043261358-135f60633bdf?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Charcoal Gray', hex: '#4B5563' }],
    sizes: ['S', 'M', 'L'],
    isSale: true,
    description: 'Breathable, moisture-wicking mesh running shorts featuring deep zip keys compartments and soft waistband liners.'
  },
  {
    id: 'sale-flask',
    name: 'Google Classic Wide-Mouth Hydration Flask',
    price: 42.00,
    salePrice: 21.00,
    rating: 4.8,
    reviews: 95,
    category: 'Sale',
    subcategory: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Teal Glaze', hex: '#0D9488' }],
    sizes: ['32 oz'],
    isSale: true,
    description: 'Double-wall vacuum insulation featuring a wide mouth for quick ice addition and complete temperature persistence.'
  }
];

export const PROMO_TILES = [
  {
    id: 'promo-wand',
    title: 'Wand In Doubt',
    subline: 'Magic is real — the new Google Harry Potter x Magic collab',
    description: 'A magical collection of starry notebooks, potion-proof drinkware, and wizarding cloaks styled for modern muggles.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
    ctaText: 'Wand-er in',
    link: '/collections/wand-in-doubt'
  },
  {
    id: 'promo-jump',
    title: 'Jump It Out!',
    subline: 'Double Dutch high-speed fitness gear & breathable athletic socks',
    description: 'Level up your wellness routines with durable bearings jump ropes and ergonomic socks that keep you light on your feet.',
    image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=600&auto=format&fit=crop&q=80',
    ctaText: 'Explore Gear',
    link: '/lifestyle/fun-and-games'
  },
  {
    id: 'promo-canvas',
    title: 'Woven Earth',
    subline: 'New heavy-duty 100% recycled cotton field totes and pouches',
    description: 'Designed to outlast trends. Beautiful natural canvas silhouettes with reinforced handles and interior organizers.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    ctaText: 'Shop Sustainable',
    link: '/lifestyle/bags'
  }
];
