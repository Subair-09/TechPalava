
import React, { useState, useMemo } from 'react';
import { NewsItem } from './types';
import { CATEGORIES } from './constants';
import NewsCard from './components/NewsCard';

interface NewsPageProps {
  news: NewsItem[];
  loading: boolean;
}

const NewsPage: React.FC<NewsPageProps> = ({ news, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [news, selectedCategory, searchQuery]);

  const featuredStory = filteredNews[0];
  const gridNews = filteredNews.slice(1);

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300 min-h-screen">
      {/* 1️⃣ Page Header: Editorial Masthead */}
      <section className="pt-20 pb-16 bg-gray-50/30 dark:bg-gray-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <span className="text-blue-600 dark:text-blue-400 font-black tracking-[0.4em] text-[10px] uppercase mb-6 block">PREMIUM TECH JOURNALISM</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-serif-heading dark:text-white leading-[0.85] tracking-tighter mb-8">
              The <span className="italic text-gray-300 dark:text-gray-700">Latest</span> News
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 leading-relaxed font-medium max-w-2xl">
              In-depth reporting and breaking updates from the global tech frontier. No noise, just the stories that define the industry.
            </p>
          </div>
        </div>
      </section>

      {/* 4️⃣ Filters Bar & Search */}
      <section className="sticky top-20 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-y border-gray-100 dark:border-gray-900 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  selectedCategory === 'all' 
                    ? 'bg-gray-900 text-white dark:bg-blue-600' 
                    : 'bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                All Stories
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    selectedCategory === cat.slug 
                      ? 'bg-gray-900 text-white dark:bg-blue-600' 
                      : 'bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            
            <div className="relative w-full lg:w-72">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search headlines..."
                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-full py-2.5 pl-10 pr-4 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="space-y-16">
            <div className="h-[500px] w-full bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[3/2] bg-gray-50 dark:bg-gray-900 rounded-2xl animate-pulse"></div>
                  <div className="h-4 bg-gray-50 dark:bg-gray-900 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-50 dark:bg-gray-900 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="space-y-24">
            {/* 2️⃣ Featured News Block */}
            {featuredStory && (
              <section className="relative group">
                <NewsCard item={featuredStory} large />
              </section>
            )}

            {/* 3️⃣ News Feed Grid */}
            {gridNews.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 border-t border-gray-100 dark:border-gray-900 pt-20">
                {gridNews.map(item => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {/* 5️⃣ Load More Section */}
            <div className="pt-20 border-t border-gray-100 dark:border-gray-900 flex flex-col items-center">
              <button className="px-12 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-black rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all transform hover:-translate-y-1 shadow-xl uppercase text-xs tracking-[0.2em] active:scale-95">
                Load More Articles
              </button>
              <p className="mt-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Showing {filteredNews.length} of {news.length} articles
              </p>
            </div>
          </div>
        ) : (
          <div className="py-40 text-center">
             <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <h3 className="text-3xl font-bold dark:text-white mb-4">No stories found.</h3>
             <p className="text-gray-500 max-w-sm mx-auto">We couldn't find any articles matching your current filters or search terms.</p>
             <button onClick={() => {setSelectedCategory('all'); setSearchQuery('');}} className="mt-10 text-blue-600 font-black uppercase text-xs tracking-[0.2em] border-b-2 border-blue-600 pb-1 hover:text-blue-700 hover:border-blue-700 transition-all">Clear All Filters</button>
          </div>
        )}
      </main>

      {/* Editorial Newsletter Section */}
      <section className="bg-gray-950 py-24 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black font-serif-heading mb-8 italic">The Sunday Digest.</h2>
            <p className="text-gray-400 text-lg mb-12">Join 50,000+ tech leaders who receive our weekly breakdown of the most significant shifts in the ecosystem.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="email" placeholder="Enter your email" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
              <button className="bg-blue-600 text-white font-black px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl uppercase text-xs tracking-widest">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>
      </section>
    </div>
  );
};

export default NewsPage;
