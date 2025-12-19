
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { JobListing, JobType, JobLocationType, JobStatus, JobListingType } from '../types';

const MOCK_JOBS: JobListing[] = [
  {
    id: 'job_1',
    title: 'Senior Product Designer',
    companyName: 'Linear',
    companyLogo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100&h=100&fit=crop',
    type: 'Full-time',
    location: 'Remote',
    locationType: 'Remote',
    salaryRange: '$140k – $180k',
    listingType: 'Paid',
    status: 'Published',
    datePosted: '2024-03-10',
    expiryDate: '2024-04-10',
    description: 'We are looking for a senior product designer to join our core team...',
    applicationUrl: 'https://linear.app/careers',
    isFeatured: true,
    price: 199
  },
  {
    id: 'job_2',
    title: 'Founding Engineer (Rust)',
    companyName: 'Entropy Labs',
    companyLogo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop',
    type: 'Full-time',
    location: 'San Francisco, CA',
    locationType: 'Onsite',
    salaryRange: '$180k – $250k + Equity',
    listingType: 'Partner',
    status: 'Published',
    datePosted: '2024-03-15',
    expiryDate: '2024-04-15',
    description: 'Help us build the decentralized future with high-performance Rust...',
    applicationUrl: 'https://entropy.xyz/jobs',
    isFeatured: true
  },
  {
    id: 'job_3',
    title: 'Backend Developer (Go)',
    companyName: 'Stealth Startup',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop',
    type: 'Contract',
    location: 'Europe / Remote',
    locationType: 'Remote',
    salaryRange: '€80k – €110k',
    listingType: 'Editorial',
    status: 'Pending',
    datePosted: '2024-03-20',
    expiryDate: '2024-04-20',
    description: 'A submitted job from our public portal that needs review...',
    applicationUrl: 'mailto:jobs@stealth.co',
    isFeatured: false,
    submissionSource: 'Public Submission'
  },
  {
    id: 'job_4',
    title: 'iOS Lead Engineer',
    companyName: 'Superhuman',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop',
    type: 'Full-time',
    location: 'New York / London',
    locationType: 'Hybrid',
    salaryRange: '$160k – $210k',
    listingType: 'Paid',
    status: 'Expired',
    datePosted: '2024-02-01',
    expiryDate: '2024-03-01',
    description: 'This listing has completed its 30-day run.',
    applicationUrl: 'https://superhuman.com/jobs',
    isFeatured: false,
    price: 199
  }
];

