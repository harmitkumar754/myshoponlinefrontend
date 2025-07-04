import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, TrendingUp, Award, Users, Zap } from 'lucide-react';
import Header from './Header';
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import Footer from './Footer';
import Category from './Category';

const HomePage = () => {
  

  const testimonials = [
    { id: 1, name: 'Sarah Johnson', role: 'Fashion Blogger', content: 'Amazing quality products and fast shipping! I love shopping here.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100' },
    { id: 2, name: 'Mike Chen', role: 'Tech Enthusiast', content: 'Best prices for electronics. Customer service is outstanding!', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    { id: 3, name: 'Emily Davis', role: 'Home Decor Lover', content: 'Found exactly what I was looking for. Highly recommended!', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' }
  ];

  const stats = [
    { icon: Users, value: '10K+', label: 'Happy Customers' },
    { icon: Award, value: '500+', label: 'Products' },
    { icon: TrendingUp, value: '99%', label: 'Satisfaction Rate' },
    { icon: Zap, value: '24/7', label: 'Support' }
  ];

  const handleAddToCart = (product) => console.log('Added to cart:', product);
  const handleAddToWishlist = (product) => console.log('Added to wishlist:', product);
  const handleQuickView = (product) => console.log('Quick view:', product);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <Hero/>
      <Category/>
      
      
      {/* Featured Products */}
         <section className="py-10 md:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Handpicked products that our customers love the most</p>
            </motion.div>
            <ProductGrid onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} onQuickView={handleQuickView} />
          </div>
        </section>




        {/* Stats */}
       <section className="py-10 md:py-16 lg:py-20 bg-gradient-to-br from-primary-900 to-primary-800">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div 
          key={stat.label} 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ delay: index * 0.1, duration: 0.6 }} 
          viewport={{ once: true }}
          whileHover={{ scale: 1.07 }}
          className="text-center transition-all duration-300 bg-gradient-to-br from-purple-300 via-white to-blue-300 rounded-xl p-6 shadow-lg hover:shadow-xl"
        >
          <div className="relative group w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-yellow-400/30 to-yellow-300/20 flex items-center justify-center">
            <stat.icon className="w-10 h-10 text-yellow-300 group-hover:text-yellow-400 transition-all duration-300" />
            <div className="absolute inset-0 rounded-full border-2 border-yellow-300/40 group-hover:border-yellow-400 transition-all duration-300"></div>
          </div>

          <div className="text-3xl font-extrabold mb-2 text-dark">{stat.value}</div>
          <div className="text-sm text-primary-100">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </div>
</section>



        {/* Testimonials */}
        <section className="py-10 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Don't just take our word for it - hear from our satisfied customers</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div key={testimonial.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.6 }} viewport={{ once: true }} className="bg-gradient-to-br from-purple-300 via-white to-blue-300 rounded-xl p-6 max-w-sm mx-auto shadow">
                  <div className="flex items-center mb-4">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-10 md:py-16 lg:py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-4">Ready to Start Shopping?</h2>
              <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers and discover amazing products at unbeatable prices</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-blue-200 text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center mx-auto space-x-2">
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      
     
    </div>
  );
};

export default HomePage;
