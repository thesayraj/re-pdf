import React from 'react';
import { FileText, Image, Edit, PenTool, Upload, Download } from 'lucide-react';

const tools = [
  {
    name: 'PDF to JPG',
    description: 'Convert PDF documents to high-quality JPG images',
    href: '/pdf-to-jpg',
    icon: Image,
    color: 'bg-blue-500',
    popular: true
  },
  {
    name: 'Word to PDF',
    description: 'Convert Word documents to PDF format',
    href: '/word-to-pdf',
    icon: FileText,
    color: 'bg-green-500',
    popular: false
  },
  {
    name: 'PDF Editor',
    description: 'Edit and modify PDF documents online',
    href: '/pdf-editor',
    icon: Edit,
    color: 'bg-purple-500',
    popular: true
  },
  {
    name: 'Sign PDF',
    description: 'Add digital signatures to your PDFs',
    href: '/sign-pdf',
    icon: PenTool,
    color: 'bg-orange-500',
    popular: false
  }
];

const ToolPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-4">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">PDFTools</span>
            </a>
            <div className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
              <a href="#tools" className="text-gray-600 hover:text-blue-600">Tools</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600">About</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Free Online PDF Tools
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Convert, edit, and manage your PDF documents with ease. 
              No registration required, completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pdf-to-jpg"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
              >
                <Image className="h-5 w-5 mr-2" />
                Convert PDF to JPG
              </a>
              <a
                href="#tools"
                className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
              >
                View All Tools
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Tool
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select from our comprehensive collection of PDF tools to handle all your document needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <a
                  key={tool.name}
                  href={tool.href}
                  className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {tool.popular && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className={`${tool.color} rounded-lg p-3 w-12 h-12 mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      <span>Try it now</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our PDF Tools?
            </h2>
            <p className="text-lg text-gray-600">
              Fast, secure, and completely free PDF processing tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
                <Upload className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Simple drag-and-drop interface. No technical knowledge required.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
                <FileText className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your files are processed securely and deleted automatically.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
                <Download className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Processing</h3>
              <p className="text-gray-600">
                Lightning-fast conversion with batch processing support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Choose a tool and start converting your PDFs in seconds
          </p>
          <a
            href="/pdf-to-jpg"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 transition-colors"
          >
            <Image className="h-5 w-5 mr-2" />
            Start with PDF to JPG
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <a href="/" className="flex items-center space-x-2 mb-4">
                <FileText className="h-6 w-6" />
                <span className="text-lg font-bold">PDFTools</span>
              </a>
              <p className="text-gray-400">
                Free online PDF tools for all your document processing needs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">PDF Tools</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/pdf-to-jpg" className="hover:text-white">PDF to JPG</a></li>
                <li><a href="/word-to-pdf" className="hover:text-white">Word to PDF</a></li>
                <li><a href="/pdf-editor" className="hover:text-white">PDF Editor</a></li>
                <li><a href="/sign-pdf" className="hover:text-white">Sign PDF</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PDFTools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ToolPage;
