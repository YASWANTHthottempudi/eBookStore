import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductList } from "../../services/productService";
import { toast } from "react-toastify";

export const Search = ({ setSearchSection }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: "all",
    rating: "all",
    category: "all",
    sortBy: "name"
  });

  const navigate = useNavigate();

  useEffect(() => {
    const searchProducts = async () => {
      if (searchTerm.trim().length === 0) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getProductList(searchTerm);
        setSearchResults(data);
      } catch (error) {
        toast.error("Failed to search products");
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const applyFilters = (products) => {
    let filtered = [...products];

    // Price filter
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        }
        return product.price >= min;
      });
    }

    // Rating filter
    if (filters.rating !== "all") {
      filtered = filtered.filter(product => product.rating >= parseInt(filters.rating));
    }

    // Category filter (based on name keywords)
    if (filters.category !== "all") {
      const categoryKeywords = {
        "react": ["react", "javascript"],
        "python": ["python", "django"],
        "design": ["design", "ui", "ux"],
        "backend": ["backend", "api", "server"],
        "frontend": ["frontend", "html", "css"]
      };
      
      const keywords = categoryKeywords[filters.category] || [];
      filtered = filtered.filter(product => 
        keywords.some(keyword => 
          product.name.toLowerCase().includes(keyword)
        )
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  };

  const filteredResults = applyFilters(searchResults);

  const handleProductClick = (productId) => {
    setSearchSection(false);
    navigate(`/products/${productId}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Search Books
          </h2>
          <button
            onClick={() => setSearchSection(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <i className="bi bi-x-lg text-2xl"></i>
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6">
          <div className="relative">
            <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search for books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              autoFocus
            />
          </div>

          {/* Filters */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Price Range */}
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Prices</option>
              <option value="0-20">Under $20</option>
              <option value="20-50">$20 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-">Over $100</option>
            </select>

            {/* Rating */}
            <select
              value={filters.rating}
              onChange={(e) => setFilters({...filters, rating: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>

            {/* Category */}
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="react">React/JavaScript</option>
              <option value="python">Python/Django</option>
              <option value="design">Design/UI/UX</option>
              <option value="backend">Backend/API</option>
              <option value="frontend">Frontend</option>
            </select>

            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <i className="bi bi-arrow-clockwise animate-spin text-4xl text-blue-500"></i>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Searching...</p>
            </div>
          ) : searchTerm.trim().length === 0 ? (
            <div className="text-center py-8">
              <i className="bi bi-search text-4xl text-gray-400"></i>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Start typing to search</p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-8">
              <i className="bi bi-emoji-frown text-4xl text-gray-400"></i>
              <p className="mt-2 text-gray-600 dark:text-gray-400">No books found</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
              </p>
              {filteredResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                >
                  <img
                    src={product.image_local}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.overview.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        ${product.price}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`bi bi-star${i < product.rating ? '-fill' : ''}`}
                            ></i>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">({product.rating})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};