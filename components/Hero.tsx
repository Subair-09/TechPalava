
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white dark:bg-gray-950 pt-12 pb-16 lg:pt-20 lg:pb-28 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium leading-5 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 mb-6">
            <span>The heartbeat of global tech innovation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8 font-serif-heading leading-tight transition-colors">
            Deciphering the <span className="text-blue-600 italic dark:text-blue-400">Future of Tech</span> for Everyone.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto transition-colors">
            TechPalava brings you the most critical stories, analysis, and data from the heart of tech ecosystems across the globe. From Silicon Valley to Lagos, Bangalore to Nairobi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-blue-600 text-white font-bold rounded-2xl hover:bg-black dark:hover:bg-blue-700 transition-all shadow-xl shadow-gray-200 dark:shadow-blue-900/20">
              Read Latest Stories
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-transparent text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-800 font-bold rounded-2xl hover:border-blue-600 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
              Join the Community
            </button>
          </div>
        </div>
      </div>
      
      {/* Visual Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.05] dark:text-blue-500">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
