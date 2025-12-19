
import React, { useState, useMemo } from 'react';
import { JobItem } from './types';

interface JobsPageProps {
  jobs: JobItem[];
  loading: boolean;
}

const JobsPage: React.FC<JobsPageProps> = ({ jobs, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(5);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || job.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [jobs, searchQuery, selectedType]);

  const displayedJobs = useMemo(() => {
    return filteredJobs.slice(0, visibleCount);
  }, [filteredJobs, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const jobTypes = ['Full-time', 'Remote', 'Contract'];

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300 min-h-screen text-gray-900 dark:text-white">
      {/* Career Masthead */}
      <section className="pt-16 pb-20 border-b-2 border-gray-100 dark:border-gray-900 bg-gray-50 dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-blue-600 dark:text-blue-400 font-black tracking-[0.3em] text-[10px] uppercase mb-4 block">TALENT ECOSYSTEM</span>
            <h1 className="text-6xl md:text-7xl font-black font-serif-heading dark:text-white leading-tight tracking-tighter mb-6">
              The <span className="italic text-gray-400 dark:text-gray-600">Career</span> Palava
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-400 leading-relaxed font-medium">
              Connecting elite talent with high-growth ventures across the global tech frontier. Your next chapter begins here.
            </p>
          </div>

          {/* Advanced Search & Filter Bar */}
          <div className="mt-12 p-3 bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border-2 border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-stretch md:items-center gap-2">
            <div className="flex-1 relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input 
                type="text" 
                placeholder="Search roles, companies, or locations..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(5); // Reset visible count on new search
                }}
                className="w-full bg-transparent py-5 pl-14 pr-6 text-gray-900 dark:text-white font-bold focus:outline-none placeholder-gray-400"
              />
            </div>
            <div className="h-10 w-px bg-gray-200 dark:bg-gray-800 hidden md:block"></div>
            <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => {
                  setSelectedType('all');
                  setVisibleCount(5);
                }}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                  selectedType === 'all' ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-400 dark:bg-gray-800 dark:border-gray-700'
                }`}
              >
                All Types
              </button>
              {jobTypes.map(type => (
                <button 
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setVisibleCount(5);
                  }}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                    selectedType === type ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-400 dark:bg-gray-800 dark:border-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <button className="md:ml-2 bg-gray-950 dark:bg-blue-600 text-white px-10 py-5 rounded-[1.8rem] font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-transform active:scale-95 shadow-xl">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-12 gap-12">
          
          {/* Listings Column */}
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center justify-between mb-10 border-b-2 border-gray-100 dark:border-gray-900 pb-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3">
                <span className="w-6 h-1 bg-blue-600 rounded-full"></span>
                {filteredJobs.length} Opportunities Found
              </h3>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                Sort: <span className="text-blue-600 cursor-pointer hover:underline">Newest ↓</span>
              </div>
            </div>

            <div className="space-y-8">
              {loading && jobs.length === 0 ? (
                [1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-40 w-full bg-gray-50 dark:bg-gray-900 rounded-[2rem] animate-pulse border-2 border-gray-100 dark:border-gray-800"></div>
                ))
              ) : displayedJobs.length > 0 ? (
                <>
                  {displayedJobs.map(job => (
                    <div key={job.id} className="group relative bg-white dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-800 p-8 rounded-[2.5rem] hover:border-blue-600 dark:hover:border-blue-500 transition-all hover:shadow-2xl hover:shadow-blue-900/5 flex flex-col sm:flex-row items-start sm:items-center gap-8 shadow-sm">
                      <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden flex-shrink-0 border-2 border-gray-200 dark:border-gray-700 p-3 shadow-inner">
                        <img src={job.logoUrl} alt={job.company} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-full tracking-widest border ${
                            job.type === 'Remote' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400' : 
                            job.type === 'Full-time' ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' : 
                            'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400'
                          }`}>
                            {job.type}
                          </span>
                          <span className="text-gray-300 dark:text-gray-700">•</span>
                          <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{job.location}</span>
                        </div>
                        <h4 className="text-2xl font-black font-serif-heading text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors leading-tight">{job.role}</h4>
                        <p className="text-gray-600 dark:text-gray-400 font-bold text-sm uppercase tracking-tighter">{job.company}</p>
                      </div>
                      <div className="flex flex-col items-end gap-4 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
                        <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">{job.salary}</span>
                        <button className="w-full sm:w-auto px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-lg active:scale-95">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Load More Button Container */}
                  {visibleCount < filteredJobs.length && (
                    <div className="pt-12 flex flex-col items-center">
                      <button 
                        onClick={handleLoadMore}
                        className="px-12 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-black rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl uppercase text-[10px] tracking-[0.2em] active:scale-95"
                      >
                        More Opportunities
                      </button>
                      <p className="mt-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">
                        {displayedJobs.length} of {filteredJobs.length} listed
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-24 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[3rem]">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 shadow-inner">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No matches found</h4>
                  <p className="text-gray-500 font-medium">Try adjusting your filters or search keywords.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="col-span-12 lg:col-span-4 space-y-12">
            
            {/* Post Job Card */}
            <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-600/30 relative overflow-hidden border-4 border-white dark:border-transparent">
              <div className="relative z-10">
                <h4 className="text-3xl font-serif-heading italic font-bold mb-6">Hire the best in tech.</h4>
                <p className="text-blue-100 font-medium mb-8 leading-relaxed">
                  Join hundreds of top-tier companies finding their next star engineer or product lead on TechPalava.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-sm font-bold">
                    <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    50k+ Monthly Active Seekers
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold">
                    <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    Premium Brand Placement
                  </li>
                </ul>
                <button className="w-full bg-white text-blue-600 font-black py-5 rounded-2xl hover:bg-gray-100 transition-all uppercase text-[10px] tracking-[0.2em] shadow-xl active:scale-95">
                  Post Listing — $199
                </button>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Newsletter In-feed */}
            <div className="bg-gray-950 dark:bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden border-2 border-gray-800">
              <div className="relative z-10">
                <h4 className="text-2xl font-serif-heading italic font-bold mb-4">Career Hacks.</h4>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium">
                  Salary negotiation, resume teardowns, and market shifts. Once a week.
                </p>
                <div className="space-y-4">
                  <input type="email" placeholder="Email address" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
                  <button className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-all uppercase text-[10px] tracking-[0.2em] active:scale-95">JOIN LIST</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPage;
