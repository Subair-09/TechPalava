
import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2 group">
              <span className="text-3xl font-extrabold tracking-tighter text-blue-600 font-serif-heading group-hover:scale-110 transition-transform">TP</span>
              <span className="text-2xl font-bold tracking-tight hidden sm:block dark:text-white transition-colors">TechPalava</span>
            </a>
          </div>

          {/* Desktop Navigation - Direct & Clean */}
          <nav className="hidden md:flex space-x-10 items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-bold transition-all hover:text-blue-600 dark:hover:text-blue-400 ${
                  window.location.hash === link.href ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-gray-200 dark:border-gray-800"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            <button className="hidden lg:block bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10">
              Get Started
            </button>
            
            <button 
              className="md:hidden p-2 text-gray-600 dark:text-gray-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Navigation */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-950 p-8 shadow-2xl flex flex-col">
          <button className="self-end p-2 text-gray-500 mb-10" onClick={() => setIsMenuOpen(false)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-black text-gray-900 dark:text-white font-serif-heading"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="mt-auto">
            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl">Subscribe Now</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
