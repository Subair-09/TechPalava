
import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { HomeAdvert, AdvertLabel, AdvertStatus } from '../types';

const MOCK_ADS: HomeAdvert[] = [
  {
    id: 'ad_1',
    internalName: 'NVIDIA Blackwell Q1 Launch',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    destinationUrl: 'https://nvidia.com/blackwell',
    label: 'Sponsored',
    status: 'Active',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    order: 1,
    clickCount: 1420
  },
  {
    id: 'ad_2',
    internalName: 'Apple Vision Pro Dev Outreach',
    imageUrl: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=1200',
    destinationUrl: 'https://developer.apple.com/visionos',
    label: 'Partner',
    status: 'Active',
    startDate: '2024-03-10',
    endDate: '2024-04-10',
    order: 2,
    clickCount: 850
  }
];

const HomeAdsManagement: React.FC = () => {
  const [ads, setAds] = useState<HomeAdvert[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Partial<HomeAdvert> | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'scheduled' | 'archive'>('active');
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const carouselRef = useRef<number>(0);
  const [previewIndex, setPreviewIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAds(MOCK_ADS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Carousel auto-rotate logic for preview
  useEffect(() => {
    let interval: number;
    if (isPreviewOpen && ads.filter(a => a.status === 'Active').length > 1) {
      interval = window.setInterval(() => {
        setPreviewIndex(prev => (prev + 1) % ads.filter(a => a.status === 'Active').length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPreviewOpen, ads]);

  const handleOpenModal = (ad?: HomeAdvert) => {
    setValidationError(null);
    setEditingAd(ad || {
      internalName: '',
      imageUrl: '',
      destinationUrl: '',
      label: 'Sponsored',
      status: 'Inactive',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      order: ads.length + 1
    });
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingAd(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!editingAd?.imageUrl || !editingAd?.destinationUrl || !editingAd?.internalName) {
      setValidationError("Asset Image, Destination URL, and Internal Name are required.");
      return;
    }

    // Check 5-slot limit
    const activeAds = ads.filter(a => a.status === 'Active' && a.id !== editingAd.id);
    if (editingAd.status === 'Active' && activeAds.length >= 5) {
      setValidationError("Maximum of 5 active slots reached. Deactivate an existing advert before publishing this one.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (editingAd.id) {
        setAds(prev => prev.map(a => a.id === editingAd.id ? { ...a, ...editingAd } as HomeAdvert : a));
      } else {
        setAds(prev => [...prev, { ...editingAd, id: `ad_${Date.now()}`, clickCount: 0 } as HomeAdvert]);
      }
      setLoading(false);
      setIsModalOpen(false);
    }, 800);
  };

  const activeAds = ads.filter(a => a.status === 'Active').sort((a, b) => a.order - b.order);
  const inactiveAds = ads.filter(a => a.status !== 'Active');

  if (loading && ads.length === 0) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <LoadingSpinner />
          <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Opening Advert Registry...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="editorial-title text-3xl text-slate-900 tracking-tight">Homepage Carousel</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage exactly 5 slots of high-impact rotating partner media</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsPreviewOpen(true)}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-all flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            Live Preview
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-all shadow-lg shadow-slate-900/10 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            Deploy New Ad
          </button>
        </div>
      </div>

      {/* Slots Visualization */}
      <div className="mb-10">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">The Active 5-Slot Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[0, 1, 2, 3, 4].map(idx => {
            const ad = activeAds[idx];
            return (
              <div key={idx} className={`aspect-[4/5] rounded-[2rem] border-2 flex flex-col transition-all overflow-hidden ${ad ? 'border-blue-600 bg-white shadow-xl shadow-blue-500/5' : 'border-dashed border-slate-200 bg-slate-50 opacity-40'}`}>
                {ad ? (
                  <>
                    <div className="flex-1 relative group cursor-pointer" onClick={() => handleOpenModal(ad)}>
                      <img src={ad.imageUrl} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[8px] font-black text-white uppercase tracking-widest bg-black/60 px-2 py-1 rounded">Adjust Slot</span>
                      </div>
                      <div className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 backdrop-blur text-slate-900 text-[8px] font-black uppercase rounded shadow-sm">#{idx + 1}</div>
                    </div>
                    <div className="p-4 bg-white">
                      <p className="text-[10px] font-bold text-slate-900 truncate">{ad.internalName}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">{ad.label}</span>
                        <span className="text-[8px] font-mono text-slate-400">{ad.clickCount} clicks</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                    <svg className="w-8 h-8 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0h-3m-9-4.5h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Available Slot</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Queue Section */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mb-20">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
           <h3 className="text-sm font-bold text-slate-900 tracking-tight">The Deployed Archive & Queue</h3>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{inactiveAds.length} items on standby</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Preview</th>
                <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Identifier</th>
                <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Horizon</th>
                <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">State</th>
                <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right pr-12">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {inactiveAds.length === 0 ? (
                <tr><td colSpan={5} className="p-12 text-center text-slate-300 italic text-sm">No adverts in queue.</td></tr>
              ) : (
                inactiveAds.map(ad => (
                  <tr key={ad.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-4 w-32">
                      <div className="w-20 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                        <img src={ad.imageUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                    </td>
                    <td className="px-8 py-4">
                       <p className="text-sm font-bold text-slate-900">{ad.internalName}</p>
                       <p className="text-[10px] font-medium text-slate-400 truncate max-w-xs">{ad.destinationUrl}</p>
                    </td>
                    <td className="px-8 py-4">
                       <p className="text-xs font-bold text-slate-700">{ad.startDate}</p>
                       <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5">Ends {ad.endDate}</p>
                    </td>
                    <td className="px-8 py-4 text-center">
                       <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 border border-slate-200">{ad.status}</span>
                    </td>
                    <td className="px-8 py-4 text-right pr-12">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => handleOpenModal(ad)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                         <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIG MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div>
                <h2 className="editorial-title text-2xl text-slate-900">Carousel Configuration</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Ref: {editingAd?.id || 'ADS_DRAFT'}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar">
              {validationError && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start text-rose-800 animate-in slide-in-from-top-4 duration-300">
                   <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                   <p className="text-xs font-bold uppercase tracking-widest">{validationError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Internal Identifier</label>
                    <input type="text" className="w-full text-xl font-bold border-b border-slate-200 focus:border-blue-500 transition-colors py-2 outline-none" placeholder="e.g. Q1 Campaign A" value={editingAd?.internalName} onChange={e => setEditingAd(p => ({...p, internalName: e.target.value}))} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Destination URL</label>
                    <input type="url" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/10 outline-none" placeholder="https://..." value={editingAd?.destinationUrl} onChange={e => setEditingAd(p => ({...p, destinationUrl: e.target.value}))} />
                    <p className="text-[9px] text-slate-400 mt-2 italic">This link will always open in a new browser tab for platform retention.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Badge Classification</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" value={editingAd?.label} onChange={e => setEditingAd(p => ({...p, label: e.target.value as any}))}>
                        <option value="Sponsored">Sponsored Content</option>
                        <option value="Partner">Platform Partner</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">State</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" value={editingAd?.status} onChange={e => setEditingAd(p => ({...p, status: e.target.value as any}))}>
                        <option value="Inactive">Standby / Inactive</option>
                        <option value="Active">Live in Carousel</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex justify-between">Media Asset <span className="text-blue-600">1200x400 (3:1)</span></label>
                    <div 
                      className="aspect-[3/1] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all overflow-hidden relative"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {editingAd?.imageUrl ? (
                        <img src={editingAd.imageUrl} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <div className="text-center">
                           <svg className="w-10 h-10 text-slate-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to Upload Visual</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl">
                     <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Activation Horizon</h3>
                     <div className="grid grid-cols-2 gap-6">
                        <div>
                           <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Campaign Start</label>
                           <input type="date" className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs font-bold text-white outline-none" value={editingAd?.startDate} onChange={e => setEditingAd(p => ({...p, startDate: e.target.value}))} />
                        </div>
                        <div>
                           <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Campaign End</label>
                           <input type="date" className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs font-bold text-white outline-none" value={editingAd?.endDate} onChange={e => setEditingAd(p => ({...p, endDate: e.target.value}))} />
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <button onClick={() => setIsModalOpen(false)} className="px-8 py-3 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Discard</button>
              <button onClick={handleSave} className="px-12 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95">Verify & Deploy</button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col">
          <div className="h-16 bg-slate-900 px-6 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-4">
               <span className="bg-emerald-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse tracking-widest">Real-time Simulation</span>
               <p className="text-slate-500 text-xs font-medium">Auto-advancing every 5 seconds. Interaction enabled.</p>
            </div>
            <button onClick={() => setIsPreviewOpen(false)} className="px-6 py-2 bg-slate-800 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-slate-700 transition-all">Close Simulation</button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-20">
             <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden group">
                <div className="relative aspect-[12/4] overflow-hidden">
                   {activeAds.length > 0 ? (
                      activeAds.map((ad, i) => (
                        <a 
                          key={ad.id} 
                          href={ad.destinationUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${previewIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                          <img src={ad.imageUrl} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[4000ms]" alt="" />
                          <div className="absolute top-8 left-8">
                             <span className="bg-white/80 backdrop-blur-md text-slate-900 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded shadow-xl border border-white/50">{ad.label} Content</span>
                          </div>
                        </a>
                      ))
                   ) : (
                      <div className="h-full flex items-center justify-center bg-slate-50 italic text-slate-400">No active adverts to display.</div>
                   )}

                   {/* Nav Dots */}
                   <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                      {activeAds.map((_, i) => (
                        <button key={i} onClick={() => setPreviewIndex(i)} className={`w-2.5 h-2.5 rounded-full transition-all border border-white/50 ${previewIndex === i ? 'bg-white w-8' : 'bg-white/30'}`} />
                      ))}
                   </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Platform Homepage Context Simulation</p>
                </div>
             </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default HomeAdsManagement;
