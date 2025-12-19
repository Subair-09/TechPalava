
import React, { useState, useEffect, useCallback } from 'react';

interface SpotlightSlide {
  id: number;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
}

const SLIDES: SpotlightSlide[] = [
  {
    id: 1,
    tag: "Founder Spotlight",
    title: "How Tobi Lütke is Rewriting the Rules of E-commerce",
    excerpt: "An exclusive deep dive into the philosophy behind Shopify's growth and why the founder believes the future of the internet belongs to independent creators and local innovators.",
    image: "https://i.imgur.com/d7yStkU.jpg",
    readTime: "15 min read"
  },
  {
    id: 2,
    tag: "Market Leaders",
    title: "Whitney Wolfe Herd on the Next Frontier of Social AI",
    excerpt: "From Bumble to the future of digital safety. Wolfe Herd discusses how AI agents will soon manage our professional and personal networking, and the ethical guardrails required.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
    readTime: "10 min read"
  },
  {
    id: 3,
    tag: "The Builder's Journey",
    title: "Scaling to a Billion: The Jensen Huang Interview",
    excerpt: "The NVIDIA founder opens up about the 'near-death' experiences of the early GPU days and why he believes every country needs its own 'Sovereign AI' infrastructure today.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
    readTime: "18 min read"
  }
];

const FeaturedSpotlight: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
      setIsTransitioning(false);
    }, 400);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentSlide = SLIDES[activeIndex];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[3rem] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden min-h-[600px] flex items-stretch">
          
          {/* Main Slide Content Wrapper */}
          <div className={`flex flex-col lg:flex-row w-full transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            
            {/* Left Column: Content */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center order-2 lg:order-1 relative z-10">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  {currentSlide.tag}
                </span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black mb-8 font-serif-heading leading-[1.1] dark:text-white transition-colors tracking-tight">
                {currentSlide.title}
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-medium transition-colors">
                {currentSlide.excerpt}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-600/20 active:scale-95">
                  READ THE INTERVIEW
                </button>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {currentSlide.readTime}
                </div>
              </div>
            </div>

            {/* Right Column: Image - Clear, Bold, Side-by-Side */}
            <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto order-1 lg:order-2 overflow-hidden bg-gray-200 dark:bg-gray-800">
              <img 
                src={currentSlide.image} 
                alt={currentSlide.title} 
                className="absolute inset-0 w-full h-full object-cover object-top lg:object-center grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
              {/* Refined side-blend overlay for better text contrast while keeping image bold */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-gray-50 lg:dark:from-gray-900 lg:via-transparent lg:to-transparent pointer-events-none opacity-40 lg:opacity-80"></div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-8 lg:left-20 z-20 flex items-center gap-4">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if(idx !== activeIndex) {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setActiveIndex(idx);
                      setIsTransitioning(false);
                    }, 400);
                  }
                }}
                className={`group relative h-1.5 transition-all duration-500 rounded-full ${
                  activeIndex === idx 
                    ? 'w-16 bg-blue-600' 
                    : 'w-4 bg-gray-300 dark:bg-gray-700 hover:w-8 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span className="absolute -top-6 left-0 text-[10px] font-black text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  0{idx + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Simple Navigation Arrows */}
          <div className="absolute bottom-8 right-8 z-20 flex gap-4">
             <button 
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
                  setIsTransitioning(false);
                }, 400);
              }}
              className="p-4 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all shadow-xl active:scale-90"
             >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
             </button>
             <button 
              onClick={nextSlide}
              className="p-4 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all shadow-xl active:scale-90"
             >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpotlight;