const JobsManagement: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Partial<JobListing> | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setJobs(MOCK_JOBS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = (job?: JobListing) => {
    setEditingJob(job || {
      title: '',
      companyName: '',
      type: 'Full-time',
      location: '',
      locationType: 'Remote',
      salaryRange: '',
      listingType: 'Paid',
      status: 'Draft',
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isFeatured: false,
      description: '',
      applicationUrl: ''
    });
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'Published': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Expired': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Draft': return 'bg-slate-100 text-slate-500 border-slate-200';
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  const getListingTypeBadge = (type: JobListingType) => {
    switch (type) {
      case 'Paid': return 'bg-blue-600 text-white';
      case 'Partner': return 'bg-indigo-600 text-white';
      case 'Editorial': return 'bg-slate-900 text-white';
    }
  };

  const calculateDaysRemaining = (expiry: string) => {
    const today = new Date();
    const expiryDate = new Date(expiry);
    const diff = expiryDate.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         j.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <LoadingSpinner />
          <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Accessing Talent Network...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="editorial-title text-3xl text-slate-900 tracking-tight">Jobs & Talent Management</h1>
          <p className="text-slate-500 text-sm mt-1">Review submissions and curate the TechPalava job board</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleOpenModal()}
            className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-all shadow-lg shadow-slate-900/10 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            Post New Job
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Listings</p>
          <p className="text-2xl font-bold text-slate-900">{jobs.filter(j => j.status === 'Published').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Needs Review</p>
          <p className="text-2xl font-bold text-amber-600">{jobs.filter(j => j.status === 'Pending').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Expiring Soon</p>
          <p className="text-2xl font-bold text-rose-600">{jobs.filter(j => j.status === 'Published' && calculateDaysRemaining(j.expiryDate) < 7).length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weekly Revenue</p>
          <p className="text-2xl font-bold text-emerald-600">$1,592</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-grow min-w-[240px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text" 
            placeholder="Search roles, companies..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select 
          className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="All">All Status</option>
          <option value="Published">Published</option>
          <option value="Pending">Needs Review</option>
          <option value="Expired">Expired</option>
          <option value="Draft">Drafts</option>
        </select>
      </div>

      {/* Jobs List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Role</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type / Location</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Listing Info</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Expiry</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center opacity-40">
                      <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      <p className="text-sm font-bold uppercase tracking-widest">No matching jobs found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => {
                  const daysLeft = calculateDaysRemaining(job.expiryDate);
                  return (
                    <tr key={job.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img src={job.companyLogo} className="w-10 h-10 rounded-lg object-cover border border-slate-200" alt="" />
                          <div>
                            <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => handleOpenModal(job)}>
                              {job.title}
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">{job.companyName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700">{job.type}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{job.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${getListingTypeBadge(job.listingType)}`}>
                              {job.listingType}
                            </span>
                            {job.isFeatured && (
                              <span className="bg-amber-100 text-amber-700 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Featured</span>
                            )}
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter">{job.salaryRange}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${getStatusBadge(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <p className={`text-xs font-bold ${daysLeft < 7 && job.status === 'Published' ? 'text-rose-600' : 'text-slate-600'}`}>
                            {job.status === 'Expired' ? 'None' : `${daysLeft} days left`}
                          </p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Expires {job.expiryDate}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          {job.status === 'Pending' && (
                            <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Approve Submission">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            </button>
                          )}
                          <button 
                            onClick={() => handleOpenModal(job)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit Listing"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View Public Page">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </button>
                          <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Delete Listing">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-4xl max-h-[95vh] rounded-[2rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div>
                <h2 className="editorial-title text-2xl text-slate-900">
                  {editingJob?.id ? 'Edit Job Listing' : 'Post a New Opportunity'}
                </h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Listing ID: {editingJob?.id || 'NEW_RECORD'}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-10 no-scrollbar space-y-10">
              {/* Submission Notice */}
              {editingJob?.status === 'Pending' && (
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start text-amber-800">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div>
                    <p className="text-sm font-bold">Awaiting Review</p>
                    <p className="text-xs">This was submitted via {editingJob.submissionSource}. Verify all details before publishing.</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Role Details */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Job Title</label>
                    <input 
                      type="text"
                      className="w-full text-2xl editorial-title border-b border-slate-200 focus:border-blue-500 transition-colors py-2 outline-none"
                      placeholder="e.g. Lead Software Engineer"
                      value={editingJob?.title}
                      onChange={(e) => setEditingJob(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Company Name</label>
                      <input 
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500/10 outline-none"
                        placeholder="e.g. Apple"
                        value={editingJob?.companyName}
                        onChange={(e) => setEditingJob(prev => ({ ...prev, companyName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Location</label>
                      <input 
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/10 outline-none"
                        placeholder="e.g. London / Remote"
                        value={editingJob?.location}
                        onChange={(e) => setEditingJob(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Job Type</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-bold outline-none"
                        value={editingJob?.type}
                        onChange={(e) => setEditingJob(prev => ({ ...prev, type: e.target.value as any }))}
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Location Type</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-bold outline-none"
                        value={editingJob?.locationType}
                        onChange={(e) => setEditingJob(prev => ({ ...prev, locationType: e.target.value as any }))}
                      >
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Onsite">Onsite</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Salary Range</label>
                      <input 
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/10 outline-none"
                        placeholder="$100k-$150k"
                        value={editingJob?.salaryRange}
                        onChange={(e) => setEditingJob(prev => ({ ...prev, salaryRange: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Job Description (Rich Text)</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/10 outline-none h-48 resize-none"
                      placeholder="Outline the responsibilities, requirements, and benefits..."
                      value={editingJob?.description}
                      onChange={(e) => setEditingJob(prev => ({ ...prev, description: e.target.value }))}
                    ></textarea>
                  </div>
                </div>

                {/* Right: Listing Settings */}
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Company Logo</label>
                    <div 
                      className="w-32 h-32 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all overflow-hidden relative"
                      onClick={() => setEditingJob(prev => ({ ...prev, companyLogo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=200&h=200&fit=crop' }))}
                    >
                      {editingJob?.companyLogo ? (
                        <img src={editingJob.companyLogo} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <>
                          <svg className="w-8 h-8 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span className="text-[8px] font-bold text-slate-400 uppercase text-center px-4 tracking-widest">Click to Upload</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Monetization & Status</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Listing Category</span>
                        <div className="flex bg-slate-800 p-1 rounded-xl">
                          {(['Paid', 'Partner', 'Editorial'] as JobListingType[]).map(t => (
                            <button 
                              key={t}
                              onClick={() => setEditingJob(prev => ({ ...prev, listingType: t }))}
                              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${editingJob?.listingType === t ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Pricing</span>
                        <div className="flex items-center">
                          <span className="text-slate-500 mr-2">$</span>
                          <input 
                            type="number"
                            className="bg-slate-800 border-none rounded-lg p-2 text-sm font-bold w-20 text-center outline-none"
                            value={editingJob?.price || 199}
                            onChange={(e) => setEditingJob(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                          />
                        </div>
                      </div>

                      <div className="pt-2 space-y-4">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              className="sr-only" 
                              checked={editingJob?.isFeatured}
                              onChange={(e) => setEditingJob(prev => ({ ...prev, isFeatured: e.target.checked }))}
                            />
                            <div className={`w-10 h-5 rounded-full transition-colors ${editingJob?.isFeatured ? 'bg-amber-500' : 'bg-slate-700'}`}></div>
                            <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${editingJob?.isFeatured ? 'translate-x-5' : ''}`}></div>
                          </div>
                          <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">Premium Featured Placement</span>
                        </label>
                      </div>

                      <div className="pt-4 border-t border-slate-800">
                         <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Expiry Date</label>
                         <input 
                            type="date"
                            className="w-full bg-slate-800 border-none rounded-xl p-3 text-sm font-bold text-white outline-none"
                            value={editingJob?.expiryDate}
                            onChange={(e) => setEditingJob(prev => ({ ...prev, expiryDate: e.target.value }))}
                         />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center sticky bottom-0 z-20">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                Cancel Draft
              </button>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setEditingJob(prev => ({ ...prev, status: 'Draft' }))}
                  className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                >
                  Save Draft
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-10 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95"
                >
                  {editingJob?.id ? 'Update Listing' : 'Publish Job'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default JobsManagement;
