
import React, { useState } from 'react';

const AdvertisePage: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    type: 'Branded Analysis & Deep Dives',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API delivery
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        type: 'Branded Analysis & Deep Dives',
        message: ''
      });
    }, 1500);
  };

  const whyAdvertise = [
    {
      title: "Tech-Focused Audience",
      description: "Our readers are deeply embedded in technology, from software engineers to CTOs."
    },
    {
      title: "Decision Makers",
      description: "Over 60% of our audience consists of startup founders, C-suite executives, and investors."
    },
    {
      title: "Pan-African Reach",
      description: "Connect with the fastest-growing tech hubs in Lagos, Nairobi, Cape Town, and beyond."
    }
  ];

  const audienceStats = [
    { label: 'Monthly Readers', value: '2.5M+', sub: 'Engaged tech professionals' },
    { label: 'Newsletter Subs', value: '150K+', sub: 'Decision-makers & Founders' },
    { label: 'Countries Covered', value: '180+', sub: 'Sub-Saharan & Global reach' },
    { label: 'Engagement Rate', value: '42%', sub: 'Industry-leading open rates' },
  ];

  const adOptions = [
    {
      title: 'Sponsored Articles',
      description: 'Long-form editorial analysis of your technology or market category, written by our expert staff.',
      useCase: 'Best for Brand Authority',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /></svg>
    },
    {
      title: 'Newsletter Sponsorship',
      description: 'The primary way Africa\'s tech elite starts their day. High-visibility slots in our daily digest.',
      useCase: 'Best for Lead Gen & Awareness',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002-2z" /></svg>
    },
    {
      title: 'Banner Placements',
      description: 'Strategic high-impact display units across our most-read news and analysis pages.',
      useCase: 'Best for Product Launches',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 13h16" /></svg>
    },
    {
      title: 'Job Board Promotion',
      description: 'Hyper-target the industry\'s best engineering and product talent directly in their feed.',
      useCase: 'Best for Recruiting',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300 min-h-screen">
      {/* 1️⃣ Page Header */}
      <section className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black font-serif-heading dark:text-white leading-[0.9] tracking-tighter mb-8 transition-colors">
            Advertise With Us
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-2xl">
            Reach Africa’s growing tech audience and connect with the pioneers of the digital economy.
          </p>
        </div>
      </section>

      {/* 2️⃣ Why Advertise With TechPalava */}
      <section className="py-20 border-y-2 border-gray-200 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {whyAdvertise.map((item, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ Audience Snapshot */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-bold font-serif-heading dark:text-white mb-4 italic">Audience Snapshot</h2>
          <div className="h-1.5 w-20 bg-blue-600"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {audienceStats.map((stat, i) => (
            <div key={i} className="p-8 bg-white dark:bg-gray-900 rounded-[2rem] border-[3px] border-gray-300 dark:border-gray-800 transition-all hover:shadow-2xl hover:border-blue-600 dark:hover:border-blue-500 shadow-md">
              <p className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter">{stat.value}</p>
              <p className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest mb-1">{stat.label}</p>
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-tighter">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4️⃣ Advertising Options */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-serif-heading dark:text-white mb-4 italic text-center">Engagement Formats</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-xl mx-auto font-medium">High-value, integrated advertising units designed for maximum context and zero noise.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {adOptions.map((opt, i) => (
              <div key={i} className="group p-10 bg-white dark:bg-gray-900 border-[3px] border-gray-300 dark:border-gray-800 rounded-[2.5rem] hover:border-blue-600 transition-all hover:shadow-2xl flex items-start gap-8 shadow-md">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform border border-blue-100 dark:border-blue-800">
                  {opt.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{opt.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-medium">{opt.description}</p>
                  <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800">{opt.useCase}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Partner & Sponsored Content Guidelines */}
      <section className="py-24 bg-white dark:bg-gray-900/30 border-y-2 border-gray-200 dark:border-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Our Commitment to Quality</h2>
          <div className="space-y-6 text-gray-700 dark:text-gray-400 text-lg leading-relaxed">
            <p>
              <strong className="text-gray-900 dark:text-white">Editorial Independence:</strong> Our analysis and reporting remain unbiased. We do not exchange favorable coverage for advertising dollars.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">Full Transparency:</strong> Every piece of sponsored content is clearly labeled as "Partner Content" or "Sponsored" to maintain the trust of our readers.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">Curated Partners:</strong> We only work with brands and companies that add genuine value to Africa’s tech ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* 6️⃣ & 7️⃣ CTA and Inquiry Form */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl font-black font-serif-heading text-gray-900 dark:text-white mb-8 leading-tight italic transition-colors">
              Partner with <br /> TechPalava.
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-400 mb-12 leading-relaxed font-medium">
              Unlock unique growth opportunities and place your message where it matters most. Request our 2025 Media Kit for detailed demographics and pricing.
            </p>
            <button className="px-12 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 uppercase text-xs tracking-widest active:scale-95">
              Request Media Kit
            </button>
            <p className="mt-8 text-xs text-gray-500 font-bold uppercase tracking-widest">
              Direct Inquiries: <a href="mailto:partners@techpalava.media" className="text-blue-600 hover:underline">partners@techpalava.media</a>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900/50 border-[3px] border-gray-300 dark:border-gray-800 rounded-[3rem] p-10 lg:p-14 shadow-2xl transition-colors">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-blue-600/20">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">Message Delivered</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mb-10 max-w-md mx-auto leading-relaxed">
                  Your inquiry has been sent to our partnerships team. We'll get back to you with our media kit and rate card within 24 hours.
                </p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="px-10 py-4 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-black rounded-2xl hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all uppercase text-[10px] tracking-widest active:scale-95"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Campaign Inquiry</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-500 dark:text-gray-400 mb-2 block tracking-widest">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-300 dark:border-gray-800 py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all text-gray-900 font-bold" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-500 dark:text-gray-400 mb-2 block tracking-widest">Company</label>
                      <input 
                        required
                        type="text" 
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-300 dark:border-gray-800 py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all text-gray-900 font-bold" 
                        placeholder="Tech Ventures" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-500 dark:text-gray-400 mb-2 block tracking-widest">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-300 dark:border-gray-800 py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all text-gray-900 font-bold" 
                      placeholder="john@company.com" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-500 dark:text-gray-400 mb-2 block tracking-widest">Inquiry Type</label>
                    <select 
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-300 dark:border-gray-800 py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all appearance-none text-gray-900 font-bold"
                    >
                      <option>Branded Analysis & Deep Dives</option>
                      <option>Newsletter & Daily Digest</option>
                      <option>Job Board Promotion</option>
                      <option>Event Partnership</option>
                      <option>Other / Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-500 dark:text-gray-400 mb-2 block tracking-widest">How can we help?</label>
                    <textarea 
                      required
                      rows={4} 
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-300 dark:border-gray-800 py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all resize-none text-gray-900 font-medium" 
                      placeholder="Briefly describe your advertising goals..."
                    ></textarea>
                  </div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold">
                    * By submitting this form, you agree to our privacy policy and to receive communications about our advertising services.
                  </p>
                  <button 
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-gray-900 dark:bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-black dark:hover:bg-blue-700 transition-all shadow-xl uppercase text-xs tracking-[0.2em] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Delivering...
                      </>
                    ) : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvertisePage;
