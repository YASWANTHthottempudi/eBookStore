import { useWishlist } from "../../context";
import { ProductCard } from "../../components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const WishlistPage = () => {
  const { wishlist, clearWishlist } = useWishlist();

  const handleClearWishlist = () => {
    clearWishlist();
    toast.success("Wishlist cleared successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <i className="bi bi-heart text-8xl text-gray-300 dark:text-gray-600"></i>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Start adding your favorite books to your wishlist!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <i className="bi bi-book mr-2"></i>
              Browse Books
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
            </p>
          </div>
          
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <i className="bi bi-plus-lg mr-2"></i>
              Add More
            </Link>
            
            <button
              onClick={handleClearWishlist}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <i className="bi bi-trash mr-2"></i>
              Clear All
            </button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Summary Card */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Wishlist Summary
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Total value: ${wishlist.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </p>
            </div>
            
            <div className="flex gap-3">
              <Link
                to="/cart"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <i className="bi bi-cart-check mr-2"></i>
                View Cart
              </Link>
              
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <i className="bi bi-arrow-left mr-2"></i>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
