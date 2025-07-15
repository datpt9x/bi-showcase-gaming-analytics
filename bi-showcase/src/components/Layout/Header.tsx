import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BarChart3, Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isSidebarOpen }) => {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left side - Menu button and Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
              title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Mobile Logo */}
            <Link to="/" className="lg:hidden flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">BI Dashboard</h1>
              </div>
            </Link>
          </div>

          {/* Center - Search (desktop) */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search dashboards, metrics..."
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Search button (mobile) */}
            <button className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <button className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <button className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
