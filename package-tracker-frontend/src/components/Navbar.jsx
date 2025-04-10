import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();

  // Function to determine if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="p-4 bg-gradient-to-r from-emerald-800 to-emerald-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          Track N Trace
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className={`hover:text-emerald-200 transition-colors ${
              isActive("/") ? "font-bold border-b-2 border-amber-400 pb-1" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`hover:text-emerald-200 transition-colors ${
              isActive("/about")
                ? "font-bold border-b-2 border-amber-400 pb-1"
                : ""
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`hover:text-emerald-200 transition-colors ${
              isActive("/contact")
                ? "font-bold border-b-2 border-amber-400 pb-1"
                : ""
            }`}
          >
            Contact
          </Link>

          {/* Show Admin link only if user is authenticated and is admin */}
          {isAuthenticated && isAdmin && (
            <Link
              to="/admin"
              className={`hover:text-emerald-200 transition-colors ${
                location.pathname.startsWith("/admin")
                  ? "font-bold border-b-2 border-amber-400 pb-1"
                  : ""
              }`}
            >
              Admin
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="hover:text-emerald-200 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hover:text-emerald-200 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-emerald-700">
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className={`px-2 py-1 rounded ${
                isActive("/") ? "bg-emerald-700 font-medium" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-2 py-1 rounded ${
                isActive("/about") ? "bg-emerald-700 font-medium" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-2 py-1 rounded ${
                isActive("/contact") ? "bg-emerald-700 font-medium" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className={`px-2 py-1 rounded ${
                  location.pathname.startsWith("/admin")
                    ? "bg-emerald-700 font-medium"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="px-2 py-1 text-left"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
