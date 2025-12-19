
import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { SpotlightEntry, SpotlightType, SpotlightPlacement, SpotlightStatus } from '../types';

const MOCK_SPOTLIGHTS: SpotlightEntry[] = [
  {
    id: 'spot_1',
    title: "Reimagining the Future of AI with Sam Altman",
    personName: "Sam Altman",
    role: "CEO, OpenAI",
    summary: "An exclusive look at the next frontier of artificial general intelligence and its societal impact.",
    type: 'Interview',
    placement: 'Both',
    status: 'Published',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    order: 1,
    lastUpdated: '2024-03-22 10:00',
    isPinned: true
  },
  {
    id: 'spot_2',
    title: "The Vision Behind the New Vision Pro",
    personName: "Mike Rockwell",
    role: "VP, Technology Development Group",
    summary: "How Apple spent a decade perfecting the optics and sensors for spatial computing.",
    type: 'Feature',
    placement: 'Homepage Hero',
    status: 'Published',
    imageUrl: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=1200',
    order: 2,
    lastUpdated: '2024-03-21 14:30',
    isPinned: false
  },
  {
    id: 'spot_3',
    title: "Venture Cycles in Emerging Markets",
    personName: "Ijeoma Okoro",
    role: "Partner, Future Africa",
    summary: "Why capital is flowing toward infrastructure-first startups in the Sahel.",
    type: 'Founder',
    placement: 'Spotlight Page',
    status: 'Draft',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1200',
    order: 3,
    lastUpdated: '2024-03-20 16:45',
    isPinned: false
  }
];

