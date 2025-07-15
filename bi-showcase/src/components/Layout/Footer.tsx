import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  ExternalLink,
  Heart,
  Code,
  Gamepad2
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Executive Dashboard', href: '/dashboard/executive' },
        { name: 'Chart Gallery', href: '/charts' },
        { name: 'Metrics Library', href: '/metrics' },
        { name: 'Development Guide', href: '/development' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#', external: true },
        { name: 'API Reference', href: '#', external: true },
        { name: 'Best Practices', href: '#', external: true },
        { name: 'Case Studies', href: '#', external: true },
      ]
    },
    {
      title: 'Industry',
      links: [
        { name: 'Gaming Analytics', href: '#' },
        { name: 'Mobile App BI', href: '#' },
        { name: 'Benchmarks', href: '/metrics' },
        { name: 'KPI Library', href: '/metrics' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#', external: true },
      ]
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <Github className="h-5 w-5" />, href: '#' },
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, href: '#' },
    { name: 'Email', icon: <Mail className="h-5 w-5" />, href: 'mailto:contact@bi-showcase.com' },
  ];

  const stats = [
    { label: 'Charts & Visualizations', value: '20+' },
    { label: 'Gaming Metrics', value: '50+' },
    { label: 'Industry Benchmarks', value: '100+' },
    { label: 'Development Hours', value: '500+' },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Stats Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Comprehensive BI Platform for Gaming
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to build, implement, and scale a world-class 
              Business Intelligence system for gaming and mobile apps.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">BI Showcase</h3>
                <p className="text-xs text-gray-400">Gaming & Mobile Analytics</p>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-sm">
              A comprehensive Business Intelligence platform designed specifically 
              for gaming and mobile app companies. From dashboards to development guides.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} BI Showcase. All rights reserved.
              </p>
              <div className="flex items-center space-x-1 text-gray-400 text-sm">
                <span>Built with</span>
                <Heart className="h-4 w-4 text-red-500" />
                <span>for the</span>
                <Gamepad2 className="h-4 w-4 text-blue-500" />
                <span>gaming industry</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Badge */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Code className="h-3 w-3" />
              <span>React + TypeScript</span>
            </div>
            <span>•</span>
            <span>Vite + Tailwind CSS</span>
            <span>•</span>
            <span>Chart.js + Framer Motion</span>
            <span>•</span>
            <span>Mobile-First Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
