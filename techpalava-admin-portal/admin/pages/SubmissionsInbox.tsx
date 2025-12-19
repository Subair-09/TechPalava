
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { Submission, SubmissionType, SubmissionStatus } from '../types';

const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 'sub_1',
    type: 'News',
    title: 'Exclusive: New Startup raising $50M for Carbon Capture',
    submittedBy: { name: 'Alex Rivera', email: 'alex@carbonflow.io', company: 'CarbonFlow' },
    content: 'We are officially announcing our Series B round led by Sequoia. The funds will be used to scale our direct air capture facilities in Iceland. We would love for TechPalava to have the exclusive story...',
    dateSubmitted: '2024-03-24 09:15',
    status: 'New',
    source: 'Public Portal',
    isRead: false,
    internalNotes: 'Looks like a solid scoop. Need to verify funding docs.',
    attachments: ['funding_deck.pdf', 'founder_photo.jpg']
  },
  {
    id: 'sub_2',
    type: 'Job',
    title: 'Staff Engineer - Distributed Systems',
    submittedBy: { name: 'Elena Vance', email: 'careers@lumon.tech', company: 'Lumon Industries' },
    content: 'Lumon is hiring a staff engineer for our macrodata refinement department. Looking for experts in Go, Kubernetes, and memory management. This is a premium paid listing.',
    dateSubmitted: '2024-03-23 14:30',
    status: 'In Review',
    source: 'Partner API',
    isRead: true,
    internalNotes: 'Awaiting payment confirmation flag from Stripe.'
  },
  {
    id: 'sub_3',
    type: 'Event',
    title: 'Lagos Tech Mixer 2024',
    submittedBy: { name: 'Ife Thompson', email: 'ife@lagosdevs.org' },
    content: 'A community-led event focused on the future of Fintech in Sub-Saharan Africa. Requesting a featured calendar slot.',
    dateSubmitted: '2024-03-22 10:00',
    status: 'Approved',
    source: 'Community Form',
    isRead: true
  }
];

const SubmissionsInbox: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSubmissions(MOCK_SUBMISSIONS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case 'New': return 'bg-blue-600 text-white shadow-lg shadow-blue-500/20';
      case 'In Review': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Rejected': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  const filtered = submissions.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <LoadingSpinner />
          <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Accessing Editorial Wire...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="editorial-title text-4xl text-slate-900 tracking-tight">Editorial Wire</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Triage and triage content submissions from the global community</p>
        </div>
        <div className="flex items-center bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm space-x-1">
           <span className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50">{submissions.filter(s => s.status === 'New').length} New Alerts</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[75vh]">
        {/* Master List Section */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${selectedSub ? 'lg:w-[40%]' : 'w-full'}`}>
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm mb-4 flex items-center">
            <span className="pl-4 text-slate-400">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
            <input 
              type="text" 
              placeholder="Filter by subject or submitter..."
              className="w-full pl-3 pr-4 py-2 bg-transparent text-sm font-bold text-slate-700 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-y-auto no-scrollbar flex-1">
              <div className="divide-y divide-slate-100">
                {filtered.map(sub => (
                  <div 
                    key={sub.id}
                    onClick={() => { setSelectedSub(sub); sub.isRead = true; }}
                    className={`p-8 hover:bg-slate-50/80 cursor-pointer transition-all relative group ${selectedSub?.id === sub.id ? 'bg-slate-50' : ''}`}
                  >
                    {sub.status === 'New' && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"></div>}
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.2em] ${getStatusBadge(sub.status)}`}>{sub.status}</span>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{sub.dateSubmitted.split(' ')[0]}</span>
                    </div>
                    <h4 className={`text-lg leading-tight mb-2 ${sub.isRead ? 'text-slate-500 font-medium' : 'text-slate-900 font-bold'}`}>{sub.title}</h4>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-400 border border-slate-200">{sub.submittedBy.name.charAt(0)}</div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sub.submittedBy.name}</span>
                      <span className="text-slate-200 text-xs">/</span>
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{sub.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detail/Review Section */}
        {selectedSub ? (
          <div className="lg:w-[60%] bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right-10 duration-500">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /></svg>
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Processing {selectedSub.type} Wire</h3>
                  <p className="text-sm font-bold text-slate-900">Submission ID: {selectedSub.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedSub(null)} className="w-12 h-12 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-12 space-y-12 no-scrollbar">
              <section>
                <h2 className="editorial-title text-5xl text-slate-900 leading-[1.1] mb-8">{selectedSub.title}</h2>
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-slate-50">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Original Submitter</p>
                    <p className="text-sm font-bold text-slate-900">{selectedSub.submittedBy.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{selectedSub.submittedBy.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Organization / Source</p>
                    <p className="text-sm font-bold text-slate-900">{selectedSub.submittedBy.company || 'Private Party'}</p>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-0.5">{selectedSub.source}</p>
                  </div>
                </div>
              </section>

              <section className="bg-slate-50 rounded-[2rem] p-10 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-serif italic text-xl">"</div>
                <div className="text-slate-700 leading-relaxed font-serif text-2xl whitespace-pre-wrap">
                  {selectedSub.content}
                </div>
              </section>

              <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                 <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-8 flex items-center">
                    <span className="w-1 h-4 bg-blue-500 mr-2 rounded-full"></span>
                    Editorial Audit Room
                 </h3>
                 <div className="space-y-8">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Staff Triage Notes</label>
                      <textarea 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm font-medium text-slate-300 outline-none h-32 resize-none focus:border-white/20 transition-all"
                        placeholder="Add internal observations for the newsroom team..."
                        defaultValue={selectedSub.internalNotes}
                      ></textarea>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest">Spam Verification</p>
                            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Clear / High Integrity Source</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </section>
            </div>

            <div className="p-10 bg-slate-50 border-t border-slate-100 flex justify-between items-center sticky bottom-0 z-20">
              <div className="flex space-x-3">
                <button className="p-4 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all" title="Archive / Delete">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
                <button className="p-4 text-slate-400 hover:text-slate-600 hover:bg-white rounded-2xl transition-all" title="Mark as Flagged">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                </button>
              </div>
              <div className="flex space-x-4">
                 <button className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Acknowledge</button>
                 <button className="px-12 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-2xl shadow-slate-900/20 active:scale-95 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Convert & Publish
                 </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-20 text-center opacity-40">
             <div className="w-24 h-24 bg-white rounded-full shadow-inner flex items-center justify-center mb-8">
                <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" /></svg>
             </div>
             <h3 className="text-2xl font-bold uppercase tracking-widest text-slate-400">Select a Dispatch</h3>
             <p className="text-sm font-medium mt-2 max-w-xs">Pick a submission from the wire on the left to begin the editorial triage process.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SubmissionsInbox;
