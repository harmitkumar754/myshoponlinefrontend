import React from 'react'
import { motion } from 'framer-motion';


function Category() {
    const categories = [
    { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', productCount: 156, color: 'from-blue-500 to-blue-600' },
    { id: 2, name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', productCount: 89, color: 'from-pink-500 to-pink-600' },
    { id: 3, name: 'Home & Garden', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', productCount: 234, color: 'from-green-500 to-green-600' },
    { id: 4, name: 'Sports', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', productCount: 67, color: 'from-orange-500 to-orange-600' },
    { id: 5, name: 'Books', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', productCount: 123, color: 'from-purple-500 to-purple-600' },
    { id: 6, name: 'Beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400', productCount: 98, color: 'from-red-500 to-red-600' }
  ];
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Discover our wide range of products organized by category for easy browsing</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.6 }} viewport={{ once: true }} whileHover={{ y: -8 }} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl bg-gray-100">
                    <img src={category.image} alt={category.name} className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.productCount} products</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  )
}

export default Category