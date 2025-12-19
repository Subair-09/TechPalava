
import React, { useState, useEffect, useRef } from 'react';
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
    title: 'Staff Frontend Engineer',
    companyName: 'Vercel',
    companyLogo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
    type: 'Full-time',
    location: 'Global / Remote',
    locationType: 'Remote',
    salaryRange: '$160k – $220k',
    listingType: 'Partner',
    status: 'Published',
    datePosted: '2024-03-15',
    expiryDate: '2024-04-15',
    description: 'Join the team building the frontend cloud...',
    applicationUrl: 'https://vercel.com/careers',
    isFeatured: true
  },
  {
    id: 'job_3',
    title: 'ML Ops Specialist',
    companyName: 'Mistral AI',
    companyLogo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop',
    type: 'Contract',
    location: 'Paris, France',
    locationType: 'Hybrid',
    salaryRange: '€90k – €130k',
    listingType: 'Editorial',
    status: 'Pending',
    datePosted: '2024-03-24',
    expiryDate: '2024-04-24',
    description: 'Infrastructure for the next generation of open models...',
    applicationUrl: 'https://mistral.ai/jobs',
    isFeatured: false,
    submissionSource: 'Public Submission'
  }
];

const JobsManagement: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Partial<JobListing> | null>(null);
  
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
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
      applicationUrl: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingJob(prev => ({ ...prev, companyLogo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerLogoUpload = () => {
    logoInputRef.current?.click();
  };

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'Published': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Expired': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Draft': return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
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
        <div className="h-[60vh] flex flex-col items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          <LoadingSpinner />
          <p className="mt-4 animate-pulse">Accessing Talent Network...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Hidden file input for logo */}
      <input 
        type="file" 
        ref={logoInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleLogoChange} 
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="editorial-title text-3xl text-slate-900 tracking-tight">Jobs & Talent</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Review submissions and curate the TechPalava job board</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-all shadow-lg shadow-slate-900/10 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          Post New Listing
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Listings', value: jobs.filter(j => j.status === 'Published').length, color: 'text-slate-900' },
          { label: 'Pending Review', value: jobs.filter(j => j.status === 'Pending').length, color: 'text-amber-600' },
          { label: 'Revenue (MTD)', value: '$2,482', color: 'text-emerald-600' },
          { label: 'Engagement Rate', value: '14.2%', color: 'text-blue-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-grow min-w-[240px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text" 
            placeholder="Filter roles or companies..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-bold text-slate-500 outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="All">All Lifecycle</option>
          <option value="Published">Published</option>
          <option value="Pending">Pending</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Opportunity</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type / Location</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Listing Type</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img src={job.companyLogo} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => handleOpenModal(job)}>{job.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">{job.companyName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{job.type}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{job.location}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getStatusBadge(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900">{job.listingType}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Expires {job.expiryDate}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => handleOpenModal(job)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit Listing">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Archive Listing">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div>
                <h2 className="editorial-title text-2xl text-slate-900">{editingJob?.id ? 'Adjust Talent Prospect' : 'Post New Career Opportunity'}</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Listing Reference: {editingJob?.id || 'NEW_ENTRY'}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Role Title</label>
                    <input 
                      type="text"
                      className="w-full text-2xl editorial-title border-b border-slate-200 focus:border-blue-500 transition-colors py-2 outline-none"
                      placeholder="e.g. Lead Distributed Systems Architect"
                      value={editingJob?.title}
                      onChange={(e) => setEditingJob(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Company Name</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold" value={editingJob?.companyName} onChange={(e) => setEditingJob(prev => ({ ...prev, companyName: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Location Detail</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" value={editingJob?.location} onChange={(e) => setEditingJob(prev => ({ ...prev, location: e.target.value }))} />
                    </div>
                  </div>
                  
                  {/* NEW: Application URL Field */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Application Link (External URL)</label>
                    <input 
                      type="url" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/10 outline-none font-medium text-slate-600"
                      placeholder="https://company.com/apply/role-id"
                      value={editingJob?.applicationUrl}
                      onChange={(e) => setEditingJob(prev => ({ ...prev, applicationUrl: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Role Overview</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/10 outline-none h-48 resize-none font-medium text-slate-600 leading-relaxed"
                      placeholder="Describe the mission and requirements..."
                      value={editingJob?.description}
                      onChange={(e) => setEditingJob(prev => ({ ...prev, description: e.target.value }))}
                    ></textarea>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="p-8 bg-slate-900 rounded-[2rem] text-white shadow-2xl">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Listing Governance</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Monetization Tier</label>
                        <select className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold text-white outline-none" value={editingJob?.listingType} onChange={(e) => setEditingJob(prev => ({ ...prev, listingType: e.target.value as any }))}>
                          <option value="Paid">Commercial Post ($199)</option>
                          <option value="Partner">Strategic Partner (Free)</option>
                          <option value="Editorial">Editorial Feature</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Engagement Type</label>
                          <select className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs font-bold text-white outline-none" value={editingJob?.type} onChange={(e) => setEditingJob(prev => ({ ...prev, type: e.target.value as any }))}>
                            <option value="Full-time">Full-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Remote">Remote Only</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Status</label>
                          <select className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs font-bold text-white outline-none" value={editingJob?.status} onChange={(e) => setEditingJob(prev => ({ ...prev, status: e.target.value as any }))}>
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                            <option value="Pending">Needs Review</option>
                          </select>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-slate-800">
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
                          <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">Apply Premium Featured Slot</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex justify-between items-center">
                      Corporate Identity (Logo)
                      {editingJob?.companyLogo && (
                        <button 
                          onClick={() => setEditingJob(prev => ({ ...prev, companyLogo: '' }))}
                          className="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </label>
                    <div 
                      className={`w-full aspect-video rounded-2xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center cursor-pointer ${editingJob?.companyLogo ? 'border-slate-100 bg-white' : 'border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-white'}`}
                      onClick={triggerLogoUpload}
                    >
                      {editingJob?.companyLogo ? (
                        <div className="relative w-full h-full group">
                          <img src={editingJob.companyLogo} className="w-full h-full object-contain p-4" alt="" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Replace Logo</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-6">
                           <svg className="w-10 h-10 text-slate-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to Upload Logo</p>
                        </div>
                      )}
                    </div>
                    <p className="text-[9px] text-slate-400 italic mt-3 text-center">Square or wide PNG/JPG recommended</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center sticky bottom-0 z-20">
              <button onClick={() => setIsModalOpen(false)} className="px-8 py-3 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Discard</button>
              <button onClick={() => setIsModalOpen(false)} className="px-12 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95">Save Opportunity</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default JobsManagement;
