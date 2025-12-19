
import React, { useState, useEffect, useCallback } from 'react';

interface AdSlide {
  id: number;
  partner: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  link: string;
}

const ADS: AdSlide[] = [
  {
    id: 1,
    partner: "AWS for Startups",
    title: "Scale Your Vision with $100k in Cloud Credits",
    description: "Build, grow, and scale your startup with the most comprehensive cloud platform. Get access to mentorship, training, and resources designed specifically for early-stage builders.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    ctaText: "APPLY NOW",
    link: "#"
  },
  {
    id: 2,
    partner: "Stripe Connect",
    title: "Global Payments for the Next Billion Users",
    description: "The economic infrastructure for the internet. Start accepting payments in minutes and build complex marketplaces with a single integration. Trusted by millions of businesses.",
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1200&auto=format&fit=crop",
    ctaText: "GET STARTED",
    link: "#"
  },
  {
    id: 3,
    partner: "Linear",
    title: "The Modern Tool for High-Performance Teams",
    description: "Linear helps you streamline software projects, sprints, tasks, and bug tracking. It's built for how teams actually work today. Speed is its core feature.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    ctaText: "TRY LINEAR",
    link: "#"
  },
  {
    id: 4,
    partner: "Intercom AI",
    title: "Fin: The AI Bot That Resolves 50% of Support",
    description: "Provide instant, accurate answers to your customers with our next-gen AI bot. Reduce support volume and improve customer satisfaction overnight with no-code setup.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=1200&auto=format&fit=crop",
    ctaText: "MEET FIN",
    link: "#"
  },
  {
    id: 5,
    partner: "DigitalOcean",
    title: "Simple Cloud Computing for Developers",
    description: "Deploy and scale with the cloud platform that gives you the flexibility you need. Our Droplets, Kubernetes, and App Platform are designed for developers, by developers.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=1200&auto=format&fit=crop",
    ctaText: "CLAIM CREDIT",
    link: "#"
  }
];

const AdsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % ADS.length);
      setIsTransitioning(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Reduced to 10 seconds for a more dynamic feel
    const timer = setInterval(nextSlide, 10000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentAd = ADS[activeIndex];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">PARTNER CONTENT</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
        </div>

        <div className="relative rounded-[3rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden min-h-[500px] flex items-stretch transition-colors duration-300">
          
          <div className={`flex flex-col lg:flex-row w-full transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            
            {/* Ad Content */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center order-2 lg:order-1 relative z-10">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-black text-sm uppercase tracking-widest">
                  {currentAd.partner}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Sponsored</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black mb-6 font-serif-heading leading-tight dark:text-white tracking-tight">
                {currentAd.title}
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-medium transition-colors">
                {currentAd.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button className="w-full sm:w-auto px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all transform hover:-translate-y-1 shadow-xl active:scale-95">
                  {currentAd.ctaText}
                </button>
              </div>
            </div>

            {/* Ad Image */}
            <div className="w-full lg:w-1/2 relative h-[300px] lg:h-auto order-1 lg:order-2 overflow-hidden bg-gray-100 dark:bg-gray-800 transition-colors">
              <img 
                src={currentAd.image} 
                alt={currentAd.partner} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 lg:bg-gradient-to-r lg:from-white lg:dark:from-gray-900 to-transparent pointer-events-none opacity-20 lg:opacity-60"></div>
            </div>
          </div>

          {/* Ad Carousel Nav */}
          <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
            {ADS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if(idx !== activeIndex) {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setActiveIndex(idx);
                      setIsTransitioning(false);
                    }, 500);
                  }
                }}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  activeIndex === idx 
                    ? 'w-10 bg-blue-600' 
                    : 'w-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'
                }`}
                aria-label={`Go to ad ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                NEXT AD ROTATION IN <span className="text-blue-600 dark:text-blue-400">10 SECONDS</span>
            </p>
        </div>
      </div>
    </section>
  );
};

export default AdsSection;
