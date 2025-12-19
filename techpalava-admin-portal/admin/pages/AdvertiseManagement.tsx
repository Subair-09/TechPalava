
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
  }
];

const AdvertiseManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'requests' | 'campaigns'>('campaigns');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Partial<PartnerCampaign> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
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

  const getStatusColor = (status: string) => {
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
      case 'Strategic': return 'bg-slate-900 text-white shadow-lg';
      case 'Premium': return 'bg-indigo-600 text-white';
      case 'Standard': return 'bg-slate-100 text-slate-600';
    }
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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="editorial-title text-4xl text-slate-900 tracking-tight">Advertise & Partnerships</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Oversee brand integrations and commercial sponsorships</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-8 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/10 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          Configure Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Active Channels', value: MOCK_CAMPAIGNS.length, color: 'text-slate-900' },
          { label: 'Pipeline Leads', value: MOCK_REQUESTS.length, color: 'text-blue-600' },
          { label: 'MTD Revenue', value: '$17,200', color: 'text-emerald-600' },
          { label: 'Strategic Partners', value: '4', color: 'text-indigo-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl w-fit mb-8">
        <button 
          onClick={() => setView('campaigns')}
          className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === 'campaigns' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Active Deployments
        </button>
        <button 
          onClick={() => setView('requests')}
          className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === 'requests' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Inbound Proposals ({MOCK_REQUESTS.length})
        </button>
      </div>

      {view === 'campaigns' ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {MOCK_CAMPAIGNS.map(camp => (
            <div key={camp.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex group">
              <div className="w-48 bg-slate-50 flex flex-col items-center justify-center p-6 border-r border-slate-100">
                <img src={camp.brandLogo} className="w-16 h-16 rounded-2xl shadow-sm mb-3" alt="" />
                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${getTierBadge(camp.tier)}`}>{camp.tier}</span>
              </div>
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase border ${getStatusColor(camp.status)}`}>{camp.status}</span>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End: {camp.endDate}</p>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">{camp.campaignTitle}</h3>
                  <div className="flex items-center space-x-4 text-[10px] font-bold text-slate-500 uppercase">
                    <span>{camp.brandName}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>{camp.placement}</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-50">
                  <span className="text-xs font-bold text-emerald-600">${camp.value?.toLocaleString()} Val</span>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(camp)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-1/3">Brand Entity</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type / Budget</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_REQUESTS.map(req => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-6">
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{req.brandName}</h4>
                    <p className="text-xs text-slate-500 mt-1">{req.contactPerson} • {req.contactEmail}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-700">{req.type}</span>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">{req.budgetRange}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase border ${getStatusColor(req.status)}`}>{req.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right font-mono text-xs text-slate-400">{req.dateSubmitted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div>
                <h2 className="editorial-title text-2xl text-slate-900">Campaign Configuration</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Ref ID: {editingCampaign?.id || 'ADS_NEW'}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>
            <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Campaign Title</label>
                  <input type="text" className="w-full text-xl font-bold border-b border-slate-200 focus:border-blue-500 py-2 outline-none" value={editingCampaign?.campaignTitle} onChange={e => setEditingCampaign(p => ({...p, campaignTitle: e.target.value}))} />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Brand Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold" value={editingCampaign?.brandName} onChange={e => setEditingCampaign(p => ({...p, brandName: e.target.value}))} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Targeting Tier</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold" value={editingCampaign?.tier} onChange={e => setEditingCampaign(p => ({...p, tier: e.target.value as any}))}>
                      <option value="Strategic">Strategic Partner</option>
                      <option value="Premium">Premium Placement</option>
                      <option value="Standard">Standard Advertiser</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-900 rounded-3xl text-white">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Financial Ledger</h3>
                <div className="flex items-center justify-between">
                   <div className="flex flex-col">
                     <span className="text-[10px] text-slate-500 uppercase font-black mb-1">Contract Valuation</span>
                     <div className="flex items-center text-2xl font-bold">
                       <span className="text-slate-600 mr-1">$</span>
                       <input type="number" className="bg-transparent border-none p-0 w-32 focus:ring-0" value={editingCampaign?.value} onChange={e => setEditingCampaign(p => ({...p, value: parseInt(e.target.value)}))} />
                     </div>
                   </div>
                   <div className="flex bg-slate-800 p-1 rounded-xl">
                      {(['Pending', 'Paid'] as PaymentStatus[]).map(ps => (
                        <button key={ps} onClick={() => setEditingCampaign(p => ({...p, paymentStatus: ps}))} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${editingCampaign?.paymentStatus === ps ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}>{ps}</button>
                      ))}
                   </div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center sticky bottom-0">
              <button onClick={() => setIsModalOpen(false)} className="px-8 py-3 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Discard</button>
              <button onClick={() => setIsModalOpen(false)} className="px-12 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95">Commit to Ledger</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdvertiseManagement;
