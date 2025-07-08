import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Menu, X } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">BI Showcase</h1>
              <p className="text-xs text-white/70">Gaming & Mobile Analytics</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            <Link to="/" className="text-white/90 hover:text-white transition-colors text-sm">
              Home
            </Link>
            <Link to="/dashboard/executive" className="text-white/90 hover:text-white transition-colors text-sm">
              Executive
            </Link>
            <Link to="/dashboard/product" className="text-white/90 hover:text-white transition-colors text-sm">
              Product
            </Link>
            <Link to="/dashboard/ua-monetization" className="text-white/90 hover:text-white transition-colors text-sm">
              UA & Monetization
            </Link>
            <Link to="/dashboard/technical" className="text-white/90 hover:text-white transition-colors text-sm">
              Technical
            </Link>
            <Link to="/dashboard/finance" className="text-white/90 hover:text-white transition-colors text-sm">
              Finance
            </Link>
            <Link to="/charts" className="text-white/90 hover:text-white transition-colors text-sm">
              Charts
            </Link>
            <Link to="/metrics" className="text-white/90 hover:text-white transition-colors text-sm">
              Metrics
            </Link>
            <Link to="/analytics" className="text-white/90 hover:text-white transition-colors text-sm">
              Analytics
            </Link>
            <Link to="/development" className="text-white/90 hover:text-white transition-colors text-sm">
              Development
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="px-4 py-2 space-y-1">
            <Link to="/" className="block px-3 py-2 text-white/90 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/dashboard/executive" className="block px-3 py-2 text-white/90 hover:text-white transition-colors">
              Executive Dashboard
            </Link>
            <Link to="/dashboard/product" className="block px-3 py-2 text-white/90 hover:text-white transition-colors">
              Product Dashboard
            </Link>
            <Link to="/dashboard/ua-monetization" className="block px-3 py-2 text-white/90 hover:text-white transition-colors">
              UA & Monetization
            </Link>
            <Link to="/dashboard/technical" className="block px-3 py-2 text-white/90 hover:text-white transition-colors">
              Technical Dashboard
            </Link>
            <Link to="/dashboard/finance" className="block px-3 py-2 text-white/90 hover:text-white transition-colors">
              Finance Dashboard
            </Link>
            <Link to="/charts" className="block px-3 py-2 text-white/90 hover:text-white transition-colors">
              Charts
            </Link>
            <Link to="/metrics" className="block px-3 py-2 text-white/90 hover:text-white transition-colors">
              Metrics
            </Link>
            <Link to="/analytics" className="block px-3 py-2 text-white/90 hover:text-white transition-colors">
              Advanced Analytics
            </Link>
            <Link to="/development" className="block px-3 py-2 text-white/90 hover:text-white transition-colors">
              Development
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
