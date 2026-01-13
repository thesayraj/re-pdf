import React from "react";
import { Link } from "react-router";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 text-sm py-20 px-4 pb-35">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-3 text-center">
        <span className="text-base font-medium">&copy; 2025 RePDF</span>
        <div className="flex space-x-6">
          <Link to="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
        <span className="text-xs text-gray-500">
          Edit PDFs easily in your browser. No sign-up required.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
