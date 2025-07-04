import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import ProductGrid from './ProductGrid';

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
  
      <main className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-gray-600 mb-8"
          >
            <a href="/" className="hover:text-primary-600 transition-colors">Home</a>
            <span>/</span>
            <span className="text-gray-900">Products</span>
          </motion.div>
          <ProductGrid />
        </div>
      </main>
      
    </div>
  );
};

export default ProductsPage; 