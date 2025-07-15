import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X,
  Home,
  Crown,
  Gamepad2,
  Target,
  Bug,
  Calculator,
  TrendingUp,
  BarChart3,
  BookOpen,
  Settings,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    {
      title: 'Home',
      path: '/',
      icon: <Home className="h-5 w-5" />,
      description: 'Dashboard Overview'
    },
    {
      title: 'Dashboards',
      items: [
        {
          title: 'Executive',
          path: '/dashboard/executive',
          icon: <Crown className="h-5 w-5" />,
          description: 'Leadership & Decision Makers'
        },
        {
          title: 'Product Analytics',
          path: '/dashboard/product',
          icon: <Gamepad2 className="h-5 w-5" />,
          description: 'Product Owners & Game Designers'
        },
        {
          title: 'UA & Monetization',
          path: '/dashboard/ua-monetization',
          icon: <Target className="h-5 w-5" />,
          description: 'Marketing & Growth Teams'
        },
        {
          title: 'Technical Health',
          path: '/dashboard/technical',
          icon: <Bug className="h-5 w-5" />,
          description: 'QA & Development Teams'
        },
        {
          title: 'Financial Analytics',
          path: '/dashboard/finance',
          icon: <Calculator className="h-5 w-5" />,
          description: 'Finance & Operations'
        },
        {
          title: 'Growth & Engagement',
          path: '/dashboard/growth-engagement',
          icon: <TrendingUp className="h-5 w-5" />,
          description: 'Growth & Product Teams'
        }
      ]
    },
    {
      title: 'Tools & Resources',
      items: [
        {
          title: 'Charts Gallery',
          path: '/charts',
          icon: <BarChart3 className="h-5 w-5" />,
          description: 'Chart Components'
        },
        {
          title: 'Metrics Library',
          path: '/metrics',
          icon: <BookOpen className="h-5 w-5" />,
          description: 'KPI Definitions'
        },
        {
          title: 'Advanced Analytics',
          path: '/analytics',
          icon: <Settings className="h-5 w-5" />,
          description: 'Advanced Features'
        },
        {
          title: 'Development Guide',
          path: '/development',
          icon: <BookOpen className="h-5 w-5" />,
          description: 'Developer Resources'
        }
      ]
    }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop - only on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900/95 backdrop-blur-md border-r border-gray-700/50 z-50 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">BI Dashboard</h2>
              <p className="text-gray-400 text-xs">Game Analytics Platform</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <nav className="px-4 space-y-6">
            {navigationItems.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {section.path ? (
                  // Single item
                  <Link
                    to={section.path}
                    onClick={handleLinkClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] ${
                      isActivePath(section.path)
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50 hover:shadow-md'
                    }`}
                  >
                    {section.icon}
                    <div className="flex-1">
                      <div className="font-medium">{section.title}</div>
                      {section.description && (
                        <div className="text-xs text-gray-500">{section.description}</div>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </Link>
                ) : (
                  // Section with items
                  <div>
                    <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wider mb-3 px-3">
                      {section.title}
                    </h3>
                    <div className="space-y-1">
                      {section.items?.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          to={item.path}
                          onClick={handleLinkClick}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] ${
                            isActivePath(item.path)
                              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg'
                              : 'text-gray-300 hover:text-white hover:bg-gray-800/50 hover:shadow-md'
                          }`}
                        >
                          {item.icon}
                          <div className="flex-1">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                          <ChevronRight className="h-4 w-4 opacity-50" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700/50">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Live Data</span>
            </div>
            <p className="text-gray-300 text-xs">
              Real-time analytics and simulation running
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
