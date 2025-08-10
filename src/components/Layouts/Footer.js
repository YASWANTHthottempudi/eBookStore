
    import { Link } from "react-router-dom";
    import { useState } from "react";

    export const Footer = () => {
      const [email, setEmail] = useState("");

      const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log("Newsletter subscription:", email);
        setEmail("");
      };

      return (
        <footer className="bg-gray-900 text-white">
          {/* Main Footer */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <i className="bi bi-book text-white text-xl"></i>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    CodeBook
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Your ultimate destination for computer science e-books. Learn, grow, and master modern technologies with our comprehensive collection.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    <i className="bi bi-facebook text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    <i className="bi bi-twitter text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    <i className="bi bi-linkedin text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    <i className="bi bi-github text-xl"></i>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-200">
                      All Books
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-200">
                      React & JavaScript
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Python & Django
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-200">
                      UI/UX Design
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Backend Development
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Mobile Development
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
                <p className="text-gray-400">
                  Subscribe to our newsletter for the latest books and updates.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Features */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <i className="bi bi-shield-check text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Secure Payments</h4>
                    <p className="text-sm text-gray-400">100% secure payment processing</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <i className="bi bi-truck text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Instant Download</h4>
                    <p className="text-sm text-gray-400">Get your books immediately</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <i className="bi bi-headset text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">24/7 Support</h4>
                    <p className="text-sm text-gray-400">Round the clock customer support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="bg-gray-950 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-gray-400 text-sm">
                  © 2024 CodeBook. All rights reserved.
                </div>
                <div className="flex space-x-6 text-sm">
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Terms of Service
                  </Link>
                  <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      );
    };