
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { TechEvent } from './types';
import { SAMPLE_EVENTS } from './constants';

const EventsPage: React.FC = () => {
  const [filter, setFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Carousel State
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const filteredEvents = useMemo(() => {
    return SAMPLE_EVENTS.filter(event => {
      const matchesTime = filter === 'all' || (filter === 'upcoming' ? !event.isPast : event.isPast);
      const matchesType = typeFilter === 'all' || event.type === typeFilter;
      return matchesTime && matchesType;
    });
  }, [filter, typeFilter]);

  const featuredEvents = useMemo(() => 
    SAMPLE_EVENTS.filter(e => !e.isPast).slice(0, 3), 
  []);

  const nextSlide = useCallback(() => {
    if (featuredEvents.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveFeaturedIndex((prev) => (prev + 1) % featuredEvents.length);
      setIsTransitioning(false);
    }, 500);
  }, [featuredEvents.length]);

  const prevSlide = useCallback(() => {
    if (featuredEvents.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveFeaturedIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
      setIsTransitioning(false);
    }, 500);
  }, [featuredEvents.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentFeatured = featuredEvents[activeFeaturedIndex];
  const eventTypes = ['Conference', 'Meetup', 'Workshop', 'Hackathon'];

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300 min-h-screen text-gray-900 dark:text-white">
      {/* 1. Page Header */}
      <section className="pt-20 pb-16 bg-gray-50 dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-blue-600 dark:text-blue-400 font-black tracking-[0.3em] text-[10px] uppercase mb-4 block">ECOSYSTEM HUB</span>
            <h1 className="text-6xl md:text-8xl font-black font-serif-heading dark:text-white leading-[0.9] tracking-tighter mb-8">
              Tech <span className="italic text-gray-500 dark:text-gray-600 underline decoration-gray-300 dark:decoration-gray-800 underline-offset-8">Events</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400 leading-relaxed font-medium">
              Your comprehensive guide to the conferences, meetups, and workshops defining the global tech frontier.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Featured Event Section - Animated Carousel */}
      {featuredEvents.length > 0 && (
        <section className="py-20 relative overflow-hidden bg-white dark:bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative group rounded-[3rem] overflow-hidden bg-gray-900 aspect-[21/9] flex items-end shadow-2xl border-4 border-white dark:border-gray-800">
              
              {/* Slides Container */}
              <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
                <img 
                  src={currentFeatured.imageUrl} 
                  alt={currentFeatured.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[10s] ease-linear" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              {/* Content Overlay */}
              <div className={`relative z-10 p-10 md:p-16 w-full lg:w-2/3 transition-all duration-700 delay-100 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Featured Event</span>
                  <span className="text-white/70 text-sm font-bold">{currentFeatured.date}</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-serif-heading leading-tight italic">
                  {currentFeatured.title}
                </h2>
                <p className="text-xl text-white/80 mb-10 line-clamp-2 max-w-xl font-medium">
                  {currentFeatured.description}
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <button className="px-10 py-4 bg-white text-gray-900 font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-black/20 uppercase text-[10px] tracking-widest active:scale-95">
                    Register Now
                  </button>
                  <span className="flex items-center gap-2 text-white/70 font-bold uppercase tracking-widest text-xs">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {currentFeatured.location}
                  </span>
                </div>
              </div>

              {/* Carousel Navigation Arrows */}
              <div className="absolute right-10 bottom-10 z-20 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={prevSlide}
                  className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white hover:text-gray-900 transition-all active:scale-90"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white hover:text-gray-900 transition-all active:scale-90"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

              {/* Indicators */}
              <div className="absolute left-10 bottom-10 z-20 flex gap-2">
                {featuredEvents.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if(idx !== activeFeaturedIndex) {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setActiveFeaturedIndex(idx);
                          setIsTransitioning(false);
                        }, 500);
                      }
                    }}
                    className={`h-1.5 transition-all duration-500 rounded-full ${
                      activeFeaturedIndex === idx 
                        ? 'w-12 bg-white' 
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 3 & 4. Event Listing & Filters */}
      <section className="py-20 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Subtle Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 border-b-2 border-gray-100 dark:border-gray-900 pb-10">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 p-1.5 rounded-2xl border-2 border-gray-200 dark:border-gray-800">
              <button 
                onClick={() => setFilter('upcoming')}
                className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'upcoming' ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-md border border-gray-100 dark:border-gray-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => setFilter('past')}
                className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'past' ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-md border border-gray-100 dark:border-gray-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Past
              </button>
              <button 
                onClick={() => setFilter('all')}
                className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-md border border-gray-100 dark:border-gray-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                All
              </button>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full md:w-auto">
              <button 
                onClick={() => setTypeFilter('all')}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border-2 ${typeFilter === 'all' ? 'bg-gray-900 border-gray-900 text-white dark:bg-blue-600 dark:border-blue-600' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-800'}`}
              >
                All Types
              </button>
              {eventTypes.map(type => (
                <button 
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border-2 ${typeFilter === type ? 'bg-gray-900 border-gray-900 text-white dark:bg-blue-600 dark:border-blue-600' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-800'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {filteredEvents.map(event => (
                <article key={event.id} className={`group flex flex-col transition-all bg-white dark:bg-transparent rounded-[2.5rem] p-4 -m-4 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-800 hover:shadow-xl ${event.isPast ? 'opacity-70 grayscale hover:grayscale-0 hover:opacity-100' : ''}`}>
                  <div className="relative aspect-[3/2] rounded-3xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl border-2 ${event.isVirtual ? 'bg-purple-600 text-white border-purple-500' : 'bg-white text-gray-900 border-white'}`}>
                        {event.isVirtual ? 'Virtual' : 'Physical'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{event.type}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-800"></span>
                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{event.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-serif-heading group-hover:text-blue-600 transition-colors leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t-2 border-gray-100 dark:border-gray-900">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {event.location}
                    </span>
                    <a href={event.link} className="text-[10px] font-black uppercase text-blue-600 border-b-2 border-blue-600 pb-0.5 hover:text-blue-700 hover:border-blue-700 transition-all tracking-widest">
                      View Details
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">No events match your criteria.</h3>
              <p className="text-gray-500 mt-4 font-medium">Try clearing your filters to see more results.</p>
              <button onClick={() => {setFilter('all'); setTypeFilter('all');}} className="mt-8 text-blue-600 font-bold underline">Reset Filters</button>
            </div>
          )}
        </div>
      </section>

      {/* 6. Call-to-Action Section */}
      <section className="py-32 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-950 dark:bg-blue-600 rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden transition-colors border-4 border-white dark:border-transparent shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 font-serif-heading leading-tight italic">
                Hosting a tech event?
              </h2>
              <p className="text-xl text-white/70 mb-12 font-medium">
                Put your gathering in front of the global tech community. From small meetups to major summits, we help you find the right audience.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="px-12 py-5 bg-white text-gray-900 font-black rounded-2xl hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-2xl shadow-black/20 uppercase text-[10px] tracking-[0.2em] active:scale-95">
                  Submit an Event
                </button>
                <a href="#" className="text-white font-black uppercase text-[10px] tracking-[0.2em] border-b-2 border-white/40 pb-1 hover:border-white transition-all">
                  Partnership Inquiry
                </a>
              </div>
            </div>
            {/* Abstract Shape */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
