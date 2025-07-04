import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductGrid = ({ initialProducts = [], onAddToCart, onAddToWishlist, onQuickView }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [activeCat, setActiveCat] = useState('All');
  const [products, setProducts] = useState(initialProducts);

  const categories = ['All', 'Electronics', 'Clothing', 'Home', 'Beauty'];

  const mockProducts = [
    { id: 1, name: "Wireless Headphones", price: 129.99, category: 'Electronics', originalPrice: 159.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", rating: 4.5, reviewCount: 128, discount: 19, isNew: true },
    { id: 2, name: "Smart Fitness Watch", price: 299.99, category: 'Electronics', originalPrice: 349.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30e?w=400", rating: 4.8, reviewCount: 89, discount: 14 },
    { id: 3, name: "Laptop Stand", price: 49.99, category: 'Home', image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400", rating: 4.2, reviewCount: 56 },
    { id: 4, name: "Coffee Maker", price: 89.99, category: 'Home', originalPrice: 119.99, image: "https://images.unsplash.com/photo-1570486916435-2c8c0c0c0c0c?w=400", rating: 4.6, reviewCount: 203, discount: 25 },
    { id: 5, name: "Wireless Charging Pad", price: 39.99, category: 'Electronics', image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400", rating: 4.0, reviewCount: 42, isOutOfStock: true },
    { id: 6, name: "Bluetooth Speaker", price: 79.99, category: 'Electronics', originalPrice: 99.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400", rating: 4.4, reviewCount: 167, discount: 20 },
    { id: 7, name: "Gaming Mouse", price: 59.99, category: 'Electronics', image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400", rating: 4.7, reviewCount: 93, isNew: true },
    { id: 8, name: "Mechanical Keyboard", price: 149.99, category: 'Electronics', originalPrice: 199.99, image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400", rating: 4.9, reviewCount: 234, discount: 25 }
  ];

  const items = products.length > 0 ? products : mockProducts;

  const sortProducts = (arr, sortBy) => {
    switch (sortBy) {
      case 'price-low': return [...arr].sort((a, b) => a.price - b.price);
      case 'price-high': return [...arr].sort((a, b) => b.price - a.price);
      case 'rating': return [...arr].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest': return [...arr].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default: return arr;
    }
  };

  const filtered = activeCat === 'All'
    ? items
    : items.filter(p => p.category === activeCat);

  const sortedProducts = sortProducts(filtered, sortBy);

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              activeCat === cat
                ? 'bg-gradient-to-br from-purple-300 via-white to-blue-300 text-dark'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filters & Sorting */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </motion.button>
          <div className="text-sm text-gray-600">
            Showing {sortedProducts.length} products
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 bg-white border rounded-lg focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center bg-white border rounded-lg p-1">
            <motion.button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Grid className="w-4 h-4" />
            </motion.button>
            <motion.button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <List className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="bg-white border rounded-lg p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                {['Under $50', '$50 - $100', '$100 - $200', 'Over $200'].map(r => (
                  <label key={r} className="flex items-center mb-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="ml-2 text-sm">{r}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Display */}
      <motion.div
        initial="hidden"
        animate="visible"
        className={`grid gap-6 gap-y-20 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr' : 'grid-cols-1'}`}
      >
        <AnimatePresence mode="wait">
          {sortedProducts.map(p => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ProductCard 
                product={p} 
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                onQuickView={onQuickView}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load More */}
      <div className="text-center mt-12">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-blue-600 text-white rounded-lg px-8 py-3 hover:bg-blue-700">
          Load More Products
        </motion.button>
      </div>

    </div>
  );
};

export default ProductGrid;
