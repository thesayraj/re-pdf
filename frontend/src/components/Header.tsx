import { useEffect, useRef, useState } from "react";
import logo from "../assets/app_icon.png";

function Header() {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastY = useRef(0); // persists across renders

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastY.current && currentY > 50) {
        // scrolling down
        setHidden(true);
        setMobileMenuOpen(false);
      } else {
        // scrolling up
        setHidden(false);
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full bg-white shadow z-50 transition-all duration-500 ease-in-out ${
        hidden
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start items-center h-13">
          {/* Logo */}
          <div className="flex items-center space-x-2 hover:transform hover:scale-105 transition duration-300">
            <img src={logo} alt="logo" className="h-13 w-13" />
            <span className="text-xl font-bold text-gray-800">RePDF</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 ml-32">
            <a href="#merge" className="text-gray-600 hover:text-blue-500">
              Merge
            </a>
            <a href="#split" className="text-gray-600 hover:text-blue-500">
              Split
            </a>
            <a href="#compress" className="text-gray-600 hover:text-blue-500">
              Compress
            </a>
            <a href="#convert" className="text-gray-600 hover:text-blue-500">
              Convert
            </a>
          </nav>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ml-auto"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <a
              href="#merge"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-gray-50"
            >
              Merge
            </a>
            <a
              href="#split"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-gray-50"
            >
              Split
            </a>
            <a
              href="#compress"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-gray-50"
            >
              Compress
            </a>
            <a
              href="#convert"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-gray-50"
            >
              Convert
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
