import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const WishlistPage = () => {
  // Static wishlist data
  const wishlist = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      inStock: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      inStock: true
    },
    {
      id: 3,
      name: "Laptop Stand Ergonomic",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
      inStock: false
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-white to-blue-300 shadow">
      
      <main className="py-8">
        <div className="container mx-auto px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-gray-600 mb-8"
          >
            <a href="/" className="hover:text-primary-600 transition-colors">Home</a>
            <span>/</span>
            <span className="text-gray-900">Wishlist</span>
          </motion.div>
          {wishlist.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Heart className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist</h1>
              <p className="text-gray-600 mb-6">You haven't added any products to your wishlist yet.</p>
              <a href="/products" className="btn-primary inline-flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Browse Products
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center transition-all duration-200 hover:shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-lg mb-4 border"
                  />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 break-words">{item.name}</h3>
                  <div className="text-primary-600 font-bold text-base mb-2">${item.price}</div>
                  {!item.inStock && (
                    <div className="text-xs text-red-600 mb-2">Out of Stock</div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full justify-center">
                    <button
                      className="w-full sm:w-auto px-4 py-1 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                      disabled={!item.inStock}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="w-full sm:w-auto px-4 py-1 rounded bg-red-100 text-red-600 font-medium hover:bg-red-200 transition"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      
    </div>
  );
};

export default WishlistPage; 