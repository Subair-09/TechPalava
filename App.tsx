import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NewsCard from './components/NewsCard';
import CategoriesOverview from './components/CategoriesOverview';
import FeaturedSpotlight from './components/FeaturedSpotlight';
import AdsSection from './components/AdsSection';
import JobsSection from './components/JobsSection';
import Footer from './components/Footer';
import NewsPage from './NewsPage';
import JobsPage from './JobsPage';
import AdvertisePage from './AdvertisePage';
import EventsPage from './EventsPage';
import AnalysisPage from './AnalysisPage';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';
import { fetchLatestNews, fetchJobs } from './services/geminiService';
import { NewsItem, JobItem } from './types';
import { SAMPLE_NEWS, SAMPLE_JOBS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'news' | 'jobs' | 'advertise' | 'events' | 'analysis' | 'contact' | 'about'>('home');
  const [news, setNews] = useState<NewsItem[]>(SAMPLE_NEWS);
  const [jobs, setJobs] = useState<JobItem[]>(SAMPLE_JOBS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [newsData, jobsData] = await Promise.all([
          fetchLatestNews(),
          fetchJobs(),
        ]);
        
        if (newsData && newsData.length > 0) {
          setNews(newsData);
        }
        if (jobsData && jobsData.length > 0) {
          setJobs(jobsData);
        }
      } catch (err) {
        console.error('Data loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '').split('?')[0];
      const baseHash = fullHash.split('/')[0];

      if (baseHash === 'news') setCurrentPage('news');
      else if (baseHash === 'jobs') setCurrentPage('jobs');
      else if (baseHash === 'advertise') setCurrentPage('advertise');
      else if (baseHash === 'events') setCurrentPage('events');
      else if (baseHash === 'analysis') setCurrentPage('analysis');
      else if (baseHash === 'contact') setCurrentPage('contact');
      else if (baseHash === 'about') setCurrentPage('about');
      else setCurrentPage('home');
      
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const featuredItem = news[0];
  const gridItems = news.slice(1, 4);

  const renderContent = () => {
    switch (currentPage) {
      case 'news':
        return <NewsPage news={news} loading={loading} />;
      case 'jobs':
        return <JobsPage jobs={jobs} loading={loading} />;
      case 'advertise':
        return <AdvertisePage />;
      case 'events':
        return <EventsPage />;
      case 'analysis':
        return <AnalysisPage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      default:
        return (
          <>
            <Hero />
            <section id="news-teaser" className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white font-serif-heading transition-colors">Latest Coverage</h2>
                  <a href="#news" className="text-blue-600 font-bold hover:underline">View All Stories →</a>
                </div>
                <div className="flex flex-col gap-12 lg:gap-20">
                  {featuredItem && <NewsCard item={featuredItem} large />}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {gridItems.map((item) => <NewsCard key={item.id} item={item} />)}
                  </div>
                </div>
              </div>
            </section>
            <CategoriesOverview />
            <FeaturedSpotlight />
            <AdsSection />
            <JobsSection jobs={jobs.slice(0, 4)} loading={loading} />
            <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-[3rem] p-12 lg:p-20 flex flex-col items-center text-center transition-colors">
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-8 rotate-3">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-serif-heading max-w-3xl dark:text-white">Ready to tell your brand's story to the right people?</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-xl max-w-2xl mb-12">From sponsored deep dives to custom event partnerships, we help the world's leading tech brands connect with innovators.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#advertise" className="px-10 py-4 bg-gray-900 dark:bg-blue-600 text-white font-bold rounded-2xl hover:bg-black dark:hover:bg-blue-700 transition-all text-center">Advertise with us</a>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />
      {renderContent()}
      <Footer />
    </div>
  );
};

export default App;