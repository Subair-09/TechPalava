
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { Submission, SubmissionType, SubmissionStatus } from '../types';

const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 'sub_1',
    type: 'News',
    title: 'Exclusive: New Startup raising $50M for Carbon Capture',
    submittedBy: {
      name: 'Alex Rivera',
      email: 'alex@carbonflow.io',
      company: 'CarbonFlow'
    },
    content: 'We are officially announcing our Series B round led by Sequoia. The funds will be used to scale our direct air capture facilities in Iceland. We would love for TechPalava to have the exclusive story...',
    dateSubmitted: '2024-03-24 09:15',
    status: 'New',
    source: 'Public',
    isRead: false,
    internalNotes: 'Looks like a solid scoop. Need to verify funding docs.',
    attachments: ['funding_deck.pdf', 'founder_photo.jpg']
  },
  {
    id: 'sub_2',
    type: 'Job',
    title: 'Staff Engineer - Distributed Systems',
    submittedBy: {
      name: 'Elena Vance',
      email: 'careers@lumon.tech',
      company: 'Lumon Industries'
    },
    content: 'Lumon is hiring a staff engineer for our macrodata refinement department. Looking for experts in Go, Kubernetes, and memory management. This is a premium paid listing.',
    dateSubmitted: '2024-03-23 14:30',
    status: 'In Review',
    source: 'Partner',
    isRead: true,
    internalNotes: 'Awaiting payment confirmation flag from Stripe.'
  },
  {
    id: 'sub_3',
    type: 'Event',
    title: 'Emerging Tech Lagos: Community Mixer',
    submittedBy: {
      name: 'Ife Thompson',
      email: 'ife@lagosdevs.org'
    },
    content: 'A casual meetup for the Lagos developer community. We have 3 speakers from local fintechs lined up. Requesting a featured spot on the TechPalava events page.',
    dateSubmitted: '2024-03-22 11:00',
    status: 'Approved',
    source: 'Public',
    isRead: true
  },
  {
    id: 'sub_4',
    type: 'Advertise',
    title: 'Quarterly Sponsorship Inquiry - Q3 2024',
    submittedBy: {
      name: 'Marcus Thorne',
      email: 'mthorne@nvidia.com',
      company: 'NVIDIA'
    },
    content: 'We are interested in sponsoring the AI Analysis section for the upcoming quarter. Please send over your latest media kit and traffic metrics for the AI vertical.',
    dateSubmitted: '2024-03-21 16:45',
    status: 'In Review',
    source: 'Partner',
    isRead: true,
    internalNotes: 'Forwarded to the sales lead.'
  },
  {
    id: 'sub_5',
    type: 'Contact',
    title: 'Correction Request: Apple Vision Pro Review',
    submittedBy: {
      name: 'Tim S.',
      email: 'user@example.com'
    },
    content: 'In your recent analysis, you mentioned the battery life is 2 hours. My unit consistently gets 2.5 hours when watching spatial video. Just wanted to flag.',
    dateSubmitted: '2024-03-20 10:20',
    status: 'Rejected',
    source: 'Public',
    isRead: true,
    internalNotes: 'User anecdotal evidence. Specs say 2 hours. Not a factual error.'
  }
];

