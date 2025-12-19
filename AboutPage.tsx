
import React from 'react';

const AboutPage: React.FC = () => {
  const coverageAreas = [
    {
      title: 'Tech News & Startups',
      description: 'Breaking updates on funding rounds, product launches, and the founders building the future.'
    },
    {
      title: 'Jobs & Opportunities',
      description: 'A dedicated pipeline connecting world-class talent with high-growth tech ventures.'
    },
    {
      title: 'Events & Ecosystem',
      description: 'Comprehensive coverage of conferences, meetups, and workshops defining the tech calendar.'
    },
    {
      title: 'In-depth Analysis',
      description: 'Deep dives into market shifts, policy changes, and the structural economics of innovation.'
    },
    {
      title: 'Founder Spotlights',
      description: 'Exclusive interviews and profiles of the individuals leading Africa’s digital transformation.'
    }
  ];

  const values = [
    {
      title: 'Accuracy & Integrity',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      description: 'We believe in the power of truth. Our reporting is verified, balanced, and held to the highest editorial standards.'
    },
    {
      title: 'Editorial Independence',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
      description: 'Our newsroom is separate from our commercial partnerships. We report without fear or favor.'
    },
    {
      title: 'Community Impact',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      description: 'We exist to empower the tech community with the information they need to build and scale successfully.'
    },
    {
      title: 'African-first Perspective',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      description: 'While our reach is global, our heart is in Africa. we provide context that foreign media often misses.'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      {/* 1. Hero Section */}
      <section className="pt-24 pb-20 bg-gray-50/50 dark:bg-gray-900/10 border-b-2 border-gray-200 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="text-blue-600 dark:text-blue-400 font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">OUR STORY</span>
            <h1 className="text-6xl md:text-8xl font-black font-serif-heading dark:text-white leading-[0.85] tracking-tighter mb-8">
              About <span className="italic text-gray-300 dark:text-gray-700">TechPalava</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Telling Africa’s tech stories with clarity, depth, and integrity. We are the premier platform for the modern builder.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Intro Text / Why Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-black font-serif-heading dark:text-white mb-8 italic">The Newsroom Africa Needs</h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              <p>
                In a rapidly evolving global economy, technology has become the primary driver of progress across the African continent. Yet, the stories behind this transformation often lack the depth and nuance they deserve.
              </p>
              <p>
                TechPalava was founded to fill this gap. We are more than just a news site; we are a dedicated media platform focused on the startups, innovation, policy, and digital culture shaping our collective future.
              </p>
              <p>
                Our commitment is simple: to provide accurate, insightful, and timely coverage that informs rather than sensationalizes. From the bustling tech hubs of Lagos and Nairobi to the venture capital boardrooms of Cape Town and beyond, TechPalava is on the ground, deciphering the future.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 bg-gray-50 dark:bg-gray-900/50 p-10 rounded-[3rem] border-[3px] border-gray-300 dark:border-gray-800 shadow-md">
            <h3 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-10">CORE PILLARS</h3>
            <div className="space-y-12">
              <div>
                <h4 className="text-lg font-bold dark:text-white mb-2 uppercase tracking-tight">The Mission</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  To provide accurate, insightful, and timely coverage of technology and innovation across Africa, empowering the next generation of builders.
                </p>
              </div>
              <div className="h-0.5 bg-gray-300 dark:bg-gray-800 w-full"></div>
              <div>
                <h4 className="text-lg font-bold dark:text-white mb-2 uppercase tracking-tight">The Vision</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  To become the definitive trusted reference point for African tech news and analysis globally, bridge the information gap between the continent and the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Cover */}
      <section className="py-24 bg-gray-950 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black font-serif-heading mb-4 italic">What We Cover</h2>
            <p className="text-gray-400 max-w-xl mx-auto font-medium text-lg">Specialized verticals tailored for the tech-literate professional.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coverageAreas.map((area, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">{area.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      </section>

      {/* 4. Values Section */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em] mb-4 block">OUR VALUES</span>
          <h2 className="text-4xl md:text-5xl font-black font-serif-heading dark:text-white italic leading-tight">Built on Integrity</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {values.map((v, i) => (
            <div key={i} className="text-center space-y-6">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border-[3px] border-gray-300 dark:border-gray-800 flex items-center justify-center mx-auto text-blue-600 shadow-sm transition-all group-hover:shadow-md">
                {v.icon}
              </div>
              <h4 className="text-lg font-bold dark:text-white uppercase tracking-tight">{v.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/30 border-y-2 border-gray-200 dark:border-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black font-serif-heading dark:text-white mb-10 italic">Ready to engage with Africa’s tech future?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#news" className="w-full sm:w-auto px-10 py-4 bg-gray-900 dark:bg-blue-600 text-white font-black rounded-2xl hover:bg-black dark:hover:bg-blue-700 transition-all uppercase text-[10px] tracking-widest shadow-xl text-center">
              Explore News
            </a>
            <a href="#advertise" className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-black rounded-2xl border-[3px] border-gray-300 dark:border-gray-700 hover:border-blue-600 transition-all uppercase text-[10px] tracking-widest text-center shadow-md">
              Advertise with us
            </a>
            <a href="#contact" className="w-full sm:w-auto px-10 py-4 bg-transparent text-blue-600 font-black rounded-2xl hover:underline transition-all uppercase text-[10px] tracking-widest text-center">
              Contact Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
