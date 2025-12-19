
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { PartnerCampaign, CampaignRequest, CampaignStatus, CampaignType, PlacementType, PaymentStatus, PartnerTier } from '../types';

const MOCK_REQUESTS: CampaignRequest[] = [
  {
    id: 'req_1',
    brandName: 'NVIDIA',
    contactPerson: 'Marcus Thorne',
    contactEmail: 'mthorne@nvidia.com',
    type: 'Partnership',
    requestedPlacement: 'Homepage & AI Vertical',
    budgetRange: '$50k - $100k',
    status: 'In Review',
    dateSubmitted: '2024-03-24',
    notes: 'Interested in a strategic partnership for the Blackwell GPU launch.'
  },
  {
    id: 'req_2',
    brandName: 'Cloudflare',
    contactPerson: 'Sarah Lin',
    contactEmail: 'slin@cloudflare.com',
    type: 'Display Ad',
    requestedPlacement: 'Sidebar (News Articles)',
    budgetRange: '$5k - $10k',
    status: 'New',
    dateSubmitted: '2024-03-23'
  },
  {
    id: 'req_3',
    brandName: 'Hugging Face',
    contactPerson: 'Clem D.',
    contactEmail: 'clem@huggingface.co',
    type: 'Sponsored Article',
    requestedPlacement: 'AI / Software Section',
    budgetRange: 'Editorial Collaboration',
    status: 'In Review',
    dateSubmitted: '2024-03-22'
  }
];

const MOCK_CAMPAIGNS: PartnerCampaign[] = [
  {
    id: 'camp_1',
    brandName: 'Stripe',
    brandLogo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100&h=100&fit=crop',
    campaignTitle: 'Future of Global Commerce Series',
    type: 'Sponsored Article',
    placement: 'Article Inline',
    destinationUrl: 'https://stripe.com/global-commerce',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'Active',
    isFeatured: true,
    hasPartnerLabel: true,
    value: 12000,
    paymentStatus: 'Paid',
    tier: 'Strategic',
    internalNotes: 'Key partner for fintech vertical.'
  },
  {
    id: 'camp_2',
    brandName: 'DigitalOcean',
    brandLogo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop',
    campaignTitle: 'Cloud Native Lagos 2024 Sponsorship',
    type: 'Sponsored Event',
    placement: 'Newsletter',
    destinationUrl: 'https://digitalocean.com/events/lagos',
    startDate: '2024-03-15',
    endDate: '2024-04-15',
    status: 'Active',
    isFeatured: false,
    hasPartnerLabel: true,
    value: 5000,
    paymentStatus: 'Pending',
    tier: 'Premium'
  },
  {
    id: 'camp_3',
    brandName: 'Apple',
    brandLogo: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=100&h=100&fit=crop',
    campaignTitle: 'Vision Pro Developer Outreach',
    type: 'Display Ad',
    placement: 'Homepage Hero',
    creativeUrl: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=600&h=400&fit=crop',
    destinationUrl: 'https://apple.com/vision-pro',
    startDate: '2024-02-01',
    endDate: '2024-03-01',
    status: 'Completed',
    isFeatured: true,
    hasPartnerLabel: true,
    paymentStatus: 'Paid',
    tier: 'Strategic'
  }
];

const AdvertiseManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<CampaignRequest[]>([]);
  const [campaigns, setCampaigns] = useState<PartnerCampaign[]>([]);
  const [view, setView] = useState<'requests' | 'campaigns'>('campaigns');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Partial<PartnerCampaign> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRequests(MOCK_REQUESTS);
      setCampaigns(MOCK_CAMPAIGNS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = (campaign?: PartnerCampaign) => {
    setEditingCampaign(campaign || {
      brandName: '',
      campaignTitle: '',
      type: 'Display Ad',
      placement: 'Sidebar',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Pending',
      isFeatured: false,
      hasPartnerLabel: true,
      paymentStatus: 'Pending',
      tier: 'Standard',
      destinationUrl: ''
    });
    setIsModalOpen(true);
  };

  const getStatusColor = (status: CampaignStatus | string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Completed': return 'bg-slate-100 text-slate-500 border-slate-200';
      case 'Paused': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Pending': case 'New': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'In Review': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  const getTierBadge = (tier: PartnerTier) => {
    switch (tier) {
      case 'Strategic': return 'bg-slate-900 text-white shadow-lg shadow-slate-900/10';
      case 'Premium': return 'bg-indigo-600 text-white';
      case 'Standard': return 'bg-slate-100 text-slate-600';
    }
  };

  const calculateDaysRemaining = (end: string) => {
    const days = Math.ceil((new Date(end).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <LoadingSpinner />
          <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Opening Media Sales Ledger...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="editorial-title text-3xl text-slate-900 tracking-tight">Advertise & Partner Relations</h1>
          <p className="text-slate-500 text-sm mt-1">Manage brand campaigns, sponsorships, and high-tier partnerships</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => handleOpenModal()}
            className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-all shadow-lg shadow-slate-900/10 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            Create Campaign
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Live Campaigns</p>
          <p className="text-2xl font-bold text-slate-900">{campaigns.filter(c => c.status === 'Active').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Strategic Partners</p>
          <p className="text-2xl font-bold text-indigo-600">{campaigns.filter(c => c.tier === 'Strategic').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Requests</p>
          <p className="text-2xl font-bold text-amber-600">{requests.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Pipeline Value</p>
          <p className="text-2xl font-bold text-emerald-600">$254,200</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl w-fit mb-8">
        <button 
          onClick={() => setView('campaigns')}
          className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${view === 'campaigns' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Active Campaigns
        </button>
        <button 
          onClick={() => setView('requests')}
          className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${view === 'requests' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Inbound Requests ({requests.length})
        </button>
      </div>

      {view === 'campaigns' ? (
        <div className="space-y-4">
          {campaigns.map(camp => {
            const daysLeft = calculateDaysRemaining(camp.endDate);
            return (
              <div key={camp.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row group">
                <div className="w-full md:w-56 h-40 md:h-auto bg-slate-50 relative overflow-hidden flex items-center justify-center p-6 border-r border-slate-100">
                  {camp.creativeUrl ? (
                    <img src={camp.creativeUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  ) : (
                    <div className="text-center">
                      <img src={camp.brandLogo} className="w-16 h-16 rounded-xl mx-auto mb-3 shadow-md" alt="" />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{camp.brandName}</p>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 flex space-x-1">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${getTierBadge(camp.tier)}`}>
                      {camp.tier}
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(camp.status)}`}>
                          {camp.status}
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{camp.type}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Starts: {camp.startDate}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => handleOpenModal(camp)}>
                      {camp.campaignTitle}
                    </h3>
                    <div className="mt-3 flex items-center space-x-6">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Placement</p>
                        <p className="text-sm font-bold text-slate-700">{camp.placement}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Value</p>
                        <p className="text-sm font-bold text-emerald-600">${camp.value?.toLocaleString() || 'Complimentary'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Payment</p>
                        <p className={`text-sm font-bold ${camp.paymentStatus === 'Paid' ? 'text-blue-600' : 'text-amber-600'}`}>{camp.paymentStatus}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex-1 max-w-xs">
                       <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                         <span>Campaign Progress</span>
                         <span className={daysLeft < 5 && camp.status === 'Active' ? 'text-rose-500' : 'text-slate-900'}>
                           {camp.status === 'Completed' ? 'Closed' : `${daysLeft} Days Left`}
                         </span>
                       </div>
                       <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                         <div className={`h-full transition-all duration-1000 ${daysLeft < 5 ? 'bg-rose-500' : 'bg-blue-600'}`} style={{ width: camp.status === 'Completed' ? '100%' : `${Math.max(20, 100 - (daysLeft * 3))}%` }}></div>
                       </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleOpenModal(camp)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Settings"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View Analytics">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner / Brand</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type / Goal</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget Range</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map(req => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{req.brandName}</h4>
                      <p className="text-xs text-slate-500">{req.contactPerson} • {req.contactEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-xs font-bold text-slate-700">{req.type}</span>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{req.requestedPlacement}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs font-bold text-slate-500">
                    {req.budgetRange}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Convert to Campaign">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View Details">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CREATE / EDIT CAMPAIGN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h2 className="editorial-title text-2xl text-slate-900">
                    {editingCampaign?.id ? 'Adjust Campaign Strategy' : 'Configure New Partnership'}
                  </h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Ref ID: {editingCampaign?.id || 'ADS_PENDING'}</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-12 no-scrollbar space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Brand & Identity Section */}
                <div className="space-y-8">
                  <section>
                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center">
                      <span className="w-1 h-4 bg-blue-600 mr-2 rounded-full"></span>
                      Brand & Campaign Identity
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Campaign Title</label>
                        <input 
                          type="text"
                          className="w-full text-2xl editorial-title border-b border-slate-200 focus:border-blue-500 transition-colors py-2 outline-none"
                          placeholder="Global Q3 Developer Outreach"
                          value={editingCampaign?.campaignTitle}
                          onChange={(e) => setEditingCampaign(prev => ({ ...prev, campaignTitle: e.target.value }))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Brand Name</label>
                          <input 
                            type="text"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                            placeholder="e.g. Google Cloud"
                            value={editingCampaign?.brandName}
                            onChange={(e) => setEditingCampaign(prev => ({ ...prev, brandName: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Campaign Type</label>
                          <select 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                            value={editingCampaign?.type}
                            onChange={(e) => setEditingCampaign(prev => ({ ...prev, type: e.target.value as any }))}
                          >
                            <option value="Display Ad">Display Advertising</option>
                            <option value="Sponsored Article">Sponsored Editorial</option>
                            <option value="Sponsored Event">Event Sponsorship</option>
                            <option value="Newsletter Placement">Newsletter Feature</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center">
                      <span className="w-1 h-4 bg-indigo-600 mr-2 rounded-full"></span>
                      Creative & Destination
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Creative Asset (Banner/Visual)</label>
                        <div 
                          className="aspect-[16/6] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group overflow-hidden"
                          onClick={() => setEditingCampaign(prev => ({ ...prev, creativeUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200' }))}
                        >
                          {editingCampaign?.creativeUrl ? (
                            <img src={editingCampaign.creativeUrl} className="w-full h-full object-cover" alt="" />
                          ) : (
                            <>
                              <svg className="w-10 h-10 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Click to Upload Media</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Target Destination URL</label>
                        <input 
                          type="url"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none"
                          placeholder="https://brand.com/campaign"
                          value={editingCampaign?.destinationUrl}
                          onChange={(e) => setEditingCampaign(prev => ({ ...prev, destinationUrl: e.target.value }))}
                        />
                      </div>
                    </div>
                  </section>
                </div>

                {/* Logistics & Values Section */}
                <div className="space-y-8">
                  <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Campaign Governance</h3>
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Placement Zone</label>
                          <select 
                            className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs font-bold text-white outline-none"
                            value={editingCampaign?.placement}
                            onChange={(e) => setEditingCampaign(prev => ({ ...prev, placement: e.target.value as any }))}
                          >
                            <option value="Homepage Hero">Homepage Hero</option>
                            <option value="Sidebar">Article Sidebar</option>
                            <option value="Article Inline">Article Inline</option>
                            <option value="Newsletter">Weekly Newsletter</option>
                            <option value="Footer">Global Footer</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Partner Tier</label>
                          <select 
                            className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs font-bold text-white outline-none"
                            value={editingCampaign?.tier}
                            onChange={(e) => setEditingCampaign(prev => ({ ...prev, tier: e.target.value as any }))}
                          >
                            <option value="Strategic">Strategic Partner</option>
                            <option value="Premium">Premium Partner</option>
                            <option value="Standard">Standard Advertising</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Launch Date</label>
                          <input 
                            type="date"
                            className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs font-bold text-white outline-none"
                            value={editingCampaign?.startDate}
                            onChange={(e) => setEditingCampaign(prev => ({ ...prev, startDate: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Conclusion Date</label>
                          <input 
                            type="date"
                            className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs font-bold text-white outline-none"
                            value={editingCampaign?.endDate}
                            onChange={(e) => setEditingCampaign(prev => ({ ...prev, endDate: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="pt-4 space-y-4">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              className="sr-only" 
                              checked={editingCampaign?.hasPartnerLabel}
                              onChange={(e) => setEditingCampaign(prev => ({ ...prev, hasPartnerLabel: e.target.checked }))}
                            />
                            <div className={`w-10 h-5 rounded-full transition-colors ${editingCampaign?.hasPartnerLabel ? 'bg-blue-600' : 'bg-slate-700'}`}></div>
                            <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${editingCampaign?.hasPartnerLabel ? 'translate-x-5' : ''}`}></div>
                          </div>
                          <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">Show "Partner Content" Disclosure</span>
                        </label>
                      </div>

                      <div className="pt-8 border-t border-slate-800">
                        <div className="flex justify-between items-end mb-4">
                          <div className="flex flex-col">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Campaign Valuation</label>
                             <div className="flex items-center space-x-2">
                               <span className="text-slate-500 font-bold">$</span>
                               <input 
                                 type="number" 
                                 className="bg-slate-800 border-none rounded-lg p-2 text-sm font-bold w-28 text-white outline-none"
                                 value={editingCampaign?.value || 0}
                                 onChange={(e) => setEditingCampaign(prev => ({ ...prev, value: parseInt(e.target.value) }))}
                               />
                             </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 text-right">Payment Workflow</label>
                            <div className="flex bg-slate-800 p-1 rounded-xl">
                              {(['Pending', 'Paid', 'Complimentary'] as PaymentStatus[]).map(ps => (
                                <button 
                                  key={ps}
                                  onClick={() => setEditingCampaign(prev => ({ ...prev, paymentStatus: ps }))}
                                  className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${editingCampaign?.paymentStatus === ps ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                  {ps}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Internal Sales & Editorial Notes</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/10 outline-none h-32 resize-none"
                      placeholder="Contract details, editorial constraints, or contact history..."
                      value={editingCampaign?.internalNotes}
                      onChange={(e) => setEditingCampaign(prev => ({ ...prev, internalNotes: e.target.value }))}
                    ></textarea>
                  </section>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center sticky bottom-0 z-20">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                Discard Update
              </button>
              <div className="flex space-x-3">
                 <div className="flex bg-white border border-slate-200 p-1 rounded-xl mr-4 items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3">State</span>
                    {(['Paused', 'Active'] as CampaignStatus[]).map(s => (
                      <button 
                        key={s}
                        onClick={() => setEditingCampaign(prev => ({ ...prev, status: s }))}
                        className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${editingCampaign?.status === s ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        {s}
                      </button>
                    ))}
                 </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-10 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95 flex items-center"
                >
                   {editingCampaign?.id ? 'Finalize Changes' : 'Activate Campaign'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdvertiseManagement;
