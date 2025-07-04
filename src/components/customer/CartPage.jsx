import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag, CreditCard, Truck, ArrowRight } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      quantity: 2,
      inStock: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 299.99,
      originalPrice: 349.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      quantity: 1,
      inStock: true
    },
    {
      id: 3,
      name: "Laptop Stand Ergonomic",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
      quantity: 1,
      inStock: false
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const discount = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-300 via-white to-blue-300 text-dark">
      
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-gray-600 mb-8"
          >
            <a href="/" className="hover:text-primary-600 transition-colors">Home</a>
            <span>/</span>
            <span className="text-gray-900">Shopping Cart</span>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <ShoppingBag className="w-6 h-6 text-primary-600" />
                  <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                  <span className="text-gray-500">({cartItems.length} items)</span>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                    >
                      Continue Shopping
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:space-x-4 p-2 sm:p-4 border border-gray-200 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 sm:w-20 sm:h-20 object-cover rounded-lg mx-auto sm:mx-0"
                          />
                          
                          <div className="flex-1 text-center sm:text-left">
                            <h3 className="font-semibold text-gray-900 mb-1 text-base sm:text-lg break-words">{item.name}</h3>
                            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:space-x-2 mb-2">
                              <span className="text-base sm:text-lg font-bold text-primary-600">${item.price}</span>
                              {item.originalPrice && (
                                <span className="text-xs sm:text-sm text-gray-500 line-through">${item.originalPrice}</span>
                              )}
                            </div>
                            {!item.inStock && (
                              <span className="text-xs sm:text-sm text-red-600">Out of Stock</span>
                            )}
                          </div>

                          <div className="flex items-center gap-1 sm:space-x-2 justify-center sm:justify-start mt-2 sm:mt-0">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={!item.inStock}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            
                            <span className="w-10 sm:w-12 text-center font-medium">{item.quantity}</span>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={!item.inStock}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>

                          <div className="text-center sm:text-right mt-2 sm:mt-0">
                            <div className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:sticky lg:top-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2 text-blue-800">
                      <Truck className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Add ${(50 - subtotal).toFixed(2)} more for free shipping
                      </span>
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
                >
                
                 <Link to="/CheckoutPage" className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition'><span>  <ArrowRight className="w-5 h-5 inline me-2 " />Proceed to Checkout</span></Link> 
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-secondary flex items-center justify-center space-x-2 py-3 mt-4"
                >
                  
                <Link tp="/products" className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition'><span><ArrowLeft className="w-5 h-5 inline me-2" />Continue Shopping</span></Link>  
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default CartPage; 