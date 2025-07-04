import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Truck, Star, ShieldCheck } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const Hero = () => {
  // E-commerce related hero images
  const heroImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      alt: "Online Shopping Experience"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      alt: "Digital Shopping Cart"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      alt: "Mobile Shopping"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      alt: "E-commerce Platform"
    }
  ];
  
  return (
    <section className="bg-gradient-to-br from-purple-300 via-white to-blue-300 text-dark py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 max-w-full">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight"
          >
            Welcome to <span className="text-yellow-300">MyStoreOnline</span> 
            <span className="block sm:inline"> Your One-Stop Shopping Destination!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 px-2 sm:px-0"
          >
            Discover exclusive deals, top-rated products and fast delivery all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-2 sm:px-0"
          >
            <Link 
              to="/products" 
              className="w-full sm:w-auto bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg shadow-lg transition text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              Start Shopping
            </Link>
            <Link 
              to="/about" 
              className="w-full sm:w-auto text-dark font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg shadow-lg hover:bg-gray-100 transition text-sm sm:text-base flex items-center justify-center"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10 px-2 sm:px-0">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-dark flex-shrink-0" />
              <span className="text-center sm:text-left">Fast Delivery</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-dark flex-shrink-0" />
              <span className="text-center sm:text-left">Top Rated</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-dark flex-shrink-0" />
              <span className="text-center sm:text-left">Secure</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-dark flex-shrink-0" />
              <span className="text-center sm:text-left">Easy Checkout</span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full lg:w-1/2 flex justify-center px-2 sm:px-0"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} w-2 h-2 sm:w-3 sm:h-3 bg-white opacity-70 mx-1 rounded-full"></span>`;
              },
            }}
            loop={true}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          >
            {heroImages.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
