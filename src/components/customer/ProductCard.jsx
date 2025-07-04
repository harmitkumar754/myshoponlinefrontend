import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const {
    id, name, price, originalPrice, image,
    rating, reviewCount, discount,
    isNew = false, isOutOfStock = false
  } = product;

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(product);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const handleQuickView = () => {
    navigate(`/products/${id}`);
    onQuickView?.(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-gradient-to-br from-purple-300 via-white to-blue-300 text-dark flex flex-col justify-between h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300"
    >
      {/* Image Container */}
      
      <div className="relative h-60 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
           onClick={handleQuickView}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full"
            >
              NEW
            </motion.span>
          )}
          {discount && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full"
            >
              -{discount}%
            </motion.span>
          )}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute top-3 right-3 flex flex-col gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
              isWishlisted 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
            } shadow-sm`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleQuickView}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white shadow-sm transition-colors duration-200"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
  <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
    <span className="text-white font-semibold text-lg">Out of Stock</span>
  </div>
)}

      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <p className="text-xs text-gray-500 mb-1">Electronics</p>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-lg text-gray-900">${price}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full rounded-lg flex items-center justify-center gap-2 py-2 font-medium transition-colors duration-200 ${
            isOutOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