const SpotlightManagement: React.FC = () => {
  const [spotlights, setSpotlights] = useState<SpotlightEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpotlight, setEditingSpotlight] = useState<Partial<SpotlightEntry> | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpotlights(MOCK_SPOTLIGHTS.sort((a, b) => a.order - b.order));
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = (spotlight?: SpotlightEntry) => {
    setValidationError(null);
    setEditingSpotlight(spotlight || {
      title: '',
      personName: '',
      role: '',
      summary: '',
      type: 'Feature',
      placement: 'Both',
      status: 'Draft',
      imageUrl: '',
      isPinned: false
    });
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingSpotlight(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    if (!editingSpotlight?.title || !editingSpotlight?.personName || !editingSpotlight?.imageUrl) {
      setValidationError("Headline, Subject Name, and Hero Image are required.");
      return;
    }

    if (editingSpotlight.placement !== 'Spotlight Page' && editingSpotlight.status === 'Published') {
      const activeHeroes = spotlights.filter(s => s.status === 'Published' && s.placement !== 'Spotlight Page' && s.id !== editingSpotlight.id);
      if (activeHeroes.length >= 5) {
        setValidationError("Max of 5 published spotlights allowed on Homepage Hero.");
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      if (editingSpotlight.id) {
        setSpotlights(prev => prev.map(s => s.id === editingSpotlight.id ? { ...s, ...editingSpotlight, lastUpdated: new Date().toISOString() } as SpotlightEntry : s));
      } else {
        const newSpot: SpotlightEntry = {
          ...editingSpotlight as SpotlightEntry,
          id: `spot_${Date.now()}`,
          order: spotlights.length + 1,
          lastUpdated: new Date().toISOString()
        };
        setSpotlights(prev => [...prev, newSpot]);
      }
      setLoading(false);
      setIsModalOpen(false);
    }, 800);
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    const newSpotlights = [...spotlights];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSpotlights.length) return;
    [newSpotlights[index], newSpotlights[targetIndex]] = [newSpotlights[targetIndex], newSpotlights[index]];
    setSpotlights(newSpotlights.map((s, i) => ({ ...s, order: i + 1 })));
  };

  if (loading && spotlights.length === 0) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <LoadingSpinner />
          <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Assembling Spotlight Deck...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="editorial-title text-3xl text-slate-900 tracking-tight">Spotlight Management</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Curate high-impact visual stories for TechPalava's premium slots</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-all shadow-lg shadow-slate-900/10 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          Create New Spotlight
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {spotlights.map((spot, index) => (
          <div key={spot.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row group">
            <div className="bg-slate-50/50 w-12 flex flex-col items-center justify-center border-r border-slate-100 space-y-2">
              <button disabled={index === 0} onClick={() => moveOrder(index, 'up')} className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-0"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg></button>
              <span className="text-[10px] font-black text-slate-300 font-mono">0{index + 1}</span>
              <button disabled={index === spotlights.length - 1} onClick={() => moveOrder(index, 'down')} className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-0"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></button>
            </div>
            <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden relative">
              <img src={spot.imageUrl} alt={spot.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[8px] font-black uppercase tracking-widest rounded">{spot.type}</div>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border ${spot.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-500'}`}>{spot.status}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Edited {spot.lastUpdated.split(' ')[0]}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => handleOpenModal(spot)}>{spot.title}</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">{spot.personName} • {spot.role}</p>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{spot.placement}</span>
                <div className="flex space-x-2">
                  <button onClick={() => { setEditingSpotlight(spot); setIsPreviewOpen(true); }} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Full Preview"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                  <button onClick={() => handleOpenModal(spot)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <h2 className="editorial-title text-2xl text-slate-900">{editingSpotlight?.id ? 'Edit Spotlight' : 'New Spotlight Feature'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
              {validationError && <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-xs font-bold uppercase tracking-tight">{validationError}</div>}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Headline</label>
                    <input type="text" className="w-full text-xl editorial-title border-b border-slate-200 py-2 outline-none focus:border-blue-500" value={editingSpotlight?.title} onChange={(e) => setEditingSpotlight(prev => ({ ...prev, title: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject Name</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold" value={editingSpotlight?.personName} onChange={(e) => setEditingSpotlight(prev => ({ ...prev, personName: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current Role</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" value={editingSpotlight?.role} onChange={(e) => setEditingSpotlight(prev => ({ ...prev, role: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Summary</label>
                    <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm h-32 resize-none" value={editingSpotlight?.summary} onChange={(e) => setEditingSpotlight(prev => ({ ...prev, summary: e.target.value }))}></textarea>
                  </div>
                </div>
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex justify-between items-center">
                      Hero Image
                      {editingSpotlight?.imageUrl && (
                        <button 
                          onClick={() => setEditingSpotlight(prev => ({ ...prev, imageUrl: '' }))}
                          className="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </label>
                    <div 
                      className={`aspect-video rounded-2xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center cursor-pointer ${editingSpotlight?.imageUrl ? 'border-slate-100' : 'border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/30'}`}
                      onClick={triggerFileUpload}
                    >
                      {editingSpotlight?.imageUrl ? (
                        <div className="relative w-full h-full group">
                          <img src={editingSpotlight.imageUrl} className="w-full h-full object-cover" alt="" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Change Visual</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-6">
                          <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Feature Banner</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-3xl text-white">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Publishing</h3>
                    <div className="space-y-4">
                      <select className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold text-white outline-none" value={editingSpotlight?.status} onChange={(e) => setEditingSpotlight(prev => ({ ...prev, status: e.target.value as any }))}>
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                        <option value="Scheduled">Scheduled</option>
                      </select>
                      <select className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold text-white outline-none" value={editingSpotlight?.placement} onChange={(e) => setEditingSpotlight(prev => ({ ...prev, placement: e.target.value as any }))}>
                        <option value="Both">Both Views</option>
                        <option value="Homepage Hero">Homepage Only</option>
                        <option value="Spotlight Page">Spotlight Only</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-widest">Discard</button>
              <button onClick={handleSave} className="px-10 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95">Save Spotlight</button>
            </div>
          </div>
        </div>
      )}

      {isPreviewOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col">
          <div className="h-16 bg-slate-900 px-6 flex items-center justify-between border-b border-slate-800">
            <span className="bg-emerald-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">Live Preview Mode</span>
            <button onClick={() => setIsPreviewOpen(false)} className="px-4 py-2 bg-slate-800 text-white text-xs font-bold uppercase tracking-widest rounded-lg">Exit Preview</button>
          </div>
          <div className="flex-1 bg-white relative overflow-hidden flex items-center">
            <div className="absolute inset-0 z-0">
              <img src={editingSpotlight?.imageUrl} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-20 w-full text-white">
              <div className="max-w-2xl space-y-6">
                <div className="flex items-center space-x-3"><span className="w-12 h-0.5 bg-blue-500"></span><span className="text-blue-500 font-black uppercase text-xs tracking-[0.3em]">{editingSpotlight?.type} SPOTLIGHT</span></div>
                <h1 className="editorial-title text-6xl leading-none">{editingSpotlight?.title}</h1>
                <p className="text-slate-200 text-lg font-medium leading-relaxed">"{editingSpotlight?.summary}"</p>
                <div className="pt-8"><button className="px-10 py-5 bg-blue-600 text-white font-black uppercase text-xs tracking-widest shadow-2xl">Read the Story</button></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default SpotlightManagement;
