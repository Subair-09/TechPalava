
import React from 'react';
import { JobItem } from '../types';

interface JobsSectionProps {
  jobs: JobItem[];
  loading?: boolean;
}

const JobsSection: React.FC<JobsSectionProps> = ({ jobs, loading }) => {
  return (
    <section id="jobs" className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 font-serif-heading transition-colors">Talent Board</h2>
            <p className="text-gray-600 dark:text-gray-400">Discover your next career move at the world's most innovative tech companies.</p>
          </div>
          <a href="#jobs" className="bg-gray-900 dark:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-black dark:hover:bg-blue-700 transition-all text-center">
            Post a Job for $199
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-xl dark:hover:shadow-blue-900/10 hover:border-blue-100 dark:hover:border-blue-900/50 transition-all flex items-start gap-5">
              <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
                <img src={job.logoUrl} alt={job.company} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{job.role}</h3>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-tight ${
                    job.type === 'Remote' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                    job.type === 'Full-time' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 
                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {job.type}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">{job.company} · {job.location}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{job.salary}</span>
                  <button className="text-blue-600 dark:text-blue-400 text-sm font-bold hover:underline">Apply Now</button>
                </div>
              </div>
            </div>
          ))}

          {loading && jobs.length === 0 && (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 animate-pulse flex items-start gap-5">
                <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 flex-shrink-0"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#jobs" className="inline-flex items-center gap-2 text-gray-900 dark:text-gray-100 font-extrabold border-b-2 border-gray-900 dark:border-gray-100 pb-1 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 transition-all">
            Browse all open roles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