const SubmissionsInbox: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [filterType, setFilterType] = useState<SubmissionType | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<SubmissionStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setSubmissions(MOCK_SUBMISSIONS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-700 border-blue-100 font-bold';
      case 'In Review': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Approved': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Rejected': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  const getTypeIcon = (type: SubmissionType) => {
    switch (type) {
      case 'News': return <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM7 8h5M7 12h8M7 16h8" /></svg>;
      case 'Job': return <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
      case 'Event': return <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" /></svg>;
      case 'Advertise': return <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'Contact': return <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    }
  };

  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.submittedBy.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || s.type === filterType;
    const matchesStatus = filterStatus === 'All' || s.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleMarkAsRead = (id: string) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, isRead: true } : s));
  };

  const handleAction = (status: SubmissionStatus) => {
    if (!selectedSubmission) return;
    setSubmissions(prev => prev.map(s => s.id === selectedSubmission.id ? { ...s, status } : s));
    setSelectedSubmission(prev => prev ? { ...prev, status } : null);
  };

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
          <h1 className="editorial-title text-3xl text-slate-900 tracking-tight">Submissions Inbox</h1>
          <p className="text-slate-500 text-sm mt-1">Triage and process content submissions from the TechPalava community</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-full">{submissions.filter(s => !s.isRead).length} New</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-280px)]">
        {/* Inbox List Section */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${selectedSubmission ? 'lg:w-1/2' : 'w-full'}`}>
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-4 flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow min-w-[200px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input 
                type="text" 
                placeholder="Search inbox..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select 
              className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
            >
              <option value="All">All Types</option>
              <option value="News">News</option>
              <option value="Job">Job</option>
              <option value="Event">Event</option>
              <option value="Advertise">Ads</option>
            </select>

            <select 
              className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="In Review">In Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Table Inbox */}
          <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-y-auto no-scrollbar">
              <table className="w-full text-left table-fixed">
                <thead className="bg-slate-50/50 border-b border-slate-200 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-40">Source / Type</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-48">Submitted By</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-24">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center opacity-40">
                          <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5" /></svg>
                          <p className="text-sm font-bold uppercase tracking-widest">Your inbox is clear</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map((sub) => (
                      <tr 
                        key={sub.id} 
                        onClick={() => {
                          setSelectedSubmission(sub);
                          handleMarkAsRead(sub.id);
                        }}
                        className={`hover:bg-slate-50 cursor-pointer transition-colors group relative ${!sub.isRead ? 'bg-blue-50/30' : ''} ${selectedSubmission?.id === sub.id ? 'bg-slate-100/50 ring-2 ring-inset ring-blue-500/20' : ''}`}
                      >
                        <td className="px-6 py-4">
                          {!sub.isRead && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{sub.source}</span>
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(sub.type)}
                              <span className="text-xs font-bold text-slate-700">{sub.type}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <h4 className={`text-sm leading-tight line-clamp-2 ${!sub.isRead ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                            {sub.title}
                          </h4>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-slate-900 truncate">{sub.submittedBy.name}</span>
                            <span className="text-[10px] font-bold text-slate-400 truncate">{sub.submittedBy.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${getStatusBadge(sub.status)}`}>
                            {sub.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Submission Detail Drawer/Side Panel */}
        {selectedSubmission && (
          <div className="lg:w-1/2 bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right-10 duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex items-center space-x-4">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  {getTypeIcon(selectedSubmission.type)}
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Reviewing {selectedSubmission.type} Submission</h3>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${getStatusBadge(selectedSubmission.status)}`}>
                    {selectedSubmission.status}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
              <section>
                <h1 className="editorial-title text-3xl text-slate-900 leading-tight mb-4">
                  {selectedSubmission.title}
                </h1>
                <div className="flex flex-wrap gap-6 py-4 border-y border-slate-50">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Submitted By</p>
                    <p className="text-sm font-bold text-slate-900">{selectedSubmission.submittedBy.name}</p>
                    <p className="text-xs text-slate-500">{selectedSubmission.submittedBy.email}</p>
                  </div>
                  {selectedSubmission.submittedBy.company && (
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Organization</p>
                      <p className="text-sm font-bold text-slate-900">{selectedSubmission.submittedBy.company}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                    <p className="text-sm font-bold text-slate-900">{selectedSubmission.dateSubmitted}</p>
                  </div>
                </div>
              </section>

              <section className="bg-slate-50 rounded-2xl p-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                  Submission Content
                </h3>
                <div className="text-slate-700 leading-relaxed font-serif text-lg whitespace-pre-wrap">
                  {selectedSubmission.content}
                </div>
              </section>

              {selectedSubmission.attachments && (
                <section>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Supporting Documents</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedSubmission.attachments.map((file, i) => (
                      <div key={i} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between group hover:border-blue-300 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                          <span className="text-xs font-bold text-slate-700 truncate">{file}</span>
                        </div>
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Editorial Audit Room</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Internal Editor Notes</label>
                    <textarea 
                      className="w-full bg-slate-800 border-none rounded-2xl p-4 text-xs font-medium text-slate-300 outline-none h-24 resize-none"
                      placeholder="Add private notes for the newsroom staff..."
                      defaultValue={selectedSubmission.internalNotes}
                    ></textarea>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-widest">Duplicate Check</span>
                    <span className="text-emerald-500 font-black">Clean / No Hits</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center bg-white sticky bottom-0 z-20">
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleAction('Rejected')}
                  className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                  title="Reject Submission"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
                </button>
                <button 
                  onClick={() => handleAction('In Review')}
                  className="p-3 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                  title="Mark as In Review"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
              </div>
              <div className="flex space-x-3">
                <button 
                  className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                >
                  Reply to Submitter
                </button>
                <button 
                  onClick={() => handleAction('Approved')}
                  className="px-10 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  Approve & Convert
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SubmissionsInbox;
