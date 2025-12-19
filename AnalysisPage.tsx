
import React, { useState, useMemo } from 'react';
import { AnalysisItem, Contributor } from './types';
import { SAMPLE_ANALYSIS, SAMPLE_CONTRIBUTORS } from './constants';

const AnalysisPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredAnalysis = useMemo(() => SAMPLE_ANALYSIS[0], []);
  const allTags = useMemo(() => {
    const tags = new Set(['All']);
    SAMPLE_ANALYSIS.forEach(a => a.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, []);

  const filteredAnalysis = useMemo(() => {
    return SAMPLE_ANALYSIS.slice(1).filter(item => {
      const matchesTag = selectedTag === 'All' || item.tags.includes(selectedTag);
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [selectedTag, searchQuery]);

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300 min-h-screen font-sans text-gray-900 dark:text-white">
      {/* 1. Page Header */}
      <header className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b-2 border-gray-200 dark:border-gray-900">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black font-serif-heading leading-[0.85] tracking-tighter mb-6">
            Tech <span className="italic text-gray-400 dark:text-gray-700">Analysis</span>
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
            Deep dives and insights into the global tech ecosystem, with a focus on the structural shifts defining Africa's digital future.
          </p>
        </div>
      </header>

      {/* 2. Featured Analysis */}
      {featuredAnalysis && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden bg-gray-200 dark:bg-gray-900 shadow-2xl border-4 border-white dark:border-gray-800">
                <img 
                  src={featuredAnalysis.imageUrl} 
                  alt={featuredAnalysis.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Featured Analysis</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{featuredAnalysis.readTime}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-serif-heading leading-[1.1] mb-8 group hover:text-blue-600 transition-colors cursor-pointer">
                {featuredAnalysis.title}
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-400 font-medium leading-relaxed mb-10">
                {featuredAnalysis.summary}
              </p>
              <div className="flex items-center gap-4">
                <img src={featuredAnalysis.authorImage} alt={featuredAnalysis.author} className="w-12 h-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-800 shadow-md" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white leading-tight">{featuredAnalysis.author}</p>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-tighter">{featuredAnalysis.authorRole}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Filters Bar */}
      <section className="sticky top-20 z-40 bg-white/90 dark:bg-gray-950/80 backdrop-blur-xl border-y-2 border-gray-200 dark:border-gray-900 py-6 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
              {allTags.map(tag => (
                <button 
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                    selectedTag === tag 
                      ? 'bg-gray-900 border-gray-900 text-white dark:bg-blue-600 dark:border-blue-600' 
                      : 'bg-gray-100 border-gray-200 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-500 dark:hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search analysis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full py-2.5 pl-10 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:text-white"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* 3. Analysis Feed - Grid with Images */}
          <div className="lg:col-span-8">
            {filteredAnalysis.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
                {filteredAnalysis.map(item => (
                  <article key={item.id} className="group flex flex-col transition-all bg-white dark:bg-transparent rounded-[2rem] overflow-hidden border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-800 hover:shadow-xl p-4 -m-4">
                    <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white dark:bg-gray-950 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-800">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tighter">{item.date}</span>
                        <span className="text-gray-300 dark:text-gray-700">•</span>
                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tighter">{item.readTime}</span>
                      </div>
                      <h3 className="text-2xl font-black font-serif-heading dark:text-white leading-tight mb-4 group-hover:text-blue-600 transition-colors cursor-pointer">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium text-sm leading-relaxed mb-6 line-clamp-3">
                        {item.summary}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-6 border-t-2 border-gray-100 dark:border-gray-900">
                        <div className="flex items-center gap-2">
                           <img src={item.authorImage} alt={item.author} className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm" />
                           <span className="text-[10px] font-black uppercase text-gray-900 dark:text-white tracking-widest">{item.author}</span>
                        </div>
                        <div className="flex gap-1.5">
                           {item.tags.slice(0, 2).map(t => (
                             <span key={t} className="text-[8px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-tighter bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">#{t}</span>
                           ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center opacity-50">
                <p className="text-xl font-medium dark:text-white">No analysis found matching your filters.</p>
              </div>
            )}

            {/* Pagination / Load More */}
            <div className="pt-20 flex justify-center border-t-2 border-gray-100 dark:border-gray-900 mt-16">
              <button className="px-10 py-4 border-2 border-gray-900 dark:border-gray-800 text-gray-900 dark:text-white font-black rounded-2xl hover:bg-gray-900 hover:text-white dark:hover:border-blue-600 dark:hover:text-blue-600 transition-all uppercase text-xs tracking-widest shadow-lg">
                Older Insights
              </button>
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-16">
            
            {/* 6. Expert Contributors */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-8 flex items-center gap-3">
                <span className="w-4 h-px bg-gray-300 dark:bg-gray-700"></span>
                Top Minds
              </h4>
              <div className="space-y-6">
                {SAMPLE_CONTRIBUTORS.map(contributor => (
                  <div key={contributor.id} className="flex items-center gap-4 group cursor-pointer bg-white dark:bg-gray-900/50 p-4 rounded-3xl border-2 border-gray-200 dark:border-gray-800 hover:border-blue-600 dark:hover:border-blue-600 transition-all shadow-sm hover:shadow-xl">
                    <img src={contributor.image} alt={contributor.name} className="w-14 h-14 rounded-2xl grayscale group-hover:grayscale-0 transition-all shadow-sm border border-gray-100 dark:border-gray-800" />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{contributor.name}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{contributor.expertise}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Call to Action */}
            <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-600/30">
               <div className="relative z-10">
                  <h4 className="text-2xl font-black font-serif-heading italic leading-tight mb-4">Support Independent Analysis.</h4>
                  <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium">
                    Help us fund deep-dives that matter. Join 5k+ premium members today.
                  </p>
                  <button className="w-full bg-white text-blue-600 font-black py-4 rounded-xl hover:bg-gray-100 transition-all uppercase text-[10px] tracking-[0.2em] shadow-xl active:scale-95">
                    UPGRADE TO PREMIUM
                  </button>
               </div>
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            </div>

          </aside>
        </div>
      </main>

      {/* Subscription Footer CTA */}
      <section className="py-32 bg-gray-950 text-white text-center relative overflow-hidden">
         <div className="max-w-2xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black font-serif-heading italic mb-8">Stay Ahead of the Curve.</h2>
            <p className="text-gray-400 text-lg mb-12">Receive our monthly "Executive Digest" — a curated summary of our most impactful analysis.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="email" placeholder="you@company.com" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <button className="bg-blue-600 text-white font-black px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl uppercase text-xs tracking-widest">Join Insights</button>
            </div>
         </div>
         <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="analysis-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#analysis-grid)" />
            </svg>
         </div>
      </section>
    </div>
  );
};

export default AnalysisPage;
