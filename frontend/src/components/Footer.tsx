import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 text-sm py-20 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-3 text-center">
        <span className="text-base font-medium">&copy; 2025 RePDF</span>
        <div className="flex space-x-6">
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/terms" className="hover:underline">
            Terms
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
        <span className="text-xs text-gray-500">
          Edit PDFs easily in your browser. No sign-up required.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
