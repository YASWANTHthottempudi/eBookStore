import { Link } from "react-router-dom";
import { Rating } from "./Rating";
import { useCart } from "../../context";
import { useWishlist } from "../../context";
import { toast } from "react-toastify";
import { useState } from "react";

export const ProductCard = ({product}) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addToCart(product);
      toast.success(`${product.name} added to cart!`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} removed from wishlist`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 ${
          isInWishlist 
            ? 'bg-red-500 text-white shadow-lg' 
            : 'bg-white/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white'
        }`}
      >
        <i className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'} text-lg`}></i>
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image_local} 
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay with quick actions */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
            >
              {isLoading ? (
                <i className="bi bi-arrow-clockwise animate-spin"></i>
              ) : (
                <i className="bi bi-cart-plus"></i>
              )}
              Add to Cart
            </button>
            <Link
              to={`/products/${product.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              <i className="bi bi-eye"></i>
              View Details
            </Link>
          </div>
        </div>

        {/* Best Seller Badge */}
        {product.best_seller && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            <i className="bi bi-star-fill mr-1"></i>
            Best Seller
          </div>
        )}

        {/* Stock Status */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            product.in_stock 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <Rating rating={product.rating} />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Size: {product.size}MB
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {product.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {product.overview}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${product.price}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.original_price}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isLoading || !product.in_stock}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
              product.in_stock
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <i className="bi bi-arrow-clockwise animate-spin"></i>
            ) : (
              <i className="bi bi-cart-plus"></i>
            )}
            {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};