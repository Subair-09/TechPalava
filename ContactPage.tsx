
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', subject: 'General Inquiry', company: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      {/* 1. Header Section */}
      <section className="pt-24 pb-16 border-b-2 border-gray-200 dark:border-gray-900 bg-gray-50/30 dark:bg-gray-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-blue-600 dark:text-blue-400 font-black tracking-[0.3em] text-[10px] uppercase mb-4 block">GET IN TOUCH</span>
            <h1 className="text-6xl md:text-8xl font-black font-serif-heading dark:text-white leading-[0.85] tracking-tighter mb-8">
              Contact <span className="italic text-gray-300 dark:text-gray-700">Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Whether you’re a founder with a story, a company looking to advertise, or a reader with feedback, we’re ready to listen.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            {formState === 'success' ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-12 rounded-[2.5rem] text-center border-[3px] border-blue-600/30 dark:border-blue-800 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Message Received</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mb-10">
                  Thanks for reaching out! Our editorial team will review your inquiry and get back to you within 24–48 hours.
                </p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="px-10 py-4 bg-gray-900 dark:bg-blue-600 text-white font-black rounded-2xl hover:bg-black dark:hover:bg-blue-700 transition-all uppercase text-[10px] tracking-widest active:scale-95 shadow-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Full Name *</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="Jane Doe"
                      className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-800 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:text-white transition-all text-sm font-bold shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Email Address *</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="jane@company.com"
                      className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-800 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:text-white transition-all text-sm font-bold shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Subject</label>
                    <select 
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-800 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:text-white transition-all text-sm font-bold appearance-none shadow-sm"
                    >
                      <option>General Inquiry</option>
                      <option>News Tip / Story Pitch</option>
                      <option>Advertising & Partnerships</option>
                      <option>Career Opportunities</option>
                      <option>Technical Feedback</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Company (Optional)</label>
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      placeholder="TechPalava Inc."
                      className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-800 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:text-white transition-all text-sm font-bold shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Your Message *</label>
                  <textarea 
                    required
                    rows={6}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-800 rounded-3xl py-6 px-8 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:text-white transition-all text-sm font-medium leading-relaxed resize-none shadow-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                  <button 
                    disabled={formState === 'submitting'}
                    className="w-full sm:w-auto px-12 py-5 bg-gray-900 dark:bg-blue-600 text-white font-black rounded-2xl hover:bg-black dark:hover:bg-blue-700 transition-all shadow-xl shadow-gray-200 dark:shadow-blue-900/10 uppercase text-[10px] tracking-[0.2em] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </button>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center sm:text-left">
                    We typically respond in <span className="text-gray-900 dark:text-gray-200 underline decoration-blue-500 decoration-2">under 48 hours</span>.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info Column */}
          <div className="lg:col-span-5">
            <div className="space-y-12">
              <div className="bg-gray-50 dark:bg-gray-900/50 p-10 rounded-[2.5rem] border-[3px] border-gray-300 dark:border-gray-800 shadow-md transition-colors">
                <h4 className="text-xl font-bold dark:text-white mb-8 italic font-serif-heading">Direct Channels</h4>
                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002-2z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">General Support</p>
                      <p className="text-lg font-bold dark:text-white">hello@techpalava.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Advertising</p>
                      <p className="text-lg font-bold dark:text-white">advertise@techpalava.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">HQ / Bureau</p>
                      <p className="text-lg font-bold dark:text-white">Lagos • London • New York</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10">
                <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.3em] mb-6">Privacy Commitment</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium italic">
                  "Your information is protected by industry-standard encryption and will only be used to facilitate communication between you and TechPalava. We never share our contact database with third parties."
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ContactPage;
