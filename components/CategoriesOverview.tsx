
import React from 'react';
import { CATEGORIES } from '../constants';

const CategoriesOverview: React.FC = () => {
  return (
    <section className="relative py-24 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      {/* Background decoration for better glass effect visibility */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 font-serif-heading text-gray-900 dark:text-white tracking-tight">
              Curated <span className="text-blue-600 dark:text-blue-400 italic">Knowledge</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed">
              Explore specialized verticals and stay ahead in the global tech race.
            </p>
          </div>
          <button className="group flex items-center gap-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-6 py-3 rounded-2xl text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all">
            View All Desks
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat) => (
            <a 
              key={cat.slug} 
              href={`#${cat.slug}`}
              className="group relative h-52 rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center p-6 transition-all hover:-translate-y-2"
            >
              {/* The Glass Container */}
              <div className="absolute inset-0 bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-xl group-hover:shadow-2xl transition-all"></div>
              
              {/* Subtle Color Accent in background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-5">
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/10 border-2 border-gray-200 dark:border-white/20 text-gray-900 dark:text-white shadow-sm group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-300">
                  {cat.icon}
                </div>
                <span className="font-bold text-xs tracking-widest uppercase text-gray-900 dark:text-white text-center">
                  {cat.name}
                </span>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesOverview;
